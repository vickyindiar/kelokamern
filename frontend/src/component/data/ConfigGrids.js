import React from 'react';
import { Column, Lookup } from 'devextreme-react/data-grid';
import isEmpty from '../../services/helper/isEmpty';
import { getColumnsGrid, storeData, updateData, deleteData } from "../../services/actions/dataAction";



export const onToolbarPreparing = (e, selectionMode, setSelectionMode, expandMode, setExpandMode ) => {
    var dataGrid = e.component;
    var toolbarItems = e.toolbarOptions.items;
 //   toolbarItems[0].visible = false;
    toolbarItems.unshift(
    {
        widget: "dxButton",
        name: "btnMulti",
        locateInMenu: "auto",
        location: "after",
        sortIndex: 40,
        showText: "inMenu",
        options: {
            hint: selectionMode === 'multiple' ? "Single selection" : "Multiple selection" ,
            elementAttr: { "id": "btnMulti" },
            icon: "check", //"fa fa-check",
            text: "Multiple selection",
            onClick: (e) => { setSelectionMode(selectionMode === 'multiple' ? "single" : "multiple" ); } // this.selectionModeChanged.bind(this)
        }
    },
    {
        widget: "dxButton",
        name: "btnFilter",
        locateInMenu: "auto",
        location: "after",
        sortIndex: 40,
        showText: "inMenu",
        options: {
            hint: "Filter",
            elementAttr: { "id": "btnFilter" },
            icon: "filter", //"fa fa-filter",
            text: "Filter Row",
            onClick: function (e) {
                var filter = dataGrid.option("filterRow.visible") === false;
                dataGrid.option("filterRow.visible", filter);
            }
        }
    },
    {
        widget: "dxButton",
        location: "after",
        name: "btnExpand",
        locateInMenu: "auto",
        sortIndex: 40,
        showText: "inMenu",
        options: {
            hint: expandMode ? "Collapse All" : "Expand All", 
            elementAttr: { "id": "btnExpand" },
            icon: expandMode ? "collapse" : "expand",
            text: expandMode ? "Collapse All" : "Expand All",
            onClick: (e) => {
                setExpandMode(!expandMode);
            } 
        }
    }
    );
};

export const changeStateSelectionChange =  (e) => {
    console.log(e);
}

export const onContentReady = (e, isLoad) => {
    if (isLoad) { e.component.beginCustomLoading(); } 
    else{ e.component.endCustomLoading(); }
    var scrollable = e.component.getScrollable();  
    scrollable.scrollTo(scrollable.scrollHeight()); 
}
 
export const setCellValue = (v) => {
 let result = !isEmpty( v.value) ?  v.value.name : '';
 return result;
}

export const generateColumns = (tab, customConfig) => {
    const columns = [];
    const data = [...getColumnsGrid(tab)];
    // eslint-disable-next-line array-callback-return
    data.map((e, i) => {
        if(e.hasOwnProperty('custom')){
            if(e.custom === 'lookup'){
                let cc = customConfig.find(x => x.dataField === e.dataField);
                columns.push(
                    <Column {...e} key={e.id} > 
                        cc.lookup()
                    </Column>  
                )
            }
            else {
                columns.push( <Column {...e} customizeText={setCellValue} key={e.id} /> )
            }
        }
        else{
            columns.push( <Column {...e} key={e.id}/> )
        }
    })
    return columns;
}



export const onRowUpdated = (e, tab) => dispatch => {
        dispatch(updateData(tab, e.data));
}

export const onRowUpdating = (e, tab, brandDS, categoryDS, supplierDS, qtyDS) => {
    if (tab === 0){
        let cValue = '';
        let filtered = [];
        let lookup = [
            {f: 'brand', ds: brandDS},
            {f: 'category', ds: categoryDS},
            {f: 'supplier', ds: supplierDS},
            {f: 'qtytype', ds: qtyDS},
        ];

        for (let index = 0; index < lookup.length; index++) {
            let f = lookup[index].f;
            cValue = e.newData.hasOwnProperty(f) ? e.newData[f] : e.oldData[f];
            // eslint-disable-next-line no-loop-func
            filtered = lookup[index].ds.filter(v => v.id === cValue);
            e.newData[`${f}_id`] = cValue;
            e.newData[f] = !isEmpty(filtered) ? { id: filtered[0].id, name: filtered[0].name } : e.newData[f];      
        }
    }
}
export const onInitNewRow = (e) => {
    e.data.number = e.component.option('dataSource').length + 1;
}  

export const onRowInserting = (e, refImageUploader) => {
    
}

export const onRowInserted = (e, tab, image) => dispatch => {
    e.data.image = image;
    e.data.code = e.data.number;
    dispatch(storeData(tab, e.data));
}






// export const onRowInserting = (e, tab, brandDS, categoryDS, supplierDS, qtyDS) => {
//     if (tab === 0) {
//         if (tab === 0){
//             let cValue = '';
//             let filtered = [];
//             let lookup = [
//                 {f: 'brand', ds: brandDS},
//                 {f: 'category', ds: categoryDS},
//                 {f: 'supplier', ds: supplierDS},
//                 {f: 'qtytype', ds: qtyDS},
//             ];
    
//             for (let index = 0; index < lookup.length; index++) {
//                 let f = lookup[index].f;
//                 cValue = e.data[f];
//                 // eslint-disable-next-line no-loop-func
//                 filtered = lookup[index].ds.filter(v => v.id === cValue);
//                 e.data[`${f}_id`] = cValue;
//                 e.data[f] = !isEmpty(filtered) ? { id: filtered[0].id, name: filtered[0].name } : e.data[f];      
//             }
//         }
//     }
// }

export const onRowRemoved = (e, tab) => dispatch => {
    debugger;
    let ids = [];
    //tambah pramamter nama image todo
    const selectedRow = e.component.getSelectedRowsData();
    if(selectedRow.length > 0) ids = selectedRow.map(el => el._id)
    else if(e.data) ids.push(e.data._id);
    dispatch(deleteData(ids), tab);
}