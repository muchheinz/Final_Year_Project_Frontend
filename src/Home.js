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

import Header from './Header'

const useStyles = makeStyles(theme => ({
  container: {
      backgroundColor: theme.palette.primary
  }
}))



function Home(){
    const classes = useStyles()
    const [result, setResult] = useState(null)
    useEffect(()=>{
        axios.get("http://localhost:3001/company/1").then(res => {
            setResult(res.data.name)
        })
    },[])

    return (<div className={classes.container}>
        <Header/>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Column 1</TableCell>
                                <TableCell>Column 2</TableCell>
                                <TableCell>Column 3</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow>
                                    <TableCell>{result}</TableCell>
                                    <TableCell>{result}</TableCell>
                                    <TableCell>{result}</TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>Graph</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>Graph</Paper>
            </Grid>
        </Grid>
    </div>)
}

export default Home