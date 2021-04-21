import React from 'react'
import {Row, Col, Card} from 'react-bootstrap';
import ScanSales from './ScanSales';
import ItemSales from './ItemSales';
import NoteSales from './NoteSales';

function LeftSecSales() {
    return (
        <div className={'left-section-sales'}>
            <ScanSales />
            <ItemSales />
            <NoteSales />
        </div>
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(LeftSecSales, areEqual)