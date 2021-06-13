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
import { setIsGenSelAction } from '../actions/setIsGenSelAction';
import { setViolTypeAction } from '../actions/setViolTypeAction';

function ViolMsgApp() {
    let [pageState, pageStateDispatch] = useViolMsgAppReducer(pageInitState);

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
        pageStateDispatch(setIsGenSelAction(false))
        pageStateDispatch(getViolationRowsAction(selConsList))
    }
    const onGensViolRowsUpdateClick = () => {
        pageStateDispatch(setMsgTimeAction(new Date()))
        pageStateDispatch(setIsGenSelAction(true))
        pageStateDispatch(getViolationRowsAction(selGensList))
    }

    return (
        <>
            <div style={{ fontSize: "small", textAlign: "center" }}>
                <h2>WESTERN  REGIONAL  LOAD  DESPATCH  CENTRE</h2>
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
                    <button onClick={onConsViolRowsUpdateClick}>Update</button>
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
                    <button onClick={onGensViolRowsUpdateClick}>Update</button>
                </div>
            </div>
            {pageState.ui.violInfoRows.length > 0 &&
                <>
                    <h3 className="input_label_inline">{"Message No.: "}</h3>
                    <input
                        className="border_bottom"
                        value={pageState.ui.msgId}
                        onChange={(ev) => {
                            pageStateDispatch(setMsgIdAction(ev.target.value))
                        }} />
                    <h3>{`Time of Issue: ${moment(pageState.ui.date).format("DD-MMM-YYYY hh:mm")}`}</h3>
                    <h3>{`Frequency: ${pageState.ui.freq} Hz`}</h3>
                    <h3 className="input_label_inline">{"Violation Type: "}</h3>
                    <input
                        className="border_bottom"
                        value={pageState.ui.violType}
                        onChange={(ev) => {
                            pageStateDispatch(setViolTypeAction(ev.target.value))
                        }} />
                    <h4>Violation Information</h4>
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
                                    <td align={"center"}>{v.schedule}</td>
                                    <td align={"center"}>{v.drawal}</td>
                                    <td align={"center"}>{v.drawal - v.schedule}</td>
                                    <td align={"center"}>{v.ace}</td>
                                    <td align={"center"}>{v.schedule}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h3>Instructions</h3>
                    <textarea rows={8} cols={100}
                        className="instructions_textarea"
                        value={pageState.ui.msgInstructions}
                        onChange={(ev) => { pageStateDispatch(setMsgInstrucAction(ev.target.value)) }}></textarea>
                    <br />
                    <h3 className="input_label_inline">{"Shift Incharge: "}</h3>
                    <input
                        placeholder="Enter name"
                        className="border_bottom"
                        value={siName}
                        onChange={(ev) => {
                            setSiName(ev.target.value)
                        }} />
                </>
            }
            {/* <pre>{JSON.stringify(pageState.ui.violInfoRows, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(pageState, null, 2)}</pre> */}
        </>
    );
}
export default ViolMsgApp;