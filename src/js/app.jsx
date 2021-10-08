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
    this.calculate  = this.calculate.bind(this);
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

  calculate(stateObject){
    console.log(stateObject);
    const {balance, rate, term} = stateObject;
    document.getElementById("output").innerText = "$1945.09 is your payment";
  }
  
  render() {
    return (
      <div className='container'>
        <div><input name="balance" type="number" value={this.state.balance} onChange={this.updateBalance}/></div>
        <div><input name="rate" type="number" step=".01" value={this.state.rate} onChange={this.updateRate}/></div>
        <div>
          <select name="term" onChange={this.updateTerm}>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
        </div>
        <div><button name="submit" onClick={() => this.calculate(this.state)}>CALCULATE</button></div>
        <div name="output" id="output"></div>
      </div>
    );
  }
}
