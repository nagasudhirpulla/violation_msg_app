import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
// import { render } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import VoltViolMsgApp from './components/voltViolMsgApp';

// render(
//     <AtcViolMsgApp></AtcViolMsgApp>,
//     document.getElementById('root')
// );

ReactDOM.render(
    <React.Fragment>
      <ToastContainer />
      <VoltViolMsgApp />
    </React.Fragment>,
    document.getElementById('root')
  );