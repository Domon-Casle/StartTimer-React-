import React, { Component } from 'react';
import './App.css';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import CurrentTime from './Components/CurrentTime'
import StartInput from './Components/StartInput'
import EntryTimeInput from './Components/EntryTimeInput'
import EntryTimeOutPut from './Components/EntryTimeOutPut'

class App extends Component {
  constructor(props) {
      super(props);

      var currDate = new Date();
      var defaultStart = void 0;
      var hour = currDate.getHours();
      var minutes = currDate.getMinutes();

      if (minutes >= 30)
      {
        defaultStart = new Date(
            currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), hour + 1, "00", "00"
        );
      }
      else
      {
        defaultStart = new Date(
            currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), hour, "30", "00"
        );
      }


    //   if (hour >= 18) {
    //     defaultStart = new Date(currDate.getFullYear(),
    //         currDate.getMonth(), currDate.getDate(), "18", "30", "00");
    //   } else if (hour < 18 && hour > 12) {
    //     defaultStart = new Date(currDate.getFullYear(),
    //         currDate.getMonth(), currDate.getDate(), "16", "30", "00");
    //   } else if (hour < 10) {
    //     defaultStart = new Date(currDate.getFullYear(),
    //         currDate.getMonth(), currDate.getDate(), "09", "00", "00");
    //   } else {
    //     defaultStart = new Date(currDate.getFullYear(),
    //         currDate.getMonth(), currDate.getDate(), "11", "00", "00");
    //   }

      this.state = {
          values : ['10', '30', '60', '90'],
          startDate : defaultStart,
          startTime: defaultStart.toLocaleTimeString()
      };
  }

  handleStartChange (e) {
    var startInput = e.target.value.split(":");
    
    if (startInput.length === 2)
        startInput.push("00");

    var currDate = new Date();
    var newStartTime = new Date(currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate(), startInput[0], startInput[1], startInput[2]);

    this.setState ({
        startDate: newStartTime,
        startTime: newStartTime.toLocaleTimeString()
    });
  }

  handleAddClick (e) {
    this.setState ({
        values : this.state.values.concat([" "])
    });
  }

  handleRemoveClick (e) {
      var temp = this.state.values;
      temp.splice(e.target.id, 1);
      this.setState ({
          values : temp
      });
  }

  handleEnterChange (e) {
      var temp = this.state.values;
      temp[e.target.id] = e.target.value;
      this.setState ({
         values : temp 
      });
  }

  render() {
    return (
      <Grid>
        <Row className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
              <div className="navbar-header">
                <Button href="." bsStyle="danger"><span className="glyphicon glyphicon-repeat"></span> Refresh</Button>
              </div>
          </div>
        </Row>
        <div className="container body-content">
          <CurrentTime />
          <StartInput startValue={this.state.startDate} handleChange={this.handleStartChange.bind(this)} />
          <Row>
              <Col sm={5} md={5} lg={5} id="ConvertTimeDiv">
                  <div className="TimeHolderDiv" id="1">
                      <div>
                          <strong className="BigStrong">Early Start: </strong>
                          <Button bsStyle="success" className="btn-xs" onClick={this.handleAddClick.bind(this)}> <span className="glyphicon glyphicon-plus"></span></Button> 
                      </div>
                  </div>
                  {this.state.values.map(function(semiValue, index) {
                    return <EntryTimeInput key={index} myKey={index} myValue={semiValue} handleEnterChange={this.handleEnterChange.bind(this)} handleRemoveClick={this.handleRemoveClick.bind(this)} />
                  }.bind(this))}
              </Col>
              <Col sm={7} md={7} lg={7} className="EarlyTimeDiv">
                  <strong>Early Start: </strong>
                  {this.state.values.map(function(semiValue, index) {
                      return <EntryTimeOutPut key={index} myValue={semiValue} myStartTime={this.state.startDate} />
                  }.bind(this))}
              </Col>
            </Row>
          <hr />
        </div>
      </Grid>
    );
  }
}

export default App;
