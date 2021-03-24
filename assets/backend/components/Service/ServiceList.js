import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {red} from "@material-ui/core/colors";
import AddService from './AddService';
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";


const ServiceList = (props) =>{
    const data ={
        name:'',
        details:'',
        status:''
    }
    const servicesState={
        services : []
    }

    const [ servicesData, setServices] = useState(servicesState);
    const { services } = servicesData;
    const [todoData, setTodoData] = useState(data);
    const { name, details, status } = todoData;
    const [btn, setBtn] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [idEit, setIdEdit] = useState(-1);
    const [nameEdit, setNameEdit] = useState('');
    const [detailsEdit, setDetailsEdit] = useState('');
    const [statusEdit, setStatusEdit] = useState('');

    const handleChange = (event) => {
        setTodoData({...todoData, [event.target.id]: event.target.value});
    }


    const servicesDidMount = () => {
        axios.get(`https://localhost:8000/api/services`)
            .then(res => {
                setServices({...servicesData, ['services']: res.data['hydra:member']});
            })
    }


    useEffect(function () {
        servicesDidMount();
        setIsModified(false);
    }, [isModified]);



    const onSubmit =() => {
        if(details === '' || name === ''){
            alert("fill in all fields");
            return;
        }

        for(let service of services){
            if( name === service.name){
                alert("this service name is already in use!");
                return;
            }
        }

        axios.post(
            `https://localhost:8000/api/services`,
            {
                name:name,
                details:details,
                status:status
            }
        ).then(res => {
            console.log(res);
            console.log(res.data);
        })

    }

    const addTodo = () =>{
        onSubmit();
        setTodoData({...todoData, ['name']: ''});
        setTodoData({...todoData, ['details']: ''});
        setTodoData({...todoData, ['status']: ''});
    }


    const deleteTodo = (id) => {

        axios.delete(`https://localhost:8000/api/services/${id}`)
            .then(res => {
                console.log(res.data);
                setIsModified(true);
            })
        // window.location.reload(true);
    }
    useEffect(function () {
        servicesDidMount();
        setIsModified(false);
    }, [isModified]);


    const editTodo = (id) => {

        if (id == idEit && btn === true) {
            setBtn(false);
            return true;
        }

        setIdEdit(id);
        setBtn(true);

    }

    useEffect(function () {

        for(let service of services){
            if(service.id === idEit){
                setNameEdit(service.name);
                setDetailsEdit(service.details);
                setStatusEdit(service.status);
            }
        }

    }, [idEit]);

    useEffect(function () {
        setNameEdit(name);
    }, [name]);

    useEffect(function () {
        setDetailsEdit(details);
    }, [details]);

    useEffect(function () {
        setStatusEdit(status);
    }, [status]);


    const editSubmit = () => {

        if(details === '' || name === ''){
            if(detailsEdit === '' || nameEdit === '') {
                alert("fill in all fields");
                return;
            }
        }

        for(let service of services){
            if( name === service.name && idEit !== service.id){
                alert("this service name is already in use!");
                return;
            }
        }

        axios.patch(`https://localhost:8000/api/services/${idEit}`,
            {
                name:nameEdit,
                details:detailsEdit,
                status:statusEdit
            })
            .then(res => {
                console.log(res.data);
                setIsModified(true);
            })

        setBtn(false);
        //window.location.reload(true);
    }



    const  renderServices = () =>{
        return (
            <div>
                {services.map((service) => (
                        <List key={service.id}>
                            <ListItem>
                                <Grid container spacing={0} className="list-group-item" >
                                    <Grid item xs={1}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {service.status === 'running' ? <AssignmentTurnedInIcon className={"is_running"} /> :
                                                    ( service.status === 'not running' ? <AssignmentLateIcon className={"is_not_running"} /> :
                                                        <AssessmentIcon className={"is_created"} />)}
                                            </Avatar>
                                        </ListItemAvatar>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <ListItemText primary={service.name} />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <ListItemText primary={service.details}/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit"
                                                        onClick={() =>editTodo(service.id)}
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete"
                                                        onClick={() =>deleteTodo(service.id)}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </Grid>

                                </Grid>

                            </ListItem>

                            <Divider/>
                        </List>
                    )
                )}
                { btn ?
                    <Grid
                        item
                        xs={12}
                        sm={12}
                    >
                        <Paper className={classes.paperEdit}>Edit a service</Paper>
                        <Paper className={classes.paper}>
                            <form className="form-row align-items-center">
                                <input value={name}
                                       type="text"
                                       placeholder={nameEdit}
                                       onChange={handleChange}
                                       className="form-control mb-2"
                                       id="name"
                                />
                                <input value={details}
                                       type="text"
                                       placeholder={detailsEdit}
                                       onChange={handleChange}
                                       className="form-control mb-2"
                                       id="details"
                                />
                                <select onChange={handleChange} id="status" className="form-control mb-2">
                                    <option value={statusEdit}>{statusEdit}</option>
                                    <option value="created">created</option>
                                    <option value="running">running</option>
                                    <option value="not running">not running</option>
                                </select>
                                <Button
                                    onClick={() => editSubmit()}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon/>}
                                >
                                    Edit a service
                                </Button>
                            </form>
                        </Paper>

                    </Grid>
                    :
                    <div></div>
                }
            </div>
        )
    }


    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            '& > *': {
                margin: theme.spacing(1),
            },
            width:'80%',
            margin:'auto'
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        paperEdit: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: red,
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
                <Grid
                    direction="row"
                    container
                    className={"main_container_grid"}
                    spacing={3}
                >
                    <AddService />
                    <Grid
                        item
                        xs={6}
                        sm={6}>
                        <Paper className={classes.paper}>All Services</Paper>
                        <Paper className={classes.paper}>
                            <Grid container spacing={0} className="list-group-item" >
                                <Grid item xs={1}>

                                </Grid>
                                <Grid item xs={4}>
                                    Remaining Services
                                </Grid>
                                <Grid item xs={5}>
                                    details
                                </Grid>
                                <Grid item xs={2}>
                                    edit/delete
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>{renderServices()}</Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}

export default ServiceList;
