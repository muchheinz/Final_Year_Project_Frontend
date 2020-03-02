import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import MenuIcon from '@material-ui/icons/Menu';
import {fade, TextField, AppBar, Toolbar, IconButton, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({

}));


export default function Header(){
    const classes = useStyles();
    const handleSearch = (event)=>{
        if(event.key === "Enter")
        {
            const searchString = event.target.value
            axios.post(searchString)
        }
    }

    return (
        <AppBar>
            <Toolbar>
                <TextField color={"secondary"} variant={"outlined"} onKeyPress={handleSearch}/>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
            </Toolbar>
        </AppBar>
    );
}
