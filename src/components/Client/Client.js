import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import api from '../../api';
import ApplicantsList from '../applicants/ApplicantsList';

function Client() {
    const [clientsList, setClientsList] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState(null);
    const [applicants, setApplicants] = useState([]);

    const fetchClients = () => {
        inputValue.length < 4
            ? api.get('/clients')
                .then(resp => setClientsList(resp.data.items))
            : api.get('/clients?search[name]=' + inputValue)
                .then(resp => setClientsList(resp.data.items))
    }
    const fetchApplicants = (id) => {
        api.get('/applicants?filter[client:id]=' + id)
                .then(resp => setApplicants(resp.data.items))
    }
    const filterOptions = createFilterOptions({
        limit: 10,
    });
    useEffect(() => {
        fetchClients();
    }, [])
    useEffect(() => {
        fetchClients();
    }, [inputValue, value])

    useEffect(() => {
        value
            ? fetchApplicants(value.id)
            : setApplicants([])
    }, [value])
    return (
        <>
            <Paper style={styles.paperClient}>
                <h2>Клієнт</h2>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    filterOptions={filterOptions}
                    id='combo-box'
                    options={clientsList}
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option) => option.label}
                    size='small'
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label='Пошук/вибір клієнта' variant="outlined" />}
                />
                {value
                    ? <div>
                        <h3>
                            {value.name}
                        </h3>
                        <p>
                            Телефон. {value.phone}
                        </p>
                        <Button variant="contained" color="primary">
                            Зберегти заявку
                        </Button>
                    </div>
                    : null}
            </Paper>
            <Paper>
                <ApplicantsList client={value} applicants={applicants}/>
            </Paper>
        </>
    )
}

export default Client

const styles = {
    paperClient: {
        marginBottom: '30px',
        padding: '15px 25px 15px'
    }
}