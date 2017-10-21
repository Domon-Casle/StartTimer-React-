import React, { Component } from 'react';

class EntryTimeOutPut extends Component {
    constructor(props) {
        super(props);
        var outTimeDate = new Date(this.props.myStartTime);
        outTimeDate.setSeconds(outTimeDate.getSeconds() - parseInt(this.props.myValue));

        this.state = {
            myTime: outTimeDate.toLocaleTimeString()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.myValue !== nextProps.myValue || 
           this.props.myStartTime !== nextProps.myStartTime)
        {
          //console.log("redo " + this.props.myValue);
          return true;
        }
        else
        {
          //console.log("no change" + this.props.myValue);
          //console.log("no change" + this.props.myStartTime);
          return false;
        }
    }

    componentWillReceiveProps (nextProps) {
        var outTimeDate = new Date(nextProps.myStartTime);
        outTimeDate.setSeconds(outTimeDate.getSeconds() - parseInt(nextProps.myValue));
        this.setState({
            myTime: outTimeDate.toLocaleTimeString()
        });
    }

    render () {
        return (
            <div className="InnerEarlyTimeDiv">
                <span>{this.state.myTime} ({this.props.myValue} before)</span>
            </div>
        );
    }
}

export default EntryTimeOutPut;