import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssessmentIcon from "@material-ui/icons/Assessment";


const ServiceList = (props) =>{

    const servicesState={
        services : []
    }

    const [ servicesData, setServices] = useState(servicesState);
    const { services } = servicesData;
    const [dense, setDense] = React.useState(false);

    const servicesDidMount = () => {
        axios.get(`/api/services`)
            .then(res => {
                setServices({...servicesData, ['services']: res.data['hydra:member']});
            })
    }

    const  renderServices = () =>{

            return (
                <div>
                    {services.map((service) => (
                            <List dense={dense} key={service.id}>
                               <ListItem>

                                  <Grid container spacing={0} className="list-group-item" >
                                      <Grid item xs={2}>
                                        <ListItemAvatar>
                                          <Avatar>
                                              {service.status === 'running' ? <AssignmentTurnedInIcon className={"is_running"} /> :
                                                  ( service.status === 'not running' ? <AssignmentLateIcon className={"is_not_running"} /> :
                                                      <AssessmentIcon className={"is_created"} />)}
                                          </Avatar>
                                        </ListItemAvatar>
                                      </Grid>

                                      <Grid item xs={5}>
                                        <ListItemText
                                          primary={service.name}
                                        />
                                      </Grid>

                                      <Grid item xs={5}>
                                           <ListItemText primary={service.details}/>
                                      </Grid>

                                  </Grid>

                                </ListItem>

                                <Divider/>
                            </List>
                        )
                    )}
                </div>
            )
        }




   const  signOut = (event) =>{
      props.history.push('/backend');
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        paper: {
            padding: theme.spacing(1),
            color: theme.palette.text.secondary,
        },
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        servicesDidMount();
    },[]);

        return(
            <div>
                <div className={classes.root} >
                    <Grid container spacing={3}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                          >
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>All Services</Paper>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={0} className="list-group-item" >
                                        <Grid item xs={2}>
                                        </Grid>
                                        <Grid item xs={5}>
                                            Remaining Services
                                        </Grid>
                                        <Grid item xs={5}>
                                            details
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper className={classes.paper}>{renderServices()}</Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
           </div>
          )

}

export default ServiceList;
