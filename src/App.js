import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Home from "./Home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0004ff"
    },
    secondary: {
      main: "#ff000a"
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
