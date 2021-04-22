import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card} from 'react-bootstrap';
import TextBox from 'devextreme-react/text-box';


function LeftNoteSales() {
    return (
        <>
            <Card className={'mt-2 p-4 note-sales-card'}>
                <TextBox stylingMode={'outlined'} placeholder="Note."/>
            </Card>
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(LeftNoteSales, areEqual)
