import { UPDATE_ITEMS, UPDATE_SALES_INFO, UPDATE_PAYMENT_INFO, UPDATE_SALES_NOTE } from '../types/salesType';

const initialState = {
    dataItems: [
        { number: 1, code:'LTCDO', name:'lutut', stock:5, qty:1, qtytype:'6029f897c92f86247017e7e2', price:1000, disc:100, subTotal:900 },
        { number: 2, code:'lcdm', name:'mata kaki', stock:12, qty:1, qtytype:'6029f897c92f86247017e7e2', price:5000, disc:0, subTotal:5000 },
    ],
    dataInfo: [
        {id: 1, title:'Sales Info', invno: 'inv02021', invdt:'02/02/2021', admin:'122334', customer:'6029f897c92f86247017e7e6'},
        {id: 2, title:'Payment Info', subTotal:10000, disc:1000, addCharge:500, addDisc: 500, grandTotal:9000, cash:5000, changeDue:4000, changeDueType:'due', transfer:4000}
    ],
    noteSales: ''
}

export default function(state = initialState, action) {
    switch (action.type) {
      case UPDATE_ITEMS:
        return {
            ...state,
            dataItems: [...action.payload.dataItems ]
          }
      case UPDATE_SALES_INFO:
        debugger;
        for(const prop in action.payload.dataSales)
          state.dataInfo[0][prop] = action.payload.dataSales[prop];
        return{
          ...state
        }
      case UPDATE_PAYMENT_INFO:
        for(const prop in action.payload.dataPayment)
        state.dataInfo[1][prop] = action.payload.dataPayment[prop];
        return{
          ...state
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