import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { Redirect } from "react-router";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { search_test } from "../../redux/action-creators/exercises";
import { set_selected_language } from "../../redux/action-creators/userInfo";
import styles2 from "./styles2";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Tab,
    Tabs,
    Form,
    Button,
    Col,
} from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//Solve Exercise page
//filters exercises by input by taking the union of tag and keyword for exercises
class Exercises extends React.Component {
    constructor(props) {
        super(props);
        this.state = { key: null, input: null, type: null, };
        this.combineTandK = this.combineTandK.bind(this)
        this.ref = React.createRef()
    }

    componentDidMount() {
        console.log("in mount");
        this.props.search_test(
            this.props.userInfo.token,
            "",
            "english",
            ""
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.input != this.state.input) {
            this.ref.current.value = this.state.input;
        }
        if ((this.state.type !== prevState.type ||
            this.state.input !== prevState.input ||
            this.state.key !== prevState.key)) {
            this.props.search_test(this.props.userInfo.token, this.state.input, this.state.key, this.state.type);
        }
    }

    combineTandK(WT, WK) {
        if (!WT && !WK) {
            return [];
        }
        else if (!WT && WK) {
            return WK;
        }
        else if (WT && !WK) {
            return WT;
        }
        else {
            var exercises = [];
            let set = new Set();
            for(let exercise of WT) {
                exercises.push(exercise);
                set.add(exercise.id);
            }
            for (let exc of WK) {
                if(!set.has(exc.id)) {
                    exercises.push(exc);
                }
            }
            return exercises;
            //const setty = new Set([...WT, ...WK]);
            //return Array.from(setty);
        }
    }

