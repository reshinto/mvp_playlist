import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import Platform from "./components/Platform";

function App() {
  return (
    <Provider store={store}>
      <Platform />
    </Provider>
  );
}

export default App;


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
