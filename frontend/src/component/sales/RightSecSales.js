import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card} from 'react-bootstrap';
import Accordion from 'devextreme-react/accordion';


function RightSecSales() {
    const dataInfo = useSelector(s => s.sales.dataInfo)


    return (
        <div className={'right-section-sales'}>
            <Card className={'mt-2 p-4 info-sales-card'}>
                <Accordion
                    dataSource={dataInfo}
                    collapsible={true}
                    multiple={true}
                    animationDuration={380}
                    selectedItems={[dataInfo[0]]}
                   // onSelectionChanged={this.selectionChanged}
                   // itemTitleRender={CustomTitle}
                   // itemRender={CustomItem}
                />
            </Card>
        </div>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(RightSecSales, areEqual)

