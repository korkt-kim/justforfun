

import './App.css';

import Router from './utils/router'
import GNB from './components/GNB';


function App() {
  return (
    <div className="App">
   
           
      <GNB>
        <GNB.Item to={'/'}>
          홈
        </GNB.Item>
        <GNB.Item to={'/qna'}>
          질문게시판
        </GNB.Item>
        <GNB.Item to={'/board'}>
          자유게시판
        </GNB.Item>
      </GNB>
      <Router/>
    </div>
  );
}

export default App;
