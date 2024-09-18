import pandas as pd
import datetime as dt
from datetime import datetime
from src.typeDefs.reportContext import IReportCxt
from src.typeDefs.violMsgRows import IViolMsgRows
from docxtpl import DocxTemplate
import os
from typing import List, Tuple
from src.app.utils.systemState import systemStateFetcher
from src.app.utils.convertDocToPdf import convert_docx_to_pdf
import uuid

class ViolMsgReportGenerator:
    appDbConStr: str = ''

    def __init__(self, appDbConStr: str):
        self.appDbConStr = appDbConStr

    def getReportContextObj(self, violLogData) -> IReportCxt:
        """get the report context object for populating the weekly report template

        Args:
            startDate (dt.datetime): start date object
            endDate (dt.datetime): end date object

        Returns:
            IReportCxt: report context object
        """

        # initialise report context
        original_datetime = violLogData['date']
        date_only = datetime.strptime(original_datetime, '%Y-%m-%d %H:%M:%S').date()
        formatted_date = date_only.strftime('%Y-%m-%d')
        reportContext: IReportCxt = {
            'msgNumber': violLogData['msgId'],
            'msgDt': formatted_date,
            'timeOfIssue': violLogData['date'],
            'systemState': systemStateFetcher(violLogData['freq']),
            'freq': violLogData['freq'],
            'violMsgTo': violLogData['violMsgTo'],
            'freqViolStr': violLogData['freqViolationMsg'],
            'voltViolStr': violLogData['freqViolationMsg'],
            'loadViolStr': violLogData['loadViolationMsg'],
            'devViolStr': violLogData['msgInstructions'],
            'splEvents': violLogData['splEvnts'],
            'violMsgs': [],
            'shiftIncharge': violLogData['shiftIncharge']
        }

        # get major generating unit outages
        try:

            violMsgList: List[IViolMsgRows] = []
            for row in violLogData['violInfoRows']:
                violMsg: IViolMsgRows = {
                    'name': row['name'],
                    # 'date': dt.datetime.strftime(df['DATE_TIME'][i], "%d-%m-%Y"),
                    'schedule': int(round(row['schedule'])),
                    'drawal': int(round(row['drawal'])),
                    'deviation': int(round(row['drawal']) - round(row['schedule'])),
                    'ace': row['ace'],
                    'desiredDrawal': int(round(row['schedule']))
                }
                violMsgList.append(violMsg)
            reportContext['violMsgs'] = violMsgList
        except Exception as err:
            print(err)
        return reportContext
    
    def generateReportWithContext(self, reportContext: IReportCxt, tmplPath: str, dumpFolder: str) -> bool:
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
            dumpFileName = f'Viol_{uuid.uuid4().hex}.docx'
            dumpFileFullPath = os.path.join(dumpFolder, dumpFileName)
            doc.save(dumpFileFullPath)
        except Exception as err:
            print(err)
            return False
        return dumpFileName


    def generateViolMsgReport(self, violLogData, tmplPath: str, dumpFolder: str) -> bool:
        """generates and dumps violaytion Message report based on a template file

        Args:
            startDt (dt.datetime): start date
            endDt (dt.datetime): end date
            tmplPath (str): full file path of the template file
            dumpFolder (str): folder path where the generated reports are to be dumped

        Returns:
            bool: True if process is success, else False
        """
        reportCtxt = self.getReportContextObj(violLogData)
        fileName = self.generateReportWithContext(
            reportCtxt, tmplPath, dumpFolder)
        
        docx_file_location = 'data/violMsg/{0}'.format(fileName)
        pdf_file = fileName.replace("docx", "pdf")
        pdf_file_location = 'output/violMsg/{0}'.format(pdf_file)
        # convert report to pdf
        convert_docx_to_pdf(docx_file_location, pdf_file_location)
        return pdf_file