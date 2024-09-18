import datetime as dt
import psycopg2
from src.config.appConfig import getAppConfig
from typing import List
from src.typeDefs.atcInfoRow import IAtcInfoRow


class AtcMsgSummaryRepo():
    """Repository class for transmission data
    """
    localConStr: str = ""

    def __init__(self, dbConStr: str) -> None:
        """constructor method
        Args:
            dbConf (DbConfig): database connection string
        """
        self.localConStr = dbConStr

    def insertAtcLog(self, violLogData: dict, fileName: str) -> int:
        """_summary_

        Args:
            violLogData (dict): _description_

        Returns:
            _type_: _description_
        """
        dbConfig = getAppConfig()
        dbConn = None
        dbCur = None
        id = 0

        # Violation Message Details
        msgId = violLogData['msgId']
        time_stamp = dt.datetime.strptime(
            violLogData['date'], "%Y-%m-%d %H:%M:%S")
        # time_stamp = date_object.strftime("%Y-%m-%d %X")
        voltViolationMsg = violLogData['voltViolationMsg']
        loadViolationMsg = violLogData['loadViolationMsg']
        shiftIncharge = violLogData['shiftIncharge']
        try:
            dbConn = psycopg2.connect(host=dbConfig['db_host'], dbname=dbConfig['db_name'],
                                      user=dbConfig['db_username'], password=dbConfig['db_password'])
            dbCur = dbConn.cursor()

            dbCur.execute('INSERT INTO public.atc_viol_msgs ("msgId", time_stamp, "voltViolationMsg", "loadViolationMsg", "violMsgFile", "shiftIncharge") VALUES (%s, %s, %s, %s, %s, %s)  RETURNING "Id"',
                          (msgId, time_stamp, voltViolationMsg, loadViolationMsg, fileName, shiftIncharge))
            dbConn.commit()
            id: int = dbCur.fetchone()[0]

        except Exception as err:
            print('Error while inserting ATC violation log')
            print(err)

        finally:
            if dbCur is not None:
                dbCur.close()
            if dbConn is not None:
                dbConn.close()

        return id

    def insertAtcInfoData(self, dataRows: List[IAtcInfoRow], Id) -> bool:
        """_summary_

        Args:
            dataRows (List[IViolInfoRow]): _description_

        Returns:
            bool: _description_
        """
        dbConfig = getAppConfig()
        dbConn = None
        dbCur = None
        isInsertSuccess = True
        try:
            dbConn = psycopg2.connect(host=dbConfig['db_host'], dbname=dbConfig['db_name'],
                                      user=dbConfig['db_username'], password=dbConfig['db_password'])
            dbCur = dbConn.cursor()
            # insert the raw data
            rowIter = 0
            insIncr = 500
            numRows = len(dataRows)
            while rowIter < numRows:
                # set iteration values
                iteratorEndVal = rowIter+insIncr
                if iteratorEndVal >= numRows:
                    iteratorEndVal = numRows

                # Create row tuples
                dataInsertionTuples = []
                for insRowIter in range(rowIter, iteratorEndVal):
                    dataRow = dataRows[insRowIter]

                    dataInsertionTuple = (dataRow['name'], dataRow['atc'],
                                          dataRow['drawal'], Id)
                    dataInsertionTuples.append(dataInsertionTuple)

                # prepare sql for insertion and execute
                dataText = ','.join(dbCur.mogrify('(%s, %s, %s, %s)', row).decode(
                    "utf-8") for row in dataInsertionTuples)
                sqlTxt = 'INSERT INTO public.atc_viol_rows ("name", act, drawal, "msgLogId") VALUES {0} '.format(
                    dataText)
                dbCur.execute(sqlTxt)
                dbConn.commit()

                rowIter = iteratorEndVal

            # close cursor and connection

        except Exception as err:
            isInsertSuccess = False
            print('Error while inserting ATC violation info Rows')
            print(err)

        finally:
            if dbCur is not None:
                dbCur.close()
            if dbConn is not None:
                dbConn.close()

        return isInsertSuccess
