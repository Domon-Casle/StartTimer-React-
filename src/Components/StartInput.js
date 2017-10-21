import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class StartInput extends Component {
    constructor(props) {
        super(props);

        var startArray = this.props.startValue.getSeconds();
        var defaultValue = void 0;

        if (startArray === 0) {
            defaultValue = this.props.startValue.getHours() + ":" + 
            this.props.startValue.getMinutes() + ":00";
        } else {
            defaultValue = this.props.startValue.getHours() + ":" + 
            this.props.startValue.getMinutes() + ":" + 
            this.props.startValue.getSeconds();
        }

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
              <Col className="StartTimeDiv">
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