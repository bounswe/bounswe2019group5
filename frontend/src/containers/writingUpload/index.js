import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Question from "../question";
import {
  get_prof_test,
  get_test_result,
  clear_prof_test,
} from "../../redux/action-creators/test";
import _ from "lodash";
import Popup from 'reactjs-popup';
import { upload_writing } from "../../api/writing/uploadWriting";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Chec } from 'react-bootstrap';

import Modal from "@material-ui/core/Modal";

import writeFileP from "write-file-p";

import Recommendation from '../recommendation';

class WritingUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        file: null,
        isUploaded: false,
        reviewer: props.match.params ? props.match.params.reviewer : null,
        message: null,
        isOnSelectReviewer: false,
        isPlainText: false,
        essayText: "",
    };
  }

  onSelectReviewer(username) {
    this.setState({
      reviewer: username,
      isOnSelectReviewer: false,
    });
  }

  onChange(e){

    if (e.target.id==='file')
    {
      this.setState({file: e.target.files[0]});
    }

  }

  onSubmit(e){
    if(!this.state.isPlainText && this.state.file)
    {
        upload_writing(this.props.userInfo.token, 
                       this.props.userInfo.selectedLanguage,
                       this.state.file,
                       this.state.reviewer)
          .then(essay => {
            console.log(essay);
            if (essay.message)
            {
              this.setState({message: essay.message});
            } else
            {
              this.setState({
                id: essay.id,
                isUploaded: true,
              })
            }
          });
    }
    else if(this.state.isPlainText && this.state.essayText!=="")
    {
      /*let fileName = "file"+(""+Math.random()).split('.')[1]+".txt";
      console.log(fileName);
      writeFileP(fileName, this.state.text)
        .then((err, data) => {
          console.log(err, data);
        });*/
    }
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

    if (this.props.userInfo.selectedLanguage == null) {
      return (
        <Redirect
          to={{
            pathname: "/lang-select"
          }}
        />
      );
    }

    if (this.state.isUploaded){
      return (
        <Redirect
          to={{
            pathname: "/show-writing/"+this.state.id
          }}
        />
      );
    }

    const { classes } = this.props;
    return (
        <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              style={{
                minHeight: '50vh',
                maxHeight: '2000vh',
                minWidth: '50vw',
                maxWidth: '50vw',
                display:'flex',alignItems:'top',justifyContent:'center',
                backgroundColor: "white",
                'overflow-y': 'auto'
              }}
              open={this.state.isOnSelectReviewer}
              onClose={()=>{this.setState({isOnSelectReviewer: false});}}>
              <Recommendation 
                      mode="callback(username)"
                      onSelect={this.onSelectReviewer.bind(this)}/>
            </Modal>
            <h1>Upload Your Writing Here!</h1>
            <div>
              { !this.state.isPlainText &&
                <div>
                  <input 
                    type="file" 
                    id="file"
                    accept="image/*,.txt"
                    onChange={this.onChange.bind(this)} />
                </div>
              }
              {this.state.isPlainText &&
                <textarea id="essayText" value={this.state.essayText} onChange={this.onChange.bind(this)} style={{height: '50vh', width: '30vw'}}/>
              }
              <div>
                <input type="radio" value="Upload Writing as Plain Text" checked={this.state.isPlainText} onClick={()=>{this.setState({isPlainText: !this.state.isPlainText});}}/>
                <label>Upload as plain text</label>
              </div>
              {this.state.message &&
                <div>
                  <label style={{color: 'red'}}>{this.state.message}</label>
                </div>
              }
              <div>
                { 
                this.state.reviewer &&
                  this.state.reviewer ?
                        <text>Selected reviewer is: {this.state.reviewer}</text>
                        :
                        <text>No reviewer selected, you can select later or now..</text>
                }
              </div>

              <div>
                <button onClick={() => {
                  this.setState({isOnSelectReviewer: true});
                }}>Select or Change Reviewer</button>
              </div>

              <div>
                <button onClick={this.onSubmit.bind(this)}>Upload Essay</button>
              </div>
            </div>
        </div>
    );

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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WritingUpload)
);
