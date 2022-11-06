@ECHO OFF
REM usage: create nuvolaris Command "NUV"

SET DIRECTORY=%~dp0
FOR %%a IN ("%DIRECTORY:~0,-1%") DO SET NUV=%%~dpa%
SET NUV=%NUV:~0,-1%

SET KEY="HKCU\Environment"
FOR /F "usebackq tokens=2*" %%A IN (`REG QUERY %KEY% /v PATH`) DO Set CURRENT_PATH=%%B

ECHO %CURRENT_PATH% > %DIRECTORY%/%USERNAME%_enviroment_variables.txt

SETX NUV %NUV% > nul
find /c "NUV" %DIRECTORY%/%USERNAME%_enviroment_variables.txt > nul  || ( SETX PATH "%CURRENT_PATH%%%NUV%%;"> nul )

if %errorlevel% == 0 (

ECHO The NUV Command was SUCCESFULLY setted to %NUV% 
ECHO:

ECHO %USERNAME%, a backup of your user's enviroment variables can now be found at %USERNAME%_enviroment_variables.txt
ECHO:

ECHO You now can use NUV command anywhere, enjoy. Try tiping nuv --help to start.
ECHO:
) else (

ECHO:
ECHO NUV command could not be setted, try with Admin Rights.
ECHO:
)

PAUSE > nul