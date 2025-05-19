from flask import Blueprint, jsonify, request
from src.services.scada_fetcher import fetchScadaPntRtData
from src.app.violationSuggestion import deriveBuyersInAlertState, deriveBuyersInEmergencyState, deriveSellersInAlertState, deriveSellersInEmergencyState, deriveSellersInAlertOverInjState, deriveSellersInAlertUnderInjState, deriveVoltViolationInState, deriveGenStnMvarInState
from typing import List, Dict
from src.security.decorators import roles_required

rtDataApiPage = Blueprint('rtDataApi', __name__,
                          template_folder='templates')


@rtDataApiPage.route('/getpntData', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getpntData() -> dict:
    pntId = request.args.get('id') or ""
    val = fetchScadaPntRtData(pntId)
    return {"val": val}


@rtDataApiPage.route('/getAlertBuyers', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getAlertBuyers() -> Dict[str, List[int]]:
    buyerIndices = deriveBuyersInAlertState()
    return {"indices": buyerIndices}


@rtDataApiPage.route('/getEmergencyBuyers', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getEmergencyBuyers() -> Dict[str, List[int]]:
    buyerIndices = deriveBuyersInEmergencyState()
    return {"indices": buyerIndices}


@rtDataApiPage.route('/getAlertSellers', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getAlertSellers() -> Dict[str, List[int]]:
    sellerIndices = deriveSellersInAlertState()
    return {"indices": sellerIndices}


@rtDataApiPage.route('/getEmergencySellers', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getEmergencySellers() -> Dict[str, List[int]]:
    sellerIndices = deriveSellersInEmergencyState()
    return {"indices": sellerIndices}


@rtDataApiPage.route('/getAlertOverInjSellers', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getAlertOverInjSellers() -> Dict[str, List[int]]:
    overInjSellerIndices = deriveSellersInAlertOverInjState()
    return {"indices": overInjSellerIndices}


@rtDataApiPage.route('/getAlertUnderInjSellers', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getAlertUnderInjSellers() -> Dict[str, List[int]]:
    underInjSellerIndices = deriveSellersInAlertUnderInjState()
    return {"indices": underInjSellerIndices}

@rtDataApiPage.route('/getVoltViolData', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getVoltViolData() -> dict:
    statesStr = request.args.get('id') or ""
    stateList = statesStr.split(",")
    voltViolIndices, subStnListIndices = deriveVoltViolationInState(stateList)
    genStnMvarIndices = deriveGenStnMvarInState(subStnListIndices)
    return {"voltViol": voltViolIndices, "genStnMvar": genStnMvarIndices}

@rtDataApiPage.route('/getGenStnMvarData', methods=['GET'])
# @roles_required(['viol_msg_app_user'])
def getGenStnMvarData() -> dict:
    state = request.args.get('state') or ""
    genStnMvarIndices = deriveGenStnMvarInState(state)
    return {"indices": genStnMvarIndices}
