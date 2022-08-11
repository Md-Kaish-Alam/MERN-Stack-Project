import React, { useState } from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login';
import { useNavigate  } from "react-router-dom";
const responseFacebook = (response) => {
    console.log(response);
}

export default function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        reEnterPassword: ''
    })

    const handleChange = e => {

        const { name, value } = e.target
        
        setUser({
            ...user,
            [name]: value
        })
    }

    const registerUser = (e) => {
        e.preventDefault();
        const { name, email, password, reEnterPassword } = user
        if (name !== undefined && email !== undefined && password !== undefined && (password === reEnterPassword)) {
            axios.post(`http://localhost:6767/register`, user)
                .then(res => console.log(res))
        } else {
            alert("Inavlid input")
        }
    }

    const navigate = useNavigate () 
    return (
        <div>
            <div >
                <div className='form-container'>
                    <form className='login-form'>
                        <h2 className='title'>Create an account</h2>
                        <div className='input-field'>
                            <i className='fas fa-user'></i>
                            <input type='text' name='name' value={user.name} placeholder='Username' onChange={handleChange} />
                        </div>
                        <div className='input-field'>
                            <i className='fas fa-envelope'></i>
                            <input type='text' name='email' value={user.email} placeholder='Enter Valid Email' onChange={handleChange} />
                            {/* onSubmit={()=> validateEmail()} */}
                        </div>
                        <div className='input-field'>
                            <i className='fas fa-lock'></i>
                            <input type='password' name='password' value={user.password} placeholder='Enter Your Password' onChange={handleChange} />
                        </div>
                        <div className='input-field'>
                            <i className='fas fa-lock'></i>
                            <input type='password' name='reEnterPassword' value={user.reEnterPassword} placeholder='Conform Your Password' onChange={handleChange} />
                        </div>
                        <input className='btn1 solid'  type='submit' value='Create Account' onClick={registerUser} />
                        <p className='social-text'>Or login with Social Platforms</p>
                        <div className='social-media'>
                            {/* <a href='#' className='social-icon'>
                                <i className='fab fa-facebook'></i>
                            </a>
                            <a href='#' className='social-icon'>
                                <i className='fab fa-google'></i>
                            </a> */}
                            <FacebookLogin
                                appId="1097190134483535"
                                fields="name,email,picture"
                                callback={responseFacebook}
                                className="fbtn"
                            />
                            <span>or</span>
                            <GoogleLogin
                                clientId="979222837210-hq0jj219mgbeu212np7vn2jud33enn6c.apps.googleusercontent.com"
                                buttonText="LOGIN WITH GOOGLE"
                                cookiePolicy={'single_host_origin'}
                                className="gbtn"
                            />
                        </div>
                        <div className='accountCreation'>
                            Already Have Account ?
                            <button type="button" onClick={() => navigate(`/login`)} style={{border:'none', background : 'none'}}>Here Click to Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
