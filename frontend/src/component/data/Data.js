import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import ToolsAction from './ToolsAction';
import Header from '../template/Header';
import TabPanel, {Item} from 'devextreme-react/tab-panel';
import GridProduct from './GridProduct';
import GridSupplier from './GridSupplier';
import GridCustomer from './GridCustomer';
import GridBrand from './GridBrand';
import GridCategory from './GridCategory';
import GridQty from './GridQty';
import { getData } from "../../services/actions/dataAction";
import '../../styles/sass/component/_data.scss'

function Data() {
    const refGridProduct = useRef(null);
    const refGridCustomer = useRef(null)
    const refGridBrand = useRef(null)
    const refGridSupplier = useRef(null)
    const refGridCategory = useRef(null)
    const refGridQty = useRef(null)
    const refPanel = useRef(null);
    const [tabActive, setTabActive] = useState(0);
    const dispatch = useDispatch();
    // const productDS = useSelector(s => s.data.dataProduct);
    
    const onSelectionChanged = (args) => {
        if(args.name === 'selectedIndex') {
            setTabActive(args.value);
          }
    }

    const onInitialized = (args) =>{ dispatch(getData(tabActive)); }

    const onActionClick = (e) => {
        if(e.itemIndex === 0){
           refGridProduct.current.instance.addRow(); 
        }
    }

    return (
    <React.Fragment>
        <div className="content-container data">
        <Header />
        <div className="content-data">
            {/* < ToolsAction onItemClick={onActionClick} /> */}
            <TabPanel
                ref ={refPanel}
                height={"100%"}
                selectedIndex={tabActive}
                onOptionChanged={onSelectionChanged}
                onSelectionChanged={ onInitialized }
                onInitialized={ onInitialized }
                loop={false}
                animationEnabled={true}
                swipeEnabled={true}
            > 
                <Item title="Barang" key={0} >
                    <GridProduct tab={0} vref={refGridProduct} />
                </Item>
                <Item title="Supplier" ke={1} >
                    <GridSupplier tab={1} vref={refGridSupplier} />
                </Item>
                <Item title="Pelanggan" ke={2} >
                    <GridCustomer tab={2} vref={refGridCustomer}/>
                </Item>
                <Item title="Merk" ke={3} >
                    <GridBrand tab={3} vref={refGridBrand}/>
                </Item>
                <Item title="Kategori" ke={4} >
                    <GridCategory tab={4} vref={refGridCategory}/>
                </Item>
                <Item title="Satuan" key={5} >
                    <GridQty tab={5} vref={refGridQty}/>
                </Item>
            </TabPanel>
        </div>
 
        </div>
    </React.Fragment>
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(Data, areEqual);
