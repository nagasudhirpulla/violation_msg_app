import unittest
from src.config.appConfig import loadAppConfig
from src.services.violLog import saveViolLog


class TestGetReasonId(unittest.TestCase):
    def test_run(self) -> None:
        """tests the function that gets the reason Id
        """
        violLogFilePath = loadAppConfig()["violDataFilePath"]
        res = saveViolLog({}, violLogFilePath)
        self.assertTrue(res)