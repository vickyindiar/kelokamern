import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DataGrid, { Column, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel,Editing, Form } from 'devextreme-react/data-grid';
import FileUploader from 'devextreme-react/file-uploader';
import { Item } from 'devextreme-react/form';
import * as gConfig from './ConfigGrids';


function GridCustomer({tab, vref}) {
    const [selectionMode, setSelectionMode] = useState('multiple');
    const [expandMode, setExpandMode] = useState(true);
    const customerDS = useSelector(s => s.data.dataCustomer);
    const isLoad = false;
    const refImageUploader = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('render useeffect data')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
         <DataGrid
                ref={vref}
                id={'gridViewCus'}
               // key={'evdno'}
                dataSource= { customerDS }
                onContentReady={ (e) => gConfig.onContentReady(e, isLoad) }
                columnAutoWidth={true}
                height= {"100%"}
                width= {"100%"}
                //noDataText={isLoad ? '' : 'No Data !'}
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
                onSelectionChanged= { (e) => gConfig.changeStateSelectionChange(e)  }  
                onInitNewRow={ (e) => { gConfig.onInitNewRow(e); }}
                onRowInserted = { (e) => {
                    let uploadedImg = refImageUploader.current.instance.option('value')[0];
                     gConfig.onRowInserted(e, gConfig.CUSTOMER_TAB_INDEX, uploadedImg)(dispatch) 
                    }
                 }
                onRowUpdated = { (e) => { 
                    let uploadedImg = refImageUploader.current.instance.option('value')[0];
                    gConfig.onRowUpdated(e, gConfig.CUSTOMER_TAB_INDEX, uploadedImg)(dispatch) }
                }
                onRowRemoving = { (e) => { gConfig.onRowRemoved(e, gConfig.CUSTOMER_TAB_INDEX, true)(dispatch) }}
            > 
            <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} texts={{saveRowChanges:'Simpan', cancelRowChanges:'Batal' }} >
                <Form>
                    <Item itemType="group" colCount={5} colSpan={2}>
                        <Item dataField="number"  editorOptions={{ disabled: true  }} />
                        <Item dataField="name" />
                        <Item dataField="address" />
                        <Item dataField="city" />
                        <Item dataField="province" />
                        <Item dataField="phone" />
                        <Item dataField="phone2" />
                        <Item dataField="store" />
                        <Item dataField="desc" editorType="dxTextArea" colSpan={2} editorOptions={{ height: 100 }} />
                        <Item itemType="group" caption="Gambar" colCount={1}> 
                            <FileUploader ref={refImageUploader} 
                                selectButtonText="Pilih Gambar" 
                                labelText="" accept="image/*" 
                                uploadMode="useButtons" 
                                maxFileSize={600000} 
                                allowedFileExtensions={['.jpg', '.jpeg', '.gif', '.png']} 
                            />
                        </Item>
                    </Item>  
                </Form>
            </Editing>
            <GroupPanel visible={true} emptyPanelText={'Tarik kolom disini untuk menggabungkan Baris '} em />
            <Grouping autoExpandAll={expandMode} />
            <SearchPanel visible={true} highlightCaseSensitive={true} placeholder='  Cari disini..  '/>
            <Selection mode={selectionMode} selectAllMode={'allPages'} showCheckBoxesMode={'always'} allowSelectAll={true} />
            <ColumnFixing enabled={true} />     
            <Column dataField="number" caption="NO." visible={true}  cssClass="row-vertical-align" />
            <Column dataField="name" caption="NAMA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="address" caption="ALAMAT" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="city" caption="KOTA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="province" caption="PROVINSI" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="phone" caption="TLP" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="phone2" caption="TLP2" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="store" caption="TOKO" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="desc" caption="DESK" visible={true}  cssClass="row-vertical-align" />
            
    </DataGrid>  
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(GridCustomer, areEqual)
