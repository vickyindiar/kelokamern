import React from 'react';
import { storeData, updateData, deleteData } from "../../services/actions/dataAction";


export const PRODUCT_TAB_INDEX = 0
export const SUPPLIER_TAB_INDEX = 1
export const CUSTOMER_TAB_INDEX = 2
export const BRAND_TAB_INDEX = 3
export const CATEGORY_TAB_INDEX = 4
export const QTYTYPE_TAB_INDEX = 5
export const COLOR_TAB_INDEX = 6

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
            hint: selectionMode === 'multiple' ? "Pilih Satu Baris" : "Pilih Sekaligus" ,
            elementAttr: { "id": "btnMulti" },
            icon: "check", //"fa fa-check",
            text: "Pilih Sekaligus",
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
            hint: "Saring Baris",
            elementAttr: { "id": "btnFilter" },
            icon: "filter", //"fa fa-filter",
            text: "Saring Baris",
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
            hint: expandMode ? "Persempit Baris" : "Perluas Baris", 
            elementAttr: { "id": "btnExpand" },
            icon: expandMode ? "collapse" : "expand",
            text: expandMode ? "Persempit Baris" : "Perluas Baris",
            onClick: (e) => {
                setExpandMode(!expandMode);
            } 
        }
    },
    {
        widget: "dxButton",
        location: "after",
        name: "btnMultiDelete",
        locateInMenu: "auto",
        sortIndex: 40,
        showText: "inMenu",
        visible: true,
        options: {
            hint: "Hapus Sekaligus", 
            elementAttr: { "id": "btnMultiDel" },
            icon: "trash",
            text: "Hapus Sekaligus",
            onClick: (e) => {
              //  setExpandMode(!expandMode);
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

export const onInitNewRow = (e) => {
    e.data.number = e.component.option('dataSource').length + 1;
}  

export const onRowInserted = (e, tab, image) => dispatch => {
    if(image){ e.data.image = image; }
    e.data.code = e.data.number;
    dispatch(storeData(tab, e.data));
}

export const onRowUpdated = (e, tab, image) => dispatch => {
    dispatch(updateData(tab, e.data, image));
}

export const onRowRemoved = (e, tab, hasImage) => dispatch => {
    let data = {};
    const selectedRow = e.component.getSelectedRowsData();
    if(selectedRow.length > 0) { 
        data.ids = selectedRow.map(el => el._id)
       if (hasImage) data.imgs = selectedRow.map(el => el.image);
    }
     else if(e.data) {
         data.ids = []; data.imgs = [];
         data.ids.push(e.data._id)
       if(hasImage) data.imgs.push(e.data.image);
    }
    dispatch(deleteData(data, tab));
}