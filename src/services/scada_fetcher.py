import random
import requests
from src.config.appConfig import getAppConfig


def fetchScadaPntRtData1(pntId: str):
    val = None
    pntId = pntId.strip()
    if pntId == "":
        return val
    urlStr = getAppConfig()["rtDataUrlBase"]
    paramsObj = {'pnt': pntId}
    try:
        r = requests.get(url=urlStr, params=paramsObj)
        data = r.json()
        val = data['dval']
        r.close()
    except:
        # print("Error loading data from scada api")
        val = None
    return val


def fetchScadaPntRandData(pntId):
    return random.randint(-50, 50)


def fetchScadaPntRtData(pntId):
    pntId = pntId.strip()
    if pntId == "":
        return None
    return random.randint(-50, 50)
