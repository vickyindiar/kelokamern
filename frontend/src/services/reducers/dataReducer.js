import {  
          CHANGE_TAB,
          GET_PRODUCT,
          GET_SUPPLIER,
          GET_CUSTOMER,
          GET_BRAND,
          GET_CATEGORY,
          GET_QTYTYPE,
          GET_COLOR
          } from "../types/dataType";

const initialState = {
    tabActive: -1,
    dataProduct : [],
    dataSupplier: [],
    dataCustomer: [],
    dataBrand: [],
    dataCategory: [],
    dataQtytype: [],
    dataColor: []
 };
  export default function(state = initialState, action) {
    switch (action.type) {
      case CHANGE_TAB:
        return {
          ...state,
          tabActive: action.payload.tabActive,
        }
      case GET_PRODUCT:
        return{
          ...state,
          dataProduct: [...action.payload.dataSource ]
        }
      case GET_SUPPLIER:
        return {
          ...state,
          dataSupplier: [...action.payload.dataSource ],
        }
      case GET_CUSTOMER:
        return {
          ...state,
          dataCustomer: [...action.payload.dataSource ],
        }
      case GET_BRAND:
        return {
          ...state,
          dataBrand: [...action.payload.dataSource ],
        }
      case GET_CATEGORY: 
        return {
          ...state,
          dataCategory: [...action.payload.dataSource ],
        }
      case GET_QTYTYPE:
          return {
            ...state,
            dataQtytype: [...action.payload.dataSource ],
          }
      case GET_COLOR:
        return {
          ...state,
          dataColor: [...action.payload.dataSource ],
        }
      default:
        return state;
    }
  }
  