import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DataGrid, { Column, FormItem, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel, Scrolling, LoadPanel, Editing, Popup, Position, Form, Lookup } from 'devextreme-react/data-grid';
import FileUploader from 'devextreme-react/file-uploader';
import { Item } from 'devextreme-react/form';
import * as gConfig from './ConfigGrids';
import isEmpty from '../../services/helper/isEmpty';
import { getProductSupport } from "../../services/actions/dataAction";

function GridTable({tab, vref}) {
    const [selectionMode, setSelectionMode] = useState('single');
    const [expandMode, setExpandMode] = useState(true);
    const productDS = useSelector(s => s.data.dataProduct);
    const [brandDS, setBrandDS] = useState(null);
    const [categoryDS, setCategoryDS] = useState(null);
    const [qtyDS, setQtyDS]= useState(null);
    const [supplierDS, setSupplierDS] = useState(null);
    const isLoad =  false; // useSelector(s => s.data.isLoading);
    const dispatch = useDispatch();

    const refImageUploader = useRef(null);

    useEffect(() => {
        console.log('render useeffect data');
        getProductSupport().then((res) => {
            if(res){
                setBrandDS(res.brand.data);
                setCategoryDS(res.category.data);
                setQtyDS(res.qtytype.data);
                setSupplierDS(res.supplier.data);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onEditingStart = (e) => {
        e.data.brand = e.data.brand_id;
        e.data.category = e.data.category_id;
        e.data.supplier = e.data.supplier_id;
        e.data.qtytype = e.data.qtytype_id;
    }

    return (
         <DataGrid
                ref={vref}
                id={'gridViewPd'}
                //key={'evdno'}
                dataSource= { productDS }
                //onContentReady={ (e) => gConfig.onContentReady(e, isLoad) }
                columnAutoWidth={true}
                height= {"100%"}
                width= {"100%"}
                noDataText={'No Data !'}
                onToolbarPreparing={ (e) => gConfig.onToolbarPreparing(e, selectionMode, setSelectionMode, expandMode, setExpandMode) }
                showBorders={false}
                showColumnLines= {false}
                showRowLines={true}
                rowAlternationEnabled={true}
                allowColumnResizing={true}
                onSelectionChanged= {  (e) => gConfig.changeStateSelectionChange(e)  }  
                onInitNewRow= {  (e) => gConfig.onInitNewRow(e) }
                
                onRowInserting = {(e) => { gConfig.onRowInserting(e); }}
                onRowInserted = { (e) => {
                    let uploadedImg = refImageUploader.current.instance.option('value')[0];
                     gConfig.onRowInserted(e, 0, uploadedImg)(dispatch) 
                    }
                 }
                
                // onEditingStart = { onEditingStart }
                // onRowUpdated = { (e) => gConfig.onRowUpdated(e,  0)(dispatch) }
                // onRowUpdating = { (e) => { gConfig.onRowUpdating(e, 0, brandDS, categoryDS, supplierDS, qtyDS); }}
             
                onRowRemoving = { (e) => { gConfig.onRowRemoved(e, 0)(dispatch) }}
                 
            > 
            {/* <Editing refreshMode={'reshape'} mode="popup" allowAdding={true} allowUpdating={true} allowDeleting={true} >
                <Popup title="Product" showTitle={true} width={700} height={600}>
                    <Position my="top" at="top" of={window} />
                </Popup>
     
            </Editing> */}

            {/* <Scrolling mode={"virtual"} /> */}
            {/* <LoadPanel enabled={false}  showPane={false} /> */}
            <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} >
                <Form>
                    <Item itemType="group" colCount={2} colSpan={2}>
                        <Item dataField="number"  editorOptions={{ disabled: true  }} />
                        <Item dataField="name" />
                        <Item dataField="brand"  editorType="dxLookup" editorOptions={{  dataSource: brandDS,  valueExpr:'_id', displayExpr:'name', searchEnabled: true, value: '' }} />
                        <Item dataField="category"  editorType="dxLookup" editorOptions={{ dataSource: categoryDS,  valueExpr:'_id', displayExpr:'name', searchEnabled: true, value: '' }} />
                        <Item dataField="bprice" editorType="dxNumberBox" editorOptions={{ format: "Rp #,##0.##" }} />
                        <Item dataField="sprice" editorType="dxNumberBox" editorOptions={{ format: "Rp #,##0.##" }}/>
                        <Item dataField="stock"  editorType="dxNumberBox"/>
                        <Item dataField="qtytype"  editorType="dxLookup" editorOptions={{  dataSource: qtyDS,  valueExpr:'_id', displayExpr:'name', searchEnabled: true, value: '' }} />
                        <Item dataField="color" />
                        <Item dataField="supplier"  editorType="dxLookup" editorOptions={{  dataSource: supplierDS,  valueExpr:'_id', displayExpr:'name', searchEnabled: true, value: '' }} />
                     
                        <Item dataField="desc" />
                        <Item itemType="group" caption="Gambar" colCount={2} colSpan={2}> 
                            <FileUploader ref={refImageUploader} 
                                selectButtonText="Select photo" 
                                labelText="" accept="image/*" 
                                uploadMode="useButtons" 
                                maxFileSize={600000} 
                                allowedFileExtensions={['.jpg', '.jpeg', '.gif', '.png']} 
                            />
                        </Item>
                    </Item>  
                </Form>
            </Editing>
            <GroupPanel visible={true} />
            <Grouping autoExpandAll={expandMode} />
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            <Selection mode={selectionMode} selectAllMode={'allPages'} showCheckBoxesMode={'always'} allowSelectAll={true} />
            <ColumnFixing enabled={true} />          
            {/* { gConfig.generateColumns(tab, configColumn() ) }  */}
            <Column dataField="number" caption="NO." visible={true} allowEditing={false}  cssClass="row-vertical-align" />
            <Column dataField="name" caption="NAMA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="brand" caption="MERK" visible={true}  cssClass="row-vertical-align" >
                <Lookup dataSource={brandDS} valueExpr="_id" displayExpr="name" />
            </Column>
            <Column dataField="sprice" caption="JUAL" dataType="number" format={{type:"fixedPoint", precision:2}} cssClass="row-vertical-align" /> 
            <Column dataField="bprice" caption="BELI" dataType="number" format={{type:"fixedPoint", precision:2}}  cssClass="row-vertical-align" />    
            <Column dataField="stock" caption="STOCK" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="qtytype" caption="SATUAN" visible={true}  cssClass="row-vertical-align" >
                 <Lookup dataSource={qtyDS} valueExpr="_id" displayExpr="name" />
            </Column>
            <Column dataField="category" caption="KATEGORI" visible={true}  cssClass="row-vertical-align" >
                 <Lookup dataSource={categoryDS} valueExpr="_id" displayExpr="name" />
            </Column>
            <Column dataField="color" caption="WARNA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="supplier" caption="PENYEDIA" visible={true} cssClass="row-vertical-align" >
                 <Lookup dataSource={supplierDS} valueExpr="_id" displayExpr="name" />
            </Column>
            {/* <Column dataField="duedate" caption="DUE DATE" visible={true} dataType="date" format="dd/MM/yyyy" width={120} cssClass="row-vertical-align" /> */}
            <Column dataField="image" caption="GAMBAR" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="desc" caption="DESK. " visible={true}  cssClass="row-vertical-align" >
                  <FormItem colSpan={2} editorType="dxTextArea" editorOptions={{'height':'100'}} />
            </Column>
            
    </DataGrid>  
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(GridTable, areEqual)
