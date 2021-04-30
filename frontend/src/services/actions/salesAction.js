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

export const updateSalesNote = (newSelesNote) => dispatch => {
    dispatch({type:UPDATE_SALES_NOTE, payload: newSelesNote});
}


//======== SALES INFO ============/

const generateInvoiceNumber = (customer) => {
    let rNumber = Math.floor(100000 + Math.random() * 90000); 
    let now = new Date();
    let result = 'INV-'+ rNumber.toString() + customer.substr(0, 4) + now.toString();  
    return result;
}

export const updateAllSalesInfo = (dsItems, dsSalesInfo) => dispatch => {
    // {id: 1, title:'Sales Info', invno: '', invdt:new Date(), admin:'', customer:''},
    if(dsItems.length > 0){
        const newDsSales = {
            id: 1,
            title: 'Sales Info',
            invno: generateInvoiceNumber(dsSalesInfo.customer),
            invdt: new Date(),
            admin: dsSalesInfo.admin,
            customer: dsSalesInfo.customer
        }
        dispatch({type:UPDATE_SALES_INFO, payload: { dataSales : newDsPayment }});
    }
}

export const updateSalesInfo = (newCustomer, dsSalesInfo) => dispatch => {
    let newDsSales = {...dsSalesInfo};
    newDsSales.customer = newCustomer;
    newDsSales.invno = generateInvoiceNumber(dsSalesInfo.customer)
    dispatch({type: UPDATE_SALES_INFO, payload:{ dataSales: newDsSales }});
}
//===============================


//======== PAYMENT INFO ===========/
export const updateAllPaymentInfo = (dsItems, dsPayment) => dispatch => {
    if(dsItems.length > 0){
        const newDsPayment = dsItems.reduce((a, b) => {
                return {
                    id: 2,
                    title:'Payment Info', 
                    subTotal: a.price + b.price, 
                    disc:a.disc+ b.disc, 
                    addCharge:0,
                    addDisc: 0,
                    grandTotal:a.subTotal+b.subTotal,
                    cash:0,
                    changeDue:0,
                    changeDueType:'change',
                    transfer:0}
        });
        dispatch({type:UPDATE_PAYMENT_INFO, payload: { dataPayment : newDsPayment}});
    }
}

export const updateAddCharge = (newAddCharge, dsItems, dsPayment) => async dispatch => {
    let newDsPayment = {...dsPayment};
    newDsPayment.addCharge = newAddCharge;
    await dispatch({type:UPDATE_PAYMENT_INFO, payload: { dataPayment : newDsPayment}});
    await dispatch(updatePaymentInfo(dsItems, dsPayment));
    return true;
}

export const updateAddDisc = (newAddDisc, dsItems, dsPayment) => async dispatch => {
    let newDsPayment = {...dsPayment};
    newDsPayment.addDisc = newAddDisc;
    await dispatch({type:UPDATE_PAYMENT_INFO, payload: { dataPayment : newDsPayment}});
    await dispatch(updatePaymentInfo(dsItems, dsPayment));
    return true;
}

const updatePaymentInfo = (dsItems, dsPayment) => dispatch => {
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

//================================







