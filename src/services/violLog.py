from src.config.appConfig import getAppConfig
from src.typeDefs.violInfoLog import IViolationLog
from openpyxl import load_workbook

def saveViolLog(violLogData:IViolationLog)->bool:
    violLogFilePath = getAppConfig()["violDataFilePath"]
    wb = load_workbook(violLogFilePath)
    wbSht = wb.active
    # todo create row as per Violation Log format
    # Message no.	Date	Time of issue	Frequency Violation	Voltage Violation	Loading Violation	Zero Crossing Violation	Deviation Violation	Special Events	Entity1	Schedule1	Drawal1	Deviation1	ACE1	Entity2	Schedule2	Drawal2	Deviation2	ACE2	Entity3	Schedule3	Drawal3	Deviation3	ACE3	Entity4	Schedule4	Drawal4	Deviation4	ACE4
    dataRow = []
    wbSht.append(dataRow)
    return True

