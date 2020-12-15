import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';


function ApplicantsItem({ item }) {
    const [checked, setChecked] = useState(false);
    
    const handleChange = (e) => {
        setChecked(e.target.checked);
    };
    
    return (
        <>
            {
                item
                    ? <p>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                        />{`${item.name}, ${item.address.address}`}
                    </p>
                    : null
            }
            
        </>
    )
}

export default ApplicantsItem
