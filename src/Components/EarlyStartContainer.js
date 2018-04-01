import React, { Component } from 'react';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import StartInput from './StartInput'
import EntryTimeInput from './EntryTimeInput'
import EntryTimeOutPut from './EntryTimeOutPut'

class EarlyStartContainer extends Component {
    constructor(props) {
        super(props);

        var currDate = new Date();
        var defaultStart = void 0;
        var hour = currDate.getHours();
        var minutes = currDate.getMinutes();

        if (minutes >= 30) {
            defaultStart = new Date(
                currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), hour + 1, "00", "00"
            );
        }
        else {
            defaultStart = new Date(
                currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), hour, "30", "00"
            );
        }

        this.state = {
            myId: this.props.myId,
            values: ['10', '30', '60', '90'],
            startDate: defaultStart,
            startTime: defaultStart.toLocaleTimeString()
        };
    }

    handleStartChange(e) {
        var startInput = e.target.value.split(":");

        if (startInput.length === 2)
            startInput.push("00");

        var currDate = new Date();
        var newStartTime = new Date(currDate.getFullYear(),
            currDate.getMonth(),
            currDate.getDate(), startInput[0], startInput[1], startInput[2]);

        this.setState({
            startDate: newStartTime,
            startTime: newStartTime.toLocaleTimeString()
        });
    }

    handleAddClick(e) {
        this.setState({
            values: this.state.values.concat([" "])
        });
    }

    handleRemoveClick(e) {
        var temp = this.state.values;
        temp.splice(e.target.id, 1);
        this.setState({
            values: temp
        });
    }

    handleEnterChange(e) {
        var temp = this.state.values;
        temp[e.target.id] = e.target.value;
        this.setState({
            values: temp
        });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <StartInput startValue={this.state.startDate} handleChange={this.handleStartChange.bind(this)} />
                </Row>
                <Row>
                    <Col sm={2} md={2} lg={2} id="ConvertTimeDiv">
                        <div className="TimeHolderDiv" id="1">
                            <div>
                                <strong className="BigStrong">Early Start </strong>
                                <Button bsStyle="success" className="btn-xs" onClick={this.handleAddClick.bind(this)}> <span className="glyphicon glyphicon-plus"></span></Button>
                            </div>
                        </div>
                        {this.state.values.map(function (semiValue, index) {
                            return <EntryTimeInput key={index} myKey={index} myValue={semiValue} handleEnterChange={this.handleEnterChange.bind(this)} handleRemoveClick={this.handleRemoveClick.bind(this)} />
                        }.bind(this))}
                    </Col>
                    <Col sm={4} md={4} lg={4} className="EarlyTimeDiv">
                        <strong>Early Start </strong>
                        {this.state.values.map(function (semiValue, index) {
                            return <EntryTimeOutPut key={index} myValue={semiValue} myStartTime={this.state.startDate} />
                        }.bind(this))}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default EarlyStartContainer;