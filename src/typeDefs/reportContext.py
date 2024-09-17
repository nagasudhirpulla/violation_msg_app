from src.typeDefs.violMsgRows import IViolMsgRows
from typing import TypedDict, List
import datetime as dt



class IReportCxt(TypedDict):
    msgNumber: str
    msgDt: str
    timeOfIssue: str
    systemState: str
    freq: float
    violMsgTo: str
    freqViolStr: str
    voltViolStr: str
    loadViolStr: str
    devViolStr: str
    splEvents: str
    violMsgs: List[IViolMsgRows]
    shiftIncharge: str