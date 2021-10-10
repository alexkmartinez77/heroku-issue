import React from 'react';
import {round, monetize} from './helperfxs.js'


class tableRow extends React.Component{
  render(){
    return(
      <tr>
        <td></td>
        <td>{this.props.pay}</td>
        <td>{this.props.b}</td>
        <td>{this.props.i}</td>
        <td>{this.props.tI}</td>
        <td>{this.props.p}</td>
      </tr>
    );
  }
}
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance: 0,
      rate: 0,
      term: 30,
      monthlyPayment: 0,
      totalInterestPaid: 0,
      totalPayments: 0,
    }

    this.handleInput = this.handleInput.bind(this);
    this.calculate  = this.calculate.bind(this);
    this.createRows  = this.createRows.bind(this);

  }

  handleInput(event){
    this.setState({
      [event.target.name]: parseFloat(event.target.value),
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
      let M = round((b*((r*x)/(x-1)))); 
      let Payment = monetize(M);
      document.getElementById("output").innerText = `${Payment} is your monthly payment.`;
      this.setState({
        monthlyPayment: M,
      })    
    }
  }

  createRows(){
    let rows = [];
    const {balance, rate, term, monthlyPayment} = this.state;
    const payment = monthlyPayment;
    const months = term*12;
    const periodRate = rate*.01/12;
    const startingBalance = balance;

    var interest = round(startingBalance*periodRate);
    var principal = round(payment - interest);
    var totalInterest = interest;
    var newBalance = startingBalance-principal;

      for(let i = 1; i <= months; i++){
        rows.push(<tr key={i}>
                <td>{i}</td>
                <td>{monetize(payment.toFixed(2))}</td>
                <td>{monetize(principal.toFixed(2))}</td>
                <td>{monetize(interest.toFixed(2))}</td>
                <td>{monetize(totalInterest.toFixed(2))}</td>
                <td>{monetize(newBalance.toFixed(2))}</td>
              </tr>);
        interest = round(newBalance*periodRate);
        principal = round(payment - interest);
        totalInterest = round(totalInterest + interest);
        newBalance = round(newBalance - principal);
      }
    return rows;
}

  render() {
    return (
      <div>
        {/* Calculator Container */}
        <div className="container my-5 border">
          <div className="row">
            {/* Left Column */}
            <div className="col-6 bg-light">
              <div className="row text-center">
                  <div className="col-12">
                    <h1>Mortgage Calculator</h1>
                  </div>
              </div>
              <div className="row text-left mt-3">
                <div className="col-10 offset-1">
                  <label htmlFor="balance">Mortgage Amount</label>
                </div>
              </div>
              <div className="row">
                <div className="col-10 offset-1">
                  <input className="form-control" name="balance" type="number" defaultValue={this.state.balance} onChange={this.handleInput}/>
                </div>
              </div>
              <div className="row text-left mt-3">
                <div className="col-10 offset-1">
                  <label htmlFor="rate">Interest Rate Per Year</label>
                </div>
              </div>
              <div className="row">
                <div className="col-10 offset-1">
                  <input className="form-control" name="rate" type="number" step=".01" defaultValue={this.state.rate} onChange={this.handleInput}/>
                </div>
              </div>
              <div className="row text-left mt-3">
                <div className="col-10 offset-1">
                  <label htmlFor="term">Mortgage Term In Years</label>
                </div>
              </div>
              <div className="row">
                <div className="col-10 offset-1">
                  <select className="form-control" name="term" defaultValue={this.state.term} onChange={this.handleInput}>
                    <option value="5">5</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </div>
              <div className="row my-5 text-center">
                <div className="col-12">
                  <button className="btn btn-primary" name="submit" onClick={() => this.calculate(this.state)}>CALCULATE</button>
                </div>
              </div>
            <div className="row text-center">
              <div className="col-12">
                <h4 name="output" id="output"></h4>
              </div>
            </div>
            </div>
            {/* Right Column */}
            <div className="col-6">
              <div className="row text-center mt-4">
                <div className="col">
                  <h5>Monthly Payments</h5>
                </div>
              </div>
              <div className="row text-center mb-5">
                <h1>{monetize(this.state.monthlyPayment)}</h1>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mx-3">
                    <span className="pull-left">Total Interest Paid</span>
                    <span className="pull-right">$135,971.07</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mx-3 border-top">
                    <span className="pull-left">Total Paid On This Loan</span>
                    <span className="pull-right">{monetize((this.state.monthlyPayment * this.state.term * 12).toFixed(2))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Amortization Container */}
        <div className="container p-5 my-5 bg-light border">
          <div className="row text-center">
              <h1>Amortization Table</h1>
          </div>  
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Principal</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Total Interest</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody id="amortizationTable">
                {this.createRows()}
              </tbody>
            </table>
          </div>      
        </div>
      </div>
    );
  }
}
