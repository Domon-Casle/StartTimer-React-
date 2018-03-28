import React, { Component } from 'react';

class EntryTimeOutPut extends Component {
    constructor(props) {
        super(props);
        var outTimeDate = new Date(this.props.myStartTime);
        outTimeDate.setSeconds(outTimeDate.getSeconds() - parseInt(this.props.myValue));
        var finalString = outTimeDate.toLocaleTimeString() + "(" + this.props.myValue + " before)";

        this.state = {
            myTime: finalString
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.myValue !== nextProps.myValue ||
            this.props.myStartTime !== nextProps.myStartTime) {
            //console.log("redo " + this.props.myValue);
            return true;
        }
        else {
            //console.log("no change" + this.props.myValue);
            //console.log("no change" + this.props.myStartTime);
            return false;
        }
    }

    componentWillReceiveProps(nextProps) {
        var outTimeDate = new Date(nextProps.myStartTime);
        var value = nextProps.myValue;
        var indexofMinutes = null;
        var indexofSeconds = null;
        var minutes = 0;
        var seconds = 0;

        if (value.includes("m")) {
            indexofMinutes = value.indexOf("m");
        }
        if (value.includes("M")) {
            indexofMinutes = value.indexOf("M")
        }
        if (value.includes("s")) {
            indexofSeconds = value.indexOf("s");
        }
        if (value.includes("S")) {
            indexofSeconds = value.indexOf("S");
        }

        if ((indexofMinutes !== null) && (indexofSeconds !== null) && (indexofMinutes > indexofSeconds))
        {
            this.setState({
                myTime: "Invalid Time: Please enter M before S"
            });
            return;
        }
        else 
        {
            if (indexofMinutes !== null) {
                minutes = parseInt(value.substring(0, indexofMinutes));
                minutes *= 60;
            }

            if (indexofMinutes === null) {
                if (value.length !== 0) {
                    seconds = parseInt(value);
                }
            }
            else {
                if (indexofSeconds !== null) {
                    seconds = parseInt(value.substring(indexofMinutes + 1, value.length - 1));
                }
                else {
                    if ((indexofMinutes + 1) < value.length) {
                        seconds = parseInt(value.substring(indexofMinutes + 1, value.length));
                    }
                }
            }
        }

        seconds += minutes;
        var newValue = seconds;

        outTimeDate.setSeconds(outTimeDate.getSeconds() - parseInt(newValue));

        var finalString = null;
        if (value.length > 0)
        {
            finalString = outTimeDate.toLocaleTimeString() + "(" + nextProps.myValue + " before)";
        }
        else 
        {
            finalString = outTimeDate.toLocaleTimeString(); 
        }
        
        this.setState({
            myTime: finalString
        });
    }

    render() {
        return (
            <div className="InnerEarlyTimeDiv">
                <span>{this.state.myTime}</span>
            </div>
        );
    }
}

export default EntryTimeOutPut;