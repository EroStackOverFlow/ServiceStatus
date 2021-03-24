import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';


const ServiceList = (props) =>{
    const data ={
        name:'',
        details:''
    }
    const itemsState={
        items : []
    }

    const [ itemsData, setItems] = useState(itemsState);

    const { items } = itemsData;

    const [todoData, setTodoData] = useState(data);

    const { name, details } = todoData;

    const handleChange = (event) => {
        setTodoData({...todoData, [event.target.id]: event.target.value});
    }

    const onSubmit =() => {
        if(details === '' || name === ''){
            alert("fill in all fields");
            return;
        }

        for(let item of items){
            if( name === item.name){
                alert("this item name is already in use!");
                return;
            }

        }

        axios.post(
            `https://localhost:8000/api/tasks`,
            {
                name:name,
                details:details
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
    }

    const taskDidMount = () => {
        axios.get(`https://localhost:8000/api/services`)
            .then(res => {
                setItems({...itemsData, ['items']: res.data['hydra:member']});
            })
    }


    const deleteTodo = (id) => {

         axios.delete(`https://localhost:8000/api/services/${id}`)
            .then(res => {
                console.log(res.data);
            })

        window.location.reload(true);
    }


    const editTodo = (id) => {

        const new_values = prompt("enter a new value details");
        if(new_values === ''){
            alert("fill in all fields");
            return;
        }

        axios.patch(`https://localhost:8000/api/services/${id}`, {status:new_status })
            .then(res => {
                console.log(res.data);
            })

        window.location.reload(true);
    }

    const  renderTodos = () =>{

            return (
                <div>
                    {items.map((item) => (
                            <Grid container spacing={0} className="list-group-item" key={item.id}>
                                <Grid item xs={3}>
                                    <Button  variant="outlined" color="primary">{item.name}</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button  variant="outlined" color="secondary">{item.name}</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <EditRoundedIcon onClick={() =>editTodo(item.id)} />
                                </Grid>
                                <Grid item xs={2}>
                                    <DeleteForeverIcon onClick={() =>deleteTodo(item.id)} />
                                </Grid>
                            </Grid>
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
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        taskDidMount();
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
                            <Grid item xs={6}>
                                  <Paper className={classes.paper}>Add a service</Paper>
                            </Grid>

                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Paper className={classes.paper}>
                                <form className="form-row align-items-center">
                                    <input value={title}
                                         type="text"
                                         placeholder="service name"
                                         onChange={handleChange}
                                         className="form-control mb-2"
                                         id="name"
                                     />
                                    <input value={title}
                                           type="text"
                                           placeholder="service details"
                                           onChange={handleChange}
                                           className="form-control mb-2"
                                           id="details"
                                    />
                                    <button
                                        onClick={() =>addTodo()}
                                        className="btn btn-primary"
                                    >
                                        Add
                                    </button>
                              </form>
                          </Paper>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                          >
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>All Tasks</Paper>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={0} className="list-group-item" >
                                        <Grid item xs={3}>
                                            Remaining Services
                                        </Grid>
                                        <Grid item xs={3}>
                                            details
                                        </Grid>
                                        <Grid item xs={2}>
                                            edit details
                                        </Grid>
                                        <Grid item xs={2}>
                                            delete
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper className={classes.paper}>{renderTodos()}</Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
           </div>
          )

}

export default ServiceList;
