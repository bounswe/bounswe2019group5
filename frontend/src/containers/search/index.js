import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { set_input, set_searched_exercises, set_searched_users } from "../../redux/action-creators/search";
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

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { key: null, exlanguage: "english", language: null, type: null, level: null };
        this.combineTandK = this.combineTandK.bind(this)
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.ref.current.value = this.props.search.input
        this.props.set_searched_exercises(this.props.userInfo.token, this.props.search.input, "english", this.state.type);
        this.props.set_searched_users(this.props.userInfo.token, this.state.language, this.props.search.input)
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.exlanguage !== prevState.exlanguage ||
            this.state.type !== prevState.type ||
            this.state.level !== prevState.level ||
            prevProps.search.input != this.props.search.input ||
            this.state.key !== prevState.key) &&
            this.state.key == "EXERCISE") {
            this.props.set_searched_exercises(this.props.userInfo.token, this.props.search.input, this.state.exlanguage, this.state.type);
        }
        else if (this.state.key == "USER" && (this.state.language !== prevState.language ||
            prevProps.search.input !== this.props.search.input ||
            this.state.key !== prevState.key)) {
            this.props.set_searched_users(this.props.userInfo.token, this.state.language, this.props.search.input)
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
            const setty = new Set([...WT, ...WK]);
            return Array.from(setty);
        }
    }

    render() {
        const { classes } = this.props;

        const searchedExercises = this.combineTandK(this.props.search.searchedExercises.searchedExercisesWT, this.props.search.searchedExercises.searchedExercisesWT);

        return (
            <Grid className={classes.paper}>
                <Form inline onSubmit={(e) => {
                    console.log(e)
                    e.preventDefault();
                    this.props.set_input(this.ref.current.value)
                }} >
                    <Form.Control ref={this.ref} type="text" className="mr-sm-2" />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>
                <Typography variant="h6" gutterBottom > Select what you want to search </Typography>
                <Tabs text="white" size="big" id="controlled-tab-example" activeKey={this.state.key} onSelect={k => this.setState({ key: k })}>
                    <Tab eventKey="USER" title="USER" >
                        <Form>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Language</Form.Label>
                                <Form.Control as="select" onChange={(e) => {
                                    if (e.target.value == "CHOOSE") {
                                        this.setState({ language: null })
                                    }
                                    else {
                                        this.setState({ language: e.target.value })
                                    }
                                }}>
                                    <option>CHOOSE</option>
                                    <option>english</option>
                                    <option>turkish</option>
                                    <option>german</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <List className={classes.root}>
                            {(this.props.search.searchedUsers == null || this.props.search.searchedUsers.length == 0) &&
                                <Typography>Nothing found.</Typography>}
                            {this.props.search.searchedUsers &&
                                this.props.search.searchedUsers.map((value, index) => {
                                    return (
                                        <>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={(index + 1) + ": user: " + value.username}
                                                    secondary={ //add native lang
                                                        <React.Fragment>
                                                            <Typography>Native language: {value.native_language}</Typography>
                                                            <Link
                                                                to={"/profile/" + value.username}
                                                            >
                                                                <Button variant="success">Go to profile</Button>
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
                    <Tab eventKey="EXERCISE" title="EXERCISE" >
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control as="select" onChange={(e) => {
                                        this.setState({ exlanguage: e.target.value })
                                    }}>
                                        <option>english</option>
                                        <option>turkish</option>
                                        <option>german</option>
                                    </Form.Control>
                                </Form.Group>

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

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control as="select" onChange={(e) => {
                                        if (e.target.value == "CHOOSE") {
                                            this.setState({ level: null })
                                        }
                                        else {
                                            this.setState({ level: e.target.value })
                                        }
                                    }}>
                                        <option>CHOOSE</option>
                                        <option>A1</option>
                                        <option>A2</option>
                                        <option>B1</option>
                                        <option>B2</option>
                                        <option>C1</option>
                                        <option>C2</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <List className={classes.root}>
                            {searchedExercises.length == 0 &&
                                <Typography>Nothing found.</Typography>}
                            {searchedExercises &&
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
                                                                <Button variant="success">Go to exercise</Button>
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

const mapStateToProps = ({ userInfo, search }) => ({
    userInfo,
    search
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            set_input,
            set_searched_exercises,
            set_searched_users
        },
        dispatch
    );

export default withStyles(styles2)(
    connect(mapStateToProps, mapDispatchToProps)(Search)
);
