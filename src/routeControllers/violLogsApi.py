from flask import Blueprint, jsonify, request, Response
from src.services.violLog import saveViolLog, saveAtcViolLog
from src.config.appConfig import getAppConfig
from src.typeDefs.atcViolInfoLog import IAtcViolInfoLog
from src.typeDefs.violInfoLog import IViolationLog
from typing import Union

violLogsApiPage = Blueprint('violLogsApi', __name__,
                            template_folder='templates')


@violLogsApiPage.route('/saveLog', methods=['POST'])
def saveLog() -> Response:
    violLogData: Union[IAtcViolInfoLog, IViolationLog] = request.get_json(
        force=True)  # type: ignore
    violLogFilePath = getAppConfig()["violDataFilePath"]
    if "atcInfoRows" in violLogData:
        isSuccess = saveAtcViolLog(violLogData, violLogFilePath)
    else:
        isSuccess = saveViolLog(violLogData, violLogFilePath)
    return jsonify({"success": isSuccess})
