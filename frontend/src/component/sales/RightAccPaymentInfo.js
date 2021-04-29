import React, {useState} from 'react';
import { Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import {Button, NumberBox} from 'devextreme-react';
import {formatRupiah} from '../../services/helper/IDRFormat';
import { changeCashValue, updateAddCharge, updateAddDisc  } from '../../services/actions/salesAction';

function RightAccPaymentInfo({data}) {
    const dsItems = useSelector(s => s.sales.dataItems);
    const dsInfo = useSelector(s => s.sales.dataInfo);
    const dispatch = useDispatch();
    console.log('payment info')
    
    const calculateTotal = () => {
        return( <div>{Number(data.subTotal - data.disc + data.addCharge - data.addDisc) }</div> )
    }

    const CalculateDueChange = () => {
        return(
            <div>{Number(data.grantotal - data.cash + data.addCharge - data.addDisc) }</div>
        )
    }

    const onChangedCash = (e) => {
        dispatch(changeCashValue(e.value, dsItems, data));
    }
    const onChangedAddCharge = (e) => {
        console.log('addcharge')
        dispatch(updateAddCharge(e.value, dsItems, data));
    }

    const onChangedAddDisc = (e) =>{
        dispatch(updateAddDisc(e.value, dsItems, data));
    }

    const onTrfChanged = (e) => {
        //
    }

    const onAddPayment = () =>{

    }

    const onCancelPayment = () => {

    }

    const onProcessPayment = () => {
    }
    return (
        <>
            <Row className='mb-2'> <Col>SubTotal</Col> <Col className="d-flex justify-content-end">{ formatRupiah(data.subTotal)}</Col> </Row>  
            <div className={'line-h-payment-info'}></div>
            <Row className='mb-2'> <Col>Discount</Col> <Col className="d-flex justify-content-end" >{formatRupiah(data.disc)}</Col> </Row> 
            <div className={'line-h-payment-info'}></div> 
            <Row className='mb-2'>
                <Col>Additional Charge</Col>
                <Col className="d-flex justify-content-end">
                {/* formatRupiah(data.addCharge)} */}
                <NumberBox
                        id={'eAddCharge'}
                        defaultValue={data.addCharge}
                        min={0}
                        style={{'fontSize':'2rem'}}
                        showSpinButtons={false}
                        format="Rp #,##0"
                        onValueChanged ={onChangedAddCharge}
                />
                </Col> 
            </Row>  
            <div className={'line-h-payment-info'}></div>
            <Row className='mb-2'> 
                <Col>Additional Discount</Col>
                <Col className="d-flex justify-content-end">
                    {/* {formatRupiah(data.addDisc)} */}
                    <NumberBox
                        id={'eAddDisc'}
                        defaultValue={data.addDisc}
                        min={0}
                        style={{'fontSize':'2rem'}}
                        showSpinButtons={false}
                        format="Rp #,##0"
                        onValueChanged ={onChangedAddDisc}
                    />
                </Col>  
            </Row>  
            <div className={'line-h-payment-info'}></div>
            <Row className='mb-2'> <Col className="h5">TOTAL</Col> <Col  className="d-flex justify-content-end">{formatRupiah(data.grandTotal)}</Col></Row> 
            <Row className="mb-2">
                <div className={'cash-due-box'}>
                    <div className={'cash-box'}>
                        <div className={'cash-label'}><strong>Cash (Rp.)</strong></div>
                        <div className={'cash-value'}>    
                            <NumberBox
                                id={'eCashValue'}
                                defaultValue={data.cash}
                                min={0}
                                height={'10vh'}
                                style={{'fontSize':'2rem'}}
                                showSpinButtons={true}
                                format="#,##0"
                                onValueChanged ={onChangedCash}
                            />
                        </div>
                    </div>
                    <div className={'due-box'}>
                        <div className={'due-label mb-2'}><strong>{ data.changeDueType} (Rp.)</strong></div>
                        <div className={'due-value'}>{ formatRupiah(data.changeDue, false) }</div>
                    </div>   
                    <div className={'middle-line'}></div>   
                </div>
            </Row>
            <Row className="mb-4">
                <Col>
                 <div className={'add-payment-label'}>Transfer</div>
                </Col>
                <Col className="">
                    <div className={'add-payment-value'}>
                        <NumberBox
                            id={'eAddPayment'}
                            defaultValue={data.transfer}
                            min={0}
                            showSpinButtons={false}
                            format="Rp #,##0"
                            onValueChanged = { onTrfChanged }
                        />
                    </div>
                </Col>
          
            </Row>
     
            <Row className="mb-2">
            <Col className="d-flex justify-content-end">
        
           
            </Col>
            <Col className="d-flex justify-content-end">
            <div className='container-btn-cancel-payment'>
                <Button
                 id={'btnCancelPayment'}
                 icon={'close'}
                 type={'danger'}
                 text={'Cancel'}
                 onClick={() => { onCancelPayment() } }
                 height={'50'}
                 style={{'borderRadius':'10px', 'marginRight':'5px'}}
                />
            </div>
            <div className='container-btn-process-payment '>
                <Button
                 id={'btnProcessPayment'}
                 icon={'chevrondoubleright'}
                 type={'success'}
                 text={'Process'}
                 onClick={() => {onProcessPayment()}}
                 height={'100%'}
                 style={{'borderRadius':'10px'}}
                />
            </div> 
            </Col>
    
        
            </Row>
   
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(RightAccPaymentInfo, areEqual)