import React, { Component } from 'react'
import Header from '../template/Header';
import LeftSecSales from '../sales/LeftSecSales';
import RightSecSales from '../sales/RightSecSales';
import {Row, Col} from 'react-bootstrap';
import '../../styles/sass/component/_sales.scss'
export class Sales extends Component {
    render() {
    return (
      <React.Fragment>
        <div className="content-container sales">
        <Header /> 
          <div className="content-data">
              <Row className ="nopadding">
                <Col xs={7}>
                    <LeftSecSales />
                </Col>
                <Col>
                    <RightSecSales/>
                </Col>
              </Row>
          </div>
      </div>
      </React.Fragment>
    )
  }
}

export default Sales
