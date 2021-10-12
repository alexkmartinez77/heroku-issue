import React from 'react'
import {monetize} from './helperfxs.js';


export class R_Column_Data extends React.Component{
  render() {
    return (
      <div>
        <div className="row text-center mt-4">
          <div className="col">
            <h5>Monthly Payments</h5>
          </div>
        </div>
        <div className="row text-center mb-5">
          <h1 style={{fontFamily: 'Michroma', fontSize: '2em', color:`rgb(${'70, 130, 65'})`}}>{monetize(this.props.mPay)}</h1>
        </div>
        <div className="row">
          <div className="col">
            <div className="mx-3">
              <span className="float-end float-sm-start">Total Interest Paid</span>
              <span className="float-end">{monetize((this.props.tIntPay).toFixed(2))}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mx-3 border-top">
              <span className="float-end float-sm-start">Total Amount Paid</span>
              <span className="float-end">{monetize((this.props.mPay * this.props.t * 12).toFixed(2))}</span>
            </div>
          </div>
        </div>
        <div className="row text-center mt-5 text-muted px-3">
          <div className="col">
            Review an <a style={{color: 'blue', cursor: 'pointer'}} onClick={() => this.props.showAS()}>amortization schedule</a> to see how much you will be paying in principal and interest over time.
          </div>
        </div>

    </div>
    )
  }
}

export default R_Column_Data;