import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DataGrid, { Column, Selection, Grouping, GroupPanel, ColumnFixing, SearchPanel, Scrolling, LoadPanel, Editing, Popup, Position, Form } from 'devextreme-react/data-grid';
// import isEmpty from '../../services/helper/isEmpty';
import { Item } from 'devextreme-react/form';
import * as gConfig from './ConfigGrids';

function GridCategory({tab, vref}) {
    const [selectionMode, setSelectionMode] = useState('multiple');
    const [expandMode, setExpandMode] = useState(true);
    const categoryDS = useSelector(s => s.data.dataCategory);
    const isLoad = false;
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
               // key={'evdno'}
                dataSource= { categoryDS }
              //  onContentReady={ (e) => gConfig.onContentReady(e, isLoad) }
                columnAutoWidth={true}
                height= {"100%"}
                width= {"100%"}
                //noDataText={isLoad ? '' : 'No Data !'}
               // onToolbarPreparing={ (e) => gConfig.onToolbarPreparing(e, selectionMode, setSelectionMode, expandMode, setExpandMode) }
                showBorders={false}
                showColumnLines= {false}
                showRowLines={true}
                rowAlternationEnabled={true}
               // onSelectionChanged= {  gConfig.changeStateSelectionChange  }  
                allowColumnResizing={true}
                // onInitNewRow= { gConfig.onInitNewRow() }
                // onRowUpdated = { (e) => gConfig.onRowUpdated(e, 4)(dispatch) }
                // onRowInserted = { (e) => { gConfig.onRowInserted(e, 4)(dispatch) } }
                // onRowRemoved = { (e) => { gConfig.onRowRemoved(e, 4)(dispatch) }}
            > 
            <Editing refreshMode={'reshape'} mode="popup" allowAdding={true} allowUpdating={true} allowDeleting={true} >
                <Popup title="Barang" showTitle={true} width={700} height={600}>
                    <Position my="top" at="top" of={window} />
                </Popup>
                <Form>
                    <Item itemType="group" colCount={2} colSpan={2}>
                        <Item dataField="number"  editorOptions={{ disabled: true  }} />
                        <Item dataField="code" />
                        <Item dataField="name" />
                        <Item dataField="desc" editorType="dxTextArea" colSpan={2} editorOptions={{ height: 100 }} />
                    </Item>  
                </Form>
            </Editing>

            <Scrolling mode={"virtual"} />
            <LoadPanel enabled={true}  showPane={true} />
            <GroupPanel visible={true} />
            <Grouping autoExpandAll={expandMode} />
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            <Selection mode={selectionMode} selectAllMode={'allPages'} showCheckBoxesMode={'always'} allowSelectAll={true} />
            <ColumnFixing enabled={true} />
             {/* { gConfig.generateColumns(tab) } */}
            <Column dataField="number" caption="NO." visible={true}  cssClass="row-vertical-align" />
            <Column dataField="code" caption="CODE" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="name" caption="NAMA" visible={true}  cssClass="row-vertical-align" />
            <Column dataField="desc" caption="DESK" visible={true}  cssClass="row-vertical-align" />
            
    </DataGrid>  
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(GridCategory, areEqual)
