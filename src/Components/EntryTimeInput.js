import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class EntryTimeInput extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.myValue !== nextProps.myValue)
        {
          //console.log("redo " + this.props.myValue);
          return true;
        }
        else
        {
          //console.log("no change" + this.props.myValue);
          return false;
        }
      }
      
    render () {
        return (
            <div className="EntryTimeInputDiv">
                <input id={this.props.myKey} type="number" className="ConvertTime" value={this.props.myValue} onChange={this.props.handleEnterChange} /> 
                <Button id={this.props.myKey} bsStyle="danger" className="btn-xs" onClick={this.props.handleRemoveClick}> <span id={this.props.myKey} className="glyphicon glyphicon-minus"></span></Button> 
            </div>
        );
    }
}

export default EntryTimeInput;