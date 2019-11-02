import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import 'react-chat-elements/dist/main.css';
import { MessageList,SystemMessage,Input,Button, SideBar } from 'react-chat-elements';

import { activate_chat, deactivate_chat, get_all_messages, send_message } from '../../redux/action-creators/chat';

import {Paper, Grid, CssBaseline, withStyles } from '@material-ui/core';
import styles from "./styles";

export class Chat extends Component {

    componentDidMount() {
        this.props.activate_chat(this.props.userInfo.token, this.props.chatWith);
        const f = () => {
            this.props.get_all_messages(this.props.userInfo.token, this.props.chatWith || "reactBot");
            this.timer = setTimeout(f, 3000);
        }
        f();
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
        let chatWith = this.props.chatWith || "reactBot";

        return (
            
            <div style={{ border: '4px solid purple', 'border-radius': '3px', margin: '20px'  }}>   
                {this.props.chat.messages==null && this.props.chat.messagesLoading==true &&
                    <div>
                        <h1>LOADING</h1>
                    </div>
                }
                {
                    <div>
                        <h1 style={{color: "red"}}>Chat With {chatWith}</h1>
                    </div>
                }
                {this.props.chat.messages!=null &&
                    <MessageList
                        className='message-list'
                        lockable={true}
                        toBottomHeight={100}
                        dataSource={this.props.chat.messages} />
                }
                <div style={{ border: '2px solid orange', 'border-radius': '2px', margin: '10px' }}>
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
                                        this.props.send_message(this.props.userInfo.token,
                                            this.chatWith,
                                            this.refs.send_message_text.state.value);
                                        this.refs.send_message_text.clear();
                                }}
                            />
                    }/>
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
