import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import pageInitState from '../initial_states/voltViolMsgAppInitState'
import { setMsgTimeAction } from '../actions/setMsgTimeAction';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useVoltViolMsgAppReducer } from '../reducers/voltViolMsgAppReducer';
import { IStateUtilPnt } from '../typeDefs/stateUtilPnt';
import { ISubStnUtilPnt } from '../typeDefs/subStnUtilPnt';
import { getVoltViolInfoRowsAction } from '../actions/getVoltViolInfoRowsAction';
import { setShInchAction } from '../actions/setShInchAction';
import { setRecipientAddrAction } from '../actions/setRecipientAddrAction';
import { setRecipientEmailsAction } from '../actions/setRecipientEmailsAction';
import { setMsgIdAction } from '../actions/setMsgIdAction';
import { deriveVoltViolLog } from '../app_logic/deriveVoltViolLog';
import { saveVoltViolLogAction } from '../actions/saveVoltViolLogAction';
import 'react-toastify/dist/ReactToastify.css';

function VoltViolMsgApp() {
    let [pageState, pageStateDispatch] = useVoltViolMsgAppReducer(pageInitState);
    const [showLogConfModal, setShowLogConfModal] = useState(false);
    const [isSendEnabled, setIsSendEnabled] = useState(false);

    useEffect(() => {
        console.log("Send button enabled:", isSendEnabled);
    }, [isSendEnabled]);

    let [selConsList, setSelConsList] = useState([] as IStateUtilPnt[]);
    const onSelConsChange = (selectedOptions: IStateUtilPnt[]) => {
        setSelConsList(selectedOptions);
    }

    const onConsVoltViolRowsUpdateClick = () => {
        if (selConsList.length === 0) {
            console.log("No constituents selected. Please select at least one.");
            return;
        }
        pageStateDispatch(setMsgTimeAction(new Date()))
        pageStateDispatch(getVoltViolInfoRowsAction(selConsList))
        enableSendButton()
    }

    const onPrintClick = () => {
        if (isSendEnabled) {
            setShowLogConfModal(true)
        } else {
            console.log("Send button is disabled. Please suggest Alert or Emergency first.");
        }
    }

    const onSaveLog = () => {
        pageStateDispatch(saveVoltViolLogAction(deriveVoltViolLog(pageState)))
        setShowLogConfModal(false)
        setIsSendEnabled(false)
    }

    const enableSendButton = () => {
        setIsSendEnabled(true);
        console.log("Enabling send button");
    }

    return (
        <>
            <div className="no-print">
                <div>
                    <Select options={pageState.ui.constituents}
                        isMulti
                        className="basic-multi-select"
                        closeMenuOnSelect={false}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.name}
                        onChange={onSelConsChange}
                        placeholder="Select Constituents"
                        classNamePrefix="select" />
                    <button onClick={onConsVoltViolRowsUpdateClick} className="btn btn-xs btn-success">Suggest Voltage Violation</button>
                    <button onClick={onPrintClick} className="btn btn-xs btn-info ms-2" disabled={!isSendEnabled}>Send Message</button>
                    <a href="http://10.2.100.56:8081/mis_dashboard/iegcViolMsgs/" target="_blank">
                        <button className="btn btn-xs btn-primary ms-2">Show Issued Messages</button>
                    </a>
                </div>
            </div>
            {pageState.ui.voltViolInfoRows.length > 0 &&
                <>
                    <Modal
                        show={showLogConfModal}
                        onHide={() => setShowLogConfModal(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Send
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Send this Message?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowLogConfModal(false)}>Close</Button>
                            <Button variant="primary" onClick={onSaveLog}>Send Message</Button>
                        </Modal.Footer>
                    </Modal>

                    <div>
                        <table className={"logoTable"}>
                            <tr>
                                <td>
                                    <span>
                                        WESTERN REGIONAL LOAD DESPATCH CENTRE<br />F-3, MIDC Area, Marol, Andheri (East) , Mumbai
                                        400
                                        093<br />Phone (O) : 022-28202690, 28203885, 28203885, <br />Fax : 022-28235434, 28202630
                                        website:
                                        www.wrldc.com, www.wrldc.in
                                    </span>
                                </td>
                                <td>
                                    <img src="static/img/logo.png" width="83" height="83" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br />
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td><span>Message No.: </span><input type="text" value={pageState.ui.msgId}
                                onChange={(ev) => {
                                    pageStateDispatch(setMsgIdAction(ev.target.value))
                                }} /></td>
                            <td><span>Date: </span></td>
                            <td><span>{`${moment(pageState.ui.date).format("DD-MMM-YYYY")}`}</span></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><span>Time of issue: </span></td>
                            <td><span><input value={`${moment(pageState.ui.date).format("DD-MMM-YYYY HH:mm")}`}
                                onChange={(ev) => {
                                    pageStateDispatch(setMsgTimeAction(moment(ev.target.value, "DD-MMM-YYYY HH:mm").toDate()))
                                }} /></span></td>
                        </tr>
                    </table>
                    <p>From: Shift In Charge, WRLDC</p>
                    <input type="text" value={pageState.ui.recipientsStr}
                        onChange={(ev) => {
                            pageStateDispatch(setRecipientAddrAction(ev.target.value))
                        }}
                        style={{ width: "100%" }} />
                    <br />
                    Emails: <input
                        style={{ width: "100%" }}
                        value={pageState.ui.recipientMails}
                        onChange={(ev) => {
                            pageStateDispatch(setRecipientEmailsAction(ev.target.value))
                        }}
                    />
                    <br />
                    <p>It is observed that the following Nodes are experiencing low voltage continuously for last 1 Hr. The present voltage of the nodes is shown below,</p>
                    <table className={"table volt_viol_rows_table"}>
                        <tr>
                            <td>SubStation</td>
                            <td>Voltage (MW)</td>
                        </tr>
                        {pageState.ui.voltViolInfoRows.map((v) =>
                            <tr>
                                <td>{v.name}</td>
                                <td><input defaultValue={Math.round(v.volt)} /></td>
                            </tr>
                        )}
                    </table>
                    <br />
                    <p>As per Clause 6(15) to (18) of IEGC and as per the CEA Grid Standards, the steady state grid voltages have to be maintained within 
                        the following operating range: </p>
                    <br /><img src="static/img/voltRange.png" /><br />
                    <p>It is requested to take appropriate measures to control the voltages as mentioned at section 7.2.2 of the WR operating procedures. 
                        The following actions shall be taken by</p>
                    <ol>
                        <li>
                            <div>
                                <p>Status of all the bus reactor, convertible L/R at the nodes mentioned above may be checked and switched out/in.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Concerned Discoms may be instructed to switch in/out the switchable capacitor banks.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>MVAr injection from the following generators (located in affected area) may be maximised and condenser mode of operation may be explored,
                                </p>
                                <table className={"table gen_stn_mvar_rows_table"}>
                                    <tr>
                                        <td>Generators</td>
                                        <td>MVAR</td>
                                    </tr>
                                    {pageState.ui.genStnMvarInfoRows.map((v) =>
                                        <tr>
                                            <td>{v.name}</td>
                                            <td><input defaultValue={Math.round(v.mvar)} /></td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </li>
                    </ol>
                    <p>Urgent action is required in view grid security and to avoid voltage collapse & cascade tripping.</p>
                    <br />
                    <div>
                        <input type="text"
                            value={pageState.ui.sInChargeStr}
                            onChange={(ev) => {
                                pageStateDispatch(setShInchAction(ev.target.value))
                            }} />
                        <p>Shift Charge Manager</p>
                    </div>
                </>
            }
            {/* <pre>{JSON.stringify(pageState.ui.violInfoRows, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(pageState, null, 2)}</pre> */}
        </>
    );
}
export default VoltViolMsgApp;