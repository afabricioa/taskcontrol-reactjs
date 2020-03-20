import React from 'react';
import './App.css';
import Board from './components/Board'
import NovoGrupo from './components/NovoGrupo';

function App() {
  return (
    <div className="App">
        <div>
            <Board />
        </div>
        <div>
            <NovoGrupo />
        </div>
    </div>
  );
}

export default App;
