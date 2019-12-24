import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from 'lodash';

import 'react-chat-elements/dist/main.css';
import { MessageList,SystemMessage,Input,Button, SideBar, MessageBox, ChatList } from 'react-chat-elements';

import { clear_chat_history, get_chat_history } from '../../../redux/action-creators/chat';

import {Button as BootstrapButton, Modal} from 'react-bootstrap';

import Recommendation from '../../recommendation';
import { Typography } from '@material-ui/core';

export class ChatHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatWith: null,
            isRecommendExpert: false,
            selectedExpert: null,
        };
    }

    componentDidMount() {
        this.props.clear_chat_history();
        const f = () => {
            this.props.get_chat_history(this.props.userInfo.token, this.props.userInfo.username);
            this.timer = setTimeout(f, 5000);
        }
        f();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
    }

    componentWillUnmount() {
        this.props.clear_chat_history();
        clearTimeout(this.timer);
    }

    render() {
        if (this.props.userInfo.token == null) {
            return (
                <Redirect
                    to={{
                        pathname: "/home"
                    }}
                />
            );
        }

        if (this.state.chatWith) {
            return (
                <Redirect
                    to={{
                        pathname: "/chat/"+this.state.chatWith,
                    }}
                />
            );
        }

        return (
            <div style={{ display: 'flex', 'flex-direction': 'column', height: '60vh', border: '4px solid purple', 'border-radius': '3px', margin: '20px'  }}>
                
                <Modal
                    style={{
                        minHeight: '50vh',
                        maxHeight: '2000vh',
                        minWidth: '50vw',
                        maxWidth: '50vw',
                        backgroundColor: "white",
                        'overflow-y': 'auto'
                    }}
                    show={this.state.isRecommendExpert}
                    onHide={()=>{this.setState({isRecommendExpert: false});}}>
                    <Modal.Body>
                        <Recommendation 
                                mode="callback(username)"
                                language={this.state.language!=="none" ? this.state.language: null}
                                onSelect={(username) => 
                                    {
                                        this.props.goChatWith? this.props.goChatWith(username) : this.setState({chatWith: username});
                                        this.setState({isRecommendExpert: false});
                                    }}
                                />
                    </Modal.Body>
                </Modal>
                
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{flex: 6}}/>
                    <BootstrapButton
                        variant="light"
                        onClick={()=>this.setState({isRecommendExpert: true})}
                    > + New Chat </BootstrapButton>
                </div>
                {(this.props.chat.chatHistory && !this.props.chat.chatHistory.message && this.props.chat.chatHistory.length==0 &&
                    <Typography>You don't have any chats. Try from (+) to chat with someone.</Typography>)}
                {(this.props.chat.chatHistory && !this.props.chat.chatHistory.message ) &&
                    <ChatList
                        dataSource = {
                            this.props.chat.chatHistory
                                .map(message => {
                                    return {
                                        avatar: "https://ui-avatars.com/api/?rounded=true&name="+message.chatWith,
                                        alt: message.chatWith,
                                        title: message.chatWith,
                                        subtitle: 
                                            message.from_username===message.chatWith ? 
                                            message.chatWith+": "+message.text       :
                                            "You: "+message.text                     ,
                                        date: message.date,
                                        unread: 0,
                                    }
                                })
                        }
                        onClick = {(chat) => this.props.goChatWith? this.props.goChatWith(chat.alt) : this.setState({chatWith: chat.alt})}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = ({ userInfo, chat }) => ({
    userInfo,
    chat,
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
          clear_chat_history,
          get_chat_history,
      },
      dispatch
    );
  
  export default 
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChatHistory);
