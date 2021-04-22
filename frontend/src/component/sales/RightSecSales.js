import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card} from 'react-bootstrap';
import Accordion from 'devextreme-react/accordion';
import RightAccSaleInfo from './RightAccSaleInfo';
import RightAccPaymentInfo from './RightAccPaymentInfo';


function RightSecSales() {
    const dataInfo = useSelector(s => s.sales.dataInfo)
    const [selected, setSelected] = useState(dataInfo[0]);

    const itemTemplate = (data) => {
        if(!data) return null;
        if(data.id === 1){
            return( <div> <RightAccSaleInfo data={data} /> </div> )
        }
        else if(data.id === 2){
            return( <div> <RightAccPaymentInfo data={data} /> </div> )
        }
    }

    const selectionChanged = (e) => {
        // setSelected()
    }

    return (
        <div className={'right-section-sales'}>
            <Card className={'mt-2 p-4 info-sales-card'}>
                <Accordion
                    dataSource={dataInfo}
                    collapsible={true}
                    multiple={true}
                    animationDuration={380}
                   // selectedItems={selected}
                   // onSelectionChanged={(e) => { selectionChanged(e) }}
                   // itemTitleRender={CustomTitle}
                   itemRender={itemTemplate}
                />
            </Card>
        </div>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(RightSecSales, areEqual)

