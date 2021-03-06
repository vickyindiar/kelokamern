import { CHANGE_TAB, 
  OPEN_MODAL,
  GET_PRODUCT,
  GET_SUPPLIER,
  GET_CUSTOMER,
  GET_BRAND,
  GET_CATEGORY,
  GET_QTYTYPE,
  GET_COLOR,
  TOOGLE_LOADING
} from "../types/dataType";
import { setDataTable } from '../actions/tableAction'
import axios from 'axios';
import config from '../../config';

const productsTable =  {
    url : `${config.apiURL}product`, 
    urlDeleteAll : `${config.apiUrl}productDeleteAll`, 
    columns : [
      { id: "number", dataField: "number", caption: "No.", width: 45, alignment: "center", dataType:"number" },
      { id: "name", dataField: "name", caption: "Nama", alignment: "center",  },
      { id: "brand", dataField: "brand", caption: "Merk", alignment: "center", custom:'lookup'  },
      { id: "bprice", dataField: "bprice", caption: "Beli", alignment: "center",  dataType:"number", format:{type:"fixedPoint", precision:2} },
      { id: "sprice", dataField: "sprice", caption: "Jual", alignment: "center",  dataType:"number", format:{type:"fixedPoint", precision:2} },
      { id: "stock", dataField: "stock", caption: "Stock", alignment: "center",  },
      { id: "qtytype", dataField: "qtytype", caption: "Satuan", alignment: "center",  custom:'lookup' },
      { id: "category", dataField: "category", caption: "Kategori", alignment: "center", custom:'lookup' },
      { id: "color", dataField: "color", caption: "Warna", alignment: "center" },
      { id: "supplier", dataField: "supplier", caption: "Pemasok", alignment: "center", custom:'lookup' },
      { id: "image", dataField: "image", caption: "Gambar", alignment: "center",  },
      { id: "desc", dataField: "desc", caption: "Ket.", alignment: "center",  },
    ]
}

const suppliersTable =  {
  url : `${config.apiURL}supplier`,
  columns : [
    { id: "number", dataField: "number", caption: "No.", width: 45, alignment: "center",  },
    { id: "name", dataField: "name", caption: "Nama", alignment: "center",  },
    { id: "address", dataField: "address", caption: "Alamat", alignment: "center",  },
    { id: "city", dataField: "city", caption: "Kota", alignment: "center",  },
    { id: "province", dataField: "province", caption: "Provinsi", alignment: "center",  },
    { id: "phone", dataField: "phone", caption: "Telp.", alignment: "center",  },
    { id: "phone2", dataField: "phone2", caption: "Telp2", alignment: "center",  },
    { id: "store", dataField: "store", caption: "Toko", alignment: "center",  },
    { id: "photo", dataField: "photo", caption: "Foto", alignment: "center",  },
    { id: "desc", dataField: "desc", caption: "Ket.", alignment: "center",  },
  ]
}

const customersTable =  {
  url : `${config.apiURL}customer`,
  columns : [
    { id: "number", dataField: "number", caption: "No.", width: 45, alignment: "center",  },
    { id: "name", dataField: "name", caption: "Nama", alignment: "center",  },
    { id: "address", dataField: "address", caption: "Alamat", alignment: "center",  },
    { id: "city", dataField: "city", caption: "Kota", alignment: "center",  },
    { id: "province", dataField: "province", caption: "Provinsi", alignment: "center",  },
    { id: "phone", dataField: "phone", caption: "Telp.", alignment: "center",  },
    { id: "phone2", dataField: "phone2", caption: "Telp2", alignment: "center",  },
    { id: "store", dataField: "store", caption: "Toko", alignment: "center",  },
    { id: "photo", dataField: "photo", caption: "Foto", alignment: "center",  },
    { id: "desc", dataField: "desc", caption: "Ket.", alignment: "center",  },
  ]
}

const brandsTable =  {
  url : `${config.apiURL}brand`,
  columns : [
    { id: "number", dataField: "number", caption: "No.", width: 45, alignment: "center",  },
    { id: "name", dataField: "name", caption: "Nama", alignment: "center",  },
    { id: "desc", dataField: "desc", caption: "Ket.", alignment: "center",  },
  ]
}

const categoriesTable =  {
  url : `${config.apiURL}category`,
  columns : [
    { id: "number", dataField: "number", caption: "No.", width: 45, alignment: "center",  },
    { id: "code", dataField: "code", caption: "Kode", alignment: "center",  },
    { id: "name", dataField: "name", caption: "Nama", alignment: "center",  },
    { id: "desc", dataField: "desc", caption: "Ket.", alignment: "center",  },
  ]
}

