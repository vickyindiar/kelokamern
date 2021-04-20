import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card} from 'react-bootstrap';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';

function ScanSales() {

const passwordButton = {

  };


    return (
        <>
            <Card className={'mt-2 p-4'}>
                <TextBox
                    placeholder="scan or search here.."
                    stylingMode="lined"
                    defaultValue=""
                //  mode={this.state.passwordMode}
                >
                    <TextBoxButton
                    name="search"
                    location="after"
                    options={
                        {
                            elementAttr:{'id':'text-button-search'},
                            icon: 'search',
                            type: 'default',
                            onClick: () => {
                                alert('nyoh')
                            }
                        }
                    }
                    />
                </TextBox>
            </Card> 
        </>
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(ScanSales, areEqual)
