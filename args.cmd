:: Parse arguments.
:: Usage: main.bat [options]
:: Options:
:: -a, --arg1    set arg1 value
:: -h, --help    show help information
::
:: return: 0 for success, -1 for unknown option, 1 help information

:init_mark

set is_match=false

:: help
if "%1" equ "-h" set is_match=true
if "%1" equ "--help" set is_match=true
if "%is_match%" equ "true" (
    goto :help_mark
)

:: arg1
if "%1" equ "-a" set is_match=true
if "%1" equ "--arg1" set is_match=true
if "%is_match%" equ "true" (
    set arg1=%~2
    if not defined arg1 (
        call :need_arg_call %1
        goto :try_help_mark
    )
    :: remove arg1 and next arg
    shift & shift & goto :init_mark
)

:: other options
:: ...

:: unknown option
if "%1" neq "" (
    echo unknown command [%1]
    goto :try_help_mark
)

exit /B 0


:help_mark
echo welcome to use batch file template!
echo.
echo command: main [options]
echo.
echo options:
echo -a, --arg1    set arg1 value
echo.
echo other options:
echo -h, --help    show help information
exit /B 1


:try_help_mark
echo try 'main --help' for more information
exit /B -1


:need_arg_call
echo option requires an argument: '%~1'
exit /B -1