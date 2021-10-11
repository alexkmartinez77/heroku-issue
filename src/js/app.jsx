import React from 'react';
import {round, monetize, generateRowsArray} from './helperfxs.js'

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
      tableRows: [],
    }

    this.handleInput = this.handleInput.bind(this);
    this.generateTableRows = this.generateTableRows.bind(this);
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
      let m = round((b*((r*x)/(x-1)))); 
      document.getElementById("output").innerText = `${monetize(m)} is your monthly payment.`;

      const genRowsObj = generateRowsArray(b,r,m,n);
      this.setState({
        monthlyPayment: m,
        totalInterestPaid: parseFloat(genRowsObj.totalInterest),
        tableRows: genRowsObj.rowsArray,
      })
    }
  }

  generateTableRows(){
    return this.state.tableRows;
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
                    <span className="pull-right">{monetize((this.state.totalInterestPaid).toFixed(2))}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mx-3 border-top">
                    <span className="pull-left">Total Amount Paid</span>
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
                  <th scope="col" className="text-center">#</th>
                  <th scope="col" className="text-center">Payment</th>
                  <th scope="col" className="text-center">Principal</th>
                  <th scope="col" className="text-center">Interest</th>
                  <th scope="col" className="text-center">Total Interest</th>
                  <th scope="col" className="text-center">Balance</th>
                </tr>
              </thead>
              <tbody id="amortizationTable">
                {this.generateTableRows()}
              </tbody>
            </table>
          </div>      
        </div>
      </div>
    );
  }
}
