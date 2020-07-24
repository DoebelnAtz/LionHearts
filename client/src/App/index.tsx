import React from 'react';
import { AppDiv } from "./Styles";
import { Route, Switch } from 'react-router-dom';
import { useGet, useWidth } from '../Hooks';

import Home from "./Home";
import './base.css';
import Signup from "./Signup";

function App() {
    const [isMobile] = useWidth();
    return (
    <AppDiv>
      <Switch>
        <Route exact path={'/'}>
                <Home/>
        </Route>
          <Route exact path={'/signup'}>
              <Signup/>
          </Route>
      </Switch>
    </AppDiv>
  );
}

export default App;
