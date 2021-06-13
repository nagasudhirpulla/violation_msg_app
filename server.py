'''
This is the web server that acts as a service that creates outages raw data
utilsInfo : /utilPntsApi/getUtilsInfo
data api : /rtDataApi/getpntData?id=abcd
apppend data in excel - https://stackoverflow.com/questions/37182528/how-to-append-data-using-openpyxl-python-to-excel-file-from-a-specified-row
'''
from flask import Flask, render_template
from src.config.appConfig import loadAppConfig
from src.routeControllers.rtDataApi import rtDataApiPage
from src.routeControllers.utilPntsApi import utilPntsApiPage
from src.app.utils.defaultJsonEncoder import ServerJSONEncoder

# get application config
appConfig = loadAppConfig()

app = Flask(__name__)
app.json_encoder = ServerJSONEncoder

# Set the secret key to some random bytes
app.secret_key = appConfig['flaskSecret']

# limit max upload file size to 10 MB
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024


@app.route('/')
def index():
    return render_template('home.html.j2')
    # return "Hello"


app.register_blueprint(rtDataApiPage, url_prefix='/rtDataApi')
app.register_blueprint(utilPntsApiPage, url_prefix='/utilPntsApi')


if __name__ == '__main__':
    app.run(host=appConfig['flaskHost'], port=int(
            appConfig['flaskPort']), debug=True)
