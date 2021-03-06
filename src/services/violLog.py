from src.typeDefs.violInfoLog import IViolationLog
from src.typeDefs.atcViolInfoLog import IAtcViolInfoLog
from openpyxl import load_workbook
import datetime as dt


def saveViolLog(vDta: IViolationLog, violLogFilePath: str) -> bool:
    # create row as per Violation Log format
    # Message no.	Date	Time of issue	Frequency Violation	Voltage Violation	Loading Violation	Zero Crossing Violation	Deviation Violation	Special Events	Entity1	Schedule1	Drawal1	Deviation1	ACE1	Entity2	Schedule2	Drawal2	Deviation2	ACE2	Entity3	Schedule3	Drawal3	Deviation3	ACE3	Entity4	Schedule4	Drawal4	Deviation4	ACE4
    msgDt = dt.datetime.strptime(vDta["date"], "%Y-%m-%d %H:%M:%S")
    dataRow = [vDta["msgId"], msgDt.date(), dt.datetime.strftime(
        msgDt, "%H:%M"), vDta["freq"], vDta["voltViolationMsg"], vDta["loadViolationMsg"], vDta["zcvViolationMsg"], vDta["msgInstructions"], vDta["splEvnts"]]
    violRows = vDta["violInfoRows"]
    for vInfo in violRows:
        try:
            devtn = float(vInfo["drawal"]) - float(vInfo["schedule"])
        except:
            devtn = 0
        dataRow.extend([vInfo["name"], vInfo["schedule"],
                       vInfo["drawal"], devtn, vInfo["ace"]])

    # add empty columns if viol rows less than 4
    numRowsLt4 = 4 - len(violRows)
    numRowsLt4 = 0 if numRowsLt4 < 0 else numRowsLt4
    for itr in range(numRowsLt4):
        dataRow.extend(["", "", "", "", ""])

    wb = load_workbook(violLogFilePath)
    wbSht = wb["Sheet1"]
    # append data to sheet
    wbSht.append(dataRow)
    # save workbook
    wb.save(violLogFilePath)
    wb.close()
    return True


def saveAtcViolLog(vDta: IAtcViolInfoLog, violLogFilePath: str) -> bool:
    # create row as per Violation Log format
    # Message no.	Date	Time of issue	Voltage Violation	Loading Violation	Entity1	ATC1	Actual1	Entity2	ATC2	Actual2	Entity3	ATC3	Actual3	Entity4	ATC4	Actual4
    msgDt = dt.datetime.strptime(vDta["date"], "%Y-%m-%d %H:%M:%S")
    dataRow = [vDta["msgId"], msgDt.date(), dt.datetime.strftime(
        msgDt, "%H:%M"), vDta["voltViolationMsg"], vDta["loadViolationMsg"]]
    violRows = vDta["atcInfoRows"]
    for vInfo in violRows:
        dataRow.extend([vInfo["name"], vInfo["atc"],
                       vInfo["drawal"]])

    # add empty columns if viol rows less than 4
    numRowsLt4 = 4 - len(violRows)
    numRowsLt4 = 0 if numRowsLt4 < 0 else numRowsLt4
    for itr in range(numRowsLt4):
        dataRow.extend(["", "", ""])

    wb = load_workbook(violLogFilePath)
    wbSht = wb["atc"]
    # append data to sheet
    wbSht.append(dataRow)
    # save workbook
    wb.save(violLogFilePath)
    wb.close()
    return True
