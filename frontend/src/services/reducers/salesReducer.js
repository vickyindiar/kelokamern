import { UPDATE_ITEMS } from '../types/salesType';

const initialState = {
    dataItems: [
        { number: 1, code:'LTCDO', name:'lutut', stock:5, qty:1, qtytype:'6029f897c92f86247017e7e2', price:1000, disc:100, subtotal:900 },
        { number: 2, code:'lcdm', name:'mata kaki', stock:12, qty:1, qtytype:'6029f897c92f86247017e7e2', price:5000, disc:0, subtotal:5000 },
    ],
    dataInfo: [
        {id: 1, title:'Sales Info', invno: 'inv02021', invdt:'02/02/2021', admin:'122334', customer:'6029f897c92f86247017e7e6'},
        {id: 2, title:'Payment Info', subtotal:10000, disc:1000, addcharge:500, adddisc: 500, grandtotal:9000, cash:5000, changedue:4000, changeduetype:'due', transfer:4000}
    ]
}

export default function(state = initialState, action) {
    switch (action.type) {
      case UPDATE_ITEMS:
        return {
            ...state,
            dataItems: [...action.payload.dataItems ]
          }
      default:
        return state;
    }
  }