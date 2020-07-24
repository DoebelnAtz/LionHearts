import React from 'react';
import { AppDiv } from "./Styles";
import { Route, Switch } from 'react-router-dom';
import { useGet, useWidth } from '../Hooks';

import Home from "./Home";
import './base.css';

function App() {
    const [isMobile] = useWidth();
    return (
    <AppDiv>
      <Switch>
        <Route exact path={'/'}>
                <Home/>
        </Route>
      </Switch>
    </AppDiv>
  );
}

export default App;
