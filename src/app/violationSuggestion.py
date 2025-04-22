from src.config.appConfig import getBuyersFromConf, BuyerCategory, getGensFromConf, SellerCategory
from src.services.scada_fetcher import fetchScadaPntHistData, fetchScadaPntRtData
from typing import List
import datetime as dt


def stripSeconds(t: dt.datetime) -> dt.datetime:
    return dt.datetime(t.year, t.month, t.day, t.hour, t.minute)


def deriveBuyersInAlertState() -> List[int]:
    # get all buyers
    buyers = getBuyersFromConf()
    alertBuyerIndices: List[int] = []
    for itr, b in enumerate(buyers):
        # fetch last 15 mins data for each buyer
        endTime: dt.datetime = stripSeconds(
            dt.datetime.now()-dt.timedelta(minutes=1))
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
        minDev = buyerHistDev.abs().min()
        buyerHistDevPerc = (buyerHistDev.div(buyerHistSch))*100
        minDevPerc = buyerHistDevPerc.abs().min()

        if buyerCategory == BuyerCategory.RE:
            if (minDev >= 200 and minDev <= 300) or (minDevPerc >= 10 and minDevPerc <= 15):
                alertBuyerIndices.append(itr)
        elif buyerCategory == BuyerCategory.LessSch:
            if (minDev >= 40 and minDev <= 60) or (minDevPerc >= 20 and minDevPerc <= 30):
                alertBuyerIndices.append(itr)
        else:
            if (minDev >= 100 and minDev <= 200) or (minDevPerc >= 10 and minDevPerc <= 15):
                alertBuyerIndices.append(itr)
    # create the final list and return
    return alertBuyerIndices


def deriveBuyersInEmergencyState() -> List[int]:
    # get all buyers
    buyers = getBuyersFromConf()
    emergencyBuyerIndices: List[int] = []
    for itr, b in enumerate(buyers):
        # fetch last 5 mins data for each buyer
        endTime: dt.datetime = stripSeconds(
            dt.datetime.now()-dt.timedelta(minutes=1))
        startTime: dt.datetime = endTime-dt.timedelta(minutes=5)
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
        minDev = buyerHistDev.abs().min()
        buyerHistDevPerc = (buyerHistDev.div(buyerHistSch))*100
        minDevPerc = buyerHistDevPerc.abs().min()

        if buyerCategory == BuyerCategory.RE:
            if minDev >= 300 or minDevPerc >= 15:
                emergencyBuyerIndices.append(itr)
        elif buyerCategory == BuyerCategory.LessSch:
            if minDev >= 60 or minDevPerc >= 30:
                emergencyBuyerIndices.append(itr)
        else:
            if minDev >= 200 or minDevPerc >= 15:
                emergencyBuyerIndices.append(itr)
    # create the final list and return
    return emergencyBuyerIndices


def deriveSellersInAlertState() -> List[int]:
    # get all generators
    sellers = getGensFromConf()
    alertSellerIndices: List[int] = []
    for itr, s in enumerate(sellers):
        # fetch last 15 mins data for each seller
        endTime: dt.datetime = stripSeconds(
            dt.datetime.now()-dt.timedelta(minutes=1))
        startTime: dt.datetime = endTime-dt.timedelta(minutes=15)
        sellerHistSch = fetchScadaPntHistData(s["schPnt"], startTime, endTime)
        sellerHistDrawal = fetchScadaPntHistData(
            s["drawalPnt"], startTime, endTime)

        # derive seller classification for each seller
        sellerCategory: SellerCategory = SellerCategory.General
        if s["isWS"] == True:
            sellerCategory = SellerCategory.WS

        # check if each seller is satisfying the alert criteria
        sellerHistDev = sellerHistDrawal - sellerHistSch
        # minDev = sellerHistDev.abs().min()
        sellerHistDevPerc = (sellerHistDev.div(sellerHistSch))*100
        minDevPerc = sellerHistDevPerc.abs().min()

        if sellerCategory == SellerCategory.WS:
            if (minDevPerc >= 10):
                alertSellerIndices.append(itr)
        elif sellerCategory == SellerCategory.General:
            if (minDevPerc >= 2 and minDevPerc <= 10):
                alertSellerIndices.append(itr)
    # create the final list and return
    return alertSellerIndices


