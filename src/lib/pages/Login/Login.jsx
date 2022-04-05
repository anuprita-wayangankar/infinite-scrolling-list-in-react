import React, { useState } from 'react'
import { FormErrors } from "../../utility/FormErrors"
import { setTockenInCoockie } from "../../utility/helperMethods"
import "./Login.css"

export default function Login() {
    const [formValid, setFormValid] = useState({ isPasswordValid: false, isNameValid: false, isFormValid: false })
    const [formValues, setFormValues] = useState({ password: '', name: '' })
    const [formErrors, setFormErrors] = useState({ password: '', name: '' })
    const [isValid, setIsValid] = useState(true)

    const loginHandler = () => {
        if (formValues.name === "foo" && formValues.password === "bar") {
            setTockenInCoockie()
            window.location.href = "/home"
        }
        else {
            setIsValid(false)
        }
    }

    const handleUserInput = (e) => {
        const { name, value } = e.target;

        setFormValues(prevFormValues => {
            return {
                ...prevFormValues,
                [name]: value
            }
        }, validateField(name, value))
    }

    const validateField = (fieldName, value) => {
        let { password, name } = formErrors;
        let { isPasswordValid, isNameValid, isFormValid } = formValid;

        switch (fieldName) {
            case 'password':
                isPasswordValid = value.length > 0;
                password = isPasswordValid ? '' : ' is empty';
                break;
            case 'name':
                isNameValid = value.length > 0;
                name = isNameValid ? '' : ' is empty';
                break;
            default:
                break;
        }

        setFormErrors({ password, name })
        setFormValid({ isPasswordValid, isNameValid, isFormValid })
        validateForm()
        setIsValid(true)
    }

    const validateForm = () => {
        setFormValid(prevFormValid => {
            return {
                ...prevFormValid,
                isFormValid: prevFormValid.isPasswordValid && prevFormValid.isNameValid
            }
        })
    }

    return (
        <div className='Login'>
            <div className='form-map'>
                <div className='form'>
                    <div className='form-input'>
                        <label> Username </label>
                        <input type="name" autoComplete='off' placeholder='Enter your name' value={formValues.name} name="name" onChange={handleUserInput}></input>
                    </div>
                    <div className="panel panel-default">
                        <FormErrors formErrors={formErrors} fieldKey={"name"} />
                    </div>
                    <div className='form-input'>
                        <label> Password </label>
                        <input placeholder='Enter password' autoComplete='off' name="password" value={formValues.password} type="text" onChange={handleUserInput}></input>
                    </div>
                    <div className="panel panel-default">
                        <FormErrors formErrors={formErrors} fieldKey={"password"} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!formValid.isFormValid} onClick={(e) => loginHandler()}>Submit</button>
                    <div className="panel panel-default">
                        <div className='formErrors'>{!isValid ? <p>Invalid username or password !</p> : ""}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
