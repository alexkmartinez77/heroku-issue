import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  render() {
    return (
      <div className='container'>
        <input name="balance" type="number"></input>
        <input name="rate" type="number" step=".01"></input>
        <select name="term">
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <button name="submit"></button>
        <div name="output" id="output"></div>
      </div>
    );
  }
}
