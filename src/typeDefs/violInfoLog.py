from typing import List, TypedDict
from src.typeDefs.violInfoRow import IViolInfoRow

class IViolationLog(TypedDict):
    msgId: str
    date: str
    freq: float
    violMsgTo: str
    emailTo: str
    freqViolationMsg: str
    voltViolationMsg: str
    loadViolationMsg: str
    zcvViolationMsg: str
    msgInstructions: str
    splEvnts: str
    violInfoRows: List[IViolInfoRow]
    violType: str
    shiftIncharge: str