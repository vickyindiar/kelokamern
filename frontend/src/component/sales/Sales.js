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
          <div className="content-sales">
              <Row className ="nopadding">
                <Col xs={8}>
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
const areEqual = (prevProps, nextProps) => true;
export default React.memo(Sales, areEqual)

