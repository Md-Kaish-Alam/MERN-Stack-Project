import React from 'react'
import '../../Styles/header.css'
import Modal from 'react-modal'
import { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const responseFacebook = (response) => {
    console.log(response);
  }

export default function Header() {

    const [isLoginModalOpen, setLoginModal] = useState(false)

    return (
        <div>
            <div className='nav-container'>
                <div className='nav-right'>
                    <span className='dot'><span className='logo-write'>e!</span></span>
                </div>
                <div className='nav-left'>
                    <button type="submit" id="btn-1" onClick={() => setLoginModal(true)} >Login</button>
                    <button type="submit" id="btn-2">Create an account</button>
                </div>
            </div>
            {/* modal for login */}
            <Modal    
                isOpen={isLoginModalOpen}
                style={customStyles}
            >
                <h2>
                    Login
                    <button className='btn btn-danger float-end' onClick={() => setLoginModal(false)}>X</button>
                </h2>

                <form>
                    <input placeholder='Enter your email id' type='text'/> <br/>
                    <input placeholder='Enter your password' type='password'/> <br/>
                    <button>Login</button>
                </form>
                <br/>

                <FacebookLogin
                    appId="1097190134483535"
                    // autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook} 
                // cssClass='my-facebook-button-class'
                // icon='fa-facebook'
                // textButton='facebook'
                // icon={<TiSocialFacebookCircular />}
                // onClick={componentClicked}
                />,

                <GoogleLogin
                    clientId="979222837210-hq0jj219mgbeu212np7vn2jud33enn6c.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    // onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />,
                
            </Modal>

            {/* modal for create an account */}
        </div>
    )
}
