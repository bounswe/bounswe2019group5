import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { login } from "../../redux/action-creators/authentication";
import { set_selected_language } from "../../redux/action-creators/userInfo"
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import LanguageGrid from "./languageGrid"


class LanguageSelection extends Component {
    state = { isLanguageSelected: false }
    constructor(props) {
        super(props);
        console.log(props.authentication.token);
    };
    handleSubmit = (language) => {
        this.props.set_selected_language(language);
        this.setState({ isLanguageSelected: true })
    };

    render() {
        const { classes } = this.props;
        if (this.state.isLanguageSelected) {
            return (
                <Redirect
                    to={{
                        pathname: "/prof-test",
                    }}
                />
            );
        }
        else {
            return (
                <>
                    <Grid><Typography component="h1" variant="h2" align='center'>
                        Select a language to take its proficiency test.
              </Typography>
                    </Grid>

                    <Grid container spacing={3} component="main" className={classes.root}>
                        <CssBaseline />
                        <LanguageGrid handleClick={() => this.handleSubmit("turkish")} avatarBg={"https://github.com/bounswe/bounswe2019group5/blob/frontend/Images/turkish-icon-.png?raw=true"} language={"Turkish"} />
                        <LanguageGrid handleClick={() => this.handleSubmit("english")} avatarBg={"https://github.com/bounswe/bounswe2019group5/blob/frontend/Images/english.png?raw=true"} language={"English"} />
                        <LanguageGrid handleClick={() => this.handleSubmit("german")} avatarBg={"https://github.com/bounswe/bounswe2019group5/blob/frontend/Images/germany-icon-18.png?raw=true"} language={"German"} />
                    </Grid>
                </>
            );
        }
    }
}

const mapStateToProps = ({ authentication, userInfo }) => ({
    authentication,
    userInfo
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            login,
            set_selected_language
        },
        dispatch
    );

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LanguageSelection));
