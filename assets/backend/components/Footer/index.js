import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Footer = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();


    return (
        <footer>
            <Grid container spacing={3} className="footer-container">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <p> make by ero senin</p>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <p>Images Wolverine, Iron-man, Spider-man, Batman are taking on iconFinder.com</p>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer
