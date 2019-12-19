import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Button, Card, CardDeck, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { get_essays } from '../../redux/action-creators/writinglist';

class WritingList extends Component {

    componentDidMount() {
        this.props.get_essays(this.props.userInfo.token);
    }
    
    render() {
        console.log(this.props);
        return (
        <Tabs bg="secondary" text="white"  id="controlled-tab-example" >
            <Tab eventKey="my-essays" title="MY ESSAYS"
            >
                
                {this.props.writinglist.writings.map(item => {
                    if(item.author === this.props.userInfo.username) 
                        return (
                            <div>
                            <Card bg="light" style={{ width: '36rem' }}>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Reviewer: {item.reviewer}</ListGroupItem>
                                    <ListGroupItem>Status: {item.status}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Link to={ {
                                        pathname: "/show-writing/" + item.id
                                    }
                                    }>See Essay</Link>
                                </Card.Body>
                            </Card>
                            <br />
                            </div>
                        );
                    
                })}
                


            </Tab>
            <Tab eventKey="review-requests" title="REVIEW REQUESTS" 
            >
                {this.props.writinglist.writings.map(item => {
                    if(item.reviewer === this.props.userInfo.username) 
                        return (
                            <div>
                            <Card bg="light" style={{ width: '36rem' }}>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Author: {item.author}</ListGroupItem>
                                    <ListGroupItem>Status: {item.status}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Link to={ {
                                        pathname: "/show-writing/" + item.id
                                    }
                                    }>See Essay</Link>
                                    
                                </Card.Body>
                            </Card>
                            <br />
                            </div>
                        );
                    
                })}
            </Tab>
       
      </Tabs>
        )

    }
}

const mapStateToProps = ({ userInfo, writinglist }) => ({
    userInfo,
    writinglist,
  });
  
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_essays
        },
        dispatch
    );

    export default (
        connect(
          mapStateToProps,
          mapDispatchToProps
        )(WritingList)
    );