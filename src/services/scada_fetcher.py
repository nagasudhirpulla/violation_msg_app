import random
import requests
from src.config.appConfig import getAppConfig


def fetchScadaPntRtData(pntId: str):
    val = 0
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
        val = 0
    return val


def fetchScadaPntRandData(pntId):
    return random.randint(-50, 50)


def fetchScadaPntRtData1(pntId):
    return random.randint(-50, 50)
