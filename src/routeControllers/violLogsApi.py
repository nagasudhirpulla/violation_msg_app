from flask import Blueprint, jsonify, request
from src.services.violLog import saveViolLog
from src.config.appConfig import getAppConfig

violLogsApiPage = Blueprint('violLogsApi', __name__,
                            template_folder='templates')


@violLogsApiPage.route('/saveLog', methods=['POST'])
def saveLog() -> dict:
    violLogData = request.get_json(force=True)
    violLogFilePath = getAppConfig()["violDataFilePath"]
    isSuccess = saveViolLog(violLogData, violLogFilePath)
    return jsonify({"success": isSuccess})
