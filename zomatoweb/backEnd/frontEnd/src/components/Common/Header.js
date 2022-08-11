import React from 'react'
import '../../Styles/header.css'
import Modal from 'react-modal'
import { useState } from 'react'
import Login from './Login'
import Register from './Register'
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


export default function Header() {

    const [isLoginModalOpen, setLoginModal] = useState(false)
    const [isCreateAccountModalOpen, setCreateAccountModal] = useState(false)

    const navigate = useNavigate();

    return (
        <div>
            <div className='nav-container'>
                <div className='nav-right'>
                    <span className='dot'>
                        <span className='logo-write' onClick={() => navigate(`/`)}>
                            e!
                        </span>
                    </span>
                </div>
                <div className='nav-left'>
                    <button type="submit" id="btn-1" onClick={() => setLoginModal(true)} >Login</button>
                    <button type="submit" id="btn-2" onClick={() => setCreateAccountModal(true)}>Create an account</button>
                </div>
            </div>
            <Modal
                isOpen={isLoginModalOpen}
                style={customStyles}
            >
                <button className='btn float-end cut-btn' onClick={() => setLoginModal(false)}>X</button>
                <Login />
            </Modal>

            {/* modal for create an account */}

            <Modal
                isOpen={isCreateAccountModalOpen}
                style={customStyles}
            >
                <button className='btn float-end cut-btn' onClick={() => setCreateAccountModal(false)}>X</button>
                <Register />
            </Modal>
        </div>
    )
}
