// https://react-bootstrap.github.io/components/modal/
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { useViolMsgAppReducer } from '../reducers/violMsgAppReducer';
import pageInitState from '../initial_states/violMsgAppInitState'
import { IUtilPnt } from '../typeDefs/utilPnt';
import { getViolationRowsAction } from '../actions/getViolationRowsAction';
import { setMsgTimeAction } from '../actions/setMsgTimeAction';
import moment from 'moment';
import { getMsgInstructions } from '../app_logic/msgInstructions';

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

    let [isGenSelected, setIsGenSelected] = useState(false);
    let [msgInstructions, setMsgInstructions] = useState("");

    const onConsViolRowsUpdateClick = () => {
        pageStateDispatch(setMsgTimeAction(new Date()))
        setIsGenSelected(false)
        setMsgInstructions(getMsgInstructions(false))
        pageStateDispatch(getViolationRowsAction(selConsList))
    }
    const onGensViolRowsUpdateClick = () => {
        pageStateDispatch(setMsgTimeAction(new Date()))
        setIsGenSelected(true)
        setMsgInstructions(getMsgInstructions(true))
        pageStateDispatch(getViolationRowsAction(selGensList))
    }

    return (
        <>
            <h1>Violation Message Application</h1>
            <br />
            {/* <h3>Select Constituents</h3> */}
            <h3>{moment(pageState.ui.date).format("YYYY-MM-DD hh:mm")}</h3>
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
            {/* <h3>Select Generators</h3> */}
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

            <br />
            <h3>{`Frequency - ${pageState.ui.freq} Hz`}</h3>

            <br />
            <textarea value={msgInstructions} onChange={(ev) => { setMsgInstructions(ev.target.value) }}></textarea>

            <br />
            <table className={"viol_rows_table"}>
                <thead>
                    <td>Name</td>
                    <td>{`Scheduled ${isGenSelected ? "Injection" : "Drawal"}`}</td>
                    <td>{`Actual ${isGenSelected ? "Injection" : "Drawal"}`}</td>
                    <td>Actual Deviation</td>
                    <td>Area Control Error</td>
                    <td>{`Desired ${isGenSelected ? "Injection" : "Drawal"}`}</td>
                </thead>
                <tbody>
                    {pageState.ui.violInfoRows.map((v) =>
                        <tr>
                            <td>{v.name}</td>
                            <td>{v.schedule}</td>
                            <td>{v.drawal}</td>
                            <td>{v.drawal - v.schedule}</td>
                            <td>{v.ace}</td>
                            <td>{v.schedule}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* <pre>{JSON.stringify(pageState.ui.violInfoRows, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(pageState, null, 2)}</pre> */}
        </>
    );
}
export default ViolMsgApp;