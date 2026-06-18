@echo off
title Refresh IBKR Data
cd /d "%~dp0"
echo ============================================
echo   Refreshing IBKR positions...
echo ============================================
echo.

REM --- Step 1: is IB Gateway already connected (port 4001)? ---
powershell -NoProfile -Command "if (Test-NetConnection -ComputerName 127.0.0.1 -Port 4001 -InformationLevel Quiet) { exit 0 } else { exit 1 }"
if not errorlevel 1 goto FETCH

REM --- Step 2: not running. Launch IB Gateway login window. ---
echo   IB Gateway is not running. Opening the login window now...
echo.
if exist "C:\Jts\ibgateway\1047\ibgateway.exe" (
  start "" "C:\Jts\ibgateway\1047\ibgateway.exe" -J-DjtsConfigDir="C:\Jts\ibgateway\1047"
) else (
  start "" "C:\Jts\ibgateway\1045\ibgateway.exe" -J-DjtsConfigDir="C:\Jts\ibgateway\1045"
)
echo   ===================================================
echo     LOG IN on the IBKR Gateway window that opened
echo     (enter your ID + password, approve 2FA on phone).
echo     This window will continue automatically once you
echo     are connected. Waiting up to 3 minutes...
echo   ===================================================
echo.

REM --- Step 3: wait (poll) until port 4001 opens, up to ~3 min ---
powershell -NoProfile -Command "$ok=$false; for($i=0;$i -lt 36;$i++){ if(Test-NetConnection -ComputerName 127.0.0.1 -Port 4001 -InformationLevel Quiet){$ok=$true; break}; Start-Sleep -Seconds 5 }; if($ok){Write-Host '   Connected!'; exit 0} else {exit 1}"
if errorlevel 1 (
  echo.
  echo   *** Timed out waiting for login. ***
  echo   Log in to IB Gateway, then run this again.
  echo.
  pause
  exit /b 1
)

:FETCH
echo.
echo   Fetching positions...
echo.
python ibkr_positions.py
if errorlevel 1 (
  echo.
  echo   *** Fetch FAILED - see message above. ***
  echo.
  pause
  exit /b 1
)
echo.
echo ============================================
echo   Done. Dashboard will update shortly.
echo ============================================
echo.
pause
