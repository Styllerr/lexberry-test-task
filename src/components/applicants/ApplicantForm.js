import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import { addApplicant, showAddForm } from '../../store/actions';

const BLANK_FORM = {
    name: '',
    innCode: '',
    address: '',
    originalName: '',
    originalAddress: ''
};
const BLANK_SELECTOR = {
    country: 'Ukraine',
    fis: true,
};
function ApplicantForm({ newApplicants, addApplicant, showAddForm }) {

    const newApplicantSchema = yup.object().shape({
        name: yup.string()
            .min(2, 'Very short name')
            .required('Name is required'),
        address: yup.string()
            .min(5, 'Very short address')
            .required('Address is required'),
    })

    const [formSelector, setFormSelector] = useState(BLANK_SELECTOR);

    const handleChange = (e) => {
        console.log('radio changed: ', e.target.value)
        e.target.value === 'true'
            ? setFormSelector({ ...formSelector, fis: true })
            : setFormSelector({ ...formSelector, fis: false })
    };
    const dataChange = (event) => {
        setFormSelector({ ...formSelector, [event.target.name]: event.target.value })
    }
    const onFormSubmit = (data) => {
        data = { ...data, country: formSelector.country, fis: formSelector.fis }
        addApplicant(data);
        showAddForm(false);
    }
    const onClickFind = (event) => {
        event.preventDefault()
    }
    return (
        <>
            <h4>Додати нового </h4>
            <Formik
                initialValues={BLANK_FORM}
                validateOnBlur
                validationSchema={newApplicantSchema}
                onSubmit={onFormSubmit}>
                <Form>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <RadioGroup name="fis" value={String(formSelector.fis)} onChange={handleChange} style={styles.radioButtomConteiner}>
                                <FormControlLabel value='true' control={<Radio color='default' size='small' />} label='Фізична особа' />
                                <FormControlLabel value='false' control={<Radio color='default' size='small' />} label='Юридична особа' />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" style={styles.select}>
                                <Select
                                    name='country'
                                    value={formSelector.country}
                                    type='text'
                                    labelId="select-country"
                                    onChange={dataChange}
                                    size='small'
                                >
                                    <MenuItem value='Ukraine'>Україна</MenuItem>
                                    <MenuItem value='USA'>США</MenuItem>
                                    <MenuItem value='GB'>Великобританія</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field name='innCode' type='text'>
                                {({ field, meta }) => (
                                    <div style={styles.fildWrapper}>
                                        <TextField
                                            {...field}
                                            label="ЄДРПОУ"
                                            variant="outlined"
                                            size='small'
                                            style={styles.code}
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                        <Link
                                            component="button"
                                            onClick={onClickFind}
                                            style={styles.findButton}
                                        >Знайти в ЄДР
                            </Link>
                                    </div>
                                )}
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={6}>
                            <Field name='name' type='text'>
                                {({ field, meta }) => (
                                    <div style={styles.fildWrapper}>
                                        <TextField
                                            {...field}
                                            label="Назва"
                                            variant="outlined"
                                            style={styles.field}
                                            size='small'
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                            <Field name='address' type='text'>
                                {({ field, meta }) => (
                                    <div style={styles.fildWrapper}>
                                        <TextField
                                            {...field}
                                            label="Адреса"
                                            variant="outlined"
                                            style={styles.field}
                                            size='small'
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </Grid>
                        {formSelector.country !== 'Ukraine'
                            ? <Grid item xs={12} md={6}>
                                <Field name='originalName' type='text'>
                                    {({ field, meta }) => (
                                        <div style={styles.fildWrapper}>
                                            <TextField
                                                {...field}
                                                label="Назва мовою походження"
                                                variant="outlined"
                                                style={styles.field}
                                                size='small'
                                            />
                                            {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                                <Field name='originalAddress' type='text'>
                                    {({ field, meta }) => (
                                        <div style={styles.fildWrapper}>
                                            <TextField
                                                {...field}
                                                label="Адреса мовою походження"
                                                variant="outlined"
                                                style={styles.field}
                                                size='small'
                                            />
                                            {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                            </Grid>
                            : null
                        }
                    </Grid>
                    <div>
                        <Button
                            variant="outlined"
                            color="primary"
                            type='submit'
                        >
                            Додати
                        </Button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
const mapStateToProps = ({ newApplicants }) => ({ newApplicants })
const mapDispatchToProps = {
    addApplicant,
    showAddForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantForm)

const styles = {
    select: {
        minWidth: '25%',
    },
    code: {
        minWidth: '65%',
        verticalAlign: 'center',
    },
    field: {
        minWidth: '85%',
        verticalAlign: 'center',
    },
    fildWrapper: {
        marginBottom: '20px',
    },
    findButton: {
        height: '40px',
        marginLeft: '20px',
        textDecoration: 'underline dotted blue'
    },
    radioButtomConteiner: {
        flexDirection: 'row'
    },
    error: { color: 'red' },
}