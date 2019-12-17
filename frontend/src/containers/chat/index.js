import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import 'react-chat-elements/dist/main.css';
import { MessageList,SystemMessage,Input,Button, SideBar, MessageBox } from 'react-chat-elements';

import { activate_chat, deactivate_chat, get_all_messages, send_message } from '../../redux/action-creators/chat';

import {Paper, Grid, CssBaseline, withStyles } from '@material-ui/core';
import styles from "./styles";

import ChatHistory from './chatHistory';

import { Link } from 'react-router-dom';
import { flexbox } from '@material-ui/system';

import { Image } from 'react-bootstrap';

import _ from 'lodash';

export class Chat extends Component {

    constructor(props) {
        super(props);
        this.chatWith = this.props.match && this.props.match.params ? this.props.match.params.chatWith || this.props.chatWith
                                                                    : this.props.chatWith;
        this.state = {
            chatWith: null,
        }
    }

    componentDidMount() {
        this.props.activate_chat(this.props.userInfo.token, this.chatWith);
        const f = () => {
            this.props.get_all_messages(this.props.userInfo.token, this.chatWith);
            this.timer = setTimeout(f, 3000);
        }
        f();
    }

    componentDidUpdate(){
        let last = _.cloneDeep(this.chatWith);
        this.chatWith = this.state.chatWith ? this.state.chatWith : this.props.match && this.props.match.params ? this.props.match.params.chatWith || this.props.chatWith
                                                                    : this.props.chatWith;
        if (!(last===this.chatWith)){
            this.props.deactivate_chat();
            clearTimeout(this.timer);

            this.props.activate_chat(this.props.userInfo.token, this.chatWith);
            const f = () => {
                this.props.get_all_messages(this.props.userInfo.token, this.chatWith);
                this.timer = setTimeout(f, 3000);
            }
            f();
        }
    }

    componentWillUnmount() {
        this.props.deactivate_chat();
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

        const {classes} = this.props;
        let chatWith = this.chatWith;

        console.log(this.props.notShowHistory);

        return (

            <div style={{display: 'flex', flexDirection: 'row'}}>
                
                {!this.props.notShowHistory &&
                    <div style={{flex:1}}>
                        <ChatHistory
                            goChatWith={(username) => this.setState({chatWith: username})}/>
                    </div>
                }
                <div style = {{flex: 2}}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '60vh', border: '4px solid purple', 'border-radius': '3px', margin: '20px'  }}>   
                    {!this.props.notShowTitle &&
                        <div style={{flex: 1, justifyContent: 'center'}}>
                            {this.props.chat.messages==null && this.props.chat.messagesLoading==true &&
                                <div>
                                    <h1>LOADING</h1>
                                </div>
                            }
                            {
                                <div>
                                    <h1 style={{color: "red"}}>
                                        <Link to={{
                                            pathname: "/profile/" + chatWith
                                        }}>
                                            <Image 
                                                src={"https://ui-avatars.com/api/?rounded=true&name="+chatWith}
                                                roundedCircle 
                                            />
                                            {chatWith}
                                        </Link>
                                    </h1>
                                </div>
                            }
                        </div>
                    }
                    <div
                        style={{flex: 9, overflowY: 'scroll'}}
                        ref={(el) => {this.messageListRef = el;}}>
                        {this.props.chat.messages && 
                        this.props.chat.messages
                            .map(message => {
                                return (
                                    <div id={message.date}>
                                        <MessageBox
                                            position={message.position}
                                            type={'text'}
                                            text={message.text}
                                            date={message.date}
                                            />
                                    </div>
                                    );
                            })}
                    </div>
                    <div style={{ flex: 1, border: '2px solid orange', borderRadius: '2px', margin: '10px' }}>
                        <Input
                            placeholder="Type here..."
                            multiline={true}
                            ref="send_message_text"
                            rightButtons={
                                <Button
                                    color='blue'
                                    backgroundColor='green'
                                    text='Send'
                                    onClick={
                                        () => {
                                            this.messageListRef.scrollIntoView({block: 'end', behavior: 'smooth'});
                                            this.props.send_message(this.props.userInfo.token,
                                                chatWith,
                                                this.refs.send_message_text.state.value, 
                                                this.refs.send_message_text
                                            );
                                    }}
                                />
                        }/>
                    </div>
                </div>
                </div>
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
          send_message,
          get_all_messages,
          activate_chat,
          deactivate_chat,
      },
      dispatch
    );
  
  export default withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Chat)
  );
