import React from 'react';
import Paper from '@material-ui/core/Paper';

import ApplicantsItem from './ApplicantsItem';

function ApplicantsList() {
    return (
        <Paper style={ styles.paperApplicants}>
            <h2>Заявники</h2>
            <ApplicantsItem/>
        </Paper>
    )
}

export default ApplicantsList

const styles = {
    paperApplicants: {
        marginBottom: '30px',
        padding: '15px 25px 15px'
    }
}