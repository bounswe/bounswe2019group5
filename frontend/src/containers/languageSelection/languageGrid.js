import orange from '@material-ui/core/colors/orange';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundColor: orange[400],
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        padding: theme.spacing(3, 2),
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.text.secondary    
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
        },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LanguageGrid({ avatarBg, language, handleClick }) {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={4} component={Paper} >
                <div className={classes.paper}>
                    <Avatar  className={classes.avatar} src={avatarBg}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Learn {language}
                    </Typography>
                    <Button onClick = {() => handleClick(language)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {language}
                    </Button>
                </div>
            </Grid>
        </>
    );
}
export default LanguageGrid;
