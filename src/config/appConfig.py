# import json module
import json
from typing import List
from src.typeDefs.buyer import IBuyer
from src.typeDefs.generator import IGenerator
from src.typeDefs.subStation import ISubStation
from src.typeDefs.genStationMvar import IGenStationMvar
from enum import Enum
import pandas as pd

# initialize the app config global variable
appConf = {}
subStnConf = {}
genStnMvarConf = {}

def loadAppConfig(fName="secret/config.json"):
    # load config json into the global variable
    with open(fName) as f:
        global appConf
        appConf = json.load(f)
        return appConf


def initConfigs():
    loadSubStnConfig()
    loadGenStnMvarConfig()


def loadSubStnConfig(fName="secret/config.xlsx"):
    global subStnConf
    subStnConfDf = pd.read_excel(fName, sheet_name="subStations")
    subStnConf = subStnConfDf.to_dict('records')
    return subStnConf


def loadGenStnMvarConfig(fName="secret/config.xlsx"):
    global genStnMvarConf
    genStnMvarConfDf = pd.read_excel(fName, sheet_name="generatingStations")
    # Convert Nan to None
    # fileMappings = fileMappingsDf.where(pd.notnull(fileMappings),None)
    genStnMvarConf = genStnMvarConfDf.to_dict('records')
    return genStnMvarConf


def getAppConfig():
    # get the cached application config object
    global appConf
    return appConf


def getBuyersFromConf() -> List[IBuyer]:
    def parseBuyerConf(c) -> IBuyer:
        buyer: IBuyer = {"name": c[0],
                         "email": c[1],
                         "schPnt": c[2],
                         "drawalPnt": c[3],
                         "acePnt": c[4],
                         "atcPnt": c[5],
                         "ttcPnt": c[6],
                         "isRE": True if c[7].lower() == "re" else False,
                         "isSuperRE": True if c[7].lower() == "superRe" else False
                         }
        return buyer
    buyers = [parseBuyerConf(c) for c in appConf["constituents"]]
    return buyers


def getGensFromConf() -> List[IGenerator]:
    def parseGenConf(c) -> IGenerator:
        gen: IGenerator = {"name": c[0],
                           "email": c[1],
                           "schPnt": c[2],
                           "drawalPnt": c[3],
                           "acePnt": c[4],
                           "isWS": True if c[5].lower() == "ws" else False
                           }
        return gen
    gens = [parseGenConf(c) for c in appConf["generators"]]
    return gens


def getSubStnConfig() -> List[ISubStation]:
    global subStnConf
    return subStnConf


def getGenStnMvarConfig() -> List[IGenStationMvar]:
    global genStnMvarConf
    return genStnMvarConf



class BuyerCategory(Enum):
    General = 1
    RE = 2
    LessSch = 3
    SuperRE = 4


class SellerCategory(Enum):
    General = 1
    WS = 2
    MunWaste = 3
