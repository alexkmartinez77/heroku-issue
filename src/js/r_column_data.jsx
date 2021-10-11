import React from 'react'

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
          <h1 className="display-3">{monetize(this.props.mPay)}</h1>
        </div>
        <div className="row">
          <div className="col">
            <div className="mx-3">
              <span className="pull-left">Total Interest Paid</span>
              <span className="pull-right">{monetize((this.props.tIntPay).toFixed(2))}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mx-3 border-top">
              <span className="pull-left">Total Amount Paid</span>
              <span className="pull-right">{monetize((this.props.mPay * this.props.t * 12).toFixed(2))}</span>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default R_Column_Data;