from flask import Blueprint, jsonify, request
from src.config.appConfig import getAppConfig

utilPntsApiPage = Blueprint('utilPntsApi', __name__,
                            template_folder='templates')


@utilPntsApiPage.route('/getUtilsInfo', methods=['GET'])
def getUtilsInfo() -> dict:
    appConf = getAppConfig()
    consList = appConf["constituents"]
    genList = appConf["generators"]
    freqPnt = appConf["freqPnt"]
    return {"gens": genList, "cons": consList, "freqPnt":freqPnt}
