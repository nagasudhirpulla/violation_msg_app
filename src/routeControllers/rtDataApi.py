from flask import Blueprint, jsonify, request
from src.services.scada_fetcher import fetchScadaPntRtData
from src.app.violationSuggestion import deriveBuyersInAlertState, deriveBuyersInEmergencyState, deriveSellersInAlertState, deriveSellersInEmergencyState
from typing import List, Dict

rtDataApiPage = Blueprint('rtDataApi', __name__,
                          template_folder='templates')


@rtDataApiPage.route('/getpntData', methods=['GET'])
def getpntData() -> dict:
    pntId = request.args.get('id') or ""
    val = fetchScadaPntRtData(pntId)
    return {"val": val}


@rtDataApiPage.route('/getAlertBuyers', methods=['GET'])
def getAlertBuyers() -> Dict[str, List[int]]:
    buyerIndices = deriveBuyersInAlertState()
    return {"indices": buyerIndices}


@rtDataApiPage.route('/getEmergencyBuyers', methods=['GET'])
def getEmergencyBuyers() -> Dict[str, List[int]]:
    buyerIndices = deriveBuyersInEmergencyState()
    return {"indices": buyerIndices}


@rtDataApiPage.route('/getAlertSellers', methods=['GET'])
def getAlertSellers() -> Dict[str, List[int]]:
    sellerIndices = deriveSellersInAlertState()
    return {"indices": sellerIndices}


@rtDataApiPage.route('/getEmergencySellers', methods=['GET'])
def getEmergencySellers() -> Dict[str, List[int]]:
    sellerIndices = deriveSellersInEmergencyState()
    return {"indices": sellerIndices}
