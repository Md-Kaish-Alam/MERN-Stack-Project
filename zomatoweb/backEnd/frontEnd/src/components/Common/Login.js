import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
const responseFacebook = (response) => {
    console.log(response);
}

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {

        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:6767/login`, user)
            .then(res => {
                alert(res.data.message)
                // setLoginUser(res.data.user)
                // history.push('/')

            })
    }

    const navigate = useNavigate () 

    return (
        <div>
            <div >
                <div className='form-container'>
                    <form className='login-form'>
                        <h2 className='title'>Login</h2>
                        <div className='input-field'>
                            <i className='fas fa-envelope'></i>
                            <input type='Email' name='email' value={user.email} placeholder='Enter your Email' onChange={handleChange} />
                        </div>
                        <div className='input-field'>
                            <i className='fas fa-lock'></i>
                            <input type='password' name='password' value={user.password} placeholder='Password' onChange={handleChange} />
                        </div>
                        <input className='btn1 solid' type='submit' value='Login' onClick={login} />
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
                            New Here 
                             <button type="button" onClick={() => navigate(`/register`)} style={{border:'none', background : 'none'}}>Create a new account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
