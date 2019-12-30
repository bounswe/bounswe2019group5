import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Button} from 'react-chat-elements';
import { Link } from 'react-router-dom'
import {  Card, CardDeck, Image, ListGroup, ListGroupItem } from 'react-bootstrap';

import { get_user_recommendations, set_recommendation_language } from '../../redux/action-creators/recommendation';


class Recommendation extends Component {

    componentDidMount() {
        if (this.props.language)
            set_recommendation_language(this.props.language);
    }

    handleChange = e => {
        this.props.set_recommendation_language(e.target.value);
    };

    render() {

        return (
        <div>
            <div>
            <h3>Recommendations</h3>
            {!this.props.language &&
                <select
                    className="input form-control"
                    onChange={this.handleChange}
                    value={this.props.recommendation.language}>
                    <option value=''></option>
                    <option value='english'>English</option>
                    <option value='german'>German</option>
                    <option value='turkish'>Turkish</option>
                </select>
            }
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
            <br />
            </div>

            <ul>
                {this.props.recommendation.recommended_users.map(item => {
                    if(this.props.mode!=='callback(username)')
                        return (
                            <li key={item.id}>
                                <div>
                                <Card bg="light" style={{ width: '36rem' }}>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Name: {item.first_name}</ListGroupItem>
                                        <ListGroupItem>Surname: {item.last_name}</ListGroupItem>
                                        <ListGroupItem>Rating: {item.rating_average}</ListGroupItem>
                                        <ListGroupItem>
                                        <Link to={ {
                                            pathname: "/chat/" + item.username
                                        }
                                        }>Chat With {item.first_name}</Link>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                        <Link to={ {
                                        pathname: "/upload-writing/" + item.username
                                        }
                                        }>Send Essay Reviewing Request to {item.first_name}</Link>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                        <Link to={ {
                                        pathname: "/profile/" + item.username
                                        }
                                        }>See Profile of {item.first_name}</Link>
                                        </ListGroupItem>
                                    </ListGroup>
                                    
                                </Card>
                                <br />
                                </div>
                                
                            </li>
                        );
                    else
                        return (
                            <li key={item.id}>
                                <div>
                                <Card bg="light" style={{ width: '20rem' }}>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Name: {item.first_name}</ListGroupItem>
                                        <ListGroupItem>Surname: {item.last_name}</ListGroupItem>
                                        <ListGroupItem>Rating: {item.rating_average}</ListGroupItem>
                                        <ListGroupItem>
                                            <Button onClick={() => this.props.onSelect(item.username)}
                                            text = {"Select "+item.first_name+" as Reviewer"}/>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                                <br />
                                </div>
                            </li>
                        );
                })}
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