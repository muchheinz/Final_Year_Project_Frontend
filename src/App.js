import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Home from "./Home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#80baff"
    },
    secondary: {
      main: "#8c72ff"
    }
  }
})

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path={["/", "/home", "/index"]} component={Home}/>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
