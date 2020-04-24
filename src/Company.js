import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import MenuIcon from '@material-ui/icons/Menu';
import {fade, TextField, AppBar, Toolbar, IconButton, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {useParams} from "react-router-dom"
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {Tooltip} from '@material-ui/core';
import Header from './Header'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import GridList from "@material-ui/core/GridList";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        margin: '20px',
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    description: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.text.secondary,
        margin: '20px',
    },
    expansion: {
        marginTop: '64px',
    },
    title: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
        flexBasis: '33.33%',
        flexShrink: 0,
        marginLeft: '20px',
        marginTop: '10px',
        marginBottom: '10px',
        color: 'grey',
    },
    card: {
        margin: '5px',
        backgroundColor: '#9ECBE0',
        alignSelf: 'flex-start',
        width: '80px',
        textAlign: 'center'
    },
    cardText: {
        color: 'white',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    portContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    vulnsContainer: {
        maxHeight: '50vh',
        overflowY: 'scroll'
    },
    loading: {
        display: "flex",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

function dataReader(subs, classes) {
    let node = []
    node.push(
        subs[0].domains.map((domain) => {
            if (domain.details) {
                return <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography className={classes ? classes.heading : null}>
                                    {subs[0].name + " - "}
                                    <br/><a href={domain.url}>{domain.url}</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography className={classes ? classes.description : null}>
                                    {subs[0].description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={4} className={classes.portContainer}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant={"h6"}>Open ports</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.portContainer}>
                                        {
                                            domain.details.ports.map((port) => {
                                                return <Card className={classes.card}><CardContent><Typography
                                                    className={classes.cardText}>{port}</Typography></CardContent></Card>
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8} className={classes.vulnsContainer}>
                                <Card>
                                    <CardContent>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Summary</TableCell>
                                                        <TableCell>CVSS</TableCell>
                                                        <TableCell>References</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        domain.details.vulns.map((vuln) => {
                                                            console.log(vuln)
                                                            return <TableRow>
                                                                <TableCell>{vuln[0]}</TableCell>
                                                                <TableCell>{vuln[1].summary}</TableCell>
                                                                <TableCell>{vuln[1].cvss}</TableCell>
                                                                <TableCell>{vuln[1].references.map((ref, index) => {
                                                                    return <Tooltip title={ref}><a href={ref}
                                                                                                   target={"_blank"}>[{index}]</a></Tooltip>
                                                                })}</TableCell>
                                                            </TableRow>

                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            }
            return null
        })
    )

    subs.forEach((e, i) => {
        if (i !== 0) {

            node.push(dataReader(e, classes))

        }
    })
    return node
}

export default function Company() {
    const classes = useStyles();
    const [inProgress, setInProgress] = useState(true)
    const {company_name} = useParams()
    const [subs, setSubs] = useState(null)

    useEffect(() => {
        axios.get("http://192.168.74.128:3000/scrape/" + company_name).then(res => {
            setInProgress(res.data.in_progress)
        })
    }, [])

    useEffect(() => {
        if (!inProgress) {
            axios.get("http://192.168.74.128:3000/company/" + company_name).then(res => {
                const companies = res.data
                setSubs(companies.companies[1])
            })
        }
    }, [inProgress])

    return subs === null ? (
        <div className={classes.loading}><CircularProgress size={70} disableShrink/></div>
    ) : (<div className={classes.expansion}>
        <ExpansionPanel expanded={false}>
            <ExpansionPanelSummary>
                <Typography className={classes ? classes.title : null}>
                    Company Name and Domain
                </Typography>
                <Typography className={classes ? classes.title : null}>
                    Description
                </Typography>
            </ExpansionPanelSummary>
        </ExpansionPanel>
        {subs.map((sub) => {
            return dataReader(sub, classes)
        })}
    </div>)
}
