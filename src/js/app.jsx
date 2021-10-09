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
      balance: parseFloat(event.target.value),
    });
  }

  updateRate(event){
    this.setState({
      rate: parseFloat(event.target.value),
    });
  }

  updateTerm(event){
    this.setState({
      term: parseFloat(event.target.value),
    });
  }

  calculate(stateObject){
    const {balance, rate, term} = stateObject;
    if(balance == 0 || rate ==0){
      document.getElementById("output").innerText = `Please enter a valid rate and balance.`;
    } else {
      let b = balance;
      let n = term*12;
      let r = rate*.01/12;
      let x = Math.pow((1+r), n);
      let M = (b*((r*x)/(x-1))).toFixed(2); 
      let Payment = M;
      document.getElementById("output").innerText = `$${Payment} is your monthly payment.`;
  
    }
  }
  
  render() {
    return (
      <div className="container p-5 my-5 bg-light border">
        <div className="row form-group justify-content-center">
          <div className="col-4 offset-2">
            <h1>Mortgage Calculator</h1>
          </div>
        </div>
        <div className="row form-group justify-content-center">
          <div className="col-2 text-right">
            <label style={{padding: "16.25px 0px 6.25px 0px"}} htmlFor="balance">Balance</label>
          </div>
          <div className="col-4 form-floating">
              <input className="form-control" name="balance" type="number" defaultValue={this.state.balance} onChange={this.updateBalance}/>
          </div>
        </div>
        <div className="row form-group justify-content-center">
          <div className="col-2 text-right">
            <label style={{padding: "16.25px 0px 6.25px 0px"}} htmlFor="rate">APR</label>
          </div>
          <div className="col-4 form-floating">
              <input className="form-control" name="rate" type="number" step=".01" defaultValue={this.state.rate} onChange={this.updateRate}/>
          </div>
        </div>
        <div className="row form-group justify-content-center">
          <div className="col-2 text-right">
            <label style={{padding: "16.25px 0px 6.25px 0px"}} htmlFor="term">Term</label>
          </div>
          <div className="col-4 form-floating">
              <select className="form-select" name="term" defaultValue={this.state.term} onChange={this.updateTerm}>
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col text-center">
            <button className="btn btn-primary" name="submit" onClick={() => this.calculate(this.state)}>CALCULATE</button>
          </div>
        </div>
        <div className="row form-group">
          <div className="col text-center">
            <h4 name="output" id="output"></h4>
          </div>
        </div>
      </div>
    );
  }
}
