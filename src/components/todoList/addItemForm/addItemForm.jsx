import React from "react";
import styles from './addItemForm.module.css'
import media from './addItemFormMedia.module.css'
import cn from 'classnames'
import {Formik} from "formik";
import * as yup from 'yup'

const AddNewItem = ({addItem}) => {

    const validationSchema = yup.object().shape({
        itemText: yup.string().required(`Goal can't be empty`).max(300, `Max length is 300 symbols`)
    })

    return (
        <div>
            <Formik
                initialValues={{
                    itemText: ''
                }}
                validateOnBlur
                onSubmit = { (values, {resetForm}) =>{
                    addItem(values.itemText)
                    resetForm({values: ``})
                } }
                validationSchema={validationSchema}
            >
                { ({ values, errors, touched, handleChange, handleBlur, handleSubmit,
                   isValid, dirty}) => (
                    <div className={cn(styles.form, media.form)}>
                        <input
                            className={cn(styles.input, media.input)}
                            type = 'text'
                            name = 'itemText'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.itemText}
                            placeholder='Add a goal here...'/>

                        {touched.itemText && errors.itemText &&
                        <div>{errors.itemText}</div>}

                        <button className={cn(styles.button, media.button)}
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type={'submit'}>Add</button>
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default AddNewItem