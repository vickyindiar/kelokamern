import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card} from 'react-bootstrap';


function RightSecSales() {
    return (
        <div className={'right-section-sales'}>
           
                LEFT CARD
        </div>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(RightSecSales, areEqual)

