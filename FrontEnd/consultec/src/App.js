
import React from 'react';

import LoginContainer from './containers/LoginContainer';

function App() {

  return (
    <div className="App">
      <LoginContainer />
    </div>
  );
}

export default App;


/*
import handleSubmit from './handlesubmit';
import { useRef } from 'react';

function App() {
  const dataRef = useRef()

  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }

  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
*/