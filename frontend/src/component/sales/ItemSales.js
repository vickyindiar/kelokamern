import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';   
import {Row, Col, Card} from 'react-bootstrap';
import DataGrid, {Column, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel, Scrolling, LoadPanel, Editing, Form } from 'devextreme-react/data-grid';
import ItemCellCustom from './ItemCellCustom';

function ItemSales() {
    const itemSource = useSelector(s => s.sales.dataItems)
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
                    // onSelectionChanged= { (e) =>{} }  
                    // onInitNewRow={ (e) => {  }}
                    // onRowInserted = { (e) =>{}}
                    // onRowUpdated = { (e) => { } }
                    // onRowRemoving = { (e) => {  }}
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
                <Column dataField="name" caption="Items" visible={true}  cssClass="row-vertical-align" allowEditing={false} cellRender={ItemCellCustom}/>
                <Column dataField="price" caption="Price" visible={true}  cssClass="row-vertical-align" allowEditing={false} />
                <Column dataField="qty" caption="Qty" dataType='number' editorOptions visible={true}  cssClass="row-vertical-align" allowEditing={true}/>
                <Column dataField="disc" caption="Discount" visible={true}  cssClass="row-vertical-align" allowEditing={false} calculateDisplayValue={(e)=>{ return e.disc === 0 ? '' : e.disc  }  } />
            </DataGrid>  

          </Card>  
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(ItemSales, areEqual)

