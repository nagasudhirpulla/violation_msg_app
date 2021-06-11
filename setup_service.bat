call nssm.exe install viol_message_service "%cd%\run_server.bat"
call nssm.exe set viol_message_service AppStdout "%cd%\logs\viol_message_service.log"
call nssm.exe set viol_message_service AppStderr "%cd%\logs\viol_message_service.log"
call sc start viol_message_service
rem call nssm.exe edit viol_message_service