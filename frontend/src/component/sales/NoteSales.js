import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function NoteSales() {
    return (
        <div>
            ini note nya
        </div>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(NoteSales, areEqual)