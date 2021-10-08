import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance: 0,
      rate: 0,
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
    const {balance, rate, term} = stateObject;
    let b = balance;
    let n = term*12;
    let r = rate/100/12;
    let x = Math.pow((1+r), n);
    let M = (b*((r*x)/(x-1))).toFixed(2); 
    let Payment = M.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("output").innerText = `$${Payment} is your payment.`;
  }
  
  render() {
    return (
      <div className='container'>
        <div><input name="balance" type="number" value={this.state.balance} onChange={this.updateBalance}/></div>
        <div><input name="rate" type="number" value={this.state.rate} onChange={this.updateRate}/></div>
        <div>
          <select type="number" name="term" onChange={this.updateTerm}>
            <option type="number" value="15">15</option>
            <option type="number" value="30">30</option>
          </select>
        </div>
        <div><button name="submit" onClick={() => this.calculate(this.state)}>CALCULATE</button></div>
        <div name="output" id="output"></div>
      </div>
    );
  }
}
