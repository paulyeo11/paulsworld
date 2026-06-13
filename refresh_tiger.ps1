# ============================================================
#  refresh_tiger.ps1  --  automatic Tiger dashboard refresh
#  1. runs tiger_positions.py  -> writes tiger_positions.json
#  2. if (and only if) the JSON changed, commits + pushes to main
#  3. Vercel auto-deploys so the website updates with no human action
#
#  Designed for Windows Task Scheduler (runs every 2 hours while the
#  laptop is on/awake). Uses ABSOLUTE paths -- safe even though Task
#  Scheduler starts in C:\Windows\System32.
#
#  Resilient: if the python generator fails (market closed, API hiccup),
#  it logs the failure and exits 0 WITHOUT pushing anything.
#  Secrets (tiger_private_key.pem, tiger_config.txt) and this log are
#  gitignored and are never committed.
# ============================================================

$ErrorActionPreference = 'Continue'

$Repo    = 'C:\Users\joanne\paulsworld'
$Python  = 'C:\Users\joanne\AppData\Local\Microsoft\WindowsApps\python.exe'
$Json    = 'tiger_positions.json'
$LogFile = Join-Path $Repo 'refresh_tiger.log'

function Log($msg) {
    $line = ('{0}  {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $msg)
    Add-Content -Path $LogFile -Value $line
}

Set-Location $Repo

Log '--- refresh_tiger start ---'

# --- 1. run the generator ------------------------------------------------
try {
    $out = & $Python (Join-Path $Repo 'tiger_positions.py') 2>&1
    $code = $LASTEXITCODE
} catch {
    Log ("python launch FAILED: {0}" -f $_.Exception.Message)
    Log 'exiting cleanly (nothing pushed)'
    exit 0
}

if ($code -ne 0) {
    Log ("generator exited with code {0} -- nothing pushed. Last output:" -f $code)
    Log ('  ' + (($out | Select-Object -Last 3) -join ' | '))
    Log 'exiting cleanly (nothing pushed)'
    exit 0
}

Log 'generator ran OK'

# --- 2. only commit/push if the JSON actually changed --------------------
$changed = git status --porcelain -- $Json
if ([string]::IsNullOrWhiteSpace($changed)) {
    Log 'no change in tiger_positions.json -- nothing to commit'
    Log '--- refresh_tiger end ---'
    exit 0
}

Log 'tiger_positions.json changed -- committing + pushing'

git add -- $Json | Out-Null
git commit -m 'Auto-refresh Tiger positions data [skip ci]' | Out-Null

# Pull in any remote commits before pushing (other pipelines push to the same repo)
$pullOut = git pull --rebase 2>&1
if ($LASTEXITCODE -ne 0) {
    Log ('git pull --rebase FAILED: ' + ($pullOut -join ' | '))
    Log 'aborting push to avoid conflict'
    Log '--- refresh_tiger end ---'
    exit 0
}

git push 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Log 'pushed to main OK (Vercel will redeploy)'
} else {
    Log ('git push FAILED with code {0}' -f $LASTEXITCODE)
}

Log '--- refresh_tiger end ---'
exit 0
