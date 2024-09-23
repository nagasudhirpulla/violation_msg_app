import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
// import { render } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import ViolMsgApp from './components/violMsgApp';

// render(
//     <ViolMsgApp></ViolMsgApp>,
//     document.getElementById('root')
// );

ReactDOM.render(
    <React.Fragment>
      <ToastContainer />
      <ViolMsgApp />
    </React.Fragment>,
    document.getElementById('root')
  );