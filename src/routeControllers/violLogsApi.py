from flask import Blueprint, jsonify, request, Response
from src.services.violLog import saveViolLog, saveAtcViolLog
from src.config.appConfig import getAppConfig
from src.typeDefs.atcViolInfoLog import IAtcViolInfoLog
from src.typeDefs.violInfoLog import IViolationLog
from typing import Union
from src.repos.insertViolationMsgs import ViolationMsgSummaryRepo
from src.app.violMsgReportGenerator import ViolMsgReportGenerator
from src.app.atcMsgReportGenerator import AtcMsgReportGenerator
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

    # Violation Msg Report Details
    violTmplPath: str = appConf['violTmplPath']
    violDumpFolder: str = appConf['violDumpFolder']

    # ATC Repport Deials
    atcTmplPath: str = appConf['atcTmplPath']
    atcDumpFolder: str = appConf['atcDumpFolder']
    appDbConStr = ""
    # Report Generation Ends
    if "atcInfoRows" in violLogData:
        # isSuccess = saveAtcViolLog(violLogData, violLogFilePath)
        atcMsgRprtGntr = AtcMsgReportGenerator(appDbConStr)
        fileName: str = atcMsgRprtGntr.generateAtcMsgReport(violLogData, atcTmplPath, atcDumpFolder)
    else:
        violMsgRprtGntr = ViolMsgReportGenerator(appDbConStr)
        fileName: str = violMsgRprtGntr.generateViolMsgReport(violLogData, violTmplPath, violDumpFolder)
        # isSuccess = saveViolLog(violLogData, violLogFilePath)
        Id = violationMsgSummaryRepo.insertViolationLog(violLogData, fileName)
        if Id:
            isSuccess = violationMsgSummaryRepo.insertAtcViolInfoData(violLogData['violInfoRows'], Id)
        print("Insertion Successful")

    # send mail to utilities
    sender_email = appConf['sender_email']
    sender_password = appConf['sender_password']
    loginId = appConf['loginId']
    pdfFileLocation = appConf['violPdfFileLocation']

    receiver_emails = violLogData['emailTo'].split(";")

    # TODO validate each email in list using a regex
    attachment_file = pdfFileLocation + fileName
    subject = "ग्रिड संचालन/शेड्यूलिंग और प्रेषण नियमों के उल्लंघन करने के कारण गैर-अनुपालन संदेश/Non-compliance message due to violating grid operating/scheduling and dispatch regulations of the IEGC"
    html = """\
        <html>
        <head></head>
        <body>
            <p>महोदय / Sir,<br><br>
            कृपया भारतीय विद्युत ग्रिड कोड (आईईजीसी) में उल्लिखित ग्रिड संचालन/शेड्यूलिंग और प्रेषण नियमों के उल्लंघन करने के लिए संलग्न गैर-अनुपालन संदेश प्राप्त करें।<br><br>
            कृपया सुरक्षित और विश्वसनीय ग्रिड संचालन के लिए उल्लिखित उल्लंघनों पर तत्काल कार्रवाई करें। निरंतर उल्लंघन की स्थिति में सभी आपातकालिक उपायों को लागू किया जाएगा जिसमे सुओ-मोटो पावर शेडुल करना शामिल है। <br><br>
            Please find attached herewith the non-compliance message for violating grid operating/scheduling and dispatch regulations of the Indian Electricity Grid Code (IEGC) as mentioned in the message.<br><br>
            Please take immediate action upon the violations mentioned for secure and reliable grid operation. In case of persistent violation, emergency measures including suo-moto scheduling of power will be implemented.<br><br>
            सादर,<br>
            पाली प्रभारी (SCM)<br>
            पश्चिम क्षेत्रीय भार प्रेषण केंद्र, मुंबई(WRLDC, Mumbai)<br>
            ग्रिड कंट्रोलर ऑफ़ इंडिया लिमिटेड (Grid India)<br>
            (formerly known as Power System Operation Corporation of India Ltd.)<br>
            संपर्क (Contact) : 022-28203885,28397634<br>
            </p>
        </body>
        </html>
        """
    send_email(sender_email, loginId, sender_password, receiver_emails, subject, html, attachment_file)
    return jsonify({"success": 1})
