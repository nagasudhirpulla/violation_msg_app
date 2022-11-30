from typing import TypedDict


class IBuyer(TypedDict):
    name: str
    email: str
    schPnt: str
    drawalPnt: str
    acePnt: str
    atcPnt: str
    ttcPnt: str
    isRE: bool
