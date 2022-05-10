import React from 'react';
import {round, monetize, generateRowsArray} from './helperfxs.js';
import Table from './table'
import Header from './header'
import Label from './label'
import R_Column_Data from './r_column_data.jsx';
import R_Column_Logo from './r_column_logo.jsx';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance: 0,
      rate: 0,
      term: 'Choose a Mortgage Term',
      monthlyPayment: 0,
      totalInterestPaid: 0,
      totalPayments: 0,
      tableRows: [],
      rightColToggle: false,
      showAmSch: false,
    }

    this.handleInput = this.handleInput.bind(this);
    this.generateTableRows = this.generateTableRows.bind(this);
    this.showAmSchFx = this.showAmSchFx.bind(this);
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

      const genRowsObj = generateRowsArray(b,r,m,n);
      this.setState({
        monthlyPayment: m,
        totalInterestPaid: parseFloat(genRowsObj.totalInterest),
        tableRows: genRowsObj.rowsArray,
        rightColToggle: true,
      })
    }
  }

  showAmSchFx(){
    this.setState({
      showAmSch: !this.state.showAmSch,
    })
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
              <Header />
              <Label inputName="balance" innerText="Mortgage Amount"/>
              <div className="row">
                <div className="col-10 offset-1">
                  <input className="form-control" name="balance" type="number" defaultValue={this.state.balance} onChange={this.handleInput}/>
                </div>
              </div>
              <Label inputName="rate" innerText="Interest Rate Per Year"/>
              <div className="row">
                <div className="col-10 offset-1">
                  <input className="form-control" name="rate" type="number" step=".01" defaultValue={this.state.rate} onChange={this.handleInput}/>
                </div>
              </div>
              <Label inputName="term" innerText="Mortgage Term In Years"/>
              <div className="row">
                <div className="col-10 offset-1">
                  <select className="form-control" name="term" defaultValue={this.state.term} onChange={this.handleInput}>
                    <option disabled>Choose a Mortgage Term</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </div>
              <div className="row my-5 text-center">
                <div className="col-12">
                  <button className="btn btn-primary" name="submit" onClick={() => this.calculate(this.state)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calculator" viewBox="0 0 16 16">
                      <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                      <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"/>
                    </svg>{" CALCULATE "}
                  </button>
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
              {this.state.rightColToggle ? <R_Column_Data mPay={this.state.monthlyPayment} tIntPay={this.state.totalInterestPaid} t={this.state.term} showAS={this.showAmSchFx}/> : <R_Column_Logo />}
            </div>
          </div>
        </div>
        {/* Amortization Container */}
        {this.state.showAmSch ? <Table renderTable={this.generateTableRows} /> : <div></div>}
      </div>
    );
  }
}
