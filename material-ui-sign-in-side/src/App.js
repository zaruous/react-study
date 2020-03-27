import React, { useState } from 'react';
import './App.css';
import SignInSide from './SignInSide';

function App() {

 
  return (
    <div className="App">
      <div>
        <SingInSideWrapper/>
      </div>
    </div>
  );
}



class SingInSideWrapper extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : ''
    };
  }

 

  render(){
    return <div><SignInSide id='signInSide' email={this.state.email} password={this.state.password} ></SignInSide></div>
  }
}
export default App;
