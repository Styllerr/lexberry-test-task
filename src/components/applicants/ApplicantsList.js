import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import ApplicantsItem from './ApplicantsItem';
import ApplicantForm from './ApplicantForm';
import { showAddForm } from '../../store/actions';
import NewApplicants from './NewApplicants';

function ApplicantsList({ client, applicants, addForm, showAddForm, saveClientData }) {
    const onClick = () => {
        if (client) { showAddForm(true); }
    }
    useEffect(() => {
        if (!client) { showAddForm(false) }
    }, [client, showAddForm])
    return (
        <Paper style={styles.paperApplicants}>
            <h2>Заявники</h2>
            {applicants.map(item => <ApplicantsItem item={item} key={item.id} />)}
            <NewApplicants />
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
            {
                client
                    ? <div>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            style={styles.submitButton}
                            onClick={saveClientData}
                            >
                            Зберегти заявку
                        </Button>
                    </div>
                    : null
            }

        </Paper>
    )
}

const mapStateToProps = ({ newApplicants, addForm }) => ({ newApplicants, addForm })
const mapDispatchToProps = {
    showAddForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsList)

const styles = {
    paperApplicants: {
        marginBottom: '30px',
        padding: '15px 25px 15px'
    },
    addButton: {
        textDecoration: 'underline dotted blue',
        paddingBottom: '2px'
    },
    submitButton: {
        margin: '20px 0'
    },
}