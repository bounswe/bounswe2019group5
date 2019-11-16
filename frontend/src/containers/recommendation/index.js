import React, { Component } from "react";
import { Redirect, browserHistory } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { login, clear_authentication } from '../../redux/action-creators/authentication';
import { clear_user_profile } from '../../redux/action-creators/userInfo';
import { withStyles } from '@material-ui/core/styles';
import { Select } from "@material-ui/core";


class Recommendation extends Component {

    state = {
        language: "english",
        recommended_users: []
    };

    render() {
        return (
        <div>
            <h3>Recommendations</h3>
            <select
                className="input form-control"
                
                value={this.state.language}>
                <option value=''></option>
                <option value='english'>English</option>
                <option value='german'>German</option>
                <option value='turkish'>Turkish</option>
            </select>
        </div>
        
        
        
        
        
        
        
        )
    }

}

export default Recommendation;