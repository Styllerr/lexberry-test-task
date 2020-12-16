import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import ApplicantsItem from './ApplicantsItem';
import ApplicantForm from './ApplicantForm';

function ApplicantsList({ client, applicants }) {
    const [addForm, setAddForm] = useState(false);
    const onClick = () => {
        if (client) { setAddForm(true); }
    }
    useEffect(() => {
        if (!client) { setAddForm(false) }
    }, [client])
    return (
        <Paper style={styles.paperApplicants}>
            <h2>Заявники</h2>
            {applicants.map(item => <ApplicantsItem item={item} key={item.id} />)}
            <Link
                component="button"
                onClick={onClick}
                style={styles.addButton}
            >+ Додати
            </Link>
            {
                addForm
                    ? <ApplicantForm />
                    : null
            }
        </Paper>
    )
}

export default ApplicantsList

const styles = {
    paperApplicants: {
        marginBottom: '30px',
        padding: '15px 25px 15px'
    },
    addButton: {
        textDecoration: 'underline dotted blue',
        paddingBottom: '2px'
    },
}