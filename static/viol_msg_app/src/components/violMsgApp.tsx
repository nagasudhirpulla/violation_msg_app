// https://react-bootstrap.github.io/components/modal/
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { useViolMsgAppReducer } from '../reducers/violMsgAppReducer';
import pageInitState from '../initial_states/violMsgAppInitState'
import { IUtilPnt } from '../typeDefs/utilPnt';
import { getViolationRowsAction } from '../actions/getViolationRowsAction';
import { setMsgTimeAction } from '../actions/setMsgTimeAction';
import moment from 'moment';
import { setMsgIdAction } from '../actions/setMsgIdAction';
import { setMsgInstrucAction } from '../actions/setMsgInstrucAction';
// import { setViolTypeAction } from '../actions/setViolTypeAction';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { saveViolLogAction } from '../actions/saveViolLogAction';
import { deriveViolLog } from '../app_logic/deriveViolLog';
import { setVoltViolMsgAction } from '../actions/setVoltViolMsgAction';
import { setLoadViolMsgAction } from '../actions/setLoadViolMsgAction';
import { setZcvViolMsgAction } from '../actions/setZcvViolMsg';
import { setSplEvntsAction } from '../actions/setSplEvntsAction';

function ViolMsgApp() {
    let [pageState, pageStateDispatch] = useViolMsgAppReducer(pageInitState);
    const [showLogConfModal, setShowLogConfModal] = useState(false);

    let [selConsList, setSelConsList] = useState([] as IUtilPnt[]);
    const onSelConsChange = (selectedOptions: IUtilPnt[]) => {
        setSelConsList(selectedOptions);
    }

    let [selGensList, setSelGensList] = useState([] as IUtilPnt[]);
    const onSelGensChange = (selectedOptions: IUtilPnt[]) => {
        setSelGensList(selectedOptions);
    }

    let [siName, setSiName] = useState("");

    const onConsViolRowsUpdateClick = () => {
        pageStateDispatch(setMsgTimeAction(new Date()))
        pageStateDispatch(getViolationRowsAction(selConsList, false))
    }
    const onGensViolRowsUpdateClick = () => {
        pageStateDispatch(setMsgTimeAction(new Date()))
        pageStateDispatch(getViolationRowsAction(selGensList, true))
    }

    const onPrintClick = () => {
        window.print()
        setShowLogConfModal(true)
    }

    const onSaveLog = () => {
        // console.log(pageState)
        pageStateDispatch(saveViolLogAction(deriveViolLog(pageState)))
        setShowLogConfModal(false)
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
                    <button onClick={onConsViolRowsUpdateClick} className="btn btn-xs btn-info">Update</button>
                </div>
                <br />
                <div>
                    <Select options={pageState.ui.generators}
                        isMulti
                        className="basic-multi-select"
                        closeMenuOnSelect={false}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.name}
                        placeholder="Select Generators"
                        onChange={onSelGensChange}
                        classNamePrefix="select" />
                    <button onClick={onGensViolRowsUpdateClick} className="btn btn-xs btn-info">Update</button>
                </div>
            </div>
            {pageState.ui.violInfoRows.length > 0 &&
                <>
                    <Modal
                        show={showLogConfModal}
                        onHide={() => setShowLogConfModal(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Save
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Save this Message to Log ?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowLogConfModal(false)}>Close</Button>
                            <Button variant="primary" onClick={onSaveLog}>Save Log</Button>
                        </Modal.Footer>
                    </Modal>

                    <table cellSpacing={0}>
                        <colgroup style={{ width: 109 }}></colgroup>
                        <colgroup style={{ width: 93 }}></colgroup>
                        <colgroup style={{ width: 103 }}></colgroup>
                        <colgroup style={{ width: 94 }}></colgroup>
                        <colgroup style={{ width: 98 }}></colgroup>
                        <colgroup style={{ width: 91 }}></colgroup>
                        <colgroup style={{ width: 195 }}></colgroup>
                        <colgroup style={{ width: 130 }}></colgroup>
                        <tbody>
                            <tr className="no-print">
                                <td colSpan={12} valign="middle" align="center">
                                    <button onClick={onPrintClick} className="mt-3 btn btn-primary">PRINT</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={7} rowSpan={5} valign="middle" height="100" align="center">
                                    <span>WESTERN REGIONAL LOAD DESPATCH CENTRE<br />F-3, MIDC Area, Marol, Andheri (East) , Mumbai 400 093<br />Phone (O) : 022-28202690, 28203885, 28203885, <br />Fax : 022-28235434, 28202630 website: www.wrldc.com, www.wrldc.in</span>
                                </td>
                                <td rowSpan={5} valign="middle" align="center">
                                    <span><br /><img src="static/img/logo.png" width="83" height="92" />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                                <td rowSpan={3} valign="middle" height="63" align="center">
                                    <span>Message No.</span>
                                </td>
                                <td colSpan={2} rowSpan={3} valign="middle" align="center">
                                    <input type="text"
                                        value={pageState.ui.msgId}
                                        onChange={(ev) => {
                                            pageStateDispatch(setMsgIdAction(ev.target.value))
                                        }} />
                                </td>
                                <td colSpan={2} rowSpan={3} valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left"><b><span>ALERT</span></b></td>
                                <td valign="middle" align="left">
                                    <span>Date</span>
                                </td>
                                <td valign="middle" align="right"><b><span>{`${moment(pageState.ui.date).format("DD-MMM-YYYY")}`}</span></b></td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left"><b><span>EMERGENCY</span></b></td>
                                <td valign="middle" align="left">
                                    <span>Time of Issue</span>
                                </td>
                                <td valign="middle" align="right"><b><span>{`${moment(pageState.ui.date).format("DD-MMM-YYYY HH:mm")}`}</span></b></td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left"><b><span>NON COMPLIANCE </span></b></td>
                                <td valign="middle" align="left"><b><span><br /></span></b></td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" height="31" align="left">
                                    <span>From</span>
                                </td>
                                <td colSpan={7} valign="middle" align="left"><b><span>Shift In Charge, WRLDC, Mumbai</span></b></td>
                            </tr>
                            <tr>
                                <td valign="middle" height="28" align="left">
                                    <span>Copy To</span>
                                </td>
                                <td colSpan={7} valign="middle" align="left">
                                    <input type="text" style={{ width: "100%" }} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={8} valign="middle" height="21" align="left"><b><span>Sub : Violation of Indian Electricity Grid Code</span></b></td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="middle" height="42" align="left"><b><span>Type of Violation</span></b></td>
                                <td valign="middle" align="left"><b><span>Category of Violation</span></b></td>
                                <td valign="middle" align="left"><b><span>IEGC Clause</span></b></td>
                                <td colSpan={4} valign="middle" align="center"><b><span>Details</span></b></td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="79" align="left">
                                    <span>Frequency Violation</span>
                                </td>
                                <td valign="middle" align="left">
                                    <span>Emergency /</span>
                                </td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>5.2(m)</span>
                                </td>
                                <td colSpan={4} rowSpan={2} valign="middle" align="center">
                                    <span>{`${pageState.ui.freq} Hz`}</span>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left">
                                    <span>Alert</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="79" align="left">
                                    <span>Voltage Violation</span>
                                </td>
                                <td valign="middle" align="left">
                                    <span>Emergency /</span>
                                </td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>5.2(s) 6.4.12 6.6.3 6.6.6</span>
                                </td>
                                <td colSpan={4} rowSpan={2} valign="middle" align="center">
                                    <textarea style={{ width: "100%" }}
                                        rows={2}
                                        value={pageState.ui.voltViolationMsg}
                                        onChange={(ev) => { pageStateDispatch(setVoltViolMsgAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left">
                                    <span>Alert</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="100" align="left">
                                    <span>Loading Violation</span>
                                </td>
                                <td valign="middle" align="left"><b><span><br /></span></b></td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>6.4.12</span>
                                </td>
                                <td colSpan={4} valign="middle" align="left">
                                    <textarea style={{ width: "100%" }} rows={1}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left"><b><span>Alert</span></b></td>
                                <td colSpan={4} valign="middle" align="left">
                                    <textarea style={{ width: "100%" }} rows={1}
                                        value={pageState.ui.loadViolationMsg}
                                        onChange={(ev) => { pageStateDispatch(setLoadViolMsgAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="79" align="left">
                                    <span>Zero Crossing Violation</span>
                                </td>
                                <td valign="middle" align="left">
                                    <span>Emergency /</span>
                                </td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>6.4.6</span>
                                </td>
                                <td colSpan={4} rowSpan={2} valign="middle" align="center">
                                    <textarea style={{ width: "100%" }} rows={2}
                                        value={pageState.ui.zcvViolationMsg}
                                        onChange={(ev) => { pageStateDispatch(setZcvViolMsgAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left">
                                    <span>Alert</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="155" align="left">
                                    <span>Deviation Violation</span>
                                </td>
                                <td valign="middle" align="left">
                                    <span>Emergency /</span>
                                </td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>5.4.2(a) 5.4.2(b) 6.4.6 6.4.7 6.4.10 6.4.12 </span>
                                </td>
                                <td colSpan={4} valign="bottom" align="center">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left">
                                    <span>Alert</span>
                                </td>
                                <td colSpan={4} valign="middle" align="left">
                                    <textarea
                                        rows={9}
                                        style={{ width: "100%" }}
                                        value={pageState.ui.msgInstructions}
                                        onChange={(ev) => { pageStateDispatch(setMsgInstrucAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="middle" height="86" align="left"><b><span>Special Events</span></b></td>
                                <td valign="middle" align="left"><b><span><br /></span></b></td>
                                <td valign="middle" align="left"><b><span><br /></span></b></td>
                                <td colSpan={4} valign="middle" align="center">
                                    <textarea
                                        rows={5}
                                        style={{ width: "100%" }}
                                        value={pageState.ui.splEvnts}
                                        onChange={(ev) => { pageStateDispatch(setSplEvntsAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={8} valign="middle" height="21" align="center">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="71" align="left">
                                    <span>{`${pageState.ui.isGenSelected ? "Constituents" : "Generators"}`}</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>{`Schedule ${pageState.ui.isGenSelected ? "Injection" : "Drawal"}`}</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>{`Acual ${pageState.ui.isGenSelected ? "Injection" : "Drawal"}`}</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Actual Deviation</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Area Control Error</span>
                                </td>
                                <td colSpan={2} valign="middle" align="right">
                                    <span>{`Desired ${pageState.ui.isGenSelected ? "Injection" : "Drawal"}`}</span>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="right">
                                    <span>MW</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>MW</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>MW</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>MW</span>
                                </td>
                                <td colSpan={2} valign="middle" align="right">
                                    <span>MW</span>
                                </td>
                            </tr>
                            {pageState.ui.violInfoRows.map((v) =>
                                <tr>
                                    <td colSpan={2} valign="bottom" height="20" align="center">
                                        <span>{v.name}</span>
                                    </td>
                                    <td valign="bottom" align="right">
                                        <span>{Math.round(v.schedule)}</span>
                                    </td>
                                    <td valign="bottom" align="right">
                                        <span>{Math.round(v.drawal)}</span>
                                    </td>
                                    <td valign="bottom" align="right">
                                        <span>{Math.round(v.drawal - v.schedule)}</span>
                                    </td>
                                    <td valign="bottom" align="right">
                                        <span>{isNaN(v.ace) ? "" : Math.round(v.ace)}</span>
                                    </td>
                                    <td valign="bottom" align="right" colSpan={2}>
                                        <span>{Math.round(v.schedule)}</span>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan={2} valign="bottom" height="20" align="center">
                                    <span></span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span></span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span></span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span></span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span></span>
                                </td>
                                <td valign="bottom" align="right" colSpan={2}>
                                    <span></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="bottom" height="20" align="center">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td colSpan={2} valign="bottom" align="center">
                                    <input
                                        value={siName}
                                        style={{ width: "100%" }}
                                        onChange={(ev) => {
                                            setSiName(ev.target.value)
                                        }} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="bottom" height="28" align="center">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                                <td colSpan={2} valign="middle" align="center"><b><span>SHIFT INCHARGE</span></b></td>
                            </tr>
                        </tbody>
                    </table>
                </>
            }
            {/* <pre>{JSON.stringify(pageState.ui.violInfoRows, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(pageState, null, 2)}</pre> */}
        </>
    );
}
export default ViolMsgApp;