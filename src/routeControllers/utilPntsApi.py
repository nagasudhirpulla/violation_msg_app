from flask import Blueprint, jsonify, request
from src.config.appConfig import getAppConfig
from src.security.decorators import roles_required

utilPntsApiPage = Blueprint('utilPntsApi', __name__,
                            template_folder='templates')


@utilPntsApiPage.route('/getUtilsInfo', methods=['GET'])
@roles_required(['viol_msg_app_user'])
def getUtilsInfo() -> dict:
    appConf = getAppConfig()
    consList = appConf["constituents"]
    genList = appConf["generators"]
    freqPnt = appConf["freqPnt"]
    return {"gens": genList, "cons": consList, "freqPnt":freqPnt}
