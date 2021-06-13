from typing import List, TypedDict
from src.typeDefs.violInfoRow import IViolInfoRow

class IViolationLog(TypedDict):
    freq: float
    msgId: str
    date: str
    violInfoRows: List[IViolInfoRow]
    msgInstructions: str
    violType: str