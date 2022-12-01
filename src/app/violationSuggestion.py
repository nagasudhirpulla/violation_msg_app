from src.config.appConfig import getBuyersFromConf, BuyerCategory
from src.services.scada_fetcher import fetchScadaPntHistData
from src.typeDefs.buyer import IBuyer
from typing import List
import datetime as dt


def deriveAllBuyersInAlertState() -> List[IBuyer]:
    # get all buyers
    buyers = getBuyersFromConf()
    alertBuyers: List[IBuyer] = []
    for b in buyers:
        # fetch last 15 mins data for each buyer
        endTime: dt.datetime = dt.datetime.now()
        startTime: dt.datetime = endTime-dt.timedelta(minutes=15)
        buyerHistSch = fetchScadaPntHistData(b["schPnt"], startTime, endTime)
        buyerHistDrawal = fetchScadaPntHistData(
            b["drawalPnt"], startTime, endTime)

        # derive buyer classification for each buyer
        buyerCategory: BuyerCategory = BuyerCategory.General
        if b["isRE"] == True:
            buyerCategory = BuyerCategory.RE
        elif buyerHistSch.iloc[-1] < 400:
            buyerCategory = BuyerCategory.LessSch

        # check if each buyer is satisfying the alert criteria
        buyerHistDev = buyerHistDrawal - buyerHistSch
        minDev = buyerHistDev.min()
        buyerHistDevPerc = buyerHistDev.div(buyerHistSch)*100
        minDevPerc = buyerHistDevPerc.min()

        if buyerCategory == BuyerCategory.RE:
            if (minDev >= 200 and minDev <= 300) or (minDevPerc >= 10 and minDevPerc <= 15):
                alertBuyers.append(b)
        elif buyerCategory == BuyerCategory.LessSch:
            if (minDev >= 40 and minDev <= 60) or (minDevPerc >= 20 and minDevPerc <= 30):
                alertBuyers.append(b)
        else:
            if (minDev >= 100 and minDev <= 200) or (minDevPerc >= 10 and minDevPerc <= 15):
                alertBuyers.append(b)
    # create the final list and return
    return alertBuyers

def deriveAllBuyersInEmergencyState() -> List[IBuyer]:
    # get all buyers
    buyers = getBuyersFromConf()
    emergencyBuyers: List[IBuyer] = []
    for b in buyers:
        # fetch last 15 mins data for each buyer
        endTime: dt.datetime = dt.datetime.now()
        startTime: dt.datetime = endTime-dt.timedelta(minutes=15)
        buyerHistSch = fetchScadaPntHistData(b["schPnt"], startTime, endTime)
        buyerHistDrawal = fetchScadaPntHistData(
            b["drawalPnt"], startTime, endTime)

        # derive buyer classification for each buyer
        buyerCategory: BuyerCategory = BuyerCategory.General
        if b["isRE"] == True:
            buyerCategory = BuyerCategory.RE
        elif buyerHistSch.iloc[-1] < 400:
            buyerCategory = BuyerCategory.LessSch

        # check if each buyer is satisfying the emergency criteria
        buyerHistDev = buyerHistDrawal - buyerHistSch
        minDev = buyerHistDev.min()
        buyerHistDevPerc = buyerHistDev.div(buyerHistSch)*100
        minDevPerc = buyerHistDevPerc.min()

        if buyerCategory == BuyerCategory.RE:
            if minDev >= 300 or minDevPerc >= 15:
                emergencyBuyers.append(b)
        elif buyerCategory == BuyerCategory.LessSch:
            if minDev >= 60 or minDevPerc >= 30:
                emergencyBuyers.append(b)
        else:
            if minDev >= 200 or minDevPerc >= 15:
                emergencyBuyers.append(b)
    # create the final list and return
    return emergencyBuyers
