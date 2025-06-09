from typing import List, TypedDict
from src.typeDefs.voltViolTableRow import IVoltViolInfoRows
from src.typeDefs.genStnMvarTableRow import IGenStnMvarInfoRows


class IVoltViolInfoLog(TypedDict):
    msgId: str
    date: str
    violMsgTo: str
    emailTo: str
    voltViolInfoRows: List[IVoltViolInfoRows]
    genStnMvarInfoRows: List[IGenStnMvarInfoRows]
    shiftIncharge: str
