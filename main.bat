:: This is a template for batch file.
:: You can modify it to suit your needs.

@echo off
setlocal enabledelayedexpansion

:: load config
call config "%~n0"

:: init args
call args %*

:: args check fail
if %errorlevel% neq 0 goto :eof

:: print args
echo.
echo input args:
echo -a,--arg1: %arg1%

endlocal