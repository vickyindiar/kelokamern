import { CHANGE_TAB, 
  GET_PRODUCT,
  GET_SUPPLIER,
  GET_CUSTOMER,
  GET_BRAND,
  GET_CATEGORY,
  GET_QTYTYPE,
  GET_COLOR
} from "../types/dataType";
import axios from 'axios';
import config from '../../config';
import * as configGrid from '../../component/data/ConfigGrids';

let CUrl = '';

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

const generateNumber = (dataSource) => {
  let number = 1;
  dataSource.forEach(d => { d.number = number++; });  
  return dataSource;
}

const getAction = (index, res) => {
  if(     index === configGrid.PRODUCT_TAB_INDEX)      { return { type: GET_PRODUCT, payload: { dataSource: generateNumber(res.data) } }; } 
  else if(index === configGrid.SUPPLIER_TAB_INDEX) { return { type: GET_SUPPLIER, payload: { dataSource: generateNumber(res.data)  } }; } 
  else if(index === configGrid.CUSTOMER_TAB_INDEX) { return { type: GET_CUSTOMER, payload: { dataSource: generateNumber(res.data)  } }; }
  else if(index === configGrid.BRAND_TAB_INDEX) { return { type: GET_BRAND, payload: { dataSource: generateNumber(res.data)   } }; }
  else if(index === configGrid.CATEGORY_TAB_INDEX) { return { type: GET_CATEGORY, payload: { dataSource: generateNumber(res.data)  } }; }
  else if(index === configGrid.QTYTYPE_TAB_INDEX) { return { type: GET_QTYTYPE, payload: { dataSource: generateNumber(res.data)  } }; }
  else if(index === configGrid.COLOR_TAB_INDEX) { return { type: GET_COLOR, payload:  { dataSource: generateNumber(res.data)  } }; }
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

const getUrl = (tab) =>{
       if(tab === configGrid.PRODUCT_TAB_INDEX) CUrl = productsTable.url
  else if(tab === configGrid.SUPPLIER_TAB_INDEX) CUrl = suppliersTable.url; 
  else if(tab === configGrid.CUSTOMER_TAB_INDEX) CUrl = customersTable.url;  
  else if(tab === configGrid.BRAND_TAB_INDEX) CUrl = brandsTable.url;     
  else if(tab === configGrid.CATEGORY_TAB_INDEX) CUrl = categoriesTable.url; 
  else if(tab === configGrid.QTYTYPE_TAB_INDEX) CUrl = qtytypesTable.url;   
  else if(tab === configGrid.COLOR_TAB_INDEX) CUrl = colorTable.url;    
  else CUrl = productsTable.url;
}


export const getData = (tab) => async (dispatch, getState) => {
    let token = localStorage.getItem('jwt');
    let header = {
      headers: {
          'Accept' : 'application/json',
          'Content-Type':  'application/json',
          Authorization: token
        },
     }
    getUrl(tab);
    const res = await axios.get(CUrl, header);
    if(res.status === 200){
     await dispatch(getAction(tab, res));
      return true;
    }else{
      console.log('error get data !');
      return false;
    }
}

export const getProductSupport = async ()  => {
  let token = localStorage.getItem('jwt');
  let header = {
    headers: {
        'Accept' : 'application/json',
        'Content-Type':  'application/json',
        Authorization: token
      },
   }

    try {
      const brand =  await axios.get(`${config.apiURL}brand`, header);
      const category = await axios.get(`${config.apiURL}category`, header);
      const qtytype = await axios.get(`${config.apiURL}qtytype`, header);
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
  let img = null;
  let token = localStorage.getItem('jwt');
  let axiosConfig = { headers: { Authorization: token } };
  getUrl(tab);
  if(data.hasOwnProperty('image')){
    img = await fileUploadHandler(data.image);
    if(img){ data.image = img; }
  }
    const res = await axios.post(CUrl, data, axiosConfig);
    if(res.status === 201){
     await dispatch(getData(tab));
      return true;
    }else{
      console.log('error store data !');
      return false;
    }
}

export const updateData = (tab, data, image) => async dispatch => {
    let token = localStorage.getItem('jwt');
    let imgUploaded  = null;
    let axiosConfig = {
      headers: {
          'Accept' : 'application/json',
          'Content-Type':  'application/json',
          Authorization: token
        },
     }
     getUrl(tab);
     if(image){  
       imgUploaded = await fileUploadHandler(image); 
       data.image = imgUploaded;
      } 
     
     if(!image || (image && imgUploaded)){
        const res = await axios.put(`${CUrl}/${data._id}`, data, axiosConfig)
        if(res.status === 200){
          await dispatch(getData(tab));
          return res.data;
        }else{
          console.log('error get data !');
          return false;
        }
     }
}

export const deleteData = (data, tab) => async dispatch => {
  let token = localStorage.getItem('jwt');
  let axiosConfig = {
    headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
   }
   const deleteOne = async(tab) => {
     let body = { data: { '_id': data.ids, '_img': data.imgs } }
     axiosConfig.data = body;
     const res = await axios.delete(CUrl+'/'+data.ids[0], axiosConfig)
        if(res.status === 200){
        await dispatch(getData(tab));
          return true
        }else{
          console.log('error delete data !');
          return false;
        }
   }

   const deleteAll = async(tab) => {
    let reUrl = `${CUrl}?deleteMany=1`;
    let body = { data: { '_id': data.ids, '_img': data.imgs } }
    axiosConfig.data = body;
    const res = await axios.delete(reUrl, axiosConfig)
      if(res.status === 200){
      await dispatch(getData(tab));
       return true;
      }else{
        console.log('error delete data !');
        return false;
      }
   }
   getUrl(tab);
   if(data.ids.length === 1) deleteOne(tab)
   else if(data.ids.length > 1) deleteAll(tab);
}

  
  