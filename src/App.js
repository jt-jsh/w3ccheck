import React from 'react';
import './App.css';
import W3C from './components/W3C';
// import DocParser from './DocParser';

function App(){
  return (
    <div className="app">
      {/* <a id="hi098123btn" onClick={() => DocParser('hwp')}>한글(.hwp) 다운로드</a> */}
      {/* <button id="hi098123btn" onClick={() => DocParser('doc', 121)}>리스트 다운로드</button> */}
      <W3C/>
    </div>
  );
}

export default App;
