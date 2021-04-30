import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card} from 'react-bootstrap';
import TextBox from 'devextreme-react/text-box';
import {updateSalesNote} from '../../services/actions/salesAction';


function LeftNoteSales() {
    const noteSales = useSelector(s => s.sales.noteSales)
    const dispatch = useDispatch();

    const onNoteChanged = (e) => {
        dispatch(updateSalesNote(e.value));
    }

    return (
        <>
            <Card className={'mt-2 p-4 note-sales-card'}>
                <TextBox stylingMode={'outlined'} placeholder="Note." onValueChanged={onNoteChanged} defaultValue={noteSales}/>
            </Card>
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(LeftNoteSales, areEqual)
