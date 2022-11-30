from flask import Blueprint, jsonify, request
from src.services.scada_fetcher import fetchScadaPntRtData
import datetime as dt

rtDataApiPage = Blueprint('rtDataApi', __name__,
                          template_folder='templates')


@rtDataApiPage.route('/getpntData', methods=['GET'])
def getpntData() -> dict:
    pntId = request.args.get('id')
    val = fetchScadaPntRtData(pntId)
    return jsonify({"val": val})
