@echo off
title Paul Portfolio Refresher
color 0A
echo ==========================================
echo   Paul's Portfolio Refresher
echo ==========================================
echo.

cd /d C:\Users\joanne\Desktop

echo [1/2] Fetching Tiger Brokers positions...
python tiger_positions.py
echo.

echo [2/2] Fetching IBKR positions...
echo Make sure IB Gateway is open!
python ibkr_positions.py
echo.

echo ==========================================
echo   Done! Both portfolios updated.
echo   Visit: https://paulsworld.netlify.app
echo ==========================================
echo.
pause