    render() {
        const { classes } = this.props;
        var langs = [];
        var json;
        if (this.props.userInfo.userProfile.attended_languages)
            for (json of this.props.userInfo.userProfile.attended_languages) {
                langs.push(json.language);
            }

        const searchedExercises = ((this.props.exercises.searchedTest.T && this.props.exercises.searchedTest.T.message) ||
            (this.props.exercises.searchedTest.K && this.props.exercises.searchedTest.K.message)) ?
            -1
            : this.combineTandK(this.props.exercises.searchedTest.T, this.props.exercises.searchedTest.K);

        if (this.props.userInfo.token == null) {
            return (
                <Redirect
                    to={{
                        pathname: "/home"
                    }}
                />
            );
        }
        else {
            return (
                <Grid className={classes.paper} >

                    <Typography variant="h6" gutterBottom >  Select the language you want to complete exercise of. </Typography>
                    <Tabs text="white" size="big" id="controlled-tab-example" activeKey={this.state.key} onSelect={k => this.setState({ key: k })}>
                        <Tab eventKey="english" title="ENGLISH" >
                            {!langs.includes("english") ? (
                                <Grid container spacing={3}>
                                    <Typography component="h5" variant="h5" align="center">
                                        You should solve the prof test of this language first.
                             </Typography>
                                    <Link to="/prof-test/english">
                                        <Button
                                            onClick={() => this.props.set_selected_language("english")}
                                            variant="success"                      >
                                            Go To Prof Test
                                    </Button>
                                    </Link>
                                </Grid>
                            ) : (
                                    <Grid>
                                            <Link to={"/prof-test/english"}>
                                                <Button variant="outline-info">LEVEL UP!</Button>
                                            </Link>
                                    </Grid>
                                )}
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control as="select" onChange={(e) => {
                                            if (e.target.value == "CHOOSE") {
                                                this.setState({ type: null })
                                            }
                                            else {
                                                this.setState({ type: e.target.value })
                                            }
                                        }}>
                                            <option>CHOOSE</option>
                                            <option>grammar</option>
                                            <option>vocabulary</option>
                                            <option>reading</option>
                                            <option>listening</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                            <Form inline onSubmit={(e) => {
                                e.preventDefault();
                                this.setState({input: this.ref.current.value})
                            }} >
                                <Form.Control ref={this.ref} type="text" className="mr-sm-2" />
                                <Button type="submit" variant="outline-success">Filter by subject:</Button>
                            </Form>

                            <List className={classes.root}>
                                {searchedExercises == -1 &&
                                    <Typography variand="h2">CONNECTION ERROR</Typography>}
                                {(searchedExercises != -1 && searchedExercises.length == 0) &&
                                    <Typography>Great! You've solved all exercises. Try leveling up.</Typography>}
                                {(searchedExercises != -1) &&
                                    searchedExercises.map((value, index) => {
                                        return (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemText
                                                        primary={(index + 1) + " :  " + value.type + " exercise "}
                                                        secondary={ //add tag and keywords
                                                            <React.Fragment>
                                                                <Typography>Tags: {value.tags.map((val, i) => {
                                                                    return (val + ", ")
                                                                })}</Typography>
                                                                <Typography>Keywords: {value.keywords.map((val, i) => {
                                                                    return (val + ", ")
                                                                })}</Typography>
                                                                <Link
                                                                    to={"/exercise/" + value.id}
                                                                >
                                                                    <Button variant="success">Solve exercise</Button>
                                                                </Link>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        );
                                    })}
                            </List>

                        </Tab>
                        <Tab eventKey="turkish" title="TURKISH" >
                            {!langs.includes("turkish") ? (
                                <Grid container spacing={3}>                   
                                 <Typography component="h5" variant="h5" align="center">
                                    You should solve the prof test of this language first.
                                </Typography>
                                    <Link to="/prof-test/turkish">
                                        <Button
                                            onClick={() => this.props.set_selected_language("turkish")}
                                            variant="success"                      >
                                            Go To Prof Test
                                         </Button>
                                    </Link>
                                </Grid>
                            ) : (
                                        <Grid>
                                            <Link to={"/prof-test/turkish"}>
                                                <Button variant="outline-info">LEVEL UP!</Button>
                                            </Link>
                                        </Grid>
                                )}
                            <Form>
                                <Form.Row>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control as="select" onChange={(e) => {
                                            if (e.target.value == "CHOOSE") {
                                                this.setState({ type: null })
                                            }
                                            else {
                                                this.setState({ type: e.target.value })
                                            }
                                        }}>
                                            <option>CHOOSE</option>
                                            <option>grammar</option>
                                            <option>vocabulary</option>
                                            <option>reading</option>
                                            <option>listening</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                            <Form inline onSubmit={(e) => {
                                e.preventDefault();
                                this.setState({input: this.ref.current.value})
                            }} >
                                <Form.Control ref={this.ref} type="text" className="mr-sm-2" />
                                <Button type="submit" variant="outline-success">Filter by subject:</Button>
                            </Form>
                            <List className={classes.root}>
                                {searchedExercises == -1 &&
                                    <Typography variand="h2">CONNECTION ERROR</Typography>}
                                {(searchedExercises != -1 && searchedExercises.length == 0) &&
                                    <Typography>Great! You've solved all exercises. Try leveling up.</Typography>}
                                {(searchedExercises != -1) &&
                                    searchedExercises.map((value, index) => {
                                        return (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemText
                                                        primary={(index + 1) + " :  " + value.type + " exercise "}
                                                        secondary={ //add tag and keywords
                                                            <React.Fragment>
                                                                <Typography>Tags: {value.tags.map((val, i) => {
                                                                    return (val + ", ")
                                                                })}</Typography>
                                                                <Typography>Keywords: {value.keywords.map((val, i) => {
                                                                    return (val + ", ")
                                                                })}</Typography>
                                                                <Link
                                                                    to={"/exercise/" + value.id}
                                                                >
                                                                    <Button variant="success">Solve exercise</Button>
                                                                </Link>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        );
                                    })}
                            </List>
                        </Tab>
                        <Tab eventKey="german" title="GERMAN" >
                            {!langs.includes("german") ? (
                                <Grid container spacing={3}>                   
                                 <Typography component="h5" variant="h5" align="center">
                                    You should solve the prof test of this language first.
                                   </Typography>
                                    <Link to="/prof-test/german">
                                        <Button
                                            onClick={() => this.props.set_selected_language("german")}
                                            variant="success"                      >
                                            Go To Prof Test
                                       </Button>
                                    </Link>
                                </Grid>
                            ) : (
                                        <Grid>
                                            <Link to={"/prof-test/german"}>
                                                <Button variant="outline-info">LEVEL UP!</Button>
                                            </Link>
                                        </Grid>
                                )}
                            <Form>
                                <Form.Row>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control as="select" onChange={(e) => {
                                            if (e.target.value == "CHOOSE") {
                                                this.setState({ type: null })
                                            }
                                            else {
                                                this.setState({ type: e.target.value })
                                            }
                                        }}>
                                            <option>CHOOSE</option>
                                            <option>grammar</option>
                                            <option>vocabulary</option>
                                            <option>reading</option>
                                            <option>listening</option>
                                        </Form.Control>
                                    </Form.Group>

                                </Form.Row>
                            </Form>
                            <Form inline onSubmit={(e) => {
                                e.preventDefault();
                                this.setState({input: this.ref.current.value})
                            }} >
                                <Form.Control ref={this.ref} type="text" className="mr-sm-2" />
                                <Button type="submit" variant="outline-success">Filter by subject:</Button>
                            </Form>
                            <List className={classes.root}>
                                {searchedExercises == -1 &&
                                    <Typography variand="h2">CONNECTION ERROR</Typography>}
                                {(searchedExercises != -1 && searchedExercises.length == 0) &&
                                    <Typography>Great! You've solved all exercises. Try leveling up.</Typography>}
                                {(searchedExercises != -1) &&
                                    searchedExercises.map((value, index) => {
                                        return (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemText
                                                        primary={(index + 1) + " :  " + value.type + " exercise "}
                                                        secondary={ //add tag and keywords
                                                            <React.Fragment>
                                                                <Typography>Tags: {value.tags.map((val, i) => {
                                                                    return (val + ", ")
                                                                })}</Typography>
                                                                <Typography>Keywords: {value.keywords.map((val, i) => {
                                                                    return (val + ", ")
                                                                })}</Typography>
                                                                <Link
                                                                    to={"/exercise/" + value.id}
                                                                >
                                                                    <Button variant="success">Solve exercise</Button>
                                                                </Link>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        );
                                    })}
                            </List>
                        </Tab>
                    </Tabs>
                </Grid >
            );
        }
    }
}

const mapStateToProps = ({ userInfo, exercises }) => ({
    userInfo,
    exercises
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            set_selected_language,
            search_test
        },
        dispatch
    );

export default withStyles(styles2)(
    connect(mapStateToProps, mapDispatchToProps)(Exercises)
);
