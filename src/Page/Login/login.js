import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import Service from './../../services/request'
import {Link, Redirect} from 'react-router-dom'
import './customlogin.css'
function LoginUser() {

    const [data, setData] = useState({username: '', password: ''})
    const [textData, setTextData] = useState('')
    const dispatch = useDispatch()

    function ForgotPassword(e){
        // window.sweetAlert(
        //     '',
        //     'Vui lòng liên hệ admin',
        //     '',
        //     5000,
        //     false
        // )

    }

    function handleLogin(e) {
        e.preventDefault()
        Service.send({
            method: 'post', path: '/User/loginUser', data,
        }).then(result => {
            if (result) {
                const {statusCode, data, message} = result

                if (statusCode === 200) {
                    dispatch(({type: 'USER_LOGIN', data: data}))
                    setTimeout(() => {
                        window.location.href = "/"

                    }, 500)
                } else {
                    window.sweetAlert(
                        '',
                        message || 'Mật khẩu hoặc tài khoản không đúng',
                        'warning'
                    )
                }

            } else {
                window.sweetAlert(
                    '',
                    'Mật khẩu hoặc tài khoản không đúng',
                    'warning'
                )
            }

        })

    }


    useEffect(() => {

    }, [])

    return (
        <>
            <div class="containerLogin">

                <form class="login-form" onSubmit={(e) => handleLogin(e)}>
                    <div>
                        <label for="name">Tài khoản</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tài khoản"
                            autoComplete="new-password"
                            name="username"
                            onChange={(e) => {
                                e.preventDefault()
                                const {name, value} = e.target
                                setData({
                                    ...data,
                                    [name]: value
                                })
                            }}
                            value={data.username}
                            required
                        />
                    </div>

                    <div>
                        <label for="password" className='form-label'>Mật khẩu </label>
                        <input
                            id="password"
                            placeholder="password"
                            name="password"
                            onChange={(e) => {
                                e.preventDefault()
                                const {name, value} = e.target
                                setData({
                                    ...data,
                                    [name]: value
                                })
                            }}
                            type="password" value={data.password}

                            required
                        />
                    </div>
                    <div>
                    </div>
                    <button class="btn btn--form" type="submit" value="Log in">
                        Đăng nhập
                    </button>
                </form>
                <div className="res d-flex justify-content-between">
                    <a data-bs-toggle="modal" href="#exampleModalToggle" role="button" onClick={(e)=>ForgotPassword(e)} className="text-dark">Quên mật khẩu</a>
                    <Link to='/register' className="px-2">Đăng ký ngay</Link>
                </div>
            </div>
        </>
    )
}

export default LoginUser
