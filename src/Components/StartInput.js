import React, { Component } from 'react';
import {Col} from 'react-bootstrap';

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
            <div>
              <Col sm={2} md={2} lg={2}>
                  <div className="StartTimeInputDiv">
                      <div>
                          <strong className="BigStrong">Start Time </strong>
                      </div>
                      <input id={this.props.myId} type="time" defaultValue={this.state.displayDefault} onChange={this.props.handleChange} />
                  </div>
              </Col>
              <Col sm={4} md={4} lg={4} className="StartTimeDiv">
                <strong>Start Time </strong>
                <div className="InnerStartTimeDiv">
                    {this.state.displayValue}
                </div>
              </Col>
            </div>
        );
    }
}

export default StartInput;