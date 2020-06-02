import React from 'react';
import { AppDiv } from "./Styles";
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <AppDiv>
      <Switch>
        <Route exact path={'/'}>
                Hello World
        </Route>
      </Switch>
    </AppDiv>
  );
}

export default App;
