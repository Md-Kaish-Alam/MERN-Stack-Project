import React from 'react'
import '../../Styles/header.css'
import Modal from 'react-modal'
import axios from 'axios';
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '19px',
        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)'
    },
};

const responseFacebook = (response) => {
    console.log(response);
}

export default function Header() {

    const [isLoginModalOpen, setLoginModal] = useState(false)
    const [isCreateAccountModalOpen, setCreateAccountModal] = useState(false)

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })

    const handleChangeLogin = e => {

        const { name, value } = e.target
        setUserLogin({
            ...userLogin,
            [name]: value
        })
    }

    const login = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:6767/login`, userLogin)
            .then(res => {
                alert(res.data.message)
                // setLoginUser(res.data.user)
                // history.push('/')

            })
    }

    // .............................

    const [userRegister, setUserRegister] = useState({
        name: '',
        email: '',
        password: '',
        reEnterPassword: ''
    })

    const handleChangeRegister = e => {

        const { name, value } = e.target

        setUserRegister({
            ...userRegister,
            [name]: value
        })
    }

    const registerUser = (e) => {
        e.preventDefault();
        const { name, email, password, reEnterPassword } = userRegister
        if (name !== undefined && email !== undefined && password !== undefined && (password === reEnterPassword)) {
            axios.post(`http://localhost:6767/register`, userRegister)
                .then(res => console.log(res))
        } else {
            alert("Inavlid input")
        }
    }

    return (
        <div>
            <div className='nav-container'>
                <div className='nav-right'>
                    <span className='dot'>
                        <span className='logo-write' onClick={() => navigate(`/`)} style={{ cursor: 'pointer' }}>
                            e!
                        </span>
                    </span>
                </div>
                <div className='nav-left'>
                    <button type="submit" id="btn-1" onClick={() => setLoginModal(true)} >Login</button>
                    <button type="submit" id="btn-2" onClick={() => setCreateAccountModal(true)}>Create an account</button>
                </div>
            </div>
            {/* modal for Login */}

            <Modal
                isOpen={isLoginModalOpen}
                style={customStyles}
            >
                <button className='btn float-end cut-btn' onClick={() => setLoginModal(false)}>X</button>
                <div >
                    <div className='form-container'>
                        <form className='login-form'>
                            <h2 className='title'>Login</h2>
                            <div className='input-field'>
                                <i className='fas fa-envelope'></i>
                                <input type='Email' name='email' value={userLogin.email} placeholder='Enter your Email' onChange={handleChangeLogin} />
                            </div>
                            <div className='input-field'>
                                <i className='fas fa-lock'></i>
                                <input type='password' name='password' value={userLogin.password} placeholder='Password' onChange={handleChangeLogin} />
                            </div>
                            <input className='btn1 solid' type='submit' value='Login' onClick={login}  />
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
                                New Here ?
                                <button type="button"
                                    onClick={() => {
                                        setCreateAccountModal(true)
                                        setLoginModal(false)
                                    }}
                                    style={{ border: 'none', background: 'none', marginLeft: '5px' }}>
                                    Create a new account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* modal for create an account */}

            <Modal
                isOpen={isCreateAccountModalOpen}
                style={customStyles}
            >
                <button className='btn float-end cut-btn' onClick={() => setCreateAccountModal(false)}>X</button>
                <div >
                    <div className='form-container'>
                        <form className='login-form'>
                            <h2 className='title'>Create an account</h2>
                            <div className='input-field'>
                                <i className='fas fa-user'></i>
                                <input type='text' name='name' value={userRegister.name} placeholder='Username' onChange={handleChangeRegister} />
                            </div>
                            <div className='input-field'>
                                <i className='fas fa-envelope'></i>
                                <input type='text' name='email' value={userRegister.email} placeholder='Enter Valid Email' onChange={handleChangeRegister} />
                            </div>
                            <div className='input-field'>
                                <i className='fas fa-lock'></i>
                                <input type='password' name='password' value={userRegister.password} placeholder='Enter Your Password' onChange={handleChangeRegister} />
                            </div>
                            <div className='input-field'>
                                <i className='fas fa-lock'></i>
                                <input type='password' name='reEnterPassword' value={userRegister.reEnterPassword} placeholder='Conform Your Password' onChange={handleChangeRegister} />
                            </div>
                            <input className='btn1 solid' type='submit' value='Create Account' onClick={registerUser} />
                            <p className='social-text'>Or Sign In with Social Platforms</p>
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
                                <button type="button"
                                    onClick={() => {
                                        setCreateAccountModal(false)
                                        setLoginModal(true)
                                    }}
                                    style={{ border: 'none', background: 'none' , marginLeft: '5px' }}>
                                    Here Click to Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
