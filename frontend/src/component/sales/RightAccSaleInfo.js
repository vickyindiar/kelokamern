import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DateBox, SelectBox } from 'devextreme-react';
import { getData } from '../../services/actions/dataAction';
import { CUSTOMER_TAB_INDEX, tab } from '../data/ConfigGrids';

function RightAccSaleInfo({data}) {

    const [invDate, setInvDate] = useState(new Date());
    const customerDS = useSelector(s => s.data.dataCustomer); 
    const user = useSelector(s => s.auth.user);
    const dispatch = useDispatch();
    useEffect(() => {   
        dispatch(getData(CUSTOMER_TAB_INDEX));
    }, [])


    return (
        <div>
            <Row className={'mb-2'}>
                <Col>Invoice</Col>
                <Col>{data.invno}</Col>
            </Row>
            <Row className={'mb-2'}>
                <Col>Date</Col>
                <Col>
                    <DateBox defaultValue={invDate} disabled={true} type="date" />
                </Col>
            </Row>
            <Row className={'mb-2'}>
                <Col>Cashier</Col>
                <Col>{user.name}</Col>
            </Row>
            <Row>
                <Col>Customer</Col>
                <Col>
                <SelectBox 
                    dataSource={customerDS}
                    displayExpr={'name'}
                    valueExpr={'_id'}
                    searchEnabled={true}
                    searchMode={'contains'}
                    searchExpr={'name'}
                    searchTimeout={200}
                    minSearchLength={0}
                    showDataBeforeSearch={true} 
                    defaultValue={data.customer}
                />
                </Col>
            </Row>
            
        </div>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(RightAccSaleInfo, areEqual)

