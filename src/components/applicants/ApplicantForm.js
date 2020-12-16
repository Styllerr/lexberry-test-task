import React, { useState } from 'react';
import { connect } from 'react-redux'
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
import Paper from '@material-ui/core/Paper';

import addApplicant from '../../store/actions'

const BLANK = {
    name: '',
    innCode: '',
    country: 'Ukraine',
    address: '',
    fis: true,
    originalName: '',
    originalAddress: ''
};
function ApplicantForm({newApplicant, addApplicant}) {
    const [newApplicant, setNewApplicant] = useState([]);
    const [formData, setFormData] = useState(BLANK);
    const handleChange = (e) => {
        console.log('radio changed: ', e.target.value)
        e.target.value === 'true'
        ? setFormData({ ...formData, fis: true })
        : setFormData({ ...formData, fis: false })
    };
    const dataChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const onClickFind = (event) => {
        event.preventDefault()
    }
    const newApplicantSchema = yup.object().shape({
        name: yup.string()
            .min(2, 'Very short name')
            .required('Name is required'),
        address: yup.string()
            .min(5, 'Very short address')
            .required('Address is required'),
    })
    const onFormSubmit = (data, {resetForm }) => {
        console.log(data);
        data = {...data, country: formData.country, fis: formData.fis}
        setNewApplicant([...newApplicant, data ]);
        resetForm();
    }
    return (
        <div>
            <h4>Додати нового </h4>
            <Formik
                initialValues={BLANK}
                validateOnBlur
                validationSchema={newApplicantSchema}
                onSubmit={onFormSubmit}>
                <Form>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <RadioGroup name="fis" value={String(formData.fis)} onChange={handleChange} style={styles.radioButtomConteiner}>
                                <FormControlLabel value='true' control={<Radio color='default' size='small' />} label='Фізична особа' />
                                <FormControlLabel value='false' control={<Radio color='default' size='small' />} label='Юридична особа' />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" style={styles.select}>
                                <Select
                                    name='country'
                                    value={formData.country}
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
                                    <div>
                                        <TextField
                                            {...field}
                                            label="ЄДРПОУ"
                                            variant="outlined"
                                            size='small'
                                            style={styles.code}
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>

                            <Link
                                component="button"
                                onClick={onClickFind}
                                style={styles.findButton}
                            >Знайти в ЄДР
                        </Link>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={6}>
                            <Field name='name' type='text'>
                                {({ field, meta }) => (
                                    <div>
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
                                    <div>
                                        <TextField
                                            {...field}
                                            label="Адреса"
                                            variant="outlined"
                                            tyle={styles.field}
                                            size='small'
                                        />
                                        {meta.touched && meta.error && <div style={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>

                        </Grid>
                        {formData.country !== 'Ukraine'
                            ? <Grid item xs={12} md={6}>
                                <Field name='originalName' type='text'>
                                    {({ field, meta }) => (
                                        <div>
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
                                        <div>
                                            <TextField
                                                {...field}
                                                label="Адреса мовою походження"
                                                variant="outlined"
                                                tyle={styles.field}
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
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        style={styles.submitButton}
                    >
                        Зберегти заявку
                </Button>
                </Form>
            </Formik>
            {newData
                ? <Paper>
                    {JSON.stringify(newApplicant)}
                </Paper>
                : null
            }
        </div>
    )
}
const mapStateToProps = ({ newApplicant }) => ({ newApplicant })
const mapDispatchToProps = {
    addApplicant
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
        marginBottom: '20px'
    },
    findButton: {
        height: '40px',
        marginLeft: '20px',
        textDecoration: 'underline dotted blue'
    },
    submitButton: {
        margin: '20px 0'
    },
    radioButtomConteiner: {
        flexDirection: 'row'
    }
}