const qtytypesTable =  {
  url : `${config.apiURL}qtytype`,
  columns : [
    { id: "number", dataField: "number", caption: "No.", width: 45, alignment: "center",  },
    { id: "code", dataField: "code", caption: "Kode", alignment: "center",  },
    { id: "name", dataField: "name", caption: "Nama", alignment: "center",  },
    { id: "desc", dataField: "desc", caption: "Ket.", alignment: "center",  },
  ]
}

const colorTable =  {
  url : `${config.apiURL}color`,
  columns : [
    { id: "number", dataField: "number", caption: "No.", width: 45, alignment: "center",  },
    { id: "name", dataField: "name", caption: "Nama", alignment: "center",  },
    { id: "desc", dataField: "desc", caption: "Ket.", alignment: "center",  },
  ]
}


export const changeTabIndex = tab => dispatch => {
  dispatch({ type: CHANGE_TAB, payload: { tabActive: tab } });
};

export const getColumnsGrid = tab  => {
  let columns = [];
  if(tab === 0) {  columns = [...productsTable.columns];   } 
  else if(tab === 1) { columns = [...suppliersTable.columns]; } 
  else if(tab === 2) { columns = [...customersTable.columns]; }
  else if(tab === 3) { columns = [...brandsTable.columns]; }
  else if(tab === 4) { columns = [...categoriesTable.columns]; }
  else if(tab === 5) { columns = [...qtytypesTable.columns]; }
  else if(tab === 6) { columns = [...colorTable.columns]; }
  else { columns = [...productsTable.columns]; } 
  return columns;
}

const generateNumber = (dataSource) => {
  let number = 1;
  dataSource.forEach(d => { d.number = number++; });  
  return dataSource;
}

const getAction = (index, res, columns) => {
    if(index === 0)      { return { type: GET_PRODUCT, payload: { dataSource: generateNumber(res.data),  columns: columns, isLoading: false  } }; } 
    else if(index === 1) { return { type: GET_SUPPLIER, payload: { dataSource: generateNumber(res.data), columns: columns, isLoading: false  } }; } 
    else if(index === 2) { return { type: GET_CUSTOMER, payload: { dataSource: generateNumber(res.data), columns: columns, isLoading: false  } }; }
    else if(index === 3) { return { type: GET_BRAND, payload: { dataSource: generateNumber(res.data),    columns: columns, isLoading: false  } }; }
    else if(index === 4) { return { type: GET_CATEGORY, payload: { dataSource: generateNumber(res.data), columns: columns, isLoading: false  } }; }
    else if(index === 5) { return { type: GET_QTYTYPE, payload: { dataSource: generateNumber(res.data),  columns: columns, isLoading: false  } }; }
    else if(index === 6) { return { type: GET_COLOR, payload:  { dataSource: generateNumber(res.data),   columns: columns, isLoading: false  } }; }
    else return {}
}


const fileUploadHandler = async(file) =>{
  let token = localStorage.getItem('jwt');
  let formData = new FormData();
  formData.append('image', file);

  try {
    const aConfig = { headers:{ 'Content-Type': 'multipart/form-data', Authorization: token } }
    const {data} = await axios.post(`${config.apiURL}upload`, formData, aConfig);
    return data;
  } catch (error) {
    console.log('error frontend',error);
  }
}

export const getData = (tab) => (dispatch, getState) => {
    let columns = [];
    let url = '';
    let token = localStorage.getItem('jwt');
    let header = {
      headers: {
          'Accept' : 'application/json',
          'Content-Type':  'application/json',
          Authorization: token
        },
     }
     if(tab === 0) {      url = productsTable.url; columns = productsTable.columns;   } 
     else if(tab === 1) { url = suppliersTable.url; columns = suppliersTable.columns; } 
     else if(tab === 2) { url = customersTable.url; columns = customersTable.columns; }
     else if(tab === 3) { url = brandsTable.url; columns = brandsTable.columns; }
     else if(tab === 4) { url = categoriesTable.url; columns = categoriesTable.columns; }
     else if(tab === 5) { url = qtytypesTable.url; columns = qtytypesTable.columns; }
     else if(tab === 6) { url = colorTable.url; columns = colorTable.columns; }
     else { url = productsTable.url; columns = productsTable.columns; }
    
   dispatch({type: TOOGLE_LOADING, payload: true})
   return axios.get(url, header).then(res =>{
        if(res.status === 200){
          dispatch({type: TOOGLE_LOADING, payload: false})
          dispatch(getAction(tab, res, columns));
          return true;
       //   .then(callback(generateNumber(res.data), columns))
        }else{
          console.log('error get data !');
          return false;
        }
    })
    .catch(err => {
      console.log('error get data !');
    });
}

