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


class IAtcReportCxt(TypedDict):
    msgNumber: str
    msgDt: str
    timeOfIssue: str
    violMsgTo: str
    voltViolStr: str
    loadViolStr: str
    violMsgs: List[IViolMsgRows]
    shiftIncharge: str