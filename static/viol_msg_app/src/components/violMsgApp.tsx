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
                    <h5 className="mb-3">{`Time of Issue: ${moment(pageState.ui.date).format("DD-MMM-YYYY hh:mm")}`}</h5>
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
                </>
            }
            {/* <pre>{JSON.stringify(pageState.ui.violInfoRows, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(pageState, null, 2)}</pre> */}
        </>
    );
}
export default ViolMsgApp;