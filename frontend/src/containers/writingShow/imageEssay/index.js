import React, { Component } from 'react'
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import {Container, Box, Grid} from '@material-ui/core';
import {send_annotation, get_annotations} from '../../../api/annotation'

import Annotation, {defaultProps} from 'react-image-annotation/lib';
import {
    RectangleSelector,
  } from 'react-image-annotation/lib/selectors'

import { withStyles } from "@material-ui/core/styles";


class ImageEssay extends Component {

    constructor(props){
        super(props);
        this.state = {
            annotation: {},
            annotations: [],
        };
        this._extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    }
    
    content (props) {
        var geometry = props.annotation.geometry;
      
        if (!geometry) return null;

        console.log("asdfads");

        return (
            
                <Grid style = {{
                        position: 'absolute',
                        left: geometry.x + '%',
                        top: geometry.y + geometry.height + '%'
                    }}>
                    {props.annotation.data.text}
                </Grid>
        );
      }

    componentDidMount() {
        get_annotations(this.props.userInfo.token, this.props.essay.id)
            .then(annotations => {
                console.log(annotations);
                annotations = annotations.map( annotation => {
                    return this.webAnnotationModel2annotation(annotation)
                });
                console.log(annotations);
                this.setState({
                    annotations,
                });
            })
    }

    webAnnotationModel2annotation(webAnnotationModel) {
        var x = parseInt( webAnnotationModel.target.selector.value.split('=')[1].split(',')[0] );
        var y = parseInt( webAnnotationModel.target.selector.value.split('=')[1].split(',')[1] );
        var width = parseInt( webAnnotationModel.target.selector.value.split('=')[1].split(',')[2] );
        var height = parseInt( webAnnotationModel.target.selector.value.split('=')[1].split(',')[3] );
        var annotation = {
            data: {
                text: webAnnotationModel.creator+": "+webAnnotationModel.body.value,
                id: Math.random(),
            },
            geometry: {
                type: 'RECTANGLE',
                x,
                y,
                width,
                height,
            }
        }
        return annotation;
    }

    annotation2webAnnotationModel(annotation) {
        var geometry = annotation.geometry;
        var x = geometry.x;
        var y = geometry.y;
        var w = geometry.width;
        var h = geometry.height;
        var webAnnotationModel = {
            body:{
                value: annotation.data.text,
            },
            target:{
                source: this.props.essay.id,
                selector: {
                    value: "xywh="+x+","+y+","+w+","+h,
                },
            },
        };
        
        return webAnnotationModel;
    }

    onChange(annotation){
        this.setState({annotation});
    }

    onSubmit(annotation){

        const { geometry, data } = annotation

        data.text = this.props.userInfo.username+": "+data.text;
 
        this.setState({
            annotation: {},
            annotations: this.state.annotations.concat({
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        });

        send_annotation(this.props.userInfo.token,
                         this.annotation2webAnnotationModel(annotation));

    }

    render() {

        console.log(this.state.annotations);

        let essay = this.props.essay;
        return (
            <div>
                <Annotation
                    src = {this.props.essay.writing}
                    type = {RectangleSelector.type}
                    annotations = {this.state.annotations}
                    value = {this.state.annotation}
                    onChange = {this.onChange.bind(this)}
                    onSubmit = {this.onSubmit.bind(this)}
                    disableSelector = {
                        !(essay.status==='accepted' || essay.author===this.props.userInfo.username)
                    }
                    renderContent = {this.content}
                />
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
  )(ImageEssay)
);