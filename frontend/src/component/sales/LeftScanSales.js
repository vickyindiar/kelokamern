import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card} from 'react-bootstrap';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import DropDownBox from 'devextreme-react/drop-down-box';
import DataGrid, { Column, FormItem, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel, Scrolling, Paging, Lookup } from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import { getData, getProductSupport } from '../../services/actions/dataAction';
import { PRODUCT_TAB_INDEX } from '../data/ConfigGrids';
import { Autocomplete, DropDownOptions } from 'devextreme-react/autocomplete';

function LeftScanSales() {
    const productDS = useSelector(s => s.data.dataProduct);
    const [brandDS, setBrandDS] = useState(null);
    const [categoryDS, setCategoryDS] = useState(null);
    const [qtyDS, setQtyDS]= useState(null);
    const [gridBoxValue, setGridBoxValue] = useState('');
    const [isGridOpened, setIsGridOpened] = useState(false);
    debugger;

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getData(PRODUCT_TAB_INDEX)); 
        getProductSupport().then((res) => {
            if(res){
                setBrandDS(res.brand.data);
                setCategoryDS(res.category.data);
                setQtyDS(res.qtytype.data);
            }
        })
        
    }, []);

    const gridSelectionChange = (e) => {
        debugger; 
        setGridBoxValue(e.selectedRowKeys);
            setIsGridOpened(false)
    }

    const gridDisplayExpr = (d) => {
        debugger;
        if (d) { return d.name; }
        else{return '';}
        
    }

    const onGridBoxOpened = (e) => {
        if(e.name === 'opened') {
            debugger;
            setIsGridOpened(e.value);
        }
    }

    const syncDataGridSelection = (e) => {
        debugger;
          setGridBoxValue(e.value)
      }



    const dataGridRender = (e) => {
        return (
          <DataGrid
            dataSource={productDS}
            hoverStateEnabled={true}
        //    selectedRowKeys={gridBoxValue}
         //   onSelectionChanged={gridSelectionChange}
            height="100%">
            <Selection mode="single" />
            <Scrolling mode="virtual" />
            <Paging enabled={true} pageSize={10} />
            <Column dataField="number" caption="NO." visible={true} allowEditing={false}  cssClass="row-vertical-align" />
            <Column dataField="name" caption="NAMA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="brand" caption="MERK" visible={true}  cssClass="row-vertical-align" >
                <Lookup dataSource={brandDS} valueExpr="_id" displayExpr="name" />
            </Column>
            <Column dataField="sprice" caption="JUAL" dataType="number" format={{type:"fixedPoint", precision:2}} cssClass="row-vertical-align" /> 
            <Column dataField="stock" caption="STOCK" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="qtytype" caption="SATUAN" visible={true}  cssClass="row-vertical-align" >
                 <Lookup dataSource={qtyDS} valueExpr="_id" displayExpr="name" />
            </Column>
            <Column dataField="category" caption="KATEGORI" visible={true}  cssClass="row-vertical-align" >
                 <Lookup dataSource={categoryDS} valueExpr="_id" displayExpr="name" />
            </Column>
            <Column dataField="color" caption="WARNA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="image" caption="GAMBAR" visible={true}  cssClass="row-vertical-align" />
          </DataGrid>
        );
      }

      const itemRender = (data) =>{
          return (
              <div className={'custom-item-scan'}>
                  <div className={'name'}> {data.name} </div>
                  <div className={'stock'}> {data.stock} </div>
                  <div className={'image'}> {data.image}</div>
               </div>   
          )
      }

    return (
        <>
            <Card className={'mt-2 p-4 scan-sales-card'}>
                <SelectBox
                     value={gridBoxValue}
                    // opened={false}
                     valueExpr="_id"
                     deferRendering={false}
                     displayExpr="name"
                     placeholder="Select a value..."
                     showClearButton={true}
                     dataSource={productDS}
                     searchEnabled={true}
                     searchMode={'contains'}
                     searchExpr={['_id', 'name']}
                     searchTimeout={200}
                     minSearchLength={0}
                     showDataBeforeSearch={true} 
                     itemRender={itemRender}                  
                     onValueChanged={(e) => { syncDataGridSelection(e) } }
                 //   onOptionChanged={(e) => { onGridBoxOpened(e) }}
            //todo
                >
                </SelectBox>
            </Card> 
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(LeftScanSales, areEqual)
