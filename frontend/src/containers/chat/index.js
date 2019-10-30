import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import 'react-chat-elements/dist/main.css';
import { MessageList,SystemMessage } from 'react-chat-elements';

export class Chat extends Component {
    render() {
        return (
            <div>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={[
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Merhaba',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'adadasdsafd',
                            date: new Date(),
                        },
                    ]} />
                    <SystemMessage
                    text={'End of conversation'}/>
            </div>
        )
    }
}

const mapStateToProps = ({ userInfo }) => ({
    userInfo,
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
      },
      dispatch
    );
  
  export default //withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Chat)
  //);
