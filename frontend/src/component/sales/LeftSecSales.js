import React from 'react'
import {Row, Col, Card} from 'react-bootstrap';
import LeftScanSales from './LeftScanSales';
import LeftItemSales from './LeftItemSales';
import LeftNoteSales from './LeftNoteSales';

function LeftSecSales() {
    return (
        <div className={'left-section-sales'}>
            <LeftScanSales />
            <LeftItemSales />
            <LeftNoteSales />
        </div>
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(LeftSecSales, areEqual)