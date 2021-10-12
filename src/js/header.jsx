import React from 'react';

export class Header extends React.Component{
  render() {
    return (
      <div className="row text-center">
        <div className="col-12">
          <h1 style={{fontFamily: 'Lexend Exa', fontSize: '1.75em'}}>Mortgage Calculator</h1>
        </div>
      </div>
    )
  }
}

export default Header;