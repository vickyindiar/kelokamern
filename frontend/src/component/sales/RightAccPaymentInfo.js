import React, {useState} from 'react';
import { Row, Col} from 'react-bootstrap';
import {Button, NumberBox} from 'devextreme-react';

function RightAccPaymentInfo({data}) {
    const [addcharge, setAddCharge] = useState(0); 
    const [addDisc, setAddDisc] = useState(0); 
    
    const calculateTotal = () => {
        return(
            <div>{Number(data.subtotal - data.disc + addcharge - addDisc) }</div>
        )
    }

    const CalculateDueChange = () => {
        return(
            <div>{Number(data.grantotal - data.cash + addcharge - addDisc) }</div>
        )
    }

    const onAddPayment = () =>{

    }

    const onCancelPayment = () => {

    }

    const onProcessPayment = () => {
    }
    return (
        <>
            <Row> <Col>SubTotal</Col> <Col>{data.subtotal}</Col> </Row>  
            <div className={'line-h-paymeny-info'}></div>
           <Row> <Col>Discount</Col> <Col>{data.disc}</Col> </Row> 
            <div className={'line-h-paymeny-info'}></div> 
             <Row> <Col>Additional Charge</Col> <Col>{data.addcharge}</Col> </Row>  
            <div className={'line-h-paymeny-info'}></div>
            <Row> <Col>Additional Discount</Col> <Col>{data.adddisc}</Col> </Row>  
            <div className={'line-h-paymeny-info'}></div>
            <Row> <Col>Total</Col> <Col>{data.grandtotal}</Col></Row> 
            <Row>
                <div className={'cash-due-box'}>
                    <div className={'cash-box'}>
                        <div className={'cash-label'}>Cash</div>
                        <div className={'cash-value'}>    
                            <NumberBox
                                id={'eCashValue'}
                                defaultValue={data.cash}
                                min={0}
                                height={'100px'}
                                style={{'font-size':'5rem'}}
                                showSpinButtons={true}
                            />
                        </div>
                    </div>
                    <div className={'due-box'}>
                        <div className={'due-label'}>Due</div>
                        <div className={'due-value'}>{ data.changedue }</div>
                    </div>   
                    <div className={'middle-line'}></div>   
                </div>
            </Row>
            <Row>
                <div className={'add-payment-label'}>Transfer</div>
                <div className={'add-payment-value'}>
                    <NumberBox
                        id={'eAddPayment'}
                        defaultValue={data.transfer}
                        min={10}
                        max={20}
                        showSpinButtons={true}
                    />
                </div>
            </Row>
            <Row>
            <div className={'btn-add-payment'}> 
                <Button
                    id={'btnAddPayment'}
                    icon={'plus'}
                    type={'default'}
                    hint={'Add Payment method'}
                    onClick={() => {onAddPayment()}}
                />
            </div>
            </Row>
            <Row>
            <div className='container-btn-cancel-payment'>
                <Button
                 id={'btnCancelPayment'}
                 icon={'close'}
                 type={'danger'}
                 onClick={() => { onCancelPayment() } }
                />
            </div>
            <div className='container-btn-process-payment'>
                <Button
                 id={'btnProcessPayment'}
                 icon={'chevrondoubleright'}
                 type={'success'}
                 onClick={() => {onProcessPayment()}}
                 
                />
            </div> 
            </Row>
   
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(RightAccPaymentInfo, areEqual)