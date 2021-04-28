import React, { Component } from 'react'
import Header from '../template/Header';
export class Purchase extends Component {
    render() {
    return (
      <React.Fragment>
        <Header />
        <div className="content-container purchase">
            Purchase
      </div>
      </React.Fragment>
    )
  }
}

export default Purchase
