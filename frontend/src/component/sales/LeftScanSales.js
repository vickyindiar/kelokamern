import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card} from 'react-bootstrap';
import SelectBox from 'devextreme-react/select-box';
import { getData, getProductSupport } from '../../services/actions/dataAction';
import { addItems } from '../../services/actions/salesAction';
import { PRODUCT_TAB_INDEX } from '../data/ConfigGrids';

function LeftScanSales() {
    const productDS = useSelector(s => s.data.dataProduct);
    const dsItems = useSelector(s => s.sales.dataItems);
    const [brandDS, setBrandDS] = useState(null);
    const [categoryDS, setCategoryDS] = useState(null);
    const [qtyDS, setQtyDS]= useState(null);
    const [gridBoxValue, setGridBoxValue] = useState('');
    const [isGridOpened, setIsGridOpened] = useState(false);
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

    const gridDisplayExpr = (d) => {
        if (d) { return d.name; }
        else{return '';}
        
    }

    const onGridBoxOpened = (e) => {
        if(e.name === 'opened') {
            setIsGridOpened(e.value);
        }
    }

    const syncDataGridSelection = (e) => {
          setGridBoxValue(e.value)
          dispatch(addItems(e.data, dsItems));
      }

      const itemRender = (data) =>{
          return (
               <div className={'custom-item-scan'}>
                  <div className={'id d-none'}>{data.code}</div>
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
                     onEnterKey={(e) => { } }
                 //   onOptionChanged={(e) => { onGridBoxOpened(e) }}
                >
                </SelectBox>
            </Card> 
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(LeftScanSales, areEqual)
