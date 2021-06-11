from flask import Blueprint, jsonify, request
from src.config.appConfig import getAppConfig

utilPntsApiPage = Blueprint('utilPntsApi', __name__,
                            template_folder='templates')


@utilPntsApiPage.route('/getUtilsInfo', methods=['GET'])
def getpntData() -> dict:
    appConf = getAppConfig()
    consList = appConf["constituents"]
    genList = appConf["generators"]

    return jsonify({"gens": genList, "cons": consList})
