import React, { Component } from 'react';
import './App.css';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import CurrentTime from './Components/CurrentTime'
import EarlyStartContainer from './Components/EarlyStartContainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Grid>
                <Row className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Button href="." bsStyle="danger"><span className="glyphicon glyphicon-repeat"></span> Refresh</Button>
                        </div>
                    </div>
                </Row>
                <div className="container body-content">
                    <CurrentTime />
                    <Row>
                        <Col sm={6} md={6} lg={6}>
                            <EarlyStartContainer />
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                            <EarlyStartContainer />
                        </Col>
                    </Row>
                    <hr />
                </div>
            </Grid>
        );
    }
}

export default App;
