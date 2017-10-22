import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class StartInput extends Component {
    constructor(props) {
        super(props);
        var startSeconds = this.props.startValue.getSeconds();
        var startMinutes = this.props.startValue.getMinutes();
        var startHour = this.props.startValue.getHours();

        if (startHour < 10) {
            startHour = "0" + startHour;
        }

        if (startMinutes === 0) {
            startMinutes = "00";
        }

        if (startSeconds === 0) {
            startSeconds = "00";
        }

        var defaultValue = startHour + ":" + startMinutes + ":" + startSeconds;
        this.state = {
            displayValue: this.props.startValue.toLocaleTimeString(),
            displayDefault: defaultValue
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (this.props.startValue !== nextProps.startValue) {
            return true;
        } else {
            return false;
        }
    }

    componentWillReceiveProps (nextProps) {
        var outTimeDate = new Date(nextProps.startValue);
        this.setState({
            displayValue: outTimeDate.toLocaleTimeString()
        });
    }

    render () {
        return (
            <Row>
              <Col sm={5} md={5} lg={5}>
                  <div className="StartTimeInputDiv">
                      <div>
                          <strong>Start Time: </strong>
                      </div>
                      <input id="StartTime" type="time" defaultValue={this.state.displayDefault} onChange={this.props.handleChange} />
                  </div>
              </Col>
              <Col sm={7} md={7} lg={7} className="StartTimeDiv">
                <strong>Start Time: </strong>
                <div className="InnerStartTimeDiv">
                    {this.state.displayValue}
                </div>
              </Col>
            </Row>
        );
    }
}

export default StartInput;