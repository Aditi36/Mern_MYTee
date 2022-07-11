import React, { Fragment } from 'react'
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom'
import { signout, isAutheticated } from '../auth/helper'



const Menu = () => {
    const history = useHistory();
    return (
        <div>
            <ul className='nav nav-tabs bg-dark'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/cart'>
                        Cart
                    </Link>
                </li>


                {isAutheticated() && isAutheticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/user/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                   
                )}
                {isAutheticated() && isAutheticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}
                {!isAutheticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link

                                className="nav-link"
                                to="/signup"
                            >
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link

                                className="nav-link"
                                to="/signin"
                            >
                                Sign In
                            </Link>
                        </li>
                    </Fragment>
                )}
                {isAutheticated() && (<li className='nav-item'>
                    <span className='nav-link text-warning'
                        onClick={() => {
                            signout(() => {
                                history.push("/");
                            });

                        }} >
                        Signout
                    </span>
                </li>)}
            </ul>
        </div>
    )
}

export default withRouter(Menu)