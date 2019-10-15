import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { stat } from "fs";
import { Link } from 'react-router-dom'


class Guest extends Component {
    state = {
        nickname: "def-nickname",
        language: "",
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSelect = e => {
        this.setState(state => {
            return {
                ...state,
                language: e.target.option
            }
        })
    }

    render() {
        return (
            <div>
                <form>
                    <label>Type nickname or continue with default</label>
                    <input
                        type="text"
                        id="nickname"
                        onChange={this.handleChange}
                    />
                    <label>Language</label>
                    <select onSelect={this.handleSelect}>
                        <option value="english">English</option>
                        <option value="turkish">Turkish</option>
                        <option value="german">German</option>
                    </select>
                    <button> <Link to="/prof-test">Continue as guest</Link>
                    </button>
                </form>
            </div>
        )
    }

}

export default Guest;