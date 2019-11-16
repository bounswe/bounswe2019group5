import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Button} from 'react-chat-elements';
import { Link } from 'react-router-dom'

import { get_user_recommendations, set_recommendation_language } from '../../redux/action-creators/recommendation';


class Recommendation extends Component {

    handleChange = e => {
        this.props.set_recommendation_language(e.target.value);
    };

    render() {
        return (
        <div>
            <h3>Recommendations</h3>
            <select
                className="input form-control"
                onChange={this.handleChange}
                value={this.props.recommendation.language}>
                <option value=''></option>
                <option value='english'>English</option>
                <option value='german'>German</option>
                <option value='turkish'>Turkish</option>
            </select>
            <br></br>
            <Button
                color='blue'
                backgroundColor='green'
                text='Get Recommendations'
                onClick={
                    () => {
                        this.props.get_user_recommendations(this.props.userInfo.token, this.props.recommendation.language);
                }}
            />

            <ul>
                {this.props.recommendation.recommended_users.map(item => (
                <li key={item.id}>
                    <div>Name: {item.first_name}</div>
                    <div>Surname: {item.last_name}</div>
                    <div>Rating: {item.rating_average}</div>
                    <Link to={ {
                        pathname: "/chat/" + item.username
                    } 
                    }>Chat With {item.first_name}</Link>
                </li>
                ))}
            </ul>
        </div>
        
        )
    }

}

const mapStateToProps = ({ userInfo, recommendation }) => ({
    userInfo,
    recommendation,
  });
  
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_user_recommendations,
            set_recommendation_language
        },
        dispatch
    );

    export default (
        connect(
          mapStateToProps,
          mapDispatchToProps
        )(Recommendation)
    );