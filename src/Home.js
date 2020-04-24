import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import {IconButton, TextField, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  container: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center'
  },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '64px',
        height: '100%',
        width: '50%'
    },
    textStyle: {
        color: 'grey',
    }
}))



function Home(){
    const classes = useStyles()
    const [result, setResult] = useState(null)
    const [result2, setResult2] = useState(null)
    let history = useHistory();
    const [search, setSearch] = useState("")
    const handleSearch = (event) => {
        if (event.key === "Enter") {
            //setSearchString(event.target.value)
            history.push("/company/" + event.target.value)
        }
    }

    return (
        <div className={classes.container}>
                <div className={classes.textContainer}>
                    <TextField color={"secondary"}
                               onKeyPress={handleSearch} onChange={(e) => {setSearch(e.target.value)}} label={"Enter company name"} fullWidth/>
                    <IconButton onClick={() => {history.push("/company/" + search)}}>
                        <SearchIcon/>
                    </IconButton>
                </div>
        </div>
    )
}

export default Home