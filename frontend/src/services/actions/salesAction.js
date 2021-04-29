import axios from 'axios';
import {UPDATE_ITEMS, UPDATE_SALES_INFO, UPDATE_PAYMENT_INFO, UPDATE_SALES_NOTE} from '../types/salesType';

export const addItems = (product, dsItems) => dispatch => {
    let number = dsItems.length + 1;
    let newDsItems = [...dsItems];
    const item = {
        number,
        code: product.code,
        name: product.name,
        stock:product.stock,
        qty: 1,
        qtytype: product.qtytype, 
        price:product.sprice, 
        disc:0,
        subTotal:product.sprice
    }
    let codeIndex = newDsItems.findIndex(e => e.code === product.code);

    if (codeIndex === -1) newDsItems.push(item)
    else newDsItems[codeIndex].qty = newDsItems[codeIndex].qty + 1; 

    dispatch({ type: UPDATE_ITEMS, payload: { dataItems : newDsItems}});
} 

export const updateItemsQty = (newQty, code, dsItems) => dispatch => {
    let newDsItems = [...dsItems];
    let codeIndex = dsItems.findIndex(e => e.code === code);

    newDsItems[codeIndex].qty = newQty;
    newDsItems[codeIndex].total = Number((newDsItems[codeIndex].qty * newDsItems[codeIndex].price) - newDsItems[codeIndex].disc);

    dispatch({ type: UPDATE_ITEMS, payload: { dataItems : newDsItems}});
}

export const updateItemsDisc = (newDisc, code, dsItems) => dispatch => {
    let newDsItems = [...dsItems];
    let codeIndex = dsItems.findIndex(e => e.code === code);

    newDsItems[codeIndex].disc = newDisc;
    newDsItems[codeIndex].total = Number((newDsItems[codeIndex].qty * newDsItems[codeIndex].price) - newDisc);

    dispatch({ type: UPDATE_ITEMS, payload: { dataItems : newDsItems}});
}

export const updateSalesInfo = (newCustomer, dsSalesInfo) => dispatch => {
    let newDsSales = {...dsSalesInfo};
    newDsSales.customer = newCustomer;
    dispatch({type: UPDATE_SALES_INFO, payload:{dataSales: newDsSales}});
}

export const updateAddCharge = (newAddCharge, dsItems, dsPayment) => async dispatch => {
    let newDsPayment = {...dsPayment};
    newDsPayment.addCharge = newAddCharge;
    await dispatch({type:UPDATE_PAYMENT_INFO, payload: { dataPayment : newDsPayment}});
    await dispatch(updatePaymentInfo(dsItems, dsPayment));
    return true;
}

export const updateAddDisc = (newAddDisc, dsItems, dsPayment) => dispatch => {
    let newDsPayment = {...dsPayment};
    newDsPayment.addDisc = newAddDisc;
    dispatch({type:UPDATE_PAYMENT_INFO, payload: { dataPayment : newDsPayment}});
    dispatch(updatePaymentInfo(dsItems, dsPayment));
}

const updatePaymentInfo = (dsItems, dsPayment) => dispatch => {
    debugger;
    let newDsPayment = {...dsPayment};
    let subTotal = 0, disc = 0, grandTotal = 0;
    dsItems.forEach(e => {
       subTotal += (e.price * e.qty);
       disc += e.disc;
    });

    grandTotal = subTotal - disc - dsPayment.addDisc + dsPayment.addCharge;
    newDsPayment.subTotal = subTotal;
    newDsPayment.disc = disc;
    newDsPayment.grandTotal = grandTotal;
    dispatch({type:UPDATE_PAYMENT_INFO, payload: {dataPayment: newDsPayment } });
    console.log('update payment');
}

export const changeCashValue = (newCashValue, dsItems, dsPayment) => dispatch => {
    let newDsPayment = {...dsPayment};
    if(newCashValue < dsPayment.grandTotal){
        newDsPayment.cash = newCashValue;
        newDsPayment.changeDueType = 'Due';
        newDsPayment.changeDue = dsPayment.grandTotal - newCashValue;
    }
    else if(newCashValue >= dsPayment.grandTotal){
        newDsPayment.cash = newCashValue;
        newDsPayment.changeDueType = 'Change';
        newDsPayment.changeDue = dsPayment.grandTotal - newCashValue;  
        if(newDsPayment.hasOwnProperty('transfer')) newDsPayment.tranfer = 0;
    }
    dispatch({type:UPDATE_PAYMENT_INFO, payload: {dataPayment: newDsPayment } });
}


export const updateSalesNote = (newSelesNote) => dispatch => {
    dispatch({type:UPDATE_SALES_NOTE, payload: newSelesNote});
}
