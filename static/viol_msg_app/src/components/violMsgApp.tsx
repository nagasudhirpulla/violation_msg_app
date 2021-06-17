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
import { setViolTypeAction } from '../actions/setViolTypeAction';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { saveViolLogAction } from '../actions/saveViolLogAction';
import { deriveViolLog } from '../app_logic/deriveViolLog';

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
            <div style={{ fontSize: "small", textAlign: "center" }}>
                <h3>WESTERN  REGIONAL  LOAD  DESPATCH  CENTRE</h3>
                <p>F-3, MIDC Area, Marol, Andheri (East), Mumbai – 400093,</p>
                <p>Phone (O) : 022-28202690, 28203885, 28203885,</p>
                <p>Fax : 022-28235434, 28202630 website: www.wrldc.com, www.wrldc.in</p>
            </div>
            <br />
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
                    <h5 className="input_label_inline mb-3 mt-2">{"Message No.: "}</h5>
                    <input
                        className="border_bottom"
                        value={pageState.ui.msgId}
                        onChange={(ev) => {
                            pageStateDispatch(setMsgIdAction(ev.target.value))
                        }} />
                    <h5 className="mb-3">{`Time of Issue: ${moment(pageState.ui.date).format("DD-MMM-YYYY HH:mm")}`}</h5>
                    <h5 className="mb-3">{`Frequency: ${pageState.ui.freq} Hz`}</h5>
                    <h5 className="input_label_inline mb-3">{"Violation Type: "}</h5>
                    <input
                        className="border_bottom"
                        value={pageState.ui.violType}
                        onChange={(ev) => {
                            pageStateDispatch(setViolTypeAction(ev.target.value))
                        }} />
                    <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                        <thead>
                            <td>Utility Name</td>
                            <td>{`Scheduled ${pageState.ui.isGenSelected ? "Injection" : "Drawal"}`}</td>
                            <td>{`Actual ${pageState.ui.isGenSelected ? "Injection" : "Drawal"}`}</td>
                            <td>Actual Deviation</td>
                            <td>Area Control Error</td>
                            <td>{`Desired ${pageState.ui.isGenSelected ? "Injection" : "Drawal"}`}</td>
                        </thead>
                        <tbody>
                            {pageState.ui.violInfoRows.map((v) =>
                                <tr>
                                    <td align={"center"}>{v.name}</td>
                                    <td align={"center"}>{Math.round(v.schedule)}</td>
                                    <td align={"center"}>{Math.round(v.drawal)}</td>
                                    <td align={"center"}>{Math.round(v.drawal - v.schedule)}</td>
                                    <td align={"center"}>{Math.round(v.ace)}</td>
                                    <td align={"center"}>{Math.round(v.schedule)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h5 className="mt-3">Instructions</h5>
                    <textarea rows={8} cols={100}
                        className="instructions_textarea"
                        value={pageState.ui.msgInstructions}
                        onChange={(ev) => { pageStateDispatch(setMsgInstrucAction(ev.target.value)) }}></textarea>
                    <br />
                    <h5 className="input_label_inline mt-3">{"Shift Incharge: "}</h5>
                    <input
                        className="border_bottom"
                        value={siName}
                        onChange={(ev) => {
                            setSiName(ev.target.value)
                        }} />
                    <br />
                    <button onClick={onPrintClick} className="mt-3 btn btn-primary no-print">Print</button>
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
                            <tr>
                                <td colSpan={7} rowSpan={5} valign="middle" height="100" align="center">
                                    <span>WESTERN REGIONAL LOAD DESPATCH CENTRE<br />F-3, MIDC Area, Marol, Andheri (East) , Mumbai 400 093<br />Phone (O) : 022-28202690, 28203885, 28203885, <br />Fax : 022-28235434, 28202630 website: www.wrldc.com, www.wrldc.in</span>
                                </td>
                                <td rowSpan={5} valign="middle" align="center">
                                    <span><br /><img src="logo.png" width="83" height="92" />
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
                                    <input type="text" value="" style={{ width: "100%" }} />
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
                                    <span>49.85</span>
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
                                    <textarea style={{ width: "100%" }} rows={2}></textarea>
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
                                    <textarea style={{ width: "100%" }} rows={1}></textarea>
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
                                    <textarea style={{ width: "100%" }} rows={2}></textarea>
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
                                    <span>
                                        <textarea rows={5} style={{ width: "100%" }}></textarea>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="middle" height="86" align="left"><b><span>Special Events</span></b></td>
                                <td valign="middle" align="left"><b><span><br /></span></b></td>
                                <td valign="middle" align="left"><b><span><br /></span></b></td>
                                <td colSpan={4} valign="middle" align="center"><b><span><br /></span></b></td>
                            </tr>
                            <tr>
                                <td colSpan={8} valign="middle" height="21" align="center">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="71" align="left">
                                    <span>Constituents/Generators</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Schedule <br />Drawal / Injection</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Actual Drawal / Injection</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Actual Deviation</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Area Control Error</span>
                                </td>
                                <td colSpan={2} valign="middle" align="right">
                                    <span>Desired Drawal / Injection</span>
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
                            <tr>
                                <td colSpan={2} valign="bottom" height="20" align="center">
                                    <span>Gujarat</span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span>5191.28</span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span>5271.59</span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span>80.31</span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span>126.25</span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="right">
                                    <span>5191.28</span>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2} valign="bottom" height="20" align="center">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="bottom" height="20" align="center">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="bottom" height="20" align="center">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="bottom" height="20" align="center">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
                                </td>
                                <td valign="bottom" align="left">
                                    <span><br /></span>
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
                                    <span>Sunil Aharwal</span>
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