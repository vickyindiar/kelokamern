import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import Accordion from 'devextreme-react/accordion';
import RightAccSaleInfo from './RightAccSaleInfo';
import RightAccPaymentInfo from './RightAccPaymentInfo';


function RightSecSales() {
    const dataInfo = useSelector(s => s.sales.dataInfo)
    const [selected, setSelected] = useState(dataInfo[0]);
    const itemTemplate = (data) => {
        if(!data) return null;
        if(data.id === 1){
            return( <div className="component-right-sale"> <RightAccSaleInfo data={data} /> </div> )
        }
        else if(data.id === 2){
            return( <div className="component-right-payment"> <RightAccPaymentInfo data={data} /> </div> )
        }
    }

    const CustomTitle = (data) => {
        return (<h4 className="accordion-sales-title">{data.title}</h4>)
    }

    const selectionChanged = (e) => {
    }

    return (
        <div className={'right-section-sales'}>
            <Card className={'mt-2 p-2 info-sales-card noppading'}>
                <Accordion
                    dataSource={dataInfo}
                    collapsible={false}
                    multiple={false}
                    animationDuration={380}
                   // selectedItems={selected}
                  //  onSelectionChanged={selectionChanged}
                   itemTitleRender={CustomTitle}
                   itemRender={itemTemplate}
                    />
            </Card>
        </div>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(RightSecSales, areEqual)

