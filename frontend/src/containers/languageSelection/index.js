import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { login } from "../../redux/action-creators/authentication";
import { set_selected_language } from "../../redux/action-creators/userInfo"
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import LanguageGrid from "./languageGrid"


class LanguageSelection extends Component {
    state = { isLanguageSelected: false, language: null }
    constructor(props) {
        super(props);
    };
    handleSubmit = (language) => {
        this.props.set_selected_language(language);
        this.setState({ isLanguageSelected: true, language })
    };

    render() {
        const { classes } = this.props;
        if (this.props.userInfo.token == null) {
            return (
                <Redirect
                    to={{
                        pathname: "/home"
                    }}
                />
            );
        }
        else if (this.state.isLanguageSelected) {
            return (
                <Redirect
                    to={{
                        pathname: "/prof-test/"+this.state.language,
                    }}
                />
            );
        }
        else {
            return (
                <>
                    <Grid><Typography component="h1" variant="h3" align='center'>
                        Select a language first.
              </Typography>
                    </Grid>
                    <Grid><Typography component="h1" variant="button" align='center'>
.              </Typography>
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

const mapStateToProps = ({ userInfo }) => ({
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