def deriveSellersInEmergencyState() -> List[int]:
    # get all generators
    sellers = getGensFromConf()
    alertSellerIndices: List[int] = []
    for itr, s in enumerate(sellers):
        # fetch last 15 mins data for each seller
        endTime: dt.datetime = stripSeconds(
            dt.datetime.now()-dt.timedelta(minutes=1))
        startTime: dt.datetime = endTime-dt.timedelta(minutes=5)
        sellerHistSch = fetchScadaPntHistData(s["schPnt"], startTime, endTime)
        sellerHistDrawal = fetchScadaPntHistData(
            s["drawalPnt"], startTime, endTime)

        # derive seller classification for each seller
        sellerCategory: SellerCategory = SellerCategory.General
        if s["isWS"] == True:
            sellerCategory = SellerCategory.WS

        # check if each seller is satisfying the alert criteria
        sellerHistDev = sellerHistDrawal - sellerHistSch
        # minDev = sellerHistDev.abs().min()
        sellerHistDevPerc = (sellerHistDev.div(sellerHistSch))*100
        minDevPerc = sellerHistDevPerc.abs().min()

        if sellerCategory == SellerCategory.General:
            if (minDevPerc >= 10):
                alertSellerIndices.append(itr)
    # create the final list and return
    return alertSellerIndices


def deriveSellersInAlertOverInjState() -> List[int]:
    # get all generators
    sellers = getGensFromConf()
    alertSellerIndices: List[int] = []
    for itr, s in enumerate(sellers):
        # fetch last 15 mins data for each seller
        endTime: dt.datetime = stripSeconds(
            dt.datetime.now()-dt.timedelta(minutes=1))
        startTime: dt.datetime = endTime-dt.timedelta(minutes=15)
        sellerHistSch = fetchScadaPntHistData(s["schPnt"], startTime, endTime)
        sellerHistDrawal = fetchScadaPntHistData(
            s["drawalPnt"], startTime, endTime)

        # derive seller classification for each seller
        sellerCategory: SellerCategory = SellerCategory.General
        if s["isWS"] == True:
            sellerCategory = SellerCategory.WS

        # check if each seller is satisfying the alert criteria
        sellerHistDev = sellerHistDrawal - sellerHistSch

        # check over injection
        schVal = fetchScadaPntRtData(s["schPnt"])
        achVal = fetchScadaPntRtData(s["drawalPnt"])
        devVal = achVal - schVal
        if devVal >= 0:
            # minDev = sellerHistDev.abs().min()
            sellerHistDevPerc = (sellerHistDev.div(sellerHistSch))*100
            minDevPerc = sellerHistDevPerc.abs().min()

            if sellerCategory == SellerCategory.WS:
                if (minDevPerc >= 10):
                    alertSellerIndices.append(itr)
            elif sellerCategory == SellerCategory.General:
                if (minDevPerc >= 2 and minDevPerc <= 10):
                    alertSellerIndices.append(itr)
    # create the final list and return
    return alertSellerIndices


def deriveSellersInAlertUnderInjState() -> List[int]:
    # get all generators
    sellers = getGensFromConf()
    alertSellerIndices: List[int] = []
    for itr, s in enumerate(sellers):
        # fetch last 15 mins data for each seller
        endTime: dt.datetime = stripSeconds(
            dt.datetime.now()-dt.timedelta(minutes=1))
        startTime: dt.datetime = endTime-dt.timedelta(minutes=15)
        sellerHistSch = fetchScadaPntHistData(s["schPnt"], startTime, endTime)
        sellerHistDrawal = fetchScadaPntHistData(
            s["drawalPnt"], startTime, endTime)

        # derive seller classification for each seller
        sellerCategory: SellerCategory = SellerCategory.General
        if s["isWS"] == True:
            sellerCategory = SellerCategory.WS

        # check if each seller is satisfying the alert criteria
        sellerHistDev = sellerHistDrawal - sellerHistSch

        # check over injection
        schVal = fetchScadaPntRtData(s["schPnt"])
        achVal = fetchScadaPntRtData(s["drawalPnt"])
        devVal = achVal - schVal
        if devVal <= 0:
            # minDev = sellerHistDev.abs().min()
            sellerHistDevPerc = (sellerHistDev.div(sellerHistSch))*100
            minDevPerc = sellerHistDevPerc.abs().min()

            if sellerCategory == SellerCategory.WS:
                if (minDevPerc >= 10):
                    alertSellerIndices.append(itr)
            elif sellerCategory == SellerCategory.General:
                if (minDevPerc >= 2 and minDevPerc <= 10):
                    alertSellerIndices.append(itr)
    # create the final list and return
    return alertSellerIndices