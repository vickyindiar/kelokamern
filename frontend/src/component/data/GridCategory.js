import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DataGrid, {Column, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel, Editing, Form } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import * as gConfig from './ConfigGrids';

function GridCategory({tab, vref}) {
    const [selectionMode, setSelectionMode] = useState('multiple');
    const [expandMode, setExpandMode] = useState(true);
    const categoryDS = useSelector(s => s.data.dataCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('render useeffect data')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(tab,'render grid Category');
    return (
         <DataGrid
                ref={vref}
                id={'gridViewCty'}
                dataSource= { categoryDS }
                columnAutoWidth={true}
                height= {"100%"}
                width= {"100%"}
                showBorders={false}
                showColumnLines= {false}
                showRowLines={true}
                rowAlternationEnabled={true}
                allowColumnResizing={true}
                onSelectionChanged= { (e) => gConfig.changeStateSelectionChange(e)  }  
                onInitNewRow={ (e) => { gConfig.onInitNewRow(e); }}
                onRowInserted = { (e) => gConfig.onRowInserted(e, gConfig.CATEGORY_TAB_INDEX, null)(dispatch) }
                onRowUpdated = { (e) => { gConfig.onRowUpdated(e, gConfig.CATEGORY_TAB_INDEX, null)(dispatch) } }
                onRowRemoving = { (e) => { gConfig.onRowRemoved(e, gConfig.CATEGORY_TAB_INDEX)(dispatch) }}
            > 
            <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} texts={{saveRowChanges:'Simpan', cancelRowChanges:'Batal' }} >
                <Form>
                    <Item itemType="group" colCount={2} colSpan={2}>
                        <Item dataField="number"  editorOptions={{ disabled: true  }} />
                        <Item dataField="code" />
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
            <Column dataField="number" caption="NO." visible={true}  cssClass="row-vertical-align" />
            <Column dataField="code" caption="CODE" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="name" caption="NAMA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="desc" caption="DESK" visible={true}  cssClass="row-vertical-align" />
    </DataGrid>  
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(GridCategory, areEqual)
