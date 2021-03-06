import React from 'react';
import { ButtonGroup } from 'devextreme-react';

function ToolsAction({onItemClick}) {
    const items = [  
      { icon: 'add', key: 'add', hint: 'Tambah' },
      { icon: 'edit', key: 'edit', hint: 'Ubah' },
      { icon: 'trash', key: 'delete', hint: 'Hapus' },
      { icon: 'save', key: 'save', hint: 'Simpan' }
    ]

    console.log('render action')
    return (
        <ButtonGroup
            items={items}
            keyExpr="key"
            stylingMode="outlined"
            width="250px"
            selectedItemKeys={['left']}
            onItemClick={onItemClick}
      />
    )
}

export default React.memo(ToolsAction)
