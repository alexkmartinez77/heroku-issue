import React from 'react';

export function round(n) {    
  return +(Math.round(n + "e+2")  + "e-2");
}

export function monetize(money) {
  return `$${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}

export function generateRowsArray(b, r, m, n){
  const payment = m;
  const months = n;
  const periodRate = r;
  const startingBalance = b;
  const rows = [];

  var interest = round(startingBalance*periodRate);
  var principal = round(payment - interest);
  var totalInterest = interest;
  var newBalance = startingBalance-principal;
    for(let i = 1; i <= months; i++){
      rows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{monetize(payment.toFixed(2))}</td>
          <td>{monetize(principal.toFixed(2))}</td>
          <td>{monetize(interest.toFixed(2))}</td>
          <td>{monetize(totalInterest.toFixed(2))}</td>
          <td>{monetize(newBalance.toFixed(2))}</td>
        </tr>
      );
      interest = round(newBalance*periodRate);
      principal = round(payment - interest);
      totalInterest = round(totalInterest + interest);
      newBalance = round(newBalance - principal);
    }
  return {
    rowsArray: rows, 
    totalInterest: totalInterest,
  }
}