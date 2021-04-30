import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';   
import {Row, Col, Card} from 'react-bootstrap';
import DataGrid, {Column, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel, Scrolling, LoadPanel, Editing, Form } from 'devextreme-react/data-grid';
import LeftItemCellCustom from './LeftItemCellCustom';
import {getData} from '../../services/actions/dataAction';
import {QTYTYPE_TAB_INDEX}  from '../data/ConfigGrids';

function LeftItemSales() {

    const itemSource = useSelector(s => s.sales.dataItems);
    const qtyDS = useSelector(s => s.data.dataQtytype);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData(QTYTYPE_TAB_INDEX))    
    
    }, [])

    const customCellQty = (e) => {
        if(qtyDS){
            let filtered = qtyDS.filter(v => v._id === e.data.qtytype );
            if(filtered.length === 0) {return e.data.qty}
            return(
                <div>
                    <div> {e.data.qty} </div>
                   <div> {filtered[0].name} </div>
                </div>
            )
        }
        else{
            return e.data.qty
        }
    }
    
    return (
        <>
          <Card className={'mt-2 p-4 item-sales-card'}>
            <DataGrid
                 //   ref={vref}
                    id={'gridItemSales'}
                    dataSource= { itemSource }
                    columnAutoWidth={true}
                    height= {"100%"}
                    width= {"100%"}
                    noDataText={'No Data !'}
                    showBorders={false}
                    showColumnLines= {false}
                    showRowLines={true}
                    rowAlternationEnabled={false}
                    allowColumnResizing={true}
                    onCellPrepared = { (e) => {  if(e.rowType === 'header' || e.rowType === 'data'){ e.cellElement.style.textAlign = 'center' } } }
                    // onSelectionChanged= { (e) =>{} }  
                    // onInitNewRow={ (e) => {  }}
                    // onRowInserted = { (e) =>{}}
                     onRowUpdated = { (e) => {  } }
                     onRowRemoving = { (e) => {  }}
                > 
                <Editing mode="cell" 
                    allowUpdating={true} 
                    allowAdding={false} 
                    allowDeleting={true} 
                    texts={{saveRowChanges:'Simpan', cancelRowChanges:'Batal' }}
                />

                <GroupPanel visible={false} emptyPanelText={'Tarik kolom disini untuk menggabungkan Baris '} em />
                {/* <Grouping autoExpandAll={expandMode} /> */}
                <SearchPanel visible={false} highlightCaseSensitive={true} placeholder='  Cari disini..  '/>
                <Selection mode={'single'} selectAllMode={'allPages'} showCheckBoxesMode={'always'} allowSelectAll={true} />
                <ColumnFixing enabled={true} />  
                <Column dataField="number" caption="No." width={50} visible={true}  cssClass="row-vertical-align" allowEditing={false}/>
                <Column dataField="name" caption="Items" visible={true}  cssClass="row-vertical-align" allowEditing={false} cellRender={LeftItemCellCustom}/>
                <Column dataField="price" caption="Price" visible={true}  cssClass="row-vertical-align" allowEditing={false} />
                <Column dataField="qty"
                    caption="Qty" 
                    dataType='number' 
                    visible={true} 
                    cssClass="row-vertical-align" 
                    allowEditing={true} 
                    editorOptions={{'showSpinButtons':true}} 
                    cellRender={customCellQty}/>
                <Column dataField="disc" caption="Discount" visible={true}  cssClass="row-vertical-align" allowEditing={true} calculateDisplayValue={(e)=>{ return e.disc === 0 ? '' : e.disc  }  } />
                <Column dataField="subTotal" caption="Sub Total" dataType='number'  visible={true}  cssClass="row-vertical-align" allowEditing={false}/>

            </DataGrid>  

          </Card>  
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(LeftItemSales, areEqual)

