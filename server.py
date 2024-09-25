'''
This is the web server that acts as a service that creates outages raw data
utilsInfo : /utilPntsApi/getUtilsInfo
data api : /rtDataApi/getpntData?id=abcd
apppend data in excel - https://stackoverflow.com/questions/37182528/how-to-append-data-using-openpyxl-python-to-excel-file-from-a-specified-row
'''
import os
from flask import Flask, render_template, request, redirect, url_for, flash, Blueprint
from src.config.appConfig import loadAppConfig
from src.routeControllers.rtDataApi import rtDataApiPage
from src.routeControllers.utilPntsApi import utilPntsApiPage
from src.routeControllers.violLogsApi import violLogsApiPage
from src.app.utils.defaultJsonEncoder import ServerJSONEncoder
from src.security.decorators import roles_required
from src.routeControllers.oauth import login_manager, oauthPage, initOauthClient
from flask_login import current_user
import werkzeug
# from flask_login import LoginManager

# get application config
appConfig = loadAppConfig()

initOauthClient()

# set this variable since we are currently not running this app on SSL
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app = Flask(__name__)
app.json_encoder = ServerJSONEncoder

# Set the secret key to some random bytes
app.secret_key = appConfig['flaskSecret']

# limit max upload file size to 10 MB
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

# User session management setup
login_manager.init_app(app)


@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('violation'))
    return render_template('loggedout.html.j2')

@app.route('/violation')
@roles_required(['viol_msg_app_user'])
def violation():
    return render_template('home.html.j2')

@app.route('/atc')
@roles_required(['viol_msg_app_user'])
def atc():
    return render_template('atc.html.j2')

app.register_blueprint(oauthPage, url_prefix='/oauth')
app.register_blueprint(rtDataApiPage, url_prefix='/rtDataApi')
app.register_blueprint(utilPntsApiPage, url_prefix='/utilPntsApi')
app.register_blueprint(violLogsApiPage, url_prefix='/violLogsApi')


if __name__ == '__main__':
    app.run(host=appConfig['flaskHost'], port=int(
            appConfig['flaskPort']), debug=True)
