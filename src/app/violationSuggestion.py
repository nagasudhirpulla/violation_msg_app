from src.config.appConfig import getBuyersFromConf, BuyerCategory, getGensFromConf, SellerCategory, getSubStnConfig, getGenStnMvarConfig
from src.services.scada_fetcher import fetchRandData, fetchScadaPntHistData, fetchScadaPntRtData
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
        
        #  new buyer category as super RE rich added
        elif b["isSuperRE"] == True:
            buyerCategory = BuyerCategory.SuperRE

        elif buyerHistSch.iloc[-1] < 400:
            buyerCategory = BuyerCategory.LessSch

        # check if each buyer is satisfying the alert criteria
        buyerHistDev = buyerHistDrawal - buyerHistSch
        minDev = buyerHistDev.abs().min()
        buyerHistDevPerc = (buyerHistDev.div(buyerHistSch))*100
        minDevPerc = buyerHistDevPerc.abs().min()

        # new case added for super RE Rich
        if buyerCategory == BuyerCategory.SuperRE:
            if (minDev >= 250 and minDev <= 350):
                alertBuyerIndices.append(itr)

        # re rich case
        elif buyerCategory == BuyerCategory.RE:
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

        #  new buyer category as super RE rich added
        elif b["isSuperRE"] == True:
            buyerCategory = BuyerCategory.SuperRE

        elif buyerHistSch.iloc[-1] < 400:
            buyerCategory = BuyerCategory.LessSch

        # check if each buyer is satisfying the emergency criteria
        buyerHistDev = buyerHistDrawal - buyerHistSch
        minDev = buyerHistDev.abs().min()
        buyerHistDevPerc = (buyerHistDev.div(buyerHistSch))*100
        minDevPerc = buyerHistDevPerc.abs().min()


        # new case added for super RE Rich
        if buyerCategory == BuyerCategory.SuperRE:
            if minDev >= 350:
                emergencyBuyerIndices.append(itr)

        elif buyerCategory == BuyerCategory.RE:
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


def deriveVoltViolationInState(stateList: str) -> List[int]:
    # get all subStations of that state
    subStations = getSubStnConfig()
    voltViolIndices = []
    subStnListIndices = []
    
    if stateList == "":
        return voltViolIndices
    for itr, b in enumerate(subStations):
        # fetch last 15 mins data for each buyer
        if b['state'] in stateList:
            endTime: dt.datetime = stripSeconds(
                dt.datetime.now()-dt.timedelta(minutes=1))
            startTime: dt.datetime = endTime-dt.timedelta(minutes=60)
            subStnVolt = fetchScadaPntHistData(b["voltPnt"], startTime, endTime)

            if b["voltLvl"] == 400:
                if check_high_voltage_threshold(subStnVolt , 420, 90):
                    voltVal = fetchScadaPntRtData(b["voltPnt"])
                    voltViolIndices.append((b["name"], voltVal))
                    subStnListIndices.append((b['name'], True, b['state']))
            elif b["voltLvl"] == 765:
                if check_high_voltage_threshold(subStnVolt , 800, 90):
                    voltVal = fetchScadaPntRtData(b["voltPnt"])
                    voltViolIndices.append((b["name"], voltVal))
                    subStnListIndices.append((b['name'], True, b['state']))
                
    # create the final list and return
    return voltViolIndices, subStnListIndices


def deriveLowVoltViolationInState(stateList: str) -> List[int]:
    # get all subStations of that state
    subStations = getSubStnConfig()
    voltViolIndices = []
    subStnListIndices = []
    
    if stateList == "":
        return voltViolIndices
    for itr, b in enumerate(subStations):
        # fetch last 15 mins data for each buyer
        if b['state'] in stateList:
            endTime: dt.datetime = stripSeconds(
                dt.datetime.now()-dt.timedelta(minutes=1))
            startTime: dt.datetime = endTime-dt.timedelta(minutes=30)
            subStnVolt = fetchScadaPntHistData(b["voltPnt"], startTime, endTime)

            if b["voltLvl"] == 400:
                if check_low_voltage_threshold(subStnVolt , 380, 90):
                    voltVal = fetchScadaPntRtData(b["voltPnt"])
                    voltViolIndices.append((b["name"], voltVal))
                    subStnListIndices.append((b['name'], False, b['state']))
            elif b["voltLvl"] == 765:
                if check_low_voltage_threshold(subStnVolt , 728, 90):
                    voltVal = fetchScadaPntRtData(b["voltPnt"])
                    voltViolIndices.append((b["name"], voltVal))
                    subStnListIndices.append((b['name'], False, b['state']))
                
    # create the final list and return
    return voltViolIndices, subStnListIndices


def check_high_voltage_threshold(subStnVolt, threshold, req_perc):
    # Count values above threshold
    values_above_threshold = sum(1 for value in subStnVolt if value > threshold)
    
    # Calculate the percentage
    total_values = len(subStnVolt)
    if total_values:
        perc_above_threshold = (values_above_threshold / total_values) * 100
        # Check if percentage meets the requirement
        if perc_above_threshold >= req_perc:
            return True
        else:
            return False
    return False
    
    
def check_low_voltage_threshold(subStnVolt, threshold, req_perc):
    # Count values above threshold
    values_above_threshold = sum(1 for value in subStnVolt if value < threshold)
    
    # Calculate the percentage
    total_values = len(subStnVolt)
    if total_values:
        perc_above_threshold = (values_above_threshold / total_values) * 100
        
        # Check if percentage meets the requirement
        if perc_above_threshold >= req_perc:
            return True
        else:
            return False
    return False
    
def deriveGenStnMvarInState(subStnListIndices: str) -> List[int]:
    # get all subStations of that state
    genStations = getGenStnMvarConfig()
    genStnMvarIndices = []
    
    if subStnListIndices == "":
        return genStnMvarIndices
    for itr, b in enumerate(genStations):
        # fetch last 15 mins data for each buyer
        # if any(item[0] == b['subStation'] for item in subStnListIndices):
        subStnMatchItr = False
        try:
            subStnMatchItr = next(item for item in subStnListIndices if item[0] == b['subStation'])
        except StopIteration:
            print("No match found")
            continue
        if subStnMatchItr:
            endTime: dt.datetime = stripSeconds(
                dt.datetime.now()-dt.timedelta(minutes=1))
            startTime: dt.datetime = endTime-dt.timedelta(minutes=60)
            # select all generating stations of that state as on 01-05-2025
            # select all generating stations of that subStation as on 16-05-2025
            mvarVal = fetchRandData(b["mvar"])
            if subStnMatchItr[1]:
                if mvarVal > 0:
                    genStnMvarIndices.append((b["name"], mvarVal))         
            else:
                if mvarVal < 0:
                    genStnMvarIndices.append((b["name"], mvarVal))
          
    # create the final list and return
    return genStnMvarIndices
    