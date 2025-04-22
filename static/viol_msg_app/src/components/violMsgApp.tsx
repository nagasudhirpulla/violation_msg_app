// https://react-bootstrap.github.io/components/modal/
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { useViolMsgAppReducer } from '../reducers/violMsgAppReducer';
import pageInitState, { MsgModes } from '../initial_states/violMsgAppInitState'
import { IUtilPnt } from '../typeDefs/utilPnt';
import { getViolationRowsAction } from '../actions/getViolationRowsAction';
import { getAlertBuyersAction } from '../actions/getAlertBuyersAction';
import moment from 'moment';
import { setMsgIdAction } from '../actions/setMsgIdAction';
import { setDistributionNamesAction } from '../actions/setDistributionNamesAction';
// import { setDistributionEmailsAction } from '../actions/setDistributionEmailsAction';
import { setMsgInstrucAction } from '../actions/setMsgInstrucAction';
// import { setViolTypeAction } from '../actions/setViolTypeAction';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { saveViolLogAction } from '../actions/saveViolLogAction';
import { deriveViolLog } from '../app_logic/deriveViolLog';
import { setVoltViolMsgAction } from '../actions/setVoltViolMsgAction';
import { setLoadViolMsgAction } from '../actions/setLoadViolMsgAction';
// import { setZcvViolMsgAction } from '../actions/setZcvViolMsg';
import { setSplEvntsAction } from '../actions/setSplEvntsAction';
import { setSelectedConsAction } from '../actions/setSelectedConsAction';
import { setSelectedGensAction } from '../actions/setSelectedGensAction';
import { getEmergencyBuyersAction } from '../actions/getEmergencyBuyersAction';
import { getAlertSellersAction } from '../actions/getAlertSellersAction';
import { getAlertOverInjSellersAction } from '../actions/getAlertOverInjSellersAction';
import { getAlertUnderInjSellersAction } from '../actions/getAlertUnderInjSellersAction';
import { getEmergencySellersAction } from '../actions/getEmergencySellersAction';
import { setMsgModeAction } from '../actions/setMsgModeAction';
import { setFreqViolMsgAction } from '../actions/setFreqViolMsgAction';
import { setDistributionEmailsAction } from '../actions/setDistributionEmailsAction';
import { setShInchAction } from '../actions/setShInchAction';
import 'react-toastify/dist/ReactToastify.css';

