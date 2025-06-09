import datetime as dt
import psycopg2
from src.config.appConfig import getAppConfig
from typing import List
from src.typeDefs.voltViolInfoRow import IVoltViolInfoRow


class VoltViolMsgSummaryRepo():
    """Repository class for transmission data
    """
    localConStr: str = ""

    def __init__(self, dbConStr: str) -> None:
        """constructor method
        Args:
            dbConf (DbConfig): database connection string
        """
        self.localConStr = dbConStr

    def insertVoltViolLog(self, violLogData: dict, fileName: str) -> int:
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
        voltViolMsgTo = violLogData['violMsgTo']
        shiftIncharge = violLogData['shiftIncharge']
        try:
            dbConn = psycopg2.connect(host=dbConfig['db_host'], dbname=dbConfig['db_name'],
                                      user=dbConfig['db_username'], password=dbConfig['db_password'])
            dbCur = dbConn.cursor()

            dbCur.execute('INSERT INTO public.volt_viol_msgs ("msgId", time_stamp, "violMsgFile", "voltViolMsgTo", "shiftIncharge") VALUES (%s, %s, %s, %s, %s)  RETURNING "Id"',
                          (msgId, time_stamp, fileName, voltViolMsgTo, shiftIncharge))
            dbConn.commit()
            id: int = dbCur.fetchone()[0]

        except Exception as err:
            print('Error while inserting Voltage violation log')
            print(err)

        finally:
            if dbCur is not None:
                dbCur.close()
            if dbConn is not None:
                dbConn.close()

        return id

    def insertVoltViolInfoData(self, dataRows: List[IVoltViolInfoRow], Id) -> bool:
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

                    dataInsertionTuple = (dataRow['name'], dataRow['volt'], Id)
                    dataInsertionTuples.append(dataInsertionTuple)

                # prepare sql for insertion and execute
                dataText = ','.join(dbCur.mogrify('(%s, %s, %s)', row).decode(
                    "utf-8") for row in dataInsertionTuples)
                sqlTxt = 'INSERT INTO public.volt_viol_sub_station_rows ("sub_station", volt, "msgLogId") VALUES {0} '.format(
                    dataText)
                dbCur.execute(sqlTxt)
                dbConn.commit()

                rowIter = iteratorEndVal

            # close cursor and connection

        except Exception as err:
            isInsertSuccess = False
            print('Error while inserting Voltage violation info Rows')
            print(err)

        finally:
            if dbCur is not None:
                dbCur.close()
            if dbConn is not None:
                dbConn.close()

        return isInsertSuccess
