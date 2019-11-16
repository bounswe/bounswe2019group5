import React, { Component } from 'react'

import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import {Container, Box, Grid, Paper} from '@material-ui/core';
import {send_annotation, get_annotations} from '../../../api/annotation'

import Annotation, {defaultProps} from 'react-image-annotation/lib';
import {
    RectangleSelector,
  } from 'react-image-annotation/lib/selectors'

import { withStyles } from "@material-ui/core/styles";

const {View} = React;

class ImageEssay extends Component {

    constructor(props){
        super(props);
        this.state = {
            annotation: {},
            annotations: [],
            height: 1,
            width: 1,
        };
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
        var x = parseFloat( webAnnotationModel.target.selector.value.split('=')[1].split(':')[1].split(',')[0] );
        var y = parseFloat( webAnnotationModel.target.selector.value.split('=')[1].split(':')[1].split(',')[1] );
        var width = parseFloat( webAnnotationModel.target.selector.value.split('=')[1].split(':')[1].split(',')[2] );
        var height = parseFloat( webAnnotationModel.target.selector.value.split('=')[1].split(':')[1].split(',')[3] );
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
                    value: "xywh=percent:"+x+","+y+","+w+","+h,
                },
            },
        };
        
        return webAnnotationModel;
    }

    onChange(annotation){
        this.setState({annotation});
    }

    onSubmit(annotation){

        send_annotation(this.props.userInfo.token,
            this.annotation2webAnnotationModel(annotation));

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

    }

    render() {

        console.log(this.state.annotations);

        const {classes} = this.props;

        let essay = this.props.essay;

        return (
            
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
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
                        style={{flex:1}}
                        resizeMode={"contain"}
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
  )(ImageEssay)
);