import React, { useState } from 'react';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';

import {deleteNewApplicant} from '../../store/actions'

function NewApplicantsItem({ item, index, deleteNewApplicant }) {
    console.log(item)
    const [checked, setChecked] = useState(true);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };
    const deleteItem = () => {
        deleteNewApplicant(index);
    }
    return (
        <p style={styles.row}>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                color="primary"
            /><span style={styles.name}>{item.name}</span><span>{', ' + item.address}</span>
            <CloseIcon
                onClick={deleteItem}
                fontSize='small'
                style={styles.icon}
            />
        </p>
    )
}

const mapDispatchToProps = {
    deleteNewApplicant,
};
export default connect(null, mapDispatchToProps)(NewApplicantsItem)
const styles = {
    row: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        cursor: 'pointer'
    },
    name: {
        fontWeight: 'bold'
    }
}