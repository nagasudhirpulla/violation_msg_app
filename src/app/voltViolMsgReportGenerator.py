import pandas as pd
import datetime as dt
from datetime import datetime
from src.typeDefs.reportContext import IVoltViolReportCxt
from docxtpl import DocxTemplate
import os
from typing import List, Tuple
from src.app.utils.systemState import systemStateFetcher
from src.app.utils.convertDocToPdf import convert_docx_to_pdf
import uuid
from src.typeDefs.genStnMvarTableRow import IGenStnMvarInfoRows
from src.typeDefs.voltViolTableRow import IVoltViolInfoRows

class VoltViolMsgReportGenerator:
    appDbConStr: str = ''

    def __init__(self, appDbConStr: str):
        self.appDbConStr = appDbConStr

    def getReportContextObj(self, voltViolLogData) -> IVoltViolReportCxt:
        """get the report context object for populating the weekly report template

        Args:
            startDate (dt.datetime): start date object
            endDate (dt.datetime): end date object

        Returns:
            IReportCxt: report context object
        """

        # initialise report context
        original_datetime = voltViolLogData['date']
        date_only = datetime.strptime(original_datetime, '%Y-%m-%d %H:%M:%S').date()
        formatted_date = date_only.strftime('%Y-%m-%d')
        reportContext: IVoltViolReportCxt = {
            'msgNumber': voltViolLogData['msgId'],
            'msgDt': formatted_date,
            'timeOfIssue': voltViolLogData['date'],
            'violMsgTo': voltViolLogData['violMsgTo'],
            'voltViolMsgs': [],
            'genStnMvarMsgs': [],
            'shiftIncharge': voltViolLogData['shiftIncharge']
        }

        # get sub station voltage
        try:

            voltViolMsgList: List[IVoltViolInfoRows] = []
            for row in voltViolLogData['atcInfoRows']:
                voltViolMsg: IVoltViolInfoRows = {
                    'name': row['name'],
                    # 'date': dt.datetime.strftime(df['DATE_TIME'][i], "%d-%m-%Y"),
                    'volt': row['volt']
                }
                voltViolMsgList.append(voltViolMsg)
            reportContext['voltViolMsgs'] = voltViolMsgList
        except Exception as err:
            print(err)
            
        # get generators mvar
        try:

            genStnMvarMsgList: List[IGenStnMvarInfoRows] = []
            for row in voltViolLogData['atcInfoRows']:
                genStnMvarMsg: IGenStnMvarInfoRows = {
                    'name': row['name'],
                    # 'date': dt.datetime.strftime(df['DATE_TIME'][i], "%d-%m-%Y"),
                    'mvar': row['mvar']
                }
                genStnMvarMsgList.append(genStnMvarMsg)
            reportContext['genStnMvarMsgs'] = genStnMvarMsgList
        except Exception as err:
            print(err)
        return reportContext
    
    def generateReportWithContext(self, reportContext: IVoltViolReportCxt, tmplPath: str, dumpFolder: str) -> bool:
        """generate the report file at the desired dump folder location 
        based on the template file and report context object

        Args:
            reportContext (IReportCxt): report context object
            tmplPath (str): full file path of the template
            dumpFolder (str): folder path for dumping the generated report

        Returns:
            bool: True if process is success, else False
        """
        try:
            doc = DocxTemplate(tmplPath)
            doc.render(reportContext)
            # fileNumber = reportContext['msgNumber'].replace("/", "_")
            dumpFileName = f'Volt_Viol_{uuid.uuid4().hex}.docx'
            dumpFileFullPath = os.path.join(dumpFolder, dumpFileName)
            doc.save(dumpFileFullPath)
        except Exception as err:
            print(err)
            return False
        return dumpFileName


    def generateVoltViolMsgReport(self, voltViolLogData, tmplPath: str, dumpFolder: str) -> bool:
        """generates and dumps violaytion Message report based on a template file

        Args:
            startDt (dt.datetime): start date
            endDt (dt.datetime): end date
            tmplPath (str): full file path of the template file
            dumpFolder (str): folder path where the generated reports are to be dumped

        Returns:
            bool: True if process is success, else False
        """
        reportCtxt = self.getReportContextObj(voltViolLogData)
        fileName = self.generateReportWithContext(
            reportCtxt, tmplPath, dumpFolder)
        
        docx_file_location = 'data/voltViolMsg/{0}'.format(fileName)
        pdf_file = fileName.replace("docx", "pdf")
        pdf_file_location = 'output/voltViolMsg/{0}'.format(pdf_file)
        # convert report to pdf
        convert_docx_to_pdf(docx_file_location, pdf_file_location)
        return pdf_file