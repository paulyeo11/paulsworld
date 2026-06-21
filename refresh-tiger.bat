@echo off
title Refresh Tiger Data
cd /d "%~dp0"
echo ============================================
echo   Refreshing Tiger Brokers positions...
echo ============================================
echo.
echo Pulling latest scripts from GitHub...
git pull --no-edit
echo.
python tiger_positions.py
if errorlevel 1 (
  echo.
  echo *** Fetch FAILED - see message above. ***
  echo.
  pause
  exit /b 1
)
echo.
echo Pushing updated data to GitHub...
git add tiger_positions.json
git commit -m "Refresh Tiger positions"
git push
echo.
echo ============================================
echo   Done. Dashboard will update shortly.
echo ============================================
echo.
pause
