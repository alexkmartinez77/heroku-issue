import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance: 100000,
      rate: 5,
      term: 15,
    }
    this.updateBalance = this.updateBalance.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
  }

  updateBalance(event){
    this.setState({
      balance: parseInt(event.target.value),
    });
  }

  updateRate(event){
    this.setState({
      rate: parseInt(event.target.value),
    });
  }

  updateTerm(event){
    this.setState({
      term: parseInt(event.target.value),
    });
  }

  calculate(){

  }
  
  render() {
    return (
      <div className='container'>
        <input name="balance" type="number" value={this.state.balance} onChange={this.updateBalance}/>
        <input name="rate" type="number" step=".01" value={this.state.rate} onChange={this.updateRate}/>
        <select name="term" onChange={this.updateTerm}>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <button name="submit">CALCULATE</button>
        <div name="output" id="output"></div>
      </div>
    );
  }
}
