import React from 'react';

/*function round(n){
  return Math.round((n + Number.EPSILON) * 100) / 100
}*/
function round(n) {    
  return +(Math.round(n + "e+2")  + "e-2");
}

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
      balance: 165000,
      rate: 4.5,
      term: 30,
      monthlyPayment: 0,
    }
    this.updateBalance = this.updateBalance.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.calculate  = this.calculate.bind(this);
    this.createRows  = this.createRows.bind(this);
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
      /*let M = (b*((r*x)/(x-1))).toFixed(2); */
      let M = round((b*((r*x)/(x-1)))); 
      let Payment = M;
      document.getElementById("output").innerText = `$${Payment} is your monthly payment.`;
      this.setState({
        monthlyPayment: M,
      })    
    }
  }

  createRows(){
    let rows = [];
    const {balance, rate, term, monthlyPayment} = this.state;
    const payment = monthlyPayment;
    let months = term*12;
    let periodRate = rate*.01/12;
    let startingBalance = balance;

    /*var interest = parseFloat((startingBalance*periodRate).toFixed(2));
    var principal = parseFloat((payment - interest).toFixed(2));*/
    var interest = round(startingBalance*periodRate);
    var principal = round(payment - interest);
    var totalInterest = interest;
    var newBalance = startingBalance-principal;
    console.log(interest, principal, totalInterest, newBalance);
      for(let i=1; i <= months; i++){
            rows.push(<tr key={i}>
                    <td>{i}</td>
                    <td>{payment}</td>
                    <td>{principal}</td>
                    <td>{interest}</td>
                    <td>{totalInterest}</td>
                    <td>{newBalance}</td>
                  </tr>);
        /*interest = parseFloat((newBalance*periodRate).toFixed(2));
        principal = parseFloat((payment - interest).toFixed(2));
        totalInterest = parseFloat((totalInterest + interest).toFixed(2));
        newBalance = parseFloat((newBalance - principal).toFixed(2));*/
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
                  <option value="5">5</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
            </div>
          </div>
          <div className="row form-group justify-content-center">
            <div className="col-4 offset-2 text-center">
              <button className="btn btn-primary" name="submit" onClick={() => this.calculate(this.state)}>CALCULATE</button>
            </div>
          </div>
          <div className="row form-group justify-content-center">
            <div className="col-4 offset-2 text-center">
              <h4 name="output" id="output"></h4>
            </div>
          </div>
        </div>
        {/* Amortization Container */}
        <div className="container p-5 my-5 bg-light border">
          <div className="row justify-content-center">
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
