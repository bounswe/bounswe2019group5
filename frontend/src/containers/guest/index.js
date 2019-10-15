import React, { useState  } from "react";
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form } from 'react-bootstrap';
import orange from '@material-ui/core/colors/orange';


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: orange[400],
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function Guest() {
    const classes = useStyles();

    const [state, setState] = useState( {
        nickname: "def-nickname",
        language: "",
    } );

    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            You can continue as a guest.
          </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="nickname"
                    label="Nickname"
                    name="nickname"
                    autoComplete="nickname"
                    autoFocus
                    onChange={(e) => {
                        setState({
                            [e.target.id]: e.target.value
                        });
                    }}
                />
                <Grid item xs={12}>
                    <Form.Label>Language to Learn</Form.Label>
                    <Form.Control as="select" onSelect={(e) => {
                        setState(state => {
                            return {
                                ...state,
                                language: e.target.option
                            }
                        })
                    }
                    }>
                        <option>English</option>
                        <option>Turkish</option>
                        <option>German</option>
                    </Form.Control>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary.contrast"
                    className={classes.submit}
                ><Link to="/prof-test">Continue as guest</Link>
                </Button>
            </form>
        </div>
    </Container>
    )
}