export const getProductSupport = async ()  => {
  let token = localStorage.getItem('jwt');
  let header = {
    headers: {
        'Accept' : 'application/json',
        'Content-Type':  'application/json',
      //  'Content-Type':  'application/vnd.api+json',
        Authorization: token
      },
   }

    try {
      const brand =  await axios.get(`${config.apiURL}brand`, header);
      const category = await axios.get(`${config.apiURL}category`, header);
      const qtytype = await axios.get(`${config.apiURL}qtytpe`, header);
      const supplier = await axios.get(`${config.apiURL}supplier`, header);

      if(brand && category && qtytype && supplier)
        return {brand, category, qtytype, supplier}
      else
        return false;
    } catch (error) {
      console.log('error get data !');
    }
}

export const storeData = (tab, data) => async dispatch => {
  let url = '';
  let token = localStorage.getItem('jwt');
  let axiosConfig = { headers: { Authorization: token } };

  if(tab === 0) {      url = productsTable.url;  } 
  else if(tab === 1) { url = suppliersTable.url; } 
  else if(tab === 2) { url = customersTable.url; }
  else if(tab === 3) { url = brandsTable.url;    }
  else if(tab === 4) { url = categoriesTable.url;}
  else if(tab === 5) { url = qtytypesTable.url;  }
  else if(tab === 6) { url = colorTable.url;     }
  else {               url = productsTable.url;  }
  const img = await fileUploadHandler(data.image);
  if(img){
    data.image = img;
    axios.post(url, data, axiosConfig).then(res => {
      if(res.status === 201){
        console.log(res);
        dispatch(getData(tab));
      }else{
        console.log('error store data !');
      }
    })
    .catch(err => {
      console.log('error store data !');
    })
  }
}

export const updateData = (tab, data) => dispatch => {
    let url = '';
    let token = localStorage.getItem('jwt');
    let axiosConfig = {
      headers: {
          'Accept' : 'application/json',
          'Content-Type':  'application/vnd.api+json',
          Authorization: token
        },
     }
     if(tab === 0) {      url = productsTable.url;  } 
     else if(tab === 1) { url = suppliersTable.url; } 
     else if(tab === 2) { url = customersTable.url; }
     else if(tab === 3) { url = brandsTable.url;    }
     else if(tab === 4) { url = categoriesTable.url;}
     else if(tab === 5) { url = qtytypesTable.url;  }
     else if(tab === 6) { url = colorTable.url;     }
     else {               url = productsTable.url;  }
     return axios.put(`${url}/${data.id}`, data, axiosConfig).then(res =>{
      if(res.status === 201){
        return res.data;
     //   .then(callback(generateNumber(res.data), columns))
      }else{
        console.log('error get data !');
        return false;
      }
    })
    .catch(err => {
      console.log('error get data !');
    });

}

export const deleteData = (id, tab) => dispatch => {
  let url = '';
  let token = localStorage.getItem('jwt');
  let axiosConfig = {
    headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
   }
   if(tab === 0) {      url = productsTable.url;  } 
   else if(tab === 1) { url = suppliersTable.url; } 
   else if(tab === 2) { url = customersTable.url; }
   else if(tab === 3) { url = brandsTable.url;    }
   else if(tab === 4) { url = categoriesTable.url;}
   else if(tab === 5) { url = qtytypesTable.url;  }
   else if(tab === 6) { url = colorTable.url;     }
   else {               url = productsTable.url;  }
 //  dispatch({type: TOOGLE_LOADING, payload: true})
   const deleteOne = () => {
    axios.delete(url+'/'+id[0], axiosConfig).then(res => {
      if(res.status === 200){
        console.log(res);
      }else{
        console.log('error delete data !');
      }
    })
    .catch(err => {
      console.log('error delete data !');
    })
   }

   const deleteAll = () => {
     debugger;
    let cUrl = `${url}?deleteMany=1`;
    let body = { data: { '_id': id } }
    axiosConfig.data = body;
    axios.delete(cUrl, axiosConfig).then(res => {
      if(res.status === 200){
        dispatch(getData(tab));
      }else{
        console.log('error delete data !');
      }
    })
    .catch(err => {
      console.log('error delete data !');
    })
   }
   debugger;
   if(id.length === 1) deleteOne()
   else if(id.length > 1) deleteAll();
}


export const handleOpenModal = (v) => dispatch => {
  return dispatch({ type: OPEN_MODAL, payload: v})
}


  
  