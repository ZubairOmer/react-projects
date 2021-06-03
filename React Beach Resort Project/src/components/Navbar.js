import React, { Component } from 'react'
import logo from '../images/logo.svg'
import { FaAlignRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import data from '../links'

export default class Navbar extends Component {
    state = {
        isOpen: false
    }

    handleToggle = () => {
        this.setState(pre => {
            return {
                isOpen: !pre.isOpen  // isOpen : !this.state.isOPen
            }
        })
    }

    render() {
        return (
            <div className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to='/'>
                            <img src={logo} alt="logo" />
                        </Link>
                        <button type='button' className="nav-btn" onClick={this.handleToggle}>
                            <FaAlignRight className='nav-icon' />
                        </button>
                    </div>
                    <ul className={this.state.isOpen ? 'nav-links show-nav' : 'nav-links'}>
                        {data.map((info, index) => (
                            <li key={index}>
                                <Link to={info.link}>{info.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
