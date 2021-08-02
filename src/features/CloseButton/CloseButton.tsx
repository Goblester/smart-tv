import React from 'react';
import Button from '../../components/Button/Button';
import closeIcon from '../../assets/images/cancel.png';

export const closeButton: React.FC = () => {


    return (
        <div>
            <Button>
                <img src={closeIcon} alt={'close'}/>
            </Button>
        </div>
    )
}