import { UPDATE_ITEMS, UPDATE_SALES_INFO, UPDATE_PAYMENT_INFO, UPDATE_SALES_NOTE, UPDATE_TEST } from '../types/salesType';

const initialState = {
    dataItems: [
        // { number: 1, code:'LTCDO', name:'lutut', stock:5, qty:1, qtytype:'6029f897c92f86247017e7e2', price:1000, disc:100, subTotal:900 },
    ],
    dataInfo: [
        {id: 1, title:'Sales Info', invno: 'inv02021', invdt:new Date(), admin:'', customer:''},
        {id: 2, title:'Payment Info', subTotal:0, disc:0, addCharge:0, addDisc: 0, grandTotal:0, cash:0, changeDue:0, changeDueType:'change', transfer:0}
    ],
    noteSales: '',
}

export default function(state = initialState, action) {
  const newData = [];
    switch (action.type) {
      case UPDATE_ITEMS:
        return {
            ...state,
            dataItems: [...action.payload.dataItems ]
          }
      case UPDATE_SALES_INFO:
        newData.push(action.payload.dataPayment);
        newData.push(state.dataInfo[1]);
        return{
          ...state,
          dataInfo: [...newData]
        }
      case UPDATE_PAYMENT_INFO:
        newData.push(state.dataInfo[0]);
        newData.push(action.payload.dataPayment);
        return{
          ...state,
          dataInfo: [...newData]
        }
      case UPDATE_SALES_NOTE:
        return{
          ...state,
          noteSales: action.payload
        }
      default:
        return state;
    }
  }