import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const BLANK = {
    name: '',
    innCode: '',
    country: 'Ukraine',
    address: '',
    city: '',
    postalIndex: '',
    fis: false,
    originalName: null,
    originalAddress: null
};
function ApplicantForm() {
    const [newApplicant, setNewApplicant] = useState([]);
    const [radioButton, setRadioButton] = useState(false);
    const handleChange = (e) => {
        e.target.value === 'fis'
        ? setRadioButton(true)
        : setRadioButton(false)
    };
    const onFormSubmit = (data) => {
        setNewApplicant([...newApplicant, data])
    }
    return (
        <div>
            <h4>Додати нового </h4>
            <Formik
                initialValues={BLANK}
                validateOnBlur
                // validationSchema={applicantSchema}
                onSubmit={onFormSubmit}
            >
                <Form>
                    <Grid container spacing={5} alignItems="flex-start">
                        <Grid item xs={12}>
                            <RadioGroup name="fis" onChange={handleChange}>
                                <FormControlLabel value='fis' control={<Radio color='default' size='small'/>} label='Фізична особа' />
                                <FormControlLabel value='entity' control={<Radio color='default' size='small'/>} label='Юридична особа' />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Field name='country' type='text' style={styles.select}>
                                {({ field, meta }) => (
                                    <FormControl variant="outlined">
                                        <Select
                                            {...field}
                                            labelId="select-country"
                                            fullWidth
                                        >
                                            <MenuItem value='Ukraine'>Україна</MenuItem>
                                            <MenuItem value='USA'>США</MenuItem>
                                            <MenuItem value='GB'>Великобританія</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    )
}

export default ApplicantForm

const styles = {
    select: {
        minWidth: '25%'
    }
}