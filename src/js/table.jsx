import React from 'react';

export class Table extends React.Component{
  render() {
    return (
      <div className="container p-5 my-5 bg-light border">
      <div className="row text-center">
          <h1>Amortization Table</h1>
      </div>  
      <div className="row">
        <table className="table table-striped">
          <thead className="border-top">
            <tr>
              <th scope="col" className="text-center align-middle">#</th>
              <th scope="col" className="text-center align-middle">Payment</th>
              <th scope="col" className="text-center align-middle">Principal</th>
              <th scope="col" className="text-center align-middle">Interest</th>
              <th scope="col" className="text-center align-middle">Total Interest</th>
              <th scope="col" className="text-center align-middle">Balance</th>
            </tr>
          </thead>
          <tbody id="amortizationTable">
            {this.props.renderTable()}
          </tbody>
        </table>
      </div>      
    </div>
    )
  }
}

export default Table;
