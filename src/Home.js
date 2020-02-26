import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
      backgroundColor: theme.palette.primary.light
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

    return (<div className={classes.container}>{result}</div>)
}

export default Home