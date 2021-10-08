import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance: 100000,
      rate: 5,
      term: 15,

    }
  }
  
  render() {
    return (
      <div className='container'>
        <input name="balance" type="number" value="this.state.balance"></input>
        <input name="rate" type="number" step=".01" value="this.state.balance"></input>
        <select name="term">
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <button name="submit"></button>
        <div name="output" id="output"></div>
      </div>
    );
  }
}