function ViolMsgApp() {
    let [pageState, pageStateDispatch] = useViolMsgAppReducer(pageInitState);
    const [showLogConfModal, setShowLogConfModal] = useState(false);
    const [isSendEnabled, setIsSendEnabled] = useState(false);

    useEffect(() => {
        console.log("Send button enabled:", isSendEnabled);
    }, [isSendEnabled]);

    const onSelConsChange = (selectedOptions: IUtilPnt[]) => {
        pageStateDispatch(setSelectedConsAction(selectedOptions))
    }

    const onSelGensChange = (selectedOptions: IUtilPnt[]) => {
        pageStateDispatch(setSelectedGensAction(selectedOptions))
    }

    const onConsViolRowsUpdateClick = () => {
        pageStateDispatch(getViolationRowsAction(false))
    }
    const onGensViolRowsUpdateClick = () => {
        pageStateDispatch(getViolationRowsAction(true))
    }

    const onPrintClick = () => {
        if (isSendEnabled) {
            setShowLogConfModal(true)
        } else {
            console.log("Send button is disabled. Please suggest Alert or Emergency first.");
        }
    }

    const onSaveLog = () => {
        pageStateDispatch(saveViolLogAction(deriveViolLog(pageState)))
        setShowLogConfModal(false)
        setIsSendEnabled(false)
    }

    const enableSendButton = () => {
        setIsSendEnabled(true);
        console.log("Enabling send button");
    }

    const onSuggestAlertBuyersClick = () => {
        pageStateDispatch(getAlertBuyersAction())
        enableSendButton()
    }
    const onSuggestEmergencyBuyersClick = () => {
        pageStateDispatch(getEmergencyBuyersAction())
        enableSendButton()
    }

    const onSuggestAlertSellersClick = () => {
        pageStateDispatch(getAlertSellersAction())
        enableSendButton()
    }
    const onSuggestEmergencySellersClick = () => {
        pageStateDispatch(getEmergencySellersAction())
        enableSendButton()
    }

    const onSuggestAlertOverInjSellersClick = () => {
        pageStateDispatch(getAlertOverInjSellersAction())
        enableSendButton()
    }

    const onSuggestAlertUnderInjSellersClick = () => {
        pageStateDispatch(getAlertUnderInjSellersAction())
        enableSendButton()
    }

    const onSelMsgModeChange = (mode: string) => {
        pageStateDispatch(setMsgInstrucAction("The voltage of following nodes is continuing to be outside the IEGC operation limits despite WRLDC directions vide message ref .... dated .... . Time of issue ... . To take remedial measures"))
        pageStateDispatch(setMsgModeAction(mode))
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
                        value={pageState.ui.selectedCons}
                        classNamePrefix="select" />
                    <button onClick={onSuggestAlertBuyersClick} className="btn btn-xs btn-info">Suggest Alert</button>
                    <button onClick={onSuggestEmergencyBuyersClick} className="btn btn-xs btn-warning ms-2">Suggest Emergency</button>
                    <button onClick={onConsViolRowsUpdateClick} className="btn btn-xs btn-success ms-2">Update</button>
                    <a href="http://10.2.100.56:8081/mis_dashboard/iegcViolMsgs/" target="_blank">
                        <button className="btn btn-xs btn-primary ms-2">Show Issued Messages</button>
                    </a>
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
                        value={pageState.ui.selectedGens}
                        classNamePrefix="select" />
                    <button onClick={onSuggestAlertSellersClick} className="btn btn-xs btn-info">Suggest Alert</button>
                    <button onClick={onSuggestEmergencySellersClick} className="btn btn-xs btn-warning ms-2">Suggest Emergency</button>
                    <button onClick={onSuggestAlertOverInjSellersClick} className="btn btn-xs btn-success ms-2">Suggest Over Injection Alert</button>
                    <button onClick={onSuggestAlertUnderInjSellersClick} className="btn btn-xs btn-success ms-2">Suggest Under Injection Alert</button>
                    <button onClick={onGensViolRowsUpdateClick} className="btn btn-xs btn-success ms-2">Update</button>
                </div>
                <div>
                    <label className='me-2'>Message Mode</label>
                    <select
                        className='select'
                        value={pageState.ui.msgMode}
                        onChange={e => onSelMsgModeChange(e.target.value)}>
                        {Object.keys(MsgModes).map((modeKey) => {
                            const modeVal = MsgModes[modeKey as keyof typeof MsgModes]
                            return <option key={modeVal}>{modeVal}</option>
                        })}
                    </select>
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
                                Send
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Send this Message ?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowLogConfModal(false)}>Close</Button>
                            <Button variant="primary" onClick={onSaveLog}>Send</Button>
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
                                <button onClick={onPrintClick} className={`mt-3 btn btn-primary ${isSendEnabled ? '' : 'disabled'}`}
                                    disabled={!isSendEnabled}>Send Message</button>
                                    <p>{isSendEnabled ? '' : 'Send button is disabled. Please suggest Alert or Emergency first.'}</p>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={7} rowSpan={5} valign="middle" height="100" align="center">
                                    <span>WESTERN REGIONAL LOAD DESPATCH CENTRE / पश्चिमी क्षेत्रीय भार प्रेषण केंद्र<br />
                                        F-3, MIDC Area, Marol, Andheri (East) , Mumbai 400 093 / एफ-3, एमआईडीसी क्षेत्र, मरोल, अंधेरी (पूर्व), मुंबई<br />
                                        Phone / फ़ोन (O) : 022-28202690, 28203885, 28203885, <br />
                                        Fax / फैक्स : 022-28235434, 28202630 website / वेबसाइट: www.wrldc.com, www.wrldc.in</span>
                                </td>
                                <td rowSpan={5} valign="middle" align="center">
                                    <span><br /><img src="static/img/logo.png" width="120" height="50" />
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
                                    <span>Message No. / संदेश क्रमांक</span>
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
                                <td valign="middle" align="left"></td>
                                <td valign="middle" align="left">
                                    <span>Date / दिनांक</span>
                                </td>
                                <td valign="middle" align="right"><b><span>{`${moment(pageState.ui.date).format("DD-MMM-YYYY")}`}</span></b></td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left"><b><span>{pageState.ui.msgMode}</span></b></td>
                                <td valign="middle" align="left">
                                    <span>Time of Issue / जारी करने का समय</span>
                                </td>
                                <td valign="middle" align="right"><b><span>{`${moment(pageState.ui.date).format("DD-MMM-YYYY HH:mm")}`}</span></b></td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left"><b><span>System State</span></b></td>
                                <td valign="middle" align="left"><b><span>{`${pageState.ui.systemState} (${pageState.ui.freq} Hz)`}<br /></span></b></td>
                                <td valign="middle" align="left">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" height="31" align="left">
                                    <span>From / द्वारा</span>
                                </td>
                                <td colSpan={7} valign="middle" align="left"><b><span>Shift In Charge, WRLDC, Mumbai / पाली प्रभारी प.क्ष.भा.प्रे.कें, मुंबई</span></b></td>
                            </tr>
                            <tr>
                                <td valign="middle" height="28" align="left">
                                    <span>To / प्रति</span>
                                </td>
                                <td colSpan={7} valign="middle" align="left">
                                    <input
                                        style={{ width: "100%" }}
                                        value={pageState.ui.distributionNames}
                                        onChange={(ev) => {
                                            pageStateDispatch(setDistributionNamesAction(ev.target.value))
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" height="28" align="left">
                                    <span>Emails</span>
                                </td>
                                <td colSpan={7} valign="middle" align="left">
                                    <input
                                        style={{ width: "100%" }}
                                        value={pageState.ui.distributionMails}
                                        onChange={(ev) => {
                                            pageStateDispatch(setDistributionEmailsAction(ev.target.value))
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={8} valign="middle" height="21" align="left"><b><span>Sub : Violation of Indian Electricity Grid Code / विषय : भारतीय विद्युत ग्रिड कोड का उल्लंघन</span></b></td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="middle" height="42" align="left"><b><span>Type of Violation / उल्लंघन का प्रकार</span></b></td>
                                <td valign="middle" align="left"><b><span>Category of Violation / उल्लंघन की श्रेणी</span></b></td>
                                <td valign="middle" align="left"><b><span>IEGC Clause / आईईजीसी धारा</span></b></td>
                                <td colSpan={4} valign="middle" align="center"><b><span>Details / विवरण</span></b></td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="79" align="left">
                                    <span>Frequency Violation / आवृति का उल्लंघन</span>
                                </td>
                                <td valign="middle" align="left">
                                    <span>Emergency / आपातकालीन</span>
                                </td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>30(1), 30(2), 30(3), 36 and 45(7)</span>
                                </td>
                                <td colSpan={4} rowSpan={2} valign="middle" align="center">
                                    <textarea style={{ width: "100%" }}
                                        rows={2}
                                        value={pageState.ui.freqViolationMsg}
                                        onChange={(ev) => { pageStateDispatch(setFreqViolMsgAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left">
                                    <span>Alert / चेतावनी</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="79" align="left">
                                    <span>Voltage Violation / वोल्टेज का उल्लंघन</span>
                                </td>
                                <td valign="middle" align="left">
                                    <span>Emergency / आपातकालीन</span>
                                </td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>In compliance to 39(3), 39(5), 39(7), 39 (12) to adhere to the requirements specified in IEGC Regulations: 29(15) and 29(16)</span>
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
                                    <span>Alert / चेतावनी</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="100" align="left">
                                    <span>Loading Violation / लोडिंग का उल्लंघन</span>
                                </td>
                                <td valign="middle" align="left"><b><span><br /></span></b></td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>35(1), 35(3) & 36</span>
                                </td>
                                <td colSpan={4} valign="middle" align="left">
                                    <textarea style={{ width: "100%" }} rows={1}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left"><span>Alert / चेतावनी</span></td>
                                <td colSpan={4} valign="middle" align="left">
                                    <textarea style={{ width: "100%" }} rows={1}
                                        value={pageState.ui.loadViolationMsg}
                                        onChange={(ev) => { pageStateDispatch(setLoadViolMsgAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} valign="middle" height="155" align="left">
                                    <span>Deviation Violation / शिड्यूल से विचलन का उल्लंघन</span>
                                </td>
                                <td valign="middle" align="left">

                                </td>
                                <td rowSpan={2} valign="middle" align="left">
                                    <span>30(1), 30(2), 30(3),  and 36</span>
                                    <br />
                                    <span>Clause 5(1) of DSM Regulation</span>
                                </td>
                                <td colSpan={4} valign="bottom" align="center">
                                    <span><br /></span>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="left">
                                    <span>{pageState.ui.msgMode}</span>
                                </td>
                                <td colSpan={4} valign="middle" align="left">
                                    <textarea
                                        rows={15}
                                        style={{ width: "100%" }}
                                        value={pageState.ui.msgInstructions}
                                        onChange={(ev) => { pageStateDispatch(setMsgInstrucAction(ev.target.value)) }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} valign="middle" height="86" align="left"><b><span>Special Events / विशेष घटना</span></b></td>
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
                                    <span>{`${pageState.ui.isGenSelected ? "Generators / जनरेटर" : "Constituents / उपभोक्ता"}`}</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>{`Schedule ${pageState.ui.isGenSelected ? "Injection / शिड्यूल इंजेक्शन" : "Drawal / शिड्यूल आहरण"}`}</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>{`Acual ${pageState.ui.isGenSelected ? "Injection / वास्तविक इंजेक्शन" : "Drawal / वास्तविक आहरण"}`}</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Actual Deviation / वास्तविक विचलन</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>Area Control Error / क्षेत्र नियंत्रण त्रुटि</span>
                                </td>
                                <td colSpan={2} valign="middle" align="right">
                                    <span>{`Desired ${pageState.ui.isGenSelected ? "Injection / इच्छित इंजेक्शन" : "Drawal / इच्छित आहरण"}`}</span>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="right">
                                    <span>MW / मेगा वाट</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>MW / मेगा वाट</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>MW / मेगा वाट</span>
                                </td>
                                <td valign="middle" align="right">
                                    <span>MW / मेगा वाट</span>
                                </td>
                                <td colSpan={2} valign="middle" align="right">
                                    <span>MW / मेगा वाट</span>
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
                                        style={{ width: "100%" }}
                                        value={pageState.ui.shiftIncharge}
                                        onChange={(ev) => {
                                            pageStateDispatch(setShInchAction(ev.target.value))
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
                                <td colSpan={2} valign="middle" align="center"><b><span>SHIFT INCHARGE / पाली प्रभारी</span></b></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <p style={{ fontSize: "x-small" }}> */}
                    {/*    {pageState.ui.distributionMails} */}
                    {/*</p> */}
                </>
            }
            {/* <pre>{JSON.stringify(pageState.ui.violInfoRows, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(pageState, null, 2)}</pre> */}
        </>
    );
}
export default ViolMsgApp;