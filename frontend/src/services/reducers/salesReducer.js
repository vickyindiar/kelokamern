import { UPDATE_ITEMS } from '../types/salesType';

const initialState = {
    dataItems: [
        { number: 1, code:'LTCDO', name:'lutut', stock:5, qty:1, price:1000, disc:10 },
        { number: 2, code:'lcdm', name:'mata kaki', stock:12, qty:1, price:5000, disc:0 },
    ],
    dataInfo: [
        {id: 1, title:'sales info', invno: 'inv02021', invdt:'02/02/2021', admin:'122334', customer:'23534322'},
        {id:2, title:'payment info', subtotal:10000, disc:1000, addcharge:500, grandtotal:9500}
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