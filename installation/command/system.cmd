@ECHO OFF
REM usage: create nuvolaris Command "NUV"
net.exe session 1>NUL 2>NUL || (Echo This script requires elevated rights, try with Admin Rights && Pause>nul && Exit)

SET DIRECTORY=%~dp0
FOR %%a IN ("%DIRECTORY:~0,-1%") DO SET NUV=%%~dpa%
SET NUV=%NUV:~0,-1%

SET KEY="HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment"
FOR /F "usebackq tokens=2*" %%A IN (`REG QUERY %KEY% /v PATH`) DO Set CURRENT_PATH=%%B

ECHO %CURRENT_PATH% > %DIRECTORY%/%COMPUTERNAME%_enviroment_variables.txt

SETX NUV %NUV%> nul 2> nul /M 
find /c "NUV" %DIRECTORY%/%COMPUTERNAME%_enviroment_variables.txt > nul  || ( SETX /M PATH "%CURRENT_PATH%%%NUV%%;"> nul 2> nul )

if %errorlevel% == 0 (

ECHO The NUV Command was SUCCESFULLY setted to %NUV% 
ECHO:

ECHO A backup of your system enviroment variables can now be found at %COMPUTERNAME%_enviroment_variables.txt
ECHO:

ECHO You now can use NUV command anywhere in the entire system, enjoy! Try tiping nuv --help to start.
ECHO:
) else (

ECHO:
ECHO NUV command could not be setted.
ECHO:
)

PAUSE>nul