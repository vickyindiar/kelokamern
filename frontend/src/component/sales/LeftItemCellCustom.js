import React from 'react'

function LeftItemCellCustom(cellData) {
    return (
        <div className='customItemsCell'>
            <div className='upper'>
                {cellData.data['name']}
            </div>
            <div className='lower'>
                stock : {cellData.data['stock']}
            </div>
        </div>
    )
}

export default LeftItemCellCustom
