from typing import List, TypedDict
from src.typeDefs.atcInfoRow import IAtcInfoRow


class IAtcViolInfoLog(TypedDict):
    msgId: str
    date: str
    violMsgTo: str
    emailTo: str
    voltViolationMsg: str
    loadViolationMsg: str
    atcInfoRows: List[IAtcInfoRow]
    shiftIncharge: str
