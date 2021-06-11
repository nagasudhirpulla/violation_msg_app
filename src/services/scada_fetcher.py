import random
import requests
from src.config.appConfig import getAppConfig


def fetchScadaPntRtData1(pntId):
    urlStr = getAppConfig()["rtDataUrlBase"]
    paramsObj = {'pnt': pntId}
    r = requests.get(url=urlStr, params=paramsObj)
    data = r.json()
    return data['dval']


def fetchScadaPntRandData(pntId):
    return random.randint(-50, 50)


def fetchScadaPntRtData(pntId):
    return random.randint(-50, 50)
