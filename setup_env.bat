call python -m venv project_env
call project_env\Scripts\activate.bat
call pip install -r requirements.txt
call cd static\viol_msp_app
call npm install