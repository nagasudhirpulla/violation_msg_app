from flask import Blueprint, jsonify, request, Response
from src.services.violLog import saveViolLog, saveAtcViolLog
from src.config.appConfig import getAppConfig
from src.typeDefs.atcViolInfoLog import IAtcViolInfoLog
from src.typeDefs.violInfoLog import IViolationLog
from typing import Union
from src.repos.insertViolationMsgs import ViolationMsgSummaryRepo
from src.app.violMsgReportGenerator import ViolMsgReportGenerator
from src.app.utils.sendMail import send_email

violLogsApiPage = Blueprint('violLogsApi', __name__,
                            template_folder='templates')


@violLogsApiPage.route('/saveLog', methods=['POST'])
def saveLog() -> Response:
    violLogData: Union[IAtcViolInfoLog, IViolationLog] = request.get_json(
        force=True)  # type: ignore
    appConf = getAppConfig()
    violationMsgSummaryRepo = ViolationMsgSummaryRepo(appConf['appDbConnStr'])
    violLogFilePath = getAppConfig()["violDataFilePath"]

    # Report Generation Starts
    tmplPath: str = "secret/viol_msg_report_template.docx"
    dumpFolder: str = "data/"
    appDbConStr = ""
    violMsgRprtGntr = ViolMsgReportGenerator(appDbConStr)
    fileName: str = violMsgRprtGntr.generateViolMsgReport(violLogData, tmplPath, dumpFolder)
    # Report Generation Ends
    if "atcInfoRows" in violLogData:
        isSuccess = saveAtcViolLog(violLogData, violLogFilePath)
    else:
        # isSuccess = saveViolLog(violLogData, violLogFilePath)
        Id = violationMsgSummaryRepo.insertViolationLog(violLogData, fileName)
        if Id:
            isSuccess = violationMsgSummaryRepo.insertAtcViolInfoData(violLogData['violInfoRows'], Id)
        print("Insertion Successful")

    # send mail to utilities
    sender_email = appConf['sender_email']
    sender_password = appConf['sender_password']
    loginId = appConf['loginId']
    receiver_emails = violLogData['msgId']
    attachment_file = fileName
    subject = "Test Email from Python"
    html = """\
        <html>
        <head></head>
        <body>
            <p>Hi!<br>
            How are you?<br>
            Here is the <a href="https://www.python.org">link</a> you wanted.
            </p>
        </body>
        </html>
        """
    send_email(sender_email, loginId, sender_password, receiver_emails, subject, html, attachment_file)
    return jsonify({"success": 1})
