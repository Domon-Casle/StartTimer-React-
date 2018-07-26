import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class StartInput extends Component {
    constructor(props) {
        super(props);
        var startSeconds = this.props.startValue.getSeconds();
        var startMinutes = this.props.startValue.getMinutes();
        var startHour = this.props.startValue.getHours();
        var defaultMoment = moment();

        this.timeOutArray = [];

        if (startHour < 10) {
            startHour = "0" + startHour;
        }

        if (startMinutes === 0) {
            startMinutes = "00";
        }

        if (startSeconds === 0) {
            startSeconds = "00";
        }

        // Set the timeouts
        this.startTimeout(this.props.startValue);

        var defaultValue = startHour + ":" + startMinutes + ":" + startSeconds;

        defaultMoment.set({
            'hour': startHour,
            'minute': startMinutes,
            'second': startSeconds
        });

        this.state = {
            momentDisplayDefault: defaultMoment,
            displayValue: this.props.startValue.toLocaleTimeString(),
            displayDefault: defaultValue,
            myColor: ""
        }
    }

    startTimeout (startTimeDate) {
        // Clear out timeouts
        if (this.timeOutArray.length > 0)
        {
            this.timeOutArray.forEach(clearTimeout);
        }

        // Set Time outs
        var redTimer = startTimeDate.getTime() - Date.now() - 30000;
        if (redTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-red"
                });
            }.bind(this), redTimer));
        }

        var orangeTimer = startTimeDate.getTime() - Date.now() - 20000;
        if (orangeTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-orange"
                });
            }.bind(this), orangeTimer));
        }

        var yellowTimer = startTimeDate.getTime() - Date.now() - 10000;
        if (yellowTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-yellow"
                });
            }.bind(this), yellowTimer));
        }

        var greenTimer = startTimeDate.getTime() - Date.now();
        if (greenTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-green"
                });
            }.bind(this), greenTimer));
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if ((this.props.startValue !== nextProps.startValue) ||
            (this.state.myColor !== nextState.myColor)) {
            return true;
        } else {
            return false;
        }
    }

    componentWillReceiveProps (nextProps) {
        var outTimeDate = new Date(nextProps.startValue);

        // Set timeout timers 
        this.startTimeout(outTimeDate);

        this.setState({
            displayValue: outTimeDate.toLocaleTimeString(),
            myColor: "notReady-Red"
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
                      <TimePicker use12Hours="true" defaultValue={this.state.momentDisplayDefault} />
                      <input id={this.props.myId} type="time" defaultValue={this.state.displayDefault} onChange={this.props.handleChange} />
                  </div>
              </Col>
              <Col sm={4} md={4} lg={4} className="StartTimeDiv">
                <strong>Start Time </strong>
                <div className="InnerStartTimeDiv">
                    <span className={this.state.myColor}>{this.state.displayValue}</span>
                </div>
              </Col>
            </div>
        );
    }
}

export default StartInput;