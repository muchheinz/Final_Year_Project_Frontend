import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Home from "./Home";
import Company from "./Company";
import "./style.css"
import Header from "./Header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0074a9"
    },
    secondary: {
      main: "#e7e5df"
    }
  }
})

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div style={{"height": '100%'}}>
            <Header/>
            <Switch>
              <Route path={["/", "/home", "/index"]} component={Home} exact/>
              <Route path={"/company/:company_name"} component={Company}/>
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
