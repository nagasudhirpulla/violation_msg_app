from flask import Blueprint, jsonify, request
from src.services.scada_fetcher import fetchScadaPntRtData
from src.app.violationSuggestion import deriveBuyersInAlertState, deriveBuyersInEmergencyState, deriveSellersInAlertState, deriveSellersInEmergencyState
from typing import List

rtDataApiPage = Blueprint('rtDataApi', __name__,
                          template_folder='templates')


@rtDataApiPage.route('/getpntData', methods=['GET'])
def getpntData() -> dict:
    pntId = request.args.get('id')
    val = fetchScadaPntRtData(pntId)
    return jsonify({"val": val})


@rtDataApiPage.route('/getAlertBuyers', methods=['GET'])
def getAlertBuyers() -> List[int]:
    buyerIndices = deriveBuyersInAlertState()
    return jsonify({"indices": buyerIndices})


@rtDataApiPage.route('/getEmergencyBuyers', methods=['GET'])
def getEmergencyBuyers() -> List[int]:
    buyerIndices = deriveBuyersInEmergencyState()
    return jsonify({"indices": buyerIndices})


@rtDataApiPage.route('/getAlertSellers', methods=['GET'])
def getAlertSellers() -> List[int]:
    sellerIndices = deriveSellersInAlertState()
    return jsonify({"indices": sellerIndices})


@rtDataApiPage.route('/getEmergencySellers', methods=['GET'])
def getEmergencySellers() -> List[int]:
    sellerIndices = deriveSellersInEmergencyState()
    return jsonify({"indices": sellerIndices})
