@ECHO OFF
:: v2.1
:: to execute as expected, requires python 3.x

:start
set choice=
set /p choice= Open browser to view served website? [N]: 
if not '%choice%'=='' set choice=%choice:~0,1%
if '%choice%'=='Y' goto yes
if '%choice%'=='y' goto yes
if '%choice%'=='N' goto no
IF '%choice%'=='n' goto no
if '%choice%'=='' goto no
echo "%choice%" is not valid
echo.
goto start

:no
echo Skipped...
cls
GOTO startServer

:yes
echo Opening browser...
start "" http://localhost:8000

:startServer
ECHO starting local server at
ECHO %cd%
ECHO with python (localhost:8000)
python -m http.server