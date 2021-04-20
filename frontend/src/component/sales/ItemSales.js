import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card} from 'react-bootstrap';
import DataGrid, {Column, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel, Scrolling, LoadPanel, Editing, Form } from 'devextreme-react/data-grid';

function ItemSales() {
    return (
        <>
          <Card>
            <DataGrid
                    ref={vref}
                    id={'gridItemSales'}
                    dataSource= {  }
                    columnAutoWidth={true}
                    height= {"100%"}
                    width= {"100%"}
                    noDataText={'No Data !'}
                    showBorders={false}
                    showColumnLines= {false}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    allowColumnResizing={true}
                    onSelectionChanged= { (e) =>{} }  
                    onInitNewRow={ (e) => {  }}
                    onRowInserted = { (e) =>{}}
                    onRowUpdated = { (e) => { } }
                    onRowRemoving = { (e) => {  }}
                > 
                <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} texts={{saveRowChanges:'Simpan', cancelRowChanges:'Batal' }} >
                    <Form>
                        <Item itemType="group" colCount={2} colSpan={2}>
                            <Item dataField="number"  editorOptions={{ disabled: true  }} />
                            <Item dataField="name" />
                            <Item dataField="desc" editorType="dxTextArea" colSpan={2} editorOptions={{ height: 100 }} />
                        </Item>  
                    </Form>
                </Editing>

                <GroupPanel visible={true} emptyPanelText={'Tarik kolom disini untuk menggabungkan Baris '} em />
                <Grouping autoExpandAll={expandMode} />
                <SearchPanel visible={true} highlightCaseSensitive={true} placeholder='  Cari disini..  '/>
                <Selection mode={selectionMode} selectAllMode={'allPages'} showCheckBoxesMode={'always'} allowSelectAll={true} />
                <ColumnFixing enabled={true} />  
                <Column dataField="number" caption="No." visible={true}  cssClass="row-vertical-align" />
                <Column dataField="item" caption="Item" visible={true}  cssClass="row-vertical-align" />
                <Column dataField="price" caption="Price" visible={true}  cssClass="row-vertical-align" />
                <Column dataField="qty" caption="Price" visible={true}  cssClass="row-vertical-align" />
                <Column dataField="price" caption="Price" visible={true}  cssClass="row-vertical-align" />
            </DataGrid>  

          </Card>  
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(ItemSales, areEqual)

