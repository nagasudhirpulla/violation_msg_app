from flask import Blueprint, jsonify, request, Response
from src.services.violLog import saveViolLog, saveAtcViolLog
from src.config.appConfig import getAppConfig
from src.typeDefs.atcViolInfoLog import IAtcViolInfoLog
from src.typeDefs.violInfoLog import IViolationLog
from typing import Union
from src.repos.insertViolationMsgs import ViolationMsgSummaryRepo


violLogsApiPage = Blueprint('violLogsApi', __name__,
                            template_folder='templates')


@violLogsApiPage.route('/saveLog', methods=['POST'])
def saveLog() -> Response:
    violLogData: Union[IAtcViolInfoLog, IViolationLog] = request.get_json(
        force=True)  # type: ignore
    appConf = getAppConfig()
    violationMsgSummaryRepo = ViolationMsgSummaryRepo(appConf['appDbConnStr'])
    violLogFilePath = getAppConfig()["violDataFilePath"]
    if "atcInfoRows" in violLogData:
        isSuccess = saveAtcViolLog(violLogData, violLogFilePath)
    else:
        # isSuccess = saveViolLog(violLogData, violLogFilePath)
        Id = violationMsgSummaryRepo.insertViolationLog(violLogData)
        if Id:
            isSuccess = violationMsgSummaryRepo.insertAtcViolInfoData(violLogData['violInfoRows'], Id)
        print("Insertion Successful")
    return jsonify({"success": Id})
