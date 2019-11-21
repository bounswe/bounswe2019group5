import React, { Component } from 'react'

import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import {Container, Box, Grid, Paper} from '@material-ui/core';
import {send_annotation, get_annotations} from '../../../api/annotation'

import { withStyles } from "@material-ui/core/styles";

const {View} = React;

class TextEssay extends Component {

    constructor(props){
        super(props);
        this.state = {
            annotation: {},
            annotations: [],
            height: 1,
            width: 1,
            text: '',
            top: 1,
            left: 1,
            height: 1,
            width: 1,
            scrollTop: 0,
            selection: null,
        };
        this.markDivRef = React.createRef();
    }

    componentDidMount() {
        get_annotations(this.props.userInfo.token, this.props.essay.id)
            .then(annotations => {
                console.log("Annotations");
                console.log(annotations);
                this.setState({
                    annotations,
                });
            });
        var reader = new FileReader();
        reader.loadend = (event) => {
            this.setState({text: event.target.result});
        }
        fetch(this.props.essay.writing)
            .then(response => {
                response.text()
                    .then(text => {
                        this.setState({text});
                    });
            });
    }

    onChange(annotation){
        this.setState({annotation});
    }

    onSubmit(selection){

        console.log(selection);

        //send_annotation(this.props.userInfo.token,
        //    annotation);

    }

    onMouseMove() {
        var text = document
                    .getElementById('textarea')
                    .value;
        
        var top = document.getElementById('textarea').offsetTop;
        var left = document.getElementById('textarea').offsetLeft;
        var height = document.getElementById('textarea').offsetHeight;
        var width = document.getElementById('textarea').offsetWidth;

        this.setState({
            top,
            left,
            height,
            width,
            insideMarkDiv: (
                <mark style={{color: 'transparent', backgroundColor: '#d4e9ab'}}>
                    {text}
                </mark>
            )
        });
        
    }

    handleScroll() {
        var scrollTop = document.getElementById('textarea').scrollTop;
        this.markDivRef.current.scrollTop = scrollTop;
        this.setState({scrollTop});
    }

    render() {

        const {classes} = this.props;

        let essay = this.props.essay;

        return (
            
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>

                    <button onClick={()=>this.onSubmit(this.state.selection)} text="Annotate"/>

                    <div class="container" style={{'background-color': 'red'}}>
                        <div class="backdrop" 
                                id="backdrop"
                                ref={this.markDivRef} 
                                style={{overflowY: "scroll", 
                                        color: '#fff', 
                                        position: 'absolute', 
                                        top: this.state.top, 
                                        left: this.state.left, 
                                        height: this.state.height, 
                                        width: this.state.width}}>
                            <div class="highlights" ref={this.markDivRef} style={{'white-space': 'pre-wrap', 'word-wrap': 'break-word'}}>
                                {this.state.insideMarkDiv}
                            </div>
                        </div>
                        <textarea
                            style={{position: 'absolute', margin: 0, borderRadius: 0, color: '#444', backgroundColor: 'transparent', width: '50vw', height: '100vh'}}
                            value={this.state.text}
                            id='textarea'
                            name='textarea'
                            onSelect={(e)=>{this.setState({
                                selection: {
                                    start: e.target.selectionStart,
                                    end: e.target.selectionEnd,
                                },
                            });}}
                            onScroll={() => this.handleScroll()}
                            onMouseMove={() => this.onMouseMove()}/>
                    </div>
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
  )(TextEssay)
);