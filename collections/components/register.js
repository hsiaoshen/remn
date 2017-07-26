import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Thumbnail, Button, Glyphicon, FormGroup, FormControl, ControlLabel  } from 'react-bootstrap';
import { Router, Route} from 'react-router';

let savepw = '';
let name = '';

class Register extends React.Component {
      constructor(props){
      super(props);
      this.state = {result: true, inputstate: null, message: ''};
    }

    handlerclick(){
      var data ={
        name: name,
        password: savepw
      }
      $.post('/api/register', data, (data) => {
        // console.log(data);
        this.setState({message: data.result});
      })
      console.log('login');
    }

    handleChangename(e){
      name = e.target.value;
    }

    handleChangepw(e){
      savepw = e.target.value;
    }

    handleChange(e){
       if(savepw === e.target.value){
         this.setState({result: false, inputstate: 'success'});
       }
       else {
         this.setState({result: true , inputstate: 'error'});
       }
    }
  render(){
    var result = this.state.result;
    var inputstate = this.state.inputstate;
    var message = this.state.message;
    return (
      <div className='login-react'>
      <h3>{message}</h3>
      <FormGroup controlId="name">
      <ControlLabel>User Name:</ControlLabel>
      <FormControl type="text"  onChange={this.handleChangename.bind(this)}/>
      <FormControl.Feedback />
      </FormGroup>

      <FormGroup controlId="password1" validationState={inputstate}>
      <ControlLabel>password:</ControlLabel>
      <FormControl type="password"  onChange={this.handleChangepw.bind(this)}/>
      <FormControl.Feedback />
      </FormGroup>

      <FormGroup controlId="password2" validationState={inputstate}>
      <ControlLabel>repassword:</ControlLabel>
      <FormControl type="password"  onChange={this.handleChange.bind(this)}/>
      <FormControl.Feedback />
      </FormGroup>

      <Button bsStyle='success' onClick={this.handlerclick.bind(this)}  disabled={result}><Glyphicon glyph="star" /> register</Button>

      <Button bsStyle='primary' type='reset' >cancel</Button>

      </div>
    );
  }
}


ReactDOM.render(
  <Register />,
  document.getElementById('register1')
);
