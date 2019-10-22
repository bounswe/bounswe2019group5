import React, { useState  } from "react";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form } from 'react-bootstrap';
import orange from '@material-ui/core/colors/orange';
import { Redirect } from "react-router";
import { login } from "../../redux/action-creators/authentication";
import { connect } from "react-redux";


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundImage: 'url(https://github.com/bounswe/bounswe2019group5/blob/master/Images/bonibonarkaplan.jpg?raw=true)',
        },
    },
    paper: {
        padding: theme.spacing(3, 2),
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: theme.palette.common.white,
        borderColor: orange[400],
        borderWidth: '25px'
    },
    form: {
        width: '85%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function GuestLogin(props) {
    const classes = useStyles();

    const [state, setState] = useState( {
        nickname: "def-nickname",
        language: "",
    } );

    if (props.authentication.token != null) {
        return (
            <Redirect
                to={{
                    pathname: "/home"
                }}
            />
        );
    }

    return (<Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper} >
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
const mapStateToProps = ({  authentication }) => ({
    authentication
  });
  export default connect(
    mapStateToProps,
  )(GuestLogin);