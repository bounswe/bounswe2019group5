import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { set_searched_exercises, set_searched_users } from "../../redux/action-creators/search";
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
        this.state = { user: false, exercise: false, key: null };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.exercises);
        console.log("tag", prevState.tag, this.state.tag);
        if (
            prevProps.language === this.props.language &&
            prevProps.type === this.props.type &&
            prevState.tag === this.state.tag &&
            prevState.keyword === this.state.keyword &&
            prevProps.exercises.searchTest === this.props.exercises.searchTest
        ) {
            return;
        }
        this.props.search_test(
            this.props.userInfo.token,
            this.state.tag,
            this.state.keyword,
            this.props.language,
            this.props.type
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <Form inline>
                    <Form.Control ref={this.ref} type="text" placeholder={this.props.search.input} className="mr-sm-2" />
                    <Link to="/search">
                        <Button variant="outline-success" onClick={() => this.search()} >Search</Button>
                    </Link>
                </Form>
                <Typography variant="h6" gutterBottom > Select what you want to search </Typography>
                <Tabs text="white" size="big" id="controlled-tab-example" activeKey={this.state.key} onSelect={k => this.setState({ key: k })}>
                    <Tab eventKey="USER" title="USER" >
                        <Form>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Language</Form.Label>
                                <Form.Control as="select">
                                    <option>English</option>
                                    <option>Turkish</option>
                                    <option>German</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Tab>
                    <Tab eventKey="EXERCISE" title="EXERCISE" >
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control as="select">
                                        <option>English</option>
                                        <option>Turkish</option>
                                        <option>German</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select">
                                        <option>Grammar</option>
                                        <option>Vocabulary</option>
                                        <option>Reading</option>
                                        <option>Listening</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control as="select">
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
                    </Tab>

                </Tabs>

                <List className={classes.root}>
                    {this.props.exercises.searchedTest[this.props.type] &&
                        this.props.exercises.searchedTest[this.props.type].map((value, index) => {
                            console.log(value);
                            return (
                                <>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            primary={"EXERCISE ID:  " + value.id}
                                            secondary={
                                                <React.Fragment>
                                                    <Link
                                                        to={"exercise/" + value.id}
                                                    >
                                                        <Button variant="success">Go to test</Button>
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
            </>
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
            set_searched_exercises,
            set_searched_users
        },
        dispatch
    );

export default withStyles(styles2)(
    connect(mapStateToProps, mapDispatchToProps)(Search)
);
