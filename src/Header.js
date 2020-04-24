import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import MenuIcon from '@material-ui/icons/Menu';
import {fade, TextField, AppBar, Toolbar, IconButton, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles(theme => ({}));


export default function Header() {
    const classes = useStyles();
    //const [searchString, setSearchString] = useState(null)
    let history = useHistory();
    let location = useLocation();
    const [search, setSearch] = useState("")
    let toGoBack = /\/company\//.test(location.pathname)
    const handleSearch = (event) => {
        if (event.key === "Enter") {
            //setSearchString(event.target.value)
            history.push("/company/" + event.target.value)
        }
    }

    return (
        <AppBar>
            <Toolbar>
                {
                    toGoBack ? <IconButton onClick={(e) => {
                        history.goBack()
                    }}><KeyboardBackspaceIcon/></IconButton> : <Typography>Company Domain Management</Typography>
                }

            </Toolbar>
        </AppBar>
    );
}
