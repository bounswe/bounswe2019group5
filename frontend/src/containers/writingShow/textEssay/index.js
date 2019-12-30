import React, { Component } from 'react'

import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import {Container, Box, Grid, Paper} from '@material-ui/core';
import {send_annotation, get_annotations} from '../../../api/annotation'
import Highlightable from '../../highlighter';
import Popup from 'reactjs-popup';

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
            selection: null,
            ranges: [],
            annotationText: '',
            openPopup: false,
        };
    }

    randomColor(){
        var res="#";
        var i;
        for(i=0; i<6;i++){
            var x = parseInt((Math.random()*12).toString())+4;
            if (x<10)   res = res + x;
            else if (x==10)  res = res + 'A';
            else if (x==11)  res = res + 'B';
            else if (x==12)  res = res + 'C';
            else if (x==13)  res = res + 'D';
            else if (x==14)  res = res + 'E';
            else if (x==15)  res = res + 'F';
        }
        return "yellow";
        return res;
    }

    componentDidMount() {
        get_annotations(this.props.userInfo.token, this.props.essay.id)
            .then(annotations => {

                annotations = annotations.map( annotation => {
                    console.log(annotation.target.selector.value);
                    return this.webAnnotationModel2range(annotation)
                });

                this.setState({
                    ranges: annotations,
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

    webAnnotationModel2range(webAnnotationModel) {
        var start = parseInt( webAnnotationModel.target.selector.value.split('=')[1].split(',')[0] )+1;
        var end = parseInt( webAnnotationModel.target.selector.value.split('=')[1].split(',')[1] );
        var range = {
            start,
            end,
            text: webAnnotationModel.creator+": "+webAnnotationModel.body.value,
            highlightStyle: {
                backgroundColor: this.randomColor(),
            },
        };
        return range;
    }

    onSubmit(){

        let {selection} = this.state;

        if (selection===null || !this.state.annotationText || this.state.annotationText.length==0)   return;

        this.setState({ranges: this.state.ranges.concat([
            { 
                ...selection,
                text: this.props.userInfo.username+': '+this.state.annotationText,
                highlightStyle: {
                    backgroundColor: this.randomColor(),
                },
            }
        ])});

        let annotation = {
            body: {
                value: this.state.annotationText,
            },
            target: {
                source: this.props.essay.id,
                selector: {
                    value: "char="+(selection.start-1)+","+selection.end,
                },
            },
        };

        send_annotation(this.props.userInfo.token,
            annotation)
            .then(() => {
                this.setState({
                    selection: null,
                    annotationText: '',
                    openPopup: false,});
            });
        

    }

    onMouseOverHighlightedWordCallback(selection) {
        if(selection && selection.highlightStyle){
            this.props.setAnnotation({
                username: selection.text.split(':')[0],
                annotationText: selection.text.split(':')[1],
                text: this.state.text.substring(selection.start, selection.end+1),
                highlightColor: selection.highlightStyle.backgroundColor,
            });
        }
    }

    onTextHighlightedCallback(selection) {
        console.log(selection);
        this.setState({selection, openPopup: true});
    }

    rangeRenderer(currentRenderedNodes, currentRenderedRange, currentRenderedIndex, onMouseOverHighlightedWord) {
        return currentRenderedNodes
                .map(node => {
                    return {
                        ...node,
                        onClick: onMouseOverHighlightedWord,
                    };
                });
    }

    render() {

        const {classes} = this.props;

        let essay = this.props.essay;

        if (this.state.text==='') return (<div/>);

        let ranges = this.state.selection ? [...this.state.ranges, {
                                                                start: this.state.selection.start,
                                                                end:   this.state.selection.end,
                                                                text:  this.state.selection.text,
                                                                }] : this.state.ranges;
        
        return (
            
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                <Popup open={this.state.openPopup} 
                    position="right center"
                    onClose={() => {this.setState({openPopup: false, selection: null, annotationText: ''})}}>
                    <div>
                        <label>Enter Annotation Text Here:</label>
                    </div>
                    <div>
                        <textarea 
                            id="annotationText"
                            value={this.state.annotationText} 
                            onChange={(e) => this.setState({annotationText: e.target.value})}/>
                    </div>

                    <div>
                        <button onClick={this.onSubmit.bind(this)}>
                            Send Annotation!
                        </button>
                    </div>

                </Popup>

                <div className={classes.paper}>

                    <Highlightable  ranges={ranges}
                                    enabled={true}
                                    onTextHighlighted={this.onTextHighlightedCallback.bind(this)}
                                    id="highlightable"
                                    onMouseOverHighlightedWord={this.onMouseOverHighlightedWordCallback.bind(this)}
                                    highlightStyle={{
                                        backgroundColor: '#B3D8FD',
                                    }}
                                    text={this.state.text}
                                    rangeRenderer = {this.rangeRenderer.bind(this)}
                    />
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