from typing import TypedDict


class IViolMsgRows(TypedDict):
    name: str
    schedule: float
    drawal: float
    deviation: float
    ace: float
    desiredDrawal: float