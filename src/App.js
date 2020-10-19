import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';

function App() {
  return (
    <div>
      <BrowserRouter> 
          <Main />
        </BrowserRouter>
    </div>
  );
}

export default App;
