import React, { Component } from 'react';

// TODO Get color change when close to time Red -> Orange -> Yellow -> Green
//https://stackoverflow.com/questions/43816071/react-and-multiple-timed-events?rq=1
//https://stackoverflow.com/questions/36270422/reactjs-settimeout-not-working
//https://stackoverflow.com/questions/45686557/how-to-make-backgrounds-color-transition-on-a-react-component
class EntryTimeOutPut extends Component {
    constructor(props) {
        super(props);
        var finalString;
        var outTimeDate = new Date(this.props.myStartTime);
        this.timeOutArray = [];

        if (this.props.myValue !== " ")
        {
            outTimeDate.setSeconds(outTimeDate.getSeconds() - parseInt(this.props.myValue));
            finalString = outTimeDate.toLocaleTimeString() + " (" + this.props.myValue + " before)";

            this.setColorTimeouts(outTimeDate);
        }
        else 
        {
            finalString = "Input an early start time";
        }

        this.state = {
            myTime: finalString,
            myColor: ""
        }
    }

    setColorTimeouts(outTimeDate) {
        // Clear out timeouts
        if (this.timeOutArray.length > 0)
        {
            this.timeOutArray.forEach(clearTimeout);
        }

        // Set Time outs
        var redTimer = outTimeDate.getTime() - Date.now() - 30000;
        if (redTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-red"
                });
            }.bind(this), redTimer));
        }

        var orangeTimer = outTimeDate.getTime() - Date.now() - 20000;
        if (orangeTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-orange"
                });
            }.bind(this), orangeTimer));
        }

        var yellowTimer = outTimeDate.getTime() - Date.now() - 10000;
        if (yellowTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-yellow"
                });
            }.bind(this), yellowTimer));
        }

        var greenTimer = outTimeDate.getTime() - Date.now();
        if (greenTimer > 0)
        {
            this.timeOutArray.push(setTimeout(function() {
                this.setState({
                    myColor: "notReady-green"
                });
            }.bind(this), greenTimer));
        }
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.myValue !== nextProps.myValue ||
            this.state.myColor !== nextState.myColor ||
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
        if (value.length > 0 && value !== " ")
        {
            finalString = outTimeDate.toLocaleTimeString() + " (" + nextProps.myValue + " before)";
        }
        else if (value === " ")
        {
            finalString = "Input an early start time";
        }
        else
        {
            finalString = outTimeDate.toLocaleTimeString(); 
        }
        
        this.setColorTimeouts(outTimeDate);

        this.setState({
            myTime: finalString,
            myColor: "notReady-Red"
        });
    }

    render() {
        return (
            <div className="InnerEarlyTimeDiv">
                <span className={this.state.myColor}>{this.state.myTime}</span>
            </div>
        );
    }
}

export default EntryTimeOutPut;