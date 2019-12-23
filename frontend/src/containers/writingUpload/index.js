import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import { upload_writing } from "../../api/writing/uploadWriting";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Form } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import Recommendation from '../recommendation';
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Typography } from "@material-ui/core";

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
      language: "none",
    };
  }

  onSelectReviewer(username) {
    this.setState({
      reviewer: username,
      isOnSelectReviewer: false,
    });
  }

  onChange(e) {

    if (e.target.id === 'file') {
      this.setState({ file: e.target.files[0] });
    }
    else {
      this.setState({ [e.target.id]: e.target.value });
    }

  }

  onSubmit(e) {
    if (((!this.state.isPlainText && this.state.file) || (this.state.isPlainText && this.state.essayText.length != 0)) && "none" !== this.state.language && this.state.reviewer) {
      upload_writing(this.props.userInfo.token,
        this.state.language,
        (!this.state.isPlainText) && this.state.file || new File([new Blob([this.state.essayText])], "essay.txt"),
        this.state.reviewer)
        .then(essay => {
          if (essay.message) {
            this.setState({ message: essay.message });
          } else {
            this.setState({
              id: essay.id,
              isUploaded: true,
            })
          }
        });
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

    if (this.state.isUploaded) {
      return (
        <Redirect
          to={{
            pathname: "/show-writing/" + this.state.id
          }}
        />
      );
    }

    const { classes } = this.props;
    return (
      <Grid className={classes.paper}>
        <Modal
          style={{
            minHeight: '50vh',
            maxHeight: '2000vh',
            minWidth: '50vw',
            maxWidth: '50vw',
            backgroundColor: "white",
            'overflow-y': 'auto'
          }}
          show={this.state.isOnSelectReviewer}
          onHide={() => { this.setState({ isOnSelectReviewer: false }); }}>
          <Modal.Body>
            <Recommendation
              mode="callback(username)"
              language={this.state.language !== "none" ? this.state.language : null}
              onSelect={this.onSelectReviewer.bind(this)} />
          </Modal.Body>
        </Modal>
        <h1>Upload Your Writing Here!</h1>
        <div>
          {!this.state.isPlainText &&
            <div>
              <Form.Control
                type="file"
                id="file"
                accept="image/*,.txt"
                value={this.state.file ? this.state.file.path : null}
                onChange={this.onChange.bind(this)}
              />
            </div>
          }
          {this.state.isPlainText &&
            <Form.Group as="textarea" rows={10} id="essayText" value={this.state.essayText} onChange={this.onChange.bind(this)} style={{ height: '50vh', width: '30vw' }} />
          }
          <div>
            <Form.Check inline type="radio" checked={this.state.isPlainText} onClick={() => { this.setState({ isPlainText: !this.state.isPlainText }); }} />
            <label>Or type your text...</label>
          </div>
          {this.state.message &&
            <div>
              <label style={{ color: 'red' }}>{this.state.message}</label>
            </div>
          }
          <div>
            {
              this.state.reviewer &&
                this.state.reviewer ?
                <text>Selected reviewer is: <Typography variant="button">{this.state.reviewer}</Typography></text>
                :
                <text>No reviewer selected, you can select later or now..</text>
            }
          </div>

          {this.state.language === "none" &&
            <div>
              <DropdownButton required id="dropdown-basic-button" title={"Language: " + this.state.language} variant="info">

                <Dropdown.Item
                  active={this.state.language === 'english'}
                  onClick={() => { this.setState({ language: 'english' }) }}
                >English</Dropdown.Item>

                <Dropdown.Item
                  active={this.state.language === 'german'}
                  onClick={() => { this.setState({ language: 'german' }) }}
                >German</Dropdown.Item>

                <Dropdown.Item
                  active={this.state.language === 'turkish'}
                  onClick={() => { this.setState({ language: 'turkish' }) }}
                >Turkish</Dropdown.Item>

              </DropdownButton>
            </div>
          }

          {this.state.language !== "none" &&
            <div>
              <Button onClick={() => {
                this.setState({ isOnSelectReviewer: true });
              }}
                variant="info">Select or Change Reviewer</Button>
            </div>
          }

          {(this.state.language && this.state.reviewer) &&
            <div>
              <Button onClick={this.onSubmit.bind(this)}>Upload Essay</Button>
            </div>
          }
        </div>
      </Grid>
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
