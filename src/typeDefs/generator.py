from typing import TypedDict


class IGenerator(TypedDict):
    name: str
    email: str
    schPnt: str
    drawalPnt: str
    acePnt: str
    isWs: bool
