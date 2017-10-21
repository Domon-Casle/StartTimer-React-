import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class CurrentTime extends Component {
    constructor (props) {
        super(props);
        this.state = {
            time : "Loading..."
        }
    }

    componentDidMount () {
        this.intervalID = setInterval(this.timer.bind(this), 1000);
    }

    componentWillUnmount () {
        clearInterval(this.intervalID);
    }

    timer () {
        var date = new Date();
        this.setState ({
            time : date.toLocaleTimeString()
        });
    }

    render () {
        return (
            <Row className="center CurrentTimeDiv">
                <Col className="myCenter">
                    <strong>Current Time: </strong>
                    {this.state.time}
                </Col>
            </Row>
        );
    }
}

export default CurrentTime;