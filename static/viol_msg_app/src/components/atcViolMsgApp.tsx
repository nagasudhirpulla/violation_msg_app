// https://react-bootstrap.github.io/components/modal/
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import pageInitState from '../initial_states/atcViolMsgAppInitState'
import { setMsgTimeAction } from '../actions/setMsgTimeAction';
import moment from 'moment';
// import { setViolTypeAction } from '../actions/setViolTypeAction';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { setVoltViolMsgAction } from '../actions/setVoltViolMsgAction';
import { setLoadViolMsgAction } from '../actions/setLoadViolMsgAction';
import { useAtcViolMsgAppReducer } from '../reducers/atcViolMsgAppReducer';
import { IStateUtilPnt } from '../typeDefs/stateUtilPnt';
import { getAtcInfoRowsAction } from '../actions/getAtcInfoRowsAction';
import { setShInchAction } from '../actions/setShInchAction';
import { setRecipientAddrAction } from '../actions/setRecipientAddrAction';
import { setRecipientEmailsAction } from '../actions/setRecipientEmailsAction';
import { setMsgIdAction } from '../actions/setMsgIdAction';
import { deriveAtcViolLog } from '../app_logic/deriveAtcViolLog';
import { saveAtcViolLogAction } from '../actions/saveAtcViolLogAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AtcViolMsgApp() {
    let [pageState, pageStateDispatch] = useAtcViolMsgAppReducer(pageInitState);
    const [showLogConfModal, setShowLogConfModal] = useState(false);
    const [isSendEnabled, setIsSendEnabled] = useState(false);

    useEffect(() => {
        console.log("Send button enabled:", isSendEnabled);
    }, [isSendEnabled]);

    let [selConsList, setSelConsList] = useState([] as IStateUtilPnt[]);
    const onSelConsChange = (selectedOptions: IStateUtilPnt[]) => {
        setSelConsList(selectedOptions);
    }

    const onConsAtcRowsUpdateClick = () => {
        pageStateDispatch(setMsgTimeAction(new Date()))
        pageStateDispatch(getAtcInfoRowsAction(selConsList))
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
        pageStateDispatch(saveAtcViolLogAction(deriveAtcViolLog(pageState)))
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
                    <button onClick={onConsAtcRowsUpdateClick} className="btn btn-xs btn-success">Update</button>
                    <button onClick={onPrintClick} className="btn btn-xs btn-info ml-3" disabled={!isSendEnabled}>Send Message</button>
                    <a href="http://10.2.100.56:8081/mis_dashboard/iegcViolMsgs/" target="_blank">
                        <button className="btn btn-xs btn-primary ml-3">Show Issued Messages</button>
                    </a>
                </div>
            </div>
            {pageState.ui.atcInfoRows.length > 0 &&
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
                    <p>The actual Import of electricity of your control area has crossed the ATC.</p>
                    <table className={"table viol_rows_table"}>
                        <tr>
                            <td>Utility</td>
                            <td>Control Area ATC (MW)</td>
                            <td>Actual Flow (MW)</td>
                        </tr>
                        {pageState.ui.atcInfoRows.map((v) =>
                            <tr>
                                <td>{v.name}</td>
                                <td><input defaultValue={Math.round(v.atc)} /></td>
                                <td><input defaultValue={Math.round(v.drawal)} /></td>
                            </tr>
                        )}
                    </table>
                    <br />
                    <p>Due to the above violation,</p>
                    <ol>
                        <li>
                            <div>
                                <p>Grid voltage in the following important nodes is beyond the operating range specified in the IEGC
                                </p>
                                <textarea cols={30}
                                    rows={10}
                                    value={pageState.ui.voltViolationMsg}
                                    onChange={(ev) => { pageStateDispatch(setVoltViolMsgAction(ev.target.value)) }}></textarea>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p> The real time power flow on the following elements is critical and “N-1” criteria is not
                                    satisfied.
                                </p>
                                <textarea cols={30}
                                    rows={10}
                                    value={pageState.ui.loadViolationMsg}
                                    onChange={(ev) => { pageStateDispatch(setLoadViolMsgAction(ev.target.value)) }}></textarea>
                                <p>Please refer IEGC Clause 6.4.12, Clause 5.2 of Detailed Procedure for Relieving Congestion in
                                    Real
                                    Time Operation in this regard.</p>
                            </div>
                        </li>
                    </ol>
                    <p>You are advised to reduce the drawl or increase the internal generation to decongest the system</p>
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
export default AtcViolMsgApp;