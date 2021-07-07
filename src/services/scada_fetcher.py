import random
import requests
from src.config.appConfig import getAppConfig


def fetchScadaPntRtData(pntId: str):
    appConf = getAppConfig()
    if ("isRandom" in appConf) and (appConf["isRandom"] == True):
        return fetchScadaPntRandData(pntId)
    val = None
    pntId = pntId.strip()
    if pntId == "":
        return val
    urlStr = appConf["rtDataUrlBase"]
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
    pntId = pntId.strip()
    if pntId == "":
        return None
    return random.randint(-50, 50)
