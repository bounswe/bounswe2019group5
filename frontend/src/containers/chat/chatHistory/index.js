import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from 'lodash';

import 'react-chat-elements/dist/main.css';
import { MessageList,SystemMessage,Input,Button, SideBar, MessageBox, ChatList } from 'react-chat-elements';

import { clear_chat_history, get_chat_history } from '../../../redux/action-creators/chat';

import { Link } from 'react-router-dom';
import { flexbox } from '@material-ui/system';

export class ChatHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatWith: null,
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
                {this.props.chat.chatHistory &&
                    <ChatList
                        dataSource = {
                            this.props.chat.chatHistory
                                .map(message => {
                                    return {
                                        avatar: "https://ui-avatars.com/api/?rounded=true&name="+message.chatWith,
                                        alt: message.chatWith,
                                        title: 
                                            message.chatWith===message.from_username ? 
                                                "incoming from "+message.chatWith    :
                                                "sent to "+message.chatWith          ,
                                        subtitle: message.text,
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
