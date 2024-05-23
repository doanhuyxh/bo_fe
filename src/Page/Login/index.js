import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Service from './../../services/request'
//import '../../styles/login.scss'
import './login.css'


function Login(props) {
    const {className, location} = props
    const search = location.search
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [data, setData] = useState({username: '', password: ''})
    const [isLoginBtn, setIsLoginBtn] = useState(false)
    const params = new URLSearchParams(search);
    const [data2, setData2] = useState({
        check: true,
        referUser: params.get("refer") || ""
    })

    function onChange(e) {
        const {value, name} = e.target
        setData2({
            ...data2,
            [name]: value
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        'Mật khẩu hoặc tài khoản không đúng',
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

    function isValidDate() {
        let check = true
        let message = 'Invalid parameters. Please try again.'
        // if(!captCha){
        //   message="Mã xác nhận"
        //   check = false
        // }

        if (!data2['firstName'] || data2['firstName'] === '') {
            message = "Nhập tên thật"
            check = false
        } else if (!data2['username'] || data2['username'] === '') {
            message = "Nhập tên tài khoản"
            check = false
        } else if (!data2['password'] || data2['password'] === '') {
            message = "Nhập mật khẩu"
            check = false
        } else if (!data2['phoneNumber'] || data2['phoneNumber'] === '') {
            message = "Số điện thoại di động"
            check = false
        } else if (!data2['confirm_password'] || data2['confirm_password'] === '') {
            message = "Nhập lại mật khẩu"
            check = false
        } else if (!data2['check'] || data2['check'] === '') {
            message = "Xác nhận rằng tôi đủ 18"
            check = false
        } else if (!data2['referUser'] || data2['referUser'] === '') {
            message = "Nhập người giới thiệu"
            check = false
        }

        if (data2['username'] && data2['username'].length < 5) {
            message = "Tên tài khoản phải hơn 6 ký tự"
        }

        if (check) {
            if (data2['password'] !== data2['confirm_password']) {
                check = false
                message = 'Mật khẩu với xác nhận mật khẩu không trùng khớp'
            }
            // else if (!validateEmail(data['email'])) {
            //   check = false
            //   message = 'Email không hợp lệ'
            // }
        }
        if (!check) {

            window.sweetAlert(
                '',
                message || 'Đã có lỗi xảy ra',
                'warning'
            )

        }
        return check
    }

    function successFake() {
        let time_start = 1;

       let inter = setInterval(() => {
            time_start++;
            if (time_start === 3) {
                clearInterval(inter)
                window.sweetAlert(
                    '',
                    'Tạo tài khoản thành công',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                    }, 1000)
            }
        }, 1200)
    }

    function handleLRegister(e) {
        e.preventDefault()
        if (isValidDate()) {
            const newData = {}
            Object.keys(data2).forEach(key => {
                if (key !== 'confirm_password' && key !== 'check') {

                    newData[key] = data2[key]
                }
            })


            Service.send({method: 'post', path: '/User/registerUser', data: newData}).then(result => {
                if (result) {
                    const {statusCode, message} = result;
                    if (statusCode === 200) {
                        window.sweetAlert(
                            '',
                            'Tạo tài khoản thành công',
                            'success'
                        )
                        setTimeout(() => {
                            window.location.reload()
                            }, 1000)
                    } else {
                        if (message === "DUPLICATE_USER") {
                            window.sweetAlert(
                                '',
                                'Tên đăng nhập không hợp lệ hoặc đã tồn tại',
                                'warning'
                            )
                        } else if (message === "INVALID_REFER_USER") {
                            window.sweetAlert(
                                '',
                                'Người giới thiệu không hợp lệ',
                                'warning'
                            )
                        } else {
                            window.sweetAlert(
                                '',
                                'Đăng ký thất bại',
                                'warning'
                            )
                        }
                    }
                } else {
                    window.sweetAlert(
                        '',
                        'Đăng ký thất bại',
                        'warning'
                    )
                }
            });

            //successFake()
        }
    }

    useEffect(() => {
        const bodyId = document.getElementById("body-root")
        bodyId.classList.remove("homePage");
        if (className !== '') {
            bodyId.classList.add(className)
        } else {
            bodyId.classList.toggle('id');
        }
        console.clear()
    }, [className])


    return (
        <>
            <div id="___gatsby" style={{overflow: "initial"}}>
                <div style={{outline: "none"}} tabIndex="-1" id="gatsby-focus-wrapper">
                    <div className="page page--vi">
                        <div className="Header-module--header--1vaKm">
                            <header className="page__container Header-module--headerContainer--1EnW6">
                                <div className="Header-module--headerWrap--3EnVQ">
                                    <div><a className="Header-module--logoLink--2QFfi" href="javascript:void(0)">
                                        <img src="/storage/meta.png" width={40} height={40}/>
                                    </a></div>
                                    <div className="Header-module--buttonsWrap--2OTYt">
                                        <div className="Header-module--platformButtons--1_2HH">
                                            <div className="Header-module--buttonRegister--3l-QI">
                                                <button
                                                    className="XHQn2sJxXR Uz0jT44lJw _4eCh2UvyMJ jWZ--g-v6R MDEQ7MStVE"
                                                    data-test="action-sign-up" type="button">
                                                    <div className="jqVNWOpUO0"
                                                         style={{
                                                             display: "flex",
                                                             padding: "4px 16px",
                                                             width: "100%",
                                                             maxHeight: "100%",
                                                             maxWidth: "100%",
                                                             alignItems: "center",
                                                             justifyContent: "center",
                                                             flexDirection: "row"
                                                         }}>
                                                        <div className="_4M4aiKoubi">
                                                            <div className="jqVNWOpUO0"
                                                                 onClick={handleShow}
                                                                 style={{
                                                                     display: "flex",
                                                                     width: "100%",
                                                                     alignItems: "center",
                                                                     justifyContent: "center",
                                                                     flexDirection: "row"
                                                                 }}>
                                                                <div className="-apDnR65N3 Rff1qLQkbm">
                                                                <span
                                                                    className="kzbPUgX-ru"
                                                                    data-align="center"
                                                                    data-size="S Compact"
                                                                    data-style="Bold"
                                                                    data-test="Text"
                                                                    style={{
                                                                        color: "inherit",
                                                                        display: "block"
                                                                    }}
                                                                >Đăng ký</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="MobileMenu-module--menuWrap--3uoMq">
                                            <div className="MobileMenu-module--menu--2Cxy1">
                                                <div className="MobileMenu-module--topWrap--bakHG"><a
                                                    href="javascript:void(0)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29"
                                                         viewBox="0 0 28 29" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M13.7657 17.805L5.86969 28.021C5.71969 28.217 5.85769 28.501 6.10569 28.501H21.8937C22.1417 28.501 22.2817 28.217 22.1317 28.021L14.2337 17.805C14.1157 17.651 13.8857 17.651 13.7657 17.805Z"
                                                              fill="white"></path>
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M5.46485 24.6839L9.37285 19.5619C9.46485 19.4439 9.44485 19.2779 9.33285 19.1759C7.53285 17.5559 6.55085 15.0499 7.20085 12.3099C7.79685 9.79585 9.84085 7.75585 12.3629 7.18385C16.9409 6.14785 21.0009 9.59985 21.0009 13.9999C21.0009 16.0619 20.0889 17.8959 18.6689 19.1759C18.5549 19.2779 18.5349 19.4439 18.6269 19.5639L22.5349 24.6839C22.6389 24.8199 22.8409 24.8459 22.9729 24.7339C25.9349 22.2579 27.8609 18.5819 27.9929 14.4499C28.2369 6.77985 21.9049 0.125854 14.2329 0.00185357C6.39485 -0.124146 0.000854492 6.18985 0.000854492 13.9999C0.000854492 18.3139 1.95685 22.1679 5.02685 24.7339C5.15885 24.8459 5.36085 24.8199 5.46485 24.6839Z"
                                                              fill="white"></path>
                                                    </svg>
                                                </a>
                                                    <div className="MobileMenu-module--closeIcon--27gGs">
                                                        <svg width="24" height="24" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M5.295 18.705a1.008 1.008 0 010-1.426L17.28 5.295a1.008 1.008 0 111.426 1.427L6.722 18.705a1.008 1.008 0 01-1.427 0z"
                                                                fill="#fff"></path>
                                                            <path
                                                                d="M18.705 18.705a1.008 1.008 0 01-1.426 0L5.295 6.722a1.008 1.008 0 111.427-1.427L18.705 17.28a1.008 1.008 0 010 1.426z"
                                                                fill="#fff"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <nav className="NavLinks-module--mobileNav--3COF5">
                                                    <div className="MobileDropDown-module--item--3Fm8J">
                                                        <button
                                                            className="MobileDropDown-module--mainItem--2wNxb MobileDropDown-module--active--hHKhE">
                                                            <a className="NavLinks-module--item--33JGK"
                                                               data-trans="trading"
                                                               href="javascript:void(0)">Giao
                                                                dịch</a><span
                                                            className="MobileDropDown-module--arrow--Uzbva MobileDropDown-module--active--hHKhE"></span>
                                                        </button>
                                                        <div className="MobileDropDown-module--listWrap--2XEN9"
                                                             style={{height: "auto"}}>
                                                            <ul className="MobileDropDown-module--list--2j4v0">
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="stocks"
                                                                        href="javascript:void(0)">Cổ
                                                                        phiếu</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="forex"
                                                                        href="javascript:void(0)">Forex</a>
                                                                </li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="fixed_time"
                                                                        href="javascript:void(0)">Fixed
                                                                        Time</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="quickler"
                                                                        href="javascript:void(0)">Quickler</a>
                                                                </li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="account"
                                                                        href="javascript:void(0)">Tài
                                                                        khoản</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="MobileDropDown-module--item--3Fm8J">
                                                        <button className="MobileDropDown-module--mainItem--2wNxb"><a
                                                            className="NavLinks-module--item--33JGK"
                                                            data-trans="trading_apps"
                                                            href="javascript:void(0)">Ứng dụng
                                                            giao
                                                            dịch</a><span
                                                            className="MobileDropDown-module--arrow--Uzbva"></span>
                                                        </button>
                                                        <div className="MobileDropDown-module--listWrap--2XEN9"
                                                             style={{height: "0px"}}>
                                                            <ul className="MobileDropDown-module--list--2j4v0">
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="desktop"
                                                                        href="javascript:void(0)">Máy
                                                                        tính</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="android"
                                                                        href="javascript:void(0)">Android</a>
                                                                </li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK NavLinks-module--capitalize--3_9Ce"
                                                                        data-trans="apk"
                                                                        href="javascript:void(0)">APK</a>
                                                                </li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK NavLinks-module--capitalize--3_9Ce"
                                                                        data-trans="pwa"
                                                                        href="javascript:void(0)">PWA</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="MobileDropDown-module--item--3Fm8J">
                                                        <button className="MobileDropDown-module--mainItem--2wNxb"><a
                                                            className="NavLinks-module--item--33JGK"
                                                            data-trans="site_about_company"
                                                            href="javascript:void(0)">Giới thiệu về
                                                            chúng
                                                            tôi</a><span
                                                            className="MobileDropDown-module--arrow--Uzbva"></span>
                                                        </button>
                                                        <div className="MobileDropDown-module--listWrap--2XEN9"
                                                             style={{height: "0px"}}>
                                                            <ul className="MobileDropDown-module--list--2j4v0">
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="stocksup_assets"
                                                                        href="javascript:void(0)">Tài
                                                                        sản</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="contacts_breadcrumb"
                                                                        href="javascript:void(0)">Thông
                                                                        tin liên hệ</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="social_page_nav_link"
                                                                        href="javascript:void(0)">Mạng
                                                                        xã hội</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="awards"
                                                                        href="javascript:void(0)">Giải
                                                                        thưởng</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="MobileDropDown-module--item--3Fm8J">
                                                        <button className="MobileDropDown-module--mainItem--2wNxb">Trợ
                                                            giúp<span
                                                                className="MobileDropDown-module--arrow--Uzbva"></span>
                                                        </button>
                                                        <div className="MobileDropDown-module--listWrap--2XEN9"
                                                             style={{height: "0px"}}>
                                                            <ul className="MobileDropDown-module--list--2j4v0">
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="user_tpl_support"
                                                                        href="javascript:void(0)">Hỗ
                                                                        trợ</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="faq_breadcrumb"
                                                                        href="javascript:void(0)">Câu
                                                                        hỏi
                                                                        thường gặp</a></li>
                                                                <li className="MobileDropDown-module--listItem--3dLO-">
                                                                    <a
                                                                        className="NavLinks-module--item--33JGK"
                                                                        data-trans="ct_helpcenter_title"
                                                                        href="javascript:void(0)">Trung
                                                                        tâm Trợ giúp</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </nav>
                                                <button className="MobileMenu-module--buttonLogin--1myGD">
                                                    <span>Đăng nhập</span>
                                                </button>
                                                <div className="LanguageSelect-module--dropdownWrap--3pboR">
                                                    <button className="LanguageSelect-module--button--TGRGY">
                                                        <svg className="SvgIcon-module-host-3SE" viewBox="0 0 24 24"
                                                             role="presentation"
                                                             focusable="false" aria-hidden="true">
                                                            <path
                                                                d="M17.6 2H6.4C4 2 2 4 2 6.4v11.2C2 20 4 22 6.4 22h11.2c2.4 0 4.4-2 4.4-4.4V6.4C22 4 20 2 17.6 2z"
                                                                fill="#FB4B4E"></path>
                                                            <path
                                                                d="M12.2 7.7l1 3 3.2.1c.2 0 .3.2.1.4L14 13l1 3c0 .2-.1.4-.3.3l-2.6-2-2.6 2c-.2 0-.4 0-.3-.2l1-3.1-2.6-2c-.2 0-.1-.3 0-.3h3.3l1-3c0-.2.3-.2.4 0z"
                                                                fill="#FFE15A"></path>
                                                        </svg>
                                                        <span
                                                            className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ">vi</span><span
                                                        className="LanguageSelect-module--dropdownArrow--13Z2m"></span>
                                                    </button>
                                                    <div className="LanguageSelect-module--dropdown--1m69r">
                                                        <ul className="LanguageSelect-module--localesDropdownList--b7ify">
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.6 22H6.4C4 22 2 20 2 17.6V6.4C2 4 4 2 6.4 2h11.2C20 2 22 4 22 6.4v11.2c0 2.4-2 4.4-4.4 4.4z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M2 6.5v.8l3.1 2H2v1.1h8.4V2h-1v6.4L2.7 4c-.3.4-.5.9-.6 1.3L2 6.5zM2.7 20l-.4-.8-.3-1v-1.6l3.1-2H2v-1h8.4V22h-1v-6.4L2.7 20zM22 16.7v1l-.2 1c0 .5-.3 1-.5 1.3l-6.7-4.4V22h-1v-8.4H22v1h-3.1l3.1 2zM21.3 4l.4.8.3 1v1.6l-3.1 2H22v1h-8.4V2h1v6.4L21.3 4z"
                                                                            fill="#F6F6F6"></path>
                                                                        <path
                                                                            d="M13.6 2h-3.2v8.4H2v3.2h8.4V22h3.2v-8.4H22v-3.2h-8.4V2zM7.4 14.6L2 18.1c0 .4.2.8.3 1.1l7-4.6H7.4zm14.4 4.2l-6.3-4.2h1.9l4.6 3c0 .4 0 .8-.2 1.2zM8.3 9.4l-6.2-4-.1 1v.1l4.4 2.9h2zM22 5.9l-5.4 3.5h-2l7.1-4.6.3 1z"
                                                                            fill="#FB4B4E"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> en </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.625 2H6.375C3.95875 2 2 3.95875 2 6.375V12H22V6.375C22 3.95875 20.0413 2 17.625 2Z"
                                                                            fill="#FB4B4E"></path>
                                                                        <path
                                                                            d="M2 17.625C2 20.0413 3.95875 22 6.375 22H17.625C20.0413 22 22 20.0413 22 17.625V12H2V17.625Z"
                                                                            fill="#F6F6F6"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> id </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M18 2H6c-2.2.2-4 2-4 4.4v2.3h20V6.4C22 4 20.2 2.2 18 2z"
                                                                            fill="#FAB446"></path>
                                                                        <path
                                                                            d="M2 17.6C2 20 3.8 21.8 6 22h12c2.2-.2 4-2 4-4.4v-2.3H2v2.3z"
                                                                            fill="#73AF00"></path>
                                                                        <path d="M22 8.7H2v6.6h20V8.7z"
                                                                              fill="#F6F6F6"></path>
                                                                        <path
                                                                            d="M12 14.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6zm0-4.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M12 12.3a.3.3 0 1 0 0-.6.3.3 0 0 0 0 .6z"
                                                                            fill="#2841C1"></path>
                                                                        <path d="M12 12l-.7.1H10V12l1.4-.1h.7v.1z"
                                                                              fill="#2841C1"></path>
                                                                        <path d="M12 12l.7.1H14V12l-1.4-.1H12v.1z"
                                                                              fill="#2841C1"></path>
                                                                        <path d="M12 12l-.1-.7V10h.1l.1 1.4v.7H12z"
                                                                              fill="#2841C1"></path>
                                                                        <path
                                                                            d="M12 12l-.1.7V14h.1l.1-1.4V12H12zM12 12l-.5-.4-1-1 1.1.9.4.5z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M12 12l.4.5 1 1-.9-1.1-.5-.4zM12 12l.4-.5 1-1-.9 1.1-.5.4zM12 12l-.5.4-1 1 1.1-.9.4-.5z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M12 12l-.6.3-1.3.5 1.3-.6.6-.2zM12 12l.6-.2 1.3-.6-1.3.5-.6.3zM12 12l-.3-.6-.5-1.3.6 1.3.2.6z"
                                                                            fill="#2841C1"></path>
                                                                        <path d="M12 12l.2.6.6 1.3-.5-1.3-.3-.6z"
                                                                              fill="#2841C1"></path>
                                                                        <path
                                                                            d="M12 12l-.6-.2-1.3-.6 1.3.5.6.3zM12 12l.6.3 1.3.5-1.3-.6-.6-.2z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M12 12l.2-.6.6-1.3-.5 1.3-.3.6zM12 12l-.3.6-.5 1.3.6-1.3.2-.6z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M12 12.3a.3.3 0 1 0 0-.6.3.3 0 0 0 0 .6z"
                                                                            fill="#F5F5F5"></path>
                                                                        <path
                                                                            d="M12 12.2a.2.2 0 1 0 0-.4.2.2 0 0 0 0 .4z"
                                                                            fill="#2841C1"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> hi </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.9304 2H6.06961C3.79586 2.15701 2 4.05289 2 6.36896V8.66672H22V6.36896C22 4.05289 20.2041 2.15701 17.9304 2Z"
                                                                            fill="#F6F6F6"></path>
                                                                        <path
                                                                            d="M2 17.6311C2 19.9472 3.7959 21.8431 6.06965 22H17.9304C20.2041 21.8431 22 19.9472 22 17.6311V15.3333H2V17.6311Z"
                                                                            fill="#FB4B4E"></path>
                                                                        <path d="M22 8.66663H2V15.3332H22V8.66663Z"
                                                                              fill="#2841C1"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> ru </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <g clip-path="url(#clip0123123)">
                                                                            <path
                                                                                d="M2.16797 5.16406C2.05859 5.54688 2 5.95312 2 6.375V8.32031H22V6.375C22 5.95703 21.9414 5.55078 21.832 5.16406H2.16797Z"
                                                                                fill="#F6F6F6"></path>
                                                                            <path
                                                                                d="M2 17.6251C2 18.043 2.05859 18.4493 2.16797 18.836H21.8281C21.9375 18.4532 21.9961 18.0469 21.9961 17.6251V15.6797H2V17.6251Z"
                                                                                fill="#F6F6F6"></path>
                                                                            <path
                                                                                d="M6.13698 22.0115H18.1989C20.0901 21.8825 21.6594 20.588 22.164 18.8516H2.16797C2.67651 20.5919 4.24186 21.8825 6.13698 22.0115Z"
                                                                                fill="#FB4B4E"></path>
                                                                            <path
                                                                                d="M18.1989 2.01166H6.13691C4.24577 2.14072 2.67644 3.4352 2.17188 5.17161H22.1679C21.6593 3.43129 20.094 2.14072 18.1989 2.01166Z"
                                                                                fill="#FB4B4E"></path>
                                                                            <path d="M22 8.32025H2V15.6796H22V8.32025Z"
                                                                                  fill="#2841C1"></path>
                                                                        </g>
                                                                        <defs>
                                                                            <clippath id="clip0123123">
                                                                                <rect width="20" height="20"
                                                                                      fill="white"
                                                                                      transform="translate(2 2)"></rect>
                                                                            </clippath>
                                                                        </defs>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> th </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.625 2H6.375C3.95875 2 2 3.95875 2 6.375V17.625C2 20.0413 3.95875 22 6.375 22H17.625C20.0413 22 22 20.0413 22 17.625V6.375C22 3.95875 20.0413 2 17.625 2Z"
                                                                            fill="#73AF00"></path>
                                                                        <path
                                                                            d="M20.1638 11.9998L11.9999 3.83588L3.83599 11.9998L11.9999 20.1637L20.1638 11.9998Z"
                                                                            fill="#FFE15A"></path>
                                                                        <path
                                                                            d="M12.0001 15.3836C13.8688 15.3836 15.3837 13.8687 15.3837 12C15.3837 10.1313 13.8688 8.61639 12.0001 8.61639C10.1313 8.61639 8.61646 10.1313 8.61646 12C8.61646 13.8687 10.1313 15.3836 12.0001 15.3836Z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M9.09664 10.2691C8.93699 10.5363 8.81375 10.8268 8.7323 11.1352C10.608 10.994 13.3828 11.5188 15.1489 13.2325C15.2641 12.9382 15.3402 12.6248 15.3688 12.2971C13.5452 10.7624 11.0241 10.2166 9.09664 10.2691Z"
                                                                            fill="#F5F5F5"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> pt </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.6 2H6.4C5 2 3.9 2.6 3 3.4H21c-.8-.8-2-1.4-3.3-1.4z"
                                                                            fill="#FF4B55"></path>
                                                                        <path
                                                                            d="M20.9 3.4H3L2.3 5h19.4c-.2-.6-.5-1-.8-1.5z"
                                                                            fill="#F6F6F6"></path>
                                                                        <path
                                                                            d="M21.7 4.9H2.3c-.2.4-.3.9-.3 1.4h20c0-.5-.1-1-.3-1.4z"
                                                                            fill="#FF4B55"></path>
                                                                        <path d="M2 6.3v1.4h20V6.4v-.1H2z"
                                                                              fill="#F6F6F6"></path>
                                                                        <path d="M22 7.7H2v1.4h20V7.7z"
                                                                              fill="#FF4B55"></path>
                                                                        <path d="M22 9.1H2v1.5h20V9z"
                                                                              fill="#F6F6F6"></path>
                                                                        <path d="M22 10.6H2V12h20v-1.4z"
                                                                              fill="#FF4B55"></path>
                                                                        <path d="M2 12.5h.5v1H22V12H2v.5z"
                                                                              fill="#F6F6F6"></path>
                                                                        <path d="M2.5 12.5H2V15h20v-1.5H2.5v-.9z"
                                                                              fill="#FF4B55"></path>
                                                                        <path d="M22 14.9H2v1.4h20v-1.4z"
                                                                              fill="#F6F6F6"></path>
                                                                        <path d="M2 17.6v.1h20v-1.4H2v1.3z"
                                                                              fill="#FF4B55"></path>
                                                                        <path
                                                                            d="M2.3 19.1h19.4c.2-.4.3-.9.3-1.4H2c0 .5.1 1 .3 1.4z"
                                                                            fill="#F6F6F6"></path>
                                                                        <path
                                                                            d="M3.1 20.6H21l.8-1.5H2.3c.2.6.5 1 .8 1.5z"
                                                                            fill="#FF4B55"></path>
                                                                        <path
                                                                            d="M6.4 22h11.2c1.3 0 2.5-.6 3.3-1.4H3c.8.8 2 1.4 3.3 1.4z"
                                                                            fill="#F6F6F6"></path>
                                                                        <path d="M13.4 2h-7C4 2 2 4 2 6.4v7h11.4V2z"
                                                                              fill="#2841C1"></path>
                                                                        <path
                                                                            d="M4.5 7.7A3 3 0 0 1 8.7 5s.1 0 0-.1a3.5 3.5 0 0 0-5.4 2.7 3.5 3.5 0 0 0 5.5 3.1 3 3 0 0 1-4.3-2.8z"
                                                                            fill="#FFE15A"></path>
                                                                        <path
                                                                            d="M11.5 7.7l1.3-.5v-.1l-1.4.1 1-1-.2-.1-1.2.7.5-1.3c0-.1-.1-.1-.1 0l-.8 1-.2-1.3h-.1L10 6v.5l-.8-1.2h-.1l.4 1.4L8.4 6h-.1l1 1.1-1.4-.1c-.1 0-.1 0 0 .1l1.2.5-1.3.5v.1h1.5l-1 1 1.3-.7-.4 1.4L10 9l.1.5.2.8c0 .1 0 .1 0 0l.3-1.3.8 1.1-.4-1.4 1.2.7h.1l-1-1h1.5l-1.3-.6z"
                                                                            fill="#FFE15A"></path>
                                                                        <defs>
                                                                            <clippath id="clip0">
                                                                                <path fill="#fff"
                                                                                      transform="translate(2 2)"
                                                                                      d="M0 0h20v20H0z"></path>
                                                                            </clippath>
                                                                        </defs>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> ms </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.6 2H6.4C4 2 2 4 2 6.4v11.2C2 20 4 22 6.4 22h11.2c2.4 0 4.4-2 4.4-4.4V6.4C22 4 20 2 17.6 2z"
                                                                            fill="#FB4B4E"></path>
                                                                        <path
                                                                            d="M6.4 10.3a3.1 3.1 0 0 0 4.8 2.6h.1c-.7.8-1.7 1.3-2.8 1.3a3.9 3.9 0 1 1 2.8-6.6s0 .1-.1 0a3.1 3.1 0 0 0-4.8 2.6zm7-.6L13 9h-.1v1l-1 .4v.1l1 .3v1s0 .1.1 0l.6-.8 1 .3-.6-.9.6-.8s0-.1 0 0l-1 .2z"
                                                                            fill="#F6F6F6"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> tr </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <g clip-path="url(#clip0000234)">
                                                                            <path
                                                                                d="M17.625 2H8.20691V8.67027H22V6.375C22 3.95875 20.0412 2 17.625 2Z"
                                                                                fill="#73AF00"></path>
                                                                            <path
                                                                                d="M8.20691 22H17.625C20.0412 22 22 20.0413 22 17.625V15.3297H8.20691V22Z"
                                                                                fill="#3A3B43"></path>
                                                                            <path
                                                                                d="M22 8.67029H8.20703V15.3297H22V8.67029Z"
                                                                                fill="#F6F6F6"></path>
                                                                            <path
                                                                                d="M8.20691 8.67027V2H6.375C3.95875 2 2 3.95875 2 6.375V17.625C2 20.0413 3.95875 22 6.375 22H8.20691V15.3297V8.67027Z"
                                                                                fill="#FB4B4E"></path>
                                                                        </g>
                                                                        <defs>
                                                                            <clippath id="clip0000234">
                                                                                <rect width="20" height="20"
                                                                                      fill="white"
                                                                                      transform="translate(2 2)"></rect>
                                                                            </clippath>
                                                                        </defs>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> ar </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.6 2H6.4C4 2 2 4 2 6.4v11.2C2 20 4 22 6.4 22h11.2c2.4 0 4.4-2 4.4-4.4V6.4C22 4 20 2 17.6 2z"
                                                                            fill="#FB4B4E"></path>
                                                                        <path d="M22 6.2H2v11.6h20V6.2z"
                                                                              fill="#FFE15A"></path>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                              d="M7 9.5h-.3c-.3 0-.5.2-.5.4 0 .3.2.6.5.6s.5-.2.6-.4a.6.6 0 0 0 .6-.1.6.6 0 0 0 .6 0c0 .3.2.5.5.5s.6-.3.6-.6c0-.2-.3-.5-.6-.5h-.2c0-.2-.3-.3-.6-.3l-.3.1a.6.6 0 0 0-.4-.1c-.3 0-.5.1-.6.4zm.7.1l-.2.2-.2-.2s0-.2.2-.2l.2.2zm.4 0l.1.2.2-.2s0-.2-.2-.2l-.1.2zM6.3 11c-.2 0-.3.1-.3.3v2.3c0 .4.4 1.2 1.9 1.2 1.4 0 1.9-.8 1.9-1.2v-2.3c0-.2-.2-.3-.4-.3h-3zm4.8.3h-.8v3h.8v-3zm-6.5 0h.8v3h-.8v-3zM9 9.8l-.2.1.2.2c.1 0 .2 0 .2-.2L9 9.8zm-2.5.1l.2-.1.2.1c0 .1 0 .2-.2.2 0 0-.2 0-.2-.2z"
                                                                              fill="#F5F5F5"></path>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                              d="M7.7 9H8v1h-.4V9zM9 10.5H6.7v.4H9v-.4zm2.3.4H10v.3h1.2V11zM6 12.7h1.9v.8c0 .5-.4 1-1 1a1 1 0 0 1-1-1v-.8zm-1.6 1.4h1.2v.3H4.4v-.3zM5.6 11H4.4v.3h1.2V11zm4.6 3h1v.4h-1v-.3z"
                                                                              fill="#FAB446"></path>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                              d="M6.3 10.3l.4.3H9l.4-.3-.2-.2a2 2 0 0 0-1.3-.5 2 2 0 0 0-1.3.5l-.3.2zM4.4 12H5l-.3-1.3c0-.1 0-.2.2-.2h.2c.2 0 .3 0 .2.2L5 12h1v-.7c0-.2.1-.3.3-.3H8v1.7h1.9v.8c0 .5-.4 1-1 1a1 1 0 0 1-1-1v-.8H6v-.3H4.4V12zm5 0h1.3l-.3-1.3c0-.1 0-.2.2-.2h.2c.2 0 .3 0 .2.2l-.3 1.3h.6v.4h-2V12zm.7 1l1.2.4V13l-1.2-.4v.4zm-2.6-.3v1.6a1 1 0 0 1-.4.1v-1.7h.4zm-.8 1.7v-1.7h-.4v1.6l.4.1zm-1.1-1.3l-1.2.3V13l1.2-.4v.4z"
                                                                              fill="#C8414B"></path>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                              d="M7.5 11.3H6.3v.4h.2v.3h-.2v.4h1.2V12h-.2v-.3h.2v-.4z"
                                                                              fill="#FAB446"></path>
                                                                        <path d="M8 9.6h-.3v1H8v-1z"
                                                                              fill="#FFB441"></path>
                                                                        <path
                                                                            d="M9 13.4v.2l-.2.1-.2-.1v-.2H9zm.4-.3H8.2v.5c0 .3.3.5.6.5s.6-.2.6-.5V13z"
                                                                            fill="#FAB446"></path>
                                                                        <path
                                                                            d="M8.8 12.4a.4.4 0 0 1-.4-.4v-.3c0-.2.2-.4.4-.4s.4.2.4.4v.3c0 .2-.2.4-.4.4z"
                                                                            fill="#FFA0D2"></path>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                              d="M8.4 12.7c0 .3-.2.5-.5.5-.4 0-.6-.2-.6-.5s.2-.5.6-.5c.3 0 .5.2.5.5zm-2.6 1.7H4.2v.4h1.6v-.4zm5.7 0H10v.4h1.5v-.4z"
                                                                              fill="#5064AA"></path>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                              d="M7.1 10.5l.2-.2c0-.1 0-.2-.2-.2l-.2.2.2.2zm.8 0l.2-.2-.2-.2-.2.2s0 .2.2.2zm1-.2l-.3.2-.2-.2.2-.2.2.2z"
                                                                              fill="#FFD250"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> es </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M6.375 2C3.95875 2 2 3.95875 2 6.375V17.625C2 20.0413 3.95875 22 6.375 22H8.66668V2H6.375Z"
                                                                            fill="#2841C1"></path>
                                                                        <path d="M8.66577 2V22H15.3324V2H8.66577Z"
                                                                              fill="#F6F6F6"></path>
                                                                        <path
                                                                            d="M17.6259 2H15.3342V22H17.6259C20.0422 22 22.0009 20.0413 22.0009 17.625V6.375C22.0009 3.95875 20.0422 2 17.6259 2Z"
                                                                            fill="#FB4B4E"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> fr </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="LanguageSelect-module--languageDropdownButton--28Azb">
                                                                    <svg className="SvgIcon-module-host-3SE"
                                                                         viewBox="0 0 24 24"
                                                                         role="presentation" focusable="false"
                                                                         aria-hidden="true">
                                                                        <path
                                                                            d="M17.6 2H6.4C4 2 2 4 2 6.4v11.2C2 20 4 22 6.4 22h11.2c2.4 0 4.4-2 4.4-4.4V6.4C22 4 20 2 17.6 2z"
                                                                            fill="#F6F6F6"></path>
                                                                        <path
                                                                            d="M14 9.1c-1.7-1-3.8-.6-4.9 1A1.7 1.7 0 1 0 12 12a1.7 1.7 0 0 1 2.9 2c1-1.7.6-3.8-1-4.9z"
                                                                            fill="#FB4B4E"></path>
                                                                        <path
                                                                            d="M9.1 10a1.7 1.7 0 1 0 2.9 2 1.7 1.7 0 0 1 2.9 2A3.4 3.4 0 1 1 9 10z"
                                                                            fill="#2841C1"></path>
                                                                        <path
                                                                            d="M15.7 7.8l.6 1V9l-.2.1h-.3l-.6-1V8l.2-.1h.3zM16.6 9.3l.7 1v.2h-.5l-.6-1v-.2h.2c0-.1.2-.1.2 0zM16.3 7.4L18 9.8v.2l-.2.1h-.2l-1.6-2.4v-.3h.2c0-.1.2-.1.2 0zM17 7l.6.9V8l-.2.1h-.2l-.6-1V7l.2-.1h.2zM18 8.4l.6 1v.2h-.2c0 .1-.2.1-.2 0l-.7-1v-.2h.5zM7.2 13.5l1.6 2.4v.2l-.2.1h-.3l-1.6-2.4v-.3h.5zM6.5 14l.6.9v.2l-.2.1h-.2l-.6-1V14l.2-.1h.2zM7.5 15.4l.6 1v.2h-.2c0 .1-.2.1-.2 0l-.7-1v-.2h.5zM5.8 14.4l1.6 2.4v.2l-.2.1H7l-1.6-2.4v-.3h.2c0-.1.2-.1.2 0zM6.7 10.2l1.6-2.4h.4v.3l-1.5 2.4h-.4v-.3zM6 9.8l1.7-2.4c0-.1.1-.1.2 0h.2v.3L6.5 10h-.4v-.3zM5.4 9.3L7 7h.4v.3L5.8 9.6c0 .1-.1.1-.2 0h-.2v-.3zM15.2 15.9l.6-1h.4l.1.3-.6 1h-.4v-.3zM16.2 14.4l.6-1h.3l.1.1v.3l-.6 1h-.2l-.2-.1v-.3zM15.9 16.3l.6-1h.3l.1.1v.3l-.6 1h-.2l-.2-.1v-.3zM16.9 14.9l.6-1h.4v.3l-.6 1H17v-.3zM16.6 16.8l.6-1h.4v.3l-.6 1h-.4v-.3zM17.5 15.3l.7-1h.2l.2.1v.3l-.6 1h-.3l-.1-.1v-.3z"
                                                                            fill="#464655"></path>
                                                                    </svg>
                                                                    <span
                                                                        className="LanguageSelect-module--dropdownCurrentLocaleName--3lGxZ"> ko </span>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div
                                                    className="SocialButtons-module--socialButtons--2PXHr MobileMenu-module--menuSocial---Vtui">
                                                    <div className="SocialButtons-module--socialButtonsList--1JMc7"><a
                                                        className="SocialButton-module--socialButton--3d4kd"
                                                        href="javascript:void(0)" target="_blank"
                                                        rel="noreferrer">
                                                        <svg viewBox="0 0 32 32" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM17.668 16.7028V25.4077H14.0663V16.7031H12.2669V13.7034H14.0663V11.9024C14.0663 9.4552 15.0824 8 17.9691 8H20.3723V11.0001H18.8701C17.7464 11.0001 17.672 11.4193 17.672 12.2017L17.668 13.7031H20.3893L20.0709 16.7028H17.668Z"
                                                                  fill="#70808C"></path>
                                                        </svg>
                                                    </a><a className="SocialButton-module--socialButton--3d4kd"
                                                           href="javascript:void(0)"
                                                           target="_blank"
                                                           rel="noreferrer">
                                                        <svg viewBox="0 0 32 32" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM22.6668 10.4996C23.4011 10.7011 23.9794 11.2948 24.1757 12.0488C24.5324 13.4154 24.5324 16.2667 24.5324 16.2667C24.5324 16.2667 24.5324 19.1179 24.1757 20.4845C23.9794 21.2385 23.4011 21.8323 22.6668 22.0339C21.3359 22.4 15.999 22.4 15.999 22.4C15.999 22.4 10.6621 22.4 9.33119 22.0339C8.59684 21.8323 8.01851 21.2385 7.82225 20.4845C7.46569 19.1179 7.46569 16.2667 7.46569 16.2667C7.46569 16.2667 7.46569 13.4154 7.82225 12.0488C8.01851 11.2948 8.59684 10.7011 9.33119 10.4996C10.6621 10.1333 15.999 10.1333 15.999 10.1333C15.999 10.1333 21.3359 10.1333 22.6668 10.4996Z"
                                                                  fill="#70808C"></path>
                                                            <path
                                                                d="M14.3991 19.2V13.8667L18.6657 16.5335L14.3991 19.2Z"
                                                                fill="#70808C"></path>
                                                        </svg>
                                                    </a><a className="SocialButton-module--socialButton--3d4kd"
                                                           href="javascript:void(0)" target="_blank"
                                                           rel="noreferrer">
                                                        <svg viewBox="0 0 32 32" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM12.702 8.04833C13.5554 8.0095 13.8281 8 16.0007 8H15.9983C18.1716 8 18.4433 8.0095 19.2966 8.04833C20.1483 8.08733 20.73 8.22217 21.24 8.42C21.7666 8.62417 22.2116 8.8975 22.6567 9.3425C23.1017 9.78717 23.375 10.2335 23.58 10.7597C23.7767 11.2683 23.9117 11.8497 23.9517 12.7013C23.99 13.5547 24 13.8273 24 16C24 18.1727 23.99 18.4447 23.9517 19.298C23.9117 20.1493 23.7767 20.7308 23.58 21.2397C23.375 21.7657 23.1017 22.212 22.6567 22.6567C22.2121 23.1017 21.7665 23.3757 21.2405 23.58C20.7315 23.7778 20.1495 23.9127 19.2978 23.9517C18.4444 23.9905 18.1726 24 15.9998 24C13.8272 24 13.5547 23.9905 12.7014 23.9517C11.8499 23.9127 11.2684 23.7778 10.7594 23.58C10.2335 23.3757 9.78719 23.1017 9.34268 22.6567C8.89784 22.212 8.62451 21.7657 8.42 21.2395C8.22234 20.7308 8.0875 20.1495 8.04833 19.2978C8.00967 18.4445 8 18.1727 8 16C8 13.8273 8.01 13.5545 8.04817 12.7012C8.0865 11.8498 8.2215 11.2683 8.41984 10.7595C8.62484 10.2335 8.89818 9.78717 9.34318 9.3425C9.78785 8.89767 10.2342 8.62433 10.7604 8.42C11.269 8.22217 11.8504 8.08733 12.702 8.04833Z"
                                                                  fill="#70808C"></path>
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M20.5562 10.4213C19.9909 10.4213 19.5322 10.8794 19.5322 11.4449C19.5322 12.0102 19.9909 12.4689 20.5562 12.4689C21.1216 12.4689 21.5802 12.0102 21.5802 11.4449C21.5802 10.8796 21.1216 10.4209 20.5562 10.4209V10.4213ZM16.0002 11.9999C13.7911 12 12 13.7911 12 16.0003C12 18.2095 13.7911 19.9999 16.0003 19.9999C18.2095 19.9999 20 18.2095 20 16.0003C20 13.7911 18.2093 11.9999 16.0002 11.9999ZM13.75 16.0001C13.75 14.7574 14.7575 13.7499 16.0001 13.7499C17.2428 13.7499 18.25 14.7574 18.25 16.0001C18.25 17.2428 17.2428 18.2499 16.0002 18.2499C14.7575 18.2499 13.75 17.2428 13.75 16.0001Z"
                                                                  fill="#70808C"></path>
                                                        </svg>
                                                    </a><a className="SocialButton-module--socialButton--3d4kd"
                                                           href="javascript:void(0)" target="_blank"
                                                           rel="noreferrer">
                                                        <svg viewBox="0 0 32 32" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM13.067 23.3333L13.3392 19.2548L13.339 19.2547L20.7582 12.5593C21.0838 12.2703 20.6871 12.1294 20.2549 12.3915L11.0985 18.1682L7.1434 16.9338C6.28928 16.6722 6.28315 16.0853 7.33516 15.6634L22.7472 9.72056C23.4511 9.40099 24.1305 9.88963 23.8617 10.967L21.2371 23.3354C21.0538 24.2143 20.5227 24.4245 19.7869 24.0185L15.7888 21.0646L13.867 22.9333C13.8609 22.9392 13.8549 22.9451 13.8489 22.9509C13.6339 23.1602 13.4561 23.3333 13.067 23.3333Z"
                                                                  fill="#70808C"></path>
                                                        </svg>
                                                    </a><a className="SocialButton-module--socialButton--3d4kd"
                                                           href="javascript:void(0)"
                                                           target="_blank" rel="noreferrer">
                                                        <svg viewBox="0 0 32 32" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM11.633 22.7173L8.60518 23.5116L9.41335 20.5595L9.22314 20.2568C8.42233 18.9831 7.99938 17.5109 8 15.9993C8.00175 11.5885 11.5906 8 16.0033 8C18.1401 8.00074 20.1487 8.83392 21.6591 10.3461C23.1695 11.8582 24.0008 13.8682 24 16.0058C23.9982 20.417 20.4095 24.0058 16.0001 24.0058H15.9969C14.5614 24.0052 13.1534 23.6196 11.9251 22.8907L11.633 22.7173ZM20.8492 18.2951C20.8008 18.2144 20.6875 18.1597 20.5198 18.0786C20.4791 18.0589 20.4352 18.0377 20.3883 18.0142C20.1478 17.8938 18.9654 17.3121 18.7449 17.2318C18.5245 17.1515 18.3641 17.1114 18.2038 17.3521C18.0435 17.5929 17.5826 18.1346 17.4423 18.2951C17.302 18.4556 17.1617 18.4757 16.9213 18.3553C16.882 18.3357 16.8285 18.3124 16.7624 18.2838L16.7623 18.2837C16.4237 18.1369 15.7558 17.8472 14.9872 17.1616C14.2723 16.5239 13.7896 15.7364 13.6493 15.4956C13.509 15.2548 13.6344 15.1247 13.7548 15.0048C13.8268 14.933 13.9095 14.8323 13.9923 14.7315C14.0338 14.6809 14.0753 14.6304 14.1155 14.5834C14.2177 14.4641 14.262 14.3737 14.3222 14.2508L14.3222 14.2508C14.3329 14.2291 14.344 14.2063 14.356 14.1823C14.4362 14.0217 14.3961 13.8813 14.336 13.7609C14.2957 13.6804 14.0671 13.1237 13.8601 12.6199L13.86 12.6195C13.7577 12.3705 13.6607 12.1344 13.5945 11.9752C13.4221 11.5612 13.2474 11.5622 13.1072 11.563C13.0886 11.5631 13.0707 11.5632 13.0534 11.5623C12.9132 11.5553 12.7527 11.5538 12.5924 11.5538C12.4321 11.5538 12.1715 11.614 11.9511 11.8548C11.937 11.8702 11.9212 11.8871 11.904 11.9054C11.6536 12.1727 11.1094 12.7533 11.1094 13.8611C11.1094 15.0387 11.9622 16.1766 12.0895 16.3464L12.0914 16.349C12.0993 16.3595 12.1134 16.3797 12.1335 16.4086L12.1335 16.4087C12.4215 16.8217 13.9452 19.0069 16.1998 19.9804C16.7736 20.2282 17.2215 20.3762 17.5708 20.487C18.1469 20.6701 18.6713 20.6443 19.0856 20.5823C19.5477 20.5133 20.5085 20.0006 20.709 19.4388C20.9093 18.8769 20.9093 18.3954 20.8492 18.2951Z"
                                                                  fill="#70808C"></path>
                                                        </svg>
                                                    </a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                        </div>
                        <div className="page-main">
                            <section className="p-home-m-welcome p-home__section page__container">
                                <div className="p-home-m-welcome__content"><h1 data-trans="home_welcome_title"
                                                                               className="page-c-title p-home-m-welcome__title">Khả
                                    năng
                                    sinh lời trên đà tăng</h1>
                                    <p className="com-c-description p-home-m-welcome__desc"
                                       data-trans="home_welcome_desc">Sàn giao dịch
                                        hỗ trợ mục tiêu tài chính của&nbsp;bạn.</p>
                                    <button
                                        className="KkOkCWm15q com-c-button com-c-button_color_accent p-home-c-button-desktop p-home-m-devices__button"
                                        data-trans="home_start_trading" type="button" data-test="home-page-welcome" onClick={()=>setShow(true)}>Bắt
                                        đầu
                                        giao
                                        dịch – <span data-trans="home_start_trading_free"
                                                     className="p-home-c-button-desktop__extra-text">Miễn phí</span>
                                    </button>
                                </div>
                                <div className="p-home-m-welcome__img">
                                    <div data-gatsby-image-wrapper=""
                                         className="gatsby-image-wrapper gatsby-image-wrapper-constrained p-home-m-welcome__img-content">
                                        <div style={{maxWidth: "1124px", display: "block"}}>
                                            <img alt="" role="presentation"
                                                 aria-hidden="true"
                                                 src="data:image/svg+xml;charset=utf-8,%3Csvg height=&#39;783&#39; width=&#39;1124&#39; xmlns=&#39;http://www.w3.org/2000/svg&#39; version=&#39;1.1&#39;%3E%3C/svg%3E"
                                                 style={{maxWidth: "100%", display: "block", position: "static"}}/>
                                        </div>
                                        <div aria-hidden="true" data-placeholder-image=""
                                             style={{
                                                 opacity: 0,
                                                 transition: "opacity 500ms linear 0s",
                                                 backgroundColor: "transparent",
                                                 position: "absolute",
                                                 inset: "0px"
                                             }}></div>
                                        <picture>
                                            <source type="image/webp"
                                                    srcSet="/s5/static/bf97d2705ae65fb392d6913738031d4c/c9b31/desktop.webp 233w,/s5/static/bf97d2705ae65fb392d6913738031d4c/a2db5/desktop.webp 465w,/s5/static/bf97d2705ae65fb392d6913738031d4c/7bf23/desktop.webp 930w"
                                                    sizes="(min-width: 1124px) 1124px, 100vw"/>
                                            <img width="1124" height="783"
                                                 sizes="(min-width: 1124px) 1124px, 100vw" decoding="async"
                                                 loading="eager"
                                                 src="/s5/static/bf97d2705ae65fb392d6913738031d4c/06393/desktop.png"
                                                 srcSet="/s5/static/bf97d2705ae65fb392d6913738031d4c/c9b31/desktop.webp 233w,/s5/static/bf97d2705ae65fb392d6913738031d4c/a2db5/desktop.webp 465w,/s5/static/bf97d2705ae65fb392d6913738031d4c/7bf23/desktop.webp 930w"
                                                 alt="desktop"
                                                 style={{objectFit: "cover", opacity: "1"}}/>
                                        </picture>

                                    </div>
                                </div>
                            </section>
                            <section className="m-seo-numbers p-home__section m-seo-numbers--ltr">
                                <div className="page__container">
                                    <div className="m-seo-numbers__textcontent"></div>
                                    <ul className="m-seo-numbers__list m-seo-numbers__list--1">
                                        <li className="com-seo-numbers-item com-seo-numbers-item--l">
                                            <div className="com-seo-numbers-item__bg">
                                                <div data-gatsby-image-wrapper=""
                                                     className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                     style={{height: "100%", width: "100%"}}>
                                                    <div style={{maxWidth: "394px", display: "block"}}><img alt=""
                                                                                                            role="presentation"
                                                                                                            aria-hidden="true"
                                                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height=&#39;794&#39; width=&#39;394&#39; xmlns=&#39;http://www.w3.org/2000/svg&#39; version=&#39;1.1&#39;%3E%3C/svg%3E"
                                                                                                            style={{
                                                                                                                maxWidth: "100%",
                                                                                                                display: "block",
                                                                                                                position: "static"
                                                                                                            }}/>
                                                    </div>
                                                    <div aria-hidden="true" data-placeholder-image=""
                                                         style={{
                                                             opacity: 0,
                                                             transition: "opacity 500ms linear 0s",
                                                             backgroundColor: "transparent",
                                                             position: "absolute",
                                                             inset: "0px"
                                                         }}></div>
                                                    <picture>
                                                        <source type="image/webp"
                                                                srcSet="/s5/static/1bebd67e7439d00934b6bc66cbd3ce10/9ebfa/960.jpg 99w,/s5/static/1bebd67e7439d00934b6bc66cbd3ce10/414ba/960.jpg 197w,/s5/static/1bebd67e7439d00934b6bc66cbd3ce10/d3301/960.jpg 394w"
                                                                sizes="(min-width: 394px) 394px, 100vw"/>
                                                        <img width="394" height="794" data-main-image=""
                                                             sizes="(min-width: 394px) 394px, 100vw" decoding="async"
                                                             loading="lazy"
                                                             src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/960.jpg"
                                                             srcSet="/s5/static/1bebd67e7439d00934b6bc66cbd3ce10/9ebfa/960.jpg 99w,
/s5/static/1bebd67e7439d00934b6bc66cbd3ce10/414ba/960.jpg 197w,
/s5/static/1bebd67e7439d00934b6bc66cbd3ce10/d3301/960.jpg 394w" alt="planet"
                                                             style={{objectFit: "cover", opacity: "1"}}/>
                                                    </picture>
                                                    <noscript></noscript>
                                                </div>
                                            </div>
                                            <div className="com-seo-numbers-item__content">
                                                <div className="com-seo-numbers-item__icon"><img
                                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjA2MTg5IDExSDcuMDIzMjhDNy4xMjY0MyA4Ljc5NTk3IDcuNTY3OTggNi43ODE5MSA4LjI1Nzc2IDUuMjI5OUM4LjMxODAyIDUuMDk0MzEgOC4zODA2NCA0Ljk2MTIyIDguNDQ1NjEgNC44MzA5OUM2LjA5NDg1IDUuOTk4NzQgNC4zOTk5OSA4LjI4ODcgNC4wNjE4OSAxMVpNMTIgMkM2LjQ3NzE1IDIgMiA2LjQ3NzE1IDIgMTJDMiAxNy41MjI4IDYuNDc3MTUgMjIgMTIgMjJDMTcuNTIyOCAyMiAyMiAxNy41MjI4IDIyIDEyQzIyIDYuNDc3MTUgMTcuNTIyOCAyIDEyIDJaTTEyIDRDMTEuNzczMSA0IDExLjQ4MTYgNC4wOTkzIDExLjEzMjQgNC40MzE2NkMxMC43NzggNC43Njg5MiAxMC40MTM0IDUuMzA0MjIgMTAuMDg1NCA2LjA0MjE4QzkuNTIzOTIgNy4zMDU0NiA5LjEyNzM2IDkuMDMzNDcgOS4wMjU2NyAxMUgxNC45NzQzQzE0Ljg3MjYgOS4wMzM0NyAxNC40NzYxIDcuMzA1NDYgMTMuOTE0NiA2LjA0MjE4QzEzLjU4NjYgNS4zMDQyMiAxMy4yMjIgNC43Njg5MiAxMi44Njc2IDQuNDMxNjZDMTIuNTE4NCA0LjA5OTMgMTIuMjI2OSA0IDEyIDRaTTE2Ljk3NjcgMTFDMTYuODczNiA4Ljc5NTk3IDE2LjQzMiA2Ljc4MTkxIDE1Ljc0MjIgNS4yMjk5QzE1LjY4MiA1LjA5NDMxIDE1LjYxOTQgNC45NjEyMiAxNS41NTQ0IDQuODMwOTlDMTcuOTA1MiA1Ljk5ODc0IDE5LjYgOC4yODg3IDE5LjkzODEgMTFIMTYuOTc2N1pNMTQuOTc0MyAxM0g5LjAyNTY3QzkuMTI3MzYgMTQuOTY2NSA5LjUyMzkyIDE2LjY5NDUgMTAuMDg1NCAxNy45NTc4QzEwLjQxMzQgMTguNjk1OCAxMC43NzggMTkuMjMxMSAxMS4xMzI0IDE5LjU2ODNDMTEuNDgxNiAxOS45MDA3IDExLjc3MzEgMjAgMTIgMjBDMTIuMjI2OSAyMCAxMi41MTg0IDE5LjkwMDcgMTIuODY3NiAxOS41NjgzQzEzLjIyMiAxOS4yMzExIDEzLjU4NjYgMTguNjk1OCAxMy45MTQ2IDE3Ljk1NzhDMTQuNDc2MSAxNi42OTQ1IDE0Ljg3MjYgMTQuOTY2NSAxNC45NzQzIDEzWk0xNS41NTQ0IDE5LjE2OUMxNS42MTk0IDE5LjAzODggMTUuNjgyIDE4LjkwNTcgMTUuNzQyMiAxOC43NzAxQzE2LjQzMiAxNy4yMTgxIDE2Ljg3MzYgMTUuMjA0IDE2Ljk3NjcgMTNIMTkuOTM4MUMxOS42IDE1LjcxMTMgMTcuOTA1MiAxOC4wMDEzIDE1LjU1NDQgMTkuMTY5Wk04LjQ0NTYxIDE5LjE2OUM4LjM4MDY0IDE5LjAzODggOC4zMTgwMiAxOC45MDU3IDguMjU3NzYgMTguNzcwMUM3LjU2Nzk4IDE3LjIxODEgNy4xMjY0MyAxNS4yMDQgNy4wMjMyOCAxM0g0LjA2MTg5QzQuMzk5OTkgMTUuNzExMyA2LjA5NDg1IDE4LjAwMTMgOC40NDU2MSAxOS4xNjlaIiBmaWxsPSIjMDA5NEZGIi8+Cjwvc3ZnPgo="/>
                                                </div>
                                                <div className="com-seo-numbers-item__textcontent">
                                                    <div className="com-seo-numbers-item__head">
                                                        <span>130+ quốc gia </span>
                                                    </div>
                                                    <div className="com-seo-numbers-item__desc"><p
                                                        data-trans="numbers_section_countries_desc">Chúng tôi hỗ trợ
                                                        13&nbsp;ngôn
                                                        ngữ, vì vậy các nhà giao dịch từ khắp nơi trên thế giới có thể
                                                        tận
                                                        hưởng và
                                                        kiếm lợi nhuận mọi lúc</p></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="com-seo-numbers-item com-seo-numbers-item--s">
                                            <div className="com-seo-numbers-item__content">
                                                <div className="com-seo-numbers-item__icon"><img
                                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS45OTk5IDNDOS4yMzg1MSAzIDYuOTk5OTQgNS4yMzg1OCA2Ljk5OTk0IDhDNi45OTk5NCA5LjQyMDYgNy41OTIzOSAxMC43MDI4IDguNTQzNjkgMTEuNjEzMUM2LjY0OTM4IDEyLjM1MjQgNS4zNjk5OCAxMy42NTg1IDQuNTMzNzcgMTQuOTU5MkMzLjkwOTU0IDE1LjkzMDMgMy41MzIxNSAxNi44OTM4IDMuMzEwMjggMTcuNjEwNkMzLjE5ODgzIDE3Ljk3MDcgMy4xMjUxOCAxOC4yNzMyIDMuMDc4NzggMTguNDg5N0MzLjA1NTU2IDE4LjU5ODEgMy4wMzkwOCAxOC42ODUzIDMuMDI4MDUgMTguNzQ3OUMzLjAyMjU0IDE4Ljc3OTIgMy4wMTgzOSAxOC44MDQzIDMuMDE1NDMgMTguODIyOUwzLjAxMTg3IDE4Ljg0NThMMy4wMTA3MyAxOC44NTM1TDMuMDEwMzEgMTguODU2NEwzLjAwOTk5IDE4Ljg1ODZDMi45MzE4OSAxOS40MDUzIDMuMzExNzkgMTkuOTExOCAzLjg1ODUyIDE5Ljk5QzQuNDA0NCAyMC4wNjc5IDQuOTEwMTkgMTkuNjg5NCA0Ljk4OTUyIDE5LjE0NEw0Ljk5MDYyIDE5LjEzNjlDNC45OTE4OCAxOS4xMjkgNC45OTQxOSAxOS4xMTQ5IDQuOTk3NzEgMTkuMDk0OUM1LjAwNDc2IDE5LjA1NDkgNS4wMTY2IDE4Ljk5MTggNS4wMzQzOSAxOC45MDg3QzUuMDcwMDIgMTguNzQyNSA1LjEyOTE5IDE4LjQ5ODEgNS4yMjA4NiAxOC4yMDE5QzUuNDA1MjMgMTcuNjA2MiA1LjcxNTM1IDE2LjgxOTcgNi4yMTYxMiAxNi4wNDA4QzcuMTk3NDMgMTQuNTE0MyA4LjkwODU5IDEzIDExLjk5OTkgMTNDMTUuMDkxMyAxMyAxNi44MDI1IDE0LjUxNDMgMTcuNzgzOCAxNi4wNDA4QzE4LjI4NDUgMTYuODE5NyAxOC41OTQ3IDE3LjYwNjIgMTguNzc5IDE4LjIwMTlDMTguODcwNyAxOC40OTgxIDE4LjkyOTkgMTguNzQyNSAxOC45NjU1IDE4LjkwODdDMTguOTgzMyAxOC45OTE4IDE4Ljk5NTEgMTkuMDU0OSAxOS4wMDIyIDE5LjA5NDlDMTkuMDA0OCAxOS4xMDk4IDE5LjAwNjggMTkuMTIxNSAxOS4wMDgxIDE5LjEyOThDMTkuMDA4NiAxOS4xMzI1IDE5LjAwODkgMTkuMTM0OSAxOS4wMDkzIDE5LjEzNjlMMTkuMDEwMSAxOS4xNDIzTDE5LjAxMDQgMTkuMTQ0QzE5LjA4OTcgMTkuNjg5NCAxOS41OTU1IDIwLjA2NzkgMjAuMTQxNCAxOS45OUMyMC42ODgxIDE5LjkxMTggMjEuMDY4IDE5LjQwNTMgMjAuOTg5OSAxOC44NTg2TDIwLjk4OTYgMTguODU2NEwyMC45ODkyIDE4Ljg1MzVMMjAuOTg4IDE4Ljg0NThMMjAuOTg0NSAxOC44MjI5QzIwLjk4MTUgMTguODA0MyAyMC45NzczIDE4Ljc3OTIgMjAuOTcxOCAxOC43NDc5QzIwLjk2MDggMTguNjg1MyAyMC45NDQzIDE4LjU5ODEgMjAuOTIxMSAxOC40ODk3QzIwLjg3NDcgMTguMjczMiAyMC44MDExIDE3Ljk3MDcgMjAuNjg5NiAxNy42MTA2QzIwLjQ2NzcgMTYuODkzOCAyMC4wOTAzIDE1LjkzMDMgMTkuNDY2MSAxNC45NTkyQzE4LjYyOTkgMTMuNjU4NSAxNy4zNTA1IDEyLjM1MjQgMTUuNDU2MiAxMS42MTMxQzE2LjQwNzUgMTAuNzAyOCAxNi45OTk5IDkuNDIwNiAxNi45OTk5IDhDMTYuOTk5OSA1LjIzODU4IDE0Ljc2MTQgMyAxMS45OTk5IDNaTTguOTk5OTQgOEM4Ljk5OTk0IDYuMzQzMTUgMTAuMzQzMSA1IDExLjk5OTkgNUMxMy42NTY4IDUgMTQuOTk5OSA2LjM0MzE1IDE0Ljk5OTkgOEMxNC45OTk5IDkuNjU2ODUgMTMuNjU2OCAxMSAxMS45OTk5IDExQzEwLjM0MzEgMTEgOC45OTk5NCA5LjY1Njg1IDguOTk5OTQgOFoiIGZpbGw9IiMwMDk0RkYiLz4KPC9zdmc+Cg=="/>
                                                </div>
                                                <div className="com-seo-numbers-item__textcontent">
                                                    <div className="com-seo-numbers-item__head"><span
                                                        data-trans="stats_users_registered">88M+</span></div>
                                                    <div className="com-seo-numbers-item__desc"><p
                                                        data-trans="numbers_section_accounts_desc">Tài khoản nhà giao
                                                        dịch</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="com-seo-numbers-item com-seo-numbers-item--s">
                                            <div className="com-seo-numbers-item__content">
                                                <div className="com-seo-numbers-item__icon"><img
                                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjcwNzA3IDEyLjA1QzguMzE2NTUgMTEuNjU5NSA3LjY4MzM4IDExLjY1OTUgNy4yOTI4NiAxMi4wNUwzLjA1MDIyIDE2LjI5MjZDMi42NTk2OSAxNi42ODMxIDIuNjU5NjkgMTcuMzE2MyAzLjA1MDIyIDE3LjcwNjhMNy4yOTI4NiAyMS45NDk1QzcuNjgzMzggMjIuMzQgOC4zMTY1NSAyMi4zNCA4LjcwNzA3IDIxLjk0OTVDOS4wOTc2IDIxLjU1ODkgOS4wOTc2IDIwLjkyNTggOC43MDcwNyAyMC41MzUzTDYuMTcxNTQgMTcuOTk5N0wxMyAxNy45OTk3QzEzLjU1MjMgMTcuOTk5NyAxNCAxNy41NTIgMTQgMTYuOTk5N0MxNCAxNi40NDc0IDEzLjU1MjMgMTUuOTk5NyAxMyAxNS45OTk3TDYuMTcxNTQgMTUuOTk5N0w4LjcwNzA3IDEzLjQ2NDJDOS4wOTc2IDEzLjA3MzcgOS4wOTc2IDEyLjQ0MDUgOC43MDcwNyAxMi4wNVoiIGZpbGw9IiMwMDk0RkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS4yOTI5IDIuMDUwMUMxNS42ODM1IDEuNjU5NTcgMTYuMzE2NiAxLjY1OTU3IDE2LjcwNzEgMi4wNTAxTDIwLjk0OTggNi4yOTI3NEMyMS4zNDAzIDYuNjgzMjYgMjEuMzQwMyA3LjMxNjQyIDIwLjk0OTggNy43MDY5NUwxNi43MDcxIDExLjk0OTZDMTYuMzE2NiAxMi4zNDAxIDE1LjY4MzUgMTIuMzQwMSAxNS4yOTI5IDExLjk0OTZDMTQuOTAyNCAxMS41NTkxIDE0LjkwMjQgMTAuOTI1OSAxNS4yOTI5IDEwLjUzNTRMMTcuODI4NSA3Ljk5OTg0TDExIDcuOTk5ODRDMTAuNDQ3NyA3Ljk5OTg0IDEwIDcuNTUyMTMgMTAgNi45OTk4NEMxMCA2LjQ0NzU2IDEwLjQ0NzcgNS45OTk4NCAxMSA1Ljk5OTg0TDE3LjgyODUgNS45OTk4NEwxNS4yOTI5IDMuNDY0MzFDMTQuOTAyNCAzLjA3Mzc4IDE0LjkwMjQgMi40NDA2MiAxNS4yOTI5IDIuMDUwMVoiIGZpbGw9IiMwMDk0RkYiLz4KPC9zdmc+Cg=="/>
                                                </div>
                                                <div className="com-seo-numbers-item__textcontent">
                                                    <div className="com-seo-numbers-item__head"><span
                                                        data-trans="stats_monthly_transactions">30M+</span></div>
                                                    <div className="com-seo-numbers-item__desc"><p
                                                        data-trans="numbers_section_accounts_transactions_desc">Giao
                                                        dịch
                                                        hàng
                                                        tháng</p></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="com-seo-numbers-item com-seo-numbers-item--s">
                                            <div className="com-seo-numbers-item__content">
                                                <div className="com-seo-numbers-item__icon"><img
                                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNyA0Ljc3NTA3QzE3IDQuMDkyNTEgMTYuMzMxMyAzLjYxMDU0IDE1LjY4MzggMy44MjYzOEw5LjE2MjI4IDYuMDAwMjJIMTdWNC43NzUwN1pNMTkgNi4wMDAyMlY0Ljc3NTA3QzE5IDIuNzI3NCAxNi45OTM5IDEuMjgxNDggMTUuMDUxMyAxLjkyOTAyTDQuMDUxMzIgNS41OTU2OEMyLjgyNjI5IDYuMDA0MDMgMiA3LjE1MDQ0IDIgOC40NDE3M1YxNy4wMDAyQzIgMTguNjU3MSAzLjM0MzE1IDIwLjAwMDIgNSAyMC4wMDAySDUuNUM2LjA1MjI4IDIwLjAwMDIgNi41IDE5LjU1MjUgNi41IDE5LjAwMDJDNi41IDE4LjQ0NzkgNi4wNTIyOCAxOC4wMDAyIDUuNSAxOC4wMDAySDVDNC40NDc3MiAxOC4wMDAyIDQgMTcuNTUyNSA0IDE3LjAwMDJWOS4wMDAyMkM0IDguNDQ3OTMgNC40NDc3MiA4LjAwMDIyIDUgOC4wMDAyMkgxOUMxOS41NTIzIDguMDAwMjIgMjAgOC40NDc5MyAyMCA5LjAwMDIyVjE3LjAwMDJDMjAgMTcuNTUyNSAxOS41NTIzIDE4LjAwMDIgMTkgMTguMDAwMkgxOC41QzE3Ljk0NzcgMTguMDAwMiAxNy41IDE4LjQ0NzkgMTcuNSAxOS4wMDAyQzE3LjUgMTkuNTUyNSAxNy45NDc3IDIwLjAwMDIgMTguNSAyMC4wMDAySDE5QzIwLjY1NjkgMjAuMDAwMiAyMiAxOC42NTcxIDIyIDE3LjAwMDJWOS4wMDAyMkMyMiA3LjM0MzM2IDIwLjY1NjkgNi4wMDAyMiAxOSA2LjAwMDIyWk0xMiAxMS4wMDAyQzEyLjU1MjMgMTEuMDAwMiAxMyAxMS40NDc5IDEzIDEyLjAwMDJWMTguNTk4OUwxNC4yOTU2IDE3LjMxMzFDMTQuNjg3NiAxNi45MjQxIDE1LjMyMDggMTYuOTI2NSAxNS43MDk4IDE3LjMxODVDMTYuMDk4OCAxNy43MTA1IDE2LjA5NjQgMTguMzQzNyAxNS43MDQ0IDE4LjczMjdMMTIuNzA0NCAyMS43MUMxMi4zMTQ1IDIyLjA5NyAxMS42ODU1IDIyLjA5NyAxMS4yOTU2IDIxLjcxTDguMjk1NTggMTguNzMyN0M3LjkwMzU4IDE4LjM0MzcgNy45MDExNyAxNy43MTA1IDguMjkwMjEgMTcuMzE4NUM4LjY3OTI1IDE2LjkyNjUgOS4zMTI0MSAxNi45MjQxIDkuNzA0NDIgMTcuMzEzMUwxMSAxOC41OTg5VjEyLjAwMDJDMTEgMTEuNDQ3OSAxMS40NDc3IDExLjAwMDIgMTIgMTEuMDAwMloiIGZpbGw9IiMwMDk0RkYiLz4KPC9zdmc+Cg=="/>
                                                </div>
                                                <div className="com-seo-numbers-item__textcontent">
                                                    <div className="com-seo-numbers-item__head"><span
                                                        data-trans="stats_withdrawals_per_month">$16M+</span></div>
                                                    <div className="com-seo-numbers-item__desc"><p
                                                        data-trans="numbers_section_accounts_payouts_desc">Số tiền thanh
                                                        toán
                                                        trung bình hàng tháng</p></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="com-seo-numbers-item com-seo-numbers-item--s">
                                            <div className="com-seo-numbers-item__content">
                                                <div className="com-seo-numbers-item__icon"><img
                                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA0QzcuNTgxNzIgNCA0IDcuNTgxNzIgNCAxMkM0IDE2LjQxODMgNy41ODE3MiAyMCAxMiAyMEMxNC4yMDc0IDIwIDE2LjIwNDUgMTkuMTA3MyAxNy42NTMgMTcuNjYwN0MxOC4wNDM4IDE3LjI3MDUgMTguNjc2OSAxNy4yNzA5IDE5LjA2NzIgMTcuNjYxN0MxOS40NTc0IDE4LjA1MjUgMTkuNDU3IDE4LjY4NTcgMTkuMDY2MiAxOS4wNzU5QzE3LjI1OCAyMC44ODE2IDE0Ljc1ODcgMjIgMTIgMjJDNi40NzcxNSAyMiAyIDE3LjUyMjggMiAxMkMyIDYuNDc3MTUgNi40NzcxNSAyIDEyIDJDMTYuMDkxIDIgMTkuNjA2OCA0LjQ3ODI4IDIxLjE1ODQgNy45OTk4NEwyMS44MDgyIDYuNDg4ODFDMjIuMDI2MyA1Ljk4MTQ0IDIyLjYxNDUgNS43NDcgMjMuMTIxOSA1Ljk2NTE3QzIzLjYyOTIgNi4xODMzMyAyMy44NjM3IDYuNzcxNDkgMjMuNjQ1NSA3LjI3ODg2TDIxLjg2NzkgMTEuNDEyOUMyMS42NDk3IDExLjkyMDIgMjEuMDYxNiAxMi4xNTQ3IDIwLjU1NDIgMTEuOTM2NUwxNi40MjAyIDEwLjE1ODlDMTUuOTEyOCA5Ljk0MDc0IDE1LjY3ODQgOS4zNTI1OCAxNS44OTY1IDguODQ1MjFDMTYuMTE0NyA4LjMzNzg1IDE2LjcwMjkgOC4xMDM0IDE3LjIxMDIgOC4zMjE1N0wxOS41MzQxIDkuMzIwODFDMTguNDIwNSA2LjIyNzY4IDE1LjQ2MTcgNCAxMiA0WiIgZmlsbD0iIzAwOTRGRiIvPgo8L3N2Zz4K"/>
                                                </div>
                                                <div className="com-seo-numbers-item__textcontent">
                                                    <div className="com-seo-numbers-item__head"><span
                                                        data-trans="stats_monthly_trade_turnover">$211M</span></div>
                                                    <div className="com-seo-numbers-item__desc"><p
                                                        data-trans="numbers_section_accounts_turnover_desc">Doanh thu
                                                        giao
                                                        dịch
                                                        hàng tháng</p></div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                            <section className="m-trading-modes p-home__section">
                                <div className="page__container">
                                    <div
                                        className="m-trading-modes__content-wrap m-trading-modes__content-wrap--simple">
                                        <div className="m-trading-modes__content m-trading-modes__content--simple"><h2
                                            className="com-c-title m-trading-modes__title"
                                            data-trans="trading_modes_title">Các chế
                                            độ giao dịch phù hợp với phong cách của bạn</h2>
                                            <ul className="m-trading-modes__list m-trading-modes__list--simple">
                                                <li className="m-trading-modes-item"><a
                                                    href="https://prs.tvsi.com.vn/">
                                                    <div className="m-trading-modes-item__content-wrap">
                                                        <div className="m-trading-modes-item__content">
                                                            <div className="m-trading-modes-item__icon-wrap">
                                                                <div className="m-trading-modes-item__icon">
                                                                    <div data-gatsby-image-wrapper=""
                                                                         className="gatsby-image-wrapper gatsby-image-wrapper-constrained">
                                                                        <div style={{
                                                                            maxWidth: "180px",
                                                                            display: "block"
                                                                        }}>
                                                                            <img alt=""
                                                                                 role="presentation"
                                                                                 aria-hidden="true"
                                                                                 src="data:image/svg+xml;charset=utf-8,%3Csvg height=&#39;180&#39; width=&#39;180&#39; xmlns=&#39;http://www.w3.org/2000/svg&#39; version=&#39;1.1&#39;%3E%3C/svg%3E"
                                                                                 style={{
                                                                                     maxWidth: "100%",
                                                                                     display: "block",
                                                                                     position: "static"
                                                                                 }}/>
                                                                        </div>
                                                                        <div aria-hidden="true"
                                                                             data-placeholder-image=""
                                                                             style={{
                                                                                 opacity: "0",
                                                                                 transition: "opacity 500ms linear 0s",
                                                                                 backgroundColor: "transparent",
                                                                                 position: "absolute",
                                                                                 inset: "0px"
                                                                             }}></div>
                                                                        <picture>
                                                                            <source type="image/webp"
                                                                                    srcSet="/s5/static/f06a4532ae791c2412f530cbfd761c69/1fcf9/stocks.webp 45w,/s5/static/f06a4532ae791c2412f530cbfd761c69/1f594/stocks.webp 90w,/s5/static/f06a4532ae791c2412f530cbfd761c69/0bb7e/stocks.webp 180w"/>
                                                                            <img data-gatsby-image-ssr=""
                                                                                 data-main-image=""
                                                                                 style={{opacity: 1}}
                                                                                 sizes="(min-width: 180px) 180px, 100vw"
                                                                                 decoding="async" loading="lazy"
                                                                                 alt="icon"
                                                                                 src="/s5/static/f06a4532ae791c2412f530cbfd761c69/0c6e0/stocks.png"
                                                                                 srcSet="/s5/static/f06a4532ae791c2412f530cbfd761c69/ecb49/stocks.png 45w,/s5/static/f06a4532ae791c2412f530cbfd761c69/ae4c8/stocks.png 90w,/s5/static/f06a4532ae791c2412f530cbfd761c69/0c6e0/stocks.png 180w"/>
                                                                        </picture>
                                                                        <noscript>
                                                                            <picture>
                                                                                <source type="image/webp"
                                                                                        srcSet="/s5/static/f06a4532ae791c2412f530cbfd761c69/1fcf9/stocks.png 45w,/s5/static/f06a4532ae791c2412f530cbfd761c69/1f594/stocks.webp 90w,/s5/static/f06a4532ae791c2412f530cbfd761c69/0bb7e/stocks.webp 180w"
                                                                                        sizes="(min-width: 180px) 180px, 100vw"/>
                                                                                <img data-gatsby-image-ssr=""
                                                                                     data-main-image=""
                                                                                     style={{opacity: 0}}
                                                                                     sizes="(min-width: 180px) 180px, 100vw"
                                                                                     decoding="async" loading="lazy"
                                                                                     src="/s5/static/f06a4532ae791c2412f530cbfd761c69/0c6e0/stocks.png"
                                                                                     srcSet="/s5/static/f06a4532ae791c2412f530cbfd761c69/ecb49/stocks.png 45w,/s5/static/f06a4532ae791c2412f530cbfd761c69/ae4c8/stocks.png 90w,/s5/static/f06a4532ae791c2412f530cbfd761c69/0c6e0/stocks.png 180w"
                                                                                     alt="icon"/></picture>
                                                                        </noscript>
                                                                    </div>
                                                                </div>
                                                                <div className="m-trading-modes-item__icon-arrow"></div>
                                                            </div>
                                                            <div className="m-trading-modes-item__textcontent">
                                                                <div className="m-trading-modes-item__head"><h4
                                                                    data-trans="stocks">Cổ
                                                                    phiếu</h4></div>
                                                                <div className="m-trading-modes-item__desc"><p
                                                                    data-trans="trading_modes_stocks_desc">Kiếm lợi
                                                                    nhuận từ
                                                                    việc mua bán tài sản</p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a></li>
                                                <li className="m-trading-modes-item"><a
                                                    href="https://www.tradingview.com/markets/currencies/">
                                                    <div className="m-trading-modes-item__content-wrap">
                                                        <div className="m-trading-modes-item__content">
                                                            <div className="m-trading-modes-item__icon-wrap">
                                                                <div className="m-trading-modes-item__icon">
                                                                    <div data-gatsby-image-wrapper=""
                                                                         className="gatsby-image-wrapper gatsby-image-wrapper-constrained">
                                                                        <div style={{
                                                                            maxWidth: "180px",
                                                                            display: "block"
                                                                        }}>
                                                                            <img alt=""
                                                                                 role="presentation"
                                                                                 aria-hidden="true"
                                                                                 src="data:image/svg+xml;charset=utf-8,%3Csvg height=&#39;180&#39; width=&#39;180&#39; xmlns=&#39;http://www.w3.org/2000/svg&#39; version=&#39;1.1&#39;%3E%3C/svg%3E"
                                                                                 style={{
                                                                                     maxWidth: "100%",
                                                                                     display: "block",
                                                                                     position: "static"
                                                                                 }}/>
                                                                        </div>
                                                                        <div aria-hidden="true"
                                                                             data-placeholder-image=""
                                                                             style={{
                                                                                 opacity: 0,
                                                                                 transition: "opacity 500ms linear 0s",
                                                                                 backgroundColor: "transparent",
                                                                                 position: "absolute",
                                                                                 inset: "0px"
                                                                             }}></div>
                                                                        <picture>
                                                                            <source type="image/webp"
                                                                                    sizes="(min-width: 180px) 180px, 100vw"
                                                                                    srcSet="/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/1fcf9/forex.webp 45w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/1f594/forex.webp 90w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/0bb7e/forex.webp 180w"/>
                                                                            <img data-gatsby-image-ssr=""
                                                                                 data-main-image=""
                                                                                 style={{opacity: 1}}
                                                                                 sizes="(min-width: 180px) 180px, 100vw"
                                                                                 decoding="async" loading="lazy"
                                                                                 alt="icon"
                                                                                 src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/forex.png"
                                                                                 srcSet="/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/ecb49/forex.png 45w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/ae4c8/forex.png 90w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/0c6e0/forex.png 180w"/>
                                                                        </picture>
                                                                        <noscript>
                                                                            <picture>
                                                                                <source type="image/webp"
                                                                                        srcSet="/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/1fcf9/forex.webp 45w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/1f594/forex.webp 90w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/0bb7e/forex.webp 180w"
                                                                                        sizes="(min-width: 180px) 180px, 100vw"/>
                                                                                <img data-gatsby-image-ssr=""
                                                                                     data-main-image=""
                                                                                     style={{opacity: 0}}
                                                                                     sizes="(min-width: 180px) 180px, 100vw"
                                                                                     decoding="async" loading="lazy"
                                                                                     src="/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/0c6e0/forex.png"
                                                                                     srcSet="/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/ecb49/forex.png 45w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/ae4c8/forex.png 90w,/s5/static/b590894ea9d3dc4ada4e1c2565f1c67d/0c6e0/forex.png 180w"
                                                                                     alt="icon"/></picture>
                                                                        </noscript>
                                                                    </div>
                                                                </div>
                                                                <div className="m-trading-modes-item__icon-arrow"></div>
                                                            </div>
                                                            <div className="m-trading-modes-item__textcontent">
                                                                <div className="m-trading-modes-item__head"><h4
                                                                    data-trans="forex">
                                                                    Forex</h4></div>
                                                                <div className="m-trading-modes-item__desc"><p
                                                                    data-trans="trading_modes_forex_desc">Chế độ giao
                                                                    dịch
                                                                    tốt
                                                                    nhất cho những nhà giao dịch liên tục học hỏi</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a></li>
                                                <li className="m-trading-modes-item">
                                                    <a href="https://howtotradeblog.com/vi/phuong-phap-choi-fixed-time-trade/">
                                                        <div className="m-trading-modes-item__content-wrap">
                                                            <div className="m-trading-modes-item__content">
                                                                <div className="m-trading-modes-item__icon-wrap">
                                                                    <div className="m-trading-modes-item__icon">
                                                                        <div
                                                                            data-gatsby-image-wrapper=""
                                                                            className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                        >
                                                                            <div style={{
                                                                                maxWidth: 180,
                                                                                display: "block"
                                                                            }}>
                                                                                <img
                                                                                    alt=""
                                                                                    role="presentation"
                                                                                    aria-hidden="true"
                                                                                    src="data:image/svg+xml;charset=utf-8,%3Csvg height='180' width='180' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                    style={{
                                                                                        maxWidth: "100%",
                                                                                        display: "block",
                                                                                        position: "static"
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                aria-hidden="true"
                                                                                data-placeholder-image=""
                                                                                style={{
                                                                                    opacity: 0,
                                                                                    transition: "opacity 500ms linear 0s",
                                                                                    backgroundColor: "transparent",
                                                                                    position: "absolute",
                                                                                    inset: 0
                                                                                }}
                                                                            />
                                                                            <picture>
                                                                                <source
                                                                                    type="image/webp"
                                                                                    sizes="(min-width: 180px) 180px, 100vw"
                                                                                    srcSet="/s5/static/6a9361e7f38b11d3c1ce8a5fff9f7468/1fcf9/ftt.webp 45w,/s5/static/6a9361e7f38b11d3c1ce8a5fff9f7468/1f594/ftt.webp 90w,/s5/static/6a9361e7f38b11d3c1ce8a5fff9f7468/0bb7e/ftt.webp 180w"
                                                                                />
                                                                                <img
                                                                                    data-gatsby-image-ssr=""
                                                                                    data-main-image=""
                                                                                    style={{opacity: 1}}
                                                                                    sizes="(min-width: 180px) 180px, 100vw"
                                                                                    decoding="async"
                                                                                    loading="lazy"
                                                                                    alt="icon"
                                                                                    src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/ftt.png"
                                                                                    srcSet="/s5/static/6a9361e7f38b11d3c1ce8a5fff9f7468/ecb49/ftt.png 45w,/s5/static/6a9361e7f38b11d3c1ce8a5fff9f7468/ae4c8/ftt.png 90w,/s5/static/6a9361e7f38b11d3c1ce8a5fff9f7468/0c6e0/ftt.png 180w"
                                                                                />
                                                                            </picture>
                                                                        </div>
                                                                    </div>
                                                                    <div className="m-trading-modes-item__icon-arrow"/>
                                                                </div>
                                                                <div className="m-trading-modes-item__textcontent">
                                                                    <div className="m-trading-modes-item__head">
                                                                        <h4 data-trans="fixed_time_trades">Fixed Time
                                                                            Trade</h4>
                                                                    </div>
                                                                    <div className="m-trading-modes-item__desc">
                                                                        <p data-trans="trading_modes_fixed_time_desc">
                                                                            Một trong những hình thức giao dịch đơn giản
                                                                            nhất hiện nay
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="m-trading-modes__img-wrap m-trading-modes__img-wrap--simple">
                                            <div
                                                className="m-trading-modes__img-phone-wrap m-trading-modes__img-phone-wrap--bottom">
                                                <div
                                                    className="m-trading-modes__img-light m-trading-modes__img-light--ltr"/>
                                                <div
                                                    className="m-trading-modes__img-phone m-trading-modes__img-phone--default m-trading-modes__img-phone--default-ltr m-trading-modes__img-phone--active">
                                                    <div
                                                        data-gatsby-image-wrapper=""
                                                        className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                    >
                                                        <div style={{maxWidth: 240, display: "block"}}>
                                                            <img
                                                                alt=""
                                                                role="presentation"
                                                                aria-hidden="true"
                                                                src="data:image/svg+xml;charset=utf-8,%3Csvg height='672' width='240' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    display: "block",
                                                                    position: "static"
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            aria-hidden="true"
                                                            data-placeholder-image=""
                                                            style={{
                                                                opacity: 0,
                                                                transition: "opacity 500ms linear 0s",
                                                                backgroundColor: "transparent",
                                                                position: "absolute",
                                                                inset: 0
                                                            }}
                                                        />
                                                        <picture>
                                                            <source
                                                                type="image/webp"
                                                                srcSet="/s5/static/d914799fe5442fcd6b764bfcfa51dbda/3be93/phone-default.webp 60w,/s5/static/d914799fe5442fcd6b764bfcfa51dbda/3d7c1/phone-default.webp 120w,/s5/static/d914799fe5442fcd6b764bfcfa51dbda/68c18/phone-default.webp 240w"
                                                                sizes="(min-width: 240px) 240px, 100vw"
                                                            />
                                                            <img
                                                                width={240}
                                                                height={672}
                                                                data-main-image=""
                                                                sizes="(min-width: 240px) 240px, 100vw"
                                                                decoding="async"
                                                                loading="lazy"
                                                                src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/phone-default.png"
                                                                srcSet="/s5/static/d914799fe5442fcd6b764bfcfa51dbda/8a4b5/phone-default.png 60w,/s5/static/d914799fe5442fcd6b764bfcfa51dbda/ff942/phone-default.png 120w,/s5/static/d914799fe5442fcd6b764bfcfa51dbda/2eeb2/phone-default.png 240w"
                                                                alt="screenshot"
                                                                style={{objectFit: "contain", opacity: 1}}
                                                            />
                                                        </picture>
                                                        <noscript/>
                                                    </div>
                                                </div>
                                                <div
                                                    className="m-trading-modes__img-phone m-trading-modes__img-phone--stocks m-trading-modes__img-phone--stocks-ltr">
                                                    <div
                                                        data-gatsby-image-wrapper=""
                                                        className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                    >
                                                        <div style={{maxWidth: 500, display: "block"}}>
                                                            <img
                                                                alt=""
                                                                role="presentation"
                                                                aria-hidden="true"
                                                                src="data:image/svg+xml;charset=utf-8,%3Csvg height='672' width='500' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    display: "block",
                                                                    position: "static"
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            aria-hidden="true"
                                                            data-placeholder-image=""
                                                            style={{
                                                                opacity: 0,
                                                                transition: "opacity 500ms linear 0s",
                                                                backgroundColor: "transparent",
                                                                position: "absolute",
                                                                inset: 0
                                                            }}
                                                        />
                                                        <picture>
                                                            <source
                                                                type="image/webp"
                                                                srcSet="/s5/static/56a424cfe6300ec5864d56c10c0ac305/63014/phone-stocks.webp 125w,/s5/static/56a424cfe6300ec5864d56c10c0ac305/10b99/phone-stocks.webp 250w,/s5/static/56a424cfe6300ec5864d56c10c0ac305/21bab/phone-stocks.webp 500w"
                                                                sizes="(min-width: 500px) 500px, 100vw"
                                                            />
                                                            <img
                                                                width={500}
                                                                height={672}
                                                                data-main-image=""
                                                                sizes="(min-width: 500px) 500px, 100vw"
                                                                decoding="async"
                                                                loading="lazy"
                                                                src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/phone-stocks.png"
                                                                srcSet="/s5/static/56a424cfe6300ec5864d56c10c0ac305/77ac2/phone-stocks.png 125w,/s5/static/56a424cfe6300ec5864d56c10c0ac305/aede3/phone-stocks.png 250w,/s5/static/56a424cfe6300ec5864d56c10c0ac305/9846f/phone-stocks.png 500w"
                                                                alt="screenshot"
                                                                style={{objectFit: "contain", opacity: 1}}
                                                            />
                                                        </picture>
                                                        <noscript/>
                                                    </div>
                                                </div>
                                                <div
                                                    className="m-trading-modes__img-phone m-trading-modes__img-phone--forex m-trading-modes__img-phone--forex-ltr">
                                                    <div
                                                        data-gatsby-image-wrapper=""
                                                        className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                    >
                                                        <div style={{maxWidth: 500, display: "block"}}>
                                                            <img
                                                                alt=""
                                                                role="presentation"
                                                                aria-hidden="true"
                                                                src="data:image/svg+xml;charset=utf-8,%3Csvg height='672' width='500' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    display: "block",
                                                                    position: "static"
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            aria-hidden="true"
                                                            data-placeholder-image=""
                                                            style={{
                                                                opacity: 0,
                                                                transition: "opacity 500ms linear 0s",
                                                                backgroundColor: "transparent",
                                                                position: "absolute",
                                                                inset: 0
                                                            }}
                                                        />
                                                        <picture>
                                                            <source
                                                                type="image/webp"
                                                                srcSet="/s5/static/c794421000e61919ebe10e4b6cd2440c/63014/phone-forex.webp 125w,/s5/static/c794421000e61919ebe10e4b6cd2440c/10b99/phone-forex.webp 250w,/s5/static/c794421000e61919ebe10e4b6cd2440c/21bab/phone-forex.webp 500w"
                                                                sizes="(min-width: 500px) 500px, 100vw"
                                                            />
                                                            <img
                                                                width={500}
                                                                height={672}
                                                                data-main-image=""
                                                                sizes="(min-width: 500px) 500px, 100vw"
                                                                decoding="async"
                                                                loading="lazy"
                                                                src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/phone-forex.png"
                                                                srcSet="/s5/static/c794421000e61919ebe10e4b6cd2440c/77ac2/phone-forex.png 125w,/s5/static/c794421000e61919ebe10e4b6cd2440c/aede3/phone-forex.png 250w,/s5/static/c794421000e61919ebe10e4b6cd2440c/9846f/phone-forex.png 500w"
                                                                alt="screenshot"
                                                                style={{objectFit: "contain", opacity: 1}}
                                                            />
                                                        </picture>
                                                        <noscript/>
                                                    </div>
                                                </div>
                                                <div
                                                    className="m-trading-modes__img-phone m-trading-modes__img-phone--ftt m-trading-modes__img-phone--ftt-ltr">
                                                    <div
                                                        data-gatsby-image-wrapper=""
                                                        className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                    >
                                                        <div style={{maxWidth: 499, display: "block"}}>
                                                            <img
                                                                alt=""
                                                                role="presentation"
                                                                aria-hidden="true"
                                                                src="data:image/svg+xml;charset=utf-8,%3Csvg height='672' width='499' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    display: "block",
                                                                    position: "static"
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            aria-hidden="true"
                                                            data-placeholder-image=""
                                                            style={{
                                                                opacity: 0,
                                                                transition: "opacity 500ms linear 0s",
                                                                backgroundColor: "transparent",
                                                                position: "absolute",
                                                                inset: 0
                                                            }}
                                                        />
                                                        <picture>
                                                            <source
                                                                type="image/webp"
                                                                srcSet="/s5/static/0c215e7670085f5709d8f4ea5e368c43/63014/phone-ftt.webp 125w,/s5/static/0c215e7670085f5709d8f4ea5e368c43/1fffc/phone-ftt.webp 250w,/s5/static/0c215e7670085f5709d8f4ea5e368c43/aec75/phone-ftt.webp 499w"
                                                                sizes="(min-width: 499px) 499px, 100vw"
                                                            />
                                                            <img
                                                                width={499}
                                                                height={672}
                                                                data-main-image=""
                                                                sizes="(min-width: 499px) 499px, 100vw"
                                                                decoding="async"
                                                                loading="lazy"
                                                                src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/phone-ftt.png"
                                                                srcSet="/s5/static/0c215e7670085f5709d8f4ea5e368c43/77ac2/phone-ftt.png 125w,/s5/static/0c215e7670085f5709d8f4ea5e368c43/c994a/phone-ftt.png 250w,/s5/static/0c215e7670085f5709d8f4ea5e368c43/e344f/phone-ftt.png 499w"
                                                                alt="screenshot"
                                                                style={{objectFit: "contain", opacity: 1}}
                                                            />
                                                        </picture>
                                                        <noscript/>
                                                    </div>
                                                </div>
                                                <div
                                                    className="m-trading-modes__img-phone m-trading-modes__img-phone--mobile">
                                                    <div
                                                        data-gatsby-image-wrapper=""
                                                        className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                    >
                                                        <div style={{maxWidth: 240, display: "block"}}>
                                                            <img
                                                                alt=""
                                                                role="presentation"
                                                                aria-hidden="true"
                                                                src="data:image/svg+xml;charset=utf-8,%3Csvg height='672' width='240' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    display: "block",
                                                                    position: "static"
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            aria-hidden="true"
                                                            data-placeholder-image=""
                                                            style={{
                                                                opacity: 0,
                                                                transition: "opacity 500ms linear 0s",
                                                                backgroundColor: "transparent",
                                                                position: "absolute",
                                                                inset: 0
                                                            }}
                                                        />
                                                        <picture>
                                                            <source
                                                                type="image/webp"
                                                                srcSet="/s5/static/d914799fe5442fcd6b764bfcfa51dbda/3be93/phone-default.webp 60w,
/s5/static/d914799fe5442fcd6b764bfcfa51dbda/3d7c1/phone-default.webp 120w,
/s5/static/d914799fe5442fcd6b764bfcfa51dbda/68c18/phone-default.webp 240w"
                                                                sizes="(min-width: 240px) 240px, 100vw"
                                                            />
                                                            <img
                                                                width={240}
                                                                height={672}
                                                                data-main-image=""
                                                                sizes="(min-width: 240px) 240px, 100vw"
                                                                decoding="async"
                                                                loading="lazy"
                                                                src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/phone-default.png"
                                                                srcSet="/s5/static/d914799fe5442fcd6b764bfcfa51dbda/8a4b5/phone-default.png 60w,
/s5/static/d914799fe5442fcd6b764bfcfa51dbda/ff942/phone-default.png 120w,
/s5/static/d914799fe5442fcd6b764bfcfa51dbda/2eeb2/phone-default.png 240w"
                                                                alt="screenshot"
                                                                style={{objectFit: "contain", opacity: 1}}
                                                            />
                                                        </picture>
                                                        <noscript/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </section>

                            <section className="p-home-m-seodevices p-home__section">
                                <div className="page__container">
                                    <div className="p-home-m-seodevices__head-wrap">
                                        <div className="p-home-m-seodevices__head-text-wrap">
                                            <h2
                                                className="com-c-title p-home-m-seodevices__title"
                                                data-trans="seodevices_title"
                                            >
                                                Giao dịch trên thiết bị của bạn
                                            </h2>
                                            <p
                                                className="com-c-description p-home-m-seodevices__desc"
                                                data-trans="seodevices_desc"
                                            >
                                                Thử dùng phiên bản ứng dụng giao dịch mới nhất của chúng tôi để trải
                                                nghiệm giao dịch mượt mà, không bị xao nhãng
                                            </p>
                                        </div>
                                        <a
                                            className="p-home-m-seodevices__list-link p-home-m-seodevices__list-link--ltr"
                                            href="javascript:void(0)"
                                        >
                                            Xem tất cả ứng dụng
                                        </a>
                                    </div>
                                    <div className="p-home-m-seodevices__content-wrap">
                                        <div
                                            className="p-home-m-seodevices__app-info-wrap p-home-m-seodevices__app-info-wrap--mobile">
                                            <div
                                                className="p-home-m-seodevices__img-wrap p-home-m-seodevices__img-wrap--mobile p-home-m-seodevices__img-wrap--mobile-ltr">
                                                <div
                                                    data-gatsby-image-wrapper=""
                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained p-home-m-seodevices__img"
                                                >
                                                    <div style={{maxWidth: 239, display: "block"}}>
                                                        <img
                                                            alt=""
                                                            role="presentation"
                                                            aria-hidden="true"
                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='528' width='239' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                            style={{
                                                                maxWidth: "100%",
                                                                display: "block",
                                                                position: "static"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        aria-hidden="true"
                                                        data-placeholder-image=""
                                                        style={{
                                                            opacity: 0,
                                                            transition: "opacity 500ms linear 0s",
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            inset: 0
                                                        }}
                                                    />
                                                    <picture>
                                                        <source
                                                            type="image/webp"
                                                            srcSet="/s5/static/eb46dd8bdf2a5b66a25112bd161256f1/fa9f4/mobile-md.webp 60w,
/s5/static/eb46dd8bdf2a5b66a25112bd161256f1/4a866/mobile-md.webp 120w,
/s5/static/eb46dd8bdf2a5b66a25112bd161256f1/a181d/mobile-md.webp 239w"
                                                            sizes="(min-width: 239px) 239px, 100vw"
                                                        />
                                                        <img
                                                            width={239}
                                                            height={528}
                                                            data-main-image=""
                                                            sizes="(min-width: 239px) 239px, 100vw"
                                                            decoding="async"
                                                            loading="lazy"
                                                            src="/s5/static/eb46dd8bdf2a5b66a25112bd161256f1/360c3/mobile-md.png"
                                                            srcSet="/s5/static/eb46dd8bdf2a5b66a25112bd161256f1/a6fce/mobile-md.png 60w,
/s5/static/eb46dd8bdf2a5b66a25112bd161256f1/2e87d/mobile-md.png 120w,
/s5/static/eb46dd8bdf2a5b66a25112bd161256f1/360c3/mobile-md.png 239w"
                                                            alt="screenshot"
                                                            style={{objectFit: "cover", opacity: 1}}
                                                        />
                                                    </picture>
                                                    <noscript/>
                                                </div>
                                            </div>
                                            <span
                                                data-trans="seodevides_mobile_head"
                                                className="p-home-m-seodevices__app-info-head"
                                            >
          Di động
        </span>
                                            <ul className="p-home-m-seodevices__links-list">
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--mobile">
                                                    <a
                                                        className="p-down-c-app-link"
                                                        href="javascript:void(0)"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-test="application_download_android"
                                                    >
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">
                  Google Play
                </span>
              </span>
                                                    </a>
                                                </li>
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--mobile">
                                                    <a
                                                        className="p-down-c-app-link"
                                                        href="javascript:void(0)"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-test="application_download_samsung"
                                                    >
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M17.526 6.775l-.078-.342C17.448 3.437 15.004 1 12 1 8.996 1 6.552 3.437 6.552 6.433l-.078.342H2l1.206 11.213A4.49 4.49 0 007.676 22h8.649a4.49 4.49 0 004.469-4.011L22 6.775h-4.474zm-8.684 0l.088-.342A3.07 3.07 0 0112 3.372a3.07 3.07 0 013.07 3.061l.088.342H8.842z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">
                  Galaxy Store
                </span>
              </span>
                                                    </a>
                                                </li>
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--mobile">
                                                    <a
                                                        className="p-down-c-app-link"
                                                        href="javascript:void(0)"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-test="application_download_xiaomi"
                                                    >
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M18.667 6h2.666v12h-2.666V6zM8 10.667h2.667V18H8v-7.333z"
                                                            />
                                                            <path
                                                                fill="currentColor"
                                                                d="M16 10v8h-2.667v-7.333c0-1.107-.893-2-2-2h-6V18H2.667V6H12c2.207 0 4 1.793 4 4z"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">Xiaomi</span>
              </span>
                                                    </a>
                                                </li>
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--mobile">
                                                    <a
                                                        className="p-down-c-app-link"
                                                        href="javascript:void(0)"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-test="application_download_huawei"
                                                    >
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M9.75 3C8.227 3 7.054 4.326 7.053 6.757c0 1.588 2.403 5.661 4.534 9.227C11.587 6.75 11.36 5.75 9.75 3zm4.5 0c-1.641 2.703-1.837 3.75-1.837 12.984 2.13-3.566 4.534-7.639 4.534-9.227C16.946 4.325 15.773 3 14.25 3zM4.5 6c-2.234 1.56-1.5 5.25-.372 6.456.745.78 3.635 2.184 6.372 4.044L4.5 6zm15 0l-6 10.5c2.738-1.86 5.627-3.264 6.372-4.044C21 11.25 21.734 7.559 19.5 6zm-18 6c.036 4.157 2.573 5.25 4.288 5.25h4.286L1.5 12zm21 0l-8.574 5.25h4.286c1.715 0 4.252-1.093 4.288-5.25zM3.838 18c.24 1.24.78 2.25 2.34 2.25 1.559 0 3.066-.9 3.896-2.25H3.838zm10.088 0c.83 1.35 2.338 2.25 3.897 2.25 1.559 0 2.1-1.01 2.34-2.25h-6.237z"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">Huawei</span>
              </span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul className="p-home-m-seodevices__app-statistics-list">
                                                <li className="p-home-m-seodevices__app-statistics-item">
            <span className="p-home-m-seodevices__app-statistics-item-head">
              44M+
            </span>
                                                    <p
                                                        data-trans="home_devices_all_downloads"
                                                        className="p-home-m-seodevices__app-statistics-item-desc"
                                                    >
                                                        Lượt tải ứng dụng
                                                    </p>
                                                </li>
                                                <li className="p-home-m-seodevices__app-statistics-item">
            <span
                className="p-home-m-seodevices__app-statistics-item-head p-home-m-seodevices__app-statistics-item-head--rating">
              4.2
            </span>
                                                    <p
                                                        data-trans="ome_devices_app_rating"
                                                        className="p-home-m-seodevices__app-statistics-item-desc"
                                                    >
                                                        đánh giá ứng dụng
                                                    </p>
                                                </li>
                                            </ul>
                                            <div className="p-home-m-seodevices__qrcode" style={{visibility:"hidden"}}>
                                                <div className="com-c-qrstores com-c-qrstores--theme--default">
                                                    <svg viewBox="0 0 33 33">
                                                        <path
                                                            fill="#FFFFFF"
                                                            d="M0,0 h33v33H0z"
                                                            shapeRendering="crispEdges"
                                                        />
                                                        <path
                                                            fill="#000000"
                                                            shapeRendering="crispEdges"
                                                        />
                                                    </svg>
                                                </div>
                                                <p
                                                    className="p-home-m-seodevices__qrcode-desc"
                                                    data-trans="seodevides_scan"
                                                >
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="p-home-m-seodevices__app-info-wrap p-home-m-seodevices__app-info-wrap--desc">
                                            <div
                                                className="p-home-m-seodevices__img-wrap p-home-m-seodevices__img-wrap--desc p-home-m-seodevices__img-wrap--desc-ltr">
                                                <div
                                                    data-gatsby-image-wrapper=""
                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained p-home-m-seodevices__img"
                                                >
                                                    <div style={{maxWidth: 930, display: "block"}}>
                                                        <img
                                                            alt=""
                                                            role="presentation"
                                                            aria-hidden="true"
                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='609' width='930' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                            style={{
                                                                maxWidth: "100%",
                                                                display: "block",
                                                                position: "static"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        aria-hidden="true"
                                                        data-placeholder-image=""
                                                        style={{
                                                            opacity: 0,
                                                            transition: "opacity 500ms linear 0s",
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            inset: 0
                                                        }}
                                                    />
                                                    <picture>
                                                        <source
                                                            type="image/webp"
                                                            srcSet="/s5/static/bf97d2705ae65fb392d6913738031d4c/c9b31/desktop.webp 233w,/s5/static/bf97d2705ae65fb392d6913738031d4c/a2db5/desktop.webp 465w,/s5/static/bf97d2705ae65fb392d6913738031d4c/7bf23/desktop.webp 930w"
                                                            sizes="(min-width: 930px) 930px, 100vw"
                                                        />
                                                        <img
                                                            width={930}
                                                            height={609}
                                                            data-main-image=""
                                                            sizes="(min-width: 930px) 930px, 100vw"
                                                            decoding="async"
                                                            loading="lazy"
                                                            src="/s5/static/bf97d2705ae65fb392d6913738031d4c/06393/desktop.png"
                                                            srcSet="/s5/static/bf97d2705ae65fb392d6913738031d4c/7f340/desktop.png 233w,
/s5/static/bf97d2705ae65fb392d6913738031d4c/28850/desktop.png 465w,
/s5/static/bf97d2705ae65fb392d6913738031d4c/06393/desktop.png 930w"
                                                            alt="screenshot"
                                                            style={{objectFit: "cover", opacity: 1}}
                                                        />
                                                    </picture>
                                                    <noscript/>
                                                </div>
                                            </div>
                                            <span
                                                data-trans="seodevides_desc_head"
                                                className="p-home-m-seodevices__app-info-head"
                                            >
          Máy tính
        </span>
                                            <ul className="p-home-m-seodevices__links-list p-home-m-seodevices__links-list--desc">
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--desc">
                                                    <a
                                                        className="p-down-c-app-link"
                                                        href="javascript:void(0)"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-test="application_download_windows-32"
                                                    >
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M10.182 3.097l-7.363.743A.915.915 0 002 4.754v6.328h8.182V3.097zm0 9.82H2v6.33c0 .47.354.866.819.913l7.363.743v-7.985zM12 21.088v-8.17h10v8.165a.913.913 0 01-1 .913l-9-.908zm0-10.005V2.913l9-.908a.912.912 0 011 .913v8.164H12z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">
                  Windows x32
                </span>
              </span>
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__arrow"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M17.707 13.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L11 16.586V5a1 1 0 112 0v11.586l3.293-3.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--desc">
                                                    <a
                                                        className="p-down-c-app-link"
                                                        href="javascript:void(0)"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-test="application_download_macos"
                                                    >
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M22 4h-9.595c-.513 1.293-.895 2.924-1.168 4.59a47.13 47.13 0 00-.502 4.495c.502.017 1.245.03 2.318.03h.978l.021.979c.02.892.063 1.712.12 2.455a10.08 10.08 0 004.448-2.13l1.286 1.532a12.094 12.094 0 01-5.522 2.595c.078.566.162 1.053.245 1.454H22V4zm-9.816 12.768l-.184.001c-2.674 0-5.083-.974-6.834-2.535l-1.33 1.493c2.12 1.89 5.002 3.042 8.164 3.042.132 0 .264-.002.395-.006.062.451.128.864.197 1.237H2V4h8.276c-.454 1.34-.779 2.84-1.013 4.266a49.332 49.332 0 00-.574 5.608 1.004 1.004 0 00.436.98c.11.072.21.106.232.113h.001a1.02 1.02 0 00.156.04c.054.01.113.017.163.022.113.012.286.025.543.037.387.019.98.037 1.864.045.024.582.058 1.135.1 1.657zM2 2a2 2 0 00-2 2v16a2 2 0 002 2h20a2 2 0 002-2V4a2 2 0 00-2-2H2zm3.526 8.384v-3h2v3h-2zm10.527-3v3h2v-3h-2z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">macOS</span>
              </span>
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__arrow"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M17.707 13.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L11 16.586V5a1 1 0 112 0v11.586l3.293-3.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--desc">
                                                    <a
                                                        className="p-down-c-app-link"
                                                        href="javascript:void(0)"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-test="application_download_windows-64"
                                                    >
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M10.182 3.097l-7.363.743A.915.915 0 002 4.754v6.328h8.182V3.097zm0 9.82H2v6.33c0 .47.354.866.819.913l7.363.743v-7.985zM12 21.088v-8.17h10v8.165a.913.913 0 01-1 .913l-9-.908zm0-10.005V2.913l9-.908a.912.912 0 011 .913v8.164H12z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">
                  Windows x64
                </span>
              </span>
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__arrow"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M17.707 13.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L11 16.586V5a1 1 0 112 0v11.586l3.293-3.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li className="p-home-m-seodevices__links-item p-home-m-seodevices__links-item--desc">
                                                    <button className="p-down-c-app-link">
                                                        <svg
                                                            className="SvgIcon-module-host-3SE p-down-c-app-link__icon"
                                                            viewBox="0 0 24 24"
                                                            role="presentation"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M20.667 21H3.327a2.34 2.34 0 01-2.13-3.28l1.8-3.94V5.33A2.34 2.34 0 015.327 3h13.34a2.34 2.34 0 012.33 2.33v8.45l1.79 3.93a2.329 2.329 0 01-2.12 3.29zm-16-6l-1.67 3.54a.35.35 0 000 .31.36.36 0 00.28.15h17.39a.36.36 0 00.28-.15.33.33 0 000-.32L19.357 15H4.667zm.33-2h14V5.33a.33.33 0 00-.33-.33H5.327a.33.33 0 00-.33.33V13zm8.33 4.93h-2.66a1 1 0 010-2h2.66a1 1 0 010 2z"
                                                            />
                                                        </svg>
                                                        <span className="p-down-c-app-link__title">
                <span className="p-down-c-app-link__title-name">Web App</span>
              </span>
                                                    </button>
                                                </li>
                                            </ul>
                                            <div className="p-home-m-seodevices__desc-button-wrap">
                                                <button
                                                    className="XHQn2sJxXR Uz0jT44lJw _4eCh2UvyMJ jWZ--g-v6R"
                                                    data-test="Button"
                                                    type="button"
                                                    onClick={()=>setShow(true)}
                                                >
                                                    <div
                                                        className="jqVNWOpUO0"
                                                        style={{
                                                            display: "flex",
                                                            padding: 16,
                                                            width: "100%",
                                                            maxHeight: "100%",
                                                            maxWidth: "100%",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexDirection: "row"
                                                        }}
                                                    >
                                                        <div className="_4M4aiKoubi">
                                                            <div
                                                                className="jqVNWOpUO0"
                                                                style={{
                                                                    display: "flex",
                                                                    width: "100%",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    flexDirection: "row"
                                                                }}
                                                            >
                                                                <div className="-apDnR65N3 Rff1qLQkbm">
                    <span
                        className="kzbPUgX-ru"
                        data-align="center"
                        data-size="M Compact"
                        data-style="Bold"
                        data-test="Text"
                        style={{color: "inherit", display: "block"}}
                    >
                      <span
                          className="p-home-m-seodevices__desc-button-text p-home-m-seodevices__desc-button-text--ltr"
                          data-trans="go_to_web_app"
                      >
                        Mở ứng dụng Web
                      </span>
                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>


                            <section className="com-seoblog p-home__section">
                                <div className="page__container">
                                    <div className="com-seoblog__head-wrap com-seoblog__head-wrap--l">
                                        <div className="com-seoblog__head-text-wrap">
                                            <h2
                                                className="com-c-title com-seoblog__title com-seoblog__title--l"
                                                data-trans="seoblog_title"
                                            >
                                                Nâng cấp giao dịch của bạn với trang blog chính thức này
                                            </h2>
                                            <p
                                                className="com-c-description com-seoblog__desc com-seoblog__desc--l"
                                                data-trans="seoblog_desc"
                                            >
                                                Tất cả những gì bạn cần để trở thành bậc thầy giao dịch đều nằm trong
                                                cùng một nơi: hướng dẫn, phân tích, video bài học, mẹo giao dịch, tin
                                                tức thị trường và nhiều thông tin khác!
                                            </p>
                                        </div>
                                        <a
                                            className="com-seoblog__list-link com-seoblog__list-link--ltr"
                                            href="javascript:void(0)"
                                            rel="noopener noreferrer"
                                        >
                                            Cải thiện kỹ năng của bạn cùng trang blog này
                                        </a>
                                    </div>
                                    <div className="com-seoblog__list-wrap">
                                        <ul className="com-seoblog__list com-seoblog__list--l">
                                            <li className="p-home-m-seoblog__link">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="p-home-m-seoblog__link-card"
                                                >
                                                    <div className="p-home-m-seoblog__link-card-img-wrap">
                                                        <div
                                                            data-gatsby-image-wrapper=""
                                                            className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                        >
                                                            <div style={{maxWidth: 796, display: "block"}}>
                                                                <img
                                                                    alt=""
                                                                    role="presentation"
                                                                    aria-hidden="true"
                                                                    src="data:image/svg+xml;charset=utf-8,%3Csvg height='371' width='796' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        display: "block",
                                                                        position: "static"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                aria-hidden="true"
                                                                data-placeholder-image=""
                                                                style={{
                                                                    opacity: 0,
                                                                    transition: "opacity 500ms linear 0s",
                                                                    backgroundColor: "transparent",
                                                                    position: "absolute",
                                                                    inset: 0
                                                                }}
                                                            />
                                                            <picture>
                                                                <source
                                                                    type="image/webp"
                                                                    sizes="(min-width: 796px) 796px, 100vw"
                                                                    srcSet="/s5/static/68629f60f51080b8913650bb552ce120/178c6/onetech.webp 199w,/s5/static/68629f60f51080b8913650bb552ce120/4695d/onetech.webp 398w,/s5/static/68629f60f51080b8913650bb552ce120/4635a/onetech.webp 796w"
                                                                />
                                                                <img
                                                                    data-gatsby-image-ssr=""
                                                                    data-main-image=""
                                                                    style={{objectFit: "cover", opacity: 1}}
                                                                    sizes="(min-width: 796px) 796px, 100vw"
                                                                    decoding="async"
                                                                    loading="lazy"
                                                                    alt="image"
                                                                    src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/onetech.jpg"
                                                                    srcSet="/s5/static/68629f60f51080b8913650bb552ce120/9ad13/onetech.jpg 199w,/s5/static/68629f60f51080b8913650bb552ce120/7365b/onetech.jpg 398w,/s5/static/68629f60f51080b8913650bb552ce120/b6284/onetech.jpg 796w"
                                                                />
                                                            </picture>

                                                        </div>
                                                    </div>
                                                    <div className="p-home-m-seoblog__link-card-title-wrap">
              <span className="p-home-m-seoblog__link-card-title">
                10 kỹ thuật giao dịch đơn giản cùng Xspace Trade
              </span>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-home-m-seoblog__link">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="p-home-m-seoblog__link-card"
                                                >
                                                    <div className="p-home-m-seoblog__link-card-img-wrap">
                                                        <div
                                                            data-gatsby-image-wrapper=""
                                                            className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                        >
                                                            <div style={{maxWidth: 797, display: "block"}}>
                                                                <img
                                                                    alt=""
                                                                    role="presentation"
                                                                    aria-hidden="true"
                                                                    src="data:image/svg+xml;charset=utf-8,%3Csvg height='371.00000000000006' width='797' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        display: "block",
                                                                        position: "static"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                aria-hidden="true"
                                                                data-placeholder-image=""
                                                                style={{
                                                                    opacity: 0,
                                                                    transition: "opacity 500ms linear 0s",
                                                                    backgroundColor: "transparent",
                                                                    position: "absolute",
                                                                    inset: 0
                                                                }}
                                                            />
                                                            <picture>
                                                                <source
                                                                    type="image/webp"
                                                                    sizes="(min-width: 797px) 797px, 100vw"
                                                                    srcSet="/s5/static/381f5160975f638d3e4b12fe26b6efd3/178c6/twocrypto.webp 199w,/s5/static/381f5160975f638d3e4b12fe26b6efd3/344e1/twocrypto.webp 399w,/s5/static/381f5160975f638d3e4b12fe26b6efd3/579c0/twocrypto.webp 797w"
                                                                />
                                                                <img
                                                                    data-gatsby-image-ssr=""
                                                                    data-main-image=""
                                                                    style={{objectFit: "cover", opacity: 1}}
                                                                    sizes="(min-width: 797px) 797px, 100vw"
                                                                    decoding="async"
                                                                    loading="lazy"
                                                                    alt="image"
                                                                    src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/twocrypto.jpg"
                                                                    srcSet="/s5/static/381f5160975f638d3e4b12fe26b6efd3/9ad13/twocrypto.jpg 199w,/s5/static/381f5160975f638d3e4b12fe26b6efd3/d2658/twocrypto.jpg 399w,/s5/static/381f5160975f638d3e4b12fe26b6efd3/e6ea9/twocrypto.jpg 797w"
                                                                />
                                                            </picture>
                                                        </div>
                                                    </div>
                                                    <div className="p-home-m-seoblog__link-card-title-wrap">
              <span className="p-home-m-seoblog__link-card-title">
                Thị trường tiền mã hóa: Điều gì sẽ xảy ra cho đến năm 2030?
              </span>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-home-m-seoblog__link">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="p-home-m-seoblog__link-card"
                                                >
                                                    <div className="p-home-m-seoblog__link-card-img-wrap">
                                                        <div
                                                            data-gatsby-image-wrapper=""
                                                            className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                        >
                                                            <div style={{maxWidth: 797, display: "block"}}>
                                                                <img
                                                                    alt=""
                                                                    role="presentation"
                                                                    aria-hidden="true"
                                                                    src="data:image/svg+xml;charset=utf-8,%3Csvg height='372' width='797' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        display: "block",
                                                                        position: "static"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                aria-hidden="true"
                                                                data-placeholder-image=""
                                                                style={{
                                                                    opacity: 0,
                                                                    transition: "opacity 500ms linear 0s",
                                                                    backgroundColor: "transparent",
                                                                    position: "absolute",
                                                                    inset: 0
                                                                }}
                                                            />
                                                            <picture>
                                                                <source
                                                                    type="image/webp"
                                                                    sizes="(min-width: 797px) 797px, 100vw"
                                                                    srcSet="/s5/static/5f7af119b1b08ecb4804cd7e2284a1d9/178c6/threemyths.webp 199w,/s5/static/5f7af119b1b08ecb4804cd7e2284a1d9/344e1/threemyths.webp 399w,/s5/static/5f7af119b1b08ecb4804cd7e2284a1d9/bc178/threemyths.webp 797w"
                                                                />
                                                                <img
                                                                    data-gatsby-image-ssr=""
                                                                    data-main-image=""
                                                                    style={{objectFit: "cover", opacity: 1}}
                                                                    sizes="(min-width: 797px) 797px, 100vw"
                                                                    decoding="async"
                                                                    loading="lazy"
                                                                    alt="image"
                                                                    src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/threemyths.jpg"
                                                                    srcSet="/s5/static/5f7af119b1b08ecb4804cd7e2284a1d9/9ad13/threemyths.jpg 199w,/s5/static/5f7af119b1b08ecb4804cd7e2284a1d9/d2658/threemyths.jpg 399w,/s5/static/5f7af119b1b08ecb4804cd7e2284a1d9/06b39/threemyths.jpg 797w"
                                                                />
                                                            </picture>
                                                        </div>
                                                    </div>
                                                    <div className="p-home-m-seoblog__link-card-title-wrap">
              <span className="p-home-m-seoblog__link-card-title">
                5 lầm tưởng về giao dịch mà bạn có thể tin là thật song lại
                không phải như thế
              </span>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-home-m-seoblog__link">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="p-home-m-seoblog__link-card"
                                                >
                                                    <div className="p-home-m-seoblog__link-card-img-wrap">
                                                        <div
                                                            data-gatsby-image-wrapper=""
                                                            className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                        >
                                                            <div style={{maxWidth: 795, display: "block"}}>
                                                                <img
                                                                    alt=""
                                                                    role="presentation"
                                                                    aria-hidden="true"
                                                                    src="data:image/svg+xml;charset=utf-8,%3Csvg height='370' width='795' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        display: "block",
                                                                        position: "static"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                aria-hidden="true"
                                                                data-placeholder-image=""
                                                                style={{
                                                                    opacity: 0,
                                                                    transition: "opacity 500ms linear 0s",
                                                                    backgroundColor: "transparent",
                                                                    position: "absolute",
                                                                    inset: 0
                                                                }}
                                                            />
                                                            <picture>
                                                                <source
                                                                    type="image/webp"
                                                                    sizes="(min-width: 795px) 795px, 100vw"
                                                                    srcSet="/s5/static/b7afd04b6fc74e77bc0c12e87478610f/178c6/fourpatterns.webp 199w,/s5/static/b7afd04b6fc74e77bc0c12e87478610f/beb4e/fourpatterns.webp 398w,/s5/static/b7afd04b6fc74e77bc0c12e87478610f/fcfb2/fourpatterns.webp 795w"
                                                                />
                                                                <img
                                                                    data-gatsby-image-ssr=""
                                                                    data-main-image=""
                                                                    style={{objectFit: "cover", opacity: 1}}
                                                                    sizes="(min-width: 795px) 795px, 100vw"
                                                                    decoding="async"
                                                                    loading="lazy"
                                                                    alt="image"
                                                                    src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/fourpatterns.jpg"
                                                                    srcSet="/s5/static/b7afd04b6fc74e77bc0c12e87478610f/9ad13/fourpatterns.jpg 199w,/s5/static/b7afd04b6fc74e77bc0c12e87478610f/99dcd/fourpatterns.jpg 398w,/s5/static/b7afd04b6fc74e77bc0c12e87478610f/a919b/fourpatterns.jpg 795w"
                                                                />
                                                            </picture>
                                                        </div>
                                                    </div>
                                                    <div className="p-home-m-seoblog__link-card-title-wrap">
              <span className="p-home-m-seoblog__link-card-title">
                Cách đọc và giao dịch theo các mô hình biểu đồ đơn giản
              </span>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>


                            <section className="p-home-m-features page__container p-home__section">
                                <div className="p-home-m-features__content"><h2
                                    className="com-c-title p-home-m-features__title"
                                    data-trans="home_features_title">Sàn giao dịch hoạt động
                                    vì bạn</h2>
                                    <p className="com-c-description p-home-m-features__desc"
                                       data-trans="home_features_desc">Những tính
                                        năng này sẽ giúp bạn đạt được mục tiêu của mình.</p>
                                    <button
                                        className="KkOkCWm15q com-c-button com-c-button_color_accent p-home-c-button-desktop p-home-m-devices__button"
                                        data-trans="home_start_trading" type="button" data-test="home-page-features" onClick={()=>setShow(true)}>Bắt
                                        đầu
                                        giao dịch – <span data-trans="home_start_trading_free"
                                                          className="p-home-c-button-desktop__extra-text">Miễn phí</span>
                                    </button>
                                </div>
                                <ul className="p-home-m-features__list">
                                    <li className="p-home-m-features__card">
                                        <svg className="SvgIcon-module-host-3SE p-home-m-features__card-icon"
                                             viewBox="0 0 24 24"
                                             role="presentation" focusable="false" aria-hidden="true">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                  d="M11.45 2.117a2 2 0 011.1 0l6 1.714A2 2 0 0120 5.754V12.5c0 2.98-1.52 5.175-3.14 6.658-1.615 1.477-3.4 2.319-4.142 2.632a1.84 1.84 0 01-1.436 0c-.743-.313-2.527-1.155-4.141-2.632C5.519 17.675 4 15.48 4 12.5V5.754a2 2 0 011.45-1.923l6-1.714zM12 4.04L6 5.754l-.275-.961.275.961V12.5c0 2.233 1.123 3.931 2.49 5.183 1.335 1.22 2.835 1.95 3.51 2.24.675-.29 2.175-1.02 3.51-2.24C16.876 16.43 18 14.733 18 12.5V5.754L12 4.04z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        <h3 data-trans="home_features_item_1_title"
                                            className="p-home-m-features__card-title">Giao dịch
                                            phi rủi ro</h3>
                                        <p data-trans="home_features_item_1_desc"
                                           className="p-home-m-features__card-desc">Khám phá sàn
                                            giao dịch và thử nghiệm chiến thuật miễn phí</p></li>
                                    <li className="p-home-m-features__card">
                                        <svg className="SvgIcon-module-host-3SE p-home-m-features__card-icon"
                                             viewBox="0 0 24 24"
                                             role="presentation" focusable="false" aria-hidden="true">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                  d="M5 10.25a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm1 2.5h6a1 1 0 010 2H6a1 1 0 110-2z"
                                                  clip-rule="evenodd"></path>
                                            <path fill="currentColor" fill-rule="evenodd"
                                                  d="M7 5a1 1 0 011-1h4a7 7 0 017 7v2a7 7 0 01-7 7H8a1 1 0 01-1-1V5zm2 1v12h3a5 5 0 005-5v-2a5 5 0 00-5-5H9z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        <h3 data-trans="home_features_item_2_title"
                                            className="p-home-m-features__card-title">Tài khoản
                                            Demo</h3>
                                        <p data-trans="home_features_item_2_desc"
                                           className="p-home-m-features__card-desc">10.000 có thể
                                            tái nạp tiền để thực hành và học hỏi.</p></li>
                                    <li className="p-home-m-features__card">
                                        <svg className="SvgIcon-module-host-3SE p-home-m-features__card-icon"
                                             viewBox="0 0 24 24"
                                             role="presentation" focusable="false" aria-hidden="true">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                  d="M3.903 4.767A2 2 0 015.889 3h12.222a2 2 0 011.986 1.767l1.502 12.766A4 4 0 0117.626 22H6.374A4 4 0 012.4 17.533L3.903 4.767zM18.11 5H5.889L4.387 17.767A2 2 0 006.374 20h11.252a2 2 0 001.987-2.233L18.11 5zM8 7a1 1 0 011 1 3 3 0 006 0 1 1 0 012 0A5 5 0 117 8a1 1 0 011-1z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        <h3 data-trans="home_features_item_3_title"
                                            className="p-home-m-features__card-title">Mua
                                            sắm</h3>
                                        <p data-trans="home_features_item_3_desc"
                                           className="p-home-m-features__card-desc">Tùy chỉnh sàn
                                            giao dịch với những tính năng cài đặt thêm nhằm nâng tầm giao dịch của
                                            bạn</p>
                                    </li>
                                    <li className="p-home-m-features__card">
                                        <svg className="SvgIcon-module-host-3SE p-home-m-features__card-icon"
                                             viewBox="0 0 24 24"
                                             role="presentation" focusable="false" aria-hidden="true">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                  d="M12 3a5 5 0 00-3.456 8.613c-1.895.74-3.174 2.046-4.01 3.346a10.917 10.917 0 00-1.506 3.789l-.013.075-.003.023-.001.008v.005a1 1 0 001.979.285v-.007l.008-.042.036-.186a8.914 8.914 0 011.182-2.868C7.197 14.514 8.91 13 12 13c3.091 0 4.802 1.514 5.784 3.04a8.915 8.915 0 011.218 3.055l.006.035.001.007.001.005v.002a1 1 0 001.98-.285v-.006l-.002-.007-.003-.023a7.202 7.202 0 00-.063-.333 10.92 10.92 0 00-1.455-3.53c-.837-1.301-2.116-2.608-4.01-3.347A5 5 0 0012 3zM9 8a3 3 0 116 0 3 3 0 01-6 0z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        <h3 data-trans="home_features_item_4_title"
                                            className="p-home-m-features__card-title">Nhà quản
                                            lý cá nhân</h3>
                                        <p data-trans="home_features_item_4_desc"
                                           className="p-home-m-features__card-desc">Nhận hướng
                                            dẫn một một từ chuyên gia giao dịch</p></li>
                                </ul>
                            </section>

                            <section className="p-home-m-seo-for-everyone p-home__section page__container">
                                <h2
                                    className="com-c-title p-home-m-seo-for-everyone__title"
                                    data-trans="seo_for_everyone_title"
                                >
                                    Tham gia Xspace Trade
                                </h2>
                                <div className="p-home-m-seo-for-everyone__list-wrap">
                                    <ul className="p-home-m-seo-for-everyone__list">
                                        <li className="p-home-m-seo-for-everyone__item p-home-m-seo-for-everyone__item--small">
                                            <h3 className="p-home-m-seo-for-everyone__item-head">
                                                Nếu trước đây bạn chưa từng giao&nbsp;dịch
                                            </h3>
                                            <ul className="p-home-m-seo-for-everyone__item-list">
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Chúng tôi mang đến cho bạn tài khoản&nbsp;demo phi&nbsp;rủi ro để
                                                    thực hành bất kỳ và tất cả các chiến thuật
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Rất nhiều lý thuyết giao dịch và khuyến nghị thực&nbsp;tế — được
                                                    cung cấp ở đây dành cho bạn
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Bộ phận hỗ trợ của chúng tôi luôn sẵn sàng trả lời mọi câu hỏi và hỗ
                                                    trợ bạn 24/7
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="p-home-m-seo-for-everyone__item p-home-m-seo-for-everyone__item--big $$typeof type props">
                                            <div className="p-home-m-seo-for-everyone__item-bg-wrap">
                                                <div
                                                    data-gatsby-image-wrapper=""
                                                    style={{height: "100%", width: "100%"}}
                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                >
                                                    <div style={{maxWidth: 335, display: "block"}}>
                                                        <img
                                                            alt=""
                                                            role="presentation"
                                                            aria-hidden="true"
                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='650.0000000000001' width='335' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                            style={{
                                                                maxWidth: "100%",
                                                                display: "block",
                                                                position: "static"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        aria-hidden="true"
                                                        data-placeholder-image=""

                                                        style={{
                                                            opacity: 0,
                                                            transition: "opacity 500ms linear 0s",
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            inset: 0
                                                        }}
                                                    />
                                                    <picture>
                                                        <source
                                                            type="image/webp"
                                                            sizes="(min-width: 335px) 335px, 100vw"
                                                            srcSet="/s5/static/e95d0e703c24d7e90085eb1eb0272dde/0c391/phone.webp 84w,/s5/static/e95d0e703c24d7e90085eb1eb0272dde/1da40/phone.webp 168w,/s5/static/e95d0e703c24d7e90085eb1eb0272dde/00aec/phone.webp 335w"
                                                        />
                                                        <img
                                                            data-gatsby-image-ssr=""
                                                            className="p-home-m-seo-for-everyone__item-img-phone p-home-m-seo-for-everyone__item-img-phone--ltr"
                                                            data-main-image=""
                                                            style={{objectFit: "contain", opacity: 1}}
                                                            sizes="(min-width: 335px) 335px, 100vw"
                                                            decoding="async"
                                                            loading="lazy"
                                                            alt="image"
                                                            src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/phone.png"
                                                            srcSet="/s5/static/e95d0e703c24d7e90085eb1eb0272dde/6fbb0/phone.png 84w,/s5/static/e95d0e703c24d7e90085eb1eb0272dde/11d90/phone.png 168w,/s5/static/e95d0e703c24d7e90085eb1eb0272dde/6359a/phone.png 335w"
                                                        />
                                                    </picture>
                                                </div>
                                            </div>
                                            <h3 className="p-home-m-seo-for-everyone__item-head">
                                                Nếu bạn đang tìm kiếm một sàn tảng giao dịch đáng tin cậy và ổn định
                                            </h3>
                                            <ul className="p-home-m-seo-for-everyone__item-list">
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Chúng tôi hỗ trợ tiền tệ và các hệ thống thanh toán trong nước
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Sử dụng thiết bị phù hợp với bạn Nền tảng giao dịch của chúng tôi
                                                    được tối ưu hóa ngay cả cho những chiếc điện thoại thế hệ cũ
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Thường xuyên nhận về phần thưởng và tiền thưởng để giao&nbsp;dịch
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="p-home-m-seo-for-everyone__item p-home-m-seo-for-everyone__item--big p-home-m-seo-for-everyone__item--quicker $$typeof type props">
                                            <div className="p-home-m-seo-for-everyone__item-bg-wrap">
                                                <div
                                                    data-gatsby-image-wrapper=""
                                                    style={{height: "100%", width: "100%"}}
                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                >
                                                    <div style={{maxWidth: 568, display: "block"}}>
                                                        <img
                                                            alt=""
                                                            role="presentation"
                                                            aria-hidden="true"
                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='568' width='568' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                            style={{
                                                                maxWidth: "100%",
                                                                display: "block",
                                                                position: "static"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        aria-hidden="true"
                                                        data-placeholder-image=""
                                                        style={{
                                                            opacity: 0,
                                                            transition: "opacity 500ms linear 0s",
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            inset: 0
                                                        }}
                                                    />
                                                    <picture>
                                                        <source
                                                            type="image/webp"
                                                            sizes="(min-width: 568px) 568px, 100vw"
                                                            srcSet="/s5/static/74166d4e78baae5e78f54a07c6d45e80/94b38/quicker.webp 142w,/s5/static/74166d4e78baae5e78f54a07c6d45e80/0fddd/quicker.webp 284w,/s5/static/74166d4e78baae5e78f54a07c6d45e80/e7680/quicker.webp 568w"
                                                        />
                                                        <img
                                                            data-gatsby-image-ssr=""
                                                            className="p-home-m-seo-for-everyone__item-img-quicker p-home-m-seo-for-everyone__item-img-quicker--ltr"
                                                            data-main-image=""
                                                            style={{objectFit: "contain", opacity: 1}}
                                                            sizes="(min-width: 568px) 568px, 100vw"
                                                            decoding="async"
                                                            loading="lazy"
                                                            alt="image"
                                                            src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/quicker.png"
                                                            srcSet="/s5/static/74166d4e78baae5e78f54a07c6d45e80/fd5b6/quicker.png 142w,/s5/static/74166d4e78baae5e78f54a07c6d45e80/ab434/quicker.png 284w,/s5/static/74166d4e78baae5e78f54a07c6d45e80/7c40b/quicker.png 568w"
                                                        />
                                                    </picture>
                                                </div>
                                            </div>
                                            <h3 className="p-home-m-seo-for-everyone__item-head">
                                                Nếu bạn muốn có kết quả nhanh chóng và&nbsp;mạnh&nbsp;mẽ
                                            </h3>
                                            <ul className="p-home-m-seo-for-everyone__item-list">
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Chúng tôi gợi ý bạn nên thử Quickler — một công cụ đặc biệt được
                                                    thiết kế để giao dịch tốc độ nhanh
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Rút và nạp tiền vào tài khoản bằng các phương thức thanh toán mà bạn
                                                    thích
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Nhận lợi nhuận tối đa và quyền lợi đặc biệt với trạng thái Expert
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="p-home-m-seo-for-everyone__item p-home-m-seo-for-everyone__item--small">
                                            <h3 className="p-home-m-seo-for-everyone__item-head">
                                                Nếu với bạn giao dịch không chỉ&nbsp;là&nbsp;sở&nbsp;thích
                                            </h3>
                                            <ul className="p-home-m-seo-for-everyone__item-list">
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Hãy sử dụng tín hiệu giao dịch và các công cụ&nbsp;tư&nbsp;vấn
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Tùy chỉnh giao diện và biểu đồ để phù hợp với nhu cầu của bạn
                                                </li>
                                                <li className="p-home-m-seo-for-everyone__item-list-item">
                                                    Tất cả các tính năng giao dịch tốt nhất, bao gồm cả
                                                    Trailing&nbsp;Stop&nbsp;Loss và lệnh chờ
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    className="KkOkCWm15q com-c-button com-c-button_color_accent p-home-c-button-desktop p-home-m-seo-for-everyone__button"
                                    data-trans="home_start_trading"
                                    type="button"
                                    data-test="home-page-achievements"
                                    onClick={()=>setShow(true)}
                                >
                                    Bắt đầu
                                </button>
                            </section>

                            <section className="m-seo-social p-home__section page__container">
                                <div className="m-seo-social__featured">
                                    <h2
                                        className="com-c-title m-seo-social__title"
                                        data-trans="seo_social_title"
                                    >
                                        Tham gia cộng đồng nhà giao dịch của chúng tôi
                                    </h2>
                                    <ul className="m-seo-social__featured-list">
                                        <li className="m-seo-social__featured-item">
                                            <div className="m-seo-social__featured-item-textcontent">
                                                <div className="m-seo-social__featured-item-networkname-wrap">
                                                    <div className="m-seo-social__featured-item-logo">
                                                        <div
                                                            data-gatsby-image-wrapper=""
                                                            className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                            style={{height: "100%", width: "100%"}}
                                                        >
                                                            <div style={{maxWidth: 60, display: "block"}}>
                                                                <img
                                                                    alt=""
                                                                    role="presentation"
                                                                    aria-hidden="true"
                                                                    src="data:image/svg+xml;charset=utf-8,%3Csvg height='61' width='60' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        display: "block",
                                                                        position: "static"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                aria-hidden="true"
                                                                data-placeholder-image=""
                                                                style={{
                                                                    opacity: 0,
                                                                    transition: "opacity 500ms linear 0s",
                                                                    backgroundColor: "transparent",
                                                                    position: "absolute",
                                                                    inset: 0
                                                                }}
                                                            />
                                                            <picture>
                                                                <source
                                                                    type="image/webp"
                                                                    srcSet="/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/3ff30/fb.webp 15w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/a34a5/fb.webp 30w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/e2410/fb.webp 60w"
                                                                    sizes="(min-width: 60px) 60px, 100vw"
                                                                />
                                                                <img
                                                                    width={60}
                                                                    height={61}
                                                                    data-main-image=""
                                                                    sizes="(min-width: 60px) 60px, 100vw"
                                                                    decoding="async"
                                                                    src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/fb.png"
                                                                    srcSet="/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/6ec12/fb.png 15w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/6d9eb/fb.png 30w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/f24f5/fb.png 60w"
                                                                    alt="image"
                                                                    style={{objectFit: "contain", opacity: 1}}
                                                                />
                                                            </picture>
                                                            <noscript/>
                                                        </div>
                                                    </div>
                                                    <div className="m-seo-social__featured-item-networkname">
                                                        {" "}
                                                        Facebook
                                                    </div>
                                                </div>
                                                <div className="m-seo-social__featured-item-itemname">
                                                    {" "}
                                                    Xspace Trade
                                                </div>
                                                <div className="m-seo-social__featured-item-feature-long">
                                                    {" "}
                                                    1.400.000+ người thích
                                                </div>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="m-seo-social__featured-item-link"
                                                >
                                                    Truy cập Facebook
                                                </a>
                                            </div>
                                            <div
                                                className="m-seo-social__featured-item-img m-seo-social__featured-item-img--ltr">
                                                <div
                                                    data-gatsby-image-wrapper=""
                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                    style={{height: "100%", width: "100%"}}
                                                >
                                                    <div style={{maxWidth: 241, display: "block"}}>
                                                        <img
                                                            alt=""
                                                            role="presentation"
                                                            aria-hidden="true"
                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='529' width='241' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                            style={{
                                                                maxWidth: "100%",
                                                                display: "block",
                                                                position: "static"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        aria-hidden="true"
                                                        data-placeholder-image=""
                                                        style={{
                                                            opacity: 0,
                                                            transition: "opacity 500ms linear 0s",
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            inset: 0
                                                        }}
                                                    />
                                                    <picture>
                                                        <source
                                                            type="image/webp"
                                                            srcSet="/s5/static/ade074ae95429488de5be221f6dfec63/57449/fb-big.webp 60w,/s5/static/ade074ae95429488de5be221f6dfec63/3b8e1/fb-big.webp 121w,/s5/static/ade074ae95429488de5be221f6dfec63/51545/fb-big.webp 241w"
                                                            sizes="(min-width: 241px) 241px, 100vw"
                                                        />
                                                        <img
                                                            width={241}
                                                            height={529}
                                                            data-main-image=""
                                                            sizes="(min-width: 241px) 241px, 100vw"
                                                            decoding="async"
                                                            src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/fb-big.png"
                                                            srcSet="/s5/static/ade074ae95429488de5be221f6dfec63/b8277/fb-big.png 60w,
/s5/static/ade074ae95429488de5be221f6dfec63/220a4/fb-big.png 121w,
/s5/static/ade074ae95429488de5be221f6dfec63/17124/fb-big.png 241w"
                                                            alt="image"
                                                            style={{objectFit: "contain", opacity: 1}}
                                                        />
                                                    </picture>
                                                    <noscript/>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="m-seo-social__featured-item">
                                            <div className="m-seo-social__featured-item-textcontent">
                                                <div className="m-seo-social__featured-item-networkname-wrap">
                                                    <div className="m-seo-social__featured-item-logo">
                                                        <div
                                                            data-gatsby-image-wrapper=""
                                                            className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                            style={{height: "100%", width: "100%"}}
                                                        >
                                                            <div style={{maxWidth: 60, display: "block"}}>
                                                                <img
                                                                    alt=""
                                                                    role="presentation"
                                                                    aria-hidden="true"
                                                                    src="data:image/svg+xml;charset=utf-8,%3Csvg height='61' width='60' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        display: "block",
                                                                        position: "static"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                aria-hidden="true"
                                                                data-placeholder-image=""
                                                                style={{
                                                                    opacity: 0,
                                                                    transition: "opacity 500ms linear 0s",
                                                                    backgroundColor: "transparent",
                                                                    position: "absolute",
                                                                    inset: 0
                                                                }}
                                                            />
                                                            <picture>
                                                                <source
                                                                    type="image/webp"
                                                                    srcSet="/s5/static/00f640324aee774cef3760a1537c6d37/3ff30/instagram.webp 15w,
/s5/static/00f640324aee774cef3760a1537c6d37/a34a5/instagram.webp 30w,
/s5/static/00f640324aee774cef3760a1537c6d37/e2410/instagram.webp 60w"
                                                                    sizes="(min-width: 60px) 60px, 100vw"
                                                                />
                                                                <img
                                                                    width={60}
                                                                    height={61}
                                                                    data-main-image=""
                                                                    sizes="(min-width: 60px) 60px, 100vw"
                                                                    decoding="async"
                                                                    src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/instagram.png"
                                                                    srcSet="/s5/static/00f640324aee774cef3760a1537c6d37/6ec12/instagram.png 15w,
/s5/static/00f640324aee774cef3760a1537c6d37/6d9eb/instagram.png 30w,
/s5/static/00f640324aee774cef3760a1537c6d37/f24f5/instagram.png 60w"
                                                                    alt="image"
                                                                    style={{objectFit: "contain", opacity: 1}}
                                                                />
                                                            </picture>
                                                            <noscript/>
                                                        </div>
                                                    </div>
                                                    <div className="m-seo-social__featured-item-networkname">
                                                        {" "}
                                                        Instagram
                                                    </div>
                                                </div>
                                                <div className="m-seo-social__featured-item-itemname">
                                                    {" "}
                                                    Xspace global
                                                </div>
                                                <div className="m-seo-social__featured-item-feature-long">
                                                    {" "}
                                                    170.000+ người theo dõi
                                                </div>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="m-seo-social__featured-item-link"
                                                >
                                                    Truy cập Instagram
                                                </a>
                                            </div>
                                            <div
                                                className="m-seo-social__featured-item-img m-seo-social__featured-item-img--ltr">
                                                <div
                                                    data-gatsby-image-wrapper=""
                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                    style={{height: "100%", width: "100%"}}
                                                >
                                                    <div style={{maxWidth: 241, display: "block"}}>
                                                        <img
                                                            alt=""
                                                            role="presentation"
                                                            aria-hidden="true"
                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='529' width='241' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                            style={{
                                                                maxWidth: "100%",
                                                                display: "block",
                                                                position: "static"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        aria-hidden="true"
                                                        data-placeholder-image=""
                                                        style={{
                                                            opacity: 0,
                                                            transition: "opacity 500ms linear 0s",
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            inset: 0
                                                        }}
                                                    />
                                                    <picture>
                                                        <source
                                                            type="image/webp"
                                                            srcSet="/s5/static/664b80d73a414eef135cbc09624e3525/57449/instagram-big.webp 60w,
/s5/static/664b80d73a414eef135cbc09624e3525/3b8e1/instagram-big.webp 121w,
/s5/static/664b80d73a414eef135cbc09624e3525/51545/instagram-big.webp 241w"
                                                            sizes="(min-width: 241px) 241px, 100vw"
                                                        />
                                                        <img
                                                            width={241}
                                                            height={529}
                                                            data-main-image=""
                                                            sizes="(min-width: 241px) 241px, 100vw"
                                                            decoding="async"
                                                            src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/instagram-big.png"
                                                            srcSet="/s5/static/664b80d73a414eef135cbc09624e3525/b8277/instagram-big.png 60w,
/s5/static/664b80d73a414eef135cbc09624e3525/220a4/instagram-big.png 121w,
/s5/static/664b80d73a414eef135cbc09624e3525/17124/instagram-big.png 241w"
                                                            alt="image"
                                                            style={{objectFit: "contain", opacity: 1}}
                                                        />
                                                    </picture>
                                                    <noscript/>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="m-seo-social__local">
                                    <h2
                                        className="com-c-title m-seo-social__title"
                                        data-trans="seo_social_local_title"
                                    >
                                        Cộng đồng địa phương
                                    </h2>
                                    <div className="m-seo-social__language-select-wrap">
                                        <div
                                            className="jqVNWOpUO0"
                                            style={{
                                                display: "flex",
                                                width: "fit-content",
                                                maxHeight: "100%",
                                                maxWidth: "100%",
                                                flexDirection: "column",
                                                flexShrink: 0,
                                                gap: 8
                                            }}
                                        >
                                            <button
                                                className="FIB0mYYBnG"
                                                data-test="home_language_select"
                                                type="button"
                                                aria-expanded="false"
                                                aria-haspopup="listbox"
                                                role="combobox"
                                            >
                                                <input type="hidden" defaultValue="vi-vn"/>
                                                <div
                                                    className="jqVNWOpUO0"
                                                    style={{
                                                        display: "grid",
                                                        padding: "8px 16px",
                                                        height: "100%",
                                                        maxHeight: "100%",
                                                        maxWidth: "100%",
                                                        alignItems: "center",
                                                        gap: 12,
                                                        gridAutoFlow: "column",
                                                        gridAutoColumns: "1fr auto"
                                                    }}
                                                >
                                                    <svg
                                                        className="SvgIcon-module-host-3SE"
                                                        viewBox="0 0 24 24"
                                                        role="presentation"
                                                        focusable="false"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M17.6 2H6.4C4 2 2 4 2 6.4v11.2C2 20 4 22 6.4 22h11.2c2.4 0 4.4-2 4.4-4.4V6.4C22 4 20 2 17.6 2z"
                                                            fill="#FB4B4E"
                                                        />
                                                        <path
                                                            d="M12.2 7.7l1 3 3.2.1c.2 0 .3.2.1.4L14 13l1 3c0 .2-.1.4-.3.3l-2.6-2-2.6 2c-.2 0-.4 0-.3-.2l1-3.1-2.6-2c-.2 0-.1-.3 0-.3h3.3l1-3c0-.2.3-.2.4 0z"
                                                            fill="#FFE15A"
                                                        />
                                                    </svg>
                                                    <div className="-QzGAwkD4H">
              <span
                  className="kzbPUgX-ru"
                  data-align="start"
                  data-size="M Compact"
                  data-style="Regular"
                  data-test="labelDataTest"
                  style={{color: "inherit", display: "block"}}
              >
                Tiếng Việt
              </span>
                                                    </div>
                                                    <svg
                                                        className="SvgIcon-module-host-3SE"
                                                        viewBox="0 0 24 24"
                                                        role="presentation"
                                                        focusable="false"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            fillRule="evenodd"
                                                            d="M7.293 9.293a1 1 0 000 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L12 12.586 8.707 9.293a1 1 0 00-1.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="m-seo-social__items-wrap">
                                        <div className="m-seo-social__items-bg">
                                            <div
                                                className="m-seo-social__items-bg-light m-seo-social__items-bg-light--ltr"/>
                                            <div
                                                className="m-seo-social__items-bg-happyguys m-seo-social__items-bg-happyguys--ltr">
                                                <div
                                                    data-gatsby-image-wrapper=""
                                                    style={{height: "100%", width: "100%"}}
                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                >
                                                    <div style={{maxWidth: 734, display: "block"}}>
                                                        <img
                                                            alt=""
                                                            role="presentation"
                                                            aria-hidden="true"
                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='889' width='734' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                            style={{
                                                                maxWidth: "100%",
                                                                display: "block",
                                                                position: "static"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        aria-hidden="true"
                                                        data-placeholder-image=""
                                                        style={{
                                                            opacity: 0,
                                                            transition: "opacity 500ms linear 0s",
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            inset: 0
                                                        }}
                                                    />
                                                    <picture>
                                                        <source
                                                            type="image/webp"
                                                            srcSet="/s5/static/376ff666bd9e575ec29e586ed02586b6/e4b71/happyguys.webp 184w,
/s5/static/376ff666bd9e575ec29e586ed02586b6/72050/happyguys.webp 367w,
/s5/static/376ff666bd9e575ec29e586ed02586b6/6e077/happyguys.webp 734w"
                                                            sizes="(min-width: 734px) 734px, 100vw"
                                                        />
                                                        <img
                                                            width={734}
                                                            height={889}
                                                            data-main-image=""
                                                            sizes="(min-width: 734px) 734px, 100vw"
                                                            decoding="async"
                                                            loading="lazy"
                                                            src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/happyguys.png"
                                                            srcSet="/s5/static/376ff666bd9e575ec29e586ed02586b6/4744a/happyguys.png 184w,
/s5/static/376ff666bd9e575ec29e586ed02586b6/e72a6/happyguys.png 367w,
/s5/static/376ff666bd9e575ec29e586ed02586b6/81f90/happyguys.png 734w"
                                                            alt="image"
                                                            style={{objectFit: "contain", opacity: 1}}
                                                        />
                                                    </picture>
                                                    <noscript/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="m-seo-social__items-list-content">
                                            <div className="m-seo-social__items-list-wrap">
                                                <ul className="m-seo-social__items-list">
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 36, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='37' width='36' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/e0f7e1f2e75b81ff8d7debbb0d6d0853/5df03/fb-groups.webp 9w,
/s5/static/e0f7e1f2e75b81ff8d7debbb0d6d0853/bd8c8/fb-groups.webp 18w,
/s5/static/e0f7e1f2e75b81ff8d7debbb0d6d0853/c2581/fb-groups.webp 36w"
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={36}
                                                                            height={37}
                                                                            data-main-image=""
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                            decoding="async"
                                                                            src="/s5/static/e0f7e1f2e75b81ff8d7debbb0d6d0853/717ef/fb-groups.png"
                                                                            srcSet="/s5/static/e0f7e1f2e75b81ff8d7debbb0d6d0853/4ecb0/fb-groups.png 9w,
/s5/static/e0f7e1f2e75b81ff8d7debbb0d6d0853/4be7f/fb-groups.png 18w,
/s5/static/e0f7e1f2e75b81ff8d7debbb0d6d0853/717ef/fb-groups.png 36w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">FB groups
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 60, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='61' width='60' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/3ff30/fb.webp 15w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/a34a5/fb.webp 30w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/e2410/fb.webp 60w"
                                                                            sizes="(min-width: 60px) 60px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={60}
                                                                            height={61}
                                                                            data-main-image=""
                                                                            sizes="(min-width: 60px) 60px, 100vw"
                                                                            decoding="async"
                                                                            src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/fb.png"
                                                                            srcSet="/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/6ec12/fb.png 15w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/6d9eb/fb.png 30w,
/s5/static/38edd7fac3a1ebf950836c6dbb34fdd8/f24f5/fb.png 60w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">Facebook
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 60, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='61' width='60' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/00f640324aee774cef3760a1537c6d37/3ff30/instagram.webp 15w,
/s5/static/00f640324aee774cef3760a1537c6d37/a34a5/instagram.webp 30w,
/s5/static/00f640324aee774cef3760a1537c6d37/e2410/instagram.webp 60w"
                                                                            sizes="(min-width: 60px) 60px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={60}
                                                                            height={61}
                                                                            data-main-image=""
                                                                            sizes="(min-width: 60px) 60px, 100vw"
                                                                            decoding="async"
                                                                            src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/instagram.png"
                                                                            srcSet="/s5/static/00f640324aee774cef3760a1537c6d37/6ec12/instagram.png 15w,
/s5/static/00f640324aee774cef3760a1537c6d37/6d9eb/instagram.png 30w,
/s5/static/00f640324aee774cef3760a1537c6d37/f24f5/instagram.png 60w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">Instagram
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 36, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='37' width='36' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/2855446e0aacb35978180b4c8798d2f5/5df03/telegram.webp 9w,/s5/static/2855446e0aacb35978180b4c8798d2f5/bd8c8/telegram.webp 18w,/s5/static/2855446e0aacb35978180b4c8798d2f5/c2581/telegram.webp 36w"
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={36}
                                                                            height={37}
                                                                            data-main-image=""
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                            decoding="async"
                                                                            src="/s5/static/2855446e0aacb35978180b4c8798d2f5/717ef/telegram.png"
                                                                            srcSet="/s5/static/2855446e0aacb35978180b4c8798d2f5/4ecb0/telegram.png 9w,/s5/static/2855446e0aacb35978180b4c8798d2f5/4be7f/telegram.png 18w,/s5/static/2855446e0aacb35978180b4c8798d2f5/717ef/telegram.png 36w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">Telegram
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 37, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='37' width='37' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/a774bc98db6a9f18e511e041d9adeab7/5df03/youtube.webp 9w,/s5/static/a774bc98db6a9f18e511e041d9adeab7/67c6b/youtube.webp 19w,/s5/static/a774bc98db6a9f18e511e041d9adeab7/dd5b7/youtube.webp 37w"
                                                                            sizes="(min-width: 37px) 37px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={37}
                                                                            height={37}
                                                                            className="p-home-m-seo-for-everyone__item-logo"
                                                                            data-main-image=""
                                                                            sizes="(min-width: 37px) 37px, 100vw"
                                                                            decoding="async"
                                                                            src="/s5/static/a774bc98db6a9f18e511e041d9adeab7/2176d/youtube.png"
                                                                            srcSet="/s5/static/a774bc98db6a9f18e511e041d9adeab7/4ecb0/youtube.png 9w,
/s5/static/a774bc98db6a9f18e511e041d9adeab7/1967f/youtube.png 19w,
/s5/static/a774bc98db6a9f18e511e041d9adeab7/2176d/youtube.png 37w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">Youtube
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 36, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='37' width='36' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/712b59ef907fbe7612959d1500ee6aaf/5df03/twitter.webp 9w,/s5/static/712b59ef907fbe7612959d1500ee6aaf/bd8c8/twitter.webp 18w,/s5/static/712b59ef907fbe7612959d1500ee6aaf/c2581/twitter.webp 36w"
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={36}
                                                                            height={37}
                                                                            data-main-image=""
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                            decoding="async"
                                                                            src="/s5/static/712b59ef907fbe7612959d1500ee6aaf/717ef/twitter.png"
                                                                            srcSet="/s5/static/712b59ef907fbe7612959d1500ee6aaf/4ecb0/twitter.png 9w,
/s5/static/712b59ef907fbe7612959d1500ee6aaf/4be7f/twitter.png 18w,
/s5/static/712b59ef907fbe7612959d1500ee6aaf/717ef/twitter.png 36w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">Twitter
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 36, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='37' width='36' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/e215db273b22b2ab7566bae30bdf2688/5df03/tiktok.webp 9w,/s5/static/e215db273b22b2ab7566bae30bdf2688/bd8c8/tiktok.webp 18w,/s5/static/e215db273b22b2ab7566bae30bdf2688/c2581/tiktok.webp 36w"
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={36}
                                                                            height={37}
                                                                            data-main-image=""
                                                                            sizes="(min-width: 36px) 36px, 100vw"
                                                                            decoding="async"
                                                                            src="/s5/static/e215db273b22b2ab7566bae30bdf2688/717ef/tiktok.png"
                                                                            srcSet="/s5/static/e215db273b22b2ab7566bae30bdf2688/4ecb0/tiktok.png 9w,
/s5/static/e215db273b22b2ab7566bae30bdf2688/4be7f/tiktok.png 18w,
/s5/static/e215db273b22b2ab7566bae30bdf2688/717ef/tiktok.png 36w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">TikTok</div>
                                                        </a>
                                                    </li>
                                                    <li className="m-seo-social__item">
                                                        <a
                                                            className="m-seo-social__item-link"
                                                            href="javascript:void(0)"
                                                            target="blank"
                                                        >
                                                            <div className="m-seo-social__item-logo">
                                                                <div
                                                                    data-gatsby-image-wrapper=""
                                                                    className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                    style={{height: "100%", width: "100%"}}
                                                                >
                                                                    <div style={{maxWidth: 37, display: "block"}}>
                                                                        <img
                                                                            alt=""
                                                                            role="presentation"
                                                                            aria-hidden="true"
                                                                            src="data:image/svg+xml;charset=utf-8,%3Csvg height='37' width='37' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                display: "block",
                                                                                position: "static"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        aria-hidden="true"
                                                                        data-placeholder-image=""
                                                                        style={{
                                                                            opacity: 0,
                                                                            transition: "opacity 500ms linear 0s",
                                                                            backgroundColor: "transparent",
                                                                            position: "absolute",
                                                                            inset: 0
                                                                        }}
                                                                    />
                                                                    <picture>
                                                                        <source
                                                                            type="image/webp"
                                                                            srcSet="/s5/static/49da54268f85941f9618eabd496a1905/5df03/pinterest.webp 9w,/s5/static/49da54268f85941f9618eabd496a1905/67c6b/pinterest.webp 19w,/s5/static/49da54268f85941f9618eabd496a1905/dd5b7/pinterest.webp 37w"
                                                                            sizes="(min-width: 37px) 37px, 100vw"
                                                                        />
                                                                        <img
                                                                            width={37}
                                                                            height={37}
                                                                            data-main-image=""
                                                                            sizes="(min-width: 37px) 37px, 100vw"
                                                                            decoding="async"
                                                                            src="/s5/static/49da54268f85941f9618eabd496a1905/2176d/pinterest.png"
                                                                            srcSet="/s5/static/49da54268f85941f9618eabd496a1905/4ecb0/pinterest.png 9w,
/s5/static/49da54268f85941f9618eabd496a1905/1967f/pinterest.png 19w,
/s5/static/49da54268f85941f9618eabd496a1905/2176d/pinterest.png 37w"
                                                                            alt="image"
                                                                            style={{objectFit: "contain", opacity: 1}}
                                                                        />
                                                                    </picture>
                                                                    <noscript/>
                                                                </div>
                                                            </div>
                                                            <div className="m-seo-social__item-networkname">Pinterest
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="m-seo-social__quotes-list-wrap">
                                                <div className="m-seo-social-quotes-slider">
                                                    <ul className="m-seo-social-quotes-slider__list">
                                                        <div className="slick-slider slick-initialized" dir="ltr">
                                                            <div className="slick-list" style={{padding: "0px 0"}}>
                                                                <div
                                                                    className="slick-track"
                                                                    style={{
                                                                        width: 5748,
                                                                        opacity: 1,
                                                                        transform: "translate3d(-1437px, 0px, 0px)"
                                                                    }}
                                                                >
                                                                    <div
                                                                        data-index={-2}
                                                                        tabIndex={-1}
                                                                        className="slick-slide slick-cloned"
                                                                        aria-hidden="true"
                                                                        style={{width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 1,
                                                                                                        transition: "opacity 500ms linear",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        bottom: 0,
                                                                                                        right: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/8faad/diva.webp 42w,/s5/static/bd039950303704b3c83bfdc763651d0a/d7dac/diva.webp 85w,/s5/static/bd039950303704b3c83bfdc763651d0a/ccf9b/diva.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 0
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/diva.png"
                                                                                                        srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/a08a1/diva.png 42w,/s5/static/bd039950303704b3c83bfdc763651d0a/c6796/diva.png 85w,/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/8faad/diva.webp
                                                                                                    42w,/s5/static/bd039950303704b3c83bfdc763651d0a/d7dac/diva.webp
                                                                                                    85w,/s5/static/bd039950303704b3c83bfdc763651d0a/ccf9b/diva.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png"
                                                                                                    srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/a08a1/diva.png
                                                                                                    42w,/s5/static/bd039950303704b3c83bfdc763651d0a/c6796/diva.png
                                                                                                    85w,/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Diva Trading
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        “Trong nhóm này có rất nhiều
                                                                                        kiến
                                                                                        thức, lý thuyết
                                                                                        giao dịch cơ bản mà tôi có thể
                                                                                        nhận
                                                                                        được miễn phí
                                                                                        và tôi có thể học hỏi từ các nhà
                                                                                        giao dịch thành
                                                                                        công”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={-1}
                                                                        tabIndex={-1}
                                                                        className="slick-slide slick-cloned"
                                                                        aria-hidden="true"
                                                                        style={{width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 1,
                                                                                                        transition: "opacity 500ms linear",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        bottom: 0,
                                                                                                        right: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/8faad/rakhee.webp 42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/d7dac/rakhee.webp 85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/ccf9b/rakhee.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 0
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/rakhee.png"
                                                                                                        srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/a08a1/rakhee.png 42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/c6796/rakhee.png 85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/8faad/rakhee.webp
                                                                                                    42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/d7dac/rakhee.webp
                                                                                                    85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/ccf9b/rakhee.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png"
                                                                                                    srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/a08a1/rakhee.png
                                                                                                    42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/c6796/rakhee.png
                                                                                                    85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Rakhee Ranjan
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        "Các cuộc thảo luận trong nhóm
                                                                                        này
                                                                                        khá hấp dẫn,
                                                                                        chúng cũng giúp bạn mở rộng tầm
                                                                                        nhìn
                                                                                        của mình”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={0}
                                                                        className="slick-slide"
                                                                        tabIndex={-1}
                                                                        aria-hidden="true"
                                                                        style={{outline: "none", width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 0,
                                                                                                        transition: "opacity 500ms linear 0s",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        inset: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/8faad/rafa.webp 42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/d7dac/rafa.webp 85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/ccf9b/rafa.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 1
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/rafa.png"
                                                                                                        srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/a08a1/rafa.png 42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/c6796/rafa.png 85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/b83f4/rafa.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/8faad/rafa.webp
                                                                                                    42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/d7dac/rafa.webp
                                                                                                    85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/ccf9b/rafa.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/b83f4/rafa.png"
                                                                                                    srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/a08a1/rafa.png
                                                                                                    42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/c6796/rafa.png
                                                                                                    85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/b83f4/rafa.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Rafa Moreno
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        “Các bạn đã cung cấp các phân
                                                                                        tích
                                                                                        để giúp tôi có
                                                                                        thể thực hiện các giao dịch khác
                                                                                        với
                                                                                        trước đây,
                                                                                        các bạn và nhóm của các bạn hỗ
                                                                                        trợ
                                                                                        chúng tôi rất
                                                                                        nhiều, điều đó giúp ích rất lớn,
                                                                                        cảm
                                                                                        ơn các bạn
                                                                                        rất nhiều.”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={1}
                                                                        className="slick-slide slick-active slick-center slick-current"
                                                                        tabIndex={-1}
                                                                        aria-hidden="false"
                                                                        style={{outline: "none", width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 0,
                                                                                                        transition: "opacity 500ms linear 0s",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        inset: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/8faad/ayu.webp 42w,/s5/static/1a998be421ac996209e3e6632cda17fb/d7dac/ayu.webp 85w,/s5/static/1a998be421ac996209e3e6632cda17fb/ccf9b/ayu.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 1
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/ayu.png"
                                                                                                        srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/a08a1/ayu.png 42w,/s5/static/1a998be421ac996209e3e6632cda17fb/c6796/ayu.png 85w,/s5/static/1a998be421ac996209e3e6632cda17fb/b83f4/ayu.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/8faad/ayu.webp
                                                                                                    42w,/s5/static/1a998be421ac996209e3e6632cda17fb/d7dac/ayu.webp
                                                                                                    85w,/s5/static/1a998be421ac996209e3e6632cda17fb/ccf9b/ayu.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/1a998be421ac996209e3e6632cda17fb/b83f4/ayu.png"
                                                                                                    srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/a08a1/ayu.png
                                                                                                    42w,/s5/static/1a998be421ac996209e3e6632cda17fb/c6796/ayu.png
                                                                                                    85w,/s5/static/1a998be421ac996209e3e6632cda17fb/b83f4/ayu.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Ayu Amellya
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        "Điều hữu ích nhất là số lượng
                                                                                        các
                                                                                        sự kiện hoặc
                                                                                        cuộc thi bổ sung kiến thức và
                                                                                        đặc
                                                                                        biệt là có giải
                                                                                        thưởng"
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={2}
                                                                        className="slick-slide"
                                                                        tabIndex={-1}
                                                                        aria-hidden="true"
                                                                        style={{outline: "none", width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 0,
                                                                                                        transition: "opacity 500ms linear 0s",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        inset: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/8faad/ibrahim.webp 42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/d7dac/ibrahim.webp 85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/ccf9b/ibrahim.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 1
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/ibrahim.png"
                                                                                                        srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/a08a1/ibrahim.png 42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/c6796/ibrahim.png 85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/b83f4/ibrahim.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/8faad/ibrahim.webp
                                                                                                    42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/d7dac/ibrahim.webp
                                                                                                    85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/ccf9b/ibrahim.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/b83f4/ibrahim.png"
                                                                                                    srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/a08a1/ibrahim.png
                                                                                                    42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/c6796/ibrahim.png
                                                                                                    85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/b83f4/ibrahim.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Ibrahim Hosny
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        “Chúng ta cùng chia sẻ lợi ích,
                                                                                        tất
                                                                                        cả mọi người
                                                                                        đều chia sẻ những kiến thức mình
                                                                                        có
                                                                                        và chúng ta
                                                                                        cùng có lợi”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={3}
                                                                        className="slick-slide"
                                                                        tabIndex={-1}
                                                                        aria-hidden="true"
                                                                        style={{outline: "none", width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 0,
                                                                                                        transition: "opacity 500ms linear 0s",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        inset: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/8faad/diva.webp 42w,/s5/static/bd039950303704b3c83bfdc763651d0a/d7dac/diva.webp 85w,/s5/static/bd039950303704b3c83bfdc763651d0a/ccf9b/diva.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 1
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/diva.png"
                                                                                                        srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/a08a1/diva.png 42w,/s5/static/bd039950303704b3c83bfdc763651d0a/c6796/diva.png 85w,/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/8faad/diva.webp
                                                                                                    42w,/s5/static/bd039950303704b3c83bfdc763651d0a/d7dac/diva.webp
                                                                                                    85w,/s5/static/bd039950303704b3c83bfdc763651d0a/ccf9b/diva.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png"
                                                                                                    srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/a08a1/diva.png
                                                                                                    42w,/s5/static/bd039950303704b3c83bfdc763651d0a/c6796/diva.png
                                                                                                    85w,/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Diva Trading
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        “Trong nhóm này có rất nhiều
                                                                                        kiến
                                                                                        thức, lý thuyết
                                                                                        giao dịch cơ bản mà tôi có thể
                                                                                        nhận
                                                                                        được miễn phí
                                                                                        và tôi có thể học hỏi từ các nhà
                                                                                        giao dịch thành
                                                                                        công”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={4}
                                                                        className="slick-slide"
                                                                        tabIndex={-1}
                                                                        aria-hidden="true"
                                                                        style={{outline: "none", width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 0,
                                                                                                        transition: "opacity 500ms linear 0s",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        inset: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/8faad/rakhee.webp 42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/d7dac/rakhee.webp 85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/ccf9b/rakhee.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 1
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/rakhee.png"
                                                                                                        srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/a08a1/rakhee.png 42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/c6796/rakhee.png 85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/8faad/rakhee.webp
                                                                                                    42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/d7dac/rakhee.webp
                                                                                                    85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/ccf9b/rakhee.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png"
                                                                                                    srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/a08a1/rakhee.png
                                                                                                    42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/c6796/rakhee.png
                                                                                                    85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Rakhee Ranjan
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        "Các cuộc thảo luận trong nhóm
                                                                                        này
                                                                                        khá hấp dẫn,
                                                                                        chúng cũng giúp bạn mở rộng tầm
                                                                                        nhìn
                                                                                        của mình”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={5}
                                                                        tabIndex={-1}
                                                                        className="slick-slide slick-cloned"
                                                                        aria-hidden="true"
                                                                        style={{width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 0,
                                                                                                        transition: "opacity 500ms linear 0s",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        inset: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/8faad/rafa.webp 42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/d7dac/rafa.webp 85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/ccf9b/rafa.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 1
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/rafa.png"
                                                                                                        srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/a08a1/rafa.png 42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/c6796/rafa.png 85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/b83f4/rafa.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/8faad/rafa.webp
                                                                                                    42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/d7dac/rafa.webp
                                                                                                    85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/ccf9b/rafa.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/b83f4/rafa.png"
                                                                                                    srcSet="/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/a08a1/rafa.png
                                                                                                    42w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/c6796/rafa.png
                                                                                                    85w,/s5/static/305f3b8c16f3861ce01f26dbe9fe1722/b83f4/rafa.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Rafa Moreno
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        “Các bạn đã cung cấp các phân
                                                                                        tích
                                                                                        để giúp tôi có
                                                                                        thể thực hiện các giao dịch khác
                                                                                        với
                                                                                        trước đây,
                                                                                        các bạn và nhóm của các bạn hỗ
                                                                                        trợ
                                                                                        chúng tôi rất
                                                                                        nhiều, điều đó giúp ích rất lớn,
                                                                                        cảm
                                                                                        ơn các bạn
                                                                                        rất nhiều.”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={6}
                                                                        tabIndex={-1}
                                                                        className="slick-slide slick-center slick-cloned"
                                                                        aria-hidden="true"
                                                                        style={{width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 1,
                                                                                                        transition: "opacity 500ms linear",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        bottom: 0,
                                                                                                        right: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/8faad/ayu.webp 42w,/s5/static/1a998be421ac996209e3e6632cda17fb/d7dac/ayu.webp 85w,/s5/static/1a998be421ac996209e3e6632cda17fb/ccf9b/ayu.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 0
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/ayu.png"
                                                                                                        srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/a08a1/ayu.png 42w,/s5/static/1a998be421ac996209e3e6632cda17fb/c6796/ayu.png 85w,/s5/static/1a998be421ac996209e3e6632cda17fb/b83f4/ayu.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/8faad/ayu.webp
                                                                                                    42w,/s5/static/1a998be421ac996209e3e6632cda17fb/d7dac/ayu.webp
                                                                                                    85w,/s5/static/1a998be421ac996209e3e6632cda17fb/ccf9b/ayu.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/1a998be421ac996209e3e6632cda17fb/b83f4/ayu.png"
                                                                                                    srcSet="/s5/static/1a998be421ac996209e3e6632cda17fb/a08a1/ayu.png
                                                                                                    42w,/s5/static/1a998be421ac996209e3e6632cda17fb/c6796/ayu.png
                                                                                                    85w,/s5/static/1a998be421ac996209e3e6632cda17fb/b83f4/ayu.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Ayu Amellya
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        "Điều hữu ích nhất là số lượng
                                                                                        các
                                                                                        sự kiện hoặc
                                                                                        cuộc thi bổ sung kiến thức và
                                                                                        đặc
                                                                                        biệt là có giải
                                                                                        thưởng"
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={7}
                                                                        tabIndex={-1}
                                                                        className="slick-slide slick-cloned"
                                                                        aria-hidden="true"
                                                                        style={{width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 1,
                                                                                                        transition: "opacity 500ms linear",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        bottom: 0,
                                                                                                        right: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/8faad/ibrahim.webp 42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/d7dac/ibrahim.webp 85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/ccf9b/ibrahim.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 0
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/ibrahim.png"
                                                                                                        srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/a08a1/ibrahim.png 42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/c6796/ibrahim.png 85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/b83f4/ibrahim.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/8faad/ibrahim.webp
                                                                                                    42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/d7dac/ibrahim.webp
                                                                                                    85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/ccf9b/ibrahim.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/b83f4/ibrahim.png"
                                                                                                    srcSet="/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/a08a1/ibrahim.png
                                                                                                    42w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/c6796/ibrahim.png
                                                                                                    85w,/s5/static/ce6ab1e9f4a43bbdf98725ad53a6251e/b83f4/ibrahim.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Ibrahim Hosny
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        “Chúng ta cùng chia sẻ lợi ích,
                                                                                        tất
                                                                                        cả mọi người
                                                                                        đều chia sẻ những kiến thức mình
                                                                                        có
                                                                                        và chúng ta
                                                                                        cùng có lợi”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={8}
                                                                        tabIndex={-1}
                                                                        className="slick-slide slick-cloned"
                                                                        aria-hidden="true"
                                                                        style={{width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 1,
                                                                                                        transition: "opacity 500ms linear",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        bottom: 0,
                                                                                                        right: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/8faad/diva.webp 42w,/s5/static/bd039950303704b3c83bfdc763651d0a/d7dac/diva.webp 85w,/s5/static/bd039950303704b3c83bfdc763651d0a/ccf9b/diva.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 0
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/diva.png"
                                                                                                        srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/a08a1/diva.png 42w,/s5/static/bd039950303704b3c83bfdc763651d0a/c6796/diva.png 85w,/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/8faad/diva.webp
                                                                                                    42w,/s5/static/bd039950303704b3c83bfdc763651d0a/d7dac/diva.webp
                                                                                                    85w,/s5/static/bd039950303704b3c83bfdc763651d0a/ccf9b/diva.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png"
                                                                                                    srcSet="/s5/static/bd039950303704b3c83bfdc763651d0a/a08a1/diva.png
                                                                                                    42w,/s5/static/bd039950303704b3c83bfdc763651d0a/c6796/diva.png
                                                                                                    85w,/s5/static/bd039950303704b3c83bfdc763651d0a/b83f4/diva.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Diva Trading
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        “Trong nhóm này có rất nhiều
                                                                                        kiến
                                                                                        thức, lý thuyết
                                                                                        giao dịch cơ bản mà tôi có thể
                                                                                        nhận
                                                                                        được miễn phí
                                                                                        và tôi có thể học hỏi từ các nhà
                                                                                        giao dịch thành
                                                                                        công”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-index={9}
                                                                        tabIndex={-1}
                                                                        className="slick-slide slick-cloned"
                                                                        aria-hidden="true"
                                                                        style={{width: 479}}
                                                                    >
                                                                        <div>
                                                                            <li className="p-home-m-seo-quotes__item p-home-m-seo-quotes__item--ltr">
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-img-wrap">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-progressbar">
                                                                                        <svg viewBox="0 0 100 100">
                                                                                            <path
                                                                                                d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92"/>
                                                                                        </svg>
                                                                                        <div
                                                                                            className="p-home-m-seo-quotes__item-img">
                                                                                            <div
                                                                                                data-gatsby-image-wrapper=""
                                                                                                style={{
                                                                                                    height: "100%",
                                                                                                    width: "100%"
                                                                                                }}
                                                                                                className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        maxWidth: 169,
                                                                                                        display: "block"
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        alt=""
                                                                                                        role="presentation"
                                                                                                        aria-hidden="true"
                                                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg height='169' width='169' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                                                                                                        style={{
                                                                                                            maxWidth: "100%",
                                                                                                            display: "block",
                                                                                                            position: "static"
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div
                                                                                                    aria-hidden="true"
                                                                                                    data-placeholder-image=""
                                                                                                    style={{
                                                                                                        opacity: 1,
                                                                                                        transition: "opacity 500ms linear",
                                                                                                        backgroundColor: "transparent",
                                                                                                        position: "absolute",
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        bottom: 0,
                                                                                                        right: 0
                                                                                                    }}
                                                                                                />
                                                                                                <picture>
                                                                                                    <source
                                                                                                        type="image/webp"
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/8faad/rakhee.webp 42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/d7dac/rakhee.webp 85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/ccf9b/rakhee.webp 169w"
                                                                                                    />
                                                                                                    <img
                                                                                                        data-gatsby-image-ssr=""
                                                                                                        data-main-image=""
                                                                                                        style={{
                                                                                                            objectFit: "contain",
                                                                                                            opacity: 0
                                                                                                        }}
                                                                                                        sizes="(min-width: 169px) 169px, 100vw"
                                                                                                        decoding="async"
                                                                                                        loading="lazy"
                                                                                                        alt="image"
                                                                                                        src="./Top nhà môi giới giao dịch trực tuyến - Olymp Trade_files/rakhee.png"
                                                                                                        srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/a08a1/rakhee.png 42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/c6796/rakhee.png 85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png 169w"
                                                                                                    />
                                                                                                </picture>
                                                                                                <noscript>
                                                                                                    &lt;picture&gt; &lt;source
                                                                                                    type="image/webp"
                                                                                                    srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/8faad/rakhee.webp
                                                                                                    42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/d7dac/rakhee.webp
                                                                                                    85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/ccf9b/rakhee.webp
                                                                                                    169w"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px,
                                                                                                    100vw"/&gt; &lt;img
                                                                                                    data-gatsby-image-ssr=""
                                                                                                    data-main-image=""
                                                                                                    style="object-fit:contain;opacity:0"
                                                                                                    sizes="(min-width:
                                                                                                    169px) 169px, 100vw"
                                                                                                    decoding="async"
                                                                                                    loading="lazy"
                                                                                                    src="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png"
                                                                                                    srcSet="/s5/static/e817763290e96a77b0a2e3587cc6fbc5/a08a1/rakhee.png
                                                                                                    42w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/c6796/rakhee.png
                                                                                                    85w,/s5/static/e817763290e96a77b0a2e3587cc6fbc5/b83f4/rakhee.png
                                                                                                    169w"
                                                                                                    alt="image"/&gt; &lt;/picture&gt;
                                                                                                </noscript>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="p-home-m-seo-quotes__item-textcontent">
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-name">
                                                                                        Rakhee Ranjan
                                                                                    </div>
                                                                                    <div
                                                                                        className="p-home-m-seo-quotes__item-quote">
                                                                                        "Các cuộc thảo luận trong nhóm
                                                                                        này
                                                                                        khá hấp dẫn,
                                                                                        chúng cũng giúp bạn mở rộng tầm
                                                                                        nhìn
                                                                                        của mình”
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ul>
                                                    <div className="m-seo-social-quotes-slider__navigation">
                                                        <button
                                                            className="m-seo-social-quotes-slider__nav-button m-seo-social-quotes-slider__nav-button--prev"/>
                                                        <button
                                                            className="m-seo-social-quotes-slider__nav-button m-seo-social-quotes-slider__nav-button--next"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="p-home-m-payments p-home__section">
                                <div className="page__container">
                                    <h2
                                        className="com-c-title p-home-m-payments__title"
                                        data-test="payment_title"
                                        data-trans="home_payments_title"
                                    >
                                        Không giới hạn. Không phí hoa hồng. Không chờ đợi.
                                    </h2>
                                    <p
                                        className="com-c-description p-home-m-payments__desc"
                                        data-trans="home_payments_desc"
                                    >
                                        Rút và nạp tiền nhanh chóng và dễ dàng
                                    </p>
                                    <ul data-test="psp_icons_list" className="p-home-m-payments__list">
                                        <li
                                            data-test="psp_icon_Thẻ ngân hàng"
                                            className="p-home-m-payments__item"
                                            style={{background: "rgb(32, 49, 70)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#203146"/>
                                                    <rect x={17} y={18} width={22} height={16} rx={2} fill="#0076CC"/>
                                                    <path fill="#2A405B" d="M17 22h22v3H17z"/>
                                                    <rect x={25} y={29} width={22} height={16} rx={2} fill="#33A9FF"/>
                                                    <path fill="#0076CC" d="M27 37h18v2H27zM27 41h5v2h-5z"/>
                                                    <path
                                                        d="M62.678 26.531V18h2.789c.926 0 1.62.191 2.086.574.469.383.703.95.703 1.7 0 .398-.113.751-.34 1.06a2.212 2.212 0 01-.926.709 1.96 1.96 0 011.09.738c.27.36.404.79.404 1.29 0 .765-.248 1.366-.744 1.804-.496.438-1.197.656-2.103.656h-2.96zm1.125-3.99v3.07h1.857c.524 0 .936-.134 1.237-.404.304-.273.456-.648.456-1.125 0-1.027-.558-1.541-1.675-1.541h-1.875zm0-.902h1.699c.492 0 .885-.123 1.178-.37.297-.246.445-.58.445-1.001 0-.47-.137-.809-.41-1.02-.274-.215-.69-.322-1.248-.322h-1.664v2.713zM75.105 24.305h-3.574l-.803 2.226h-1.16L72.826 18h.984l3.264 8.531H75.92l-.815-2.226zm-3.234-.926h2.9l-1.453-3.99-1.447 3.99zM85.02 26.531h-1.132l-4.295-6.574v6.574h-1.13V18h1.13l4.307 6.604V18h1.12v8.531zM89.425 22.564l-1.043 1.084v2.883h-1.125V18h1.125v4.219L92.173 18h1.36l-3.358 3.768 3.621 4.763h-1.348l-3.023-3.966zM71.063 40.148c-.037.792-.25 1.493-.641 2.102-.39.604-.94 1.073-1.649 1.406-.703.334-1.507.5-2.414.5-1.494 0-2.671-.487-3.53-1.46-.86-.975-1.29-2.35-1.29-4.126v-.562c0-1.115.193-2.089.578-2.922.39-.839.95-1.484 1.68-1.938.729-.458 1.573-.687 2.531-.687 1.38 0 2.49.364 3.328 1.094.839.724 1.315 1.724 1.43 3h-2.734c-.021-.693-.196-1.19-.524-1.492-.328-.303-.828-.454-1.5-.454-.682 0-1.182.256-1.5.766-.318.51-.484 1.325-.5 2.445v.805c0 1.214.151 2.08.453 2.602.307.52.834.78 1.578.78.63 0 1.112-.148 1.446-.444.333-.297.51-.769.53-1.415h2.728zM77 44c-.094-.172-.177-.425-.25-.758-.484.61-1.162.914-2.031.914-.797 0-1.474-.24-2.031-.718-.558-.485-.836-1.092-.836-1.82 0-.918.338-1.61 1.015-2.079.677-.469 1.662-.703 2.953-.703h.813v-.445c0-.776-.336-1.164-1.008-1.164-.625 0-.938.307-.938.921h-2.632c0-.817.346-1.481 1.039-1.992.698-.51 1.586-.765 2.664-.765s1.93.263 2.555.789c.624.526.945 1.247.96 2.164v3.742c.01.776.13 1.37.36 1.781V44H77zm-1.648-1.719c.328 0 .599-.07.812-.21.219-.141.375-.3.469-.477v-1.352h-.766c-.916 0-1.375.412-1.375 1.235 0 .24.08.434.242.586a.886.886 0 00.618.218zm10.5-4.351l-.868-.063c-.828 0-1.359.26-1.593.781V44h-2.633v-8.453h2.469l.085 1.086c.443-.828 1.06-1.242 1.852-1.242.281 0 .526.03.734.093l-.046 2.446zm.46 1.78c0-1.338.29-2.392.868-3.163.578-.771 1.385-1.156 2.422-1.156.755 0 1.39.297 1.906.89V32h2.64v12h-2.367l-.133-.906c-.541.708-1.229 1.062-2.062 1.062-1.005 0-1.802-.385-2.39-1.156-.59-.77-.883-1.867-.883-3.29zm2.633.165c0 1.5.438 2.25 1.313 2.25.583 0 1-.245 1.25-.734v-3.22c-.24-.5-.651-.75-1.235-.75-.812 0-1.252.657-1.32 1.97l-.008.484zm11.125 1.75c0-.224-.117-.404-.351-.54-.235-.135-.68-.275-1.336-.42-.656-.147-1.198-.337-1.625-.571-.427-.24-.753-.529-.977-.867a2.062 2.062 0 01-.336-1.164c0-.777.32-1.415.961-1.915.64-.505 1.48-.757 2.516-.757 1.114 0 2.01.252 2.687.757.677.506 1.016 1.17 1.016 1.993h-2.64c0-.677-.357-1.016-1.07-1.016-.277 0-.509.078-.696.234a.702.702 0 00-.281.57c0 .235.114.425.343.571.23.146.594.266 1.094.36.505.093.948.205 1.328.335 1.271.438 1.906 1.222 1.906 2.352 0 .77-.343 1.398-1.031 1.883-.682.484-1.568.726-2.656.726-.724 0-1.37-.13-1.938-.39-.567-.26-1.01-.615-1.328-1.063-.318-.448-.476-.92-.476-1.414h2.46c.011.39.141.677.391.86.25.176.57.265.961.265.36 0 .628-.073.805-.219a.696.696 0 00.273-.57z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_DBS Bank Singapore"
                                            className="p-home-m-payments__item"
                                            style={{background: "rgb(255, 51, 51)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <path
                                                        d="M0 16C0 7.16344 7.16344 0 16 0H112C120.837 0 128 7.16344 128 16V48C128 56.8366 120.837 64 112 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M13.3164 42.6764H34.648V21.3233H13.3164V42.6764Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M33.9515 42.0061L26.2107 35.5082C26.2107 35.5082 25.1621 34.4834 23.9859 34.4834C22.7979 34.4834 21.7493 35.5082 21.7493 35.5082L14.0109 42.0061L13.9861 41.9837L20.4786 34.2351C20.4786 34.2351 21.5001 33.189 21.5001 31.9975C21.5001 30.8177 20.4786 29.7704 20.4786 29.7704L13.9861 22.016L14.0109 21.9888L21.7493 28.4938C21.7493 28.4938 22.7979 29.521 23.9859 29.521C25.1621 29.521 26.2107 28.4938 26.2107 28.4938L33.9515 21.9888L33.9833 22.0231L27.4778 29.7704C27.4778 29.7704 26.4634 30.8177 26.4634 31.9975C26.4634 33.189 27.4778 34.2351 27.4778 34.2351L33.9833 41.9813L33.9515 42.0061ZM37.5732 31.9975V31.9951C37.5732 29.8945 37.6583 28.0115 39.2147 24.704C39.6646 23.7418 40.6601 22.3399 39.1934 20.7039C38.0019 19.5147 36.6486 19.7097 35.737 20.2358C36.2613 19.3232 36.4561 17.9626 35.2658 16.7687C33.6326 15.3053 32.2273 16.2994 31.2708 16.7522C27.9631 18.3137 26.0914 18.4 23.9859 18.4C21.8721 18.4 19.998 18.3137 16.6974 16.7522C15.7362 16.2994 14.325 15.3053 12.6966 16.7687C11.5062 17.9626 11.707 19.3232 12.2313 20.2358C11.3173 19.7074 9.96162 19.5147 8.76892 20.7039C7.30343 22.3399 8.30365 23.7418 8.7453 24.704C10.3112 28.0115 10.3974 29.8945 10.3974 31.9975C10.3974 34.1063 10.3112 35.9941 8.7453 39.2992C8.30365 40.2543 7.30343 41.6657 8.76892 43.3005C9.96162 44.4861 11.3173 44.2899 12.2313 43.7698C11.707 44.6847 11.5062 46.0418 12.6966 47.2238C14.325 48.6979 15.7362 47.7014 16.6974 47.2487C20.0004 45.6883 21.8721 45.6056 23.9859 45.6056C26.0914 45.6056 27.9631 45.6883 31.2696 47.2487C32.2273 47.7014 33.6326 48.6979 35.2658 47.2238C36.4561 46.0418 36.2566 44.6847 35.7346 43.7698C36.6486 44.2899 38.0019 44.4932 39.1934 43.3005C40.6601 41.6657 39.6646 40.2543 39.2147 39.2992C37.6583 35.9893 37.5732 34.1063 37.5732 31.9975Z"
                                                        fill="#FF3333"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M62.8278 44.3963C65.4812 43.4447 68.7653 38.9126 68.2209 31.7752C67.6966 24.8707 65.0667 19.4461 58.0641 18.9366C58.0641 18.9366 56.7379 18.8409 55.6267 18.8361C54.4352 18.8279 54.1801 18.7877 54.0915 20.062C53.9392 22.4462 53.8955 41.0155 54.0478 43.6953C54.0656 44.0629 54.1057 44.9448 55.6338 45.0996C58.4278 45.3703 60.7388 45.1528 62.8278 44.3963ZM60.1188 17.7605C66.0445 17.7333 73.842 21.7996 73.8113 31.9584C73.7912 40.7945 67.4167 46.2368 61.53 46.2368L46.5811 46.2403L46.5999 45.9247C47.4407 45.7746 48.3855 45.2497 48.5425 44.6894C49.0373 42.5605 48.9251 23.0822 48.6252 19.874C48.5307 18.8704 47.7395 18.2238 46.7794 18.0654L46.7499 17.7605C46.7499 17.7605 58.7915 17.7675 60.1188 17.7605ZM92.8945 39.2566C93.0126 33.137 88.5311 31.514 83.8902 31.2598C83.7933 31.2527 83.8299 31.0234 83.902 31.0116C85.41 30.9513 91.4054 30.2562 91.1621 24.5231C90.9188 18.9366 86.6853 18.8113 85.1372 18.7877C83.8736 18.7711 83.5985 18.7711 83.0647 18.7971C82.1661 18.8361 81.9417 18.9023 81.9464 19.8787C81.9464 20.0029 81.7492 29.943 81.6311 36.9314C81.5756 40.7295 81.5603 43.6539 81.5603 43.6539C81.5827 44.3502 81.4965 45.0559 83.2088 45.1363C84.9766 45.2225 87.2557 45.2958 88.8511 44.9566C90.3119 44.6445 92.7953 43.5735 92.8945 39.2566ZM91.0605 31.0293C98.0314 32.7587 98.4518 37.7955 98.3549 39.2117C98.0361 45.5181 92.6937 46.2403 90.5421 46.2403H74.097L74.1159 45.9223C75.311 45.758 76.2073 45.1032 76.2073 43.0014L76.3041 21.2831C76.3313 18.9283 75.7125 18.2085 74.41 18.0548L74.3804 17.7605H86.8152C89.0979 17.7605 95.9719 17.3065 96.5576 23.6318C97.0229 28.6935 91.4668 30.8083 91.0605 31.0293ZM117.875 17.8467L118.157 17.8444L118.254 22.9191L117.944 22.9167C117.444 20.8504 115.46 18.9023 111.482 18.699C106.783 18.452 104.752 21.2547 104.721 23.9073C104.694 27.4322 107.442 28.1604 111.512 29.1545C113.43 29.6238 120.537 30.5517 119.968 38.545C119.573 44.1279 114.758 46.7829 107.939 46.5725C107.939 46.5725 105.106 46.4779 101.149 45.3798C100.417 45.1717 100.222 45.4188 99.9279 45.959L99.6043 45.9755L99.6149 40.5037L99.9279 40.5191C100.084 41.0734 100.127 42.1054 101.131 42.9801C101.862 43.6256 103.58 45.219 107.349 45.2604C111.047 45.31 114.113 43.7473 114.524 39.5935C114.636 38.4764 114.518 35.9196 112.024 34.754C110.073 33.8415 104.656 33.2398 102.031 30.9359C102.031 30.9359 98.917 28.7644 99.4083 24.7111C100.098 18.9827 104.875 17.55 109.166 17.4626C109.166 17.4626 113.005 17.4247 116.064 18.2156C116.064 18.2156 116.812 18.4189 117.432 18.1825C117.684 18.0985 117.802 17.9413 117.875 17.8467Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_OCBC Bank Singapore"
                                            className="p-home-m-payments__item"
                                            style={{background: "rgb(225, 26, 39)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <path
                                                        d="M0 16C0 7.16344 7.16344 0 16 0H112C120.837 0 128 7.16344 128 16V48C128 56.8366 120.837 64 112 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                        fill="#E11A27"
                                                    />
                                                    <path
                                                        d="M91.5696 34.0985C91.5696 32.924 90.8646 31.7487 89.4551 31.4354V31.357C90.5517 30.9654 91.335 29.8692 91.335 28.7726C91.335 26.8928 89.8468 25.8741 87.262 25.8741C85.7738 25.8741 84.1289 25.8741 83.111 25.9529V37.7008C84.5992 37.7008 85.9304 37.7795 86.6357 37.7795C90.3947 37.7799 91.5696 35.8209 91.5696 34.0985ZM88.8278 29.1639C88.8278 30.2605 88.0441 30.8867 86.3996 30.8867H85.4593V27.754C85.8521 27.754 86.3217 27.6757 86.792 27.6757C88.3582 27.6757 88.8278 28.3019 88.8278 29.1639ZM89.0635 34.1764C89.0635 35.273 88.2798 35.8996 86.7129 35.8996C86.243 35.8996 85.7726 35.8209 85.4597 35.8209V32.5323H86.4787C88.0449 32.5319 89.0635 33.0007 89.0635 34.1764ZM100.106 37.7011C100.028 36.997 100.028 36.2129 100.028 35.5088V31.8274C100.028 29.9475 99.1661 28.851 96.3468 28.851C95.1722 28.851 93.9973 29.0859 93.1357 29.3213L93.3711 31.2012C94.0753 30.7308 95.1722 30.4962 95.9551 30.4962C97.2867 30.4962 97.6787 30.9662 97.6787 31.8278V32.3761C94.6236 32.3761 92.5091 33.4723 92.5091 35.5867C92.5091 36.9974 93.449 37.8578 95.0152 37.8578C96.3468 37.8578 97.4433 37.1536 97.9137 36.2137C97.835 36.6833 97.835 37.1536 97.835 37.7011H100.106ZM97.757 34.0985C97.757 35.1164 96.9734 36.2129 95.8768 36.2129C95.2506 36.2129 94.8582 35.8996 94.8582 35.273C94.8582 34.5688 95.3285 33.8631 97.757 33.8631V34.0985ZM109.975 37.7011V31.592C109.975 30.1038 109.349 28.8506 107.312 28.8506C105.824 28.8506 104.805 29.5555 104.258 30.5738C104.336 30.1038 104.336 29.3989 104.336 29.0072H102.221V37.7008H104.492V33.5498C104.492 32.0616 105.432 30.7304 106.606 30.7304C107.469 30.7304 107.703 31.2787 107.703 32.2186V37.7799L109.975 37.7011ZM120 37.7011L116.632 33.0019L119.765 29.0076H116.946L114.361 32.6107V24.9342H112.09V37.7011H114.361V33.3935L117.102 37.7008L120 37.7011ZM46.8475 31.592C46.8475 27.4411 44.3411 25.6392 40.9734 25.6392C37.449 25.6392 34.6297 28.0673 34.6297 31.9049C34.6297 35.6646 36.5095 37.8574 40.5034 37.8574C44.0277 37.9361 46.8475 35.5076 46.8475 31.592ZM43.7148 31.8266C43.7148 34.489 42.07 35.4293 40.6601 35.4293C38.6236 35.4293 37.762 34.0194 37.762 31.67C37.762 29.2418 39.2502 28.1456 40.7384 28.1456C42.6966 28.1456 43.7148 29.3985 43.7148 31.8266ZM57.1859 37.4658L56.8726 35.0372C56.246 35.2722 55.3061 35.4293 54.6015 35.4293C52.2517 35.4293 51.3122 34.0973 51.3122 31.8266C51.3122 29.7122 52.4084 28.3019 54.5232 28.3019C55.3065 28.3019 56.0893 28.3806 56.873 28.6156L57.1863 26.1095C56.403 25.8741 55.4635 25.7958 54.6019 25.7958C50.3726 25.7958 48.1008 28.3019 48.1008 32.1399C48.1008 34.8806 49.4327 37.7791 54.0536 37.7791C55.0715 37.8574 56.246 37.7011 57.1859 37.4658ZM68.3859 34.0194C68.3859 32.8449 67.6023 31.6692 66.2715 31.4346V31.3567C67.3681 30.8867 68.1513 29.8688 68.1513 28.8502C68.1513 26.8924 66.5065 25.8738 63.7654 25.8738C62.1992 25.8738 60.2411 25.8738 59.0662 25.9525V37.7004C60.946 37.7004 62.3555 37.7791 63.1392 37.7791C66.8985 37.7799 68.3859 35.8996 68.3859 34.0194ZM65.0966 29.2418C65.0966 30.1817 64.3916 30.6521 62.9817 30.6521H62.1201V28.0673H63.2947C64.4703 28.0673 65.0966 28.5373 65.0966 29.2418ZM65.2532 34.0985C65.2532 35.0384 64.5483 35.5867 63.2167 35.5867C62.7468 35.5867 62.2768 35.5088 62.1205 35.5088V32.6894H63.0605C64.3916 32.6886 65.2532 33.1582 65.2532 34.0985ZM78.803 37.4658L78.4893 35.0372C77.8631 35.2722 76.9232 35.4293 76.297 35.4293C73.9468 35.4293 73.0072 34.0973 73.0072 31.8266C73.0072 29.7122 74.1038 28.3019 76.1403 28.3019C76.924 28.3019 77.7065 28.3806 78.4901 28.6156L78.8038 26.1095C78.0205 25.8741 77.0814 25.7958 76.2194 25.7958C71.9905 25.7958 69.7186 28.3019 69.7186 32.1399C69.7186 34.8806 71.0506 37.7791 75.6711 37.7791C76.7665 37.8574 77.8631 37.7011 78.803 37.4658ZM15.2053 28.1456L10.2707 24.8563C11.0544 23.7597 11.9939 22.8198 13.1688 22.1148L17.3981 26.4224C16.5369 26.8137 15.7536 27.362 15.2053 28.1456ZM13.9525 31.2004L8.39125 29.0856C8.70494 27.754 9.25285 26.5011 9.95779 25.3262L14.9703 28.4589C14.3441 29.2418 14.0304 30.1817 13.9525 31.2004ZM20.6095 33.7848L14.5787 31.435C14.7354 30.4951 15.127 29.6335 15.6753 28.9289L20.6095 32.0612V33.7848ZM20.6095 31.7487L15.9103 28.6156C16.4586 27.9106 17.2422 27.4411 18.0251 27.1274L20.5316 29.6338V31.7487H20.6095ZM8.70494 35.743C8.23498 34.4901 8 33.2365 8 31.8266C8 31.0433 8.07833 30.3384 8.23498 29.5555L13.9525 31.592V31.8266C13.9525 33.1582 14.4224 34.489 15.284 35.5076H15.3624C14.8924 34.5677 14.5787 33.6278 14.5787 32.5312C14.5787 32.2966 14.5787 32.0608 14.657 31.8266L20.7662 33.9411V35.6646L8.70494 35.743ZM9.09619 36.8396C9.01786 36.6046 8.93954 36.3692 8.7825 36.135H12.3072L12.9338 36.8396H18.1814L17.0848 38.0141H10.5844C10.4278 37.3878 9.80114 36.8396 9.09619 36.8396ZM22.4893 37.0738C22.8814 36.8395 23.273 36.6042 23.5859 36.2905C23.8209 36.1338 24.0559 35.8988 24.2125 35.6643C25.1525 34.5677 25.7008 33.3141 25.7008 31.8266C25.7008 28.5373 23.0376 25.8738 19.7479 25.8738C19.0433 25.8738 18.4163 25.9525 17.8681 26.1875L13.7171 21.6449C15.4399 20.6266 17.5547 20 19.7479 20C26.327 20 31.4962 25.2475 31.4962 31.7487C31.4962 38.2494 26.2491 43.4966 19.7479 43.4966C16.5369 43.4966 13.6388 42.165 11.446 40.0506H25.857L25.9354 39.9722L10.8194 39.424L10.7411 39.3456H26.8753L26.9536 39.2681L10.1144 38.484L9.95779 38.4057H16.5369C16.5369 38.4057 19.8262 38.484 22.4893 37.0738Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_UOB Bank Singapore"
                                            className="p-home-m-payments__item"
                                            style={{background: "rgb(0, 62, 126)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <path
                                                        d="M0 16C0 7.16344 7.16344 0 16 0H112C120.837 0 128 7.16344 128 16V48C128 56.8366 120.837 64 112 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                        fill="#003E7E"
                                                    />
                                                    <g clipPath="url(#clip0_3908_48573)">
                                                        <path
                                                            d="M106.236 31.5325C108.554 31.5325 109.597 30.5974 109.597 28.7273C109.597 26.8571 108.554 25.9221 106.584 25.9221H101.949V31.5325H106.236ZM106.004 22.6494C107.743 22.6494 108.67 21.7143 108.67 20.1948C108.67 18.5584 107.743 17.6234 106.236 17.6234H101.833V22.6494H106.004ZM112.03 24.6364C113.305 25.5714 114 27.2078 114 28.961C114 30.8312 113.305 32.2338 111.914 33.2857C110.524 34.3377 109.133 34.6883 106.7 34.6883H98.125C97.6615 34.6883 97.3139 34.3377 97.3139 33.987V15.1688C97.3139 14.8182 97.6615 14.4675 98.125 14.4675H106.352C108.785 14.4675 109.828 14.8182 110.987 15.6364C112.146 16.4545 112.957 18.0909 112.957 19.6104C112.957 21.5974 112.262 23.1169 110.639 23.8182C111.103 24.0519 111.566 24.2857 112.03 24.6364ZM63.5943 34.6883C61.0451 34.6883 59.1911 34.2208 57.8006 33.0519C55.9466 31.6494 55.3672 30.1299 55.3672 26.8571V15.0519C55.3672 14.5844 55.7148 14.3506 56.0624 14.3506H59.1911C59.6546 14.3506 59.8863 14.7013 59.8863 15.0519V26.7403C59.8863 28.8442 60.1181 29.4286 60.9292 30.1299C61.6244 30.7143 62.4356 31.0649 63.5943 31.0649C64.753 31.0649 65.5642 30.7143 66.2594 30.1299C67.0705 29.4286 67.3023 28.8442 67.3023 26.7403V15.0519C67.3023 14.5844 67.6499 14.3506 67.9975 14.3506H71.0103C71.4738 14.3506 71.7055 14.7013 71.7055 15.0519V26.8571C71.7055 30.1299 71.1262 31.6494 69.388 33.0519C67.9975 34.2208 66.2594 34.6883 63.5943 34.6883ZM84.6835 14C90.3614 14 93.9535 18.0909 93.9535 24.4026C93.9535 30.7143 90.3614 34.8052 84.6835 34.8052C79.0057 34.8052 75.4135 30.7143 75.4135 24.4026C75.4135 18.0909 79.0057 14 84.6835 14ZM84.6835 31.0649C87.6963 31.0649 89.5503 28.7273 89.5503 24.2857C89.5503 19.961 87.6963 17.5065 84.6835 17.5065C81.7867 17.5065 79.8168 19.961 79.8168 24.1688C79.7009 28.7273 81.5549 31.0649 84.6835 31.0649Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M29.9907 16.3377V30.5974H33.0035V16.3377C33.0035 15.4026 33.8146 14.5844 34.7416 14.5844C35.6686 14.5844 36.4797 15.4026 36.4797 16.3377V30.5974H39.4925V16.3377C39.4925 15.4026 40.3036 14.5844 41.2306 14.5844C42.1576 14.5844 42.9687 15.4026 42.9687 16.3377V30.5974H47.372C48.299 30.5974 49.1101 31.2987 49.1101 32.3506C49.1101 33.2857 48.299 34.1039 47.372 34.1039H42.9687V48.3636C42.9687 49.2987 42.1576 50.1169 41.2306 50.1169C40.3036 50.1169 39.4925 49.2987 39.4925 48.3636V33.987H36.4797V48.2468C36.4797 49.1818 35.6686 50 34.7416 50C33.8146 50 33.0035 49.1818 33.0035 48.2468V33.987H29.9907V48.2468C29.9907 49.1818 29.1796 50 28.2526 50C27.3256 50 26.5145 49.1818 26.5145 48.2468V33.987H23.6176V48.2468C23.6176 49.1818 22.8065 50 21.8795 50C20.9525 50 20.1414 49.1818 20.1414 48.2468V33.987H15.7381C14.8111 33.987 14 33.1688 14 32.2338C14 31.2987 14.8111 30.4805 15.7381 30.4805H20.1414V16.3377C20.1414 15.4026 20.9525 14.5844 21.8795 14.5844C22.8065 14.5844 23.6176 15.4026 23.6176 16.3377V30.5974H26.6304V16.3377C26.6304 15.4026 27.4415 14.5844 28.3685 14.5844C29.2955 14.5844 29.9907 15.4026 29.9907 16.3377Z"
                                                            fill="#ED1C2B"
                                                        />
                                                        <path
                                                            d="M61.972 37.7273V38.4286C61.972 39.2467 61.972 40.0649 61.8561 40.7662V41H67.3022V41.9351H63.2466V42.1688C63.5942 43.5714 63.9418 44.6234 64.5212 45.5584C65.2165 46.6104 66.1435 47.5454 67.4181 48.2467C67.3022 48.4805 66.9546 49.0649 66.8387 49.2987C65.4482 48.3636 64.4053 47.3117 63.7101 46.026C63.0148 44.974 62.5513 43.5714 62.3196 42.0519V41.9351H61.7402V42.0519C61.5085 42.8701 61.2767 43.6883 61.045 44.3896C60.3497 45.9091 59.0751 47.5454 57.1052 49.1818C56.9893 49.0649 56.41 48.5974 56.1782 48.4805C58.0322 47.1948 59.3068 45.7922 60.0021 44.2727C60.3497 43.6883 60.5815 42.987 60.6973 42.1688V41.9351H56.2941V41H60.9291V40.8831C61.045 40.1818 61.045 39.3636 61.045 38.5454V37.8441H61.972V37.7273Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M89.3187 37.6104C90.014 38.3117 90.7092 38.8961 91.2886 39.7143C91.1727 39.8312 90.8251 40.1818 90.7092 40.2987C90.1298 39.4805 89.5505 38.8961 89.087 38.4286L88.9711 38.3117L88.8552 38.4286C88.3917 39.1299 87.9282 39.8312 87.3488 40.5325L87.1171 40.7662C87.1171 40.8831 86.6536 41.3506 86.4218 41.5844C86.306 41.2338 86.1901 40.7662 86.0742 40.6493C86.8853 39.8312 87.6965 38.7792 88.3917 37.6104H89.3187V37.6104Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M90.593 40.7662V41.4675H89.2025V42.8701H91.0565V43.5714H89.2025V47.8961C89.2025 47.8961 90.7089 47.4286 91.0565 47.4286V48.2468C89.666 48.7143 88.0438 49.0649 86.4215 49.2987C86.4215 49.0649 86.3057 48.5974 86.3057 48.4805C87.0009 48.4805 87.5803 48.3636 88.2755 48.2468H88.3914V44.039H86.3057V43.3377H88.3914V41.9351H87.1168V41.2338H90.593V40.7662Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M87.1171 44.8571C87.3489 45.4416 87.4648 46.1429 87.4648 47.0779C87.233 47.0779 86.8854 47.0779 86.6536 47.1948C86.6536 46.2597 86.5377 45.4416 86.4219 44.974C86.6536 44.8571 86.8854 44.8571 87.1171 44.8571Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M90.3613 44.7403C90.593 44.7403 90.8248 44.7403 91.0565 44.7403C91.0565 45.4416 90.9407 46.026 90.7089 46.7273C90.4772 46.7273 90.1295 46.6104 90.0137 46.4935C90.2454 45.9091 90.3613 45.3247 90.3613 44.7403Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M95.9237 46.4935L95.8078 46.3766L95.9237 46.2597C96.619 46.026 97.1983 45.5584 97.6618 45.0909C97.546 44.974 97.1983 44.6234 97.0825 44.5065C96.619 44.974 96.1555 45.3247 95.5761 45.5584L95.4602 45.6753V45.5584C95.2285 45.0909 95.1126 44.5065 95.1126 43.8052V43.5714H97.0825V38.0779H91.8681V48.2467V48.3636C91.8681 48.3636 91.4046 48.4805 91.1729 48.4805C91.2887 48.7143 91.2887 49.0649 91.4046 49.2987C92.6792 48.948 93.838 48.7143 94.8809 48.3636V47.6623C94.5332 47.7792 92.6792 48.2467 92.6792 48.2467V43.6883H94.4174V43.8052C94.4174 44.8571 94.6491 45.6753 95.1126 46.6104C95.4602 47.4286 96.2713 48.4805 97.3142 49.4156C97.4301 49.2987 97.7777 48.8312 98.0095 48.7143C96.9666 47.8961 96.2713 47.1948 95.9237 46.4935ZM92.6792 38.7792H96.2713V40.4156H92.6792V38.7792ZM92.6792 41.1169H96.2713V42.987H92.6792V41.1169Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M104.15 40.6494C104.266 40.7662 104.614 41.1169 104.73 41.2338C104.498 41.7013 104.15 42.1688 103.803 42.6364V49.4156H102.992V43.6883C102.992 43.6883 101.949 44.7403 101.717 44.8571C101.601 44.6234 101.254 44.1558 101.138 44.039C102.181 43.2208 103.223 42.052 104.15 40.6494Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M103.919 37.6104C104.035 37.7273 104.382 37.961 104.498 38.0779C103.803 39.013 102.876 39.948 101.717 40.7662C101.601 40.5325 101.254 40.1818 101.138 39.948C102.296 39.3636 103.108 38.5454 103.919 37.6104Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M112.957 41.7013V42.5195H111.103V48.2467C111.103 48.5974 110.987 48.948 110.871 49.0649C110.64 49.1818 110.408 49.2987 109.829 49.2987H107.743C107.743 49.1818 107.627 48.5974 107.511 48.3636C107.859 48.3636 109.365 48.4805 109.365 48.4805C109.944 48.4805 110.06 48.1299 110.06 48.013V42.5195H105.425V41.7013H112.957Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M112.262 38.1948H106.004V39.013H112.262V38.1948Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M82.7139 39.3636V38.6623H79.7012V37.6104H78.7742V38.6623H74.9503V37.6104H74.0233V38.6623H71.1265V39.3636H74.0233V40.6493H71.7058V41.3506H73.3281V42.7532H71.2423V43.4545H73.3281V45.0909H71.59V45.7922H76.4567V47.1948H71.9376V47.8961H76.4567V49.4156H77.3837V47.8961H81.9028V47.1948H77.3837V45.7922H82.2505V45.0909H80.6282V43.4545H82.5981V42.7532H80.6282V41.3506H82.0187V40.6493H79.7012V39.3636H82.7139V39.3636ZM76.4567 45.2078H74.1392V43.5714H76.4567V45.2078ZM76.4567 42.7532H74.1392V41.3506H76.4567V42.7532ZM74.9503 39.3636H78.7742V40.6493H74.9503V39.3636ZM79.8171 45.2078H77.3837V43.5714H79.8171V45.2078ZM79.8171 42.7532H77.3837V41.3506H79.8171V42.7532Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <g clipPath="url(#clip1_3908_48573)">
                                                        <path
                                                            d="M106.236 31.5325C108.554 31.5325 109.597 30.5974 109.597 28.7273C109.597 26.8571 108.554 25.9221 106.584 25.9221H101.949V31.5325H106.236ZM106.004 22.6494C107.743 22.6494 108.67 21.7143 108.67 20.1948C108.67 18.5584 107.743 17.6234 106.236 17.6234H101.833V22.6494H106.004ZM112.03 24.6364C113.305 25.5714 114 27.2078 114 28.961C114 30.8312 113.305 32.2338 111.914 33.2857C110.524 34.3377 109.133 34.6883 106.7 34.6883H98.125C97.6615 34.6883 97.3139 34.3377 97.3139 33.987V15.1688C97.3139 14.8182 97.6615 14.4675 98.125 14.4675H106.352C108.785 14.4675 109.828 14.8182 110.987 15.6364C112.146 16.4545 112.957 18.0909 112.957 19.6104C112.957 21.5974 112.262 23.1169 110.639 23.8182C111.103 24.0519 111.566 24.2857 112.03 24.6364ZM63.5943 34.6883C61.0451 34.6883 59.1911 34.2208 57.8006 33.0519C55.9466 31.6494 55.3672 30.1299 55.3672 26.8571V15.0519C55.3672 14.5844 55.7148 14.3506 56.0624 14.3506H59.1911C59.6546 14.3506 59.8863 14.7013 59.8863 15.0519V26.7403C59.8863 28.8442 60.1181 29.4286 60.9292 30.1299C61.6244 30.7143 62.4356 31.0649 63.5943 31.0649C64.753 31.0649 65.5642 30.7143 66.2594 30.1299C67.0705 29.4286 67.3023 28.8442 67.3023 26.7403V15.0519C67.3023 14.5844 67.6499 14.3506 67.9975 14.3506H71.0103C71.4738 14.3506 71.7055 14.7013 71.7055 15.0519V26.8571C71.7055 30.1299 71.1262 31.6494 69.388 33.0519C67.9975 34.2208 66.2594 34.6883 63.5943 34.6883ZM84.6835 14C90.3614 14 93.9535 18.0909 93.9535 24.4026C93.9535 30.7143 90.3614 34.8052 84.6835 34.8052C79.0057 34.8052 75.4135 30.7143 75.4135 24.4026C75.4135 18.0909 79.0057 14 84.6835 14ZM84.6835 31.0649C87.6963 31.0649 89.5503 28.7273 89.5503 24.2857C89.5503 19.961 87.6963 17.5065 84.6835 17.5065C81.7867 17.5065 79.8168 19.961 79.8168 24.1688C79.7009 28.7273 81.5549 31.0649 84.6835 31.0649Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M29.9907 16.3377V30.5974H33.0035V16.3377C33.0035 15.4026 33.8146 14.5844 34.7416 14.5844C35.6686 14.5844 36.4797 15.4026 36.4797 16.3377V30.5974H39.4925V16.3377C39.4925 15.4026 40.3036 14.5844 41.2306 14.5844C42.1576 14.5844 42.9687 15.4026 42.9687 16.3377V30.5974H47.372C48.299 30.5974 49.1101 31.2987 49.1101 32.3506C49.1101 33.2857 48.299 34.1039 47.372 34.1039H42.9687V48.3636C42.9687 49.2987 42.1576 50.1169 41.2306 50.1169C40.3036 50.1169 39.4925 49.2987 39.4925 48.3636V33.987H36.4797V48.2468C36.4797 49.1818 35.6686 50 34.7416 50C33.8146 50 33.0035 49.1818 33.0035 48.2468V33.987H29.9907V48.2468C29.9907 49.1818 29.1796 50 28.2526 50C27.3256 50 26.5145 49.1818 26.5145 48.2468V33.987H23.6176V48.2468C23.6176 49.1818 22.8065 50 21.8795 50C20.9525 50 20.1414 49.1818 20.1414 48.2468V33.987H15.7381C14.8111 33.987 14 33.1688 14 32.2338C14 31.2987 14.8111 30.4805 15.7381 30.4805H20.1414V16.3377C20.1414 15.4026 20.9525 14.5844 21.8795 14.5844C22.8065 14.5844 23.6176 15.4026 23.6176 16.3377V30.5974H26.6304V16.3377C26.6304 15.4026 27.4415 14.5844 28.3685 14.5844C29.2955 14.5844 29.9907 15.4026 29.9907 16.3377Z"
                                                            fill="#ED1C2B"
                                                        />
                                                        <path
                                                            d="M61.972 37.7273V38.4286C61.972 39.2467 61.972 40.0649 61.8561 40.7662V41H67.3022V41.9351H63.2466V42.1688C63.5942 43.5714 63.9418 44.6234 64.5212 45.5584C65.2165 46.6104 66.1435 47.5454 67.4181 48.2467C67.3022 48.4805 66.9546 49.0649 66.8387 49.2987C65.4482 48.3636 64.4053 47.3117 63.7101 46.026C63.0148 44.974 62.5513 43.5714 62.3196 42.0519V41.9351H61.7402V42.0519C61.5085 42.8701 61.2767 43.6883 61.045 44.3896C60.3497 45.9091 59.0751 47.5454 57.1052 49.1818C56.9893 49.0649 56.41 48.5974 56.1782 48.4805C58.0322 47.1948 59.3068 45.7922 60.0021 44.2727C60.3497 43.6883 60.5815 42.987 60.6973 42.1688V41.9351H56.2941V41H60.9291V40.8831C61.045 40.1818 61.045 39.3636 61.045 38.5454V37.8441H61.972V37.7273Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M89.3187 37.6104C90.014 38.3117 90.7092 38.8961 91.2886 39.7143C91.1727 39.8312 90.8251 40.1818 90.7092 40.2987C90.1298 39.4805 89.5505 38.8961 89.087 38.4286L88.9711 38.3117L88.8552 38.4286C88.3917 39.1299 87.9282 39.8312 87.3488 40.5325L87.1171 40.7662C87.1171 40.8831 86.6536 41.3506 86.4218 41.5844C86.306 41.2338 86.1901 40.7662 86.0742 40.6493C86.8853 39.8312 87.6965 38.7792 88.3917 37.6104H89.3187V37.6104Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M90.593 40.7662V41.4675H89.2025V42.8701H91.0565V43.5714H89.2025V47.8961C89.2025 47.8961 90.7089 47.4286 91.0565 47.4286V48.2468C89.666 48.7143 88.0438 49.0649 86.4215 49.2987C86.4215 49.0649 86.3057 48.5974 86.3057 48.4805C87.0009 48.4805 87.5803 48.3636 88.2755 48.2468H88.3914V44.039H86.3057V43.3377H88.3914V41.9351H87.1168V41.2338H90.593V40.7662Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M87.1171 44.8571C87.3489 45.4416 87.4648 46.1429 87.4648 47.0779C87.233 47.0779 86.8854 47.0779 86.6536 47.1948C86.6536 46.2597 86.5377 45.4416 86.4219 44.974C86.6536 44.8571 86.8854 44.8571 87.1171 44.8571Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M90.3613 44.7403C90.593 44.7403 90.8248 44.7403 91.0565 44.7403C91.0565 45.4416 90.9407 46.026 90.7089 46.7273C90.4772 46.7273 90.1295 46.6104 90.0137 46.4935C90.2454 45.9091 90.3613 45.3247 90.3613 44.7403Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M95.9237 46.4935L95.8078 46.3766L95.9237 46.2597C96.619 46.026 97.1983 45.5584 97.6618 45.0909C97.546 44.974 97.1983 44.6234 97.0825 44.5065C96.619 44.974 96.1555 45.3247 95.5761 45.5584L95.4602 45.6753V45.5584C95.2285 45.0909 95.1126 44.5065 95.1126 43.8052V43.5714H97.0825V38.0779H91.8681V48.2467V48.3636C91.8681 48.3636 91.4046 48.4805 91.1729 48.4805C91.2887 48.7143 91.2887 49.0649 91.4046 49.2987C92.6792 48.948 93.838 48.7143 94.8809 48.3636V47.6623C94.5332 47.7792 92.6792 48.2467 92.6792 48.2467V43.6883H94.4174V43.8052C94.4174 44.8571 94.6491 45.6753 95.1126 46.6104C95.4602 47.4286 96.2713 48.4805 97.3142 49.4156C97.4301 49.2987 97.7777 48.8312 98.0095 48.7143C96.9666 47.8961 96.2713 47.1948 95.9237 46.4935ZM92.6792 38.7792H96.2713V40.4156H92.6792V38.7792ZM92.6792 41.1169H96.2713V42.987H92.6792V41.1169Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M104.15 40.6494C104.266 40.7662 104.614 41.1169 104.73 41.2338C104.498 41.7013 104.15 42.1688 103.803 42.6364V49.4156H102.992V43.6883C102.992 43.6883 101.949 44.7403 101.717 44.8571C101.601 44.6234 101.254 44.1558 101.138 44.039C102.181 43.2208 103.223 42.052 104.15 40.6494Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M103.919 37.6104C104.035 37.7273 104.382 37.961 104.498 38.0779C103.803 39.013 102.876 39.948 101.717 40.7662C101.601 40.5325 101.254 40.1818 101.138 39.948C102.296 39.3636 103.108 38.5454 103.919 37.6104Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M112.957 41.7013V42.5195H111.103V48.2467C111.103 48.5974 110.987 48.948 110.871 49.0649C110.64 49.1818 110.408 49.2987 109.829 49.2987H107.743C107.743 49.1818 107.627 48.5974 107.511 48.3636C107.859 48.3636 109.365 48.4805 109.365 48.4805C109.944 48.4805 110.06 48.1299 110.06 48.013V42.5195H105.425V41.7013H112.957Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M112.262 38.1948H106.004V39.013H112.262V38.1948Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M82.7139 39.3636V38.6623H79.7012V37.6104H78.7742V38.6623H74.9503V37.6104H74.0233V38.6623H71.1265V39.3636H74.0233V40.6493H71.7058V41.3506H73.3281V42.7532H71.2423V43.4545H73.3281V45.0909H71.59V45.7922H76.4567V47.1948H71.9376V47.8961H76.4567V49.4156H77.3837V47.8961H81.9028V47.1948H77.3837V45.7922H82.2505V45.0909H80.6282V43.4545H82.5981V42.7532H80.6282V41.3506H82.0187V40.6493H79.7012V39.3636H82.7139V39.3636ZM76.4567 45.2078H74.1392V43.5714H76.4567V45.2078ZM76.4567 42.7532H74.1392V41.3506H76.4567V42.7532ZM74.9503 39.3636H78.7742V40.6493H74.9503V39.3636ZM79.8171 45.2078H77.3837V43.5714H79.8171V45.2078ZM79.8171 42.7532H77.3837V41.3506H79.8171V42.7532Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_3908_48573">
                                                            <rect
                                                                width={100}
                                                                height={36}
                                                                fill="white"
                                                                transform="translate(14 14)"
                                                            />
                                                        </clipPath>
                                                        <clipPath id="clip1_3908_48573">
                                                            <rect
                                                                width={100}
                                                                height={36}
                                                                fill="white"
                                                                transform="translate(14 14)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_China UnionPay"
                                            className="p-home-m-payments__item"
                                            style={{background: "rgb(0, 89, 100)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    viewBox="0 0 128 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 16C0 7.164 7.163 0 16 0h96c8.837 0 16 7.164 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16z"
                                                        fill="#005964"
                                                    />
                                                    <path
                                                        d="M96.386 8.006H78.531c-2.502 0-5.687 2.096-6.142 4.659l-8.643 38.67a3.575 3.575 0 00-.158 1.697c.084.57.305 1.11.643 1.57.338.462.782.83 1.293 1.073.51.243 1.072.353 1.634.32H86.15a5.954 5.954 0 003.403-1.451 6.197 6.197 0 001.942-3.209l8.53-38.67a3.577 3.577 0 00.158-1.696 3.544 3.544 0 00-.644-1.571 3.43 3.43 0 00-1.292-1.073 3.342 3.342 0 00-1.634-.32"
                                                        fill="#01798A"
                                                    />
                                                    <path
                                                        d="M63.632 51.335l8.644-38.67c.568-2.563 3.64-4.66 6.141-4.66H58.173c-2.388 0-5.572 2.097-6.141 4.66l-8.53 38.67a3.574 3.574 0 00.486 3.268c.337.461.781.83 1.292 1.072a3.34 3.34 0 001.634.32h20.244a3.341 3.341 0 01-1.634-.32 3.429 3.429 0 01-1.293-1.072 3.574 3.574 0 01-.485-3.267"
                                                        fill="#024381"
                                                    />
                                                    <path
                                                        d="M43.502 51.335l8.53-38.67c.569-2.563 3.753-4.66 6.142-4.66H41.796c-2.503 0-5.687 1.981-6.37 4.66l-8.53 38.67a5.031 5.031 0 000 .7v.815a3.524 3.524 0 001.113 2.248c.631.581 1.451.9 2.3.897h16.718a3.34 3.34 0 01-1.634-.32 3.428 3.428 0 01-1.293-1.072 3.574 3.574 0 01-.485-3.267"
                                                        fill="#DD0228"
                                                    />
                                                    <path
                                                        d="M58.629 36.193h.227a.557.557 0 00.569-.232l.796-1.282h2.274l-.568.816h2.616l-.228 1.164h-3.184a1.507 1.507 0 01-.545.678 1.454 1.454 0 01-.82.254h-1.479l.342-1.398zm-.455 1.864h5.686l-.341 1.281h-2.275l-.34 1.398h2.274l-.341 1.281h-2.275l-.569 1.98c-.113.35 0 .466.569.466h1.706l-.341 1.282h-3.412c-.758 0-1.024-.389-.796-1.165l.682-2.446h-1.478l.454-1.398h1.479l.341-1.281h-1.364l.34-1.398zm9.098-3.494v.932a4.151 4.151 0 012.047-.816h3.64l-1.365 5.125c-.076.544-.569.816-1.479.816h-4.094l-1.024 3.61c0 .233 0 .35.228.35h.796l-.228 1.165h-2.047c-.758 0-1.099-.233-1.023-.7l2.73-10.366h1.933l-.114-.116zm3.184 1.514h-3.298l-.34 1.398c.45-.258.962-.379 1.478-.35h1.933l.227-1.048zm-1.137 3.261c.228 0 .341 0 .341-.233l.228-.815H66.59l-.228 1.165 2.957-.117zm-2.275 1.631h2.048v.815h.568c.228 0 .341 0 .341-.233l.114-.465h1.592l-.227.698c-.054.33-.222.628-.472.841-.25.214-.567.329-.893.324h-1.137v1.281c0 .233.341.35.682.35h.91l-.227 1.165h-2.275c-.682 0-1.023-.233-1.023-.932l.227-3.727-.228-.117zM44.412 27.807a4.68 4.68 0 01-1.706 2.912 5.597 5.597 0 01-3.525 1.165 3.785 3.785 0 01-1.6-.258 3.86 3.86 0 01-1.357-.907 2.835 2.835 0 01-.682-1.864 5.12 5.12 0 01.113-1.048l1.593-7.454h2.274l-1.478 7.338a2.384 2.384 0 000 .582c-.025.328.055.655.227.932.165.203.375.362.612.463.238.102.496.142.753.12a2.688 2.688 0 001.706-.583c.478-.37.803-.91.91-1.514l1.478-7.455h2.275l-1.479 7.571h-.114zm9.667-2.912h1.82l-1.592 6.64h-1.82l1.479-6.64h.113zm.455-2.446h1.82l-.341 1.63h-1.706l.341-1.63h-.114zm2.957 8.62a2.444 2.444 0 01-.596-.844 2.496 2.496 0 01-.2-1.02 4.415 4.415 0 010-.466l.114-.466a4.58 4.58 0 011.365-2.679 3.589 3.589 0 012.502-.932c.351-.023.704.027 1.036.148.332.12.637.307.897.551.256.234.459.521.596.843.138.322.206.67.2 1.02.008.156.008.311 0 .467v.582a4.448 4.448 0 01-1.478 2.563 3.588 3.588 0 01-2.502.931 2.69 2.69 0 01-1.934-.699zm3.412-1.282c.37-.468.607-1.033.683-1.63v-.35a3.087 3.087 0 000-.35 1.417 1.417 0 00-.342-.931 1.124 1.124 0 00-.796-.35c-.218.012-.432.07-.628.17a1.6 1.6 0 00-.51.413 3.409 3.409 0 00-.795 1.63v.233a2.397 2.397 0 000 .35 1.31 1.31 0 00.341.932 1.135 1.135 0 00.91.35c.218-.013.432-.07.628-.17.195-.101.369-.241.51-.413v.116zm14.103 6.523l.454-1.63h2.275l-.114.582a5.365 5.365 0 011.934-.583h2.73l-.456 1.63h-.455l-2.047 7.339h.455l-.455 1.514h-.455l-.113.583h-2.161l.227-.583h-4.322l.342-1.514h.455l2.047-7.338h-.455.114zm2.274 0l-.569 1.98c.59-.22 1.2-.375 1.82-.466l.455-1.514H77.28zm-.796 2.912l-.569 2.096a6.04 6.04 0 011.82-.582l.341-1.514h-1.592zm.569 4.426l.455-1.514h-1.706l-.455 1.514h1.706zm5.345-9.085h2.047v.815c0 .233.228.35.455.35h.341l-.341 1.164h-1.592c-.569 0-.91 0-.91-.582v-1.747zm-.682 2.912h6.71l-.342 1.397H85.81l-.341 1.282h2.16l-.34 1.397H84.9l-.569.932h1.138l.227 1.63c0 .234.228.234.455.234h.341l-.341 1.398H84.9c-.682 0-1.024-.233-1.137-.7l-.228-1.514-1.137 1.631a1.15 1.15 0 01-.482.47c-.202.103-.43.143-.655.113h-1.82l.341-1.282h.569a.781.781 0 00.682-.35l1.592-2.445h-2.047l.341-1.514h2.275l.455-1.282h-2.275l.342-1.514v.117zm-35.143-12.58h1.593l-.228.932.227-.35c.246-.27.546-.483.88-.624.334-.14.693-.206 1.054-.19a1.78 1.78 0 01.804.117c.256.1.487.26.674.465a2.128 2.128 0 01.228 1.747l-.91 4.659h-1.592l.796-4.193a1.308 1.308 0 000-1.049.778.778 0 00-.796-.233 1.566 1.566 0 00-1.137.35 1.998 1.998 0 00-.57 1.165l-.795 3.96h-1.593l1.252-6.756h.113zm18.538 0h1.706l-.227.932.227-.35a2.5 2.5 0 01.88-.624c.333-.14.693-.206 1.053-.19.275-.033.552.003.81.104.257.101.487.265.669.478a2.025 2.025 0 01.228 1.747l-.797 4.659h-1.706l.796-4.193a1.307 1.307 0 000-1.049.778.778 0 00-.796-.233 1.566 1.566 0 00-1.137.35 1.998 1.998 0 00-.569 1.165l-.796 3.96H63.86l1.251-6.756zm8.075-4.193h4.663a3.129 3.129 0 012.16.582c.242.24.428.532.546.854.118.322.165.667.137 1.01v1.048a4.209 4.209 0 01-1.478 2.446c-.77.639-1.74.97-2.73.932h-2.502l-.796 3.96H70.91l2.275-10.832zm1.137 5.008h2.047a2.01 2.01 0 001.365-.349c.312-.312.513-.722.569-1.165v-.582a.952.952 0 00-.341-.816 2.339 2.339 0 00-1.251-.232h-1.706l-.683 3.145zm16.15 7.106a10.524 10.524 0 01-1.706 2.795 3.533 3.533 0 01-1.328 1.005 3.451 3.451 0 01-1.63.276l.115-1.165c1.592-.465 2.388-2.678 2.843-3.727l-.569-7.221h2.275v4.659l1.933-4.66h1.933l-3.866 8.154v-.116zm-5.346-7.455l-.796.582a2.342 2.342 0 00-2.843-.35c-1.933.933-3.525 7.805 1.706 5.592l.341.35h2.047l1.365-6.407-1.82.233zm-1.137 3.494c-.341.932-1.137 1.631-1.592 1.515-.455-.117-.796-1.165-.455-2.213.341-1.049 1.024-1.631 1.592-1.515.569.117.796 1.165.455 2.213z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Perfect Money"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(191, 47, 36)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    viewBox="0 0 128 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#BF2F24"/>
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M116.2 20.64a3.8 3.8 0 110 7.6 3.8 3.8 0 010-7.6z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        d="M36.87 21.66c.5 0 .94.1 1.3.3.34.2.52.49.55.82a.86.86 0 01-.23.48.69.69 0 01-.5.17.5.5 0 01-.23-.05.6.6 0 01-.23-.15c-.18-.22-.38-.4-.63-.58a1.43 1.43 0 00-.86-.25c-.28 0-.53.1-.76.28-.22.17-.42.43-.55.75a8.44 8.44 0 00-.38 2.1c-.03.38-.03.74-.03 1.04v.56c0 .23 0 .38.03.45.03.08.13.1.3.08h2.12c.08.08.1.15.1.28l-.03.26-.02.07a.45.45 0 01-.2.17h-1.97c-.17-.02-.27.03-.3.1-.03.06-.03.2-.03.43v3.98c0 .43 0 .76.03.98.03.23.1.4.18.48.1.08.27.13.5.16l.66.05c.07.05.1.12.07.25-.02.1-.05.18-.1.23l-1.08-.08h-1.92l-.83.08c-.08-.05-.1-.13-.13-.23 0-.13.03-.2.1-.25l.43-.05c.23-.03.38-.08.48-.18.1-.08.15-.23.18-.46.05-.22.05-.55.02-.98v-3.98c.03-.22.03-.37-.02-.42-.03-.08-.16-.13-.33-.1h-.66c-.05-.06-.07-.1-.07-.16-.03-.07 0-.15.02-.2l.8-.4a.44.44 0 00.18-.13.41.41 0 00.08-.23 9.4 9.4 0 01.6-3.31c.16-.36.39-.71.66-1.07.3-.38.69-.68 1.11-.9a3.7 3.7 0 011.6-.39zM51.04 28.27a.4.4 0 00.1.18h.5c.18-.02.3.03.35.1.03.05.05.2.05.43v4.28c-.02.37.03.73.13 1 .13.3.3.56.58.73a2.67 2.67 0 002.44-.02c.33-.18.58-.36.73-.58.02-.05.02-.1-.03-.18-.02-.07-.07-.12-.15-.12-.02 0-.1.05-.2.12a.96.96 0 01-.28.13.52.52 0 00-.1.05.5.5 0 01-.1.05c-.1.02-.2.02-.27.02-.4-.02-.7-.12-.9-.32a1.2 1.2 0 01-.39-.76c-.07-.3-.1-.63-.1-1V28.9c0-.17.03-.3.08-.37.02-.08.12-.1.3-.08h2.06c.1-.07.15-.2.15-.38.03-.17-.02-.32-.15-.4h-2.06c-.15 0-.25-.02-.28-.05-.02-.02-.05-.12-.05-.3v-.83a.23.23 0 00-.2-.1c-.1-.03-.17-.03-.2 0-.1.2-.23.4-.38.6a2.1 2.1 0 01-.4.48c-.1.1-.25.2-.48.3-.2.13-.42.2-.7.28a.71.71 0 00-.05.22z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M43.14 29.6c0 .14 0 .26-.02.34l-.03.08-.02.1c-.03.04-.1.07-.28.1-.18.02-.46.02-.84.02H38.5c-.23-.03-.35 0-.4.05-.08.07-.1.22-.08.45 0 .63.13 1.2.36 1.74a2.84 2.84 0 002.75 1.73c.3.03.58-.05.83-.17.3-.13.58-.36.86-.73.13-.03.2 0 .26.02.05.05.07.13.1.2-.23.4-.48.73-.81 1a3.7 3.7 0 01-3.74.39 3.03 3.03 0 01-1.11-.88 3.84 3.84 0 01-.76-2.42c0-.78.15-1.48.45-2.11a3.7 3.7 0 013.26-2.11c.56.02 1.04.12 1.44.32.38.23.69.5.91.83.23.33.33.68.33 1.06zm-1.41-.47c0-.17-.05-.35-.13-.53a.83.83 0 00-.46-.42 1.6 1.6 0 00-.85-.2c-.38 0-.74.1-1.02.27-.32.18-.58.4-.78.66-.17.22-.28.45-.3.67 0 .03 0 .03.02.05.03.03.05.03.13.03h1.31c.69 0 1.17-.03 1.47-.05.28-.03.43-.05.48-.1a.26.26 0 00.08-.13.54.54 0 00.05-.25z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        d="M49.08 27.47a5.11 5.11 0 00-3.37.55 4.2 4.2 0 00-1.49 1.56 4.45 4.45 0 00-.18 3.55c.2.48.46.88.79 1.18.33.33.73.56 1.16.7a3.81 3.81 0 002.56.08c.38-.12.76-.35 1.14-.63.35-.27.63-.65.83-1.1-.02-.08-.05-.15-.12-.18-.05-.07-.13-.1-.23-.07-.2.32-.46.57-.79.8-.32.2-.73.3-1.26.3a2.82 2.82 0 01-2.68-1.7 3.44 3.44 0 01-.36-1.47c.03-.68.15-1.23.38-1.68.25-.43.58-.76.96-.98.38-.23.81-.33 1.24-.33.38 0 .76.1 1.1.3.32.18.57.4.78.66.05.05.1.1.15.12h.13c.12 0 .2-.07.27-.2.08-.13.13-.3.13-.48 0-.15-.02-.3-.08-.43a.7.7 0 00-.22-.3c-.26-.1-.54-.17-.84-.25zM107.56 27.57c-.08.02-.1.1-.13.2 0 .13.03.2.08.25l.58.1c.17.03.27.08.35.13.08.05.1.1.1.18 0 .12-.05.33-.18.65l-.01.05-.46 1.17-.63 1.49-.04.09-.42.87c-.13.28-.2.4-.23.4a11.26 11.26 0 01-.47-1.08l-.08-.23-.58-1.72-.03-.06a5.38 5.38 0 01-.17-.5l-.11-.34-.12-.36a1.7 1.7 0 01-.1-.5c0-.06.03-.11.08-.14h.02l.04-.02c.06-.02.15-.06.26-.08l.46-.1c.07-.05.1-.12.07-.25 0-.1-.05-.18-.12-.2a9.3 9.3 0 01-.41.02l-.42.03h-1.67c-.14-.02-.3-.02-.45-.03l-.43-.02c-.08.02-.13.1-.13.2-.02.13 0 .2.05.25l.48.1c.33.08.56.23.68.46.13.23.28.55.4.98l1.5 4.02c.12.33.2.58.25.76v.02c.02.17.05.34.05.51 0 .13-.03.28-.08.43a1.7 1.7 0 01-.09.34v.02l-.01.02c-.08.23-.23.53-.4.86-.18.38-.4.79-.69 1.22-.07.1-.15.17-.25.25a.84.84 0 01-.37.07h-.36c-.2 0-.38.08-.53.2a.94.94 0 00-.22.56c0 .23.07.43.22.58.15.13.36.2.6.2.23.03.44-.02.64-.15.22-.12.4-.38.58-.73l.3-.65.48-1.04.34-.74.52-1.1c.26-.62.53-1.18.78-1.7l.02-.05c.26-.5.46-.94.6-1.27l1.04-2.12c.33-.66.58-1.14.8-1.44.24-.3.51-.48.79-.56l.33-.05c.07-.07.1-.15.1-.25-.03-.1-.08-.18-.15-.2l-.35.02-.36.03h-1.48l-.44-.03-.42-.02zM28.1 27.17a.2.2 0 01.05.12v1.06c0 .08.03.15.05.18.33-.28.68-.56 1.04-.78.32-.23.68-.33 1.03-.36.23.03.43.1.58.23.18.13.25.3.25.56-.02.27-.13.5-.28.65a.88.88 0 01-.52.18c-.1 0-.18 0-.23-.03a.49.49 0 01-.06-.03.46.46 0 00-.12-.07 2.4 2.4 0 00-.43-.22 1.16 1.16 0 00-.4-.08.6.6 0 00-.38.1.73.73 0 00-.27.28c-.08.13-.16.3-.2.58-.03.25-.06.53-.06.86v2.55c0 .43 0 .76.03.98.02.23.1.4.23.48.07.08.25.13.47.16l.68.05c.08.05.1.12.08.25 0 .1-.03.18-.1.23l-1.1-.08h-1.9l-.8.08c-.05-.05-.08-.13-.1-.23-.03-.13 0-.2.07-.25l.38-.05c.2-.03.35-.1.45-.18.1-.08.18-.23.2-.46.03-.22.03-.55 0-.98v-3.28c.03-.23.03-.4 0-.53a.6.6 0 00-.12-.36 1.06 1.06 0 00-.35-.25l-.18-.15c-.03-.03-.05-.08-.05-.15 0-.08.02-.16.1-.18l.06-.02a4 4 0 00.66-.3l.54-.26.02-.02c.24-.12.44-.21.58-.31.05 0 .08 0 .1.03z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M25.15 29.94c.02-.08.02-.2.02-.33 0-.38-.1-.73-.33-1.06a2.9 2.9 0 00-.9-.83c-.4-.2-.89-.3-1.42-.32a3.8 3.8 0 00-1.97.6c-.56.38-.99.88-1.31 1.5a4.8 4.8 0 00-.28 3.38 3.18 3.18 0 001.67 2.04c.48.22 1.03.32 1.64.35a3.68 3.68 0 002.12-.73c.33-.28.58-.6.8-1-.02-.08-.04-.16-.1-.2a.43.43 0 00-.25-.03 2.06 2.06 0 01-1.71.9 2.8 2.8 0 01-2.73-1.73 4.36 4.36 0 01-.36-1.74c-.02-.23 0-.38.08-.45.05-.05.18-.08.4-.05h3.46c.38 0 .66 0 .84-.03.18-.02.25-.05.28-.1l.02-.09a.8.8 0 01.03-.08zm-1.52-1.34c.1.18.13.36.1.53 0 .13 0 .2-.02.25-.03.08-.05.1-.08.13-.05.05-.23.07-.5.1-.28.02-.76.05-1.44.05h-1.32c-.07 0-.1 0-.12-.03-.03-.02-.03-.02-.03-.05.03-.22.13-.45.3-.67.2-.26.46-.48.79-.66a1.9 1.9 0 011-.27c.39 0 .66.07.87.2.22.1.38.25.45.42z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        d="M88.79 27.17c-.05-.03-.1-.03-.13-.03a4 4 0 01-.53.33l-.3.14c-.33.16-.7.33-1.03.44-.05.02-.07.1-.07.18 0 .07.02.12.05.15l.17.1.1.07c.1.1.2.17.25.23.08.1.09.14.1.25l.01.02c.02.1.02.3.02.5v3.4c.02.43 0 .76-.03.98-.02.23-.07.38-.17.46-.1.1-.25.15-.48.18l-.4.05c-.05.05-.08.12-.05.25 0 .1.02.18.1.23l.83-.08h1.84l.75.08c.07-.05.1-.13.12-.23 0-.13-.02-.2-.07-.25l-.33-.05c-.23-.03-.4-.1-.5-.18a.78.78 0 01-.18-.46c-.02-.22-.02-.55-.02-.98V30.1c0-.43 0-.78.25-1.14.12-.18.35-.35.65-.48.28-.13.58-.18.96-.18.62.03 1.05.2 1.33.53a2 2 0 01.4 1.32v2.8c0 .43 0 .76-.03.98a.78.78 0 01-.17.46 1.2 1.2 0 01-.5.18l-.36.05c-.05.05-.07.12-.07.25.02.1.05.18.12.23l.8-.08h1.82l.52.05.33.03c.05-.05.1-.13.13-.23 0-.13-.03-.2-.1-.25l-.4-.05a.92.92 0 01-.5-.18.78.78 0 01-.18-.46c-.03-.22-.03-.55-.03-.98v-3.23c0-.43-.08-.81-.23-1.14a1.95 1.95 0 00-.7-.86c-.33-.2-.73-.3-1.25-.33-.48.03-.93.13-1.36.3-.43.18-.86.41-1.26.66a.2.2 0 01-.12-.05.2.2 0 01-.05-.12v-.38c0-.13 0-.3.02-.5a.27.27 0 00-.07-.13z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M86.03 31.24a4.62 4.62 0 01-.5 2.1 3.6 3.6 0 01-1.4 1.42 4.5 4.5 0 01-2.07.5 4.54 4.54 0 01-1.94-.47 3.53 3.53 0 01-1.34-1.3 3.83 3.83 0 01-.53-2.05c0-.8.17-1.5.53-2.1a3.7 3.7 0 011.44-1.41c.58-.33 1.26-.5 2.02-.53a4.4 4.4 0 011.9.47c.58.33 1.03.78 1.36 1.36.33.58.5 1.26.53 2.01zm-1.84-1.33c-.18-.55-.43-1-.79-1.36-.33-.37-.8-.57-1.39-.57-.63 0-1.16.27-1.54.85-.4.53-.6 1.33-.63 2.36 0 .58.1 1.14.28 1.69.17.53.43.95.8 1.3.33.33.79.51 1.35.51.53 0 .96-.15 1.29-.48a4.1 4.1 0 00.86-2.67 4.64 4.64 0 00-.23-1.63zM96.62 30.29c.08-.05.2-.08.44-.05h3.5c.38 0 .66 0 .83-.03.35-.05.36-.27.36-.6 0-.38-.13-.73-.36-1.06-.2-.32-.5-.6-.89-.83-.4-.2-.9-.3-1.45-.32a3.76 3.76 0 00-3.3 2.1 4.45 4.45 0 00.31 4.54c.28.35.64.65 1.1.88.48.22 1.02.32 1.63.35a3.64 3.64 0 002.14-.73c.34-.28.62-.6.85-1-.03-.08-.06-.16-.13-.2-.05-.03-.13-.06-.26-.03-.28.37-.56.6-.84.73-.25.12-.53.2-.87.17-.68 0-1.25-.15-1.7-.48-.46-.3-.82-.73-1.07-1.25a4.3 4.3 0 01-.37-1.94c0-.12.03-.2.08-.25zm.26-.63c-.05 0-.08 0-.1-.03l-.03-.02v-.03c.03-.22.13-.45.3-.67.21-.26.47-.48.77-.66.3-.18.67-.27 1.05-.27.36 0 .64.07.84.2a1 1 0 01.48.42c.08.18.13.36.1.53 0 .13 0 .2-.02.25-.02.08-.05.1-.07.13-.06.05-.23.07-.52.1-.28.02-.79.05-1.47.05h-1.33z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        d="M63.8 22.66h.68c.53 0 1.05-.01 1.57-.05-.02.37.05.83.23 1.36.2.53.45 1.11.73 1.72l2.14 4.29.19.4a33.23 33.23 0 001.07 2.2h.06c.27-.45.53-.9.75-1.39l.28-.58.4-.86 1.77-3.56.7-1.46.3-.66c.24-.56.39-1.04.41-1.46.47.03.92.05 1.39.05h.78l.45-.03.44-.02c.05.05.07.12.07.2.03.12 0 .2-.05.25l-.38.03c-.4.05-.7.12-.88.22a.94.94 0 00-.35.56 5.3 5.3 0 00-.08 1v2.4l.05 1.34.05 1.55v.02a98.57 98.57 0 00.15 3.64c.06.46.44.67.86.7l.6.06c.06.07.08.15.06.25 0 .1-.03.18-.1.23L77 34.98h-2.17l-.77.05-.4.03a.3.3 0 01-.1-.23c-.02-.13 0-.2.06-.25l.55-.05c.45-.04.83-.16.89-.66.02-.23.05-.53.02-.93l-.05-7.81h-.02c-.43.65-.84 1.54-1.22 2.39-.2.44-.4.87-.6 1.26l-1.03 2.06-.58 1.1-.28.54a59.3 59.3 0 00-.68 1.49c-.2.4-.34.73-.46 1.02l-.05.12-.04.02a.13.13 0 00-.03.03c-.03.02-.08.02-.13.02l-.08-.02a.14.14 0 00-.03-.03.13.13 0 01-.04-.02c-.1-.36-.25-.76-.46-1.22a33.77 33.77 0 00-.65-1.38c-.2-.46-.38-.84-.53-1.14l-1.7-3.61-.57-1.27-.03-.07c-.17-.48-.38-.91-.58-1.34h-.05l-.05 1.05-.02.62-.06.86-.05.78-.07 2.04v.03c-.03.78-.05 1.55-.05 2.32-.03.46 0 .81.07 1.06.03.23.1.4.23.5.13.11.3.16.53.19l.7.05c.08.07.1.15.1.25s-.04.18-.12.23l-1-.08h-2l-.38.03-.58.05a.3.3 0 01-.1-.23c-.02-.13 0-.2.08-.25l.4-.05c.25-.03.45-.1.63-.18.15-.08.28-.2.35-.4.08-.2.13-.54.18-.97l.05-.6.05-.6.04-.5c.02-.24.05-.51.06-.8l.04-.51c.02-.33.05-.69.06-1.08l.01-.11a77.28 77.28 0 00.2-4.05c.02-.38 0-.68-.05-.91a.76.76 0 00-.36-.5 4.42 4.42 0 00-.83-.23l-.3-.03a.3.3 0 01-.05-.25c.02-.1.05-.18.12-.2a9.12 9.12 0 00.78.05zM10.26 22.96c-.03.1.02.18.1.25l.66.08c.28.03.48.1.6.23.13.1.21.28.23.56.03.28.06.68.06 1.22v3.75c.5.03 1.01.03 1.52 0v-5.18c-.03-.2 0-.35.05-.48.02-.07.12-.15.25-.18.15-.02.4-.02.74-.02.96.02 1.7.28 2.23.81.5.53.76 1.27.76 2.18.02.82-.18 1.5-.61 2.06-.38.48-.94.84-1.7 1.01-.73.18-1.77.26-3.17.23-1.22-.02-2.53-.1-3.98-.25 1.6.33 2.79.56 3.55.63 1.24.16 2.46.13 3.6-.05a7.39 7.39 0 001.6-.4 9 9 0 001.4-.82c.27-.2.53-.53.75-.96a3.58 3.58 0 00-1.2-4.29 5.2 5.2 0 00-1.56-.58c-.58-.1-1.27-.16-2.05-.16-.76 0-1.45 0-2.06.03-.6.03-1.16.05-1.65.1a.27.27 0 00-.12.23zM13.39 30.47v1.77c-.02.63 0 1.11.05 1.44.05.33.17.53.35.66.15.12.42.2.82.23l.5.05c.05.05.08.12.08.25-.03.1-.05.18-.1.23a64.1 64.1 0 01-1.35-.08h-2.2l-1.12.08c-.08-.05-.1-.13-.1-.23-.03-.1 0-.18.07-.25l.38-.05c.37-.03.62-.13.75-.26.17-.1.27-.3.3-.63.05-.33.07-.81.07-1.44v-1.85c.45.08.95.1 1.5.08z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M88.77 42.28V39.8h-.43v-.58h.43v-.13c0-.4.1-.8.38-1.04.23-.22.55-.3.82-.3.21 0 .38.03.51.08l-.06.6a.96.96 0 00-.33-.06c-.4 0-.53.32-.53.7v.15h.69v.58h-.69v2.48h-.8zM64.04 38.1h.77v2.73c0 1.16-.56 1.55-1.4 1.55-.22 0-.49-.04-.65-.1l.1-.62c.12.04.29.08.47.08.44 0 .71-.2.71-.93v-2.7zm4.85 3.3c0 .37.02.66.03.91h-.69l-.04-.46h-.01c-.13.22-.44.53-1 .53-.57 0-1.08-.33-1.08-1.31v-1.77h.78v1.64c0 .5.17.82.58.82.32 0 .52-.22.6-.4a.69.69 0 00.05-.24v-1.82h.78v2.1zm2.06.43c-.27 0-.6-.12-.77-.22l-.15.55c.22.13.55.22.92.22.8 0 1.22-.4 1.22-.95 0-.45-.26-.73-.8-.93-.39-.14-.53-.23-.53-.42 0-.19.15-.32.42-.32s.5.1.64.17l.15-.54c-.18-.1-.47-.18-.8-.18-.7 0-1.14.42-1.14.96 0 .35.24.67.83.88.37.13.5.23.5.44 0 .2-.15.34-.49.34zm3.3-3.39v.8h.74v.57h-.75v1.36c0 .38.1.57.4.57a1 1 0 00.32-.04l.01.6c-.12.04-.32.08-.57.08a.92.92 0 01-.68-.26c-.17-.18-.24-.45-.24-.86V39.8h-.45v-.58h.45v-.57l.76-.22zm4.4 2.83a.78.78 0 01-.03-.21v-.47a.7.7 0 01.03-.2.72.72 0 01.7-.57c.5 0 .76.44.76.98 0 .6-.3 1-.78 1a.7.7 0 01-.68-.53zm-.83-1.99l.02 1.02v3.28h.78v-1.58h.01c.16.24.48.4.87.4.7 0 1.4-.53 1.4-1.63 0-.95-.59-1.56-1.3-1.56-.46 0-.82.2-1.05.54h-.01l-.04-.47h-.68zm6.11 1.2c0-.28-.12-.74-.63-.74-.48 0-.69.43-.72.74h1.35zm-1.35.53c.02.55.46.79.95.79.36 0 .62-.05.85-.14l.11.53c-.26.1-.63.19-1.07.19-1 0-1.58-.61-1.58-1.54 0-.84.52-1.63 1.5-1.63 1 0 1.32.81 1.32 1.48l-.02.32h-2.06zm3.2-1.73l.02.97v2.04h.76v-1.55l.02-.24c.07-.34.32-.57.68-.57.1 0 .16 0 .23.02v-.72a.81.81 0 00-.18-.02c-.32 0-.68.22-.82.65h-.03l-.02-.58h-.66zm6.58.46c.52 0 .65.46.64.74h-1.35c.03-.31.24-.74.71-.74zm.24 2.06c-.5 0-.93-.24-.95-.79h2.06l.02-.32c0-.67-.32-1.48-1.32-1.48-.98 0-1.5.8-1.5 1.63 0 .93.59 1.54 1.58 1.54.44 0 .8-.09 1.07-.2l-.11-.52c-.23.09-.5.14-.85.14zm4.55.42c-.17.07-.5.16-.88.16-.97 0-1.6-.61-1.6-1.55 0-.9.64-1.62 1.73-1.62a2 2 0 01.76.15l-.14.57a1.4 1.4 0 00-.6-.12c-.6 0-.95.43-.95.98 0 .63.42.98.95.98.28 0 .47-.06.62-.12l.1.57zm2.03-2.99v-.79l-.74.22v.57H98v.58h.43v1.45c0 .4.07.68.23.86.14.16.38.26.65.26.24 0 .44-.04.55-.08l-.01-.6a.91.91 0 01-.3.04c-.29 0-.38-.2-.38-.57V39.8h.71v-.58h-.71z"
                                                        fill="#000"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M116.03 23.24h-.5c-.02 0-.02.01-.03.04 0 .02 0 .04.02.05l.06.01.2.05c.04.03.07.07.08.12.01.05.02.12.01.2l-.02.44-.03.52c0 .28-.03.96-.1 1.16a.17.17 0 01-.09.1.5.5 0 01-.15.03l-.09.01c-.02.02-.02.03-.02.06 0 .02 0 .04.03.05l.22-.01H116.08l.23.01a.06.06 0 00.03-.05c0-.02 0-.04-.02-.06h-.16a.24.24 0 01-.13-.05.12.12 0 01-.03-.05.87.87 0 01-.03-.3v-.54l.02-.47.03-.38c0-.13 0-.25.02-.38l.14.3.14.31.4.83.11.26.16.32.06.16.04.12c.02.02.06.02.08 0l.12-.26c.11-.25.23-.48.36-.72l.38-.75c.03-.06.05-.13.1-.2a7.32 7.32 0 01.18-.36l.01 1.8v.2c0 .05-.02.09-.06.1-.02.03-.07.05-.15.05l-.12.01c-.02.02-.02.03-.02.06 0 .02.01.04.03.05l.27-.01h.5l.26.01c.02 0 .03-.02.03-.05 0-.02 0-.04-.02-.06h-.14c-.06-.01-.1-.03-.14-.06a.18.18 0 01-.05-.11l-.02-.19a23.5 23.5 0 01-.02-.65c0-.23-.02-.45-.03-.66v-.55l.02-.23c.01-.05.04-.1.08-.13a.6.6 0 01.2-.05h.1v-.06l-.01-.05-.2.01h-.51c0 .09-.04.2-.09.33l-.23.48-.41.82c-.1.22-.2.43-.34.65l-.3-.6-.5-.98a6.32 6.32 0 01-.16-.4.83.83 0 01-.06-.3h-.2zm-2.4 2.2v.34c-.02.15-.12.2-.26.2l-.09.02c-.03.03-.03.1 0 .11l.54-.01.58.01.03-.05-.02-.06-.12-.01c-.1 0-.16-.02-.2-.05-.04-.04-.07-.08-.08-.15a1.8 1.8 0 010-.34v-.41c-.14 0-.26 0-.37-.02v.42zm-.37-2.15c0 .02 0 .04.02.06l.16.01c.06 0 .1.03.14.06.03.02.05.06.05.13l.01.28v.87h.36v-1.2l.01-.11c0-.02.03-.04.06-.04l.18-.01c.22 0 .4.06.52.19.12.12.18.3.18.5s-.04.36-.14.49a.7.7 0 01-.4.23c-.18.04-.42.06-.75.05-.28 0-.6-.02-.93-.05.37.07.65.13.83.14a3.1 3.1 0 001.22-.1c.1-.05.22-.11.33-.2a.65.65 0 00.18-.22c.04-.1.06-.2.07-.34a.83.83 0 00-.1-.39.75.75 0 00-.25-.26c-.1-.06-.23-.11-.37-.14-.14-.02-.3-.04-.48-.04l-.49.01-.38.02a.06.06 0 00-.03.06z"
                                                        fill="#DC3219"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_AstroPay Card"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(32, 213, 179)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="black"/>
                                                    <path
                                                        d="M17.8031 18.6833L10.7021 39.5151H14.8871L16.8851 33.4437H22.6361L24.6881 39.5151H28.9541L21.8531 18.6833H17.8031ZM21.6371 29.9897H17.9111L19.4771 25.4024C19.5851 25.0786 19.6931 24.7818 19.7741 24.458C19.8821 24.7818 19.9631 25.1056 20.0711 25.4294L21.6371 29.9897Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M36.0012 30.0436C34.0842 29.2881 33.8682 28.9373 33.8682 28.3706C33.8682 27.669 34.4622 27.2373 35.4072 27.2373C36.5412 27.2373 37.4052 27.696 37.8372 27.9389L38.6472 28.4516L39.7272 25.1595L39.2412 24.8357C38.2962 24.2151 36.8922 23.8643 35.4342 23.8643C32.2482 23.8643 29.9262 25.8881 29.9262 28.6674C29.9262 31.2309 32.1942 32.6071 34.1112 33.3087C36.0282 34.0103 36.1632 34.523 36.1632 35.1166C36.1632 36.25 34.9752 36.4119 34.2462 36.4119C33.1392 36.4119 31.9512 35.9531 31.2762 35.5484L30.4662 35.0627L29.3862 38.4357L29.8992 38.7325C31.0602 39.4071 32.6262 39.8119 34.1922 39.8119C37.7292 39.8119 40.1052 37.8151 40.1052 34.8738C40.1052 31.9055 37.7562 30.6912 36.0012 30.0436Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M46.3961 20.5453L42.4271 21.7596V24.1342H40.2671V27.5612H42.4271V34.3612C42.4271 36.25 42.8051 37.6262 43.5881 38.5167C44.3441 39.3532 45.5321 39.812 46.8551 39.812C48.0701 39.812 48.9341 39.5691 49.3391 39.4342L49.8791 39.2453L49.6631 35.7913L48.7451 36.0612C48.4751 36.1421 48.1511 36.1961 47.5031 36.1961C47.0171 36.1961 46.3691 36.1961 46.3691 34.2532V27.5612H49.9871V24.1342H46.3691V20.5453H46.3961Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M59.68 23.9992L58.951 23.9182C58.735 23.8912 58.5189 23.8643 58.2489 23.8643C56.9799 23.8643 55.819 24.377 54.955 25.2944L54.901 24.1611H51.1479L51.202 24.9706C51.283 26.1579 51.31 27.5071 51.31 29.2341V39.5151H55.3329V31.3658C55.3329 30.9881 55.3599 30.6103 55.4139 30.3404C55.7109 28.7484 56.71 27.75 58.06 27.75C58.384 27.75 58.573 27.75 58.762 27.777L59.68 27.9658V23.9992Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M67.0512 23.8643C62.5692 23.8643 59.4102 27.1833 59.4102 31.9595C59.4102 36.7357 62.4612 39.8389 66.8082 39.8389C70.5072 39.8389 74.4762 37.3024 74.4762 31.7166C74.4762 27.0754 71.4252 23.8643 67.0512 23.8643ZM70.3992 31.7976C70.3992 34.469 68.9412 36.4389 66.9432 36.4389C64.9452 36.4389 63.5142 34.523 63.5142 31.8785C63.5142 30.1785 64.2432 27.2643 66.9972 27.2643C69.6702 27.2643 70.3992 30.2325 70.3992 31.7976Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M87.7058 20.3564C86.3828 19.1691 84.3848 18.5485 81.7928 18.5485C80.0378 18.5485 78.3908 18.6834 76.8788 18.9262L76.2578 19.0342V39.4881H80.2538V31.9056C80.6588 31.9326 81.0908 31.9596 81.4958 31.9596C84.1958 31.9596 86.4908 31.1231 87.9488 29.612C89.0828 28.4516 89.6498 26.8866 89.6498 24.9707C89.6498 23.1088 88.9478 21.4627 87.7058 20.3564ZM85.6268 25.1056C85.6268 28.0199 83.0618 28.4516 81.5498 28.4516C81.0368 28.4516 80.6048 28.4247 80.2538 28.3707V22.1104C80.6318 22.0564 81.1718 22.0294 81.8468 22.0294C83.5748 22.0294 85.6268 22.5691 85.6268 25.1056Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M101.908 35.4404V30.2595C101.908 26.1309 99.7751 23.8643 95.8871 23.8643C94.0781 23.8643 92.2151 24.35 90.8921 25.1865L90.3791 25.5103L91.4591 28.6944L92.2691 28.1278C93.1061 27.5611 94.2941 27.2373 95.4821 27.2373C96.2921 27.2373 96.8861 27.4262 97.2641 27.8039C97.5881 28.1278 97.7771 28.5865 97.8311 29.2071C94.6991 29.2881 92.3771 30.0436 90.9731 31.4468C90.0011 32.4182 89.5151 33.6595 89.5151 35.1166C89.5151 37.4643 91.2431 39.8389 94.5101 39.8389C95.9141 39.8389 97.2371 39.3801 98.2631 38.5976L98.3711 39.5151H102.178L102.043 38.6516C101.962 37.8151 101.908 36.7357 101.908 35.4404ZM95.1851 36.4658C94.5911 36.4658 93.5921 36.25 93.5921 34.8198C93.5921 34.2801 93.7541 33.8214 94.1051 33.4976C94.5641 33.0389 95.6171 32.4992 97.9661 32.4452V34.0912C97.9661 34.1992 97.9661 34.442 97.8851 34.6579C97.6151 35.4674 96.7241 36.4658 95.1851 36.4658Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M113.005 24.1342L110.089 32.7691C110.008 32.985 109.954 33.2008 109.873 33.4167C109.792 33.2008 109.711 32.985 109.657 32.7961L106.471 24.1072H102.07L107.578 37.923L107.605 37.95C107.686 38.1389 107.713 38.2199 107.74 38.2738C107.713 38.3548 107.659 38.4897 107.605 38.5707C107.119 39.5961 106.417 40.5405 105.715 41.1072L105.688 41.1342C104.878 41.8088 104.068 42.1326 103.744 42.2135L103.042 42.4294L104.068 45.8834L104.743 45.7754C105.148 45.6945 106.579 45.3707 108.199 43.9945C110.17 42.2675 111.466 39.5151 113.167 35.0088L117.298 24.1342H113.005Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M25.4172 24.4309C28.0092 21.7865 32.4102 20.1944 37.1892 20.1944C39.0522 20.1944 40.8612 20.4372 42.5892 20.896L42.7242 20.923L45.7752 20.0055L44.3982 19.4928C41.7792 18.4944 38.7822 17.9817 35.6772 17.9817C31.1952 17.9817 26.9832 19.0611 23.8782 21.0309L23.5542 21.2468L24.8502 25.0245L25.4172 24.4309Z"
                                                        fill="#20D5B3"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_BinancePay"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(240, 185, 11)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <path
                                                        d="M0 16C0 7.16344 7.16344 0 16 0L112 0C120.837 0 128 7.16344 128 16L128 48C128 56.8366 120.837 64 112 64L16 64C7.16344 64 0 56.8366 0 48L0 16Z"
                                                        fill="#F0B90B"
                                                    />
                                                    <path
                                                        d="M12.6552 32.0099L10.8276 33.8141L9 32.0099L10.8276 30.2057L12.6552 32.0099ZM17.1137 27.6084L20.2467 30.7212L22.0743 28.917L18.9413 25.8042L17.1137 24L15.2861 25.8042L12.133 28.917L13.9606 30.7212L17.1137 27.6084V27.6084ZM23.3998 30.2057L21.5722 32.0099L23.3998 33.8141L25.2274 32.0099L23.3998 30.2057ZM17.1137 36.3916L13.9807 33.2987L12.133 35.1029L15.266 38.1958L17.0936 40L18.9212 38.1958L22.0743 35.1029L20.2467 33.2987L17.1137 36.3916V36.3916ZM17.1137 33.8141L18.9413 32.0099L17.1137 30.2057L15.2861 32.0099L17.1137 33.8141ZM36.4541 33.9925V33.9727C36.4541 32.803 35.8114 32.2082 34.7871 31.8117C35.4298 31.4548 35.9519 30.8996 35.9519 29.9083V29.8885C35.9519 28.5006 34.8273 27.6084 33.0198 27.6084H28.8826V36.3916H33.1202C35.1286 36.3916 36.4541 35.5985 36.4541 33.9925V33.9925ZM34.0039 30.2454C34.0039 30.8996 33.4616 31.1772 32.598 31.1772H30.7905V29.3135H32.7185C33.5419 29.3135 34.0039 29.6307 34.0039 30.2255V30.2454V30.2454ZM34.5059 33.7547C34.5059 34.4089 33.9837 34.7063 33.1202 34.7063H30.7905V32.7831H33.06C34.0641 32.7831 34.5059 33.14 34.5059 33.7348V33.7547V33.7547ZM40.5511 36.3916V27.6084H38.6029V36.3916H40.5511V36.3916ZM51.0748 36.3916V27.6084H49.1468V33.0211L44.9694 27.6084H43.1619V36.3916H45.0899V30.8203L49.4078 36.4114H51.0748V36.3916ZM61.9198 36.3916L58.1039 27.5489H56.2964L52.4806 36.3916H54.4688L55.2923 34.4287H59.0478L59.8713 36.3916H61.9198V36.3916ZM58.365 32.7237H55.9952L57.1801 29.8686L58.365 32.7237ZM71.2385 36.3916V27.6084H69.3105V33.0211L65.1331 27.6084H63.3256V36.3916H65.2537V30.8203L69.5716 36.4114H71.2385V36.3916ZM81.3605 34.9839L80.1157 33.7348C79.4127 34.3693 78.7896 34.7658 77.7855 34.7658C76.2596 34.7658 75.215 33.5167 75.215 32.0099V31.9901C75.215 30.4833 76.2999 29.254 77.7855 29.254C78.6696 29.254 79.3725 29.6307 80.0553 30.2454L81.3002 28.8178C80.4772 28.005 79.4724 27.4696 77.7855 27.4696C75.0544 27.4696 73.1464 29.5118 73.1464 32.0099V32.0297C73.1464 34.5477 75.0945 36.5502 77.7051 36.5502C79.4127 36.5502 80.4369 35.9554 81.3605 34.9839V34.9839ZM89.6951 36.3916V34.6667H84.8752V32.8228H89.0726V31.0979H84.8752V29.3135H89.6347V27.5886H82.9274V36.3717H89.6951V36.3916Z"
                                                        fill="#1E2026"
                                                    />
                                                    <path
                                                        d="M102.098 30.5536C102.098 28.7646 100.802 27.6137 98.7507 27.6137H95.2783V36.3709H96.8257V33.5561H98.575C100.513 33.5561 102.098 32.5302 102.098 30.5536V30.5536ZM100.525 30.5911C100.525 31.5294 99.795 32.1674 98.6253 32.1674H96.8257V29.0148H98.6253C99.783 29.0148 100.525 29.5528 100.525 30.5911ZM107.353 27.5511H105.919L102.043 36.3709H103.628L104.534 34.2567H108.699L109.592 36.3709H111.228L107.353 27.5511ZM108.133 32.893H105.101L106.61 29.3901L108.133 32.893V32.893ZM115.502 32.8805L119 27.6137H117.226L114.735 31.4919L112.269 27.6137H110.444L113.942 32.9181V36.3709H115.502V32.8805Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Neteller"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(45, 80, 0)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    viewBox="0 0 128 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 16C0 7.164 7.163 0 16 0h96c8.837 0 16 7.164 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16z"
                                                        fill="#2D5000"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M110.405 25.316C109.189 24.44 107.31 24 104.878 24h-6.413l-2.32 13.162h-8.291l.552-2.962h4.975l.553-3.29h-4.975l.552-2.962h5.197L95.37 24H84.87l-2.21 12.394h-3.87L80.999 24h-5.526l-2.211 12.394h-3.76L71.716 24h-5.528l-2.321 13.162h-8.401l.552-2.962h5.085l.552-3.29H56.57l.553-2.962h5.305L63.092 24H30.37l-1.88 10.42L24.732 24h-5.638L16 41h5.417l1.879-10.639 3.647 10.64H46.4l2.321-13.162h3.096L49.495 41h51.292l1.437-8.226L104.656 41h5.417l-2.543-6.8.553-.11c1.216-.329 2.211-.877 2.875-1.754.663-.878.994-2.085.994-3.4.222-1.645-.331-2.852-1.547-3.619zm-68.97 12.041h-8.204l.547-3.086h5.142l.547-3.543h-5.143l.548-3.085h8.205l-1.642 9.714zm64.711-5.45c-.623.475-1.497.592-2.744.592h-1.248l.874-4.856h.873c.998 0 1.747.119 2.245.473.375.238.874.712.874 1.66.25 1.302-.375 1.894-.874 2.132z"
                                                        fill="#8DC640"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Skrill"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(83, 0, 57)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    viewBox="0 0 128 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 16C0 7.164 7.163 0 16 0h96c8.837 0 16 7.164 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16z"
                                                        fill="#530039"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M84.036 23.2l5.707-1.042v20.61h-5.706V23.2h-.001zm8.257 0V42.77H98V22.158L92.293 23.2zM76.023 42.77h5.706V27.715h-5.706v15.053zM38.622 29.8c-.73 0-2.43-.116-2.43-1.505 0-1.737 2.428-1.737 3.279-1.737 1.577 0 3.642.463 5.1.81 0 0 .849.232 1.456.58h.121v-4.632h-.12c-1.7-.579-3.766-1.157-7.408-1.157-6.314 0-8.621 3.588-8.621 6.6 0 1.736.73 5.788 8.135 6.251.607 0 2.307.116 2.307 1.622 0 1.157-1.335 1.968-3.642 1.968-2.428 0-4.858-.578-6.314-1.157v4.863c2.064.463 4.614.694 7.407.694 6.193 0 8.986-3.357 8.986-6.6.12-3.821-3.036-6.253-8.258-6.6h.001zm34.241-2.316c-5.222.116-7.894 2.432-7.894 6.832v8.453h5.708v-6.947c0-2.664.365-3.822 3.643-3.938V27.6c-.608-.116-1.457-.116-1.457-.116zm-15.422.232c-.121.347-.97 2.779-3.278 5.21V22.158l-5.707 1.158v19.453h5.828v-6.022c1.7 2.432 2.55 6.022 2.55 6.022h7.043c-.729-2.779-3.764-7.758-3.764-7.758 2.67-3.242 3.886-6.716 4.007-7.295h-6.679zm21.371-1.39c1.58 0 2.793-1.157 2.793-2.663 0-1.505-1.214-2.663-2.793-2.663-1.578 0-2.793 1.158-2.793 2.663 0 1.39 1.337 2.663 2.793 2.663z"
                                                        fill="#CC2194"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Fasapay"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(26, 71, 134)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    viewBox="0 0 128 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 16C0 7.164 7.163 0 16 0h96c8.837 0 16 7.164 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16z"
                                                        fill="#1A4786"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M73.366 43.688l1.23-5.114c1.207-2.623 2.829-5.662 4.099-8.757a6.22 6.22 0 00.62-1.94 2.248 2.248 0 00-.231-1.57 2.276 2.276 0 00-1.184-.904h2.503v1.94a6.275 6.275 0 011.811-1.658 5.22 5.22 0 012.462-.58 4.785 4.785 0 014.115 2.01 8.28 8.28 0 011.453 4.972c0 2.178-.529 3.843-1.588 4.995a5.213 5.213 0 01-3.972 1.72 5.656 5.656 0 01-2.144-.393 5.15 5.15 0 01-1.732-1.177l-1.485 6.448h-5.958v.008zm7.395-11.695a3.41 3.41 0 00.659 2.309 2.122 2.122 0 001.667.785 1.85 1.85 0 001.486-.723c.468-.726.68-1.588.604-2.45a3.598 3.598 0 00-.628-2.356 1.904 1.904 0 00-1.525-.786 2.049 2.049 0 00-1.588.787A3.707 3.707 0 0080.785 32l-.024-.008v.001zm15.012-2.357l-4.853-.503c.13-.706.4-1.38.794-1.979.397-.524.907-.95 1.493-1.248a6.217 6.217 0 011.923-.598c.874-.145 1.759-.216 2.645-.212a21.267 21.267 0 013.67.253 4.735 4.735 0 012.312 1.06c.471.428.824.968 1.024 1.57.238.623.363 1.282.373 1.948v5.788c-.01.487.03.974.12 1.453.121.466.294.916.516 1.344h-4.767a4.954 4.954 0 01-.373-.786 5.75 5.75 0 01-.174-.832 6.498 6.498 0 01-1.986 1.358 8.338 8.338 0 01-3.13.542 5.3 5.3 0 01-3.606-1.083 3.425 3.425 0 01-1.232-2.68 3.471 3.471 0 01.883-2.442 5.999 5.999 0 013.264-1.43c1.907-.375 3.144-.638 3.71-.785a18.015 18.015 0 001.795-.597c.05-.463-.087-.93-.382-1.295a1.977 1.977 0 00-1.365-.37 3.569 3.569 0 00-1.868.394c-.386.29-.665.699-.794 1.161l.008-.03zm4.369 2.655c-.7.246-1.427.466-2.184.66a5.067 5.067 0 00-1.962.785 1.28 1.28 0 000 1.893c.349.272.787.406 1.23.377a3.205 3.205 0 001.59-.4 2.52 2.52 0 001.032-.999c.222-.477.325-.998.302-1.522V32.3l-.008-.008zm4.186-6.88h5.362l2.732 8.726 2.534-8.726H120l-5.259 14.035a7.607 7.607 0 01-1.834 3.096 5.888 5.888 0 01-4.027 1.153H79.982l.683-3.322h26.864a2.402 2.402 0 001.454-.408 3.08 3.08 0 00.946-1.462l-5.561-13.108-.04.016z"
                                                        fill="#619FF1"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M34.498 25.308h2.384l-1.86 3.676h-2.398L27.86 38.41l-15.45-1.445h11.12l2.55-5.035L8 29.738h19.159l.397-.785-11.454-2.127h10.645l.793-1.573h1.907l.262-.518-17.888-2.137h19.215c.187-.245.388-.478.603-.698l-14.687-1.79c6.617 0 13.25-.11 19.858-.11 1.258.025 2.512.128 3.757.307l-2.137 3.04c-.46-.091-.928-.141-1.397-.15a2.285 2.285 0 00-1.096.228 2.581 2.581 0 00-.794.722c-.241.372-.456.76-.645 1.162zm36.206 6.45a.947.947 0 01.853.428.925.925 0 01.037.946c-.168.419-.463.776-.842 1.02l-.533 3.676h-3.272l1.946-3.683a1.058 1.058 0 01-.087-1.022 2.198 2.198 0 011.898-1.374v.008zm-2.192-1.855c-.5.55-2.86.283-2.94-.33.24-.887.65-1.719 1.209-2.45.992-1.209 2.74-1.68 4.24-1.917a17.66 17.66 0 012.749-.211 18.97 18.97 0 013.536.252 2.579 2.579 0 011.771 1.051c.265.478.347 1.037.23 1.57a6.203 6.203 0 01-.612 1.94c-1.27 3.096-2.891 6.143-4.098 8.758-3.377.281-6.77.313-10.152.095-1.588-.134-2.597-.362-3.05-1.085a2.604 2.604 0 01.127-2.67 7.152 7.152 0 012.128-2.639 10.079 10.079 0 013.972-1.43c2.138-.384 5.775-.281 7.944-.58 3.264-3.676-2.122-3.142-5.41-2.357-.683.307-1.096.472-1.588 2.011l-.056-.008zm-21.447 4.87l5.275-.471c-.117.415-.04.86.206 1.217a1.76 1.76 0 001.303.385 3.64 3.64 0 001.81-.385c.338-.176.615-.45.795-.786a.584.584 0 00-.143-.84 7.381 7.381 0 00-1.922-.519 16.09 16.09 0 01-3.241-.847 1.897 1.897 0 01-1.048-1.335 2.98 2.98 0 01.364-2.105 6.438 6.438 0 011.907-2.208 8.576 8.576 0 012.805-1.397 13.647 13.647 0 013.813-.464 10.636 10.636 0 013.311.362c.556.18 1.022.564 1.303 1.076a3.66 3.66 0 01.222 2.034l-5.051.47a.982.982 0 00-.16-.927 1.704 1.704 0 00-1.247-.392 2.878 2.878 0 00-1.405.307 1.78 1.78 0 00-.795.73.5.5 0 00.128.73 5.91 5.91 0 001.945.448 10.8 10.8 0 013.36.786 2.006 2.006 0 011.16 1.445c.107.71-.03 1.435-.39 2.057a7.421 7.421 0 01-1.738 2.2 9.204 9.204 0 01-3.043 1.703 13.255 13.255 0 01-4.376.637c-2.416 0-3.964-.34-4.648-1.02a2.81 2.81 0 01-.5-2.906v.015zm-7.22-5.23l-4.591-.504a10.5 10.5 0 011.794-1.979 8.755 8.755 0 012.121-1.249c.703-.293 1.44-.5 2.193-.613a17.77 17.77 0 012.748-.211 18.967 18.967 0 013.535.252c.713.09 1.356.471 1.771 1.051.265.478.348 1.037.23 1.57a6.232 6.232 0 01-.62 1.942l-2.899 5.787c-.246.464-.45.948-.61 1.446a5.366 5.366 0 00-.16 1.335h-4.79a3.605 3.605 0 010-.785c.062-.284.145-.562.246-.833a12.472 12.472 0 01-2.629 1.375 10.665 10.665 0 01-3.4.541c-1.588 0-2.604-.36-3.049-1.084a2.613 2.613 0 01.127-2.67 6.563 6.563 0 012.128-2.45 10.08 10.08 0 013.972-1.43c2.117-.377 3.488-.639 4.107-.786a26.95 26.95 0 002.097-.596 1.603 1.603 0 00.27-1.296 1.304 1.304 0 00-1.176-.37 4.813 4.813 0 00-2.066.394 4.54 4.54 0 00-1.374 1.154l.025.008zm3.057 2.638c-.82.246-1.657.467-2.51.66a8.406 8.406 0 00-2.382.785 2.443 2.443 0 00-.898.927.979.979 0 00-.071.966 1.15 1.15 0 001.04.377 4.506 4.506 0 001.78-.377 5.182 5.182 0 001.5-1.029c.44-.445.802-.96 1.074-1.524l.404-.785h.063z"
                                                        fill="#FF8C00"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_USDT (TRC20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(0, 147, 147)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#009393"/>
                                                    <path
                                                        d="M80.3018 27.2062V36.4124H81.8951H83.4883V32.8527C83.4883 29.4715 83.4939 29.2651 83.6002 28.8466C83.7791 28.1324 84.0586 27.6303 84.5449 27.1449C85.2326 26.4642 86.0488 26.1517 86.9656 26.2242C88.3297 26.3358 89.1571 27.0165 89.5484 28.35C89.6603 28.7239 89.6658 28.9024 89.6826 32.5737L89.6994 36.4124H91.2927H92.886L92.8636 32.2947C92.8413 27.7195 92.8468 27.7753 92.4499 26.5757C91.8741 24.8349 90.6721 23.7469 88.9111 23.3787C88.2011 23.228 86.865 23.2392 86.2165 23.401C85.2885 23.6298 84.5785 24.0371 83.8965 24.7457L83.4883 25.1585V21.5821V18H81.8951H80.3018V27.2062Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M73.174 19.9528C72.4081 20.0421 71.7596 20.1146 71.7372 20.1146C71.7093 20.1202 71.6925 20.8735 71.6925 21.7941V23.4679H70.4905H69.2886V24.8349V26.2019H70.4905H71.6925V29.0865C71.6925 30.6767 71.7204 32.2445 71.7484 32.5737C71.9552 34.7218 73.0733 36.0832 74.9629 36.4738C75.4381 36.5742 75.6561 36.5854 76.4165 36.563C76.9084 36.5463 77.4954 36.4961 77.7135 36.4459C78.2949 36.3175 79.016 36.072 79.016 35.9995C79.016 35.9437 78.1775 33.3939 78.1495 33.3548C78.1383 33.3437 77.9538 33.3995 77.7414 33.4776C77.0258 33.7342 76.327 33.7621 75.8239 33.5501C75.5052 33.4162 75.2425 33.1484 75.0691 32.7745L74.907 32.423L74.8903 29.3097L74.8735 26.2019H76.696H78.5129V24.8349V23.4679H76.7239H74.935V21.6267V19.7855L74.7561 19.791C74.6554 19.7966 73.9455 19.8691 73.174 19.9528Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M49.0678 20.092L47.4857 20.2538L47.4745 21.9333L47.4577 23.6071L46.2446 23.6238L45.0259 23.635V25.002V26.369H46.2502H47.4801L47.5025 29.7557C47.5192 33.0309 47.5248 33.1648 47.6422 33.6112C48.0615 35.1902 49.0231 36.1833 50.5325 36.585C50.9071 36.6855 51.1419 36.7078 51.9301 36.7078C52.9812 36.7134 53.5011 36.6353 54.3061 36.3674C54.6974 36.2335 54.7757 36.1833 54.7645 36.0996C54.7533 36.0438 54.5577 35.4245 54.3285 34.7326L53.9092 33.4717L53.4508 33.6391C52.2432 34.0687 51.2201 33.8009 50.8344 32.9416L50.7002 32.6459L50.6835 29.5047L50.6667 26.369H52.4612H54.2502V25.002V23.635L52.478 23.6238L50.7002 23.6071L50.6723 21.7659L50.6443 19.9246L49.0678 20.092Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M61.7695 23.0774C60.4445 23.1889 59.4047 23.5405 58.3872 24.2156C57.5319 24.7847 56.8219 25.5881 56.3523 26.5255C55.251 28.7071 55.3795 31.7647 56.6598 33.8235C57.5542 35.263 59.0413 36.2227 60.9924 36.6188C61.7639 36.7751 63.7988 36.7583 64.5703 36.5909C66.0015 36.2841 67.2314 35.6982 68.1147 34.9115L68.3663 34.6883L67.36 33.684C66.8065 33.1261 66.3257 32.6741 66.2922 32.6741C66.2587 32.6741 66.1916 32.7187 66.1524 32.769C66.0015 32.9531 65.4201 33.2823 64.9393 33.4552C64.2125 33.7231 63.5417 33.8458 62.8261 33.8458C61.4956 33.8458 60.506 33.4999 59.7793 32.7801C59.3656 32.3672 59.0301 31.7647 58.9686 31.3127L58.9295 31.0561H64.0169H69.1042L69.1378 30.4256C69.1769 29.7058 69.1042 28.5509 68.9756 27.9371C68.4837 25.5156 67.0078 23.9087 64.7325 23.3117C63.8883 23.0941 62.6919 22.9992 61.7695 23.0774ZM63.7821 26.0066C64.2461 26.1293 64.8554 26.4251 65.1294 26.6706C65.5543 27.0388 65.9903 27.859 65.9903 28.2942V28.4337H62.4963C59.2649 28.4337 59.0022 28.4281 59.0022 28.3388C59.0022 28.2886 59.1028 28.0375 59.2258 27.7809C59.7066 26.7989 60.629 26.1517 61.8981 25.9229C62.2782 25.8504 63.3907 25.9006 63.7821 26.0066Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M100.567 23.0774C97.3528 23.3508 95.1222 25.3203 94.5184 28.4058C94.3842 29.0977 94.3842 30.6655 94.524 31.363C95.111 34.4094 97.1292 36.2729 100.299 36.697C101.02 36.7918 102.714 36.7304 103.396 36.5854C104.783 36.2841 106.018 35.6982 106.913 34.9115L107.164 34.6883L106.158 33.6784C105.604 33.1261 105.124 32.6741 105.09 32.6741C105.056 32.6741 104.984 32.7244 104.922 32.7913C104.743 32.9866 104.117 33.3269 103.592 33.5055C102.189 33.9965 100.595 33.9574 99.4436 33.3995C98.5715 32.981 97.8727 32.1106 97.7665 31.3183L97.7273 31.0561H102.831H107.93L107.902 29.7282C107.88 28.6457 107.852 28.3054 107.757 27.8479C107.091 24.8461 105.012 23.2001 101.685 23.0606C101.35 23.0439 100.841 23.0551 100.567 23.0774ZM102.58 26.0066C103.424 26.2242 104.173 26.7654 104.481 27.368C104.648 27.7084 104.788 28.1213 104.788 28.3054V28.4337H101.294C97.2577 28.4337 97.6547 28.5174 98.0348 27.7586C98.5268 26.7766 99.4324 26.1517 100.696 25.9229C101.07 25.8504 102.189 25.9006 102.58 26.0066Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M115.813 23.1387C115.287 23.1945 114.622 23.4009 114.247 23.6185C113.906 23.8194 113.37 24.3271 113.146 24.6563C112.928 24.9744 112.939 24.9967 112.805 24.0928L112.71 23.4679H111.24H109.764V29.9401V36.4124H111.357H112.95V32.7243C112.95 29.5496 112.961 28.986 113.04 28.6401C113.297 27.4796 114.04 26.704 115.186 26.3916C115.438 26.3246 115.757 26.2911 116.221 26.2911C117.042 26.2855 117.512 26.4139 118.077 26.7933C118.284 26.9328 118.474 27.0611 118.496 27.0723C118.518 27.0834 118.776 26.6259 119.077 26.0512C119.374 25.4709 119.704 24.846 119.81 24.6563L120 24.3048L119.648 24.0482C118.675 23.3228 117.221 22.9825 115.813 23.1387Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M49.5605 42.8909H51.0205V47.5881C51.0205 48.135 50.9033 48.5956 50.6689 48.97C50.4378 49.3443 50.1172 49.6259 49.707 49.8147C49.3001 50.0035 48.8314 50.0979 48.3008 50.0979C47.7702 50.0979 47.2982 50.0035 46.8848 49.8147C46.4746 49.6259 46.1523 49.3443 45.918 48.97C45.6868 48.5956 45.5713 48.135 45.5713 47.5881V42.8909H47.0361V47.5881C47.0361 47.9071 47.0866 48.1676 47.1875 48.3694C47.2884 48.5712 47.4333 48.7193 47.6221 48.8137C47.8141 48.9081 48.0404 48.9553 48.3008 48.9553C48.5677 48.9553 48.7939 48.9081 48.9795 48.8137C49.1683 48.7193 49.3115 48.5712 49.4092 48.3694C49.5101 48.1676 49.5605 47.9071 49.5605 47.5881V42.8909ZM55.9277 48.1399C55.9277 48.0129 55.9082 47.899 55.8691 47.7981C55.8333 47.6939 55.765 47.5995 55.6641 47.5149C55.5632 47.427 55.4215 47.3407 55.2393 47.2561C55.057 47.1715 54.821 47.0836 54.5312 46.9924C54.209 46.8883 53.903 46.7711 53.6133 46.6409C53.3268 46.5107 53.0729 46.3593 52.8516 46.1868C52.6335 46.011 52.4609 45.8075 52.334 45.5764C52.2103 45.3453 52.1484 45.0767 52.1484 44.7708C52.1484 44.4745 52.2135 44.206 52.3438 43.9651C52.474 43.7209 52.6562 43.5126 52.8906 43.3401C53.125 43.1643 53.4017 43.0292 53.7207 42.9348C54.043 42.8404 54.3962 42.7932 54.7803 42.7932C55.3044 42.7932 55.7617 42.8876 56.1523 43.0764C56.543 43.2652 56.8457 43.524 57.0605 43.8528C57.2786 44.1816 57.3877 44.5575 57.3877 44.9807H55.9326C55.9326 44.7724 55.8887 44.5901 55.8008 44.4338C55.7161 44.2743 55.5859 44.149 55.4102 44.0579C55.2376 43.9667 55.0195 43.9211 54.7559 43.9211C54.502 43.9211 54.2904 43.9602 54.1211 44.0383C53.9518 44.1132 53.8249 44.2157 53.7402 44.3459C53.6556 44.4729 53.6133 44.6161 53.6133 44.7756C53.6133 44.8961 53.6426 45.0051 53.7012 45.1028C53.763 45.2004 53.8542 45.2916 53.9746 45.3762C54.0951 45.4609 54.2432 45.5406 54.4189 45.6155C54.5947 45.6903 54.7982 45.7636 55.0293 45.8352C55.4167 45.9524 55.7568 46.0842 56.0498 46.2307C56.346 46.3772 56.5934 46.5416 56.792 46.7239C56.9906 46.9062 57.1403 47.1129 57.2412 47.344C57.3421 47.5751 57.3926 47.8372 57.3926 48.1301C57.3926 48.4394 57.3324 48.7161 57.2119 48.9602C57.0915 49.2043 56.9173 49.4111 56.6895 49.5803C56.4616 49.7496 56.1898 49.8782 55.874 49.9661C55.5583 50.054 55.2051 50.0979 54.8145 50.0979C54.4629 50.0979 54.1162 50.0523 53.7744 49.9612C53.4326 49.8668 53.1217 49.7252 52.8418 49.5364C52.5651 49.3476 52.3438 49.1067 52.1777 48.8137C52.0117 48.5208 51.9287 48.1741 51.9287 47.7737H53.3984C53.3984 47.995 53.4326 48.1822 53.501 48.3352C53.5693 48.4882 53.6654 48.6119 53.7891 48.7063C53.916 48.8007 54.0658 48.8691 54.2383 48.9114C54.4141 48.9537 54.6061 48.9749 54.8145 48.9749C55.0684 48.9749 55.2767 48.939 55.4395 48.8674C55.6055 48.7958 55.7275 48.6965 55.8057 48.5696C55.887 48.4426 55.9277 48.2994 55.9277 48.1399ZM60.5713 50.0002H59.0234L59.0332 48.8577H60.5713C60.9554 48.8577 61.2793 48.7714 61.543 48.5989C61.8066 48.4231 62.0052 48.1676 62.1387 47.8323C62.2754 47.497 62.3438 47.0917 62.3438 46.6165V46.2698C62.3438 45.9052 62.3047 45.5846 62.2266 45.3079C62.1517 45.0312 62.0394 44.7984 61.8896 44.6096C61.7399 44.4208 61.556 44.2792 61.3379 44.1848C61.1198 44.0872 60.8691 44.0383 60.5859 44.0383H58.9941V42.8909H60.5859C61.0612 42.8909 61.4958 42.9722 61.8896 43.135C62.2868 43.2945 62.6302 43.524 62.9199 43.8235C63.2096 44.123 63.4326 44.481 63.5889 44.8977C63.7484 45.3111 63.8281 45.7717 63.8281 46.2795V46.6165C63.8281 47.121 63.7484 47.5816 63.5889 47.9983C63.4326 48.415 63.2096 48.773 62.9199 49.0725C62.6335 49.3687 62.29 49.5982 61.8896 49.761C61.4925 49.9205 61.0531 50.0002 60.5713 50.0002ZM59.8535 42.8909V50.0002H58.3887V42.8909H59.8535ZM67.7393 42.8909V50.0002H66.2793V42.8909H67.7393ZM69.9268 42.8909V44.0383H64.126V42.8909H69.9268ZM72.9639 47.217V47.1096C72.9639 46.4228 73.0355 45.7994 73.1787 45.2395C73.3252 44.6796 73.5173 44.1881 73.7549 43.7649C73.9958 43.3385 74.2578 42.9853 74.541 42.7053C74.8242 42.4254 75.1058 42.2236 75.3857 42.0999L75.6543 42.842C75.4688 42.9788 75.2865 43.1676 75.1074 43.4084C74.9284 43.6461 74.7656 43.939 74.6191 44.2874C74.4759 44.6324 74.3604 45.0393 74.2725 45.5081C74.1846 45.9736 74.1406 46.5042 74.1406 47.0999V47.2268C74.1406 47.8225 74.1846 48.3547 74.2725 48.8235C74.3604 49.289 74.4759 49.6959 74.6191 50.0442C74.7656 50.3958 74.9284 50.692 75.1074 50.9329C75.2865 51.1737 75.4688 51.3642 75.6543 51.5042L75.3857 52.2268C75.1058 52.1031 74.8242 51.9013 74.541 51.6213C74.2578 51.3446 73.9958 50.9931 73.7549 50.5667C73.5173 50.1435 73.3252 49.6519 73.1787 49.092C73.0355 48.5289 72.9639 47.9039 72.9639 47.217ZM79.6631 42.8909V50.0002H78.2031V42.8909H79.6631ZM81.8506 42.8909V44.0383H76.0498V42.8909H81.8506ZM82.6855 42.8909H85.3369C85.8805 42.8909 86.3477 42.9722 86.7383 43.135C87.1322 43.2978 87.4349 43.5387 87.6465 43.8577C87.8581 44.1767 87.9639 44.5689 87.9639 45.0344C87.9639 45.4153 87.8988 45.7424 87.7686 46.0159C87.6416 46.2861 87.4609 46.5123 87.2266 46.6946C86.9954 46.8736 86.7236 47.0168 86.4111 47.1243L85.9473 47.3684H83.6426L83.6328 46.2258H85.3467C85.6038 46.2258 85.8171 46.1803 85.9863 46.0891C86.1556 45.998 86.2826 45.871 86.3672 45.7083C86.4551 45.5455 86.499 45.3567 86.499 45.1418C86.499 44.914 86.4567 44.717 86.3721 44.551C86.2874 44.385 86.1589 44.2581 85.9863 44.1702C85.8138 44.0823 85.5973 44.0383 85.3369 44.0383H84.1504V50.0002H82.6855V42.8909ZM86.6602 50.0002L85.0391 46.8313L86.5869 46.8215L88.2275 49.9319V50.0002H86.6602ZM93.2129 47.6418H94.6729C94.6436 48.1204 94.5117 48.5452 94.2773 48.9163C94.0462 49.2874 93.7223 49.5771 93.3057 49.7854C92.8923 49.9937 92.3942 50.0979 91.8115 50.0979C91.3558 50.0979 90.9473 50.0198 90.5859 49.8635C90.2246 49.704 89.9154 49.4762 89.6582 49.1799C89.4043 48.8837 89.2106 48.5256 89.0771 48.1057C88.9437 47.6858 88.877 47.2154 88.877 46.6946V46.2014C88.877 45.6806 88.9453 45.2102 89.082 44.7903C89.222 44.3671 89.4206 44.0074 89.6777 43.7112C89.9382 43.415 90.249 43.1871 90.6104 43.0276C90.9717 42.8681 91.3753 42.7883 91.8213 42.7883C92.4137 42.7883 92.9134 42.8958 93.3203 43.1106C93.7305 43.3254 94.0479 43.6217 94.2725 43.9993C94.5003 44.3769 94.637 44.8066 94.6826 45.2883H93.2178C93.2015 45.0019 93.1445 44.7594 93.0469 44.5608C92.9492 44.359 92.8011 44.2076 92.6025 44.1067C92.4072 44.0025 92.1468 43.9504 91.8213 43.9504C91.5771 43.9504 91.3639 43.996 91.1816 44.0872C90.9993 44.1783 90.8464 44.3167 90.7227 44.5022C90.599 44.6877 90.5062 44.9221 90.4443 45.2053C90.3857 45.4853 90.3564 45.814 90.3564 46.1917V46.6946C90.3564 47.0624 90.3841 47.3863 90.4395 47.6663C90.4948 47.943 90.5794 48.1773 90.6934 48.3694C90.8105 48.5582 90.9603 48.7014 91.1426 48.7991C91.3281 48.8935 91.5511 48.9407 91.8115 48.9407C92.1175 48.9407 92.3698 48.8918 92.5684 48.7942C92.7669 48.6965 92.9183 48.5517 93.0225 48.3596C93.1299 48.1676 93.1934 47.9283 93.2129 47.6418ZM100.352 48.9016V50.0002H95.4883V49.0627L97.7881 46.5969C98.0192 46.3398 98.2015 46.1135 98.335 45.9182C98.4684 45.7196 98.5645 45.5422 98.623 45.386C98.6849 45.2265 98.7158 45.0751 98.7158 44.9319C98.7158 44.717 98.68 44.5331 98.6084 44.3801C98.5368 44.2239 98.431 44.1034 98.291 44.0188C98.1543 43.9342 97.985 43.8918 97.7832 43.8918C97.5684 43.8918 97.3828 43.9439 97.2266 44.0481C97.0736 44.1523 96.9564 44.2971 96.875 44.4827C96.7969 44.6682 96.7578 44.8782 96.7578 45.1125H95.3467C95.3467 44.6894 95.4476 44.302 95.6494 43.9504C95.8512 43.5956 96.1361 43.314 96.5039 43.1057C96.8717 42.8941 97.3079 42.7883 97.8125 42.7883C98.3105 42.7883 98.7305 42.8697 99.0723 43.0325C99.4173 43.192 99.6777 43.4231 99.8535 43.7258C100.033 44.0253 100.122 44.3834 100.122 44.8C100.122 45.0344 100.085 45.2639 100.01 45.4885C99.9349 45.7099 99.8275 45.9312 99.6875 46.1526C99.5508 46.3707 99.3848 46.592 99.1895 46.8167C98.9941 47.0413 98.7777 47.274 98.54 47.5149L97.3047 48.9016H100.352ZM106.016 45.8206V47.051C106.016 47.5849 105.959 48.0455 105.845 48.4329C105.731 48.817 105.566 49.1327 105.352 49.3801C105.14 49.6243 104.888 49.8049 104.595 49.9221C104.302 50.0393 103.976 50.0979 103.618 50.0979C103.332 50.0979 103.065 50.0621 102.817 49.9905C102.57 49.9156 102.347 49.8 102.148 49.6438C101.953 49.4875 101.784 49.2906 101.641 49.053C101.501 48.8121 101.393 48.5256 101.318 48.1936C101.243 47.8616 101.206 47.4807 101.206 47.051V45.8206C101.206 45.2867 101.263 44.8293 101.377 44.4485C101.494 44.0644 101.659 43.7502 101.87 43.5061C102.085 43.262 102.339 43.0829 102.632 42.969C102.925 42.8518 103.25 42.7932 103.608 42.7932C103.895 42.7932 104.16 42.8306 104.404 42.9055C104.652 42.9771 104.875 43.0894 105.073 43.2424C105.272 43.3954 105.441 43.5924 105.581 43.8333C105.721 44.0709 105.828 44.3557 105.903 44.6877C105.978 45.0165 106.016 45.3941 106.016 45.8206ZM104.604 47.2366V45.6301C104.604 45.373 104.59 45.1484 104.561 44.9563C104.535 44.7642 104.494 44.6015 104.438 44.468C104.383 44.3313 104.315 44.2206 104.233 44.136C104.152 44.0514 104.059 43.9895 103.955 43.9504C103.851 43.9114 103.735 43.8918 103.608 43.8918C103.449 43.8918 103.307 43.9228 103.184 43.9846C103.063 44.0465 102.961 44.1458 102.876 44.2825C102.791 44.4159 102.726 44.595 102.681 44.8196C102.638 45.0409 102.617 45.3111 102.617 45.6301V47.2366C102.617 47.4937 102.63 47.72 102.656 47.9153C102.686 48.1106 102.728 48.2782 102.783 48.4182C102.842 48.5549 102.91 48.6672 102.988 48.7551C103.07 48.8398 103.162 48.9016 103.267 48.9407C103.374 48.9797 103.491 48.9993 103.618 48.9993C103.774 48.9993 103.913 48.9683 104.033 48.9065C104.157 48.8414 104.261 48.7405 104.346 48.6038C104.434 48.4638 104.499 48.2815 104.541 48.0569C104.583 47.8323 104.604 47.5588 104.604 47.2366ZM109.448 47.1096V47.217C109.448 47.8811 109.373 48.4931 109.224 49.053C109.074 49.6096 108.875 50.1028 108.628 50.5325C108.384 50.9654 108.115 51.3251 107.822 51.6116C107.533 51.898 107.243 52.1031 106.953 52.2268L106.68 51.5042C106.865 51.3674 107.046 51.1786 107.222 50.9377C107.401 50.6969 107.563 50.4006 107.71 50.0491C107.856 49.7008 107.972 49.2922 108.057 48.8235C108.145 48.3547 108.188 47.8225 108.188 47.2268V47.0999C108.188 46.5042 108.145 45.9719 108.057 45.5032C107.969 45.0344 107.85 44.6259 107.7 44.2776C107.554 43.926 107.391 43.6314 107.212 43.3938C107.036 43.1529 106.859 42.9641 106.68 42.8274L106.953 42.0999C107.243 42.2236 107.533 42.4303 107.822 42.72C108.115 43.0064 108.384 43.3645 108.628 43.7942C108.875 44.2239 109.074 44.7187 109.224 45.2786C109.373 45.8352 109.448 46.4456 109.448 47.1096Z"
                                                        fill="#ADDBDB"
                                                    />
                                                    <path
                                                        d="M23 47C31.2843 47 38 40.2843 38 32C38 23.7157 31.2843 17 23 17C14.7157 17 8 23.7157 8 32C8 40.2843 14.7157 47 23 47Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M24.9461 34.0072V34.0048C24.8424 34.0121 24.3071 34.0434 23.1158 34.0434C22.1632 34.0434 21.4952 34.0169 21.2588 34.0048V34.0072C17.5957 33.8457 14.8633 33.209 14.8633 32.4445C14.8633 31.6825 17.5981 31.0434 21.2588 30.8818V33.373C21.4976 33.3899 22.1849 33.4309 23.1326 33.4309C24.2709 33.4309 24.84 33.3826 24.9461 33.373V30.8842C28.6021 31.0482 31.3272 31.6849 31.3272 32.4469C31.3272 33.209 28.5997 33.8457 24.9461 34.0096M24.9461 30.6262V28.3979H30.0466V25H16.1608V28.3979H21.2613V30.6262C17.1158 30.8167 14 31.6367 14 32.6206C14 33.6045 17.1182 34.4244 21.2613 34.6174V41.7605H24.9486V34.6174C29.0868 34.4268 32.1977 33.6069 32.1977 32.623C32.1977 31.6415 29.0868 30.8191 24.9486 30.6286"
                                                        fill="#009393"
                                                    />
                                                    <circle cx="32.5" cy="40.5" r="5.5" fill="#FF060A"/>
                                                    <path
                                                        d="M36.4968 39.444C36.1271 39.1016 35.6158 38.5787 35.1993 38.2079L35.1747 38.1906C35.1337 38.1575 35.0875 38.1316 35.0379 38.1139V38.1139C34.0337 37.926 29.3603 37.0496 29.2691 37.0608C29.2436 37.0644 29.2191 37.0737 29.1976 37.088L29.1742 37.1065C29.1454 37.1359 29.1235 37.1714 29.1102 37.2103L29.104 37.2264V37.3142V37.3278C29.6301 38.7975 31.7075 43.612 32.1166 44.7418C32.1412 44.8185 32.188 44.9643 32.2755 44.9717H32.2952C32.342 44.9717 32.5416 44.7072 32.5416 44.7072C32.5416 44.7072 36.1099 40.3661 36.4709 39.9038C36.5176 39.8468 36.5589 39.7856 36.5941 39.7208C36.6031 39.6702 36.5989 39.6181 36.5818 39.5695C36.5647 39.521 36.5354 39.4777 36.4968 39.444V39.444ZM33.4571 39.9495L34.98 38.6825L35.8733 39.5082L33.4571 39.9495ZM32.8657 39.8667L30.2437 37.711L34.4859 38.4959L32.8657 39.8667ZM33.1023 40.4316L35.7858 39.9977L32.7178 43.706L33.1023 40.4316ZM29.8876 37.926L32.6464 40.2746L32.2472 43.7085L29.8876 37.926Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_USDT (ERC20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(0, 147, 147)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#009393"/>
                                                    <path
                                                        d="M80.3018 27.2062V36.4124H81.8951H83.4883V32.8527C83.4883 29.4715 83.4939 29.2651 83.6002 28.8466C83.7791 28.1324 84.0586 27.6303 84.5449 27.1449C85.2326 26.4642 86.0488 26.1517 86.9656 26.2242C88.3297 26.3358 89.1571 27.0165 89.5484 28.35C89.6603 28.7239 89.6658 28.9024 89.6826 32.5737L89.6994 36.4124H91.2927H92.886L92.8636 32.2947C92.8413 27.7195 92.8468 27.7753 92.4499 26.5757C91.8741 24.8349 90.6721 23.7469 88.9111 23.3787C88.2011 23.228 86.865 23.2392 86.2165 23.401C85.2885 23.6298 84.5785 24.0371 83.8965 24.7457L83.4883 25.1585V21.5821V18H81.8951H80.3018V27.2062Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M73.174 19.9528C72.4081 20.0421 71.7596 20.1146 71.7372 20.1146C71.7093 20.1202 71.6925 20.8735 71.6925 21.7941V23.4679H70.4905H69.2886V24.8349V26.2019H70.4905H71.6925V29.0865C71.6925 30.6767 71.7204 32.2445 71.7484 32.5737C71.9552 34.7218 73.0733 36.0832 74.9629 36.4738C75.4381 36.5742 75.6561 36.5854 76.4165 36.563C76.9084 36.5463 77.4954 36.4961 77.7135 36.4459C78.2949 36.3175 79.016 36.072 79.016 35.9995C79.016 35.9437 78.1775 33.3939 78.1495 33.3548C78.1383 33.3437 77.9538 33.3995 77.7414 33.4776C77.0258 33.7342 76.327 33.7621 75.8239 33.5501C75.5052 33.4162 75.2425 33.1484 75.0691 32.7745L74.907 32.423L74.8903 29.3097L74.8735 26.2019H76.696H78.5129V24.8349V23.4679H76.7239H74.935V21.6267V19.7855L74.7561 19.791C74.6554 19.7966 73.9455 19.8691 73.174 19.9528Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M49.0678 20.092L47.4857 20.2538L47.4745 21.9333L47.4577 23.6071L46.2446 23.6238L45.0259 23.635V25.002V26.369H46.2502H47.4801L47.5025 29.7557C47.5192 33.0309 47.5248 33.1648 47.6422 33.6112C48.0615 35.1902 49.0231 36.1833 50.5325 36.585C50.9071 36.6855 51.1419 36.7078 51.9301 36.7078C52.9812 36.7134 53.5011 36.6353 54.3061 36.3674C54.6974 36.2335 54.7757 36.1833 54.7645 36.0996C54.7533 36.0438 54.5577 35.4245 54.3285 34.7326L53.9092 33.4717L53.4508 33.6391C52.2432 34.0687 51.2201 33.8009 50.8344 32.9416L50.7002 32.6459L50.6835 29.5047L50.6667 26.369H52.4612H54.2502V25.002V23.635L52.478 23.6238L50.7002 23.6071L50.6723 21.7659L50.6443 19.9246L49.0678 20.092Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M61.7695 23.0774C60.4445 23.1889 59.4047 23.5405 58.3872 24.2156C57.5319 24.7847 56.8219 25.5881 56.3523 26.5255C55.251 28.7071 55.3795 31.7647 56.6598 33.8235C57.5542 35.263 59.0413 36.2227 60.9924 36.6188C61.7639 36.7751 63.7988 36.7583 64.5703 36.5909C66.0015 36.2841 67.2314 35.6982 68.1147 34.9115L68.3663 34.6883L67.36 33.684C66.8065 33.1261 66.3257 32.6741 66.2922 32.6741C66.2587 32.6741 66.1916 32.7187 66.1524 32.769C66.0015 32.9531 65.4201 33.2823 64.9393 33.4552C64.2125 33.7231 63.5417 33.8458 62.8261 33.8458C61.4956 33.8458 60.506 33.4999 59.7793 32.7801C59.3656 32.3672 59.0301 31.7647 58.9686 31.3127L58.9295 31.0561H64.0169H69.1042L69.1378 30.4256C69.1769 29.7058 69.1042 28.5509 68.9756 27.9371C68.4837 25.5156 67.0078 23.9087 64.7325 23.3117C63.8883 23.0941 62.6919 22.9992 61.7695 23.0774ZM63.7821 26.0066C64.2461 26.1293 64.8554 26.4251 65.1294 26.6706C65.5543 27.0388 65.9903 27.859 65.9903 28.2942V28.4337H62.4963C59.2649 28.4337 59.0022 28.4281 59.0022 28.3388C59.0022 28.2886 59.1028 28.0375 59.2258 27.7809C59.7066 26.7989 60.629 26.1517 61.8981 25.9229C62.2782 25.8504 63.3907 25.9006 63.7821 26.0066Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M100.567 23.0774C97.3528 23.3508 95.1222 25.3203 94.5184 28.4058C94.3842 29.0977 94.3842 30.6655 94.524 31.363C95.111 34.4094 97.1292 36.2729 100.299 36.697C101.02 36.7918 102.714 36.7304 103.396 36.5854C104.783 36.2841 106.018 35.6982 106.913 34.9115L107.164 34.6883L106.158 33.6784C105.604 33.1261 105.124 32.6741 105.09 32.6741C105.056 32.6741 104.984 32.7244 104.922 32.7913C104.743 32.9866 104.117 33.3269 103.592 33.5055C102.189 33.9965 100.595 33.9574 99.4436 33.3995C98.5715 32.981 97.8727 32.1106 97.7665 31.3183L97.7273 31.0561H102.831H107.93L107.902 29.7282C107.88 28.6457 107.852 28.3054 107.757 27.8479C107.091 24.8461 105.012 23.2001 101.685 23.0606C101.35 23.0439 100.841 23.0551 100.567 23.0774ZM102.58 26.0066C103.424 26.2242 104.173 26.7654 104.481 27.368C104.648 27.7084 104.788 28.1213 104.788 28.3054V28.4337H101.294C97.2577 28.4337 97.6547 28.5174 98.0348 27.7586C98.5268 26.7766 99.4324 26.1517 100.696 25.9229C101.07 25.8504 102.189 25.9006 102.58 26.0066Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M115.813 23.1387C115.287 23.1945 114.622 23.4009 114.247 23.6185C113.906 23.8194 113.37 24.3271 113.146 24.6563C112.928 24.9744 112.939 24.9967 112.805 24.0928L112.71 23.4679H111.24H109.764V29.9401V36.4124H111.357H112.95V32.7243C112.95 29.5496 112.961 28.986 113.04 28.6401C113.297 27.4796 114.04 26.704 115.186 26.3916C115.438 26.3246 115.757 26.2911 116.221 26.2911C117.042 26.2855 117.512 26.4139 118.077 26.7933C118.284 26.9328 118.474 27.0611 118.496 27.0723C118.518 27.0834 118.776 26.6259 119.077 26.0512C119.374 25.4709 119.704 24.846 119.81 24.6563L120 24.3048L119.648 24.0482C118.675 23.3228 117.221 22.9825 115.813 23.1387Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M49.5605 42.8909H51.0205V47.5881C51.0205 48.135 50.9033 48.5956 50.6689 48.97C50.4378 49.3443 50.1172 49.6259 49.707 49.8147C49.3001 50.0035 48.8314 50.0979 48.3008 50.0979C47.7702 50.0979 47.2982 50.0035 46.8848 49.8147C46.4746 49.6259 46.1523 49.3443 45.918 48.97C45.6868 48.5956 45.5713 48.135 45.5713 47.5881V42.8909H47.0361V47.5881C47.0361 47.9071 47.0866 48.1676 47.1875 48.3694C47.2884 48.5712 47.4333 48.7193 47.6221 48.8137C47.8141 48.9081 48.0404 48.9553 48.3008 48.9553C48.5677 48.9553 48.7939 48.9081 48.9795 48.8137C49.1683 48.7193 49.3115 48.5712 49.4092 48.3694C49.5101 48.1676 49.5605 47.9071 49.5605 47.5881V42.8909ZM55.9277 48.1399C55.9277 48.0129 55.9082 47.899 55.8691 47.7981C55.8333 47.6939 55.765 47.5995 55.6641 47.5149C55.5632 47.427 55.4215 47.3407 55.2393 47.2561C55.057 47.1715 54.821 47.0836 54.5312 46.9924C54.209 46.8883 53.903 46.7711 53.6133 46.6409C53.3268 46.5107 53.0729 46.3593 52.8516 46.1868C52.6335 46.011 52.4609 45.8075 52.334 45.5764C52.2103 45.3453 52.1484 45.0767 52.1484 44.7708C52.1484 44.4745 52.2135 44.206 52.3438 43.9651C52.474 43.7209 52.6562 43.5126 52.8906 43.3401C53.125 43.1643 53.4017 43.0292 53.7207 42.9348C54.043 42.8404 54.3962 42.7932 54.7803 42.7932C55.3044 42.7932 55.7617 42.8876 56.1523 43.0764C56.543 43.2652 56.8457 43.524 57.0605 43.8528C57.2786 44.1816 57.3877 44.5575 57.3877 44.9807H55.9326C55.9326 44.7724 55.8887 44.5901 55.8008 44.4338C55.7161 44.2743 55.5859 44.149 55.4102 44.0579C55.2376 43.9667 55.0195 43.9211 54.7559 43.9211C54.502 43.9211 54.2904 43.9602 54.1211 44.0383C53.9518 44.1132 53.8249 44.2157 53.7402 44.3459C53.6556 44.4729 53.6133 44.6161 53.6133 44.7756C53.6133 44.8961 53.6426 45.0051 53.7012 45.1028C53.763 45.2004 53.8542 45.2916 53.9746 45.3762C54.0951 45.4609 54.2432 45.5406 54.4189 45.6155C54.5947 45.6903 54.7982 45.7636 55.0293 45.8352C55.4167 45.9524 55.7568 46.0842 56.0498 46.2307C56.346 46.3772 56.5934 46.5416 56.792 46.7239C56.9906 46.9062 57.1403 47.1129 57.2412 47.344C57.3421 47.5751 57.3926 47.8372 57.3926 48.1301C57.3926 48.4394 57.3324 48.7161 57.2119 48.9602C57.0915 49.2043 56.9173 49.4111 56.6895 49.5803C56.4616 49.7496 56.1898 49.8782 55.874 49.9661C55.5583 50.054 55.2051 50.0979 54.8145 50.0979C54.4629 50.0979 54.1162 50.0523 53.7744 49.9612C53.4326 49.8668 53.1217 49.7252 52.8418 49.5364C52.5651 49.3476 52.3438 49.1067 52.1777 48.8137C52.0117 48.5208 51.9287 48.1741 51.9287 47.7737H53.3984C53.3984 47.995 53.4326 48.1822 53.501 48.3352C53.5693 48.4882 53.6654 48.6119 53.7891 48.7063C53.916 48.8007 54.0658 48.8691 54.2383 48.9114C54.4141 48.9537 54.6061 48.9749 54.8145 48.9749C55.0684 48.9749 55.2767 48.939 55.4395 48.8674C55.6055 48.7958 55.7275 48.6965 55.8057 48.5696C55.887 48.4426 55.9277 48.2994 55.9277 48.1399ZM60.5713 50.0002H59.0234L59.0332 48.8577H60.5713C60.9554 48.8577 61.2793 48.7714 61.543 48.5989C61.8066 48.4231 62.0052 48.1676 62.1387 47.8323C62.2754 47.497 62.3438 47.0917 62.3438 46.6165V46.2698C62.3438 45.9052 62.3047 45.5846 62.2266 45.3079C62.1517 45.0312 62.0394 44.7984 61.8896 44.6096C61.7399 44.4208 61.556 44.2792 61.3379 44.1848C61.1198 44.0872 60.8691 44.0383 60.5859 44.0383H58.9941V42.8909H60.5859C61.0612 42.8909 61.4958 42.9722 61.8896 43.135C62.2868 43.2945 62.6302 43.524 62.9199 43.8235C63.2096 44.123 63.4326 44.481 63.5889 44.8977C63.7484 45.3111 63.8281 45.7717 63.8281 46.2795V46.6165C63.8281 47.121 63.7484 47.5816 63.5889 47.9983C63.4326 48.415 63.2096 48.773 62.9199 49.0725C62.6335 49.3687 62.29 49.5982 61.8896 49.761C61.4925 49.9205 61.0531 50.0002 60.5713 50.0002ZM59.8535 42.8909V50.0002H58.3887V42.8909H59.8535ZM67.7393 42.8909V50.0002H66.2793V42.8909H67.7393ZM69.9268 42.8909V44.0383H64.126V42.8909H69.9268ZM72.9639 47.217V47.1096C72.9639 46.4228 73.0355 45.7994 73.1787 45.2395C73.3252 44.6796 73.5173 44.1881 73.7549 43.7649C73.9958 43.3385 74.2578 42.9853 74.541 42.7053C74.8242 42.4254 75.1058 42.2236 75.3857 42.0999L75.6543 42.842C75.4688 42.9788 75.2865 43.1676 75.1074 43.4084C74.9284 43.6461 74.7656 43.939 74.6191 44.2874C74.4759 44.6324 74.3604 45.0393 74.2725 45.5081C74.1846 45.9736 74.1406 46.5042 74.1406 47.0999V47.2268C74.1406 47.8225 74.1846 48.3547 74.2725 48.8235C74.3604 49.289 74.4759 49.6959 74.6191 50.0442C74.7656 50.3958 74.9284 50.692 75.1074 50.9329C75.2865 51.1737 75.4688 51.3642 75.6543 51.5042L75.3857 52.2268C75.1058 52.1031 74.8242 51.9013 74.541 51.6213C74.2578 51.3446 73.9958 50.9931 73.7549 50.5667C73.5173 50.1435 73.3252 49.6519 73.1787 49.092C73.0355 48.5289 72.9639 47.9039 72.9639 47.217ZM81.2549 48.8577V50.0002H77.4707V48.8577H81.2549ZM77.9492 42.8909V50.0002H76.4844V42.8909H77.9492ZM80.7617 45.7864V46.8997H77.4707V45.7864H80.7617ZM81.25 42.8909V44.0383H77.4707V42.8909H81.25ZM82.1094 42.8909H84.7607C85.3044 42.8909 85.7715 42.9722 86.1621 43.135C86.556 43.2978 86.8587 43.5387 87.0703 43.8577C87.2819 44.1767 87.3877 44.5689 87.3877 45.0344C87.3877 45.4153 87.3226 45.7424 87.1924 46.0159C87.0654 46.2861 86.8848 46.5123 86.6504 46.6946C86.4193 46.8736 86.1475 47.0168 85.835 47.1243L85.3711 47.3684H83.0664L83.0566 46.2258H84.7705C85.0277 46.2258 85.2409 46.1803 85.4102 46.0891C85.5794 45.998 85.7064 45.871 85.791 45.7083C85.8789 45.5455 85.9229 45.3567 85.9229 45.1418C85.9229 44.914 85.8805 44.717 85.7959 44.551C85.7113 44.385 85.5827 44.2581 85.4102 44.1702C85.2376 44.0823 85.0212 44.0383 84.7607 44.0383H83.5742V50.0002H82.1094V42.8909ZM86.084 50.0002L84.4629 46.8313L86.0107 46.8215L87.6514 49.9319V50.0002H86.084ZM92.6367 47.6418H94.0967C94.0674 48.1204 93.9355 48.5452 93.7012 48.9163C93.4701 49.2874 93.1462 49.5771 92.7295 49.7854C92.3161 49.9937 91.818 50.0979 91.2354 50.0979C90.7796 50.0979 90.3711 50.0198 90.0098 49.8635C89.6484 49.704 89.3392 49.4762 89.082 49.1799C88.8281 48.8837 88.6344 48.5256 88.501 48.1057C88.3675 47.6858 88.3008 47.2154 88.3008 46.6946V46.2014C88.3008 45.6806 88.3691 45.2102 88.5059 44.7903C88.6458 44.3671 88.8444 44.0074 89.1016 43.7112C89.362 43.415 89.6729 43.1871 90.0342 43.0276C90.3955 42.8681 90.7992 42.7883 91.2451 42.7883C91.8376 42.7883 92.3372 42.8958 92.7441 43.1106C93.1543 43.3254 93.4717 43.6217 93.6963 43.9993C93.9242 44.3769 94.0609 44.8066 94.1064 45.2883H92.6416C92.6253 45.0019 92.5684 44.7594 92.4707 44.5608C92.373 44.359 92.2249 44.2076 92.0264 44.1067C91.8311 44.0025 91.5706 43.9504 91.2451 43.9504C91.001 43.9504 90.7878 43.996 90.6055 44.0872C90.4232 44.1783 90.2702 44.3167 90.1465 44.5022C90.0228 44.6877 89.93 44.9221 89.8682 45.2053C89.8096 45.4853 89.7803 45.814 89.7803 46.1917V46.6946C89.7803 47.0624 89.8079 47.3863 89.8633 47.6663C89.9186 47.943 90.0033 48.1773 90.1172 48.3694C90.2344 48.5582 90.3841 48.7014 90.5664 48.7991C90.752 48.8935 90.9749 48.9407 91.2354 48.9407C91.5413 48.9407 91.7936 48.8918 91.9922 48.7942C92.1908 48.6965 92.3421 48.5517 92.4463 48.3596C92.5537 48.1676 92.6172 47.9283 92.6367 47.6418ZM99.7754 48.9016V50.0002H94.9121V49.0627L97.2119 46.5969C97.443 46.3398 97.6253 46.1135 97.7588 45.9182C97.8923 45.7196 97.9883 45.5422 98.0469 45.386C98.1087 45.2265 98.1396 45.0751 98.1396 44.9319C98.1396 44.717 98.1038 44.5331 98.0322 44.3801C97.9606 44.2239 97.8548 44.1034 97.7148 44.0188C97.5781 43.9342 97.4089 43.8918 97.207 43.8918C96.9922 43.8918 96.8066 43.9439 96.6504 44.0481C96.4974 44.1523 96.3802 44.2971 96.2988 44.4827C96.2207 44.6682 96.1816 44.8782 96.1816 45.1125H94.7705C94.7705 44.6894 94.8714 44.302 95.0732 43.9504C95.2751 43.5956 95.5599 43.314 95.9277 43.1057C96.2956 42.8941 96.7318 42.7883 97.2363 42.7883C97.7344 42.7883 98.1543 42.8697 98.4961 43.0325C98.8411 43.192 99.1016 43.4231 99.2773 43.7258C99.4564 44.0253 99.5459 44.3834 99.5459 44.8C99.5459 45.0344 99.5085 45.2639 99.4336 45.4885C99.3587 45.7099 99.2513 45.9312 99.1113 46.1526C98.9746 46.3707 98.8086 46.592 98.6133 46.8167C98.418 47.0413 98.2015 47.274 97.9639 47.5149L96.7285 48.9016H99.7754ZM105.439 45.8206V47.051C105.439 47.5849 105.382 48.0455 105.269 48.4329C105.155 48.817 104.99 49.1327 104.775 49.3801C104.564 49.6243 104.312 49.8049 104.019 49.9221C103.726 50.0393 103.4 50.0979 103.042 50.0979C102.756 50.0979 102.489 50.0621 102.241 49.9905C101.994 49.9156 101.771 49.8 101.572 49.6438C101.377 49.4875 101.208 49.2906 101.064 49.053C100.924 48.8121 100.817 48.5256 100.742 48.1936C100.667 47.8616 100.63 47.4807 100.63 47.051V45.8206C100.63 45.2867 100.687 44.8293 100.801 44.4485C100.918 44.0644 101.082 43.7502 101.294 43.5061C101.509 43.262 101.763 43.0829 102.056 42.969C102.349 42.8518 102.674 42.7932 103.032 42.7932C103.319 42.7932 103.584 42.8306 103.828 42.9055C104.076 42.9771 104.299 43.0894 104.497 43.2424C104.696 43.3954 104.865 43.5924 105.005 43.8333C105.145 44.0709 105.252 44.3557 105.327 44.6877C105.402 45.0165 105.439 45.3941 105.439 45.8206ZM104.028 47.2366V45.6301C104.028 45.373 104.014 45.1484 103.984 44.9563C103.958 44.7642 103.918 44.6015 103.862 44.468C103.807 44.3313 103.739 44.2206 103.657 44.136C103.576 44.0514 103.483 43.9895 103.379 43.9504C103.275 43.9114 103.159 43.8918 103.032 43.8918C102.873 43.8918 102.731 43.9228 102.607 43.9846C102.487 44.0465 102.384 44.1458 102.3 44.2825C102.215 44.4159 102.15 44.595 102.104 44.8196C102.062 45.0409 102.041 45.3111 102.041 45.6301V47.2366C102.041 47.4937 102.054 47.72 102.08 47.9153C102.109 48.1106 102.152 48.2782 102.207 48.4182C102.266 48.5549 102.334 48.6672 102.412 48.7551C102.493 48.8398 102.586 48.9016 102.69 48.9407C102.798 48.9797 102.915 48.9993 103.042 48.9993C103.198 48.9993 103.337 48.9683 103.457 48.9065C103.581 48.8414 103.685 48.7405 103.77 48.6038C103.857 48.4638 103.923 48.2815 103.965 48.0569C104.007 47.8323 104.028 47.5588 104.028 47.2366ZM108.872 47.1096V47.217C108.872 47.8811 108.797 48.4931 108.647 49.053C108.498 49.6096 108.299 50.1028 108.052 50.5325C107.808 50.9654 107.539 51.3251 107.246 51.6116C106.956 51.898 106.667 52.1031 106.377 52.2268L106.104 51.5042C106.289 51.3674 106.47 51.1786 106.646 50.9377C106.825 50.6969 106.987 50.4006 107.134 50.0491C107.28 49.7008 107.396 49.2922 107.48 48.8235C107.568 48.3547 107.612 47.8225 107.612 47.2268V47.0999C107.612 46.5042 107.568 45.9719 107.48 45.5032C107.393 45.0344 107.274 44.6259 107.124 44.2776C106.978 43.926 106.815 43.6314 106.636 43.3938C106.46 43.1529 106.283 42.9641 106.104 42.8274L106.377 42.0999C106.667 42.2236 106.956 42.4303 107.246 42.72C107.539 43.0064 107.808 43.3645 108.052 43.7942C108.299 44.2239 108.498 44.7187 108.647 45.2786C108.797 45.8352 108.872 46.4456 108.872 47.1096Z"
                                                        fill="#ADDBDB"
                                                    />
                                                    <path
                                                        d="M23 47C31.2843 47 38 40.2843 38 32C38 23.7157 31.2843 17 23 17C14.7157 17 8 23.7157 8 32C8 40.2843 14.7157 47 23 47Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M24.9461 34.0072V34.0048C24.8424 34.0121 24.3071 34.0434 23.1158 34.0434C22.1632 34.0434 21.4952 34.0169 21.2588 34.0048V34.0072C17.5957 33.8457 14.8633 33.209 14.8633 32.4445C14.8633 31.6825 17.5981 31.0434 21.2588 30.8818V33.373C21.4976 33.3899 22.1849 33.4309 23.1326 33.4309C24.2709 33.4309 24.84 33.3826 24.9461 33.373V30.8842C28.6021 31.0482 31.3272 31.6849 31.3272 32.4469C31.3272 33.209 28.5997 33.8457 24.9461 34.0096M24.9461 30.6262V28.3979H30.0466V25H16.1608V28.3979H21.2613V30.6262C17.1158 30.8167 14 31.6367 14 32.6206C14 33.6045 17.1182 34.4244 21.2613 34.6174V41.7605H24.9486V34.6174C29.0868 34.4268 32.1977 33.6069 32.1977 32.623C32.1977 31.6415 29.0868 30.8191 24.9486 30.6286"
                                                        fill="#009393"
                                                    />
                                                    <circle cx="32.5" cy="40.5" r="5.5" fill="#E9ECEC"/>
                                                    <path
                                                        d="M32.4995 36.1L32.4404 36.3005V42.1193L32.4995 42.1782L35.2004 40.5816L32.4995 36.1Z"
                                                        fill="#343434"
                                                    />
                                                    <path
                                                        d="M32.4993 36.1002L29.7983 40.5819L32.4993 42.1784V39.3541V36.1002Z"
                                                        fill="#8C8C8C"
                                                    />
                                                    <path
                                                        d="M32.4996 42.6898L32.4663 42.7304V44.8031L32.4996 44.9003L35.2022 41.0941L32.4996 42.6898Z"
                                                        fill="#3C3C3B"
                                                    />
                                                    <path
                                                        d="M32.4993 44.9003V42.6898L29.7983 41.0941L32.4993 44.9003Z"
                                                        fill="#8C8C8C"
                                                    />
                                                    <path
                                                        d="M32.4993 42.1786L35.2002 40.5821L32.4993 39.3544V42.1786Z"
                                                        fill="#141414"
                                                    />
                                                    <path
                                                        d="M29.7983 40.5821L32.4993 42.1786V39.3544L29.7983 40.5821Z"
                                                        fill="#393939"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_USDT (BSC BEP-20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(0, 147, 147)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#009393"/>
                                                    <path
                                                        d="M80.3018 27.2062V36.4124H81.8951H83.4883V32.8527C83.4883 29.4715 83.4939 29.2651 83.6002 28.8466C83.7791 28.1324 84.0586 27.6303 84.5449 27.1449C85.2326 26.4642 86.0488 26.1517 86.9656 26.2242C88.3297 26.3358 89.1571 27.0165 89.5484 28.35C89.6603 28.7239 89.6658 28.9024 89.6826 32.5737L89.6994 36.4124H91.2927H92.886L92.8636 32.2947C92.8413 27.7195 92.8468 27.7753 92.4499 26.5757C91.8741 24.8349 90.6721 23.7469 88.9111 23.3787C88.2011 23.228 86.865 23.2392 86.2165 23.401C85.2885 23.6298 84.5785 24.0371 83.8965 24.7457L83.4883 25.1585V21.5821V18H81.8951H80.3018V27.2062Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M73.174 19.9528C72.4081 20.0421 71.7596 20.1146 71.7372 20.1146C71.7093 20.1202 71.6925 20.8735 71.6925 21.7941V23.4679H70.4905H69.2886V24.8349V26.2019H70.4905H71.6925V29.0865C71.6925 30.6767 71.7204 32.2445 71.7484 32.5737C71.9552 34.7218 73.0733 36.0832 74.9629 36.4738C75.4381 36.5742 75.6561 36.5854 76.4165 36.563C76.9084 36.5463 77.4954 36.4961 77.7135 36.4459C78.2949 36.3175 79.016 36.072 79.016 35.9995C79.016 35.9437 78.1775 33.3939 78.1495 33.3548C78.1383 33.3437 77.9538 33.3995 77.7414 33.4776C77.0258 33.7342 76.327 33.7621 75.8239 33.5501C75.5052 33.4162 75.2425 33.1484 75.0691 32.7745L74.907 32.423L74.8903 29.3097L74.8735 26.2019H76.696H78.5129V24.8349V23.4679H76.7239H74.935V21.6267V19.7855L74.7561 19.791C74.6554 19.7966 73.9455 19.8691 73.174 19.9528Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M49.0678 20.092L47.4857 20.2538L47.4745 21.9333L47.4577 23.6071L46.2446 23.6238L45.0259 23.635V25.002V26.369H46.2502H47.4801L47.5025 29.7557C47.5192 33.0309 47.5248 33.1648 47.6422 33.6112C48.0615 35.1902 49.0231 36.1833 50.5325 36.585C50.9071 36.6855 51.1419 36.7078 51.9301 36.7078C52.9812 36.7134 53.5011 36.6353 54.3061 36.3674C54.6974 36.2335 54.7757 36.1833 54.7645 36.0996C54.7533 36.0438 54.5577 35.4245 54.3285 34.7326L53.9092 33.4717L53.4508 33.6391C52.2432 34.0687 51.2201 33.8009 50.8344 32.9416L50.7002 32.6459L50.6835 29.5047L50.6667 26.369H52.4612H54.2502V25.002V23.635L52.478 23.6238L50.7002 23.6071L50.6723 21.7659L50.6443 19.9246L49.0678 20.092Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M61.7695 23.0774C60.4445 23.1889 59.4047 23.5405 58.3872 24.2156C57.5319 24.7847 56.8219 25.5881 56.3523 26.5255C55.251 28.7071 55.3795 31.7647 56.6598 33.8235C57.5542 35.263 59.0413 36.2227 60.9924 36.6188C61.7639 36.7751 63.7988 36.7583 64.5703 36.5909C66.0015 36.2841 67.2314 35.6982 68.1147 34.9115L68.3663 34.6883L67.36 33.684C66.8065 33.1261 66.3257 32.6741 66.2922 32.6741C66.2587 32.6741 66.1916 32.7187 66.1524 32.769C66.0015 32.9531 65.4201 33.2823 64.9393 33.4552C64.2125 33.7231 63.5417 33.8458 62.8261 33.8458C61.4956 33.8458 60.506 33.4999 59.7793 32.7801C59.3656 32.3672 59.0301 31.7647 58.9686 31.3127L58.9295 31.0561H64.0169H69.1042L69.1378 30.4256C69.1769 29.7058 69.1042 28.5509 68.9756 27.9371C68.4837 25.5156 67.0078 23.9087 64.7325 23.3117C63.8883 23.0941 62.6919 22.9992 61.7695 23.0774ZM63.7821 26.0066C64.2461 26.1293 64.8554 26.4251 65.1294 26.6706C65.5543 27.0388 65.9903 27.859 65.9903 28.2942V28.4337H62.4963C59.2649 28.4337 59.0022 28.4281 59.0022 28.3388C59.0022 28.2886 59.1028 28.0375 59.2258 27.7809C59.7066 26.7989 60.629 26.1517 61.8981 25.9229C62.2782 25.8504 63.3907 25.9006 63.7821 26.0066Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M100.567 23.0774C97.3528 23.3508 95.1222 25.3203 94.5184 28.4058C94.3842 29.0977 94.3842 30.6655 94.524 31.363C95.111 34.4094 97.1292 36.2729 100.299 36.697C101.02 36.7918 102.714 36.7304 103.396 36.5854C104.783 36.2841 106.018 35.6982 106.913 34.9115L107.164 34.6883L106.158 33.6784C105.604 33.1261 105.124 32.6741 105.09 32.6741C105.056 32.6741 104.984 32.7244 104.922 32.7913C104.743 32.9866 104.117 33.3269 103.592 33.5055C102.189 33.9965 100.595 33.9574 99.4436 33.3995C98.5715 32.981 97.8727 32.1106 97.7665 31.3183L97.7273 31.0561H102.831H107.93L107.902 29.7282C107.88 28.6457 107.852 28.3054 107.757 27.8479C107.091 24.8461 105.012 23.2001 101.685 23.0606C101.35 23.0439 100.841 23.0551 100.567 23.0774ZM102.58 26.0066C103.424 26.2242 104.173 26.7654 104.481 27.368C104.648 27.7084 104.788 28.1213 104.788 28.3054V28.4337H101.294C97.2577 28.4337 97.6547 28.5174 98.0348 27.7586C98.5268 26.7766 99.4324 26.1517 100.696 25.9229C101.07 25.8504 102.189 25.9006 102.58 26.0066Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M115.813 23.1387C115.287 23.1945 114.622 23.4009 114.247 23.6185C113.906 23.8194 113.37 24.3271 113.146 24.6563C112.928 24.9744 112.939 24.9967 112.805 24.0928L112.71 23.4679H111.24H109.764V29.9401V36.4124H111.357H112.95V32.7243C112.95 29.5496 112.961 28.986 113.04 28.6401C113.297 27.4796 114.04 26.704 115.186 26.3916C115.438 26.3246 115.757 26.2911 116.221 26.2911C117.042 26.2855 117.512 26.4139 118.077 26.7933C118.284 26.9328 118.474 27.0611 118.496 27.0723C118.518 27.0834 118.776 26.6259 119.077 26.0512C119.374 25.4709 119.704 24.846 119.81 24.6563L120 24.3048L119.648 24.0482C118.675 23.3228 117.221 22.9825 115.813 23.1387Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M49.5605 42.8909H51.0205V47.5881C51.0205 48.135 50.9033 48.5956 50.6689 48.97C50.4378 49.3443 50.1172 49.6259 49.707 49.8147C49.3001 50.0035 48.8314 50.0979 48.3008 50.0979C47.7702 50.0979 47.2982 50.0035 46.8848 49.8147C46.4746 49.6259 46.1523 49.3443 45.918 48.97C45.6868 48.5956 45.5713 48.135 45.5713 47.5881V42.8909H47.0361V47.5881C47.0361 47.9071 47.0866 48.1676 47.1875 48.3694C47.2884 48.5712 47.4333 48.7193 47.6221 48.8137C47.8141 48.9081 48.0404 48.9553 48.3008 48.9553C48.5677 48.9553 48.7939 48.9081 48.9795 48.8137C49.1683 48.7193 49.3115 48.5712 49.4092 48.3694C49.5101 48.1676 49.5605 47.9071 49.5605 47.5881V42.8909ZM55.9277 48.1399C55.9277 48.0129 55.9082 47.899 55.8691 47.7981C55.8333 47.6939 55.765 47.5995 55.6641 47.5149C55.5632 47.427 55.4215 47.3407 55.2393 47.2561C55.057 47.1715 54.821 47.0836 54.5312 46.9924C54.209 46.8883 53.903 46.7711 53.6133 46.6409C53.3268 46.5107 53.0729 46.3593 52.8516 46.1868C52.6335 46.011 52.4609 45.8075 52.334 45.5764C52.2103 45.3453 52.1484 45.0767 52.1484 44.7708C52.1484 44.4745 52.2135 44.206 52.3438 43.9651C52.474 43.7209 52.6562 43.5126 52.8906 43.3401C53.125 43.1643 53.4017 43.0292 53.7207 42.9348C54.043 42.8404 54.3962 42.7932 54.7803 42.7932C55.3044 42.7932 55.7617 42.8876 56.1523 43.0764C56.543 43.2652 56.8457 43.524 57.0605 43.8528C57.2786 44.1816 57.3877 44.5575 57.3877 44.9807H55.9326C55.9326 44.7724 55.8887 44.5901 55.8008 44.4338C55.7161 44.2743 55.5859 44.149 55.4102 44.0579C55.2376 43.9667 55.0195 43.9211 54.7559 43.9211C54.502 43.9211 54.2904 43.9602 54.1211 44.0383C53.9518 44.1132 53.8249 44.2157 53.7402 44.3459C53.6556 44.4729 53.6133 44.6161 53.6133 44.7756C53.6133 44.8961 53.6426 45.0051 53.7012 45.1028C53.763 45.2004 53.8542 45.2916 53.9746 45.3762C54.0951 45.4609 54.2432 45.5406 54.4189 45.6155C54.5947 45.6903 54.7982 45.7636 55.0293 45.8352C55.4167 45.9524 55.7568 46.0842 56.0498 46.2307C56.346 46.3772 56.5934 46.5416 56.792 46.7239C56.9906 46.9062 57.1403 47.1129 57.2412 47.344C57.3421 47.5751 57.3926 47.8372 57.3926 48.1301C57.3926 48.4394 57.3324 48.7161 57.2119 48.9602C57.0915 49.2043 56.9173 49.4111 56.6895 49.5803C56.4616 49.7496 56.1898 49.8782 55.874 49.9661C55.5583 50.054 55.2051 50.0979 54.8145 50.0979C54.4629 50.0979 54.1162 50.0523 53.7744 49.9612C53.4326 49.8668 53.1217 49.7252 52.8418 49.5364C52.5651 49.3476 52.3438 49.1067 52.1777 48.8137C52.0117 48.5208 51.9287 48.1741 51.9287 47.7737H53.3984C53.3984 47.995 53.4326 48.1822 53.501 48.3352C53.5693 48.4882 53.6654 48.6119 53.7891 48.7063C53.916 48.8007 54.0658 48.8691 54.2383 48.9114C54.4141 48.9537 54.6061 48.9749 54.8145 48.9749C55.0684 48.9749 55.2767 48.939 55.4395 48.8674C55.6055 48.7958 55.7275 48.6965 55.8057 48.5696C55.887 48.4426 55.9277 48.2994 55.9277 48.1399ZM60.5713 50.0002H59.0234L59.0332 48.8577H60.5713C60.9554 48.8577 61.2793 48.7714 61.543 48.5989C61.8066 48.4231 62.0052 48.1676 62.1387 47.8323C62.2754 47.497 62.3438 47.0917 62.3438 46.6165V46.2698C62.3438 45.9052 62.3047 45.5846 62.2266 45.3079C62.1517 45.0312 62.0394 44.7984 61.8896 44.6096C61.7399 44.4208 61.556 44.2792 61.3379 44.1848C61.1198 44.0872 60.8691 44.0383 60.5859 44.0383H58.9941V42.8909H60.5859C61.0612 42.8909 61.4958 42.9722 61.8896 43.135C62.2868 43.2945 62.6302 43.524 62.9199 43.8235C63.2096 44.123 63.4326 44.481 63.5889 44.8977C63.7484 45.3111 63.8281 45.7717 63.8281 46.2795V46.6165C63.8281 47.121 63.7484 47.5816 63.5889 47.9983C63.4326 48.415 63.2096 48.773 62.9199 49.0725C62.6335 49.3687 62.29 49.5982 61.8896 49.761C61.4925 49.9205 61.0531 50.0002 60.5713 50.0002ZM59.8535 42.8909V50.0002H58.3887V42.8909H59.8535ZM67.7393 42.8909V50.0002H66.2793V42.8909H67.7393ZM69.9268 42.8909V44.0383H64.126V42.8909H69.9268ZM72.9639 47.217V47.1096C72.9639 46.4228 73.0355 45.7994 73.1787 45.2395C73.3252 44.6796 73.5173 44.1881 73.7549 43.7649C73.9958 43.3385 74.2578 42.9853 74.541 42.7053C74.8242 42.4254 75.1058 42.2236 75.3857 42.0999L75.6543 42.842C75.4688 42.9788 75.2865 43.1676 75.1074 43.4084C74.9284 43.6461 74.7656 43.939 74.6191 44.2874C74.4759 44.6324 74.3604 45.0393 74.2725 45.5081C74.1846 45.9736 74.1406 46.5042 74.1406 47.0999V47.2268C74.1406 47.8225 74.1846 48.3547 74.2725 48.8235C74.3604 49.289 74.4759 49.6959 74.6191 50.0442C74.7656 50.3958 74.9284 50.692 75.1074 50.9329C75.2865 51.1737 75.4688 51.3642 75.6543 51.5042L75.3857 52.2268C75.1058 52.1031 74.8242 51.9013 74.541 51.6213C74.2578 51.3446 73.9958 50.9931 73.7549 50.5667C73.5173 50.1435 73.3252 49.6519 73.1787 49.092C73.0355 48.5289 72.9639 47.9039 72.9639 47.217ZM79.2676 46.8801H77.4414L77.4316 45.8743H78.9648C79.235 45.8743 79.4564 45.8401 79.6289 45.7717C79.8014 45.7001 79.93 45.5976 80.0146 45.4641C80.1025 45.3274 80.1465 45.1614 80.1465 44.9661C80.1465 44.7447 80.1042 44.5657 80.0195 44.429C79.9382 44.2922 79.8096 44.193 79.6338 44.1311C79.4613 44.0693 79.2383 44.0383 78.9648 44.0383H77.9492V50.0002H76.4844V42.8909H78.9648C79.3783 42.8909 79.7477 42.9299 80.0732 43.0081C80.402 43.0862 80.6803 43.205 80.9082 43.3645C81.1361 43.524 81.3102 43.7258 81.4307 43.97C81.5511 44.2109 81.6113 44.4973 81.6113 44.8293C81.6113 45.1223 81.5446 45.3925 81.4111 45.6399C81.2809 45.8873 81.0742 46.0891 80.791 46.2454C80.5111 46.4016 80.1449 46.4879 79.6924 46.5042L79.2676 46.8801ZM79.2041 50.0002H77.041L77.6123 48.8577H79.2041C79.4613 48.8577 79.6712 48.817 79.834 48.7356C79.9967 48.651 80.1172 48.537 80.1953 48.3938C80.2734 48.2506 80.3125 48.0862 80.3125 47.9006C80.3125 47.6923 80.2767 47.5116 80.2051 47.3586C80.1367 47.2056 80.026 47.0885 79.873 47.0071C79.7201 46.9224 79.5182 46.8801 79.2676 46.8801H77.8564L77.8662 45.8743H79.624L79.9609 46.2698C80.3939 46.2633 80.7422 46.3398 81.0059 46.4993C81.2728 46.6555 81.4665 46.859 81.5869 47.1096C81.7106 47.3603 81.7725 47.6288 81.7725 47.9153C81.7725 48.371 81.6732 48.7551 81.4746 49.0676C81.276 49.3769 80.9847 49.6096 80.6006 49.7659C80.2197 49.9221 79.7542 50.0002 79.2041 50.0002ZM87.6416 48.8577V50.0002H83.8574V48.8577H87.6416ZM84.3359 42.8909V50.0002H82.8711V42.8909H84.3359ZM87.1484 45.7864V46.8997H83.8574V45.7864H87.1484ZM87.6367 42.8909V44.0383H83.8574V42.8909H87.6367ZM91.2646 47.4661H89.4531V46.3235H91.2646C91.5446 46.3235 91.7725 46.2779 91.9482 46.1868C92.124 46.0924 92.2526 45.9622 92.334 45.7961C92.4154 45.6301 92.4561 45.443 92.4561 45.2346C92.4561 45.023 92.4154 44.8261 92.334 44.6438C92.2526 44.4615 92.124 44.315 91.9482 44.2043C91.7725 44.0937 91.5446 44.0383 91.2646 44.0383H89.9609V50.0002H88.4961V42.8909H91.2646C91.8213 42.8909 92.2982 42.9918 92.6953 43.1936C93.0957 43.3922 93.4017 43.6672 93.6133 44.0188C93.8249 44.3704 93.9307 44.7724 93.9307 45.2249C93.9307 45.6838 93.8249 46.081 93.6133 46.4163C93.4017 46.7515 93.0957 47.0103 92.6953 47.1926C92.2982 47.3749 91.8213 47.4661 91.2646 47.4661ZM99.6582 48.9016V50.0002H94.7949V49.0627L97.0947 46.5969C97.3258 46.3398 97.5081 46.1135 97.6416 45.9182C97.7751 45.7196 97.8711 45.5422 97.9297 45.386C97.9915 45.2265 98.0225 45.0751 98.0225 44.9319C98.0225 44.717 97.9867 44.5331 97.915 44.3801C97.8434 44.2239 97.7376 44.1034 97.5977 44.0188C97.4609 43.9342 97.2917 43.8918 97.0898 43.8918C96.875 43.8918 96.6895 43.9439 96.5332 44.0481C96.3802 44.1523 96.263 44.2971 96.1816 44.4827C96.1035 44.6682 96.0645 44.8782 96.0645 45.1125H94.6533C94.6533 44.6894 94.7542 44.302 94.9561 43.9504C95.1579 43.5956 95.4427 43.314 95.8105 43.1057C96.1784 42.8941 96.6146 42.7883 97.1191 42.7883C97.6172 42.7883 98.0371 42.8697 98.3789 43.0325C98.724 43.192 98.9844 43.4231 99.1602 43.7258C99.3392 44.0253 99.4287 44.3834 99.4287 44.8C99.4287 45.0344 99.3913 45.2639 99.3164 45.4885C99.2415 45.7099 99.1341 45.9312 98.9941 46.1526C98.8574 46.3707 98.6914 46.592 98.4961 46.8167C98.3008 47.0413 98.0843 47.274 97.8467 47.5149L96.6113 48.9016H99.6582ZM105.322 45.8206V47.051C105.322 47.5849 105.265 48.0455 105.151 48.4329C105.037 48.817 104.873 49.1327 104.658 49.3801C104.447 49.6243 104.194 49.8049 103.901 49.9221C103.608 50.0393 103.283 50.0979 102.925 50.0979C102.638 50.0979 102.371 50.0621 102.124 49.9905C101.877 49.9156 101.654 49.8 101.455 49.6438C101.26 49.4875 101.09 49.2906 100.947 49.053C100.807 48.8121 100.7 48.5256 100.625 48.1936C100.55 47.8616 100.513 47.4807 100.513 47.051V45.8206C100.513 45.2867 100.57 44.8293 100.684 44.4485C100.801 44.0644 100.965 43.7502 101.177 43.5061C101.392 43.262 101.646 43.0829 101.938 42.969C102.231 42.8518 102.557 42.7932 102.915 42.7932C103.201 42.7932 103.467 42.8306 103.711 42.9055C103.958 42.9771 104.181 43.0894 104.38 43.2424C104.578 43.3954 104.748 43.5924 104.888 43.8333C105.028 44.0709 105.135 44.3557 105.21 44.6877C105.285 45.0165 105.322 45.3941 105.322 45.8206ZM103.911 47.2366V45.6301C103.911 45.373 103.896 45.1484 103.867 44.9563C103.841 44.7642 103.8 44.6015 103.745 44.468C103.69 44.3313 103.621 44.2206 103.54 44.136C103.459 44.0514 103.366 43.9895 103.262 43.9504C103.158 43.9114 103.042 43.8918 102.915 43.8918C102.756 43.8918 102.614 43.9228 102.49 43.9846C102.37 44.0465 102.267 44.1458 102.183 44.2825C102.098 44.4159 102.033 44.595 101.987 44.8196C101.945 45.0409 101.924 45.3111 101.924 45.6301V47.2366C101.924 47.4937 101.937 47.72 101.963 47.9153C101.992 48.1106 102.035 48.2782 102.09 48.4182C102.148 48.5549 102.217 48.6672 102.295 48.7551C102.376 48.8398 102.469 48.9016 102.573 48.9407C102.681 48.9797 102.798 48.9993 102.925 48.9993C103.081 48.9993 103.219 48.9683 103.34 48.9065C103.464 48.8414 103.568 48.7405 103.652 48.6038C103.74 48.4638 103.805 48.2815 103.848 48.0569C103.89 47.8323 103.911 47.5588 103.911 47.2366ZM108.755 47.1096V47.217C108.755 47.8811 108.68 48.4931 108.53 49.053C108.381 49.6096 108.182 50.1028 107.935 50.5325C107.69 50.9654 107.422 51.3251 107.129 51.6116C106.839 51.898 106.549 52.1031 106.26 52.2268L105.986 51.5042C106.172 51.3674 106.353 51.1786 106.528 50.9377C106.707 50.6969 106.87 50.4006 107.017 50.0491C107.163 49.7008 107.279 49.2922 107.363 48.8235C107.451 48.3547 107.495 47.8225 107.495 47.2268V47.0999C107.495 46.5042 107.451 45.9719 107.363 45.5032C107.275 45.0344 107.157 44.6259 107.007 44.2776C106.86 43.926 106.698 43.6314 106.519 43.3938C106.343 43.1529 106.165 42.9641 105.986 42.8274L106.26 42.0999C106.549 42.2236 106.839 42.4303 107.129 42.72C107.422 43.0064 107.69 43.3645 107.935 43.7942C108.182 44.2239 108.381 44.7187 108.53 45.2786C108.68 45.8352 108.755 46.4456 108.755 47.1096Z"
                                                        fill="#ADDBDB"
                                                    />
                                                    <path
                                                        d="M23 47C31.2843 47 38 40.2843 38 32C38 23.7157 31.2843 17 23 17C14.7157 17 8 23.7157 8 32C8 40.2843 14.7157 47 23 47Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M24.9461 34.0072V34.0048C24.8424 34.0121 24.3071 34.0434 23.1158 34.0434C22.1632 34.0434 21.4952 34.0169 21.2588 34.0048V34.0072C17.5957 33.8457 14.8633 33.209 14.8633 32.4445C14.8633 31.6825 17.5981 31.0434 21.2588 30.8818V33.373C21.4976 33.3899 22.1849 33.4309 23.1326 33.4309C24.2709 33.4309 24.84 33.3826 24.9461 33.373V30.8842C28.6021 31.0482 31.3272 31.6849 31.3272 32.4469C31.3272 33.209 28.5997 33.8457 24.9461 34.0096M24.9461 30.6262V28.3979H30.0466V25H16.1608V28.3979H21.2613V30.6262C17.1158 30.8167 14 31.6367 14 32.6206C14 33.6045 17.1182 34.4244 21.2613 34.6174V41.7605H24.9486V34.6174C29.0868 34.4268 32.1977 33.6069 32.1977 32.623C32.1977 31.6415 29.0868 30.8191 24.9486 30.6286"
                                                        fill="#009393"
                                                    />
                                                    <path
                                                        d="M32.5 46C35.5376 46 38 43.5376 38 40.5C38 37.4624 35.5376 35 32.5 35C29.4624 35 27 37.4624 27 40.5C27 43.5376 29.4624 46 32.5 46Z"
                                                        fill="#F3BA2F"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M33.9263 41.0854L34.756 41.9126L32.5007 44.1655L30.2477 41.9126L31.0774 41.0854L32.5007 42.5086L33.9263 41.0854ZM32.5007 39.6597L33.3422 40.5013L32.5007 41.3428L31.6615 40.5036V40.5013L31.8093 40.3534L31.8808 40.2819L32.5007 39.6597ZM29.6636 39.6716L30.4933 40.5013L29.6636 41.3285L28.834 40.4989L29.6636 39.6716ZM35.3377 39.6716L36.1673 40.5013L35.3377 41.3285L34.508 40.4989L35.3377 39.6716ZM32.5007 36.8346L34.7536 39.0875L33.9239 39.9172L32.5007 38.4915L31.0774 39.9148L30.2477 39.0875L32.5007 36.8346Z"
                                                        fill="#131415"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Bitcoin"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(126, 70, 0)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    viewBox="0 0 128 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 16C0 7.164 7.163 0 16 0h96c8.837 0 16 7.164 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16z"
                                                        fill="#7E4600"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M42.267 27.077c.948 0 1.767.17 2.455.504.691.337 1.263.791 1.72 1.362a5.736 5.736 0 011.005 2.013c.216.772.325 1.6.325 2.488a9.972 9.972 0 01-.754 3.862 10.023 10.023 0 01-2.058 3.17 9.677 9.677 0 01-3.078 2.129c-1.18.523-2.465.785-3.845.785-.178 0-.492-.005-.935-.015a13.359 13.359 0 01-1.52-.132 17.841 17.841 0 01-1.822-.356 9.123 9.123 0 01-1.821-.652l5.12-21.52 4.586-.712-1.832 7.638a7.055 7.055 0 011.181-.414 5.251 5.251 0 011.273-.15zm-3.848 12.674c.691 0 1.342-.17 1.954-.504a5.139 5.139 0 001.585-1.347 6.797 6.797 0 001.05-1.91 6.51 6.51 0 00.385-2.222c0-.947-.158-1.685-.473-2.22-.316-.532-.9-.8-1.748-.8-.277 0-.635.053-1.078.147-.447.103-.86.317-1.2.624l-1.952 8.11c.117.021.22.041.31.06.21.042.422.063.635.062h.532zm14.108 3.227h-4.38l3.698-15.57h4.411l-3.729 15.57zm2.131-17.469a2.718 2.718 0 01-1.657-.546c-.496-.364-.742-.922-.742-1.673 0-.415.084-.803.251-1.169a3.126 3.126 0 011.628-1.585 2.94 2.94 0 011.172-.236c.61 0 1.162.182 1.655.547.492.367.74.925.74 1.673 0 .416-.084.805-.251 1.17a3.082 3.082 0 01-1.627 1.584c-.367.16-.754.235-1.169.235zm5.437-1.98l4.587-.712-1.126 4.59h4.913l-.887 3.61H62.7l-1.302 5.447c-.12.454-.188.878-.207 1.272-.021.395.03.736.147 1.021.118.288.33.51.636.665.306.16.743.24 1.317.24.463.001.924-.044 1.378-.135a9.786 9.786 0 001.345-.37l.327 3.377c-.629.227-1.271.415-1.924.56-.692.16-1.51.237-2.457.237-1.36 0-2.416-.202-3.168-.605-.75-.405-1.28-.959-1.598-1.66-.314-.699-.453-1.504-.415-2.411.042-.909.178-1.865.415-2.872l2.902-12.255zm8.181 13.231c0-1.34.217-2.606.65-3.79a9.325 9.325 0 011.867-3.11 8.736 8.736 0 012.946-2.101c1.151-.512 2.44-.77 3.86-.77.89 0 1.683.084 2.381.253a9.642 9.642 0 011.911.665l-1.51 3.436a14.162 14.162 0 00-1.229-.429c-.424-.13-.94-.194-1.553-.194-1.462 0-2.617.504-3.478 1.51-.856 1.004-1.288 2.359-1.288 4.057 0 1.006.217 1.82.653 2.442.433.622 1.234.932 2.396.932a8.106 8.106 0 003.079-.62l.326 3.522a15.99 15.99 0 01-1.835.579c-.67.164-1.47.249-2.397.249-1.225 0-2.26-.18-3.107-.532-.848-.358-1.55-.833-2.1-1.436a5.412 5.412 0 01-1.2-2.118 8.693 8.693 0 01-.372-2.544v-.001zm19.458 6.63c-1.045 0-1.954-.158-2.723-.473-.769-.316-1.405-.76-1.908-1.333a5.756 5.756 0 01-1.14-2.027c-.257-.78-.382-1.643-.382-2.588 0-1.186.19-2.372.576-3.555.37-1.16.946-2.242 1.702-3.196a9.097 9.097 0 012.75-2.327c1.084-.6 2.329-.902 3.727-.902 1.026 0 1.93.16 2.712.476a5.067 5.067 0 011.923 1.331c.512.593.899 1.283 1.137 2.03.257.777.384 1.642.384 2.588 0 1.183-.189 2.368-.56 3.554a10.265 10.265 0 01-1.657 3.196 8.688 8.688 0 01-2.738 2.323c-1.094.602-2.363.904-3.803.904zm2.19-12.67a2.77 2.77 0 00-1.716.562 4.837 4.837 0 00-1.242 1.422 7.02 7.02 0 00-.757 1.88 8.107 8.107 0 00-.25 1.938c0 .989.16 1.758.473 2.312.318.55.888.827 1.717.827.62.01 1.225-.188 1.717-.563.491-.374.906-.848 1.242-1.42.335-.572.588-1.2.757-1.88.166-.68.25-1.329.25-1.939 0-.986-.158-1.758-.474-2.31-.317-.551-.89-.827-1.717-.827v-.002zm11.342 12.258h-4.385l3.699-15.57h4.413l-3.727 15.57zm2.127-17.468a2.71 2.71 0 01-1.655-.546c-.494-.364-.741-.921-.741-1.673 0-.415.084-.803.251-1.169a3.103 3.103 0 011.629-1.584 2.916 2.916 0 011.167-.237c.613 0 1.165.182 1.658.547.492.367.742.925.742 1.673 0 .416-.088.805-.254 1.17-.165.367-.388.681-.665.948a3.223 3.223 0 01-.961.636c-.366.16-.754.235-1.171.235zm4.757 2.606c.332-.098.703-.215 1.108-.343a16.322 16.322 0 013.049-.62c.62-.07 1.328-.105 2.114-.105 2.31 0 3.903.673 4.781 2.015.879 1.342 1.031 3.179.461 5.507l-2.015 8.406h-4.409l1.952-8.23c.12-.513.213-1.01.283-1.496.069-.482.065-.905-.017-1.272a1.52 1.52 0 00-.545-.89c-.289-.226-.726-.34-1.318-.34a8.894 8.894 0 00-1.745.18l-2.872 12.048h-4.411l3.584-14.86z"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        d="M20 44c6.627 0 12-5.372 12-12 0-6.627-5.373-12-12-12S8 25.373 8 32c0 6.628 5.373 12 12 12z"
                                                        fill="#F7931A"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M25.536 30.35c.234-1.571-.962-2.418-2.599-2.98l.532-2.131-1.296-.323-.517 2.074a54.32 54.32 0 00-1.039-.245l.521-2.087-1.296-.324-.53 2.13c-.876-.197-1.744-.427-2.614-.648l-.344 1.385s.96.22.941.234c.524.13.62.479.603.754l-1.454 5.834c-.064.16-.227.4-.593.309.013.018-.943-.236-.943-.236l-.643 1.484c.87.217 1.74.436 2.61.659l-.535 2.154 1.293.323.532-2.13c.353.095.697.184 1.033.267l-.53 2.121 1.297.323.535-2.149c2.21.418 3.873.249 4.571-1.75.564-1.61-.027-2.54-1.19-3.145.847-.195 1.484-.752 1.655-1.903zm-2.962 4.154c-.4 1.609-3.109.74-3.988.521l.712-2.853c.878.218 3.695.653 3.276 2.332zm.402-4.177c.369-1.483-1.696-1.798-2.707-2.05l-.645 2.588c.732.182 2.987.926 3.352-.538z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Ethereum"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(243, 246, 249)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#F3F6F9"/>
                                                    <path
                                                        d="M35.4082 52.1013C35.4082 52.2537 35.2771 52.3777 35.1206 52.3777H29.5789C29.7173 53.7103 30.7477 54.9259 32.1968 54.9259C33.1872 54.9259 33.9227 54.5573 34.4761 53.7882C34.5562 53.6819 34.6764 53.6146 34.8293 53.6784C34.913 53.7138 34.9713 53.7882 34.9858 53.8733C35.0004 53.9619 34.9749 54.0115 34.9494 54.0611C34.3924 55.0074 33.2818 55.4716 32.1932 55.4716C30.329 55.4716 29 53.8485 29 52.1119C29 50.3754 30.329 48.7522 32.1932 48.7522C34.0574 48.7487 35.4046 50.3683 35.4082 52.1013ZM34.8147 51.839C34.6946 50.5065 33.6459 49.2909 32.1968 49.2909C30.7477 49.2909 29.7173 50.5065 29.5789 51.839H34.8147ZM42.1332 48.8833C42.2934 48.8833 42.4099 49.018 42.4099 49.1527C42.4099 49.3086 42.2897 49.422 42.1332 49.422H40.6476V55.096C40.6476 55.2307 40.5275 55.3653 40.3709 55.3653C40.2107 55.3653 40.0942 55.2307 40.0942 55.096V49.422H38.6669C38.5067 49.422 38.3902 49.3051 38.3902 49.1527C38.3902 49.018 38.5104 48.8833 38.6669 48.8833H40.0942V46.8066C40.0942 46.6754 40.1852 46.5549 40.3163 46.5337C40.502 46.5053 40.6476 46.6294 40.6476 46.7995V48.8833H42.1332ZM51.1957 51.6264V55.0641C51.1957 55.22 51.0573 55.3334 50.919 55.3334C50.7588 55.3334 50.6423 55.2165 50.6423 55.0641V51.6264C50.6423 50.4675 49.9687 49.3086 48.6397 49.3086C46.9357 49.3086 46.2002 50.7581 46.2985 52.2431C46.2985 52.282 46.3167 52.4557 46.3167 52.4734V55.0535C46.3167 55.1846 46.2257 55.3051 46.0946 55.3263C45.9089 55.3547 45.7633 55.2307 45.7633 55.0605V43.7693C45.7633 43.6347 45.8834 43.5 46.04 43.5C46.2002 43.5 46.3167 43.6347 46.3167 43.7693V50.1592C46.7937 49.3299 47.6457 48.7699 48.6361 48.7699C50.2636 48.7699 51.1957 50.1592 51.1957 51.6264ZM61.1321 52.1013C61.1321 52.2537 61.001 52.3777 60.8444 52.3777L55.2991 52.3777C55.4375 53.7103 56.4679 54.9259 57.917 54.9259C58.9074 54.9259 59.6429 54.5573 60.1963 53.7882C60.2764 53.6819 60.3966 53.6146 60.5495 53.6784C60.6332 53.7138 60.6915 53.7882 60.7061 53.8733C60.7206 53.9619 60.6951 54.0115 60.6696 54.0611C60.1126 55.0074 59.0021 55.4716 57.9134 55.4716C56.0492 55.4716 54.7202 53.8485 54.7202 52.1119C54.7202 50.3754 56.0492 48.7522 57.9134 48.7522C59.7812 48.7487 61.1284 50.3683 61.1321 52.1013ZM60.5349 51.839C60.4148 50.5065 59.3662 49.2909 57.917 49.2909C56.4679 49.2909 55.4375 50.5065 55.2991 51.839L60.5349 51.839ZM67.9335 49.135C67.9335 49.3086 67.8352 49.4043 67.675 49.4256C66.0474 49.6559 65.3156 50.9495 65.3156 52.4557V55.0357C65.3156 55.1669 65.2246 55.2874 65.0935 55.3086C64.9078 55.337 64.7622 55.2129 64.7622 55.0428V49.1633C64.7622 49.0322 64.8532 48.9117 64.9843 48.8904C65.1699 48.8621 65.3156 48.9861 65.3156 49.1562V50.3541C65.7707 49.6028 66.6846 48.8869 67.6349 48.8869C67.7733 48.8833 67.9335 48.9826 67.9335 49.135ZM77.036 52.1013C77.036 52.2537 76.905 52.3777 76.7484 52.3777H71.2068C71.3451 53.7103 72.3755 54.9259 73.8247 54.9259C74.815 54.9259 75.5505 54.5573 76.1039 53.7882C76.1841 53.6819 76.3042 53.6146 76.4571 53.6784C76.5409 53.7138 76.5991 53.7882 76.6137 53.8733C76.6283 53.9619 76.6028 54.0115 76.5773 54.0611C76.0202 55.0074 74.9097 55.4716 73.821 55.4716C71.9568 55.4716 70.6278 53.8485 70.6278 52.1119C70.6278 50.3754 71.9568 48.7522 73.821 48.7522C75.6852 48.7487 77.0324 50.3683 77.036 52.1013ZM76.4426 51.839C76.3224 50.5065 75.2738 49.2909 73.8247 49.2909C72.3755 49.2909 71.3451 50.5065 71.2068 51.839H76.4426ZM85.9821 49.2023V55.096C85.9821 55.2519 85.8437 55.3653 85.7053 55.3653C85.5451 55.3653 85.4286 55.2484 85.4286 55.096V53.9761C84.9735 54.8656 84.1579 55.5 83.1275 55.5C81.4817 55.5 80.5678 54.1107 80.5678 52.6435V49.1881C80.5678 49.0535 80.688 48.9188 80.8446 48.9188C81.0048 48.9188 81.1213 49.0535 81.1213 49.1881V52.6435C81.1213 53.8024 81.7949 54.9613 83.1238 54.9613C84.9881 54.9613 85.425 53.2637 85.425 51.389V49.1881C85.425 49.0322 85.5852 48.8727 85.7818 48.9294C85.902 48.9684 85.9821 49.0818 85.9821 49.2023ZM100 51.6051V55.0605C100 55.2165 99.8616 55.3299 99.7233 55.3299C99.5631 55.3299 99.4466 55.2129 99.4466 55.0605V51.6051C99.4466 50.4462 98.773 49.3086 97.444 49.3086C95.7764 49.3086 95.1429 51.0452 95.1429 52.3954V55.0605C95.1429 55.2165 95.0045 55.3299 94.8662 55.3299C94.7059 55.3299 94.5894 55.2129 94.5894 55.0605V51.6051C94.5894 50.4462 93.9158 49.3086 92.5869 49.3086C90.9011 49.3086 90.2056 50.6022 90.2675 52.321C90.2675 52.36 90.2857 52.438 90.2675 52.4557V55.0535C90.2675 55.1846 90.1765 55.3051 90.0418 55.3263C89.8561 55.3547 89.7105 55.2307 89.7105 55.0605V49.1633C89.7105 49.0322 89.8015 48.9117 89.9326 48.8904C90.1183 48.8621 90.2639 48.9861 90.2639 49.1562V50.1415C90.7409 49.3122 91.5929 48.7699 92.5832 48.7699C93.7119 48.7699 94.5858 49.4646 94.9426 50.4888C95.3977 49.4858 96.2898 48.7699 97.4404 48.7699C99.0679 48.7699 100 50.1379 100 51.6051Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M63.9982 7L63.7798 7.70639V28.2042L63.9982 28.4116L73.996 22.7874L63.9982 7Z"
                                                        fill="#343434"
                                                    />
                                                    <path
                                                        d="M63.9978 7L54 22.7874L63.9978 28.4117V18.4627V7Z"
                                                        fill="#8C8C8C"
                                                    />
                                                    <path
                                                        d="M63.9961 30.2134L63.873 30.3562V37.6579L63.9961 38L73.9998 24.592L63.9961 30.2134Z"
                                                        fill="#3C3C3B"
                                                    />
                                                    <path
                                                        d="M63.9978 38.0001V30.2134L54 24.592L63.9978 38.0001Z"
                                                        fill="#8C8C8C"
                                                    />
                                                    <path
                                                        d="M63.9966 28.4114L73.9942 22.7873L63.9966 18.4625V28.4114Z"
                                                        fill="#141414"
                                                    />
                                                    <path
                                                        d="M54.001 22.7874L63.9986 28.4115V18.4626L54.001 22.7874Z"
                                                        fill="#393939"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Shiba Inu"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(240, 5, 0)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="black"/>
                                                    <path
                                                        d="M73.2826 15.5212C72.2416 16.5503 71.2878 17.6658 70.44 18.8552L70.1719 18.7689C68.6259 18.2697 67.0238 17.9616 65.4093 17.8568C64.923 17.8199 63.109 17.8199 62.5167 17.8568C60.7276 17.9739 59.3562 18.2389 57.7977 18.7751C57.7354 18.7997 57.6793 18.8182 57.6232 18.8367C56.7442 17.6535 55.7655 16.5442 54.687 15.5273C59.8611 12.9082 65.9142 12.5939 71.3314 14.6584C71.9112 14.8741 72.4785 15.1268 73.0333 15.3979L73.2826 15.5212Z"
                                                        fill="#F00500"
                                                    />
                                                    <path
                                                        d="M82.9324 38.8965C82.1469 41.1089 80.9687 43.1611 79.4414 44.9483C78.6123 45.9097 77.6959 46.791 76.711 47.5921C74.4044 49.4286 71.7114 50.7413 68.8376 51.4315C65.6583 52.1895 62.3419 52.1895 59.1626 51.4315C56.2826 50.7413 53.5958 49.4286 51.2893 47.5921C50.3043 46.791 49.3879 45.9097 48.5588 44.9483C44.164 39.8148 42.8299 32.7646 45.0679 26.4108C45.4918 25.2337 46.0217 24.0998 46.6575 23.0213C46.9505 22.5283 47.3121 21.9736 47.4866 21.7456C48.0851 24.2908 48.8207 26.5279 49.0949 27.3352C49.0762 27.3784 49.0513 27.4277 49.0264 27.4708C47.5739 30.3796 46.7884 33.1837 46.6014 36.1664C46.6014 36.2034 46.5952 36.2465 46.5952 36.2835C46.5453 37.1771 46.5702 37.6023 46.7198 38.1632C47.1874 39.9195 48.6274 41.8546 50.8841 43.7528C54.5808 46.8588 59.5928 49.102 63.3892 49.3608C67.3477 49.6258 73.1888 47.3395 77.0788 43.9993C77.6897 43.4631 78.2632 42.8961 78.7993 42.2922C79.1858 41.8485 79.7593 41.0843 79.7157 41.0843C79.7032 41.0843 79.7157 41.072 79.7406 41.0596C79.7593 41.0473 79.778 41.0288 79.7656 41.0165C79.7593 41.0103 79.7718 40.9918 79.7905 40.9857C79.8092 40.9795 79.8217 40.9672 79.8154 40.9549C79.8092 40.9425 79.8154 40.9302 79.8404 40.9241C79.8591 40.9179 79.8653 40.8994 79.8591 40.8871C79.8528 40.8748 79.8591 40.8624 79.8715 40.8624C79.884 40.8624 79.8965 40.8439 79.8965 40.8316C79.8965 40.8193 79.9089 40.8008 79.9214 40.8008C79.9339 40.8008 79.9463 40.7885 79.9463 40.7762C79.965 40.7269 79.9962 40.6775 80.0274 40.6344C80.1209 40.4927 80.4949 39.8333 80.5448 39.7223C80.9001 38.9273 81.1245 38.2186 81.2305 37.5099C81.2804 37.171 81.3116 36.5485 81.2866 36.4006C81.2804 36.376 81.2804 36.3328 81.2742 36.265C81.2617 36.1418 81.2555 35.9569 81.243 35.772C81.2305 35.4947 81.2056 35.1064 81.1869 34.9154C80.9188 32.1175 80.1957 29.8311 78.8243 27.4092C78.7681 27.3167 78.7183 27.2243 78.6871 27.1503C78.6746 27.1319 78.6684 27.1134 78.6622 27.101C78.8554 26.5279 79.6471 24.1306 80.2767 21.3882L80.2892 21.4005L80.3827 21.5238C80.5448 21.7395 80.9749 22.3804 81.1682 22.6885C82.0472 24.106 82.7329 25.6281 83.2191 27.2181C84.3475 31.0452 84.2539 35.1249 82.9324 38.8965Z"
                                                        fill="#F00500"
                                                    />
                                                    <path
                                                        d="M74.8407 31.532C74.822 31.6306 74.5291 31.9264 74.2361 32.1421C73.3758 32.7646 71.836 33.3439 70.2713 33.6212C69.3799 33.7814 68.4884 33.8061 68.2204 33.6767C68.0458 33.5904 68.0209 33.5226 68.0832 33.3007C68.2141 32.8385 68.6381 32.3332 69.2988 31.8587C69.6355 31.6183 71.0007 30.7987 71.6365 30.4536C72.6838 29.8866 73.5316 29.5476 74.1052 29.4675C74.2859 29.4429 74.5041 29.4367 74.5727 29.4675C74.6849 29.5107 74.8096 29.8373 74.8594 30.2317C74.8844 30.4412 74.8719 31.3656 74.8407 31.532Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M60.1539 33.5717C60.1165 33.6457 59.9295 33.7258 59.7176 33.7566C59.5056 33.7874 58.8573 33.769 58.4895 33.7258C57.1679 33.5533 55.7653 33.1527 54.7429 32.6597C54.1694 32.3823 53.758 32.105 53.4525 31.803L53.278 31.6243L53.2593 31.3901C53.2281 30.9834 53.2344 30.3425 53.2842 30.1144C53.3154 29.9234 53.384 29.7385 53.4775 29.5721C53.5273 29.5105 53.5273 29.5105 53.7518 29.5105C54.0261 29.5105 54.2567 29.5536 54.6307 29.6707C55.3975 29.9049 56.5383 30.4719 57.9285 31.2977C59.0755 31.9756 59.5056 32.3084 59.836 32.7644C60.0604 33.0479 60.21 33.4485 60.1539 33.5717Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M68.9813 42.1503C68.9813 42.1688 68.9065 42.4646 68.813 42.8159C68.7195 43.1672 68.6447 43.4507 68.6447 43.463C68.5761 43.4692 68.5138 43.4753 68.4452 43.4692H68.2457L67.9714 44.1101C67.8218 44.4614 67.6847 44.788 67.666 44.8373L67.6286 44.9236L67.4977 44.714L67.3668 44.5045V42.7974L67.3169 42.8097C67.2109 42.8344 66.4566 42.933 66.1262 42.9638C64.761 43.0994 63.3895 43.0686 62.0306 42.8775C61.8124 42.8467 61.6254 42.8221 61.6191 42.8282C61.6129 42.8344 61.6191 43.2288 61.6316 43.7157L61.6503 44.5908L61.5443 44.751C61.4882 44.8373 61.4321 44.9112 61.4321 44.9174C61.4134 44.9359 61.3511 44.8373 61.2077 44.5538C61.0519 44.258 60.9396 43.9437 60.8586 43.6171L60.815 43.4383L60.6217 43.4507L60.4285 43.4692L60.3786 43.2411C60.3537 43.1179 60.3225 42.9268 60.31 42.8221L60.2913 42.6249L60.1292 42.4831C60.0357 42.403 59.9422 42.3229 59.9235 42.3106C59.8924 42.2859 59.8799 42.2428 59.8799 42.2058V42.1318L60.6591 42.138L61.4383 42.1442L61.4633 42.2243L61.4882 42.3044L61.7563 42.3167C61.9059 42.3229 62.3797 42.3352 62.8036 42.3475L63.5828 42.366L63.7823 42.0579L63.988 41.7498H64.2498L64.2436 41.1088L64.2374 40.4679L63.8945 40.32C62.7911 39.8393 62.1428 39.2908 61.8997 38.6253C61.8498 38.4897 61.8498 38.4404 61.8373 37.8241C61.8311 37.214 61.8311 37.1585 61.8747 37.0229C61.962 36.7148 62.2051 36.4745 62.5168 36.3943C62.6228 36.3635 62.9033 36.3635 64.3745 36.3635L66.1075 36.3697L66.3008 36.4621C66.5314 36.5731 66.6374 36.6532 66.7683 36.8257C66.9179 37.0229 66.9616 37.177 66.9616 37.5529C66.9616 38.0891 66.9242 38.5513 66.8681 38.7362C66.787 38.9889 66.6623 39.2292 66.5065 39.4449C66.1948 39.8393 65.6275 40.2337 65.1101 40.4124L64.9605 40.4679L64.9667 41.115L64.973 41.7621L65.1101 41.7744L65.2472 41.7867L65.4343 42.0641L65.615 42.3414H66.4504C66.9117 42.3414 67.3169 42.3475 67.3543 42.3537C67.4166 42.366 67.4291 42.3599 67.4914 42.2551L67.5662 42.1442H68.2831C68.8192 42.1195 68.9813 42.1318 68.9813 42.1503Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M65.6892 43.9191C65.5708 43.9869 65.4898 44.0177 65.4711 44.0054C65.4524 43.9992 65.3651 43.9253 65.2716 43.8575L65.1033 43.7219L64.9287 43.9068C64.5484 44.3135 64.536 44.332 64.4238 44.3382C64.2492 44.3566 64.2118 44.3258 63.9999 44.0115C63.8877 43.8513 63.8004 43.7157 63.8004 43.7157C63.8004 43.7157 63.7193 43.7034 63.6258 43.6972L63.4513 43.6787L63.3702 43.8451L63.2892 44.0115L63.1458 43.9684C63.0336 43.9314 62.9214 43.8883 62.8154 43.839L62.6284 43.7465V43.3953L64.2866 43.4014L65.9448 43.4076L65.9511 43.574C65.9573 43.7712 65.9635 43.765 65.6892 43.9191Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M81.2741 36.4006C81.2679 36.3759 81.2679 36.3328 81.2616 36.265C79.7655 36.1047 75.4953 36.0061 71.5306 39.2416C71.5306 39.2416 70.2526 33.4486 64.2681 33.4486C58.2836 33.4486 56.0644 39.2416 56.0644 39.2416C52.7105 35.6734 48.2222 35.9322 46.6014 36.1664C46.6014 36.2034 46.5951 36.2465 46.5951 36.2835C46.5452 37.1771 46.5702 37.6023 46.7198 38.1631C47.1873 39.9195 48.6274 41.8546 50.884 43.7527C54.5807 46.8587 59.5927 49.102 63.3892 49.3608C67.3477 49.6258 73.1888 47.3394 77.0787 43.9992C77.6896 43.4631 78.2632 42.8961 78.7993 42.2921C79.1858 41.8484 79.7593 41.0842 79.7156 41.0842C79.7032 41.0842 79.7156 41.0719 79.7406 41.0596C79.7593 41.0473 79.778 41.0288 79.7655 41.0164C79.7593 41.0103 79.7717 40.9918 79.7904 40.9856C79.8092 40.9795 79.8216 40.9671 79.8154 40.9548C79.8092 40.9425 79.8154 40.9302 79.8403 40.924C79.859 40.9178 79.8653 40.8994 79.859 40.887C79.8528 40.8747 79.859 40.8624 79.8715 40.8624C79.884 40.8624 79.8964 40.8439 79.8964 40.8316C79.8964 40.8192 79.9089 40.8008 79.9214 40.8008C79.9338 40.8008 79.9463 40.7884 79.9463 40.7761C79.965 40.7268 79.9962 40.6775 80.0273 40.6344C80.1208 40.4926 80.4949 39.8332 80.5447 39.7223C80.9001 38.9273 81.1245 38.2186 81.2305 37.5099C81.2679 37.1709 81.299 36.5485 81.2741 36.4006ZM65.6894 43.9191C65.571 43.9869 65.49 44.0177 65.4713 44.0054C65.4526 43.9992 65.3653 43.9253 65.2718 43.8575L65.1035 43.7219L64.9289 43.9068C64.5486 44.3135 64.5362 44.332 64.424 44.3382C64.2494 44.3567 64.212 44.3258 64.0001 44.0115C63.8879 43.8513 63.8006 43.7157 63.8006 43.7157C63.8006 43.7157 63.7195 43.7034 63.626 43.6972L63.4515 43.6788L63.3704 43.8451L63.2894 44.0115L63.146 43.9684C63.0338 43.9314 62.9216 43.8883 62.8156 43.839L62.6286 43.7465V43.3953L64.2868 43.4014L65.945 43.4076L65.9513 43.574C65.9575 43.7712 65.9637 43.765 65.6894 43.9191ZM68.8064 42.8098C68.7129 43.1611 68.6381 43.4446 68.6381 43.4569C68.5695 43.4631 68.5072 43.4692 68.4386 43.4631H68.2391L67.971 44.1101C67.8214 44.4614 67.6843 44.788 67.6656 44.8373L67.6282 44.9236L67.4973 44.7141L67.3664 44.5046V42.7975L67.3165 42.8098C67.2105 42.8345 66.4562 42.9331 66.1258 42.9639C64.7606 43.0995 63.3891 43.0686 62.0302 42.8776C61.812 42.8468 61.625 42.8221 61.6187 42.8283C61.6125 42.8345 61.6187 43.2289 61.6312 43.7157L61.6499 44.5908L61.5439 44.7511C61.4878 44.8373 61.4317 44.9113 61.4317 44.9175C61.413 44.9359 61.3507 44.8373 61.2073 44.5539C61.0515 44.258 60.9392 43.9437 60.8582 43.6171L60.8146 43.4384L60.6213 43.4507L60.4281 43.4692L60.3782 43.2412C60.3533 43.1179 60.3221 42.9269 60.3096 42.8221L60.2909 42.6249L60.1288 42.4832C60.0353 42.4031 59.9418 42.3229 59.9231 42.3106C59.892 42.286 59.8795 42.2428 59.8795 42.2059V42.1319L60.6587 42.1381L61.4379 42.1442L61.4629 42.2243L61.4878 42.3045L61.7559 42.3168C61.9055 42.323 62.3793 42.3353 62.8032 42.3476L63.5824 42.3661L63.7819 42.058L63.9876 41.7498H64.2494L64.2432 41.1089L64.237 40.468L63.8941 40.3201C62.7907 39.8394 62.1424 39.2909 61.8993 38.6253C61.8494 38.4897 61.8494 38.4404 61.8369 37.8242C61.8307 37.214 61.8307 37.1586 61.8743 37.023C61.9616 36.7149 62.2047 36.4745 62.5164 36.3944C62.6224 36.3636 62.9029 36.3636 64.3741 36.3636L66.1071 36.3697L66.3004 36.4622C66.531 36.5731 66.637 36.6532 66.7679 36.8258C66.9175 37.023 66.9612 37.1771 66.9612 37.553C66.9612 38.0891 66.9238 38.5514 66.8677 38.7362C66.7866 38.9889 66.6619 39.2293 66.5061 39.445C66.1944 39.8394 65.6271 40.2338 65.1097 40.4125L64.9601 40.468L64.9663 41.1151L64.9726 41.7621L65.1097 41.7745L65.2468 41.7868L65.4339 42.0641L65.6146 42.3414H66.45C66.9113 42.3414 67.3165 42.3476 67.3539 42.3538C67.4162 42.3661 67.4287 42.3599 67.491 42.2552L67.5658 42.1442H68.2827C68.8375 42.1442 68.9996 42.1504 68.9996 42.1689C68.9809 42.1627 68.8999 42.4647 68.8064 42.8098Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M81.2247 35.772C81.2122 35.4947 81.1873 35.1064 81.1686 34.9154C80.9005 32.1175 80.1774 29.8311 78.806 27.4091C78.7499 27.3167 78.7 27.2243 78.6688 27.1503C78.6564 27.1318 78.6501 27.1133 78.6439 27.101C78.8371 26.5279 79.6288 24.1306 80.2585 21.3882C81.1125 17.6659 81.6548 13.315 79.9966 12.0085C79.9966 12.0085 77.1291 11.7989 73.289 15.5212C72.2479 16.5504 71.2942 17.6659 70.4464 18.8553L70.1783 18.769C68.6323 18.2698 67.0302 17.9617 65.4156 17.8569C64.9294 17.8199 63.1153 17.8199 62.5231 17.8569C60.734 17.974 59.3625 18.239 57.8041 18.7752C57.7417 18.7998 57.6856 18.8183 57.6295 18.8368C56.7506 17.6535 55.7718 16.5442 54.6934 15.5274C50.6975 11.7866 47.7239 12.0023 47.7239 12.0023C45.966 13.3519 46.5644 17.9 47.4746 21.7456C48.073 24.2908 48.8086 26.5279 49.0829 27.3352C49.0642 27.3783 49.0393 27.4276 49.0143 27.4708C47.5618 30.3796 46.7764 33.1836 46.5894 36.1664C48.2164 35.9322 52.6985 35.6672 56.0586 39.2416C56.0586 39.2416 58.2779 33.4486 64.2624 33.4486C70.2469 33.4486 71.5248 39.2416 71.5248 39.2416C75.4896 36.0062 79.7597 36.1109 81.2559 36.265C81.2496 36.1417 81.2372 35.9569 81.2247 35.772ZM50.2611 25.0118C50.2611 25.0118 47.9296 19.2497 48.5281 15.9588C48.6278 15.4041 48.8148 14.9173 49.1078 14.5475C49.1078 14.5475 51.751 14.8064 56.015 19.49C56.015 19.49 55.2046 19.8783 54.1199 20.7041C54.1199 20.7041 54.1136 20.7103 54.1074 20.7103C52.9292 21.6038 51.4206 23.0213 50.2611 25.0118ZM60.1542 33.5719C60.1168 33.6458 59.9298 33.726 59.7179 33.7568C59.5059 33.7876 58.8576 33.7691 58.4898 33.726C57.1682 33.5534 55.7656 33.1528 54.7433 32.6598C54.1697 32.3825 53.7583 32.1052 53.4528 31.8032L53.2783 31.6245L53.2596 31.3903C53.2284 30.9835 53.2347 30.3426 53.2845 30.1146C53.3157 29.9235 53.3843 29.7387 53.4778 29.5723C53.5276 29.5106 53.5276 29.5106 53.7521 29.5106C54.0264 29.5106 54.257 29.5538 54.631 29.6709C55.3978 29.9051 56.5386 30.472 57.9288 31.2978C59.0758 31.9757 59.5059 32.3085 59.8363 32.7646C60.0607 33.0481 60.2103 33.4486 60.1542 33.5719ZM74.8412 31.532C74.8225 31.6306 74.5295 31.9264 74.2365 32.1421C73.3763 32.7646 71.8365 33.3439 70.2718 33.6212C69.3804 33.7814 68.4889 33.8061 68.2209 33.6767C68.0463 33.5904 68.0214 33.5226 68.0837 33.3007C68.2146 32.8385 68.6385 32.3332 69.2993 31.8586C69.636 31.6183 71.0012 30.7987 71.637 30.4535C72.6843 29.8866 73.5321 29.5476 74.1056 29.4675C74.2864 29.4429 74.5046 29.4367 74.5732 29.4675C74.6854 29.5106 74.8101 29.8373 74.8599 30.2317C74.8849 30.4412 74.8724 31.3656 74.8412 31.532ZM73.8064 20.7041L73.7939 20.6979C72.7467 19.8721 71.9612 19.4839 71.9612 19.4839C76.0818 14.8002 78.6314 14.5414 78.6314 14.5414C78.9119 14.9173 79.0927 15.398 79.1925 15.9526C79.7722 19.2435 77.5218 25.0118 77.5218 25.0118C76.5805 23.3541 75.315 21.8873 73.8064 20.7041Z"
                                                        fill="#FFA409"
                                                    />
                                                    <path
                                                        d="M79.1985 15.9525C78.7122 15.8909 76.4119 15.8786 73.8062 20.704L73.7937 20.6978C72.7464 19.872 71.9609 19.4838 71.9609 19.4838C76.0815 14.8001 78.6312 14.5413 78.6312 14.5413C78.9179 14.9172 79.0987 15.3979 79.1985 15.9525Z"
                                                        fill="#FF9300"
                                                    />
                                                    <path
                                                        d="M77.5278 25.0116C76.5802 23.3477 75.321 21.8871 73.8062 20.7039C76.4119 15.8785 78.706 15.8908 79.1984 15.9524C79.7782 19.2495 77.5278 25.0116 77.5278 25.0116Z"
                                                        fill="#FF8300"
                                                    />
                                                    <path
                                                        d="M79.2922 15.9709C79.2611 15.9647 79.2299 15.9586 79.1987 15.9524L79.2922 15.9709Z"
                                                        fill="#FF8300"
                                                    />
                                                    <path
                                                        d="M56.0141 19.4838C56.0141 19.4838 55.2037 19.872 54.119 20.6978C54.119 20.6978 54.1128 20.704 54.1065 20.704C51.4073 15.8724 49.0322 15.8909 48.521 15.9525C48.6207 15.3979 48.8078 14.911 49.1007 14.5413C49.107 14.5413 51.7501 14.8001 56.0141 19.4838Z"
                                                        fill="#FF9300"
                                                    />
                                                    <path
                                                        d="M54.113 20.7039C52.9285 21.6037 51.4199 23.0149 50.2605 25.0116C50.2605 25.0116 47.929 19.2495 48.5274 15.9524C49.0324 15.8908 51.4137 15.8785 54.113 20.7039Z"
                                                        fill="#FF8300"
                                                    />
                                                    <path
                                                        d="M48.5275 15.9524C48.4963 15.9586 48.4589 15.9647 48.4277 15.9709L48.5275 15.9524Z"
                                                        fill="#FF8300"
                                                    />
                                                    <path
                                                        d="M71.2192 28.2103C71.2192 28.2103 69.2244 28.3335 69.4737 26.7928C69.7231 25.2521 71.2815 25.0673 71.7179 25.1289C72.1543 25.1905 73.8998 25.8068 73.5881 27.101C73.2764 28.3951 72.84 28.1486 72.5907 28.2103C72.3413 28.2719 71.2192 28.2103 71.2192 28.2103Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M56.5068 28.2103C56.5068 28.2103 54.512 28.3335 54.7613 26.7928C55.0107 25.2521 56.5691 25.0673 57.0055 25.1289C57.4419 25.1905 59.1874 25.8068 58.8757 27.101C58.564 28.3951 58.1276 28.1486 57.8782 28.2103C57.6289 28.2719 56.5068 28.2103 56.5068 28.2103Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Dogecoin (BSC BEP-20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(224, 205, 129)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#E0CD81"/>
                                                    <g clipPath="url(#clip0_5050_73515)">
                                                        <path
                                                            d="M64 56C77.2548 56 88 45.2548 88 32C88 18.7452 77.2548 8 64 8C50.7452 8 40 18.7452 40 32C40 45.2548 50.7452 56 64 56Z"
                                                            fill="#988430"
                                                        />
                                                        <path
                                                            d="M63.9998 55.2313C76.83 55.2313 87.231 44.8303 87.231 32C87.231 19.1698 76.83 8.7688 63.9998 8.7688C51.1695 8.7688 40.7686 19.1698 40.7686 32C40.7686 44.8303 51.1695 55.2313 63.9998 55.2313Z"
                                                            fill="#7A6A2A"
                                                        />
                                                        <path
                                                            d="M64.0001 54.7418C76.56 54.7418 86.7418 44.56 86.7418 32.0001C86.7418 19.4401 76.56 9.2583 64.0001 9.2583C51.4401 9.2583 41.2583 19.4401 41.2583 32.0001C41.2583 44.56 51.4401 54.7418 64.0001 54.7418Z"
                                                            fill="#BA9F33"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M50.4932 29.4369C50.3572 29.3128 50.2136 29.1884 50.0815 29.0642C49.9494 28.94 49.8137 28.8156 49.6778 28.6915L49.2738 28.3075C49.2078 28.2414 49.1379 28.1833 49.0719 28.117C49.0058 28.0589 48.9282 27.9928 48.8622 27.9345C48.3261 27.4258 47.787 26.9171 47.2584 26.4082C47.8059 26.9092 48.342 27.4066 48.8896 27.915L49.0798 28.1055C49.1458 28.1713 49.2157 28.2296 49.2818 28.2957L49.6855 28.6684C49.8214 28.7926 49.9535 28.917 50.0895 29.0524C50.2254 29.1879 50.3575 29.3125 50.4934 29.4364L50.4932 29.4369ZM43.3787 29.3601C43.3787 29.3601 45.3281 29.5619 46.2797 29.6978C47.1611 29.8222 49.9184 30.2454 49.9184 30.2454L43.3787 29.3601ZM43.3787 29.3601C43.9263 29.4067 44.4738 29.4648 45.0214 29.5232C45.301 29.5503 45.569 29.5813 45.837 29.6085L46.2484 29.6553C46.3844 29.6745 46.5165 29.694 46.6524 29.7134L48.2836 29.9735L49.099 30.1095C49.367 30.156 49.6351 30.2067 49.9146 30.2533C49.6466 30.2262 49.367 30.1873 49.099 30.1484L48.2836 30.0319L46.6524 29.7912C46.5165 29.7718 46.3844 29.7444 46.2484 29.7252L45.8368 29.6778C45.5688 29.6507 45.2892 29.6118 45.0212 29.5806C44.4736 29.5148 43.926 29.4446 43.3784 29.3594L43.3787 29.3601ZM49.7244 30.7533C49.7244 30.7533 47.6429 31.2817 46.9399 31.4837C46.2487 31.6739 44.1554 32.3108 44.1554 32.3108L49.7241 30.7535L49.7244 30.7533Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M49.7241 30.7533C49.262 30.8892 48.8025 31.0213 48.3337 31.1457L46.9434 31.5185C46.4813 31.6544 46.0218 31.7865 45.561 31.9224L44.8698 32.1127C44.6407 32.1787 44.4077 32.2368 44.1709 32.3031C44.3998 32.2263 44.633 32.1477 44.8621 32.0817L45.5533 31.8605C46.0154 31.7166 46.4749 31.5807 46.9357 31.4371C47.4055 31.3206 47.8678 31.1962 48.3376 31.0835C48.784 30.9709 49.254 30.8585 49.7241 30.7536V30.7533ZM44.4466 33.5923C44.6755 33.5068 47.3164 32.276 47.93 31.9885C48.2372 31.8446 49.1301 31.5277 49.1301 31.5277L44.4466 33.5923Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M44.4465 33.5923C44.6483 33.5155 44.8387 33.4216 45.0328 33.3322L45.6075 33.0642L46.761 32.5089C47.145 32.3264 47.5183 32.1249 47.9143 31.9534C48.1163 31.8681 48.3183 31.7983 48.52 31.7322L48.8272 31.6352C48.9319 31.6081 49.0292 31.5768 49.1344 31.5497C48.7504 31.7322 48.3462 31.8876 47.9617 32.066C47.5777 32.2565 47.185 32.4119 46.7887 32.5826L45.616 33.099C45.2222 33.2585 44.8382 33.4292 44.4463 33.5923H44.4465ZM44.7025 34.6675C44.7025 34.6675 47.0946 33.2657 47.9179 32.8151C48.349 32.5745 49.7432 31.883 49.7432 31.883L44.7025 34.6675Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M44.7031 34.668C45.1068 34.4195 45.5185 34.1671 45.9301 33.9108L46.5445 33.5378C46.7542 33.4136 46.9562 33.2972 47.1699 33.173C47.3796 33.0486 47.5816 32.9244 47.7951 32.8079C47.8967 32.7452 48.0032 32.6907 48.1136 32.6449L48.4397 32.4818C48.8708 32.2721 49.3019 32.0584 49.7563 31.8759C49.3447 32.1362 48.9212 32.3576 48.4981 32.5865C48.2884 32.703 48.0746 32.8079 47.865 32.9244C47.6553 33.0409 47.4533 33.1653 47.2396 33.278C47.0299 33.4021 46.8279 33.5186 46.6144 33.6312L45.9813 33.9768L44.7036 34.668H44.7031ZM49.7243 32.1902C49.7243 32.1902 48.2369 33.332 47.7554 33.697C47.2739 34.0621 45.8564 35.0874 45.8564 35.0874L49.7243 32.1902Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M58.2601 41.398L57.499 39.9573L57.9416 38.1553L61.0989 36.936L59.7552 34.1788L60.4192 31.3943L61.6659 28.9009L65.5185 28.2952L68.3493 25.5962L74.4621 26.0583L75.662 32.5942L73.3513 40.8233L72.035 45.0837L66.6989 45.2857L64.2213 43.5692L61.3203 42.3573L58.2601 41.398Z"
                                                            fill="#E2CC85"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M67.6195 41.3515C67.6195 41.3515 66.8815 41.6894 65.6227 41.6116C65.2584 41.1224 62.7071 40.8932 62.7071 40.8932C62.7071 40.8932 62.3887 40.7962 61.8255 41.0292C61.2587 41.2596 60.7226 41.2312 60.2216 41.3553C59.7206 41.4795 59.2232 40.8272 58.8392 40.6912C58.4552 40.5476 57.946 40.202 57.946 40.202L56.8708 40.0971L54.7117 39.1844L51.2816 35.7671L50.3495 37.2263L50.062 39.0321L51.0991 41.172L53.8913 43.7156L59.3359 45.098L62.563 44.1472L66.6058 42.4384L67.6195 41.3512V41.3515Z"
                                                            fill="#F1D789"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M48.2758 29.2738L48.967 27.1808L49.7906 25.8291L52.4427 25.6077L51.6466 27.9301L49.4294 31.8758L50.3497 35.3981L48.7187 36.2135L48.2175 35.4447L47.8138 33.6817L47.7866 31.701L48.2758 29.2738Z"
                                                            fill="#F4ECB4"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.2503 41.2079L50.7416 40.4972C50.7416 40.4972 50.6056 40.1593 50.6835 39.8641C50.7603 39.5651 50.7493 39.5457 50.7106 39.433C50.672 39.3204 50.3456 38.932 50.365 38.5979C50.3842 38.26 50.3379 38.1474 50.5862 37.8796C50.8463 37.6195 50.7687 37.169 50.7687 37.169L51.1066 37.3786L51.1834 37.2621C51.1834 37.2621 51.3076 37.3592 51.3076 37.5107C51.3347 37.301 51.2221 36.33 51.4784 36.1089C51.7346 35.8877 52.189 37.1457 52.189 37.1457L51.9095 35.3204L51.1909 33.4488L49.9132 31.74L49.8364 29.8563V29.6932C49.8364 29.6932 49.2499 30.5944 49.0868 31.306C48.9703 31.7953 49.2499 32.3894 49.1918 33.0924C49.1449 33.7915 49.0868 33.737 49.2576 34.014C49.4283 34.291 49.844 34.8606 49.681 35.2722C49.5374 35.6258 49.0479 35.3772 49.0479 35.3772C49.0479 35.3772 48.9509 35.6644 48.8188 35.7694C48.7722 35.5986 48.7217 35.4898 48.6286 35.3854C48.6206 35.4514 48.6014 35.5408 48.6014 35.5408C48.6014 35.5408 48.5159 35.2728 48.4304 34.9348C48.3142 34.4845 48.1898 33.8904 48.0771 33.5719C48.0305 33.7544 47.9141 34.3097 47.9141 34.3097L47.9801 35.1642L48.2986 36.337L48.6058 37.105L48.9048 38.0447L49.1646 38.676L49.3743 39.1576L49.5568 40.2412L50.4382 41.173L50.9082 41.383L51.2497 41.2081L51.2503 41.2079Z"
                                                            fill="#F3E19D"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M48.738 27.5651C48.738 27.5651 48.1049 28.6403 47.9227 29.7242C47.7404 30.8081 47.5771 31.9534 47.6923 33.429C47.8087 34.9166 48.0302 35.829 48.2089 36.4816C48.5161 37.5652 49.3117 39.072 49.3117 39.072L49.3388 39.0136C49.2051 38.7601 49.0984 38.4933 49.0204 38.2175C48.9154 37.8058 48.8765 37.3166 48.7795 37.0952C48.694 36.874 48.5504 36.6835 48.4805 36.4117C48.4144 36.1516 48.4037 35.7399 48.2009 35.4332C48.1154 35.3088 48.0105 34.9827 47.9795 34.6565C47.9406 34.1671 47.9989 33.6195 47.9524 33.1692C47.8668 32.4196 47.8087 31.9109 47.8863 31.5185C47.9639 31.126 48.3681 30.0119 48.6167 29.1264C48.7797 28.5594 48.6825 28.0817 48.9815 27.5884C49.2805 27.0991 49.4633 26.668 49.5291 26.369C49.6059 26.0972 48.737 27.5651 48.737 27.5651H48.738Z"
                                                            fill="#F2E8B0"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.7399 27.1339C51.7399 27.1339 51.4138 27.2312 51.2584 27.4019C51.103 27.565 51.037 27.701 50.8273 27.9767C50.6176 28.2524 50.6058 28.4777 50.4348 28.8233C50.2641 29.1612 49.8873 29.6698 49.8407 29.8524C49.7941 30.0349 49.7165 30.8892 49.6195 31.2931C49.534 31.6971 49.7165 32.1943 49.7165 32.1943L49.9377 32.1474C49.9377 32.1474 49.9377 32.4349 50.1591 32.6292C50.3803 32.8194 50.4192 31.9843 50.4192 31.9843L51.2464 29.1922L52.4928 28.3456L52.6288 27.662L51.7394 27.1339H51.7399Z"
                                                            fill="#F5EEC0"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M52.3458 28.4001C52.3458 28.4001 51.7593 28.4388 51.4721 28.6487C51.3556 28.734 51.309 28.8039 51.1848 28.9088C50.9557 29.099 50.7225 29.2739 50.6101 29.5232C50.4857 29.7715 50.3498 30.1484 50.2566 30.859C50.2177 31.158 50.2177 31.4337 50.1905 31.6746C50.1516 32.0008 50.0935 32.2609 50.1245 32.4426C50.1634 32.8154 50.5479 33.0097 50.5853 33.4328L51.3814 33.0291L52.131 30.0736L53.7233 29.0752L52.8222 28.0656L52.3448 28.3984L52.3458 28.4001Z"
                                                            fill="#E6DB9D"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M48.1453 48.3018C48.1486 48.2726 48.1519 48.2434 48.1553 48.2135C48.2715 47.2151 48.2912 46.4583 48.3764 45.9845C48.5006 45.3127 48.5861 45.0629 48.5667 44.8115C48.5395 44.4078 48.5085 44.1126 48.5475 43.8018C48.6056 43.3902 49.0095 42.9009 48.998 42.563C48.9901 42.295 48.8541 42.1204 48.7377 41.9573C48.6212 41.7943 48.528 41.6583 48.528 41.6583C48.528 41.6583 49.3242 41.1107 49.3165 38.9048C49.3327 38.9094 49.3484 38.9159 49.3631 38.9242L49.7553 40.0386L50.0233 40.3648L51.0524 42.2832L52.3767 43.5689L54.3338 44.8852L55.5611 46.2208L55.6852 49.782L54.0814 51.8635L53.8187 52.3392C51.732 51.2916 49.8185 49.9298 48.145 48.3015L48.1453 48.3018Z"
                                                            fill="#E5CB7A"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.0449 51.7087C53.0449 51.7087 53.0721 51.2661 53.4371 50.9786C53.4955 51.0756 53.5341 51.1691 53.5226 51.2387C53.5887 51.1225 54.0507 50.3767 55.0955 50.1824C56.1402 49.9922 56.3926 49.2311 56.3926 49.2311L58.6099 47.2157L61.1458 44.8817L64.2293 43.7981L65.6703 43.4445C65.6703 43.4445 65.6975 43.5495 65.6432 43.7824C65.911 43.7632 66.5051 43.6273 67.1226 43.4097C67.3712 43.3127 67.6044 43.2738 67.7286 43.402C67.9111 43.5728 67.9382 43.9767 67.9498 44.2174C68.2488 44.1513 68.5944 43.8641 68.8714 43.8912C69.3142 43.9378 69.7064 44.4583 70.157 44.4583C70.7512 44.4583 71.0189 44.0932 71.4347 43.8057C71.6833 43.635 72.0404 43.4217 72.2424 43.2776C72.7239 42.9241 77.8191 41.3668 77.8191 41.3668L79.6054 41.4833L79.8929 43.4018L79.7393 48.4168C79.7204 48.435 79.7014 48.4539 79.6822 48.4721L71.5599 52.7143L60.301 54.4402C57.779 54.0282 55.3452 53.191 53.1033 51.9645L53.0457 51.7085L53.0449 51.7087Z"
                                                            fill="#D8C173"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M48.8281 48.9398C48.9881 48.6052 49.132 48.3254 49.1573 48.2253C49.1773 48.4271 49.2139 48.8697 49.2876 49.3402C49.1328 49.2086 48.9797 49.0751 48.8281 48.9396V48.9398Z"
                                                            fill="#F1D789"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M57.0526 53.6593L58.5087 53.2543L58.6329 53.2933C58.6329 53.2933 58.6989 53.3322 58.6989 53.464C58.8814 53.3593 59.0368 53.3785 59.1495 53.3089C59.2076 53.433 59.2657 53.8447 59.5222 53.8951C59.79 53.9535 60.0775 53.7786 60.3688 53.5574C60.656 53.3283 60.9832 53.0408 61.2308 52.9244C61.3216 53.0914 61.402 53.2638 61.4716 53.4407C61.7978 53.1806 62.3648 52.1244 63.1725 52.1436C63.406 51.5919 63.796 51.1207 64.2943 50.7883C65.0439 50.2796 65.5136 50.2407 66.1001 50.2873C66.3331 49.9847 66.6201 49.728 66.9467 49.5301C67.0437 49.569 67.3118 49.732 67.6459 49.5766C67.9838 49.4215 68.3642 48.8194 68.8652 48.7418C69.1352 48.7047 69.4097 48.7623 69.6419 48.9049C69.6419 48.9049 71.1011 47.4562 72.1079 46.9747C72.069 46.8582 71.9915 46.4194 73.1719 45.4484C73.2379 45.5068 73.1913 45.6698 73.2379 45.6788C73.2571 45.6788 73.5451 45.5546 73.9097 45.2748C74.3602 44.9372 74.8999 44.5836 75.226 44.4866C75.8404 44.3041 76.4922 44.6768 76.4922 44.6768C76.5476 44.6379 76.6094 44.609 76.6747 44.5913C76.8299 44.5642 76.9425 44.5447 77.028 44.5145C77.0203 44.7165 77.133 45.0621 77.028 45.3611C77.1496 45.4295 77.2784 45.4842 77.412 45.5242C77.3462 45.6678 77.2023 46.0328 76.9617 46.2077C77.1634 46.3047 77.1906 46.4174 77.478 46.5149C77.3616 46.678 77.1708 46.9578 77.0859 47.1293C77.0004 47.3118 76.6934 48.0691 76.5575 48.3563C76.4139 48.6438 76.2198 49.1719 76.1264 49.2779C76.0329 49.3839 75.6953 49.8332 75.4352 50.0543C75.6656 49.9688 76.6082 49.6816 77.008 49.5728C76.889 49.7474 76.2856 50.6426 75.7055 51.5036C72.928 53.1683 69.8276 54.222 66.611 54.5944C63.3943 54.9668 60.1351 54.6493 57.0508 53.6632L57.0526 53.6593Z"
                                                            fill="#E0CD81"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M52.4417 28.2952C52.4417 28.2952 52.1041 28.2952 52.038 28.3418C51.972 28.3884 52.3759 28.4856 52.5001 28.5322C52.6242 28.5788 52.8923 28.7923 52.9622 28.9633C53.0282 29.1264 55.3893 30.0777 55.3893 30.0777L57.0592 29.9922L57.6349 29.1968L56.5398 28.2376L57.3078 25.9735L56.2904 26.1366L53.8438 27.5958L52.6166 28.0658L52.4417 28.2952Z"
                                                            fill="#DFC57C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.1086 29.0447C56.1328 29.0838 56.1668 29.1159 56.2072 29.1377C56.2477 29.1595 56.2931 29.1702 56.339 29.1689C56.6846 29.1689 57.0028 29.2544 57.1349 29.429C57.3564 29.7088 57.97 30.602 57.97 30.602L59.4379 31.1301L59.5326 29.4016L57.9288 28.2872L56.1035 28.959V29.0445H56.1076L56.1086 29.0447Z"
                                                            fill="#E5CC7C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.8207 29.6855C55.8207 29.6855 56.0885 29.7049 56.4264 29.5805C56.7643 29.4561 57.3196 29.1883 57.5605 29.2933C57.8982 29.4369 57.8283 29.8875 58.1936 30.2917C58.4148 30.5403 58.8187 30.5326 59.0479 30.8006C59.277 31.0686 60.0652 30.9442 60.0652 30.9442L60.3642 32.557L59.1643 34.0951L58.7719 36.0056H57.1494L55.6671 35.4176L54.937 33.6512L55.3021 31.8648L55.8207 29.6855Z"
                                                            fill="#D2C281"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M58.9595 29.7631C58.9997 29.7755 59.0415 29.782 59.0836 29.7825C59.0371 29.8215 58.9398 29.9067 58.9787 30.1281C59.0176 30.3496 59.1418 30.6291 59.0371 30.7999C59.1206 30.8913 59.183 31 59.2196 31.1184C59.2856 31.3088 59.3051 31.4834 59.7359 31.5108C59.6738 31.5491 59.6164 31.5947 59.5652 31.6467C59.5652 31.6467 59.8642 31.9068 60.0157 32.1475C60.1709 32.1408 60.5825 32.0128 60.5825 32.0128L60.668 32.0712L60.8506 31.9944C60.8506 31.9944 60.6798 31.9283 60.804 31.5129C60.9204 31.1478 61.0254 31.1673 61.0344 31.1401C61.0433 31.113 61.1199 30.7285 61.1199 30.5731C61.178 30.3713 61.2246 29.7577 61.2246 29.7577L61.1004 28.4025L60.4015 27.979L59.8332 27.4304L59.2972 28.4401L58.9441 28.7921L58.917 29.6658L58.9595 29.7631Z"
                                                            fill="#E2C270"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M60.6406 28.6292C60.6406 28.6292 60.7648 28.9825 60.8116 29.2544C60.8281 29.2015 60.8373 29.1466 60.8388 29.0913C60.8388 29.0913 60.9358 29.6273 60.955 29.8488C60.9939 29.8408 61.0318 29.8293 61.0405 29.868C61.0492 29.9066 61.1378 30.338 61.1173 30.5786C61.279 30.3118 61.5028 30.0881 61.7696 29.9264C61.925 29.8291 62.1075 29.7244 62.298 29.7164C62.597 29.7088 62.8143 29.9069 63.1717 29.9069C64.0336 29.9069 64.8144 29.2738 65.3892 29.0798C65.8123 28.9359 66.1774 28.8312 66.4336 28.598C66.5581 28.4933 66.7795 28.2603 66.9812 27.9144C67.2493 27.4536 67.5288 27.0525 67.8086 27.0021C67.682 27.0253 67.5532 27.0344 67.4246 27.0292C67.4246 27.0292 67.5101 26.9437 67.655 26.8272C67.7999 26.7107 67.9735 26.5671 68.2218 26.5671C68.6647 26.5671 68.8859 26.6329 69.1344 26.6329C69.383 26.6252 69.5266 26.5671 69.5266 26.5671C69.5266 26.5671 69.787 26.7496 70.3732 26.7496C70.9597 26.7573 71.3519 26.8078 71.6589 26.8352C71.9658 26.8625 72.9947 26.7496 73.2898 26.7584C73.4823 26.7658 73.6712 26.812 73.8454 26.8943L72.8938 24.1295L69.4757 21.142L67.4408 22.5827L64.3104 25.7128L61.2814 26.8352L60.6483 27.5458V28.6292H60.6406Z"
                                                            fill="#CCB360"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M67.437 27.0446C67.437 27.0446 67.5225 26.9594 67.6659 26.8429C67.8092 26.7264 67.9846 26.5825 68.2329 26.5825C68.6755 26.5825 68.897 26.6486 69.1456 26.6486C69.3941 26.6409 69.5378 26.5825 69.5378 26.5825C69.5378 26.5825 69.7984 26.7648 70.3843 26.7648C70.9708 26.7725 71.363 26.8229 71.67 26.8501C71.9769 26.8772 73.0058 26.7648 73.301 26.7733C73.4933 26.7805 73.6822 26.8267 73.8562 26.9092L73.4251 25.6625L72.9244 24.7112L71.4951 23.146C71.4951 23.146 69.7799 22.1363 69.7669 22.1286C69.7592 22.121 69.1727 21.9656 69.1727 21.9656L67.6193 22.9054L66.2098 26.5521L66.1826 27.3201L67.095 27.7512C67.3241 27.3672 67.5768 27.06 67.8136 27.0211C67.5998 27.0444 67.4368 27.0444 67.4368 27.0444L67.437 27.0446Z"
                                                            fill="#D5B457"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M67.4174 27.3049C67.2815 27.3126 67.1691 27.2855 67.1379 27.1884C67.0214 26.8623 66.9282 26.8157 66.8307 26.8157C66.7331 26.8157 66.6016 27.0254 66.5235 27.0446C66.4454 27.0638 66.3527 26.8039 66.3527 26.8039L66.2672 26.765C66.2672 26.765 65.7662 27.0912 65.413 27.4757C65.0597 27.8602 64.4809 28.5127 64.2208 28.629C63.9607 28.7452 63.0672 28.7843 62.7616 28.8504C62.4559 28.9164 62.117 29.1379 62.0704 29.1883C62.0238 29.2387 62.2066 29.293 62.2337 29.3434C62.2608 29.39 61.9344 29.3706 61.9073 29.4202C61.8881 29.4592 61.9841 29.6803 62.0317 29.793C62.115 29.7516 62.2065 29.729 62.2995 29.7269C62.5985 29.7193 62.8161 29.9174 63.1732 29.9174C64.0354 29.9174 64.816 29.2843 65.3907 29.09C65.8141 28.9464 66.1792 28.8414 66.4354 28.6085C66.5596 28.5038 66.781 28.2706 66.983 27.925C67.1305 27.6882 67.2743 27.4667 67.4182 27.3036L67.4174 27.3049Z"
                                                            fill="#D2B257"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.0526 46.5244C55.0526 46.5244 54.9758 46.2369 54.2641 45.4953C54.0621 45.2856 53.9379 45.1113 53.802 44.9866C53.4641 44.6679 53.2659 44.5826 53.0253 44.4001C52.4972 44.0079 51.9225 44.0079 51.4798 43.5264C51.0372 43.0448 50.5214 42.1248 50.163 41.1845C49.8097 40.2447 49.7124 39.9457 49.7124 39.9185C49.7124 39.8914 49.8097 39.7089 49.9338 39.736C50.058 39.7632 50.058 40.0038 50.0892 40.0622C50.1511 40.1574 50.2213 40.247 50.2989 40.3299C50.4814 40.5399 50.7415 40.7907 50.8736 41.165C50.8465 40.8465 50.7377 40.4933 50.7377 40.4933C50.7377 40.4933 51.4212 40.9244 52.0036 41.3747C52.5901 41.8252 52.8307 41.9806 53.002 42.2679C53.1733 42.5551 53.5767 43.3126 53.77 43.534C53.9633 43.7555 56.6116 44.5903 56.6116 44.5903L57.8714 45.5296L58.4968 46.9004L58.0073 47.6684L57.0675 47.8704L55.5413 47.1869L55.0526 46.5241V46.5244Z"
                                                            fill="#D2B159"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.6621 41.8019C51.6621 41.8019 51.9806 42.3106 52.7573 42.7921C53.4564 43.2156 54.5631 43.6001 55.5497 43.8292C56.1165 43.9651 56.6836 44.0698 57.1922 44.0778C58.5631 44.097 59.5067 43.705 60.6759 43.5768C61.309 43.5107 62.0857 43.4603 62.8933 43.2696C63.9301 43.021 64.5438 42.7412 65.3788 42.348C65.9845 42.0684 66.5401 41.8588 66.9904 41.5907C67.6235 41.218 68.0855 40.8025 68.6216 40.6783C68.5556 40.8609 68.4857 41.187 67.9575 41.5249C68.2371 41.517 68.6216 41.4978 68.6216 41.4978C68.6216 41.4978 68.2489 41.719 67.5925 42.2161C67.1885 42.5233 66.6527 43.0433 66.1051 43.3889C65.7516 43.6103 65.3671 43.7729 65.1147 43.9055C64.5003 44.2434 64.2524 44.4142 63.8487 44.8271C63.9924 44.8194 64.0041 44.8271 64.0041 44.8271C64.0041 44.8271 63.4952 44.8931 63.1304 45.0872C63.0536 45.0872 62.9205 45.06 62.6875 45.1261C62.505 45.1842 62.2641 45.3166 62.0158 45.3862C61.6622 45.4911 61.546 45.4446 61.546 45.4446L61.6041 45.561C61.6041 45.561 61.1433 45.5531 60.9897 45.5687C61.0169 45.5764 61.0092 45.5882 61.0092 45.5882C60.9822 45.5927 60.9562 45.6019 60.9324 45.6153C60.8585 45.6632 60.7772 45.6986 60.6917 45.72C60.6452 45.7277 60.6062 45.7277 60.5479 45.7395C60.5673 45.7861 60.7189 46.0467 60.7888 46.2003C60.7307 46.2392 59.8567 46.8994 59.8567 46.8994C59.8838 46.9421 59.9059 46.9877 59.9227 47.0353C59.9499 47.1206 59.9616 47.245 59.9888 47.3031C60.0546 47.4196 60.0935 47.439 60.0935 47.439C60.0935 47.439 59.9888 47.4585 59.806 47.5051C59.6508 47.544 59.4604 47.6098 59.1916 47.6487C59.1091 47.6594 59.0261 47.6659 58.943 47.6682C58.9819 47.7537 59.1527 48.0798 58.838 48.4564C58.5234 48.833 58.4264 48.8878 58.3294 49.1284C58.2805 49.0915 58.2285 49.0589 58.174 49.0311C58.0693 48.9845 57.9254 48.9149 57.875 48.8214C57.8456 48.9459 57.8066 49.068 57.7585 49.1865C57.6615 49.4466 57.5179 49.7031 57.4907 49.8972C57.3858 49.7807 57.1917 49.5516 56.9237 49.5982C56.6556 49.6447 56.4421 50.0098 56.3956 50.1148C56.3956 50.0487 56.349 49.9983 56.3374 50.0758C56.3295 50.1614 56.182 51.0543 55.3588 51.7767C55.3511 51.5942 55.3511 51.1902 55.3316 51.0584C55.2548 51.1352 55.1609 51.2486 54.6015 51.4895C54.0539 51.7301 54.1407 51.971 54.1407 51.971C54.1407 51.971 54.0941 51.587 54.3893 51.1825C54.6883 50.7788 54.8708 50.5884 54.8708 50.5574C54.866 50.5258 54.8525 50.4962 54.8319 50.4719C54.793 50.433 54.7154 50.3864 54.7154 50.3554C54.762 50.3362 55.2241 50.1148 55.197 49.6563C55.1698 49.2449 54.9952 49.0311 54.8708 48.8798C54.8516 48.8604 55.0536 48.7167 55.0262 48.6702C55.0068 48.643 54.7584 48.4602 54.7272 48.363C54.7345 48.3049 54.7476 48.2477 54.7661 48.1922C54.7932 48.1067 54.8127 48.0483 54.805 47.9902C54.7856 47.8932 54.6806 47.6252 54.6496 47.598C54.6768 47.6057 54.8708 47.598 54.8708 47.598C54.8708 47.598 54.7157 47.3495 54.6883 47.233C54.6609 47.1165 54.6028 46.8095 54.5718 46.7514C54.6379 46.7591 54.8009 46.7706 54.8009 46.7514C54.8089 46.6931 54.6573 46.596 54.7241 46.521C54.7707 46.5287 54.8601 46.5676 54.9453 46.6764C54.8987 46.552 54.8212 46.3114 54.6578 46.2143C54.7346 46.1872 54.9957 46.1171 55.2249 46.253C55.454 46.3889 55.5321 46.5791 55.5321 46.5791C55.5321 46.5791 55.668 46.6841 55.8779 46.8395C56.1186 47.0297 56.4252 47.3003 56.9147 47.4918C57.0197 47.5502 57.2875 47.5502 57.4818 47.5112C57.5664 47.4911 57.6475 47.4584 57.7224 47.4142C57.7495 47.3983 57.7781 47.3852 57.8079 47.3753C57.7662 47.2915 57.7181 47.211 57.6643 47.1344C57.7303 47.1344 57.8079 47.1423 57.8079 47.1423C57.8079 47.1423 57.8545 47.0374 57.6448 46.8351C57.6914 46.7886 57.7498 46.7583 57.7498 46.6798C57.6837 46.6721 57.5673 46.575 57.5401 46.5361C57.5788 46.509 57.6372 46.4197 57.7032 46.3925C57.6448 46.3459 57.5012 46.1516 57.4352 46.1324C57.4983 46.109 57.5593 46.0804 57.6177 46.0469C57.6177 46.0469 57.2915 45.9614 57.1866 45.8915C57.0816 45.8147 56.9265 45.6819 56.8333 45.643C56.736 45.604 56.5653 45.5848 56.4954 45.507C56.5612 45.5265 56.6661 45.507 56.744 45.507C56.8021 45.507 56.8295 45.5147 56.8487 45.5147C56.841 45.4876 56.841 45.4292 56.9925 45.41C57.0654 45.399 57.1362 45.3767 57.2022 45.3439C57.2022 45.3439 57.0583 45.3363 56.895 45.1809C56.7317 45.0255 56.596 44.9013 56.5028 44.8819C56.4058 44.8624 56.2233 44.9479 56.1106 44.94C55.9552 44.9208 55.8892 44.843 55.8892 44.843C55.8892 44.843 55.3728 44.8895 54.2272 44.1907C53.2368 43.5847 52.8057 43.0489 52.8057 43.0489C52.713 43.0153 52.6234 42.9736 52.5379 42.9245C52.1651 42.7304 51.6485 42.3265 51.6642 41.7981L51.6621 41.8019Z"
                                                            fill="#C2A44D"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M65.9495 18.4932C66.0393 18.5224 66.1192 18.5762 66.1799 18.6486C66.3624 18.8582 66.4789 19.2543 66.0634 19.6777C66.2265 19.7358 66.2938 19.7545 66.4361 19.7358C66.2925 19.9068 65.9664 20.2719 65.9469 20.5903C65.9275 20.8504 66.0905 20.9283 66.0905 20.9283C66.0905 20.9283 65.842 21.2155 65.8304 21.6963C65.9478 21.5639 66.0763 21.4418 66.2144 21.3312C66.5019 21.1021 66.898 20.842 67.166 20.6789C67.1624 20.7473 67.1716 20.8157 67.1931 20.8806C67.1931 20.8806 67.6939 20.469 68.1147 20.6518C68.3049 20.7373 68.2194 21.0051 68.2194 21.0051C68.2194 21.0051 68.4798 20.908 68.6623 21.0906C68.8448 21.2731 69.1029 21.7439 69.2352 21.9264C69.2934 22.0119 69.4449 22.175 69.6 22.4274C69.812 22.7808 69.9889 23.154 70.1284 23.5418C70.1361 23.3398 70.1865 23.0254 70.7615 23.2233C71.3362 23.4253 71.9885 23.8487 72.5361 24.6825C73.0837 25.5163 73.2194 26.4576 73.4951 26.816C73.7746 27.1616 74.0621 27.7363 74.0816 27.9772C74.101 28.2181 73.9961 28.9946 74.5708 31.0956C74.7339 30.4433 74.9824 28.9946 74.9824 28.9946L75.1184 27.7169L75.2738 23.7635L71.1455 20.3338L67.9184 17.9919L65.8174 18.1939L65.9492 18.4929L65.9495 18.4932Z"
                                                            fill="#CAA13E"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M73.6196 24.3766C73.6196 24.3766 73.5612 23.9926 72.5905 23.3398C71.6195 22.6952 70.8622 22.6952 70.1633 22.1476C69.6273 21.7165 69.0682 20.726 68.7041 20.3999C68.3506 20.0776 68.2925 19.1455 68.2925 19.1455L69.4847 18.1471L71.2577 15.5843L72.7566 13.9338L73.4749 14.9322L74.4733 16.105L75.0286 18.4584L75.2306 21.9031L73.6178 24.3768L73.6196 24.3766Z"
                                                            fill="#B59544"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M74.8196 28.5057C74.849 27.9833 74.7844 27.4598 74.6291 26.9602C74.3731 26.164 73.8137 24.7504 73.5539 24.221C73.4489 23.6345 73.5268 23.5879 73.6394 23.5219C73.7521 23.4558 74.1755 23.2147 74.4074 22.3686C74.6393 21.5225 75.359 21.4948 75.359 21.4948L75.8016 21.1687L76.4736 22.8501L77.0598 24.3687L77.2424 25.5299L77.3783 26.5201L77.0598 28.6134L75.4872 30.0347L74.8193 28.5057H74.8196Z"
                                                            fill="#C89D3A"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M52.874 51.8371V51.7941C52.9067 51.7737 52.9356 51.7477 52.9593 51.7173C52.9864 51.6784 53.0061 51.6318 53.0253 51.6203C53.0642 51.6009 53.2468 51.5435 53.3438 51.5619C53.4408 51.5804 53.6973 51.6861 53.8333 51.6784C54.1128 51.6707 54.439 51.457 54.9556 51.5543C55.7323 51.6979 55.9148 52.226 56.3654 52.525C56.6726 52.7349 56.9905 52.6415 57.0371 52.6415H57.1418C57.1613 52.6415 57.3049 52.4784 57.3827 52.4864C57.5381 52.494 57.5534 52.6223 57.6505 52.63C57.8796 52.6571 58.3225 52.5135 58.5439 52.5719C58.6096 52.5924 58.6693 52.6286 58.718 52.6772C58.7666 52.7258 58.8028 52.7855 58.8235 52.8512C58.8701 52.9948 58.8311 53.1773 58.7185 53.2823C58.4779 53.5034 58.2487 53.7134 58.2022 53.8967C58.2614 53.9418 58.3183 53.99 58.3726 54.041C56.4512 53.5515 54.6024 52.8113 52.874 51.8394V51.8371Z"
                                                            fill="#CEB052"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M73.5532 44.0779C73.5532 44.0779 74.1589 43.2702 74.3688 42.87C74.5785 42.4576 73.7048 37.2352 73.7048 37.2352L75.4602 31.4839L75.4133 29.6121C75.4133 29.6121 75.4988 27.8838 75.7008 27.1342C75.9417 27.5653 76.6913 28.0858 76.8543 28.3615C76.9311 27.8331 77.192 26.7187 77.1534 25.5304C77.297 25.7516 77.6426 27.977 77.6426 27.977L77.9882 29.4759L78.4387 31.0682L78.9397 32.7499L79.2387 33.9111L79.4095 34.1906L79.5534 34.6798L79.6893 35.2082L80.0815 36.447L80.3119 37.4643L80.4944 39.3091C80.5341 39.4503 80.5627 39.5945 80.5799 39.7402C80.5876 39.9422 80.5528 40.0587 80.5528 40.0937C80.5528 40.1288 80.6188 40.5363 80.5917 40.8433C80.5528 41.1505 80.5528 41.3909 80.3119 41.6113C80.071 41.8317 79.9197 43.1491 79.9197 43.1491L79.4886 42.8619C79.4886 42.8619 79.5741 42.4694 79.3721 42.1123C79.1701 41.7552 78.7779 41.6812 78.5565 41.7395C78.3353 41.7861 77.8927 41.8558 77.7488 41.9802C77.6129 42.1043 77.279 42.4889 76.9721 42.6637C76.5881 42.8941 75.9624 42.9123 75.6286 42.9899C75.2907 43.0667 74.918 43.2971 74.5255 43.5646C74.2178 43.7638 73.8929 43.9351 73.5548 44.0766L73.5532 44.0779Z"
                                                            fill="#CCA847"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M73.5532 52.5633C73.5532 52.5633 73.5788 52.5799 73.6282 52.607C76.3873 51.3144 78.8594 49.4821 80.8986 47.2182C80.8764 46.4323 80.8474 45.6267 80.8157 45.3282C80.7499 44.6951 80.7965 44.0505 80.777 43.6778C80.7576 43.305 80.5479 41.7864 80.4509 41.3942C80.3459 41.002 80.1437 40.8077 80.113 40.8077C80.0858 40.8157 79.9225 41.5458 79.9225 41.7293C79.9225 41.9129 79.8836 42.3547 79.8836 42.4674C79.8565 42.4595 79.8449 42.3906 79.8449 42.3624C79.806 42.4595 79.7594 42.6305 79.74 42.6499C79.7205 42.6694 79.7671 42.4868 79.74 42.4479C79.7128 42.409 79.6632 42.4285 79.6739 42.3314C79.6785 42.2739 79.6876 42.2168 79.7011 42.1607C79.7011 42.1607 79.5846 42.3315 79.4993 42.7664C79.4138 43.1975 79.4138 43.2093 79.3829 43.2479C79.3557 43.2948 79.2003 43.4499 79.1924 43.5083C79.1847 43.613 79.3363 43.7179 79.3478 43.7761C79.3555 43.8733 79.2118 44.3236 79.1653 44.5441C79.1187 44.7645 79.1381 45.1963 79.0885 45.4178C79.0495 45.6198 79.0117 45.7363 78.8788 45.8215C78.9758 45.841 79.069 45.8681 79.069 45.8681C79.069 45.8681 79.2049 46.4428 78.8593 46.9323C78.7352 47.103 78.7042 47.1809 78.5721 47.3362C78.3117 47.6235 78.1098 47.9506 78.0903 48.1634C78.0769 48.1006 78.0678 48.037 78.0632 47.9729C78.0632 47.9729 77.6595 48.4429 77.4885 48.711C77.2673 49.0566 76.9603 49.0371 76.8741 49.1226C76.7878 49.2081 76.7691 49.3633 76.7973 49.4877C76.7205 49.5069 76.5761 49.5343 76.4788 49.8333C76.4322 49.9884 76.3157 50.1405 76.1332 50.2449C75.9507 50.3494 75.7292 50.3809 75.6166 50.408C75.7136 50.4351 75.7525 50.4351 75.7991 50.4661C75.741 50.5631 75.473 50.7147 75.174 50.909C74.8749 51.0915 74.7311 51.3593 74.6574 51.5341C74.5806 51.6972 74.4671 51.8022 74.2846 51.8216C74.3614 51.8682 74.4751 51.9768 74.5332 52.0118C74.4477 52.0313 74.3028 52.0313 74.044 52.2527C73.7721 52.478 73.6789 52.5441 73.5545 52.5635L73.5532 52.5633Z"
                                                            fill="#C39D3C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M68.1497 54.3628C68.2984 54.2586 68.4595 54.1732 68.6292 54.1086C69.2349 53.868 69.8757 53.8214 70.1281 53.7438C70.369 53.667 70.5592 53.561 70.8582 53.5029C70.8503 53.571 70.8436 53.635 70.8364 53.6954C69.9549 53.9726 69.0572 54.1955 68.1484 54.3628H68.1497Z"
                                                            fill="#D2BA6B"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M79.3218 38.4312C79.3218 38.4312 79.1977 39.103 78.9762 39.5264C78.7548 39.9498 78.5154 40.5361 78.5154 40.5361C78.5169 40.404 78.5325 40.2724 78.562 40.1436C78.2825 40.3067 77.6028 40.6991 77.41 40.8737C77.2275 41.0368 76.9205 41.3243 76.843 41.4602C77.0255 40.9244 77.2157 40.4429 77.2469 40.2214C76.9674 40.4234 75.6623 41.4991 74.9829 42.2098L72.8663 43.9224C72.622 44.0542 72.3705 44.172 72.1129 44.2752C71.7481 44.4303 71.3169 44.5624 70.9985 44.6869C71.084 44.4577 71.2197 44.2555 71.4101 44.0614C71.6121 43.8712 72.2178 43.2149 72.311 42.9094C72.3965 42.591 72.416 42.4008 72.3033 42.1327C72.1984 42.1599 71.9577 42.1717 71.7946 42.2182C71.6316 42.2648 71.4567 42.4394 71.4567 42.4394C71.4567 42.4394 71.5809 41.7288 71.8489 41.057C71.6469 41.0647 71.3013 41.1228 71.3013 41.1228C71.3013 41.1228 71.7829 40.3151 72.6069 39.7522C72.3546 39.8059 72.1076 39.8825 71.8691 39.9811C71.3876 40.183 70.8595 40.4821 70.4673 40.6451C70.6885 40.3379 72.2419 38.121 73.1663 36.0548C74.0879 33.9927 74.4322 33.4646 74.6342 32.3579C74.7389 31.8103 74.711 31.0011 74.7389 30.2764C74.766 29.5578 74.8554 28.9132 74.7973 28.4821C75.0379 28.7811 75.939 29.6238 75.97 31.5075C75.9971 33.3909 75.1081 35.9347 74.1642 37.3054C74.3946 37.3714 74.9916 37.4492 75.605 36.3838C76.2183 35.3183 76.2109 35.0208 76.4323 34.5779C76.4595 34.7994 76.4515 34.8769 76.4515 34.8769C76.4515 34.8769 77.345 33.7935 77.7682 32.4303C77.8537 33.0168 78.1061 33.5334 77.7098 34.6092C77.3565 35.5799 76.8944 35.817 76.8944 35.817C76.8944 35.817 77.1235 35.7781 77.4612 35.5761C77.5196 35.7197 77.5081 35.8833 77.6051 35.9411C77.7021 35.999 77.8342 36.0965 77.8537 36.1897C77.9584 36.0343 78.1214 35.8362 78.1721 35.6887C78.1332 35.9959 78.1061 37.3391 78.2489 38.0227C78.5482 37.9955 78.8549 37.9761 79.0645 37.4362C78.9209 37.9646 78.9209 38.2828 79.0179 38.7333C79.1772 38.6248 79.3208 38.4305 79.3208 38.4305L79.3218 38.4312Z"
                                                            fill="#C0993A"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M69.2313 17.0252C69.2313 17.0252 68.9323 17.1494 68.4236 17.1494C67.981 17.1494 68.1052 16.9786 67.414 16.9786C66.35 16.9786 62.6334 17.593 61.9809 17.5843C61.5575 17.5767 63.4099 17.7669 63.4099 17.7669L68.1441 17.8329L69.0954 17.7561L69.4489 17.0367L69.2313 17.0252Z"
                                                            fill="#A88F33"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.9554 26.2797C56.9554 26.2797 56.3494 26.7418 56.0932 27.0953C55.8369 27.4489 55.701 27.6816 55.4097 27.9691C55.4781 27.9717 55.5464 27.9625 55.6117 27.9419C55.6117 27.9419 55.6117 28.0187 55.5651 28.039C55.6053 28.0344 55.6461 28.039 55.6844 28.0523C55.7226 28.0656 55.7574 28.0873 55.7862 28.1158C55.7007 28.1623 55.4678 28.3956 55.6503 28.6713C55.7862 28.8809 56.0737 28.9001 56.0737 28.9001C56.0737 28.9001 56.0077 29.0906 56.2834 29.0711C56.8776 29.044 57.5416 28.7837 57.8483 28.8497C58.1555 28.9265 58.3301 28.9547 58.5475 29.3315C58.7779 29.7042 58.9786 29.7626 58.9786 29.7626C58.9786 29.7626 59.1145 29.4167 59.0835 28.9004C59.195 28.6221 59.2568 28.3263 59.2661 28.0267L59.0641 26.5393L58.1827 25.4247L57.0409 26.0578L56.9554 26.279V26.2797Z"
                                                            fill="#E3C571"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M58.0386 26.0582C58.0386 26.0582 58.1241 26.2602 58.4815 26.2794C58.4425 26.3649 58.4425 26.3767 58.4543 26.4425C58.462 26.5085 58.4735 26.6055 58.4735 26.6055C58.5129 26.5865 58.5484 26.5605 58.5785 26.5287C58.5979 26.6142 58.559 26.7499 58.5785 26.8472C58.5905 26.9064 58.61 26.9637 58.6366 27.018C58.6423 27.0047 58.6488 26.9918 58.656 26.9793C58.6637 26.9598 58.7328 27.189 58.9241 27.3633C58.9239 27.3365 58.9305 27.3101 58.9433 27.2865C58.9462 27.3352 58.9623 27.3822 58.9899 27.4224C58.9756 27.4156 58.9625 27.4064 58.9512 27.3953C58.9512 27.3953 58.9704 28.0097 59.0754 28.3274C59.0929 28.3069 59.1085 28.2848 59.122 28.2613C59.122 28.2421 59.1143 28.4324 59.0948 28.5685C59.0677 28.7045 59.0871 28.8947 59.0871 28.8947C59.1572 28.8396 59.2341 28.7939 59.316 28.7588C59.4325 28.7119 59.6232 28.5683 59.7394 28.2498C59.8069 28.0695 59.8588 27.8837 59.8948 27.6946C59.9324 27.7668 59.9583 27.8446 59.9716 27.925C59.9796 28.022 60.1621 27.9716 60.1621 27.9716L60.201 27.5481L60.4314 26.5889L60.6411 25.9947L61.6507 24.4221L63.475 23.0172L65.0673 23.3822L66.4108 21.557L64.0963 20.1666L61.906 20.3957L59.9181 23.149L58.3261 25.6463L58.0386 26.058V26.0582Z"
                                                            fill="#D8B65B"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M69.5106 22.0739C69.5106 22.0739 69.3747 22.101 68.9825 22.3043C68.5903 22.5076 68.3184 22.5721 68.1669 22.8711C68.0153 23.1701 68.0038 23.4071 68.0038 23.4071C68.0038 23.4071 68.2718 23.2907 68.4272 23.2518C68.5903 23.2131 68.7728 23.2246 68.7534 23.2907C68.7347 23.336 68.7088 23.3779 68.6766 23.4148C68.6766 23.4148 68.9838 23.4071 68.9756 23.5587C68.9674 23.7102 68.9175 23.8772 68.8594 23.9509C68.801 24.0277 68.5603 24.1414 68.5332 24.2307C68.4672 24.4132 68.5603 24.4209 68.5253 24.5684C68.4981 24.7122 68.3701 24.9918 67.9506 25.481C67.5194 25.9705 67.3362 26.3161 67.3362 26.3161C67.3362 26.3161 67.1265 25.9239 67.0177 25.586C66.9409 25.6246 66.5285 25.8537 66.5285 25.8537L65.5731 22.5257L65.5923 22.3043C65.5923 22.3043 65.6778 22.1996 65.6972 22.0053C65.5536 21.9587 65.5342 21.9198 65.3437 21.7375C65.1532 21.5552 64.9981 21.3335 64.6799 21.182C64.6333 21.0965 64.5749 20.9803 64.342 20.9334C64.109 20.8866 63.9692 20.8482 63.9692 20.8482C63.9692 20.8482 64.0934 20.8013 64.1518 20.7043C64.0079 20.7238 63.8917 20.7703 63.577 20.7627C63.2586 20.7547 63.2235 20.7432 63.0489 20.7703C62.8743 20.7975 62.6649 20.8753 62.5868 20.6073C62.5013 20.5412 62.3188 20.5996 62.1634 20.8285C62.008 21.0573 61.9538 21.2401 61.6547 21.3294C61.6337 21.4613 61.5876 21.5878 61.5188 21.7022C61.4333 21.8461 61.2974 21.9897 61.1148 22.2032C60.8274 22.5411 60.8739 23.0964 60.4157 23.5198C59.9536 23.943 60.4925 22.3468 60.4925 22.3468L61.2303 20.5804L63.3313 18.526L66.5935 18.3048L66.912 19.9944L68.5043 20.542L69.5101 22.0759L69.5106 22.0739Z"
                                                            fill="#D3AE4D"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M70.0272 22.4466L68.6563 20.47L67.6971 19.732C67.6971 19.732 67.0136 18.474 66.967 18.4351C66.9281 18.4079 66.2835 18.338 65.8718 18.3109L65.9486 18.5011C66.0385 18.5303 66.1183 18.5841 66.179 18.6565C66.3616 18.8662 66.478 19.2622 66.0626 19.6856C66.2256 19.7437 66.293 19.7624 66.4353 19.7437C66.2917 19.9148 65.9655 20.2798 65.9461 20.5983C65.9266 20.8584 66.0897 20.9359 66.0897 20.9359C66.0897 20.9359 65.8411 21.2234 65.8296 21.7039C65.947 21.5716 66.0754 21.4494 66.2136 21.3389C66.5011 21.1085 66.8971 20.8494 67.1651 20.6863C67.1615 20.7548 67.1707 20.8233 67.1923 20.8883C67.1923 20.8883 67.693 20.4767 68.1139 20.6592C68.3041 20.7447 68.2186 21.0127 68.2186 21.0127C68.2186 21.0127 68.4789 20.9157 68.6615 21.0982C68.844 21.2808 69.1041 21.7505 69.2362 21.9333C69.2943 22.0188 69.4458 22.1819 69.601 22.434C69.813 22.7875 69.9899 23.1608 70.1294 23.5487C70.137 23.3933 70.1683 23.1759 70.4366 23.1759L70.0288 22.4458L70.0272 22.4466Z"
                                                            fill="#CAA13E"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M49.4757 28.0622C49.4757 28.0622 49.3787 27.8214 49.4757 27.3516C49.5728 26.8818 49.7243 26.6604 49.7747 25.9692C49.8252 25.278 50.2757 24.4158 50.2757 24.4158L51.5222 23.849L52.4039 24.0896L52.664 25.2703L51.5493 25.8847C51.5493 25.8847 51.4912 26.1448 51.1766 26.3545C50.862 26.5641 50.427 26.7272 50.3223 26.941C50.2597 27.0719 50.2141 27.2102 50.1864 27.3526C50.1864 27.3526 49.8679 27.2866 49.6777 27.4962C49.4757 27.71 49.4834 27.9002 49.4757 28.0633V28.0622Z"
                                                            fill="#F4EFC8"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.9922 27.7476C51.9922 27.7476 51.8873 27.8137 51.8097 27.978C51.7329 27.8538 51.5494 27.1158 51.5417 26.4517C51.534 25.7877 51.4943 25.6231 51.6479 25.3942C51.8015 25.1653 52.4039 24.9242 52.3184 24.512C52.2329 24.1198 51.8755 23.9568 51.4367 24.0694C51.1295 24.1462 50.9009 24.7995 50.5824 25.1257C50.3415 25.3742 50.0543 25.3353 49.9767 25.4713C49.8718 25.6538 49.9688 25.8363 49.9378 25.9528C49.9299 25.9917 49.8329 26.2014 49.658 26.4538C49.3047 26.9625 48.7067 27.681 48.6289 28.3257C48.656 27.9606 48.6368 27.9529 48.7339 27.5489L48.6755 27.4519L49.0595 26.1937L49.3081 25.1569L49.8636 23.4207L50.842 21.6461L51.7936 20.5819L52.7838 20.648L52.9003 22.1353L53.4673 24.9278L54.6595 26.3957L52.7487 27.6816L51.9915 27.7476H51.9922Z"
                                                            fill="#EBCC73"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M52.5863 28.2753C52.5863 28.2753 52.4232 28.3142 52.3648 28.2832C52.3065 28.2522 52.2486 28.2171 52.2678 28.1782C52.287 28.1393 52.392 28.0735 52.392 28.0423C52.3941 28.0141 52.3852 27.9861 52.3671 27.9644C52.349 27.9426 52.3231 27.9288 52.2949 27.9258C52.2056 27.9143 52.1785 27.9724 52.1785 27.9724C52.1785 27.9724 52.093 27.9066 52.0233 27.8956C52.0645 27.8906 52.106 27.8879 52.1475 27.8877C52.0402 27.8391 51.9263 27.8064 51.8096 27.7906C51.9066 27.7325 52.0971 27.5615 52.2212 27.5615C52.3454 27.5615 52.4232 27.5423 52.4037 27.4763C52.3843 27.4102 52.2873 27.3132 52.1826 27.2743C52.2212 27.2277 52.2486 27.1578 52.1554 26.9671C52.0581 26.7769 52.0971 26.6486 52.1283 26.6023C52.1554 26.5439 52.2525 26.4392 52.299 26.3732C52.3456 26.3071 52.3845 26.2178 52.4621 26.1712C52.501 26.1441 52.6252 26.0944 52.7496 26.047C52.8855 26.0004 52.9982 25.9421 53.0757 26.0004C53.1613 26.0585 53.1223 26.1364 53.1223 26.1364C53.1223 26.1364 53.3904 26.0391 53.631 26.1635C53.8719 26.2797 54.4584 26.3537 54.4584 26.3537L54.6686 26.7771L53.2782 27.9693L52.7035 28.2568L52.587 28.276L52.5863 28.2753Z"
                                                            fill="#E5C66B"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.5166 26.3262C54.5166 26.3262 54.0855 26.6137 53.9885 26.7184C54.0466 26.7263 54.1436 26.7653 54.1047 26.8234C54.0581 26.8815 53.7786 27.0835 53.6232 27.2739C53.4601 27.4641 53.3047 27.705 53.2504 27.8215C53.1923 27.9262 52.7494 28.2332 52.5981 28.2718C52.9166 28.2718 53.5574 27.8796 53.798 27.8796C53.7903 27.9961 53.8641 28.1282 54 28.1397C54.1359 28.1512 54.5281 28.2252 55.0563 27.8991C55.5844 27.5806 55.4098 27.3436 55.631 27.1884C56.0544 26.9086 56.2252 26.66 56.4581 26.5049C56.6911 26.3498 56.8116 26.3144 56.8116 26.3144C56.8116 26.3144 56.8193 26.198 56.8884 26.2097C56.9074 26.2119 56.9253 26.2192 56.9404 26.2308C56.9555 26.2425 56.9671 26.258 56.974 26.2758C56.974 26.2758 57.3779 25.9883 57.8956 25.9107C57.8835 25.9053 57.8738 25.8957 57.8684 25.8836C57.8684 25.8836 57.9071 25.8641 57.915 25.8447C57.915 25.8447 57.9421 25.8058 57.9616 25.8252C57.9811 25.8447 58.0082 25.9883 58.0471 26.0467C58.1326 26.0078 58.2957 25.6427 58.2957 25.6427L58.6881 24.5204V23.4951L58.3809 23.5535L56.0769 24.5319L54.6787 25.9806L54.5156 26.3262H54.5166Z"
                                                            fill="#E6BD62"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M61.1493 21.2971C61.2739 21.2669 61.3934 21.2184 61.5039 21.1532C61.4573 21.2776 61.4573 21.4136 61.2553 21.7087C61.0533 22.0039 61.0456 22.0467 60.8826 22.3534C60.7195 22.6718 60.7 23.1301 60.5446 23.3318C60.6143 23.2979 60.689 23.2757 60.7658 23.266C60.7658 23.266 60.6107 23.4019 60.5446 23.5455C60.4786 23.6892 60.3621 23.9882 60.0749 24.171C59.7876 24.3537 59.4223 24.47 59.0301 24.9011C58.6377 25.3242 58.234 25.8603 58.0317 26.0531C58.1367 25.8705 58.2803 25.5055 58.3192 25.2648C58.3581 25.0242 58.3113 24.7365 58.3773 24.4183C58.4434 24.1 58.4434 23.8707 58.7613 23.3151C59.0793 22.7596 59.6235 20.8296 59.6235 20.8296L60.7963 20.4569L61.1498 21.2958L61.1493 21.2971Z"
                                                            fill="#B6933F"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M60.3027 20.5865C60.3027 20.5865 59.9494 21.0952 59.8524 21.5458C59.7553 21.9963 59.8444 21.9574 59.7863 22.1789C59.7516 22.3139 59.7516 22.4555 59.7863 22.5905C59.9087 22.3934 60.0762 22.2282 60.275 22.1087C60.6091 21.907 60.881 21.7631 61.043 21.5924C61.2061 21.4098 61.342 21.1108 61.6953 20.8817C61.5517 20.8622 61.3497 20.7962 61.3113 20.8049C61.4552 20.6418 61.886 20.3933 62.321 20.0942C62.7521 19.787 62.7249 19.6631 63.4241 19.3565C63.195 19.3954 63.0862 19.337 62.8957 19.3565C62.9725 19.1934 63.2413 19.1156 63.5101 18.8478C63.7789 18.58 63.3393 18.1837 63.3393 18.1837L61.2913 19.4225L60.3011 20.5876L60.3027 20.5865Z"
                                                            fill="#C49937"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.7456 19.6621L54.7922 19.2894L55.3787 18.3496L55.9923 16.6992V14.4428L55.9457 13.138L56.0428 12.2834L56.1165 12.0118L56.1943 11.9069L56.695 12.167L57.3865 13.1067L57.4525 14.9205L56.7805 17.7826L54.8621 19.8759L54.7456 19.6621Z"
                                                            fill="#DFC068"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.2719 11.8019C56.2719 11.8019 55.9647 11.8098 55.8992 13.0875C55.8337 14.3652 55.8019 15.0369 55.7553 15.67C55.7087 16.3031 55.6002 16.6874 55.5457 17.0604C55.4911 17.4333 55.4602 17.9418 55.2856 18.2525C55.2088 18.3962 55.0447 18.8467 54.6602 19.1846C54.2291 19.5574 53.585 19.8177 53.4874 19.8372C53.3164 19.8758 52.4504 19.9613 52.0971 20.1557C51.9729 20.2217 51.7592 20.2993 51.5224 20.5207C51.0524 20.9439 50.4272 21.7011 49.9766 22.6138C49.2854 23.977 48.5942 27.8254 48.5942 27.8254L48.7496 27.5653C48.7496 27.5653 48.7691 27.2197 49.1147 26.6138C49.4526 26.0081 49.3556 25.3284 49.8253 24.1672C50.0079 23.7246 50.237 23.1498 50.5165 22.6604C50.9594 21.8642 51.4952 21.1807 52.0351 20.8079C52.9165 20.2022 53.8875 20.0701 53.8875 20.0701L54.9323 19.3789C54.9323 19.3789 55.1148 19.0257 55.3557 18.6217C55.6934 18.0549 56.1237 17.4218 56.2177 16.5015C56.3615 15.1383 56.0157 14.2451 56.0351 13.4374C56.0546 12.6298 56.0623 12.0356 56.2256 11.8917C56.3889 11.7478 56.2722 11.8024 56.2722 11.8024L56.2719 11.8019Z"
                                                            fill="#A88F33"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.272 17.899C56.272 17.899 56.7328 16.765 56.9437 15.7591C56.9826 15.5571 57.0602 15.3554 57.0797 15.1923C57.1767 14.2408 57.2038 13.8486 57.0797 13.3282C56.9826 12.9442 56.6099 12.598 56.4156 12.3298C56.2254 12.0499 56.1361 11.9458 56.175 11.8869C56.2139 11.828 56.3652 11.7317 56.5126 11.7433C56.6694 11.7478 56.8236 11.7842 56.9658 11.8502C57.108 11.9162 57.2354 12.0105 57.34 12.1273C57.639 12.4729 57.8758 13.6458 57.8758 13.6458L58.1249 15.1936L58.758 17.1431L56.2725 17.9006L56.272 17.899Z"
                                                            fill="#C99E3D"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M60.6018 16.7186C60.6018 16.7186 60.5163 16.7572 60.3611 16.7186C60.3678 16.782 60.3568 16.846 60.3293 16.9035C60.3019 16.9611 60.2592 17.0099 60.2058 17.0447C60.0427 16.9787 58.5162 17.1108 58.5162 17.1108C58.5162 17.1108 57.8055 16.9864 57.5841 16.0466C57.4289 15.4212 57.7005 14.5592 57.6112 13.9922C57.4753 13.1571 57.2851 12.9938 57.2656 12.734C57.2461 12.4741 57.2267 12.4078 57.2267 12.2447C57.1412 12.2253 57.0907 12.1981 57.0055 12.1981C56.986 12.1213 57.0247 12.0543 56.9395 11.9183C56.986 11.9378 57.3045 11.9767 57.6772 12.33C57.9844 12.6175 57.9844 12.7222 58.0308 12.7805C58.0889 12.8387 58.5589 13.2413 58.7609 13.6428C58.9629 14.0442 59.3551 15.3242 59.4444 15.5338C59.4715 15.6193 59.5299 15.7048 59.6748 15.8989C59.9001 16.1787 60.2301 16.6413 60.6028 16.7181L60.6018 16.7186Z"
                                                            fill="#B58634"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M58.0854 12.8C58.3207 13.1801 58.5321 13.5744 58.7183 13.9807C58.9474 14.4971 59.0833 14.9205 59.3708 15.2661C59.2154 14.8158 58.9397 13.9303 58.7766 13.6157C58.5941 13.2829 58.2214 12.9245 58.0854 12.8003V12.8Z"
                                                            fill="#A88F33"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.4449 19.1846C55.4449 19.1846 55.0527 19.2816 54.3226 19.6661C54.0817 19.7903 53.8528 19.895 53.6314 19.9923C53.0561 20.2524 52.4392 20.4927 51.9497 20.6253C51.9886 20.6719 52.0078 20.6911 52.0078 20.6911C52.0078 20.6911 52.0078 20.8816 52.1128 20.9901C52.0547 21.0485 51.2777 21.5766 51.5071 23.3436C51.6622 23.2854 51.8447 23.2076 51.8719 23.2076C51.9187 23.2156 51.9302 23.3436 51.9884 23.3436C52.0465 23.3436 52.2369 23.2668 52.4389 23.0056C52.4312 23.1106 52.3148 24.1669 52.9399 24.8775C53.0564 24.7416 53.3516 24.291 53.3516 24.291L53.3592 24.1474C53.3592 24.1474 53.3864 23.6464 53.5497 23.1882C53.713 22.7299 54.0312 22.392 54.0312 22.392L55.6929 20.0191L55.4444 19.1843L55.4449 19.1846Z"
                                                            fill="#E6C367"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.8915 22.6689C53.8154 22.7226 53.7316 22.7645 53.6429 22.793C53.6158 22.696 53.5769 22.3619 53.806 22.0358C54.074 21.6433 54.6602 21.1346 54.8233 20.7302C54.9283 20.4698 54.8817 19.8175 55.8138 18.9825C56.7459 18.1474 57.1107 17.8602 57.1107 17.8602L58.6175 17.1029L60.4699 17.833L59.5496 21.4401L58.8351 23.1297L55.9935 22.5939L53.8912 22.6689H53.8915Z"
                                                            fill="#DCBA5A"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.9761 21.6894L55.3296 21.2467V20.9321C55.3296 20.9321 55.7218 20.8272 56.145 20.396C56.5681 19.9649 57.1546 19.1378 57.6712 19.1882C58.1879 19.2466 58.2383 20.3105 58.2577 20.6098C58.2772 20.9091 58.3432 21.5882 58.4479 21.9536C58.5644 22.3186 57.1897 23.701 57.1897 23.701L56.2561 24.4117L54.9761 21.6894Z"
                                                            fill="#E9CE77"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.0698 25.3747C56.0698 25.3747 56.3573 24.9241 56.1466 24.8271C56.2708 24.5476 56.4999 24.2524 56.4999 24.2524C56.4999 24.2524 56.663 23.8487 57.1911 23.3515C57.7192 22.8544 58.0456 22.5241 58.1311 22.1903C58.1838 21.9727 58.2125 21.7501 58.2166 21.5262C58.2737 21.5729 58.3348 21.6144 58.3992 21.6504C58.4847 21.6893 58.8884 22.0231 58.8303 22.6951C58.7722 23.3671 58.5231 23.6467 58.5231 23.6467C58.5231 23.6467 58.2824 23.8873 58.1117 24.0117C57.9289 24.1359 57.8631 24.2795 57.5562 24.2913C57.5877 24.2662 57.6232 24.2465 57.6611 24.2329C57.6611 24.2329 57.3427 24.1943 57.1716 24.3494C57.0006 24.5046 56.6371 24.9825 56.4546 25.1264C56.2721 25.2429 56.0706 25.3749 56.0706 25.3749L56.0698 25.3747Z"
                                                            fill="#CDAE50"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M68.9823 17.8212C68.5235 17.6539 68.0414 17.5596 67.5533 17.5416C66.7377 17.5145 65.5455 17.5611 64.3766 17.5687C63.1184 17.5764 61.9766 17.1376 60.3923 17.0601C60.1322 16.9047 59.4707 16.225 57.4058 17.6658C57.5299 17.6581 58.9049 17.3473 59.3823 17.9456C59.8639 18.5397 59.7279 19.5494 59.6621 19.7901C59.5377 20.3261 59.1338 21.1067 58.9709 21.6542C58.8081 22.2018 58.8465 22.4896 58.7301 22.8736C58.6136 23.2576 58.3573 23.4483 58.5086 23.8909C58.7106 23.7668 58.8158 23.7668 59.1532 23.0095C59.4906 22.2523 59.4213 21.7124 59.9806 21.0716C60.5282 20.427 61.4398 19.5453 61.7864 19.3239C62.1331 19.1024 64.8853 17.6734 67.7671 19.0366C68.4621 18.9629 68.9826 17.8209 68.9826 17.8209L68.9823 17.8212Z"
                                                            fill="#D2A83E"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M58.5669 17.2928C58.5641 17.2637 58.5576 17.2349 58.5477 17.2073C58.5208 17.1505 58.4854 17.0982 58.4427 17.0519C58.4427 17.0519 57.7592 16.9278 57.4136 16.9664C56.8077 17.0325 56.2601 17.7821 56.0038 18.1666C55.7476 18.5511 55.4291 19.145 55.0835 19.4519C55.0873 19.422 55.0804 19.3918 55.0641 19.3664C55.0641 19.3664 55.0835 19.3936 55.0449 19.4325C55.0062 19.4714 55.0059 19.4906 55.0254 19.5093L55.0838 19.5674C55.103 19.5674 55.639 19.3265 56.3691 18.6458C57.1458 17.9351 57.74 17.5706 58.0508 17.4457C58.2165 17.3752 58.3898 17.324 58.5672 17.2928H58.5669Z"
                                                            fill="#C29637"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M71.8256 14.3729C71.8256 14.3729 71.7012 14.5281 71.5458 14.6991C71.2002 15.0641 70.7496 15.4755 70.3651 15.8989C70.0003 16.3029 69.5887 16.6175 69.1263 17.1457C68.664 17.6738 68.1279 18.26 67.9922 18.431C67.8681 18.602 67.7711 18.8816 67.7711 19.0252C67.705 18.9786 67.6274 18.9282 67.6274 18.9282C67.6601 18.9892 67.6991 19.0465 67.7439 19.0992C67.8409 19.2351 67.9922 19.4064 68.0701 19.5108C68.1655 19.6438 68.2341 19.7942 68.2718 19.9535C68.3184 19.9611 68.6174 20.0195 68.9904 19.4059C69.3634 18.7923 69.8523 18.1205 69.8523 18.1205L70.629 16.967L71.1185 15.9885L71.7329 14.8934L71.8264 14.3729H71.8256Z"
                                                            fill="#AC8132"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M72.6214 13.5885C72.6214 13.5885 72.1514 13.9725 71.9689 14.2029C71.7864 14.4333 71.3545 15.038 71.3545 15.038L71.5099 15.0185L72.2984 14.3196L72.6056 13.7721L72.6212 13.5895L72.6214 13.5885Z"
                                                            fill="#A88F33"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M72.4776 44.4505C72.4776 44.4505 72.47 44.1321 72.6486 43.9419C72.8312 43.7514 73.2933 43.4718 73.7438 42.4233C74.1944 41.3747 74.2445 41.1379 74.2445 41.1379C74.2445 41.1379 73.4369 41.8291 72.9389 41.9922C73.0554 41.7513 73.1215 41.5805 73.1798 41.4561C73.1138 41.398 72.8342 41.3319 72.8071 41.301C72.9622 41.1456 73.0477 40.7649 73.3624 40.5125C73.7663 40.2053 74.5041 39.6774 75.0776 39.2069C75.651 38.7364 76.7784 37.642 76.9223 37.3235C77.0078 37.4476 77.027 37.5252 77.027 37.5252C77.027 37.5252 76.4602 38.2633 76.1651 38.733C75.9047 39.137 75.9242 39.3661 75.9242 39.3661L76.4602 39.1357C76.4602 39.1357 76.6154 39.7104 75.9126 40.5844C76.2198 40.4679 76.3437 40.5378 76.5183 40.4405C76.2309 40.6233 75.8348 40.8719 75.4621 41.5552C75.097 42.2387 74.5999 43.0348 73.7612 43.5317C72.9456 44.056 72.4756 44.4482 72.4756 44.4482L72.4776 44.4505Z"
                                                            fill="#A67A2E"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M70.3729 18.2254C70.3729 18.2254 70.0544 18.8892 70.0078 19.4059C70.0001 19.5303 69.9689 19.6273 69.9689 19.7709C69.9612 20.233 69.996 20.7496 69.8921 20.9902C69.8532 20.8932 69.8337 20.8272 69.7948 20.7885C69.7367 20.9516 69.6317 21.4603 69.5462 21.6505C69.5076 21.5263 69.4221 21.0952 69.43 20.5865C69.4379 20.0779 69.4492 19.9806 69.4492 19.8759C69.43 20.031 69.3251 20.2409 69.2861 20.3651C69.228 20.2604 69.162 20.1244 69.0842 20.0118C69.0376 20.0886 68.9795 20.202 68.929 20.2604C68.9211 20.2138 68.9019 20.0894 68.8901 19.9148C68.8824 19.7128 68.8707 19.4527 68.8824 19.3982C68.9016 19.2935 69.065 18.8818 69.4106 18.505C69.8222 18.0544 70.2456 17.1886 70.3698 16.9206C70.4939 16.6526 71.0221 15.5382 71.0221 15.5382H71.426L70.8395 16.874C70.8395 16.874 70.4863 17.6041 70.3037 17.8724C70.1212 18.1407 69.7367 18.9095 69.5657 19.2085C69.6899 19.0454 69.7948 18.9599 69.9192 18.8045C70.0395 18.6957 70.3734 18.226 70.3734 18.226L70.3729 18.2254Z"
                                                            fill="#8C6228"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M72.6292 13.5378C72.5632 13.7409 72.4589 13.9295 72.322 14.0934C72.0811 14.3808 71.5645 14.7651 71.3123 15.0718C71.0819 15.3708 70.6211 16.1864 70.8305 17.1533C70.9073 16.9437 71.052 16.5282 71.4365 16.0582C71.821 15.5881 72.2327 15.0485 72.4349 14.6292C72.6366 14.2057 72.6638 13.8719 72.6638 13.8719L72.7406 13.7749L72.694 13.5535L72.6279 13.5378H72.6292Z"
                                                            fill="#CBA94C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M80.4935 39.2971C80.4935 39.2971 80.3381 38.8739 80.2915 38.4894C80.2449 38.1049 80.3683 38.0286 80.2255 37.5885C80.14 37.3205 79.9848 37.3581 79.9459 37.3205C79.907 37.2829 79.8799 36.8779 79.8875 36.6564C79.8952 36.435 79.8799 36.1478 79.8409 36.0234C79.7828 35.9768 79.7439 35.9378 79.6584 35.6506C79.5614 35.3631 79.5148 35.2195 79.4682 35.1343C79.4216 35.049 79.2854 34.9712 79.2854 34.8857C79.2854 34.7147 79.4408 34.6256 79.4408 34.5785C79.4331 34.4815 79.3167 34.5593 79.2854 34.5319C79.2468 34.4853 79.3827 34.2058 79.3323 34.1668C79.3128 34.1476 79.1769 34.3107 79.1418 34.2641C79.1029 34.2173 79.0563 33.7552 78.9864 33.4485C78.9206 33.1495 78.8505 32.9322 78.8428 32.8428C78.8351 32.7573 78.3067 31.2505 78.1787 30.8854C78.0756 30.577 77.9888 30.2633 77.9186 29.9457C77.8797 29.7631 77.8526 29.3901 77.8331 29.429C77.8137 29.468 77.8255 29.6582 77.7942 29.6505C77.7671 29.6426 77.6701 28.9787 77.6391 28.8738C77.612 28.7688 77.4486 28.413 77.4087 28.1554C77.3698 27.8951 77.2845 27.2154 77.2262 26.7533C77.1678 26.2913 77.1407 26.101 77.1407 25.9853C77.1502 25.7023 77.1346 25.419 77.0941 25.1387C77.0173 24.6493 76.8637 24.0551 76.729 23.7098C76.4689 23.0572 75.7775 21.3873 75.6538 20.9718C75.6538 20.8669 75.7897 20.9252 75.7897 20.9252C75.7897 20.9252 76.1274 21.7718 76.376 22.4241C76.6169 23.0767 76.846 23.6514 76.9044 23.7098C76.951 23.7679 77.316 24.4086 77.4791 25.4572C77.6422 26.5058 77.7003 27.4727 77.7976 28.1173C77.8441 28.4245 77.8831 28.7504 77.9801 29.0765C78.0848 29.4301 78.2479 29.7951 78.4616 30.3542C78.6441 30.8242 78.7801 31.2164 78.8538 31.5544C78.9393 31.9855 78.9393 32.3116 78.9897 32.5254C79.0366 32.7079 79.1062 33.0727 79.2696 33.6006C79.4329 34.1284 79.6733 34.8084 79.8363 35.2315C80.1551 36.0781 80.2971 36.785 80.3453 37.1618C80.3878 37.5501 80.5316 38.8939 80.4927 39.2976L80.4935 39.2971Z"
                                                            fill="#A88F33"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M72.6487 13.4912L72.6292 13.5378C72.6292 13.5378 72.6873 13.5572 72.6758 13.635C72.6766 13.7415 72.6701 13.8479 72.6564 13.9535C72.6372 14.0894 72.5983 14.1941 72.5906 14.2796C72.5906 14.4622 72.6177 14.6718 72.3602 15.1923C72.2834 15.3359 72.236 15.4601 72.1971 15.5456C72.1001 15.7552 72.0806 15.7865 71.9951 15.8835C72.1311 15.8067 72.6205 15.4995 72.8688 15.5456C72.6981 15.6426 72.4377 15.833 72.2747 16.0816C72.3136 16.0893 72.4767 16.1205 72.7355 16.0816C73.1666 16.0156 73.6481 15.8602 74.0713 15.8912C74.5336 15.9183 74.3511 15.3359 74.3511 15.3359L73.8176 14.1632L72.8079 13.4528L72.6487 13.4914V13.4912Z"
                                                            fill="#BE9C44"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M75.2815 22.2759C75.2815 22.2759 74.8309 21.8253 74.6484 20.2791C74.4658 18.7256 74.5048 16.4391 74.5048 16.4391L74.1397 15.5459C74.1397 15.5459 74.0629 14.9517 73.8717 14.7305C73.6804 14.5093 73.3049 14.1363 73.1339 13.9538C72.9629 13.7713 72.7688 13.5227 72.6523 13.4838C72.7105 13.3868 72.9708 12.8392 73.9687 12.8315C74.9666 12.8238 75.2743 13.3791 75.3785 13.5811C75.4827 13.7831 75.9532 14.6563 76.1278 16.3203C76.2909 17.9822 76.2988 18.1066 76.2717 18.6814C76.2522 18.9998 76.1473 19.7376 75.9645 20.5258C75.7976 21.194 75.615 21.9397 75.281 22.2774L75.2815 22.2759Z"
                                                            fill="#A17C34"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M73.8688 23.6001C74.019 23.6109 74.169 23.5771 74.2999 23.5028C74.4436 23.4951 74.964 23.5612 75.3639 23.0525C75.391 23.1687 75.4612 23.4836 75.2784 23.7631C75.3757 23.6659 75.5193 23.6272 75.5387 23.6001C75.5464 23.7437 75.6823 24.1863 75.1076 25.262C75.2628 25.0913 75.4453 25.099 75.6084 25.0795C75.6163 25.2815 75.7248 25.9609 75.4376 26.3262C75.2474 26.5748 74.9366 26.497 74.9366 26.497C74.9412 26.4427 74.9412 26.3882 74.9366 26.3339C74.9289 26.2289 74.89 26.1242 74.9174 26.0543C74.7672 25.9858 74.6305 25.891 74.5134 25.7745C74.1755 25.4561 73.7367 24.9126 73.7058 24.5086C73.6669 24.0581 74.0708 23.961 74.0708 23.961C74.037 23.9308 74.0081 23.8953 73.9853 23.8561C73.9659 23.7903 73.9464 23.6853 73.8688 23.6001Z"
                                                            fill="#8C6228"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M70.8737 18.7146C70.8737 18.7146 70.8542 18.6875 70.7495 18.8117C70.769 18.6875 70.7884 18.5708 70.7961 18.4581C70.8457 18.3539 70.9098 18.2571 70.9866 18.1709C70.9282 18.2871 70.8893 18.3921 70.8893 18.3921C70.8893 18.3921 71.0332 18.1241 71.2428 17.961C71.3864 17.8445 71.569 17.7902 71.6465 17.6814C71.732 17.565 71.7126 17.5455 71.732 17.526C71.732 17.526 71.9225 17.4019 72.2138 17.0366C72.2525 16.99 72.3109 16.9395 72.3498 16.893C72.4156 16.8658 72.571 16.7959 72.7535 16.7025C72.9439 16.5978 73.1574 16.4542 73.2895 16.3953C73.5496 16.2788 73.8256 16.2906 73.9536 16.1078C74.0506 16.0807 74.1553 15.7893 74.1361 15.541C74.2797 15.5991 75.0175 16.0574 75.2702 17.0594C75.4527 17.77 75.1263 18.8652 74.9904 19.3936C74.8545 19.9219 74.8353 20.3139 74.6448 20.5545C74.4039 20.8732 73.6275 21.3225 73.437 21.545C73.2739 21.7275 72.7847 22.1896 72.8039 22.5234C72.8234 22.772 73.1301 22.9074 73.1964 22.9545C73.2627 23.0016 73.2622 23.0595 73.3866 23.0313C73.511 23.0032 73.5573 22.9458 73.608 22.9458C73.6661 22.9535 73.6661 22.9653 73.6933 22.9653C73.7129 22.9647 73.7325 22.962 73.7516 22.9573C73.7516 22.9573 73.7322 23.3109 72.905 23.4181C72.8467 23.4261 72.7886 23.4453 72.7146 23.457C72.8118 23.4105 72.87 23.4105 72.9749 23.2668C72.8584 23.2474 72.5244 23.2279 72.4389 23.2008C72.466 23.1542 72.5553 23.0298 72.6291 22.9717C72.6951 22.9136 72.6214 22.8949 72.5633 22.9251C72.4632 22.9931 72.3672 23.067 72.2758 23.1463C72.1788 23.2318 72.0933 23.3482 71.9379 23.4535C71.8913 23.2981 71.8989 23.0029 72.0817 22.7894C72.0349 22.7971 71.9455 22.933 71.8603 22.9059C71.8449 22.7642 71.8541 22.621 71.8874 22.4825C71.934 22.3076 72.1864 22.0009 72.1864 22.0009L73.4058 19.8221L73.6659 18.1717L70.8737 18.7141V18.7146Z"
                                                            fill="#92723A"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M70.8076 18.8078C70.8076 18.8078 70.7416 18.8544 70.8737 18.9437C70.8542 18.9709 70.8076 19.0679 70.7493 19.134C70.6835 19.2108 70.6133 19.2584 70.5862 19.3244C70.5281 19.4604 70.4815 19.5535 70.4815 19.6119C70.4815 19.6703 70.462 20.043 70.299 20.2837C70.2406 20.3692 70.1746 20.5128 70.128 20.6098C70.0309 20.7805 69.9454 20.917 69.926 20.9938C69.8873 21.1297 69.8602 21.5025 69.8602 21.5025C69.8602 21.5025 69.9457 21.3975 69.9767 21.3589C69.9298 21.4559 69.8794 21.5606 69.8057 21.6384C69.8523 21.5995 69.9882 21.5025 70.2173 21.3005C70.5358 21.0327 71.0329 20.5821 71.6389 20.2253C71.4561 20.2913 71.301 20.2913 71.1768 20.3108C71.2738 20.2138 72.1476 19.1885 72.6058 19.0915C72.6336 19.0562 72.6475 19.0119 72.6447 18.967L72.2523 18.9284L71.4561 19.0991L71.3399 18.4847L70.8076 18.807V18.8078Z"
                                                            fill="#B18E3E"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M72.0741 22.303C72.0741 22.303 71.9692 22.4077 71.8721 22.668C71.7975 22.59 71.7334 22.5025 71.6817 22.4077C71.5381 22.167 71.3169 21.8601 70.8003 22.0349C70.7926 21.8719 70.7808 21.7864 70.8003 21.6699C70.8858 21.6507 71.1459 21.441 71.406 21.1341C71.5888 20.9244 71.7595 20.6835 71.876 20.3768C71.9528 20.3185 72.0857 20.2214 72.26 20.1088C72.5086 19.938 72.8076 19.7048 72.8542 19.4447C72.7377 19.4913 72.4891 19.6078 72.1161 19.5886C72.26 19.5226 72.4812 19.4527 72.454 19.1652C72.5124 19.1263 72.559 19.0991 72.559 19.0991C72.5152 19.0845 72.4692 19.0779 72.4231 19.0797C72.4151 19.0525 72.4036 19.0139 72.3376 19.0331C72.2715 19.0523 72.2608 19.0525 72.2521 19.0797C72.2249 19.0876 72.1356 19.0797 72.0695 19.1265C72.0035 19.1734 71.8209 19.3282 71.7511 19.3554C71.7782 19.3088 71.8169 19.2392 71.8169 19.2392C71.8169 19.2392 71.6266 19.2584 71.4907 19.316C71.2421 19.4015 70.9549 19.5569 70.6636 19.7082C70.6907 19.6616 70.7025 19.6314 70.7217 19.6226C70.7409 19.6139 70.7877 19.6034 70.7877 19.5955C70.7877 19.5876 70.7685 19.5187 70.7801 19.4908C70.8671 19.3063 70.9699 19.1296 71.0873 18.9627C71.2232 18.7799 71.2503 18.5198 71.2503 18.5198L71.8445 18.2208L73.5144 17.8368L74.598 17.9028L74.4621 18.6524L73.8221 19.9611L73.2745 21.1533L72.6491 21.8836L72.0744 22.303H72.0741Z"
                                                            fill="#543E26"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M74.7806 19.0592C74.7806 19.0592 74.1281 19.8669 73.9456 19.9913C74.062 19.7427 74.7806 18.263 75.0407 17.8514C74.9826 17.8048 74.9048 17.8048 75.0873 17.0834C74.9322 17.4482 74.8777 17.6386 74.7497 17.7357C74.6217 17.8327 74.6058 17.8017 74.5193 17.8017C74.5356 17.7722 74.5423 17.7382 74.5385 17.7047C74.5385 17.7047 73.9909 17.6386 73.6169 17.6386C73.2429 17.6386 72.5025 17.8406 72.0906 18.0037C71.7645 18.1396 71.5819 18.1396 71.4654 18.2249C71.349 18.3219 71.2829 18.4269 71.2245 18.454C71.178 18.4811 70.9568 18.551 70.9061 18.6247C70.8595 18.7015 70.7819 18.7878 70.7819 18.8073C70.7819 18.8267 70.7625 18.8541 70.8208 18.8344C70.84 18.8267 70.9839 18.7489 71.147 18.6519C71.3682 18.5277 71.6362 18.3841 71.8305 18.2986C72.3858 18.0772 72.5606 18.1161 72.8089 18.0695C73.069 18.0229 73.442 17.9141 73.6903 17.9141C73.9389 17.9064 74.4089 17.9141 74.5177 17.9335C74.4711 17.9725 74.4322 18.0191 74.4517 18.1821C74.4517 18.2287 74.4128 18.2791 74.3749 18.3918C74.2587 18.7103 74.0372 19.2384 73.9141 19.5064C73.7433 19.8712 73.5493 20.1782 73.4533 20.3684C73.3573 20.5586 73.1461 21.0596 72.9369 21.3276C72.7278 21.5956 72.6185 21.7587 72.5529 21.8171C72.4874 21.8754 72.0169 22.2208 72.0519 22.3452C72.1374 22.3181 72.6773 22.1148 73.0693 21.6735C73.4612 21.2321 73.5393 20.9628 73.846 20.7219C74.1527 20.481 74.3936 20.0773 74.5372 19.7435C74.6575 19.4327 74.6304 19.3357 74.7817 19.0599L74.7806 19.0592Z"
                                                            fill="#806031"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M60.7187 25.0875C60.7187 25.0875 60.6332 25.4408 60.4389 25.6156C60.2487 25.7866 59.9107 25.9341 59.8721 26.2216C59.8255 26.5088 60.21 26.6527 60.21 26.6527C60.21 26.6527 60.0001 26.9983 60.0001 27.2584C60.0001 27.5264 59.9924 27.5768 60.0195 27.8331C59.9887 27.8529 59.9625 27.8791 59.9427 27.9099C59.9427 27.9099 59.9619 28.1585 60.1524 28.3136C60.3429 28.4687 60.5057 28.5622 60.6027 28.5233C60.6175 28.5549 60.6305 28.5874 60.6416 28.6205C60.6416 28.6205 60.7855 28.2555 60.8825 27.937C60.9795 27.6109 61.065 27.6572 61.1037 27.2184C61.1424 26.7796 61.5645 26.0262 61.5645 26.0262L61.8525 25.3824L61.3827 25.0173L60.7187 25.0872V25.0875Z"
                                                            fill="#B6903C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M61.5923 25.7203C61.4954 25.8198 61.406 25.9262 61.3248 26.0388C61.2006 26.2098 61.1036 26.3649 60.9211 26.4312C60.7386 26.4976 60.6221 26.497 60.6336 26.6798C60.6451 26.8626 60.8161 26.9399 60.9131 27.0331C61.0181 27.1301 61.1036 27.2932 61.057 27.476C61.1151 27.4488 61.2201 27.4176 61.3171 27.208C61.4141 26.9983 62.0928 25.7206 62.0928 25.7206H61.5923V25.7203Z"
                                                            fill="#685026"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M64.269 22.7728C64.269 22.7728 64.3271 22.6176 64.269 22.505C64.2106 22.3885 63.8573 22.3496 63.6825 22.2175C63.5 22.0816 63.2785 21.9871 63.096 22.0468C63.1231 21.9807 63.2319 21.8368 63.1426 21.8059C63.0571 21.7787 62.7389 21.9223 62.6534 21.9884C62.5679 22.0544 62.3736 22.132 62.3349 22.1789C62.2963 22.2257 62.23 22.3148 62.191 22.2759C62.1521 22.2487 62.1329 22.1789 62.0669 22.2175C62.0008 22.2562 61.6829 22.5165 61.6243 22.6681C61.5656 22.8196 61.4338 23.1575 61.0378 23.5418C60.6417 23.9261 60.4707 24.1749 60.5872 24.3185C60.7037 24.4621 60.7582 24.3574 60.7777 24.4816C60.7926 24.6035 60.786 24.727 60.7582 24.8466C60.7116 25.0486 60.634 25.2388 60.7388 25.2777C61.0068 25.3632 61.2671 25.2009 61.3253 25.2506C61.4417 25.3553 61.2592 25.7321 61.5349 25.8059C61.8147 25.8827 62.0904 25.7398 62.0904 25.7398L63.1078 25.1922L64.0865 24.6759L64.5872 23.6854L64.3187 22.8583L64.2675 22.7728H64.269Z"
                                                            fill="#D4B968"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M63.3088 25.1379C63.3088 25.1379 63.1378 24.8778 63.3477 24.6485C63.5577 24.4191 63.8564 24.3223 63.9729 24.1787C63.9507 24.1514 63.921 24.1311 63.8874 24.1206C63.9647 23.9822 64.0827 23.871 64.2253 23.8019C64.1672 23.7438 64.0894 23.6972 64.0041 23.6972C63.8137 23.6972 63.6969 23.8136 63.5223 23.8136C63.3516 23.8136 63.3321 23.7281 63.3321 23.7281C63.3321 23.7281 63.6196 23.701 63.5922 23.5728C63.5651 23.4368 63.5154 23.4368 63.5154 23.4368C63.5154 23.4368 64.0707 23.2064 64.1677 23.0835C64.2647 22.9607 64.2532 22.8155 64.2727 22.7574C64.3385 22.7574 64.723 22.5554 64.8784 22.6409C65.0338 22.7264 64.925 22.9594 64.925 22.9594C64.925 22.9594 65.3952 22.6058 65.6348 22.2592C65.8445 22.2787 65.942 22.1156 66.0956 22.1156C66.2861 22.1156 66.5851 22.3757 66.6432 22.931C66.6821 23.2494 66.7403 23.432 66.6821 23.9952C66.655 24.3136 66.6627 24.9936 66.7589 25.331C66.8247 25.599 66.9801 25.5719 66.9801 25.5719C66.9563 25.6535 66.909 25.7264 66.8442 25.7815C66.7392 25.8785 66.7277 26.1351 66.7392 26.2321C66.7547 26.303 66.7742 26.373 66.7976 26.4417C66.7976 26.4417 66.6734 26.5854 66.6422 26.6826C66.6151 26.7797 66.4871 26.8457 66.3936 26.8457C66.3002 26.8457 66.347 26.8378 66.2229 26.8457C66.0987 26.8536 66.0598 26.8728 65.982 26.8457C65.9042 26.8186 65.846 26.7873 65.8773 26.5385C65.9044 26.2899 64.918 25.7114 64.918 25.7114L63.3052 25.1367L63.3088 25.1379Z"
                                                            fill="#CCA849"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M61.4564 27.5922C61.4564 27.5922 61.8096 28.0623 63.2622 28.0623C63.9534 28.0623 64.1943 27.9962 64.3374 27.9573C64.4928 27.9184 65.0752 27.6895 65.6617 26.9981C66.1898 26.3729 66.0733 26.1167 66.0733 26.1167L65.7661 26.0701L64.7677 26.206L61.8135 27.4642L61.4551 27.5922H61.4564Z"
                                                            fill="#585136"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M62.54 27.7087C62.54 27.7087 61.2817 27.9885 61.2817 27.1923C61.2817 26.4156 62.0584 25.6 62.2527 25.4564C62.4547 25.3125 62.9363 25.1492 62.9363 25.1492H64.0975L64.3187 25.7357L64.2216 27.0016L62.54 27.7084V27.7087Z"
                                                            fill="#252211"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M63.7011 25.3865C63.7011 25.3865 63.4604 25.165 62.9128 25.4633C62.3652 25.7615 61.9224 26.3849 61.8952 26.9509C61.8681 27.4516 62.3069 27.8246 62.9904 27.8441C63.4991 27.8633 63.806 27.8051 63.9614 27.7673C63.9225 27.7207 63.7205 27.4682 63.7205 27.4682L63.7013 25.3867L63.7011 25.3865Z"
                                                            fill="#C3B378"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M63.4643 25.5104C63.4643 25.5104 63.4062 25.4638 63.2339 25.557C63.0903 25.6338 62.8806 25.8368 62.7175 25.9804C62.6126 26.0659 62.5465 26.1046 62.4871 26.1707C62.2462 26.4581 62.0443 26.9282 62.161 27.1611C62.2777 27.3941 62.662 27.6621 63.6407 27.4796L63.4615 25.5107L63.4643 25.5104Z"
                                                            fill="#E6D89C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M63.1457 25.9922C63.1457 25.9922 62.9903 26.2331 62.9903 26.6176C62.9903 27.0098 63.2117 27.635 64.0273 27.6816C64.6525 27.7205 65.0718 26.7807 65.5262 26.4156C65.8718 26.1361 66.0815 26.1282 66.0815 26.1282C66.0815 26.1282 65.7282 25.7442 64.7846 25.2468C63.8525 24.7458 62.8078 24.6797 62.2407 25.4487C62.5088 25.4293 63.3748 25.2078 63.3748 25.2078L63.7982 25.3438L63.1457 25.9925V25.9922Z"
                                                            fill="#252211"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M64.3651 26.5009C64.338 26.4428 64.3186 26.365 64.4312 26.3458C64.5438 26.3266 64.5943 26.3378 64.6332 26.4226C64.6721 26.5073 64.71 26.578 64.6524 26.613C64.5943 26.644 64.4427 26.613 64.3649 26.5004L64.3651 26.5009ZM64.1826 25.9533C64.1826 25.9533 64.1437 25.9805 64.1632 25.9262C64.1708 25.8604 64.2215 25.7437 64.3457 25.7711C64.4699 25.7985 64.443 25.9341 64.4225 25.973C64.402 26.012 64.2983 26.0777 64.2205 26.0498C64.2106 26.0473 64.2015 26.0425 64.1939 26.0358C64.1862 26.0291 64.1802 26.0207 64.1764 26.0112C64.1726 26.0018 64.1711 25.9915 64.172 25.9814C64.1729 25.9712 64.1762 25.9615 64.1816 25.9528L64.1826 25.9533Z"
                                                            fill="#6F674D"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.6704 26.2015C53.6704 26.2015 53.9776 26.4319 54.3345 26.423C54.6878 26.415 55.1422 26.0502 55.3518 25.817C55.476 25.6811 55.5822 25.5375 55.6974 25.4248C55.7947 25.3278 55.8605 25.2812 55.9071 25.2152C55.9731 25.1384 56.043 24.994 56.0781 24.9471C55.9926 25.0132 55.8684 25.1299 55.7402 25.2075C55.616 25.2843 55.348 25.4287 55.2392 25.4676C55.1345 25.5065 54.047 26.082 54.047 26.082L53.6704 26.2015Z"
                                                            fill="#AC924C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.1401 23.3321C54.1401 23.3321 54.3109 23.2157 54.6411 23.1417C54.9596 23.0649 55.6004 23.0057 55.6004 23.0057L56.1285 23.2361L56.3382 24.0323L55.9542 24.8597L55.4649 25.1669L54.9094 24.2737L54.1414 23.3337L54.1401 23.3321Z"
                                                            fill="#9F8E57"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.4489 24.0428L53.2661 24.1792C53.2661 24.1792 53.313 24.0937 53.3516 23.8336C53.3903 23.5735 53.5925 22.9404 53.8877 22.5754C54.1828 22.2103 54.1752 22.2298 54.1752 22.2298C54.148 22.2248 54.1201 22.2257 54.0933 22.2323C54.0665 22.239 54.0414 22.2513 54.0198 22.2684C54.0587 22.1824 54.3073 21.8752 54.5558 21.7216C54.8044 21.568 54.9014 21.5196 55.1615 21.6448C55.4216 21.77 55.4877 21.835 55.6781 21.8273C55.8686 21.8197 56.0314 21.6177 56.0314 21.6177C56.0314 21.6177 56.0703 21.7418 55.9267 22.0293C55.7831 22.3168 55.2161 22.903 55.2161 22.903L54.0354 23.7107L53.4489 24.0435V24.0428Z"
                                                            fill="#EAC970"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.3223 23.2351C54.3223 23.2351 55.1768 23.3516 55.4369 23.1109C55.4446 23.1381 55.4759 23.1381 55.4759 23.1575C55.4738 23.1722 55.4669 23.1858 55.4564 23.1962C55.4847 23.1917 55.5133 23.1891 55.5419 23.1885C55.5761 23.1987 55.6113 23.2052 55.6469 23.208C55.6755 23.2073 55.7041 23.2047 55.7324 23.2C55.7297 23.2193 55.7231 23.2379 55.7131 23.2546C55.703 23.2713 55.6898 23.2858 55.674 23.2973C55.7129 23.2973 55.7508 23.305 55.7508 23.336C55.7508 23.3669 55.7585 23.4604 55.7119 23.4798C55.6733 23.4905 55.6322 23.4877 55.5954 23.4719C55.5985 23.5454 55.6185 23.6173 55.6538 23.6818C55.7306 23.8254 55.8944 23.989 56.1146 23.9419C56.1146 23.9419 56.2308 24.2215 55.7416 24.8428C55.6758 24.9283 55.6056 25.0448 55.5204 25.1418C55.4867 25.2152 55.461 25.292 55.4436 25.3709C55.4436 25.3709 56.271 25.0524 56.5078 24.3262C56.7487 23.5961 56.7953 22.8777 56.7487 22.206C56.7407 22.0155 56.7098 21.8798 56.6632 21.7826C56.5467 21.5417 56.2203 21.5806 56.0885 21.7165C55.898 21.907 55.5795 22.3806 55.1369 22.7067C54.6863 23.0329 54.6671 23.0907 54.3213 23.2351H54.3223Z"
                                                            fill="#D7BC6B"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.2971 24.2836C53.2971 24.2836 53.134 24.3806 53.0485 24.7444C52.963 25.1171 53.1253 25.5715 53.2193 25.7152C53.3132 25.8588 53.5265 26.2512 53.9688 26.2707C54.0783 26.2701 54.1866 26.2476 54.2873 26.2046C54.4417 26.1338 54.5866 26.0438 54.7184 25.9366C54.9089 25.793 55.064 25.6688 55.0445 25.657C54.998 25.6376 53.8718 24.7055 53.8718 24.7055L53.4484 24.2329L53.2968 24.2841L53.2971 24.2836Z"
                                                            fill="#585136"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.3618 25.8291C54.3618 25.8291 54.5909 25.8099 54.7268 25.7244C54.8628 25.6389 53.9307 24.7147 53.9307 24.7147L53.9967 25.7131L54.3618 25.8291Z"
                                                            fill="#453A25"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.3708 24.2135C53.3708 24.2135 53.2543 24.4349 53.2543 24.4933C53.2349 24.6835 53.2932 25.2815 53.3398 25.4717C53.3864 25.6737 53.6388 25.9804 53.9652 25.9804C54.167 25.9804 54.4468 25.8562 54.4468 25.8252C54.4468 25.7863 54.1593 25.7484 54.0817 25.6038C54.0351 25.527 54.0157 25.336 54.0049 25.143C53.9972 25.0188 53.9972 24.8829 54.0438 24.8358C54.1488 24.7193 54.168 24.3852 54.168 24.3852L54.5407 23.6927H54.0505L53.464 24.0578L53.3708 24.2135Z"
                                                            fill="#84754B"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.2271 24.4272C53.2271 24.4272 53.6111 23.9186 53.9572 23.8018C54.3033 23.6851 54.4582 23.7552 54.4582 23.7552L54.2562 24.2718L53.9687 24.5903L53.9881 24.7534C53.9881 24.7534 53.9413 25.1845 54.2288 25.4835C54.5163 25.7825 54.7298 25.771 54.8542 25.771C54.9786 25.771 55.3357 25.666 55.5183 25.2349C55.6813 24.8312 55.8173 24.3133 55.4911 23.7941C55.1724 23.2775 54.6095 23.2576 54.5007 23.2576C54.3919 23.2576 53.5376 23.3003 53.2271 24.4265V24.4272Z"
                                                            fill="#252211"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M63.0875 26.1553C62.9439 26.0892 63.0798 25.6855 63.2234 25.5611C63.367 25.4367 63.5496 25.2933 63.8683 25.2736C63.9845 25.2659 64.0971 25.3397 64.0779 25.4175C64.0508 25.5611 63.8488 25.7631 63.6663 25.9067C63.4139 26.1049 63.2506 26.229 63.0875 26.1553Z"
                                                            fill="#F7F7E7"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.3204 23.9534C55.4253 23.9457 55.5612 24.0302 55.5884 24.1438C55.6155 24.268 55.5223 24.5166 55.3204 24.5166C55.1573 24.5166 55.0718 24.3146 55.0718 24.2565C55.0736 24.2087 55.087 24.1621 55.1107 24.1205C55.1184 24.1088 55.1378 23.9728 55.3204 23.9534Z"
                                                            fill="#F8F6DE"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.8056 24.0427C53.8056 24.0427 53.5376 24.1669 53.4134 24.4267C53.3247 24.6186 53.2979 24.8333 53.3366 25.0411C53.3561 25.1381 53.4531 25.3788 53.5191 25.4643C53.5852 25.5498 53.6745 25.6082 53.7406 25.6002C53.8066 25.5923 53.9423 25.4177 53.9423 25.313C53.9423 25.2083 53.9502 24.7654 54.0782 24.5245C54.1909 24.2839 53.8064 24.043 53.8064 24.043L53.8056 24.0427Z"
                                                            fill="#D4C38B"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.8448 24.0233C53.7982 24.0504 53.7206 24.0893 53.7398 24.1397C53.7593 24.1863 53.9223 24.2165 53.9807 24.3302C54.0468 24.4467 54.0468 24.5708 54.0273 24.6292C54.078 24.6051 54.1241 24.5722 54.1632 24.5319C54.2487 24.4349 54.3534 24.3031 54.4428 24.3031C54.5012 24.3031 54.5593 24.3302 54.6138 24.3302C54.6993 24.3302 54.7845 24.3031 54.7963 24.2137C54.8155 24.0972 54.6333 23.9923 54.5283 24.0117C54.5477 23.9349 54.5749 23.8215 54.4894 23.7437C54.4039 23.6659 54.1361 23.8021 54.0777 23.841C54.0194 23.8799 53.8448 24.0235 53.8448 24.0235V24.0233Z"
                                                            fill="#E2D59D"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M60.0158 32.1825L60.5906 32.0128L60.7536 32.1293C60.7536 32.1293 60.8699 32.3779 61.0526 32.4088C60.9943 32.533 60.8427 32.6392 60.8507 32.7273C60.8586 32.8154 60.9362 32.8827 60.9362 32.8827C60.9362 32.8827 60.4196 33.737 61.4372 34.5979C61.1963 34.6949 60.8896 34.8283 60.7265 34.9051C60.8427 34.9322 61.0913 34.9819 61.1963 35.0761C61.3012 35.1703 61.3012 35.2003 61.3982 35.2586C61.4953 35.317 61.5534 35.3946 61.5342 35.4294C61.4681 35.3905 61.2467 35.2743 61.208 35.3828C61.1694 35.4913 60.2488 35.4488 60.2488 35.4488L58.6954 35.7479C58.6954 35.7479 58.7535 35.5925 58.5904 35.4488C58.4002 35.2781 58.1673 35.4565 57.9187 35.2663C57.5926 35.0177 57.5808 34.7303 57.4761 34.6217C57.5808 34.5557 57.7945 34.4586 58.3032 34.3913C58.2838 34.3524 58.2177 34.2359 58.2566 34.1312C58.3032 33.9953 58.4973 33.9098 58.4391 33.7472C58.5247 33.7278 58.5633 33.7278 58.7771 33.4597C58.979 33.1917 59.1032 33.1336 59.2586 33.1141C59.414 33.0947 59.5072 33.1141 59.7947 32.8461C59.9964 32.6559 59.9306 32.4928 59.9306 32.4928C59.9306 32.4928 60.0624 32.4501 60.0161 32.182L60.0158 32.1825Z"
                                                            fill="#CBAC5A"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M58.3188 32.2688C58.3265 32.2299 58.3577 32.2105 58.5673 32.2299C58.777 32.2494 60.1051 32.1058 60.4664 32.0863C60.8314 32.0592 62.1168 32.0784 62.7422 32.2105C63.3676 32.3426 64.0004 32.498 64.3071 32.5755C64.6143 32.661 64.7111 32.6917 64.6993 32.7307C64.6916 32.7696 64.6225 32.8075 64.5828 32.7967C64.5442 32.789 63.5266 32.4782 63.2122 32.4127C62.8978 32.3472 61.8101 32.1718 61.2154 32.1823C60.6601 32.1902 60.4387 32.1746 59.9689 32.2289C59.4989 32.2873 58.7222 32.3648 58.4893 32.3339C58.2589 32.3067 58.3065 32.3067 58.3183 32.2678L58.3188 32.2688Z"
                                                            fill="#D6BC6F"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M61.4446 35.3126C61.4446 35.3126 62.2408 35.7437 62.5283 36.2719C62.738 36.664 62.4041 36.8583 62.4041 36.8583C62.4041 36.8583 62.8547 36.8583 62.7963 37.1069C62.7692 37.2621 62.0196 37.6814 61.5186 37.9028C61.01 38.1243 61.0294 38.1127 60.7808 38.1514C60.5399 38.1903 59.8797 38.0746 59.7438 38.2679C59.6078 38.4612 59.667 38.6603 59.7049 38.6913C59.7438 38.7184 60.0584 38.7574 60.0584 38.7574C60.0584 38.7574 59.9924 38.9399 59.3401 38.9593C58.6878 38.9788 58.5245 39.0251 58.4855 39.0953C58.4466 39.1611 58.6097 39.1224 58.909 39.1721C59.208 39.2187 59.6273 39.2489 59.6273 39.2489C59.6273 39.2489 59.4914 39.3654 59.1381 39.4585C58.7341 39.5632 58.101 39.6605 57.9108 39.777C58.0078 39.8431 58.1517 39.9401 58.218 39.9478C58.055 39.9867 57.8256 40.0722 57.7869 40.1031C57.845 40.1421 57.9229 40.1887 57.9229 40.1887C57.9229 40.1887 57.5965 40.5808 57.4062 40.6781C57.216 40.7754 56.1209 41.2838 55.744 41.1868C54.8043 40.9382 54.6878 39.9091 54.4587 39.8315C54.1131 39.7151 53.95 39.9478 53.643 39.7847C53.779 39.6877 53.853 39.6295 53.9966 39.5635C53.8412 39.4867 53.0374 38.977 53.0374 38.977C52.9533 38.7938 52.86 38.615 52.7578 38.4412C52.6024 38.1732 52.3738 37.8158 52.2023 37.5012C51.8295 36.81 51.8101 36.4915 51.4722 36.0993C51.5305 36.0225 51.7323 36.0333 51.7323 36.0333L54.5636 36.9654L59.584 37.1108L60.8896 35.2468L61.4449 35.3129L61.4446 35.3126Z"
                                                            fill="#DFC677"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.0078 38.1552C54.0381 38.1889 54.0734 38.2178 54.1125 38.2407C54.2098 38.3068 54.3534 38.3846 54.4504 38.5008C54.4893 38.4427 54.5864 38.3377 54.7576 38.5008C54.9289 38.6639 55.1416 38.5477 55.274 38.5863C55.4099 38.6332 55.4176 38.6524 55.4176 38.6524C55.4176 38.6524 55.4944 38.5863 55.6662 38.5164C55.7711 38.4775 55.8953 38.4504 56.0312 38.4117C56.1554 38.3846 56.2913 38.3457 56.3848 38.3457C56.4703 38.4038 56.777 38.7297 58.0081 38.2486C59.1693 37.7981 59.4371 37.7477 59.6314 37.8173C59.6508 37.7707 59.6703 37.6813 59.9693 37.6931C59.9693 37.569 59.7207 37.1455 59.7207 37.1455L58.3498 36.6758H57.6L55.3516 37.0874L54.1056 37.7983L54.0086 38.1567L54.0078 38.1552Z"
                                                            fill="#C4A859"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.2583 37.367C53.2583 37.367 53.2854 37.5767 53.5962 37.7981C53.9034 38.0193 53.9999 38.1514 53.9999 38.1514C53.9999 38.1514 54.0583 38.0746 54.1049 37.9963C54.1515 37.9108 54.1904 37.8137 54.268 37.7866C54.4234 37.7206 54.7766 37.8447 54.8545 37.8253C54.9205 37.8061 54.9011 37.6701 54.9709 37.6701C55.134 37.6622 55.2387 37.7748 55.2971 37.7748C55.3555 37.7748 55.4988 37.7671 55.5183 37.7362C55.5377 37.7052 55.5454 37.3826 55.7668 37.2272C56.0077 37.0565 56.3029 37.1302 56.3812 37.1691C56.3812 37.2272 56.3889 37.3711 56.5443 37.3788C56.6997 37.3865 56.7151 37.3593 56.8515 37.4059C56.988 37.4525 57.1505 37.3982 57.2243 37.6271C57.2903 37.6079 57.4457 37.5885 57.4068 37.367C57.4836 37.3089 57.5507 37.27 57.714 37.0409C57.7529 36.9828 57.8187 36.9167 57.8694 36.8312C58.0053 36.8312 58.1684 36.8041 58.3857 36.9943C58.3197 37.0409 58.2808 37.0711 58.2616 37.1184C58.3184 37.1747 58.3703 37.2358 58.4167 37.301C58.4751 37.3778 58.514 37.472 58.5877 37.4914C58.7508 37.538 59.0188 37.472 59.3178 37.4914C59.6053 37.5109 59.8459 37.6156 59.9509 37.6816C59.9898 37.6624 59.9898 37.6545 60.0868 37.674C60.1839 37.6934 60.2576 37.7011 60.1529 37.5769C60.211 37.6041 60.2771 37.6624 60.3354 37.6041C60.3938 37.5457 60.4401 37.4605 60.6032 37.441C60.7663 37.4215 60.8246 37.4487 60.8907 37.2779C60.9762 37.0683 60.681 37.0683 60.681 37.0683C60.681 37.0683 60.817 36.9438 60.9685 36.7808C61.151 36.61 61.3607 36.3886 61.4111 36.1167C61.4966 35.6157 61.0074 35.5499 61.0074 35.5499L58.6346 36.28L55.7336 36.1362L53.2598 37.3673L53.2583 37.367Z"
                                                            fill="#927D49"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.1265 30.5127C51.1265 30.5127 51.0497 30.6097 51.0024 30.8388C50.955 31.0679 50.9752 31.0408 50.9363 31.2039C50.8974 31.367 50.4194 32.9903 50.5986 33.5378C50.7778 34.0854 51.0881 34.2874 51.2822 34.73C51.3211 34.8271 51.359 34.8854 51.3792 34.9709C51.4452 35.2582 51.3871 35.4796 51.4647 35.7671C51.4918 35.8641 51.562 35.9767 51.6667 36.0932C51.8971 36.3339 52.2726 36.563 52.4347 36.7261C52.6635 36.967 52.9899 37.4564 53.4054 37.5028C53.6269 37.5299 53.9415 37.4367 54.2016 37.2816C54.432 37.1377 54.5743 36.936 54.816 36.8208C54.9867 36.7353 55.1693 36.7043 55.3323 36.6654C55.6703 36.5993 55.9772 36.5886 56.1597 36.6265C56.4393 36.6848 57.0995 36.8868 57.4653 36.8868C57.7512 36.8822 58.0354 36.8431 58.3119 36.7703C58.8672 36.6073 59.5389 36.3275 59.9818 36.2033C60.2419 36.1265 60.4516 36.1063 60.6653 36.0597C61.0304 35.9742 61.3371 35.8577 61.5119 35.6363C61.3954 35.5003 61.2518 35.2907 60.4749 35.2983C59.5935 35.3178 58.5759 35.807 58.0749 35.8848C57.5739 35.9627 57.3565 36.0285 56.7972 35.8265C56.2488 35.6224 56.2306 35.4875 56.2306 35.4875C56.2306 35.4875 55.6549 35.0848 55.414 34.0583C55.1731 33.0317 55.414 32.2837 56.0394 31.5728C56.2025 31.3903 56.1636 31.2272 56.1636 31.2272C56.1636 31.2272 56.5752 30.6719 56.4626 30.152C56.3384 29.6354 55.5423 29.7403 55.5423 29.7403L51.1268 30.5127H51.1265Z"
                                                            fill="#6E6342"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.7903 32.2408C51.7561 32.3052 51.7399 32.3777 51.7437 32.4505C51.7514 32.5552 51.7826 32.6911 52.097 32.9981C52.365 33.2659 52.3066 33.5649 52.3066 33.5649C52.3066 33.5649 52.4416 33.592 52.8076 33.4207C53.0951 33.2848 53.1916 33.5257 53.1916 33.5257C53.2753 33.4818 53.366 33.4529 53.4597 33.4402C53.5445 33.4324 53.6266 33.4062 53.7003 33.3634C53.7003 33.3634 54.0382 33.709 54.3334 33.8721C54.6014 34.0159 54.7568 34.113 54.8889 34.0159C55.0131 33.9304 55.0131 33.7556 55.0051 33.678C54.9743 33.6064 54.9353 33.5387 54.8889 33.476C54.8034 33.3519 54.6675 33.208 54.6585 33.092C54.6391 32.8243 54.8605 32.5055 54.8136 32.428C54.7668 32.3504 54.5925 32.331 54.1614 32.4863C53.7149 32.6338 51.7885 32.2416 51.7885 32.2416L51.7903 32.2408Z"
                                                            fill="#39331F"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M52.8076 33.9768C52.8076 33.9768 52.5864 33.7671 52.664 32.7495C52.7579 32.7482 52.8516 32.7573 52.9435 32.7767C52.9435 32.7767 53.0641 33.5651 52.8076 33.9768Z"
                                                            fill="#292311"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.2311 29.7359C51.2619 29.7131 51.2905 29.6874 51.3166 29.6591C51.2398 29.8027 50.8852 30.3775 51.1727 31.2824C51.4602 32.1833 52.1823 32.855 53.0717 32.8863C53.961 32.9175 54.4285 32.4823 54.963 31.83C55.1727 31.5699 55.4136 31.2435 55.6271 31.0223C55.9455 30.6765 56.1941 30.5794 56.1941 30.2456C56.1941 29.5621 55.495 29.2552 54.4659 28.9485C53.4367 28.6418 52.5085 28.6797 52.027 28.8896C51.5572 29.1185 51.3552 29.3593 51.2308 29.7362L51.2311 29.7359Z"
                                                            fill="#252211"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.5359 34.2835L54.6127 34.2446C54.6127 34.2446 54.6319 33.9374 54.7563 33.9456C54.8805 33.9651 54.9389 34.1284 54.9271 34.1865C54.9194 34.2446 54.8884 34.3419 54.764 34.3301C54.6009 34.3339 54.5352 34.2835 54.5352 34.2835H54.5359Z"
                                                            fill="#3F3824"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M54.1904 32.9787C54.1904 32.9787 54.2672 32.9515 54.3612 33.0447C54.438 33.0447 54.7728 33.0058 54.8778 33.0718C54.9827 33.1379 55.0137 33.196 55.0137 33.196C55.0137 33.196 54.6215 33.2815 54.4078 33.196C54.1904 33.1223 54.1904 32.9787 54.1904 32.9787Z"
                                                            fill="#2D2815"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.9185 33.0368C55.9185 33.0173 55.7089 32.8737 55.4874 32.8269C55.4485 32.8192 55.4406 32.8463 55.4106 32.8463C55.3912 32.8386 55.3835 32.7803 55.3835 32.7803L55.2576 32.8466C55.2576 32.8466 55.2381 32.8737 55.3041 32.9234C55.3623 32.97 55.4595 33.0089 55.4867 33.0865C55.5138 33.164 55.5138 33.1912 55.5256 33.2029C55.5333 33.2106 55.6692 33.2029 55.7353 33.164C55.8013 33.1251 55.9257 33.0616 55.9178 33.036L55.9185 33.0368Z"
                                                            fill="#82764F"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M53.9575 33.8253C53.9575 33.8253 53.9962 33.5575 54.2565 33.5457C54.5243 33.5263 54.575 33.7864 54.575 33.7864L54.4196 33.9417C54.4196 33.9379 54.3031 33.7748 53.9588 33.8253H53.9575Z"
                                                            fill="#2D2816"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.6465 32.6718C55.6465 32.6718 55.5026 32.8272 55.1844 32.8738C55.1573 32.8349 55.0989 32.7573 55.1844 32.6331C55.2699 32.509 55.367 32.4701 55.464 32.5087C55.5068 32.5157 55.5467 32.5347 55.5791 32.5636C55.6114 32.5925 55.6348 32.63 55.6465 32.6718Z"
                                                            fill="#574F35"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.2328 32.8622C56.2407 32.8233 56.2136 32.8156 56.2328 32.7962C56.252 32.7767 56.3572 32.7381 56.3767 32.7573C56.3843 32.7652 56.3767 32.7962 56.3767 32.8341C56.3767 32.8719 56.3767 32.9109 56.3572 32.9388C56.3301 32.9777 56.2525 32.9971 56.2136 32.9856C56.1747 32.9741 56.167 32.9196 56.167 32.9088C56.1862 32.9011 56.2328 32.8817 56.2328 32.8622ZM56.8958 32.4429C56.8958 32.4234 56.9619 32.3845 57.0008 32.3845C57.0589 32.3845 57.0589 32.4311 57.0668 32.4429C57.086 32.4506 57.086 32.435 57.1055 32.47C57.1249 32.5051 57.1523 32.567 57.1326 32.606C57.1129 32.6449 57.0356 32.6718 57.0164 32.6641C56.9893 32.6446 56.9038 32.47 56.8958 32.4429Z"
                                                            fill="#82764F"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.561 32.9516C55.561 32.9516 55.6465 32.9707 55.763 33.068C55.7241 33.0952 55.6657 33.1261 55.6657 33.1261C55.6657 33.1261 55.6581 33.0368 55.561 32.9513V32.9516Z"
                                                            fill="#6E6342"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.3712 32.097C55.3518 32.0778 55.4293 32.0312 55.4759 32.0389C55.5225 32.0466 55.542 32.0778 55.5924 32.0855C55.6429 32.0932 55.6508 32.066 55.6692 32.0466C55.6877 32.0271 55.7547 32.0389 55.7662 32.0466C55.7734 32.0551 55.7799 32.0642 55.7857 32.0737C55.7865 32.059 55.7904 32.0445 55.797 32.0313C55.8037 32.0181 55.813 32.0064 55.8244 31.9969C55.8393 31.986 55.8564 31.9785 55.8746 31.9752C55.8928 31.9718 55.9115 31.9726 55.9293 31.9775C55.937 32.0046 55.9759 32.1016 55.9682 32.1211C55.9605 32.1405 55.8441 32.1679 55.8244 32.1482C55.8438 32.1951 55.9293 32.2921 55.9408 32.3113C55.9524 32.3305 55.8553 32.3773 55.8167 32.3697C55.7624 32.3658 55.4283 32.1715 55.3702 32.0978L55.3712 32.097ZM55.8799 31.4524C55.8727 31.4329 55.859 31.4164 55.841 31.4058C55.8139 31.3981 55.7245 31.4058 55.7245 31.4524C55.7245 31.499 55.8013 31.7596 55.8876 31.8953C55.9849 32.0312 56.0507 32.1436 56.1167 32.1748C56.1374 32.1843 56.161 32.1855 56.1826 32.1783C56.2042 32.1711 56.2223 32.1559 56.2332 32.1359C56.2409 32.1165 56.2603 31.9729 56.2526 31.6349C56.245 31.297 56.2332 30.9709 56.2137 30.9514C56.1943 30.932 56.1167 30.9322 56.0896 30.9709C56.0624 31.0095 55.8876 31.3943 55.8796 31.4524H55.8799Z"
                                                            fill="#585136"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.534 33.4407C55.534 33.4407 55.3981 33.3552 55.266 33.4136C55.1418 33.4719 55.1495 33.7011 55.1495 33.7011C55.1774 33.712 55.2076 33.7159 55.2374 33.7126C55.2672 33.7092 55.2958 33.6985 55.3205 33.6816C55.406 33.6235 55.5146 33.5265 55.534 33.441V33.4407Z"
                                                            fill="#574F35"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.7902 33.7477C55.7825 33.6709 55.7134 33.6709 55.7134 33.6312C55.7181 33.6122 55.7291 33.5954 55.7446 33.5834C55.76 33.5714 55.7791 33.565 55.7986 33.5651C55.8375 33.5651 55.8754 33.6117 55.923 33.6419C55.9696 33.6691 56.0395 33.7187 56.0472 33.7779C56.0549 33.837 55.9704 33.9991 55.8765 33.9991C55.7825 33.9991 55.8104 33.8242 55.7909 33.7466L55.7902 33.7477ZM56.5397 33.6427C56.5397 33.6427 56.3844 33.6893 56.3959 33.6427C56.4074 33.5961 56.4427 33.5846 56.4932 33.5846C56.5188 33.5578 56.5532 33.5411 56.5902 33.5377C56.6113 33.5367 56.6321 33.5437 56.6483 33.5572C56.6483 33.5572 56.7533 33.5106 56.7842 33.5377C56.8152 33.5649 56.7922 33.5649 56.8114 33.5961C56.8358 33.6308 56.8519 33.6707 56.8582 33.7126C56.8582 33.7436 56.7417 33.8096 56.6483 33.7981C56.5397 33.7748 56.5589 33.6622 56.5397 33.6427ZM57.4445 33.4679C57.4445 33.4679 57.491 33.495 57.4524 33.5262C57.4253 33.5534 57.2893 33.603 57.1726 33.6117C57.0561 33.6117 56.9514 33.6309 56.9514 33.5923C56.9514 33.5536 57.0484 33.4758 57.1065 33.4563C57.1182 33.4417 57.133 33.43 57.1498 33.4219C57.1667 33.4138 57.1851 33.4097 57.2038 33.4097C57.2504 33.4097 57.4327 33.3903 57.4834 33.3826C57.53 33.3747 57.5689 33.4018 57.5415 33.4407C57.53 33.4679 57.4445 33.4679 57.4445 33.4679ZM57.7125 32.2688C57.7125 32.2688 57.6541 32.3929 57.5883 32.3929C57.5223 32.3852 57.5223 32.3658 57.5223 32.3463C57.5223 32.3192 57.5883 32.2493 57.5804 32.2298C57.5612 32.2298 57.5143 32.2298 57.5223 32.1833C57.5223 32.1443 57.5883 32.0977 57.6464 32.1065C57.6903 32.0704 57.745 32.0499 57.8018 32.0483C57.8679 32.0483 57.926 32.0675 57.926 32.1065C57.926 32.1454 57.8492 32.2306 57.821 32.2503C57.7901 32.2813 57.7511 32.3015 57.7125 32.2695V32.2688ZM56.827 34.5638C56.827 34.5638 56.7502 34.5717 56.7502 34.6104C56.7502 34.6298 56.7694 34.6298 56.7968 34.6183C56.8126 34.6174 56.8282 34.6148 56.8434 34.6104C56.851 34.6183 56.851 34.657 56.9094 34.657C56.9573 34.6505 57.0035 34.6347 57.0453 34.6104C57.0919 34.5912 57.1309 34.5715 57.1309 34.5336C57.1114 34.4675 57.0725 34.4363 57.0144 34.4363C56.9846 34.4344 56.9549 34.4412 56.9289 34.4558C56.9289 34.4558 56.9094 34.4169 56.8434 34.4558C56.7773 34.4947 56.785 34.4947 56.8045 34.5141C56.8393 34.5451 56.8277 34.5653 56.8277 34.5653L56.827 34.5638ZM56.3882 34.9678C56.3882 34.9483 56.4852 34.9094 56.5124 34.9212C56.5395 34.9289 56.6171 35.0763 56.6171 35.0919C56.6171 35.1114 56.52 35.158 56.4811 35.158C56.4422 35.158 56.3764 35.0919 56.3764 35.0812C56.3764 35.0735 56.423 35.062 56.423 35.054C56.4345 35.0348 56.3882 34.988 56.3882 34.9685V34.9678ZM56.081 34.4007C56.1005 34.393 56.1005 34.3736 56.1276 34.3541C56.1361 34.3485 56.1458 34.3448 56.1559 34.3435C56.166 34.3422 56.1763 34.3432 56.186 34.3465C56.1928 34.3342 56.2023 34.3237 56.2137 34.3156C56.2251 34.3075 56.2382 34.302 56.252 34.2996C56.2986 34.2919 56.3375 34.2996 56.3288 34.3191C56.3288 34.3774 56.3677 34.4161 56.3677 34.4627C56.3677 34.5093 56.3406 34.5676 56.2436 34.6065C56.1465 34.6337 56.0144 34.6337 55.995 34.626C55.9755 34.6183 55.9561 34.5405 55.9755 34.5016C55.995 34.4627 56.0493 34.4202 56.0805 34.4007H56.081Z"
                                                            fill="#82764F"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.2047 34.4271C56.2047 34.4271 56.1387 34.466 56.1387 34.4855C56.1328 34.5043 56.1302 34.5239 56.131 34.5436C56.131 34.5551 56.2165 34.5359 56.228 34.5241C56.2319 34.5165 56.2047 34.4473 56.2047 34.4271Z"
                                                            fill="#6E6342"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.6275 34.2447C55.6661 34.2526 55.7322 34.2447 55.7826 34.2641C55.8215 34.2836 55.8487 34.3225 55.8097 34.3691C55.7708 34.4157 55.7329 34.4856 55.6467 34.4738C55.5496 34.4661 55.4565 34.4157 55.4565 34.3768C55.4548 34.3521 55.4581 34.3275 55.4661 34.3041C55.4741 34.2808 55.4867 34.2593 55.5031 34.2408C55.542 34.2099 55.5612 34.2293 55.6272 34.2447H55.6275Z"
                                                            fill="#585136"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M55.5808 34.2836C55.5808 34.2836 55.4566 34.3806 55.4254 34.4274C55.3865 34.474 55.1963 34.7147 55.1382 34.7651C55.1575 34.7311 55.1795 34.6986 55.204 34.6681C55.1271 34.7172 55.0696 34.7912 55.0409 34.8777C54.9943 35.0216 55.3012 35.0992 55.503 35.1576C55.7047 35.2159 55.7828 35.2344 55.7828 35.2344C55.7085 35.1227 55.6447 35.0045 55.5923 34.8811C55.5155 34.6985 55.4758 34.6791 55.5263 34.5936C55.5652 34.5081 55.6235 34.45 55.6235 34.3839C55.6002 34.3225 55.5808 34.2836 55.5808 34.2836Z"
                                                            fill="#574F35"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.1533 34.5905C51.1816 34.5957 51.2106 34.5957 51.2388 34.5905C51.297 34.5826 51.9029 34.3601 52.536 34.4001C53.0099 34.4287 53.4797 34.5059 53.9379 34.6305C54.734 34.8401 55.7242 35.2556 56.365 35.4927C56.5357 35.5585 56.7029 35.6752 56.8258 35.7215C57.3153 35.912 57.3345 35.912 57.622 35.9624C57.9599 36.009 58.3055 35.8964 58.6667 35.8188C59.1093 35.7215 59.8666 35.6749 60.5306 35.5779C60.7454 35.5482 60.9572 35.5001 61.1637 35.4343C61.1637 35.4343 60.6356 35.9624 59.3694 36.1526C58.8576 36.2303 58.3375 36.2369 57.8239 36.1721C57.42 36.1332 57.1522 36.0748 56.9502 36.0167C56.7211 35.9507 56.2511 35.7758 55.6725 35.6327C55.2685 35.5277 54.818 35.4502 54.3016 35.3531C53.0278 35.1199 51.6454 34.8522 51.1528 34.5921L51.1533 34.5905Z"
                                                            fill="#252211"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M49.7242 32.1904C49.417 32.4505 49.0911 32.6991 48.7729 32.9397L47.8136 33.6768C47.4875 33.9174 47.169 34.166 46.8426 34.4069C46.5162 34.6478 46.1904 34.8766 45.8442 35.0981C46.1514 34.838 46.4773 34.5971 46.8035 34.3603C47.1296 34.1235 47.4678 33.8913 47.7824 33.6512L48.7416 32.9131C49.0716 32.6725 49.3901 32.4239 49.7242 32.1909V32.1904ZM48.0272 34.9089C48.0272 34.9089 48.3728 34.6214 48.8039 34.2177C49.3397 33.717 49.996 33.0759 50.2057 32.9597L48.0269 34.9092L48.0272 34.9089Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M48.0273 34.9087C48.1984 34.7379 48.3809 34.571 48.5634 34.4077L48.843 34.167C48.9285 34.0902 49.0257 34.004 49.111 33.9185C49.2817 33.7477 49.4489 33.5649 49.6197 33.3903C49.7043 33.3025 49.7938 33.2195 49.8877 33.1418C49.9346 33.1002 49.9868 33.0649 50.0428 33.0368C50.0897 33.0097 50.1401 32.96 50.2059 32.9513C50.1672 33.0097 50.1207 33.0368 50.0817 33.0872C50.0352 33.1261 49.9962 33.1727 49.9576 33.2114C49.8721 33.2969 49.7751 33.3745 49.6896 33.4523C49.507 33.6077 49.3168 33.7595 49.1343 33.922C48.9518 34.0846 48.781 34.26 48.5982 34.423C48.4003 34.5902 48.2178 34.7533 48.0273 34.9094V34.9087ZM50.3498 33.3553C50.3498 33.3553 49.0839 34.5943 48.8235 34.796L50.3498 33.3553Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M50.3495 33.3552C50.2356 33.487 50.1135 33.6115 49.9839 33.728L49.5999 34.093C49.4758 34.2172 49.3591 34.3416 49.2272 34.4658C49.0913 34.5822 48.9671 34.6962 48.8232 34.8037L49.196 34.4386C49.3204 34.3145 49.4563 34.2098 49.5884 34.0853L49.9612 33.7203C50.0892 33.5923 50.2136 33.4679 50.3495 33.3552ZM50.4076 34.027C50.2909 34.3526 50.1534 34.6705 49.996 34.9785C49.6698 35.6311 49.1806 36.4464 48.9669 36.8622L50.4076 34.027Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M50.4076 34.0272C50.4076 34.1708 50.3687 34.2953 50.3221 34.4194C50.2767 34.5437 50.2249 34.6655 50.167 34.7845C50.1086 34.901 50.0426 35.0254 49.9765 35.138C49.9105 35.2506 49.8329 35.3669 49.7745 35.4836L49.3824 36.1748C49.2464 36.4052 49.1143 36.6369 48.9707 36.8583C49.0677 36.6098 49.1998 36.3768 49.3242 36.1477C49.4602 35.9173 49.5843 35.6869 49.7082 35.4485C49.7687 35.3298 49.8232 35.208 49.8713 35.0837C49.9294 34.9593 49.9875 34.8428 50.0344 34.7302C50.0925 34.606 50.1391 34.4893 50.1975 34.3769C50.2632 34.2563 50.3178 34.1399 50.4071 34.0272H50.4076Z"
                                                            fill="#CFB66C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M51.7902 37.2117C51.7902 37.2117 51.4062 37.7203 51.4446 38.365C51.5493 38.0273 51.6814 37.5107 51.7902 37.2117ZM52.1553 37.7216C52.1553 37.7216 52.0193 39.104 51.9067 39.7837C52.0659 38.998 52.0969 39.0641 52.1553 37.7216ZM54.6989 39.8654C54.6989 39.8654 54.1241 41.555 54.1124 42.0245C54.2368 41.5417 54.4774 40.5553 54.6989 39.8641V39.8654Z"
                                                            fill="#DEC270"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M56.043 37.1072C56.043 37.1072 56.9751 38.645 57.6742 39.9575C57.485 39.297 57.0498 38.0856 56.043 37.1072Z"
                                                            fill="#CBAF59"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M58.5479 39.371C59.0596 40.2756 59.5211 41.2077 59.9303 42.1632C59.8527 41.5029 59.6428 40.373 58.5479 39.371Z"
                                                            fill="#E3C677"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M65.911 41.6383C66.0661 41.5413 66.3731 41.0129 66.6411 40.8811C66.9089 40.7452 67.1108 40.718 67.3517 40.45C67.5924 40.1702 67.6589 39.9994 68.1866 39.7782C68.9246 39.4595 68.417 39.0479 68.417 39.0479C68.4983 38.968 68.5852 38.8941 68.6771 38.8267C68.8675 38.6831 69.0887 38.5082 69.0695 38.2013C69.0424 37.6849 68.9453 36.9354 68.5219 36.5004C68.9336 36.4149 69.7218 36.3568 70.2115 36.2326C70.7783 36.0888 71.0387 35.8868 71.0387 35.8868C71.0387 35.8868 70.7125 35.3315 71.2406 34.7724C71.7688 34.2133 72.1999 33.8792 72.5183 33.2538C72.1533 33.2072 71.5967 33.0132 70.1764 33.5528C70.2531 33.5889 70.3271 33.6304 70.3979 33.677C70.3979 33.677 69.5242 33.9179 69.2057 34.1859C68.6502 34.6557 68.5803 35.0402 67.9784 35.3277C67.3766 35.6152 66.7706 35.5373 66.2699 35.7703C65.7692 36.0033 65.6952 36.2014 65.5124 36.2869C65.5513 36.3335 65.5047 36.4111 65.5784 36.4771C65.5318 36.5432 65.26 36.9858 64.9843 36.9858C65.0114 37.0908 65.2444 37.1683 65.2444 37.1683C65.2444 37.1683 65.0736 37.2927 64.6387 37.3237C64.8598 37.5541 65.0698 37.8053 65.6483 38.1703C65.6017 38.2673 65.4074 38.4112 65.4852 38.5937C65.5708 38.7763 65.7924 39.0248 66.6774 39.2268C66.2269 39.246 65.699 39.351 64.9878 39.254C64.2772 39.1685 64.1607 39.118 63.7219 39.2268C63.7685 39.2734 63.8927 39.2734 64.0015 39.3976C63.885 39.4053 63.1549 39.3121 62.9063 39.6385C62.6462 39.9761 62.5336 40.5316 62.553 40.9044C62.4171 40.9704 62.285 41.0869 62.351 41.3278C62.4171 41.5687 62.7627 41.6463 62.9841 41.7976C63.2053 41.9606 63.2248 42.0188 63.4347 41.9801C63.6559 41.9335 63.982 41.7123 64.1725 41.7123C64.3629 41.7123 64.4986 41.8559 64.4986 41.8559C64.4986 41.8559 65.0152 41.6074 65.0657 41.654C65.1123 41.7005 65.0733 41.9996 65.1238 42.0461C65.175 42.0812 65.7569 41.7356 65.9123 41.6383H65.911Z"
                                                            fill="#ECD592"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M77.2003 26.0972C74.7731 19.8293 68.773 18.6681 68.773 18.6681H51.6546L51.7206 25.0525H55.1298V39.3089H51.6543V45.6817H68.2992C72.3107 45.6817 75.5263 41.6505 75.5263 41.6505C80.6757 34.3419 77.2 26.0972 77.2 26.0972H77.2003ZM68.3885 37.3553C68.3885 37.3553 67.0829 39.239 65.6624 39.239H62.8208L62.7534 25.0681H66.4002C66.4002 25.0681 68.0898 25.4214 69.2702 28.765C69.2702 28.765 70.8351 33.5522 68.3885 37.3553Z"
                                                            fill="white"
                                                            fillOpacity="0.8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_5050_73515">
                                                            <rect
                                                                width={48}
                                                                height={48}
                                                                fill="white"
                                                                transform="translate(40 8)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Solana"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(153, 69, 255)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="black"/>
                                                    <path
                                                        d="M30.5741 36.8266L27.8236 39.7953C27.7642 39.8598 27.6921 39.9113 27.612 39.9465C27.5319 39.9817 27.4454 39.9999 27.358 40H14.3196C14.2574 40 14.1966 39.9817 14.1445 39.9474C14.0925 39.9131 14.0516 39.8642 14.0267 39.8069C14.0018 39.7495 13.9941 39.6861 14.0045 39.6243C14.0149 39.5626 14.0429 39.5053 14.0852 39.4594L16.8326 36.4906C16.8921 36.4262 16.9641 36.3747 17.0442 36.3395C17.1243 36.3043 17.2108 36.286 17.2982 36.286H30.3366C30.3994 36.2847 30.4611 36.3021 30.5141 36.336C30.567 36.3699 30.6088 36.4189 30.6342 36.4767C30.6596 36.5344 30.6674 36.5985 30.6568 36.6608C30.6461 36.723 30.6173 36.7807 30.5741 36.8266ZM27.8236 30.8469C27.7639 30.7827 27.6918 30.7315 27.6118 30.6963C27.5317 30.6611 27.4453 30.6427 27.358 30.6422H14.3196C14.2574 30.6423 14.1966 30.6606 14.1445 30.6949C14.0925 30.7292 14.0516 30.778 14.0267 30.8354C14.0018 30.8927 13.9941 30.9562 14.0045 31.0179C14.0149 31.0796 14.0429 31.1369 14.0852 31.1829L16.8326 34.1532C16.8923 34.2173 16.9644 34.2686 17.0444 34.3038C17.1245 34.339 17.2109 34.3574 17.2982 34.3578H30.3366C30.3987 34.3575 30.4593 34.339 30.5111 34.3046C30.5629 34.2702 30.6036 34.2213 30.6283 34.164C30.653 34.1067 30.6605 34.0434 30.6501 33.9818C30.6397 33.9202 30.6116 33.863 30.5695 33.8172L27.8236 30.8469ZM14.3196 28.7141H27.358C27.4454 28.714 27.5319 28.6958 27.612 28.6606C27.6921 28.6254 27.7642 28.5739 27.8236 28.5094L30.5741 25.5407C30.6064 25.5064 30.6307 25.4653 30.6453 25.4205C30.66 25.3756 30.6646 25.328 30.6589 25.2811C30.6531 25.2343 30.6372 25.1892 30.6121 25.1493C30.5871 25.1094 30.5536 25.0755 30.5141 25.0501C30.4611 25.0162 30.3994 24.9988 30.3366 25.0001H17.2982C17.2108 25.0002 17.1243 25.0184 17.0442 25.0536C16.9641 25.0888 16.8921 25.1403 16.8326 25.2048L14.0852 28.1735C14.0429 28.2194 14.0149 28.2767 14.0045 28.3385C13.9941 28.4002 14.0018 28.4636 14.0267 28.521C14.0516 28.5784 14.0925 28.6272 14.1445 28.6615C14.1966 28.6958 14.2574 28.7141 14.3196 28.7141Z"
                                                        fill="url(#paint0_linear_5050_73116)"
                                                    />
                                                    <path
                                                        d="M46.4703 31.3438H39.4948V29.0313H48.2833V26.7188H39.4715C39.1704 26.7171 38.872 26.7752 38.5932 26.8896C38.3144 27.004 38.0607 27.1727 37.8467 27.3858C37.6326 27.599 37.4624 27.8525 37.3457 28.1318C37.229 28.4112 37.1681 28.711 37.1665 29.0141V31.3578C37.1677 31.6612 37.2283 31.9613 37.3448 32.2411C37.4613 32.5208 37.6315 32.7747 37.8456 32.9882C38.0597 33.2017 38.3135 33.3705 38.5925 33.4852C38.8715 33.5998 39.1702 33.658 39.4715 33.6563H46.4564V35.9688H37.3326V38.2813H46.4703C46.9238 38.2838 47.3678 38.1509 47.7462 37.8994C48.1246 37.6478 48.4204 37.2889 48.5961 36.8681C48.7128 36.5888 48.7737 36.289 48.7753 35.986V33.6422C48.7741 33.3389 48.7135 33.0388 48.597 32.759C48.4805 32.4793 48.3103 32.2254 48.0962 32.0119C47.8821 31.7985 47.6284 31.6296 47.3494 31.5149C47.0704 31.4003 46.7717 31.3421 46.4703 31.3438ZM59.9837 26.7188H52.9818C52.5276 26.7152 52.0825 26.8474 51.7031 27.0987C51.3236 27.3501 51.0269 27.7092 50.8505 28.1305C50.7333 28.4102 50.6721 28.7105 50.6706 29.0141V35.986C50.6721 36.2895 50.7333 36.5899 50.8505 36.8697C51.0269 37.2911 51.3236 37.6502 51.7031 37.9015C52.0825 38.1528 52.5276 38.285 52.9818 38.2813H59.9837C60.2848 38.2829 60.5833 38.2249 60.8621 38.1105C61.1409 37.996 61.3945 37.8274 61.6086 37.6143C61.8226 37.4011 61.9929 37.1476 62.1096 36.8682C62.2263 36.5888 62.2871 36.289 62.2887 35.986V29.0141C62.2872 28.711 62.2263 28.4113 62.1095 28.1319C61.9928 27.8525 61.8225 27.5991 61.6084 27.386C61.3944 27.1728 61.1408 27.0041 60.862 26.8896C60.5833 26.7751 60.2848 26.7171 59.9837 26.7188ZM59.9667 35.9688H52.9989V29.0313H59.9635L59.9667 35.9688ZM84.5084 26.7188H77.6787C77.3776 26.7171 77.0792 26.7752 76.8004 26.8896C76.5216 27.004 76.2679 27.1727 76.0539 27.3858C75.8398 27.599 75.6696 27.8525 75.5529 28.1318C75.4362 28.4112 75.3753 28.711 75.3737 29.0141V38.2813H77.702V34.4828H84.5006V38.2813H86.8289V29.0141C86.8274 28.7097 86.766 28.4086 86.6483 28.1282C86.5307 27.8477 86.359 27.5935 86.1433 27.3801C85.9276 27.1668 85.6721 26.9985 85.3915 26.885C85.1109 26.7715 84.8107 26.715 84.5084 26.7188ZM84.4913 32.1703H77.6927V29.0313H84.4913V32.1703ZM111.695 26.7188H104.865C104.564 26.7171 104.266 26.7752 103.987 26.8896C103.708 27.004 103.455 27.1727 103.241 27.3858C103.026 27.599 102.856 27.8525 102.74 28.1318C102.623 28.4112 102.562 28.711 102.56 29.0141V38.2813H104.889V34.4828H111.672V38.2813H114V29.0141C113.998 28.711 113.938 28.4113 113.821 28.1319C113.704 27.8525 113.534 27.5991 113.32 27.386C112.887 26.9555 112.303 26.7155 111.695 26.7188ZM111.672 32.1703H104.873V29.0313H111.672V32.1703ZM98.1676 35.9688H97.2363L93.9069 27.6876C93.7928 27.4018 93.5965 27.1569 93.3431 26.9843C93.0898 26.8117 92.791 26.7192 92.4851 26.7188H90.4191C90.1167 26.7172 89.8206 26.8059 89.5683 26.9738C89.316 27.1416 89.1188 27.3811 89.0018 27.6618C88.9241 27.8481 88.8835 28.048 88.8824 28.2501V38.2813H91.2107V29.0313H92.142L95.4699 37.3125C95.5859 37.5977 95.7837 37.8416 96.038 38.0131C96.2924 38.1845 96.5918 38.2757 96.898 38.275H98.9639C99.1647 38.2761 99.3638 38.2373 99.5497 38.1609C99.7356 38.0845 99.9047 37.9719 100.047 37.8297C100.335 37.5425 100.498 37.1519 100.501 36.7438V26.7188H98.1676V35.9688ZM66.6737 26.7188H64.3454V35.986C64.347 36.2897 64.4081 36.5901 64.5253 36.87C64.6425 37.1499 64.8134 37.4037 65.0283 37.6169C65.2432 37.8301 65.4978 37.9985 65.7775 38.1125C66.0572 38.2266 66.3564 38.2839 66.6581 38.2813H73.643V35.9688H66.6737V26.7188Z"
                                                        fill="white"
                                                    />
                                                    <defs>
                                                        <linearGradient
                                                            id="paint0_linear_5050_73116"
                                                            x1="15.4061"
                                                            y1="40.3578"
                                                            x2="29.1791"
                                                            y2="24.9327"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop offset="0.08" stopColor="#9945FF"/>
                                                            <stop offset="0.3" stopColor="#8752F3"/>
                                                            <stop offset="0.5" stopColor="#5497D5"/>
                                                            <stop offset="0.6" stopColor="#43B4CA"/>
                                                            <stop offset="0.72" stopColor="#28E0B9"/>
                                                            <stop offset="0.97" stopColor="#19FB9B"/>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Polygon"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(167, 38, 193)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="black"/>
                                                    <g clipPath="url(#clip0_5050_73622)">
                                                        <path
                                                            d="M45.1358 41.5817V27.7168H47.1918L47.3718 28.841H47.4798C48.0558 28.0795 49.0638 27.5355 50.4358 27.5355C52.9598 27.5355 55.0118 29.6066 55.0118 32.689C55.0118 35.7714 52.9918 37.8425 50.4318 37.8425C49.0638 37.8425 48.1238 37.2623 47.6198 36.6095H47.5118V41.5454H45.1318V41.5817H45.1358ZM52.6318 32.689C52.6318 30.8758 51.4798 29.7476 50.0718 29.7476C48.6638 29.7476 47.5118 30.8718 47.5118 32.689C47.5118 34.5062 48.6638 35.6304 50.0718 35.6304C51.4798 35.6304 52.6318 34.5062 52.6318 32.689Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M56.1997 32.689C56.1997 29.6751 58.3637 27.5355 61.2077 27.5355C64.0917 27.5355 66.2157 29.7154 66.2157 32.689C66.2157 35.7029 64.0517 37.8425 61.2077 37.8425C58.3237 37.8425 56.1997 35.6667 56.1997 32.689ZM63.8357 32.689C63.8357 30.9121 62.6837 29.7476 61.2037 29.7476C59.7637 29.7476 58.5717 30.9081 58.5717 32.689C58.5717 34.47 59.7597 35.6304 61.2037 35.6304C62.6477 35.6304 63.8357 34.47 63.8357 32.689Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M67.9438 37.6612V23.9052H70.3238V37.6612H67.9438Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M79.188 27.7169H81.712L77.424 39.8048C76.992 41.0015 76.416 41.5818 74.864 41.5818H72.56V39.3656H74.504C74.864 39.3656 75.044 39.1843 75.152 38.8942L75.368 38.2415L71.332 27.7129H73.856L76.416 34.6111H76.812L79.12 27.7129H79.188V27.7169Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M82.18 38.1729H84.596C84.704 38.8256 85.352 39.696 86.868 39.696C88.308 39.696 89.248 38.7894 89.248 37.4073V36.0293H89.14C88.6 36.6095 87.628 37.1172 86.4 37.1172C83.876 37.1172 81.896 35.159 81.896 32.3264C81.896 29.4938 83.84 27.5355 86.4 27.5355C87.696 27.5355 88.672 28.0795 89.284 28.8048H89.392L89.572 27.7168H91.628V37.4073C91.628 40.0586 89.864 41.7993 86.872 41.7993C83.512 41.7993 82.252 39.5872 82.18 38.1729ZM89.208 32.3264C89.208 30.767 88.128 29.6751 86.72 29.6751C85.352 29.6751 84.268 30.763 84.268 32.3264C84.268 33.8897 85.348 34.9776 86.72 34.9776C88.092 34.9776 89.208 33.8857 89.208 32.3264Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M93.2437 32.689C93.2437 29.6751 95.4077 27.5355 98.2517 27.5355C101.136 27.5355 103.26 29.7154 103.26 32.689C103.26 35.7029 101.096 37.8425 98.2517 37.8425C95.3677 37.8425 93.2437 35.6667 93.2437 32.689ZM100.884 32.689C100.884 30.9121 99.6957 29.7476 98.2517 29.7476C96.8117 29.7476 95.6197 30.9081 95.6197 32.689C95.6197 34.47 96.8077 35.6304 98.2517 35.6304C99.6917 35.6304 100.884 34.47 100.884 32.689Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M104.92 37.6612V27.7168H106.976L107.156 28.6597H107.264C107.66 28.2245 108.632 27.5355 110.112 27.5355C112.384 27.5355 114.004 29.1674 114.004 31.7099V37.6974H111.624V32.0363C111.624 30.767 110.724 29.8201 109.496 29.8201C108.268 29.8201 107.296 30.7993 107.296 32.0363V37.6974H104.92V37.6612Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M32.308 36.501L38.144 33.0881C38.468 32.9068 38.648 32.5804 38.648 32.2178V25.3922C38.648 25.0295 38.468 24.7032 38.144 24.5218L32.308 21.109C31.984 20.9277 31.624 20.9277 31.3 21.109L25.46 24.5218C25.136 24.7032 24.956 25.0295 24.956 25.3922V37.5526L20.848 39.95L16.74 37.5526V32.798L20.848 30.4006L23.552 31.9599V28.7647L21.352 27.4955C21.208 27.4229 21.028 27.3504 20.848 27.3504C20.668 27.3504 20.488 27.3867 20.344 27.4955L14.504 30.9123C14.18 31.0936 14 31.42 14 31.7826V38.6083C14 38.9709 14.18 39.2973 14.504 39.4786L20.34 42.8914C20.664 43.0727 21.024 43.0727 21.348 42.8914L27.184 39.4786C27.508 39.2973 27.688 38.9709 27.688 38.6083V26.4478L27.76 26.4116L31.8 24.0504L35.908 26.4478V31.2024L31.8 33.5958L29.096 32.0365V35.2317L31.296 36.501C31.62 36.6823 31.98 36.6823 32.308 36.501Z"
                                                            fill="url(#paint0_linear_5050_73622)"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <linearGradient
                                                            id="paint0_linear_5050_73622"
                                                            x1="13.9596"
                                                            y1="39.2785"
                                                            x2="37.5421"
                                                            y2="25.5982"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop stopColor="#A726C1"/>
                                                            <stop offset="0.8784" stopColor="#803BDF"/>
                                                            <stop offset={1} stopColor="#7B3FE4"/>
                                                        </linearGradient>
                                                        <clipPath id="clip0_5050_73622">
                                                            <rect
                                                                width={100}
                                                                height={22}
                                                                fill="white"
                                                                transform="translate(14 21)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_DAI (BSC BEP-20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(244, 183, 49)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="black"/>
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M31.9834 15H18.6409V25.7146H14V29.5531H18.6409V33.5849H14V37.4234H18.6409V48H31.9834C39.9944 48 46.0994 43.692 48.4475 37.4234H52.674V33.5849H49.3591C49.4419 32.8946 49.4696 32.2042 49.4696 31.5138V31.431C49.4696 30.7958 49.4419 30.1883 49.3591 29.5808H52.674V25.7423H48.5303C46.2375 19.3632 40.0773 15 31.9834 15ZM22.3702 44.5205V37.3958H44.3591C42.3149 41.6762 37.895 44.5205 31.9834 44.5205H22.3702ZM22.3702 33.5573H45.4917C45.5745 32.9222 45.6298 32.2594 45.6298 31.569V31.4862C45.6298 30.8234 45.5745 30.1883 45.4917 29.5531H22.3702V33.5573ZM44.3867 25.7146C42.3425 21.3791 37.9226 18.4519 31.9834 18.4519H22.3702V25.7146H44.3867Z"
                                                        fill="#F4B731"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M76.2376 24.2511C75.326 24.0854 74.3315 24.0026 73.2265 24.0026H69.884C68.3647 24.0026 67.1216 25.2452 67.1216 26.7641V38.4729C67.1216 39.9917 68.3647 41.2344 69.884 41.2344H71.5967C72.3149 41.2344 72.8674 41.2344 73.2818 41.2344C73.6962 41.2344 74.1934 41.2068 74.8288 41.1239C75.4641 41.0687 76.0166 40.9582 76.5415 40.8478C77.5359 40.6268 78.4199 40.2955 79.1934 39.8536C79.9669 39.3842 80.6022 38.8871 81.0718 38.3072C81.5691 37.7272 81.9558 37.0921 82.2597 36.3741C82.5636 35.6561 82.7845 34.9381 82.895 34.2754C83.0055 33.585 83.0884 32.867 83.0884 32.1214C83.0884 31.5415 83.0332 31.0168 82.9503 30.4921C82.8674 29.9674 82.7293 29.4151 82.5083 28.8628C82.2873 28.3105 82.0387 27.8134 81.7072 27.344C81.3757 26.8745 80.9613 26.4327 80.4365 26.0185C79.9116 25.6042 79.3315 25.2452 78.6685 24.9691C77.9503 24.6377 77.1492 24.4168 76.2376 24.2511ZM70.1879 26.7917H73.337C74.0553 26.7917 74.6078 26.8193 75.0221 26.8745C75.4917 26.9298 75.9614 27.0678 76.431 27.2335C76.873 27.3992 77.3426 27.6478 77.7569 27.9515C78.1989 28.2553 78.5857 28.6143 78.9172 29.0285C79.2486 29.4427 79.5249 29.9398 79.7183 30.5197C79.9116 31.1272 80.0221 31.7624 80.0221 32.4804C80.0221 33.7231 79.7459 34.8001 79.1934 35.7114C78.8895 36.2084 78.5304 36.6503 78.0608 37.0093C77.6188 37.3683 77.1768 37.6168 76.7625 37.8101C76.3481 37.9758 75.8509 38.1139 75.2707 38.2243C74.6906 38.3348 74.1934 38.39 73.8343 38.39C73.4752 38.39 73.0056 38.4176 72.4531 38.4176H70.2431V26.7917H70.1879Z"
                                                        fill="#F4B731"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M95.1323 24.0026C94.1102 24.0026 93.2262 24.6101 92.8395 25.549L86.624 41.2344H89.5798L91.5135 36.7331H98.5577L100.491 41.2344H103.641L97.4251 25.549C97.066 24.6101 96.1544 24.0026 95.1323 24.0026ZM95.0494 27.5097L97.508 33.9164H92.5909L95.0494 27.5097Z"
                                                        fill="#F4B731"
                                                    />
                                                    <path
                                                        d="M110.961 25.5214C110.961 24.6653 111.652 24.0026 112.481 24.0026C113.337 24.0026 114 24.6929 114 25.5214V41.2344H110.961V25.5214Z"
                                                        fill="#F4B731"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_Binance Coin (BSC BEP-20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(240, 185, 11)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="black"/>
                                                    <path
                                                        d="M22.8702 32L22.8861 37.8024L27.8145 40.7036V44.1006L20.0018 39.5167V30.3033L22.8702 32ZM22.8702 26.1977V29.5789L20 27.8804V24.4992L22.8702 22.8007L25.7545 24.4992L22.8702 26.1977ZM29.8727 24.4992L32.7429 22.8007L35.6272 24.4992L32.7429 26.1977L29.8727 24.4992Z"
                                                        fill="#F0B90B"
                                                    />
                                                    <path
                                                        d="M24.9443 36.5997V33.2027L27.8146 34.9012V38.2824L24.9443 36.5997ZM29.8728 41.9203L32.743 43.6188L35.6273 41.9203V45.3015L32.743 47L29.8728 45.3015V41.9203ZM39.7437 24.4992L42.614 22.8007L45.4983 24.4992V27.8804L42.614 29.5789V26.1977L39.7437 24.4992ZM42.614 37.8024L42.6298 32L45.5 30.3015V39.515L37.6873 44.0989V40.7018L42.614 37.8024Z"
                                                        fill="#F0B90B"
                                                    />
                                                    <path
                                                        d="M40.5553 36.5998L37.6851 38.2825V34.9013L40.5553 33.2028V36.5998Z"
                                                        fill="#F0B90B"
                                                    />
                                                    <path
                                                        d="M40.5558 27.4003L40.5716 30.7973L35.6291 33.6985V39.5149L32.7588 41.1976L29.8886 39.5149V33.6985L24.9461 30.7973V27.4003L27.8286 25.7018L32.7413 28.617L37.6838 25.7018L40.5681 27.4003H40.5558ZM24.9443 21.5997L32.743 17L40.5558 21.5997L37.6855 23.2982L32.743 20.383L27.8146 23.2982L24.9443 21.5997Z"
                                                        fill="#F0B90B"
                                                    />
                                                    <path
                                                        d="M68.5411 31.3057C70.4491 31.9486 71.3649 33.6971 71.3649 35.8057C71.3649 39.0971 69.0244 41 65.361 41H57.5V23H65.3102C68.5919 23 70.7544 24.5943 70.7544 27.68C70.7544 29.48 69.9912 30.56 68.5411 31.3057ZM67.091 28.2971C67.091 26.9857 66.3532 26.4971 64.8268 26.4971H61.138V30.1229H64.9286C66.4295 30.1229 67.091 29.5057 67.091 28.2971ZM65.2847 37.5029C67.1418 37.5029 67.6761 36.7057 67.6761 35.4971C67.6761 34.1857 67.1419 33.4914 65.2593 33.4914H61.138V37.5029H65.2847Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M85.9976 23H89.6356V41H85.438L77.7041 28.4L78.0348 33.4657V41H74.3969V23H78.5691L86.3284 35.6L85.9976 30.5343V23Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M104.676 31.3057C106.584 31.9486 107.5 33.6971 107.5 35.8057C107.5 39.0971 105.16 41 101.496 41H93.6351V23H101.445C104.727 23 106.889 24.5943 106.889 27.68C106.889 29.48 106.126 30.56 104.676 31.3057ZM103.226 28.2971C103.226 26.9857 102.488 26.4971 100.962 26.4971H97.273V30.1229H101.064C102.565 30.1229 103.226 29.5057 103.226 28.2971ZM101.42 37.5029C103.277 37.5029 103.811 36.7057 103.811 35.4971C103.811 34.1857 103.277 33.4914 101.394 33.4914H97.273V37.5029H101.42Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_TRX"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(255, 6, 10)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="black"/>
                                                    <path
                                                        d="M39 47C47.2874 47 54 40.2827 54 32C54 23.7173 47.2874 17 39 17C30.7126 17 24 23.7173 24 32C24 40.2827 30.7184 47 39 47Z"
                                                        fill="#FF060A"
                                                    />
                                                    <path
                                                        d="M47.437 29.3071C46.6094 28.5394 45.46 27.3698 44.529 26.5422L44.4715 26.5062C44.3795 26.4342 44.2761 26.3742 44.1669 26.3323C41.914 25.9124 31.4313 23.9512 31.2301 23.9752C31.1726 23.9812 31.1152 24.0052 31.0692 24.0352L31.0175 24.0772C30.9543 24.1431 30.9025 24.2211 30.8738 24.3111L30.8623 24.347V24.545V24.575C32.0405 27.8616 36.7014 38.6213 37.6209 41.1523C37.6784 41.3263 37.7818 41.6501 37.9772 41.6681H38.0232C38.1267 41.6681 38.5749 41.0744 38.5749 41.0744C38.5749 41.0744 46.5807 31.3702 47.391 30.3386C47.4945 30.2127 47.5864 30.0748 47.6669 29.9308C47.6899 29.8169 47.6784 29.7029 47.6382 29.5949C47.5979 29.487 47.5232 29.385 47.437 29.3071ZM40.6209 30.4406L44.0347 27.6097L46.0405 29.457L40.6209 30.4406ZM39.2933 30.2547L33.414 25.4326L42.9313 27.1899L39.2933 30.2547ZM39.8221 31.5142L45.8393 30.5426L38.96 38.8372L39.8221 31.5142ZM32.6152 25.9184L38.8048 31.1663L37.9083 38.8432L32.6152 25.9184Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M70.6943 24V40H67.9651V24H70.6943ZM75.7033 24V26.1978H63V24H75.7033Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M78.2567 24H83.9014C85.1143 24 86.1483 24.1832 87.0032 24.5495C87.8581 24.9158 88.5121 25.4579 88.9651 26.1758C89.4255 26.8864 89.6556 27.7656 89.6556 28.8132C89.6556 29.6117 89.5095 30.315 89.2172 30.9231C88.9249 31.5311 88.5121 32.044 87.9787 32.4615C87.4453 32.8718 86.8096 33.1905 86.0715 33.4176L85.2385 33.8242H80.1638L80.1419 31.6374H83.9452C84.6028 31.6374 85.1509 31.5201 85.5893 31.2857C86.0277 31.0513 86.3565 30.7326 86.5757 30.3297C86.8022 29.9194 86.9155 29.4579 86.9155 28.9451C86.9155 28.3883 86.8059 27.9048 86.5867 27.4945C86.3748 27.0769 86.046 26.7582 85.6002 26.5385C85.1545 26.3114 84.5882 26.1978 83.9014 26.1978H81.0078V40H78.2567V24ZM87.3649 40L83.6164 32.8132L86.499 32.8022L90.3023 39.8571V40H87.3649Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M94.9382 24L98.325 29.8352L101.712 24H104.879L100.057 31.9231L105 40H101.8L98.325 34.0549L94.8505 40H91.6391L96.5932 31.9231L91.7596 24H94.9382Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_USD Coin (Polygon)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(33, 84, 229)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#2154E5"/>
                                                    <g clipPath="url(#clip0_5119_9307)">
                                                        <path
                                                            d="M23 48C31.3125 48 38 41.3125 38 33C38 24.6875 31.3125 18 23 18C14.6875 18 8 24.6875 8 33C8 41.3125 14.6875 48 23 48Z"
                                                            fill="#2775CA"
                                                        />
                                                        <path
                                                            d="M27.125 35.375C27.125 33.1875 25.8125 32.4375 23.1875 32.1251C21.3125 31.875 20.9375 31.3751 20.9375 30.5C20.9375 29.6249 21.5625 29.0626 22.8125 29.0626C23.9375 29.0626 24.5625 29.4376 24.875 30.3751C24.9375 30.5626 25.125 30.6875 25.3125 30.6875H26.3124C26.5624 30.6875 26.75 30.5 26.75 30.2501V30.1876C26.4999 28.8125 25.3749 27.75 23.9375 27.6251V26.1251C23.9375 25.875 23.75 25.6875 23.4375 25.625H22.5C22.25 25.625 22.0625 25.8125 21.9999 26.1251V27.5626C20.1249 27.8126 18.9375 29.0625 18.9375 30.6251C18.9375 32.6876 20.1875 33.5 22.8125 33.8126C24.5625 34.1251 25.125 34.5001 25.125 35.5001C25.125 36.5002 24.2499 37.1876 23.0625 37.1876C21.4374 37.1876 20.8749 36.5 20.6874 35.5625C20.625 35.3126 20.4375 35.1875 20.25 35.1875H19.1874C18.9375 35.1875 18.75 35.375 18.75 35.6251V35.6876C18.9999 37.25 20 38.375 22.0625 38.6876V40.1876C22.0625 40.4375 22.25 40.625 22.5624 40.6876H23.4999C23.7499 40.6876 23.9375 40.5001 24 40.1876V38.6876C25.875 38.375 27.125 37.0625 27.125 35.375Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M19.8127 41.9375C14.9377 40.1876 12.4377 34.7501 14.2503 29.9375C15.1878 27.3125 17.2503 25.3126 19.8127 24.3751C20.0628 24.2501 20.1877 24.0626 20.1877 23.75V22.8751C20.1877 22.625 20.0628 22.4375 19.8127 22.3751C19.7502 22.3751 19.6252 22.3751 19.5627 22.4375C13.6252 24.3125 10.3752 30.6251 12.2502 36.5626C13.3752 40.0625 16.0627 42.7501 19.5627 43.8751C19.8127 44 20.0628 43.8751 20.1252 43.625C20.1877 43.5626 20.1877 43.5001 20.1877 43.3751V42.5C20.1877 42.3125 20.0002 42.0626 19.8127 41.9375ZM26.4378 22.4375C26.1877 22.3126 25.9377 22.4375 25.8753 22.6876C25.8127 22.7501 25.8127 22.8125 25.8127 22.9376V23.8126C25.8127 24.0626 26.0002 24.3125 26.1877 24.4376C31.0627 26.1875 33.5628 31.625 31.7502 36.4376C30.8127 39.0626 28.7502 41.0626 26.1877 42.0001C25.9377 42.125 25.8127 42.3125 25.8127 42.6251V43.5001C25.8127 43.7501 25.9377 43.9376 26.1877 44C26.2503 44 26.3752 44 26.4378 43.9376C32.3752 42.0626 35.6253 35.75 33.7503 29.8126C32.6253 26.2501 29.8752 23.5625 26.4378 22.4375Z"
                                                            fill="white"
                                                        />
                                                        <g clipPath="url(#clip1_5119_9307)">
                                                            <path
                                                                d="M32.5 48C35.5272 48 38 45.5228 38 42.5C38 39.4728 35.5228 37 32.5 37C29.4728 37 27 39.4772 27 42.5C27 45.5272 29.4772 48 32.5 48Z"
                                                                fill="url(#paint0_linear_5119_9307)"
                                                            />
                                                            <path
                                                                d="M34.093 43.6879L35.6506 42.7903C35.7342 42.7419 35.7826 42.6539 35.7826 42.5571V40.7619C35.7826 40.6651 35.7298 40.5771 35.6506 40.5287L34.093 39.6311C34.0094 39.5827 33.9082 39.5827 33.8246 39.6311L32.267 40.5287C32.1834 40.5771 32.135 40.6651 32.135 40.7619V43.9739L31.0438 44.6031L29.9526 43.9739V42.7155L31.0438 42.0863L31.7654 42.4999V41.6551L31.1802 41.3163C31.1406 41.2943 31.0922 41.2811 31.0482 41.2811C30.9998 41.2811 30.9558 41.2943 30.9162 41.3163L29.3586 42.2139C29.275 42.2623 29.2266 42.3503 29.2266 42.4471V44.2423C29.2266 44.3391 29.2794 44.4271 29.3586 44.4755L30.9162 45.3731C30.9998 45.4215 31.101 45.4215 31.1846 45.3731L32.7422 44.4755C32.8258 44.4271 32.8742 44.3391 32.8742 44.2423V41.0303L32.8918 41.0171L33.9654 40.3967L35.0566 41.0259V42.2843L33.9654 42.9135L33.2482 42.4999V43.3447L33.8334 43.6835C33.917 43.7319 34.0182 43.7319 34.1018 43.6835L34.093 43.6879Z"
                                                                fill="white"
                                                            />
                                                        </g>
                                                    </g>
                                                    <path
                                                        d="M45.395 18.7067H46.2505C46.4682 18.7067 46.6454 18.8749 46.6454 19.0815V26.3529C46.6454 28.6501 47.9566 30.1015 50.3967 30.1015C52.8367 30.1015 54.1479 28.6501 54.1479 26.3529V19.0815C54.1479 18.8749 54.3251 18.7067 54.5428 18.7067H55.3983C55.616 18.7067 55.7932 18.8749 55.7932 19.0815V26.3721C55.7932 29.5007 53.9859 31.4952 50.3967 31.4952C46.8074 31.4952 45.0001 29.4815 45.0001 26.3913V19.0815C44.995 18.8749 45.1722 18.7067 45.395 18.7067ZM58.3143 28.6116C58.4409 28.4579 58.6839 28.4434 58.8307 28.578C59.7166 29.395 61.0429 30.1015 62.7237 30.1015C65.0828 30.1015 65.8371 28.8952 65.8371 27.934C65.8371 26.425 64.2323 26.0116 62.4857 25.5599C60.3646 25.0312 58.0004 24.4689 58.0004 21.9987C58.0004 19.9274 59.9444 18.5144 62.5465 18.5144C64.4145 18.5144 65.8928 19.0575 66.9812 20.0139C67.1381 20.1484 67.1533 20.3791 67.0166 20.5329L66.5002 21.1336C66.3737 21.2826 66.1408 21.2922 65.994 21.1625C65.0271 20.3022 63.7513 19.9081 62.425 19.9081C60.8354 19.9081 59.7065 20.7203 59.7065 21.9026C59.7065 23.1665 61.2353 23.5414 62.9211 23.9739C65.0828 24.5218 67.5431 25.161 67.5431 27.7994C67.5431 29.6257 66.2319 31.4904 62.6629 31.4904C60.5266 31.4904 58.9167 30.7743 57.8232 29.7362C57.6815 29.6017 57.6663 29.3854 57.7929 29.2364L58.3143 28.6116ZM69.5023 19.0815C69.5023 18.8749 69.6795 18.7067 69.8971 18.7067H74.023C78.1286 18.7067 80.8117 21.4364 80.8117 24.9976C80.8117 28.578 78.1337 31.2693 74.023 31.2693H69.8971C69.6795 31.2693 69.5023 31.1011 69.5023 30.8945V19.0815ZM74.0281 29.8756C77.2427 29.8756 79.1057 27.6889 79.1057 24.9976C79.1057 22.2823 77.2984 20.1004 74.0281 20.1004H71.1526V29.8756H74.0281ZM97.2798 26.7133C97.2798 24.0749 99.1074 21.9458 102.023 21.9458C104.939 21.9458 106.767 24.0749 106.767 26.7133C106.767 29.3518 104.939 31.5 102.023 31.5C99.1074 31.5 97.2798 29.347 97.2798 26.7133ZM105.197 26.7133C105.197 24.8678 104.069 23.2098 102.023 23.2098C99.9781 23.2098 98.8289 24.8678 98.8289 26.7133C98.8289 28.578 99.9781 30.236 102.023 30.236C104.069 30.236 105.197 28.578 105.197 26.7133ZM108.194 19.6871C108.194 19.1584 108.65 18.7451 109.187 18.7451C109.744 18.7451 110.199 19.1584 110.199 19.6871C110.199 20.2157 109.744 20.6482 109.187 20.6482C108.65 20.6482 108.194 20.2109 108.194 19.6871ZM108.847 22.1717H109.541C109.759 22.1717 109.936 22.3399 109.936 22.5466V30.8945C109.936 31.1011 109.759 31.2693 109.541 31.2693H108.847C108.63 31.2693 108.453 31.1011 108.453 30.8945V22.5466C108.453 22.3399 108.63 22.1717 108.847 22.1717ZM118.512 25.3196C118.512 23.7192 117.656 23.2098 116.37 23.2098C115.201 23.2098 114.087 23.8874 113.53 24.6227V30.8945C113.53 31.1011 113.353 31.2693 113.135 31.2693H112.442C112.224 31.2693 112.047 31.1011 112.047 30.8945V22.5466C112.047 22.3399 112.224 22.1717 112.442 22.1717H113.135C113.353 22.1717 113.53 22.3399 113.53 22.5466V23.4885C114.204 22.734 115.515 21.9458 116.942 21.9458C118.947 21.9458 120 22.907 120 24.8823V30.8896C120 31.0963 119.823 31.2645 119.605 31.2645H118.912C118.694 31.2645 118.517 31.0963 118.517 30.8896L118.512 25.3196ZM84.5731 24.9976C84.5731 21.1336 87.5701 18.5 91.3213 18.5C93.5437 18.5 95.103 19.4179 96.156 20.6771C96.2876 20.8357 96.242 21.0712 96.0547 21.1721L95.3156 21.5614C95.1485 21.6527 94.9359 21.6094 94.8144 21.4701C94.0297 20.5473 92.7591 19.8985 91.3213 19.8985C88.4813 19.8985 86.2792 22.0083 86.2792 25.0024C86.2792 27.9773 88.4813 30.1063 91.3213 30.1063C92.7641 30.1063 94.0348 29.4719 94.8144 28.5348C94.9359 28.3906 95.1435 28.3521 95.3156 28.4386L96.0648 28.8279C96.2572 28.9288 96.3028 29.1691 96.1661 29.3277C95.0726 30.5965 93.5437 31.5 91.3213 31.5C87.5701 31.4952 84.5731 28.8616 84.5731 24.9976Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M48.4229 41.8486H46.5723V40.877H48.4229C48.7451 40.877 49.0055 40.8249 49.2041 40.7207C49.4027 40.6165 49.5475 40.4733 49.6387 40.291C49.7331 40.1055 49.7803 39.8939 49.7803 39.6562C49.7803 39.4316 49.7331 39.2217 49.6387 39.0264C49.5475 38.8278 49.4027 38.6683 49.2041 38.5479C49.0055 38.4274 48.7451 38.3672 48.4229 38.3672H46.9482V44.5H45.7227V37.3906H48.4229C48.973 37.3906 49.4401 37.4883 49.8242 37.6836C50.2116 37.8757 50.5062 38.1426 50.708 38.4844C50.9098 38.8229 51.0107 39.2103 51.0107 39.6465C51.0107 40.1055 50.9098 40.4993 50.708 40.8281C50.5062 41.1569 50.2116 41.4092 49.8242 41.585C49.4401 41.7607 48.973 41.8486 48.4229 41.8486ZM51.6992 41.917V41.8047C51.6992 41.4238 51.7546 41.0706 51.8652 40.7451C51.9759 40.4163 52.1354 40.1315 52.3438 39.8906C52.5553 39.6465 52.8125 39.4577 53.1152 39.3242C53.4212 39.1875 53.7663 39.1191 54.1504 39.1191C54.5378 39.1191 54.8828 39.1875 55.1855 39.3242C55.4915 39.4577 55.7503 39.6465 55.9619 39.8906C56.1735 40.1315 56.3346 40.4163 56.4453 40.7451C56.556 41.0706 56.6113 41.4238 56.6113 41.8047V41.917C56.6113 42.2979 56.556 42.651 56.4453 42.9766C56.3346 43.3021 56.1735 43.5869 55.9619 43.8311C55.7503 44.0719 55.4932 44.2607 55.1904 44.3975C54.8877 44.5309 54.5443 44.5977 54.1602 44.5977C53.7728 44.5977 53.4261 44.5309 53.1201 44.3975C52.8174 44.2607 52.5602 44.0719 52.3486 43.8311C52.137 43.5869 51.9759 43.3021 51.8652 42.9766C51.7546 42.651 51.6992 42.2979 51.6992 41.917ZM52.876 41.8047V41.917C52.876 42.1546 52.9004 42.3792 52.9492 42.5908C52.998 42.8024 53.0745 42.988 53.1787 43.1475C53.2829 43.307 53.4163 43.4323 53.5791 43.5234C53.7419 43.6146 53.9355 43.6602 54.1602 43.6602C54.3783 43.6602 54.5671 43.6146 54.7266 43.5234C54.8893 43.4323 55.0228 43.307 55.127 43.1475C55.2311 42.988 55.3076 42.8024 55.3564 42.5908C55.4085 42.3792 55.4346 42.1546 55.4346 41.917V41.8047C55.4346 41.5703 55.4085 41.349 55.3564 41.1406C55.3076 40.929 55.2295 40.7419 55.1221 40.5791C55.0179 40.4163 54.8844 40.2894 54.7217 40.1982C54.5622 40.1038 54.3717 40.0566 54.1504 40.0566C53.929 40.0566 53.737 40.1038 53.5742 40.1982C53.4147 40.2894 53.2829 40.4163 53.1787 40.5791C53.0745 40.7419 52.998 40.929 52.9492 41.1406C52.9004 41.349 52.876 41.5703 52.876 41.8047ZM58.8574 37V44.5H57.6758V37H58.8574ZM61.6797 43.9238L63.1152 39.2168H64.375L62.2559 45.3057C62.207 45.4359 62.1436 45.5775 62.0654 45.7305C61.9873 45.8835 61.8848 46.0283 61.7578 46.165C61.6341 46.305 61.4795 46.4173 61.2939 46.502C61.1084 46.5898 60.8838 46.6338 60.6201 46.6338C60.516 46.6338 60.415 46.624 60.3174 46.6045C60.223 46.5882 60.1335 46.5703 60.0488 46.5508L60.0439 45.6523C60.0765 45.6556 60.1156 45.6589 60.1611 45.6621C60.21 45.6654 60.249 45.667 60.2783 45.667C60.4736 45.667 60.6364 45.6426 60.7666 45.5938C60.8968 45.5482 61.0026 45.4733 61.084 45.3691C61.1686 45.265 61.2402 45.125 61.2988 44.9492L61.6797 43.9238ZM60.8691 39.2168L62.124 43.1719L62.334 44.4121L61.5186 44.6221L59.5996 39.2168H60.8691ZM68.3643 39.2168H69.4336V44.3535C69.4336 44.8288 69.3327 45.2324 69.1309 45.5645C68.929 45.8965 68.6475 46.1488 68.2861 46.3213C67.9248 46.4971 67.5065 46.585 67.0312 46.585C66.8294 46.585 66.6048 46.5557 66.3574 46.4971C66.1133 46.4385 65.8757 46.3441 65.6445 46.2139C65.4167 46.0869 65.2262 45.9193 65.0732 45.7109L65.625 45.0176C65.8138 45.2422 66.0221 45.4066 66.25 45.5107C66.4779 45.6149 66.7171 45.667 66.9678 45.667C67.238 45.667 67.4674 45.6165 67.6562 45.5156C67.8483 45.418 67.9964 45.2731 68.1006 45.0811C68.2048 44.889 68.2568 44.6546 68.2568 44.3779V40.4131L68.3643 39.2168ZM64.7754 41.917V41.8145C64.7754 41.4141 64.8242 41.0495 64.9219 40.7207C65.0195 40.3887 65.1595 40.1038 65.3418 39.8662C65.5241 39.6253 65.7454 39.4414 66.0059 39.3145C66.2663 39.1842 66.5609 39.1191 66.8896 39.1191C67.2314 39.1191 67.5228 39.181 67.7637 39.3047C68.0078 39.4284 68.2113 39.6058 68.374 39.8369C68.5368 40.0648 68.6637 40.3382 68.7549 40.6572C68.8493 40.973 68.9193 41.3245 68.9648 41.7119V42.0391C68.9225 42.4167 68.8509 42.7617 68.75 43.0742C68.6491 43.3867 68.5156 43.6569 68.3496 43.8848C68.1836 44.1126 67.9785 44.2884 67.7344 44.4121C67.4935 44.5358 67.2087 44.5977 66.8799 44.5977C66.5576 44.5977 66.2663 44.5309 66.0059 44.3975C65.7487 44.264 65.5273 44.0768 65.3418 43.8359C65.1595 43.5951 65.0195 43.3118 64.9219 42.9863C64.8242 42.6576 64.7754 42.3011 64.7754 41.917ZM65.9521 41.8145V41.917C65.9521 42.1579 65.9749 42.3825 66.0205 42.5908C66.0693 42.7992 66.1426 42.9831 66.2402 43.1426C66.3411 43.2988 66.4681 43.4225 66.6211 43.5137C66.7773 43.6016 66.9613 43.6455 67.1729 43.6455C67.4495 43.6455 67.6758 43.5869 67.8516 43.4697C68.0306 43.3525 68.1673 43.1947 68.2617 42.9961C68.3594 42.7943 68.4277 42.5697 68.4668 42.3223V41.4385C68.4473 41.2464 68.4066 41.0674 68.3447 40.9014C68.2861 40.7354 68.2064 40.5905 68.1055 40.4668C68.0046 40.3398 67.8776 40.2422 67.7246 40.1738C67.5716 40.1022 67.391 40.0664 67.1826 40.0664C66.971 40.0664 66.7871 40.112 66.6309 40.2031C66.4746 40.2943 66.346 40.4196 66.2451 40.5791C66.1475 40.7386 66.0742 40.9242 66.0254 41.1357C65.9766 41.3473 65.9521 41.5736 65.9521 41.8145ZM70.4297 41.917V41.8047C70.4297 41.4238 70.485 41.0706 70.5957 40.7451C70.7064 40.4163 70.8659 40.1315 71.0742 39.8906C71.2858 39.6465 71.543 39.4577 71.8457 39.3242C72.1517 39.1875 72.4967 39.1191 72.8809 39.1191C73.2682 39.1191 73.6133 39.1875 73.916 39.3242C74.222 39.4577 74.4808 39.6465 74.6924 39.8906C74.904 40.1315 75.0651 40.4163 75.1758 40.7451C75.2865 41.0706 75.3418 41.4238 75.3418 41.8047V41.917C75.3418 42.2979 75.2865 42.651 75.1758 42.9766C75.0651 43.3021 74.904 43.5869 74.6924 43.8311C74.4808 44.0719 74.2236 44.2607 73.9209 44.3975C73.6182 44.5309 73.2747 44.5977 72.8906 44.5977C72.5033 44.5977 72.1566 44.5309 71.8506 44.3975C71.5479 44.2607 71.2907 44.0719 71.0791 43.8311C70.8675 43.5869 70.7064 43.3021 70.5957 42.9766C70.485 42.651 70.4297 42.2979 70.4297 41.917ZM71.6064 41.8047V41.917C71.6064 42.1546 71.6309 42.3792 71.6797 42.5908C71.7285 42.8024 71.805 42.988 71.9092 43.1475C72.0133 43.307 72.1468 43.4323 72.3096 43.5234C72.4723 43.6146 72.666 43.6602 72.8906 43.6602C73.1087 43.6602 73.2975 43.6146 73.457 43.5234C73.6198 43.4323 73.7533 43.307 73.8574 43.1475C73.9616 42.988 74.0381 42.8024 74.0869 42.5908C74.139 42.3792 74.165 42.1546 74.165 41.917V41.8047C74.165 41.5703 74.139 41.349 74.0869 41.1406C74.0381 40.929 73.96 40.7419 73.8525 40.5791C73.7484 40.4163 73.6149 40.2894 73.4521 40.1982C73.2926 40.1038 73.1022 40.0566 72.8809 40.0566C72.6595 40.0566 72.4674 40.1038 72.3047 40.1982C72.1452 40.2894 72.0133 40.4163 71.9092 40.5791C71.805 40.7419 71.7285 40.929 71.6797 41.1406C71.6309 41.349 71.6064 41.5703 71.6064 41.8047ZM77.4951 40.3447V44.5H76.3184V39.2168H77.4268L77.4951 40.3447ZM77.2852 41.6631L76.9043 41.6582C76.9076 41.2839 76.9596 40.9404 77.0605 40.6279C77.1647 40.3154 77.3079 40.0469 77.4902 39.8223C77.6758 39.5977 77.8971 39.4251 78.1543 39.3047C78.4115 39.181 78.6979 39.1191 79.0137 39.1191C79.2676 39.1191 79.4971 39.1549 79.7021 39.2266C79.9105 39.2949 80.0879 39.4072 80.2344 39.5635C80.3841 39.7197 80.498 39.9232 80.5762 40.1738C80.6543 40.4212 80.6934 40.7256 80.6934 41.0869V44.5H79.5117V41.082C79.5117 40.8281 79.4743 40.6279 79.3994 40.4814C79.3278 40.3317 79.222 40.2259 79.082 40.1641C78.9453 40.099 78.7744 40.0664 78.5693 40.0664C78.3675 40.0664 78.1868 40.1087 78.0273 40.1934C77.8678 40.278 77.7327 40.3936 77.6221 40.54C77.5146 40.6865 77.4316 40.8558 77.373 41.0479C77.3145 41.2399 77.2852 41.445 77.2852 41.6631Z"
                                                        fill="white"
                                                    />
                                                    <defs>
                                                        <linearGradient
                                                            id="paint0_linear_5119_9307"
                                                            x1="24.9882"
                                                            y1="37.8933"
                                                            x2="36.3314"
                                                            y2="44.8497"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop stopColor="#A229C5"/>
                                                            <stop offset={1} stopColor="#7B3FE4"/>
                                                        </linearGradient>
                                                        <clipPath id="clip0_5119_9307">
                                                            <rect
                                                                width={30}
                                                                height={30}
                                                                fill="white"
                                                                transform="translate(8 18)"
                                                            />
                                                        </clipPath>
                                                        <clipPath id="clip1_5119_9307">
                                                            <rect
                                                                width={11}
                                                                height={11}
                                                                fill="white"
                                                                transform="translate(27 37)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_USD Coin (TRC20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(33, 84, 229)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#2154E5"/>
                                                    <g clipPath="url(#clip0_5119_9305)">
                                                        <path
                                                            d="M23 48C31.3125 48 38 41.3125 38 33C38 24.6875 31.3125 18 23 18C14.6875 18 8 24.6875 8 33C8 41.3125 14.6875 48 23 48Z"
                                                            fill="#2775CA"
                                                        />
                                                        <path
                                                            d="M27.125 35.375C27.125 33.1875 25.8125 32.4375 23.1875 32.1251C21.3125 31.875 20.9375 31.3751 20.9375 30.5C20.9375 29.6249 21.5625 29.0626 22.8125 29.0626C23.9375 29.0626 24.5625 29.4376 24.875 30.3751C24.9375 30.5626 25.125 30.6875 25.3125 30.6875H26.3124C26.5624 30.6875 26.75 30.5 26.75 30.2501V30.1876C26.4999 28.8125 25.3749 27.75 23.9375 27.6251V26.1251C23.9375 25.875 23.75 25.6875 23.4375 25.625H22.5C22.25 25.625 22.0625 25.8125 21.9999 26.1251V27.5626C20.1249 27.8126 18.9375 29.0625 18.9375 30.6251C18.9375 32.6876 20.1875 33.5 22.8125 33.8126C24.5625 34.1251 25.125 34.5001 25.125 35.5001C25.125 36.5002 24.2499 37.1876 23.0625 37.1876C21.4374 37.1876 20.8749 36.5 20.6874 35.5625C20.625 35.3126 20.4375 35.1875 20.25 35.1875H19.1874C18.9375 35.1875 18.75 35.375 18.75 35.6251V35.6876C18.9999 37.25 20 38.375 22.0625 38.6876V40.1876C22.0625 40.4375 22.25 40.625 22.5624 40.6876H23.4999C23.7499 40.6876 23.9375 40.5001 24 40.1876V38.6876C25.875 38.375 27.125 37.0625 27.125 35.375Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M19.8127 41.9375C14.9377 40.1876 12.4377 34.7501 14.2503 29.9375C15.1878 27.3125 17.2503 25.3126 19.8127 24.3751C20.0628 24.2501 20.1877 24.0626 20.1877 23.75V22.8751C20.1877 22.625 20.0628 22.4375 19.8127 22.3751C19.7502 22.3751 19.6252 22.3751 19.5627 22.4375C13.6252 24.3125 10.3752 30.6251 12.2502 36.5626C13.3752 40.0625 16.0627 42.7501 19.5627 43.8751C19.8127 44 20.0628 43.8751 20.1252 43.625C20.1877 43.5626 20.1877 43.5001 20.1877 43.3751V42.5C20.1877 42.3125 20.0002 42.0626 19.8127 41.9375ZM26.4378 22.4375C26.1877 22.3126 25.9377 22.4375 25.8753 22.6876C25.8127 22.7501 25.8127 22.8125 25.8127 22.9376V23.8126C25.8127 24.0626 26.0002 24.3125 26.1877 24.4376C31.0627 26.1875 33.5628 31.625 31.7502 36.4376C30.8127 39.0626 28.7502 41.0626 26.1877 42.0001C25.9377 42.125 25.8127 42.3125 25.8127 42.6251V43.5001C25.8127 43.7501 25.9377 43.9376 26.1877 44C26.2503 44 26.3752 44 26.4378 43.9376C32.3752 42.0626 35.6253 35.75 33.7503 29.8126C32.6253 26.2501 29.8752 23.5625 26.4378 22.4375Z"
                                                            fill="white"
                                                        />
                                                        <circle cx="32.5" cy="42.5" r="5.5" fill="#FF060A"/>
                                                        <path
                                                            d="M36.4973 41.444C36.1276 41.1016 35.6163 40.5787 35.1998 40.2079L35.1752 40.1906C35.1342 40.1575 35.0879 40.1316 35.0384 40.1139V40.1139C34.0342 39.926 29.3608 39.0496 29.2696 39.0608C29.244 39.0644 29.2196 39.0737 29.1981 39.088L29.1747 39.1065C29.1459 39.1359 29.124 39.1714 29.1107 39.2103L29.1045 39.2264V39.3142V39.3278C29.6306 40.7975 31.708 45.612 32.117 46.7418C32.1417 46.8185 32.1885 46.9643 32.276 46.9717H32.2957C32.3425 46.9717 32.5421 46.7072 32.5421 46.7072C32.5421 46.7072 36.1104 42.3661 36.4714 41.9038C36.5181 41.8468 36.5594 41.7856 36.5946 41.7208C36.6036 41.6702 36.5993 41.6181 36.5823 41.5695C36.5652 41.521 36.5359 41.4777 36.4973 41.444V41.444ZM33.4576 41.9495L34.9805 40.6825L35.8738 41.5082L33.4576 41.9495ZM32.8662 41.8667L30.2442 39.711L34.4864 40.4959L32.8662 41.8667ZM33.1027 42.4316L35.7863 41.9977L32.7183 45.706L33.1027 42.4316ZM29.8881 39.926L32.6469 42.2746L32.2476 45.7085L29.8881 39.926Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <path
                                                        d="M45.395 18.7067H46.2505C46.4682 18.7067 46.6454 18.8749 46.6454 19.0815V26.3529C46.6454 28.6501 47.9566 30.1015 50.3967 30.1015C52.8367 30.1015 54.1479 28.6501 54.1479 26.3529V19.0815C54.1479 18.8749 54.3251 18.7067 54.5428 18.7067H55.3983C55.616 18.7067 55.7932 18.8749 55.7932 19.0815V26.3721C55.7932 29.5007 53.9859 31.4952 50.3967 31.4952C46.8074 31.4952 45.0001 29.4815 45.0001 26.3913V19.0815C44.995 18.8749 45.1722 18.7067 45.395 18.7067ZM58.3143 28.6116C58.4409 28.4579 58.6839 28.4434 58.8307 28.578C59.7166 29.395 61.0429 30.1015 62.7237 30.1015C65.0828 30.1015 65.8371 28.8952 65.8371 27.934C65.8371 26.425 64.2323 26.0116 62.4857 25.5599C60.3646 25.0312 58.0004 24.4689 58.0004 21.9987C58.0004 19.9274 59.9444 18.5144 62.5465 18.5144C64.4145 18.5144 65.8928 19.0575 66.9812 20.0139C67.1381 20.1484 67.1533 20.3791 67.0166 20.5329L66.5002 21.1336C66.3737 21.2826 66.1408 21.2922 65.994 21.1625C65.0271 20.3022 63.7513 19.9081 62.425 19.9081C60.8354 19.9081 59.7065 20.7203 59.7065 21.9026C59.7065 23.1665 61.2353 23.5414 62.9211 23.9739C65.0828 24.5218 67.5431 25.161 67.5431 27.7994C67.5431 29.6257 66.2319 31.4904 62.6629 31.4904C60.5266 31.4904 58.9167 30.7743 57.8232 29.7362C57.6815 29.6017 57.6663 29.3854 57.7929 29.2364L58.3143 28.6116ZM69.5023 19.0815C69.5023 18.8749 69.6795 18.7067 69.8971 18.7067H74.023C78.1286 18.7067 80.8117 21.4364 80.8117 24.9976C80.8117 28.578 78.1337 31.2693 74.023 31.2693H69.8971C69.6795 31.2693 69.5023 31.1011 69.5023 30.8945V19.0815ZM74.0281 29.8756C77.2427 29.8756 79.1057 27.6889 79.1057 24.9976C79.1057 22.2823 77.2984 20.1004 74.0281 20.1004H71.1526V29.8756H74.0281ZM97.2798 26.7133C97.2798 24.0749 99.1074 21.9458 102.023 21.9458C104.939 21.9458 106.767 24.0749 106.767 26.7133C106.767 29.3518 104.939 31.5 102.023 31.5C99.1074 31.5 97.2798 29.347 97.2798 26.7133ZM105.197 26.7133C105.197 24.8678 104.069 23.2098 102.023 23.2098C99.9781 23.2098 98.8289 24.8678 98.8289 26.7133C98.8289 28.578 99.9781 30.236 102.023 30.236C104.069 30.236 105.197 28.578 105.197 26.7133ZM108.194 19.6871C108.194 19.1584 108.65 18.7451 109.187 18.7451C109.744 18.7451 110.199 19.1584 110.199 19.6871C110.199 20.2157 109.744 20.6482 109.187 20.6482C108.65 20.6482 108.194 20.2109 108.194 19.6871ZM108.847 22.1717H109.541C109.759 22.1717 109.936 22.3399 109.936 22.5466V30.8945C109.936 31.1011 109.759 31.2693 109.541 31.2693H108.847C108.63 31.2693 108.453 31.1011 108.453 30.8945V22.5466C108.453 22.3399 108.63 22.1717 108.847 22.1717ZM118.512 25.3196C118.512 23.7192 117.656 23.2098 116.37 23.2098C115.201 23.2098 114.087 23.8874 113.53 24.6227V30.8945C113.53 31.1011 113.353 31.2693 113.135 31.2693H112.442C112.224 31.2693 112.047 31.1011 112.047 30.8945V22.5466C112.047 22.3399 112.224 22.1717 112.442 22.1717H113.135C113.353 22.1717 113.53 22.3399 113.53 22.5466V23.4885C114.204 22.734 115.515 21.9458 116.942 21.9458C118.947 21.9458 120 22.907 120 24.8823V30.8896C120 31.0963 119.823 31.2645 119.605 31.2645H118.912C118.694 31.2645 118.517 31.0963 118.517 30.8896L118.512 25.3196ZM84.5731 24.9976C84.5731 21.1336 87.5701 18.5 91.3213 18.5C93.5437 18.5 95.103 19.4179 96.156 20.6771C96.2876 20.8357 96.242 21.0712 96.0547 21.1721L95.3156 21.5614C95.1485 21.6527 94.9359 21.6094 94.8144 21.4701C94.0297 20.5473 92.7591 19.8985 91.3213 19.8985C88.4813 19.8985 86.2792 22.0083 86.2792 25.0024C86.2792 27.9773 88.4813 30.1063 91.3213 30.1063C92.7641 30.1063 94.0348 29.4719 94.8144 28.5348C94.9359 28.3906 95.1435 28.3521 95.3156 28.4386L96.0648 28.8279C96.2572 28.9288 96.3028 29.1691 96.1661 29.3277C95.0726 30.5965 93.5437 31.5 91.3213 31.5C87.5701 31.4952 84.5731 28.8616 84.5731 24.9976Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M48.6475 37.3906V44.5H47.4316V37.3906H48.6475ZM50.8789 37.3906V38.3672H45.2197V37.3906H50.8789ZM51.8164 37.3906H54.3311C54.8714 37.3906 55.332 37.472 55.7129 37.6348C56.0938 37.7975 56.3851 38.0384 56.5869 38.3574C56.792 38.6732 56.8945 39.0638 56.8945 39.5293C56.8945 39.8841 56.8294 40.1966 56.6992 40.4668C56.569 40.737 56.3851 40.9648 56.1475 41.1504C55.9098 41.3327 55.6266 41.4743 55.2979 41.5752L54.9268 41.7559H52.666L52.6562 40.7842H54.3506C54.6436 40.7842 54.8877 40.7321 55.083 40.6279C55.2783 40.5238 55.4248 40.3822 55.5225 40.2031C55.6234 40.0208 55.6738 39.8158 55.6738 39.5879C55.6738 39.3405 55.625 39.1257 55.5273 38.9434C55.4329 38.7578 55.2865 38.6162 55.0879 38.5186C54.8893 38.4176 54.637 38.3672 54.3311 38.3672H53.042V44.5H51.8164V37.3906ZM55.874 44.5L54.2041 41.3066L55.4883 41.3018L57.1826 44.4365V44.5H55.874ZM62.3145 42.1855H63.5352C63.4961 42.651 63.3659 43.0661 63.1445 43.4307C62.9232 43.792 62.6123 44.0768 62.2119 44.2852C61.8115 44.4935 61.3249 44.5977 60.752 44.5977C60.3125 44.5977 59.917 44.5195 59.5654 44.3633C59.2139 44.2038 58.9128 43.9792 58.6621 43.6895C58.4115 43.3965 58.2194 43.0433 58.0859 42.6299C57.9557 42.2165 57.8906 41.7542 57.8906 41.2432V40.6523C57.8906 40.1413 57.9574 39.679 58.0908 39.2656C58.2275 38.8522 58.4229 38.499 58.6768 38.2061C58.9307 37.9098 59.235 37.6836 59.5898 37.5273C59.9479 37.3711 60.3499 37.293 60.7959 37.293C61.3623 37.293 61.8408 37.3971 62.2314 37.6055C62.6221 37.8138 62.9248 38.1019 63.1396 38.4697C63.3577 38.8376 63.4912 39.2591 63.54 39.7344H62.3193C62.2868 39.4284 62.2152 39.1663 62.1045 38.9482C61.9971 38.7301 61.8376 38.5641 61.626 38.4502C61.4144 38.333 61.1377 38.2744 60.7959 38.2744C60.516 38.2744 60.2718 38.3265 60.0635 38.4307C59.8551 38.5348 59.681 38.6878 59.541 38.8896C59.401 39.0915 59.2952 39.3405 59.2236 39.6367C59.1553 39.9297 59.1211 40.265 59.1211 40.6426V41.2432C59.1211 41.6012 59.152 41.9268 59.2139 42.2197C59.279 42.5094 59.3766 42.7585 59.5068 42.9668C59.6403 43.1751 59.8096 43.3363 60.0146 43.4502C60.2197 43.5641 60.4655 43.6211 60.752 43.6211C61.1003 43.6211 61.3818 43.5658 61.5967 43.4551C61.8148 43.3444 61.9792 43.1833 62.0898 42.9717C62.2038 42.7568 62.2786 42.4948 62.3145 42.1855ZM69.2285 43.5625V44.5H64.4629V43.6943L66.7773 41.1699C67.0312 40.8835 67.2314 40.6361 67.3779 40.4277C67.5244 40.2194 67.627 40.0322 67.6855 39.8662C67.7474 39.6969 67.7783 39.5326 67.7783 39.373C67.7783 39.1484 67.736 38.9515 67.6514 38.7822C67.57 38.6097 67.4495 38.4746 67.29 38.377C67.1305 38.276 66.9368 38.2256 66.709 38.2256C66.4453 38.2256 66.224 38.2826 66.0449 38.3965C65.8659 38.5104 65.7308 38.6683 65.6396 38.8701C65.5485 39.0687 65.5029 39.2965 65.5029 39.5537H64.3262C64.3262 39.1403 64.4206 38.7627 64.6094 38.4209C64.7982 38.0758 65.0716 37.8024 65.4297 37.6006C65.7878 37.3955 66.2191 37.293 66.7236 37.293C67.1989 37.293 67.6025 37.3727 67.9346 37.5322C68.2666 37.6917 68.5189 37.918 68.6914 38.2109C68.8672 38.5039 68.9551 38.8506 68.9551 39.251C68.9551 39.4723 68.9193 39.6921 68.8477 39.9102C68.776 40.1283 68.6735 40.3464 68.54 40.5645C68.4098 40.7793 68.2552 40.9958 68.0762 41.2139C67.8971 41.4287 67.7002 41.6468 67.4854 41.8682L65.9473 43.5625H69.2285ZM74.7803 40.3496V41.5117C74.7803 42.0684 74.7249 42.5436 74.6143 42.9375C74.5068 43.3281 74.3506 43.6455 74.1455 43.8896C73.9404 44.1338 73.6947 44.3128 73.4082 44.4268C73.125 44.5407 72.8076 44.5977 72.4561 44.5977C72.1761 44.5977 71.9157 44.5618 71.6748 44.4902C71.4372 44.4186 71.2223 44.3063 71.0303 44.1533C70.8382 44.0003 70.6738 43.8034 70.5371 43.5625C70.4036 43.3184 70.2995 43.027 70.2246 42.6885C70.153 42.3499 70.1172 41.9577 70.1172 41.5117V40.3496C70.1172 39.7897 70.1725 39.3177 70.2832 38.9336C70.3939 38.5462 70.5518 38.2321 70.7568 37.9912C70.9619 37.7471 71.2061 37.5697 71.4893 37.459C71.7757 37.3483 72.0947 37.293 72.4463 37.293C72.7295 37.293 72.9899 37.3288 73.2275 37.4004C73.4684 37.4688 73.6833 37.5778 73.8721 37.7275C74.0641 37.8773 74.2269 38.0726 74.3604 38.3135C74.4971 38.5511 74.6012 38.8392 74.6729 39.1777C74.7445 39.513 74.7803 39.9036 74.7803 40.3496ZM73.6035 41.6777V40.1738C73.6035 39.8906 73.5872 39.6416 73.5547 39.4268C73.5221 39.2087 73.4733 39.0247 73.4082 38.875C73.3464 38.722 73.2682 38.5983 73.1738 38.5039C73.0794 38.4062 72.972 38.3363 72.8516 38.2939C72.7311 38.2484 72.596 38.2256 72.4463 38.2256C72.264 38.2256 72.1012 38.2614 71.958 38.333C71.8148 38.4014 71.6943 38.512 71.5967 38.665C71.499 38.818 71.4242 39.0199 71.3721 39.2705C71.3232 39.5179 71.2988 39.819 71.2988 40.1738V41.6777C71.2988 41.9642 71.3151 42.2165 71.3477 42.4346C71.3802 42.6527 71.429 42.8398 71.4941 42.9961C71.5592 43.1491 71.6374 43.276 71.7285 43.377C71.8229 43.4746 71.9303 43.5462 72.0508 43.5918C72.1745 43.6374 72.3096 43.6602 72.4561 43.6602C72.6416 43.6602 72.806 43.6243 72.9492 43.5527C73.0924 43.4811 73.2129 43.3672 73.3105 43.2109C73.4082 43.0514 73.4814 42.8447 73.5303 42.5908C73.5791 42.3369 73.6035 42.0326 73.6035 41.6777Z"
                                                        fill="white"
                                                    />
                                                    <defs>
                                                        <clipPath id="clip0_5119_9305">
                                                            <rect
                                                                width={30}
                                                                height={30}
                                                                fill="white"
                                                                transform="translate(8 18)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                        <li
                                            data-test="psp_icon_USD Coin (BSC BEP-20)"
                                            className="p-home-m-payments__item p-home-m-payments__item--hidden"
                                            style={{background: "rgb(33, 84, 229)"}}
                                        >
                                            <button type="button">
                                                <svg
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 128 64"
                                                >
                                                    <rect width={128} height={64} rx={16} fill="#2154E5"/>
                                                    <g clipPath="url(#clip0_5119_9306)">
                                                        <path
                                                            d="M23 48C31.3125 48 38 41.3125 38 33C38 24.6875 31.3125 18 23 18C14.6875 18 8 24.6875 8 33C8 41.3125 14.6875 48 23 48Z"
                                                            fill="#2775CA"
                                                        />
                                                        <path
                                                            d="M27.125 35.375C27.125 33.1875 25.8125 32.4375 23.1875 32.1251C21.3125 31.875 20.9375 31.3751 20.9375 30.5C20.9375 29.6249 21.5625 29.0626 22.8125 29.0626C23.9375 29.0626 24.5625 29.4376 24.875 30.3751C24.9375 30.5626 25.125 30.6875 25.3125 30.6875H26.3124C26.5624 30.6875 26.75 30.5 26.75 30.2501V30.1876C26.4999 28.8125 25.3749 27.75 23.9375 27.6251V26.1251C23.9375 25.875 23.75 25.6875 23.4375 25.625H22.5C22.25 25.625 22.0625 25.8125 21.9999 26.1251V27.5626C20.1249 27.8126 18.9375 29.0625 18.9375 30.6251C18.9375 32.6876 20.1875 33.5 22.8125 33.8126C24.5625 34.1251 25.125 34.5001 25.125 35.5001C25.125 36.5002 24.2499 37.1876 23.0625 37.1876C21.4374 37.1876 20.8749 36.5 20.6874 35.5625C20.625 35.3126 20.4375 35.1875 20.25 35.1875H19.1874C18.9375 35.1875 18.75 35.375 18.75 35.6251V35.6876C18.9999 37.25 20 38.375 22.0625 38.6876V40.1876C22.0625 40.4375 22.25 40.625 22.5624 40.6876H23.4999C23.7499 40.6876 23.9375 40.5001 24 40.1876V38.6876C25.875 38.375 27.125 37.0625 27.125 35.375Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M19.8127 41.9375C14.9377 40.1876 12.4377 34.7501 14.2503 29.9375C15.1878 27.3125 17.2503 25.3126 19.8127 24.3751C20.0628 24.2501 20.1877 24.0626 20.1877 23.75V22.8751C20.1877 22.625 20.0628 22.4375 19.8127 22.3751C19.7502 22.3751 19.6252 22.3751 19.5627 22.4375C13.6252 24.3125 10.3752 30.6251 12.2502 36.5626C13.3752 40.0625 16.0627 42.7501 19.5627 43.8751C19.8127 44 20.0628 43.8751 20.1252 43.625C20.1877 43.5626 20.1877 43.5001 20.1877 43.3751V42.5C20.1877 42.3125 20.0002 42.0626 19.8127 41.9375ZM26.4378 22.4375C26.1877 22.3126 25.9377 22.4375 25.8753 22.6876C25.8127 22.7501 25.8127 22.8125 25.8127 22.9376V23.8126C25.8127 24.0626 26.0002 24.3125 26.1877 24.4376C31.0627 26.1875 33.5628 31.625 31.7502 36.4376C30.8127 39.0626 28.7502 41.0626 26.1877 42.0001C25.9377 42.125 25.8127 42.3125 25.8127 42.6251V43.5001C25.8127 43.7501 25.9377 43.9376 26.1877 44C26.2503 44 26.3752 44 26.4378 43.9376C32.3752 42.0626 35.6253 35.75 33.7503 29.8126C32.6253 26.2501 29.8752 23.5625 26.4378 22.4375Z"
                                                            fill="white"
                                                        />
                                                        <g clipPath="url(#clip1_5119_9306)">
                                                            <path
                                                                d="M32.5 48C35.5376 48 38 45.5376 38 42.5C38 39.4624 35.5376 37 32.5 37C29.4624 37 27 39.4624 27 42.5C27 45.5376 29.4624 48 32.5 48Z"
                                                                fill="#F3BA2F"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M33.9263 43.0854L34.756 43.9126L32.5007 46.1655L30.2477 43.9126L31.0774 43.0854L32.5007 44.5086L33.9263 43.0854ZM32.5007 41.6597L33.3422 42.5013L32.5007 43.3428L31.6615 42.5036V42.5013L31.8093 42.3535L31.8808 42.2819L32.5007 41.6597ZM29.6636 41.6716L30.4933 42.5013L29.6636 43.3285L28.834 42.4989L29.6636 41.6716ZM35.3377 41.6716L36.1673 42.5013L35.3377 43.3285L34.508 42.4989L35.3377 41.6716ZM32.5007 38.8346L34.7536 41.0875L33.9239 41.9172L32.5007 40.4915L31.0774 41.9148L30.2477 41.0875L32.5007 38.8346Z"
                                                                fill="#131415"
                                                            />
                                                        </g>
                                                    </g>
                                                    <path
                                                        d="M45.395 18.7067H46.2505C46.4682 18.7067 46.6454 18.8749 46.6454 19.0815V26.3529C46.6454 28.6501 47.9566 30.1015 50.3967 30.1015C52.8367 30.1015 54.1479 28.6501 54.1479 26.3529V19.0815C54.1479 18.8749 54.3251 18.7067 54.5428 18.7067H55.3983C55.616 18.7067 55.7932 18.8749 55.7932 19.0815V26.3721C55.7932 29.5007 53.9859 31.4952 50.3967 31.4952C46.8074 31.4952 45.0001 29.4815 45.0001 26.3913V19.0815C44.995 18.8749 45.1722 18.7067 45.395 18.7067ZM58.3143 28.6116C58.4409 28.4579 58.6839 28.4434 58.8307 28.578C59.7166 29.395 61.0429 30.1015 62.7237 30.1015C65.0828 30.1015 65.8371 28.8952 65.8371 27.934C65.8371 26.425 64.2323 26.0116 62.4857 25.5599C60.3646 25.0312 58.0004 24.4689 58.0004 21.9987C58.0004 19.9274 59.9444 18.5144 62.5465 18.5144C64.4145 18.5144 65.8928 19.0575 66.9812 20.0139C67.1381 20.1484 67.1533 20.3791 67.0166 20.5329L66.5002 21.1336C66.3737 21.2826 66.1408 21.2922 65.994 21.1625C65.0271 20.3022 63.7513 19.9081 62.425 19.9081C60.8354 19.9081 59.7065 20.7203 59.7065 21.9026C59.7065 23.1665 61.2353 23.5414 62.9211 23.9739C65.0828 24.5218 67.5431 25.161 67.5431 27.7994C67.5431 29.6257 66.2319 31.4904 62.6629 31.4904C60.5266 31.4904 58.9167 30.7743 57.8232 29.7362C57.6815 29.6017 57.6663 29.3854 57.7929 29.2364L58.3143 28.6116ZM69.5023 19.0815C69.5023 18.8749 69.6795 18.7067 69.8971 18.7067H74.023C78.1286 18.7067 80.8117 21.4364 80.8117 24.9976C80.8117 28.578 78.1337 31.2693 74.023 31.2693H69.8971C69.6795 31.2693 69.5023 31.1011 69.5023 30.8945V19.0815ZM74.0281 29.8756C77.2427 29.8756 79.1057 27.6889 79.1057 24.9976C79.1057 22.2823 77.2984 20.1004 74.0281 20.1004H71.1526V29.8756H74.0281ZM97.2798 26.7133C97.2798 24.0749 99.1074 21.9458 102.023 21.9458C104.939 21.9458 106.767 24.0749 106.767 26.7133C106.767 29.3518 104.939 31.5 102.023 31.5C99.1074 31.5 97.2798 29.347 97.2798 26.7133ZM105.197 26.7133C105.197 24.8678 104.069 23.2098 102.023 23.2098C99.9781 23.2098 98.8289 24.8678 98.8289 26.7133C98.8289 28.578 99.9781 30.236 102.023 30.236C104.069 30.236 105.197 28.578 105.197 26.7133ZM108.194 19.6871C108.194 19.1584 108.65 18.7451 109.187 18.7451C109.744 18.7451 110.199 19.1584 110.199 19.6871C110.199 20.2157 109.744 20.6482 109.187 20.6482C108.65 20.6482 108.194 20.2109 108.194 19.6871ZM108.847 22.1717H109.541C109.759 22.1717 109.936 22.3399 109.936 22.5466V30.8945C109.936 31.1011 109.759 31.2693 109.541 31.2693H108.847C108.63 31.2693 108.453 31.1011 108.453 30.8945V22.5466C108.453 22.3399 108.63 22.1717 108.847 22.1717ZM118.512 25.3196C118.512 23.7192 117.656 23.2098 116.37 23.2098C115.201 23.2098 114.087 23.8874 113.53 24.6227V30.8945C113.53 31.1011 113.353 31.2693 113.135 31.2693H112.442C112.224 31.2693 112.047 31.1011 112.047 30.8945V22.5466C112.047 22.3399 112.224 22.1717 112.442 22.1717H113.135C113.353 22.1717 113.53 22.3399 113.53 22.5466V23.4885C114.204 22.734 115.515 21.9458 116.942 21.9458C118.947 21.9458 120 22.907 120 24.8823V30.8896C120 31.0963 119.823 31.2645 119.605 31.2645H118.912C118.694 31.2645 118.517 31.0963 118.517 30.8896L118.512 25.3196ZM84.5731 24.9976C84.5731 21.1336 87.5701 18.5 91.3213 18.5C93.5437 18.5 95.103 19.4179 96.156 20.6771C96.2876 20.8357 96.242 21.0712 96.0547 21.1721L95.3156 21.5614C95.1485 21.6527 94.9359 21.6094 94.8144 21.4701C94.0297 20.5473 92.7591 19.8985 91.3213 19.8985C88.4813 19.8985 86.2792 22.0083 86.2792 25.0024C86.2792 27.9773 88.4813 30.1063 91.3213 30.1063C92.7641 30.1063 94.0348 29.4719 94.8144 28.5348C94.9359 28.3906 95.1435 28.3521 95.3156 28.4386L96.0648 28.8279C96.2572 28.9288 96.3028 29.1691 96.1661 29.3277C95.0726 30.5965 93.5437 31.5 91.3213 31.5C87.5701 31.4952 84.5731 28.8616 84.5731 24.9976Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M48.3887 41.2871H46.5771L46.5674 40.3936H48.1494C48.4163 40.3936 48.6426 40.3545 48.8281 40.2764C49.0169 40.195 49.1602 40.0794 49.2578 39.9297C49.3555 39.7767 49.4043 39.5928 49.4043 39.3779C49.4043 39.1403 49.3587 38.9466 49.2676 38.7969C49.1764 38.6471 49.0365 38.5381 48.8477 38.4697C48.6621 38.4014 48.4245 38.3672 48.1348 38.3672H46.9482V44.5H45.7227V37.3906H48.1348C48.5254 37.3906 48.8737 37.4281 49.1797 37.5029C49.4889 37.5778 49.751 37.695 49.9658 37.8545C50.1839 38.0107 50.3483 38.2093 50.459 38.4502C50.5729 38.6911 50.6299 38.9775 50.6299 39.3096C50.6299 39.6025 50.5599 39.8711 50.4199 40.1152C50.2799 40.3561 50.0732 40.5531 49.7998 40.7061C49.5264 40.859 49.1862 40.9502 48.7793 40.9795L48.3887 41.2871ZM48.335 44.5H46.1914L46.7432 43.5283H48.335C48.6117 43.5283 48.8428 43.4827 49.0283 43.3916C49.2139 43.2972 49.3522 43.1686 49.4434 43.0059C49.5378 42.8398 49.585 42.6462 49.585 42.4248C49.585 42.1937 49.5443 41.9935 49.4629 41.8242C49.3815 41.6517 49.2529 41.5199 49.0771 41.4287C48.9014 41.3343 48.6719 41.2871 48.3887 41.2871H47.0117L47.0215 40.3936H48.8135L49.0918 40.7305C49.4824 40.7435 49.8031 40.8298 50.0537 40.9893C50.3076 41.1488 50.4964 41.3555 50.6201 41.6094C50.7438 41.8633 50.8057 42.1367 50.8057 42.4297C50.8057 42.8822 50.7064 43.2614 50.5078 43.5674C50.3125 43.8734 50.0309 44.1061 49.6631 44.2656C49.2952 44.4219 48.8525 44.5 48.335 44.5ZM56.6943 43.5283V44.5H52.9199V43.5283H56.6943ZM53.2666 37.3906V44.5H52.041V37.3906H53.2666ZM56.2012 40.3594V41.3164H52.9199V40.3594H56.2012ZM56.6699 37.3906V38.3672H52.9199V37.3906H56.6699ZM60.3955 41.8486H58.5449V40.877H60.3955C60.7178 40.877 60.9782 40.8249 61.1768 40.7207C61.3753 40.6165 61.5202 40.4733 61.6113 40.291C61.7057 40.1055 61.7529 39.8939 61.7529 39.6562C61.7529 39.4316 61.7057 39.2217 61.6113 39.0264C61.5202 38.8278 61.3753 38.6683 61.1768 38.5479C60.9782 38.4274 60.7178 38.3672 60.3955 38.3672H58.9209V44.5H57.6953V37.3906H60.3955C60.9456 37.3906 61.4128 37.4883 61.7969 37.6836C62.1842 37.8757 62.4788 38.1426 62.6807 38.4844C62.8825 38.8229 62.9834 39.2103 62.9834 39.6465C62.9834 40.1055 62.8825 40.4993 62.6807 40.8281C62.4788 41.1569 62.1842 41.4092 61.7969 41.585C61.4128 41.7607 60.9456 41.8486 60.3955 41.8486ZM68.6621 43.5625V44.5H63.8965V43.6943L66.2109 41.1699C66.4648 40.8835 66.665 40.6361 66.8115 40.4277C66.958 40.2194 67.0605 40.0322 67.1191 39.8662C67.181 39.6969 67.2119 39.5326 67.2119 39.373C67.2119 39.1484 67.1696 38.9515 67.085 38.7822C67.0036 38.6097 66.8831 38.4746 66.7236 38.377C66.5641 38.276 66.3704 38.2256 66.1426 38.2256C65.8789 38.2256 65.6576 38.2826 65.4785 38.3965C65.2995 38.5104 65.1644 38.6683 65.0732 38.8701C64.9821 39.0687 64.9365 39.2965 64.9365 39.5537H63.7598C63.7598 39.1403 63.8542 38.7627 64.043 38.4209C64.2318 38.0758 64.5052 37.8024 64.8633 37.6006C65.2214 37.3955 65.6527 37.293 66.1572 37.293C66.6325 37.293 67.0361 37.3727 67.3682 37.5322C67.7002 37.6917 67.9525 37.918 68.125 38.2109C68.3008 38.5039 68.3887 38.8506 68.3887 39.251C68.3887 39.4723 68.3529 39.6921 68.2812 39.9102C68.2096 40.1283 68.1071 40.3464 67.9736 40.5645C67.8434 40.7793 67.6888 40.9958 67.5098 41.2139C67.3307 41.4287 67.1338 41.6468 66.9189 41.8682L65.3809 43.5625H68.6621ZM74.2139 40.3496V41.5117C74.2139 42.0684 74.1585 42.5436 74.0479 42.9375C73.9404 43.3281 73.7842 43.6455 73.5791 43.8896C73.374 44.1338 73.1283 44.3128 72.8418 44.4268C72.5586 44.5407 72.2412 44.5977 71.8896 44.5977C71.6097 44.5977 71.3493 44.5618 71.1084 44.4902C70.8708 44.4186 70.6559 44.3063 70.4639 44.1533C70.2718 44.0003 70.1074 43.8034 69.9707 43.5625C69.8372 43.3184 69.7331 43.027 69.6582 42.6885C69.5866 42.3499 69.5508 41.9577 69.5508 41.5117V40.3496C69.5508 39.7897 69.6061 39.3177 69.7168 38.9336C69.8275 38.5462 69.9854 38.2321 70.1904 37.9912C70.3955 37.7471 70.6396 37.5697 70.9229 37.459C71.2093 37.3483 71.5283 37.293 71.8799 37.293C72.1631 37.293 72.4235 37.3288 72.6611 37.4004C72.902 37.4688 73.1169 37.5778 73.3057 37.7275C73.4977 37.8773 73.6605 38.0726 73.7939 38.3135C73.9307 38.5511 74.0348 38.8392 74.1064 39.1777C74.1781 39.513 74.2139 39.9036 74.2139 40.3496ZM73.0371 41.6777V40.1738C73.0371 39.8906 73.0208 39.6416 72.9883 39.4268C72.9557 39.2087 72.9069 39.0247 72.8418 38.875C72.7799 38.722 72.7018 38.5983 72.6074 38.5039C72.513 38.4062 72.4056 38.3363 72.2852 38.2939C72.1647 38.2484 72.0296 38.2256 71.8799 38.2256C71.6976 38.2256 71.5348 38.2614 71.3916 38.333C71.2484 38.4014 71.1279 38.512 71.0303 38.665C70.9326 38.818 70.8577 39.0199 70.8057 39.2705C70.7568 39.5179 70.7324 39.819 70.7324 40.1738V41.6777C70.7324 41.9642 70.7487 42.2165 70.7812 42.4346C70.8138 42.6527 70.8626 42.8398 70.9277 42.9961C70.9928 43.1491 71.071 43.276 71.1621 43.377C71.2565 43.4746 71.3639 43.5462 71.4844 43.5918C71.6081 43.6374 71.7432 43.6602 71.8896 43.6602C72.0752 43.6602 72.2396 43.6243 72.3828 43.5527C72.526 43.4811 72.6465 43.3672 72.7441 43.2109C72.8418 43.0514 72.915 42.8447 72.9639 42.5908C73.0127 42.3369 73.0371 42.0326 73.0371 41.6777Z"
                                                        fill="white"
                                                    />
                                                    <defs>
                                                        <clipPath id="clip0_5119_9306">
                                                            <rect
                                                                width={30}
                                                                height={30}
                                                                fill="white"
                                                                transform="translate(8 18)"
                                                            />
                                                        </clipPath>
                                                        <clipPath id="clip1_5119_9306">
                                                            <rect
                                                                width={11}
                                                                height={11}
                                                                fill="white"
                                                                transform="translate(27 37)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </li>
                                        <li className="p-home-m-payments__item show-more">
                                            <button type="button">6 +</button>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                        </div>
                        <div className="home-page-pixe-container"></div>
                        <footer className="Footer-module--footer--356bP">
                            <div className="Footer-module--top--2cWNK Footer-module--container--26gQw">
                                <div className="Footer-module--topMain--2ZsBI">
                                    <div>
                                        <a
                                            className="Footer-module--logo--2x9Q3"
                                            href="javascript:void(0)"
                                        >
                                        </a>
                                        <div className="Footer-module--download--2rMVT">
                                            <div
                                                className="Footer-module--qr--2PN0c com-c-qrstores com-c-qrstores--theme--default">
                                                <svg height={60} width={60} viewBox="0 0 33 33">
                                                    <path
                                                        fill="#FFFFFF"
                                                        d="M0,0 h33v33H0z"
                                                        shapeRendering="crispEdges"
                                                    />
                                                    <path
                                                        fill="#000000"
                                                        d="M0 0h7v1H0zM9 0h1v1H9zM11 0h2v1H11zM14 0h1v1H14zM16 0h1v1H16zM18 0h6v1H18zM26,0 h7v1H26zM0 1h1v1H0zM6 1h1v1H6zM9 1h1v1H9zM11 1h2v1H11zM15 1h3v1H15zM20 1h1v1H20zM24 1h1v1H24zM26 1h1v1H26zM32,1 h1v1H32zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM8 2h1v1H8zM10 2h3v1H10zM14 2h1v1H14zM16 2h1v1H16zM18 2h5v1H18zM24 2h1v1H24zM26 2h1v1H26zM28 2h3v1H28zM32,2 h1v1H32zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h1v1H8zM11 3h2v1H11zM17 3h1v1H17zM19 3h1v1H19zM22 3h1v1H22zM26 3h1v1H26zM28 3h3v1H28zM32,3 h1v1H32zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM8 4h3v1H8zM12 4h1v1H12zM14 4h10v1H14zM26 4h1v1H26zM28 4h3v1H28zM32,4 h1v1H32zM0 5h1v1H0zM6 5h1v1H6zM8 5h1v1H8zM10 5h1v1H10zM12 5h2v1H12zM20 5h3v1H20zM26 5h1v1H26zM32,5 h1v1H32zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26,6 h7v1H26zM8 7h2v1H8zM11 7h1v1H11zM14 7h1v1H14zM16 7h1v1H16zM20 7h2v1H20zM23 7h1v1H23zM0 8h1v1H0zM2 8h5v1H2zM9 8h1v1H9zM11 8h4v1H11zM17 8h2v1H17zM22 8h2v1H22zM26 8h5v1H26zM0 9h2v1H0zM4 9h1v1H4zM7 9h8v1H7zM18 9h6v1H18zM26 9h2v1H26zM29 9h2v1H29zM32,9 h1v1H32zM1 10h1v1H1zM5 10h3v1H5zM10 10h2v1H10zM13 10h4v1H13zM18 10h1v1H18zM20 10h3v1H20zM26 10h1v1H26zM28 10h1v1H28zM30 10h2v1H30zM0 11h2v1H0zM5 11h1v1H5zM8 11h1v1H8zM10 11h1v1H10zM12 11h2v1H12zM19 11h1v1H19zM21 11h1v1H21zM25 11h1v1H25zM28 11h3v1H28zM32,11 h1v1H32zM1 12h6v1H1zM14 12h4v1H14zM22 12h2v1H22zM25 12h1v1H25zM27 12h3v1H27zM2 13h1v1H2zM4 13h2v1H4zM8 13h3v1H8zM13 13h1v1H13zM15 13h1v1H15zM17 13h1v1H17zM19 13h3v1H19zM23 13h4v1H23zM29,13 h4v1H29zM0 14h2v1H0zM6 14h1v1H6zM8 14h1v1H8zM14 14h4v1H14zM24 14h4v1H24zM29 14h3v1H29zM0 15h2v1H0zM4 15h2v1H4zM10 15h3v1H10zM14 15h2v1H14zM20 15h2v1H20zM25 15h2v1H25zM30 15h1v1H30zM1 16h1v1H1zM3 16h1v1H3zM6 16h1v1H6zM10 16h1v1H10zM12 16h6v1H12zM22 16h1v1H22zM24 16h2v1H24zM27 16h2v1H27zM32,16 h1v1H32zM3 17h3v1H3zM7 17h2v1H7zM10 17h3v1H10zM16 17h1v1H16zM19 17h2v1H19zM23 17h1v1H23zM26 17h2v1H26zM29,17 h4v1H29zM3 18h10v1H3zM14 18h3v1H14zM22 18h1v1H22zM27 18h2v1H27zM30 18h2v1H30zM0 19h2v1H0zM3 19h2v1H3zM7 19h2v1H7zM10 19h3v1H10zM15 19h2v1H15zM19 19h4v1H19zM24 19h1v1H24zM26,19 h7v1H26zM0 20h3v1H0zM6 20h4v1H6zM11 20h1v1H11zM13 20h1v1H13zM15 20h1v1H15zM17 20h1v1H17zM19 20h1v1H19zM22 20h2v1H22zM25 20h1v1H25zM27 20h3v1H27zM31,20 h2v1H31zM0 21h2v1H0zM5 21h1v1H5zM8 21h5v1H8zM14 21h3v1H14zM18 21h6v1H18zM26 21h1v1H26zM29 21h1v1H29zM32,21 h1v1H32zM0 22h1v1H0zM3 22h2v1H3zM6 22h1v1H6zM9 22h1v1H9zM12 22h1v1H12zM18 22h1v1H18zM20 22h2v1H20zM25 22h2v1H25zM29 22h3v1H29zM0 23h1v1H0zM2 23h3v1H2zM7 23h6v1H7zM14 23h1v1H14zM16 23h1v1H16zM18 23h1v1H18zM20 23h7v1H20zM29 23h3v1H29zM0 24h1v1H0zM3 24h5v1H3zM9 24h1v1H9zM12 24h1v1H12zM14 24h1v1H14zM17 24h1v1H17zM19 24h1v1H19zM22 24h1v1H22zM24 24h6v1H24zM32,24 h1v1H32zM8 25h3v1H8zM14 25h1v1H14zM16 25h4v1H16zM21 25h1v1H21zM23 25h2v1H23zM28 25h1v1H28zM30 25h1v1H30zM32,25 h1v1H32zM0 26h7v1H0zM10 26h1v1H10zM13 26h1v1H13zM15 26h2v1H15zM20 26h1v1H20zM23 26h2v1H23zM26 26h1v1H26zM28 26h1v1H28zM30 26h2v1H30zM0 27h1v1H0zM6 27h1v1H6zM8 27h2v1H8zM12 27h1v1H12zM14 27h1v1H14zM16 27h1v1H16zM18 27h1v1H18zM20 27h2v1H20zM23 27h2v1H23zM28 27h3v1H28zM0 28h1v1H0zM2 28h3v1H2zM6 28h1v1H6zM8 28h2v1H8zM15 28h1v1H15zM17 28h1v1H17zM20 28h1v1H20zM22 28h1v1H22zM24 28h6v1H24zM31 28h1v1H31zM0 29h1v1H0zM2 29h3v1H2zM6 29h1v1H6zM8 29h1v1H8zM10 29h4v1H10zM15 29h1v1H15zM19 29h1v1H19zM21 29h1v1H21zM24 29h2v1H24zM28 29h1v1H28zM30,29 h3v1H30zM0 30h1v1H0zM2 30h3v1H2zM6 30h1v1H6zM8 30h1v1H8zM10 30h2v1H10zM13 30h3v1H13zM18 30h1v1H18zM20 30h4v1H20zM26 30h2v1H26zM0 31h1v1H0zM6 31h1v1H6zM12 31h5v1H12zM20 31h2v1H20zM25 31h1v1H25zM28 31h3v1H28zM0 32h7v1H0zM8 32h1v1H8zM10 32h1v1H10zM12 32h1v1H12zM14 32h2v1H14zM17 32h1v1H17zM22 32h4v1H22zM27 32h1v1H27zM31 32h1v1H31z"
                                                        shapeRendering="crispEdges"
                                                    />
                                                </svg>
                                            </div>
                                            <p
                                                className="Footer-module--downloadText--12lwX"
                                                data-trans="download_on_your_device"
                                            >
                                                Tải xuống <br/>
                                                ứng dụng Xspace Trade <br/>
                                                trên thiết bị của bạn
                                            </p>
                                        </div>
                                    </div>
                                    <nav className="NavLinks-module--nav--24F0q NavLinks-module--vi--3NBM0">
                                        <div className="NavLinks-module--part--2KnXt">
          <span className="NavLinks-module--partTitle--KZSDR NavLinks-module--partTitleLink--1UGLS">
            <a
                data-trans="trading"
                href="javascript:void(0)"
            >
              Giao dịch
              <svg
                  className="SvgIcon-module-host-3SE"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                  aria-hidden="true"
              >
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.293 7.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 12 9.293 8.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
              </svg>
            </a>
          </span>
                                            <ul className="NavLinks-module--list--2sD6H">
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="fixed_time"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Fixed Time
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="forex"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Forex
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="stocks"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="https://prs.tvsi.com.vn/"
                                                    >
                                                        Cổ phiếu
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="quickler"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Quickler
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="account"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Tài khoản
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="NavLinks-module--part--2KnXt">
          <span className="NavLinks-module--partTitle--KZSDR NavLinks-module--partTitleLink--1UGLS">
            <a
                data-trans="site_about_company"
                href="javascript:void(0)"
            >
              Giới thiệu về chúng tôi
              <svg
                  className="SvgIcon-module-host-3SE"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                  aria-hidden="true"
              >
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.293 7.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 12 9.293 8.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
              </svg>
            </a>
          </span>
                                            <ul className="NavLinks-module--list--2sD6H">
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="contacts_breadcrumb"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Thông tin liên hệ
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="awards"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Giải thưởng
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="social_page_nav_link"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Mạng xã hội
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="faq_breadcrumb"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Câu hỏi thường gặp
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="affiliate_program"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Chương trình hợp tác
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="NavLinks-module--part--2KnXt">
          <span className="NavLinks-module--partTitle--KZSDR NavLinks-module--partTitleLink--1UGLS">
            <a
                data-trans="trading_apps"
                href="javascript:void(0)"
            >
              Ứng dụng giao dịch
              <svg
                  className="SvgIcon-module-host-3SE"
                  viewBox="0 0 24 24"
                  role="presentation"
                  focusable="false"
                  aria-hidden="true"
              >
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.293 7.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 12 9.293 8.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
              </svg>
            </a>
          </span>
                                            <ul className="NavLinks-module--list--2sD6H">
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="desktop"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Máy tính
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="android"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Android
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="apk"
                                                        className="NavLinks-module--link---iHAW NavLinks-module--newLink--grhv1"
                                                        href="javascript:void(0)"
                                                    >
                                                        APK
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="pwa"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        PWA
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="NavLinks-module--part--2KnXt">
          <span
              data-trans="sidebar_menu_title_overlay"
              className="NavLinks-module--partTitle--KZSDR"
          >
            Trợ giúp
          </span>
                                            <ul className="NavLinks-module--list--2sD6H">
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="user_tpl_support"
                                                        className="NavLinks-module--link---iHAW"
                                                        href="javascript:void(0)"
                                                    >
                                                        Hỗ trợ
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="ct_helpcenter_title"
                                                        href="javascript:void(0)"
                                                        className="NavLinks-module--link---iHAW"
                                                    >
                                                        Trung tâm Trợ giúp
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        className="NavLinks-module--link---iHAW"
                                                        data-trans="stocksup_assets"
                                                        href="javascript:void(0)"
                                                    >
                                                        Tài sản
                                                    </a>
                                                </li>
                                                <li className="NavLinks-module--item--1ybbQ">
                                                    <a
                                                        data-trans="blog"
                                                        href="javascript:void(0)"
                                                        className="NavLinks-module--link---iHAW"
                                                    >
                                                        Blog
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="Footer-module--bottom--cRL9Q">
                                    <div className="Footer-module--social--kxd4P">
                                        <p
                                            className="Footer-module--socialText--RxNwt"
                                            data-trans="follow_us_on_social_media"
                                        >
                                            Theo dõi chúng tôi trên mạng xã hội
                                        </p>
                                        <div
                                            className="SocialButtons-module--socialButtons--2PXHr SocialButtons-module--socialButtonsText--8DoAV Footer-module--socialButtons--1O0-f">
                                            <div className="SocialButtons-module--socialButtonsList--1JMc7">
                                                <a
                                                    className="SocialButton-module--socialButton--3d4kd SocialButton-module--socialButtonWithText--337lV"
                                                    href="javascript:void(0)"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <svg viewBox="0 0 32 32" fill="none">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM17.668 16.7028V25.4077H14.0663V16.7031H12.2669V13.7034H14.0663V11.9024C14.0663 9.4552 15.0824 8 17.9691 8H20.3723V11.0001H18.8701C17.7464 11.0001 17.672 11.4193 17.672 12.2017L17.668 13.7031H20.3893L20.0709 16.7028H17.668Z"
                                                            fill="#70808C"
                                                        />
                                                    </svg>
                                                    1,4M+
                                                </a>
                                                <a
                                                    className="SocialButton-module--socialButton--3d4kd SocialButton-module--socialButtonWithText--337lV"
                                                    href="javascript:void(0)"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <svg viewBox="0 0 32 32" fill="none">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM22.6668 10.4996C23.4011 10.7011 23.9794 11.2948 24.1757 12.0488C24.5324 13.4154 24.5324 16.2667 24.5324 16.2667C24.5324 16.2667 24.5324 19.1179 24.1757 20.4845C23.9794 21.2385 23.4011 21.8323 22.6668 22.0339C21.3359 22.4 15.999 22.4 15.999 22.4C15.999 22.4 10.6621 22.4 9.33119 22.0339C8.59684 21.8323 8.01851 21.2385 7.82225 20.4845C7.46569 19.1179 7.46569 16.2667 7.46569 16.2667C7.46569 16.2667 7.46569 13.4154 7.82225 12.0488C8.01851 11.2948 8.59684 10.7011 9.33119 10.4996C10.6621 10.1333 15.999 10.1333 15.999 10.1333C15.999 10.1333 21.3359 10.1333 22.6668 10.4996Z"
                                                            fill="#70808C"
                                                        />
                                                        <path
                                                            d="M14.3991 19.2V13.8667L18.6657 16.5335L14.3991 19.2Z"
                                                            fill="#70808C"
                                                        />
                                                    </svg>
                                                    450K+
                                                </a>
                                                <a
                                                    className="SocialButton-module--socialButton--3d4kd SocialButton-module--socialButtonWithText--337lV"
                                                    href="javascript:void(0)"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <svg viewBox="0 0 32 32" fill="none">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM12.702 8.04833C13.5554 8.0095 13.8281 8 16.0007 8H15.9983C18.1716 8 18.4433 8.0095 19.2966 8.04833C20.1483 8.08733 20.73 8.22217 21.24 8.42C21.7666 8.62417 22.2116 8.8975 22.6567 9.3425C23.1017 9.78717 23.375 10.2335 23.58 10.7597C23.7767 11.2683 23.9117 11.8497 23.9517 12.7013C23.99 13.5547 24 13.8273 24 16C24 18.1727 23.99 18.4447 23.9517 19.298C23.9117 20.1493 23.7767 20.7308 23.58 21.2397C23.375 21.7657 23.1017 22.212 22.6567 22.6567C22.2121 23.1017 21.7665 23.3757 21.2405 23.58C20.7315 23.7778 20.1495 23.9127 19.2978 23.9517C18.4444 23.9905 18.1726 24 15.9998 24C13.8272 24 13.5547 23.9905 12.7014 23.9517C11.8499 23.9127 11.2684 23.7778 10.7594 23.58C10.2335 23.3757 9.78719 23.1017 9.34268 22.6567C8.89784 22.212 8.62451 21.7657 8.42 21.2395C8.22234 20.7308 8.0875 20.1495 8.04833 19.2978C8.00967 18.4445 8 18.1727 8 16C8 13.8273 8.01 13.5545 8.04817 12.7012C8.0865 11.8498 8.2215 11.2683 8.41984 10.7595C8.62484 10.2335 8.89818 9.78717 9.34318 9.3425C9.78785 8.89767 10.2342 8.62433 10.7604 8.42C11.269 8.22217 11.8504 8.08733 12.702 8.04833Z"
                                                            fill="#70808C"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M20.5562 10.4213C19.9909 10.4213 19.5322 10.8794 19.5322 11.4449C19.5322 12.0102 19.9909 12.4689 20.5562 12.4689C21.1216 12.4689 21.5802 12.0102 21.5802 11.4449C21.5802 10.8796 21.1216 10.4209 20.5562 10.4209V10.4213ZM16.0002 11.9999C13.7911 12 12 13.7911 12 16.0003C12 18.2095 13.7911 19.9999 16.0003 19.9999C18.2095 19.9999 20 18.2095 20 16.0003C20 13.7911 18.2093 11.9999 16.0002 11.9999ZM13.75 16.0001C13.75 14.7574 14.7575 13.7499 16.0001 13.7499C17.2428 13.7499 18.25 14.7574 18.25 16.0001C18.25 17.2428 17.2428 18.2499 16.0002 18.2499C14.7575 18.2499 13.75 17.2428 13.75 16.0001Z"
                                                            fill="#70808C"
                                                        />
                                                    </svg>
                                                    190K+
                                                </a>
                                                <a
                                                    className="SocialButton-module--socialButton--3d4kd SocialButton-module--socialButtonWithText--337lV"
                                                    href="javascript:void(0)"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <svg viewBox="0 0 32 32" fill="none">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM13.067 23.3333L13.3392 19.2548L13.339 19.2547L20.7582 12.5593C21.0838 12.2703 20.6871 12.1294 20.2549 12.3915L11.0985 18.1682L7.1434 16.9338C6.28928 16.6722 6.28315 16.0853 7.33516 15.6634L22.7472 9.72056C23.4511 9.40099 24.1305 9.88963 23.8617 10.967L21.2371 23.3354C21.0538 24.2143 20.5227 24.4245 19.7869 24.0185L15.7888 21.0646L13.867 22.9333C13.8609 22.9392 13.8549 22.9451 13.8489 22.9509C13.6339 23.1602 13.4561 23.3333 13.067 23.3333Z"
                                                            fill="#70808C"
                                                        />
                                                    </svg>
                                                    20К+
                                                </a>
                                                <a
                                                    className="SocialButton-module--socialButton--3d4kd SocialButton-module--socialButtonWithText--337lV"
                                                    href="javascript:void(0)"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <svg viewBox="0 0 32 32" fill="none">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM11.633 22.7173L8.60518 23.5116L9.41335 20.5595L9.22314 20.2568C8.42233 18.9831 7.99938 17.5109 8 15.9993C8.00175 11.5885 11.5906 8 16.0033 8C18.1401 8.00074 20.1487 8.83392 21.6591 10.3461C23.1695 11.8582 24.0008 13.8682 24 16.0058C23.9982 20.417 20.4095 24.0058 16.0001 24.0058H15.9969C14.5614 24.0052 13.1534 23.6196 11.9251 22.8907L11.633 22.7173ZM20.8492 18.2951C20.8008 18.2144 20.6875 18.1597 20.5198 18.0786C20.4791 18.0589 20.4352 18.0377 20.3883 18.0142C20.1478 17.8938 18.9654 17.3121 18.7449 17.2318C18.5245 17.1515 18.3641 17.1114 18.2038 17.3521C18.0435 17.5929 17.5826 18.1346 17.4423 18.2951C17.302 18.4556 17.1617 18.4757 16.9213 18.3553C16.882 18.3357 16.8285 18.3124 16.7624 18.2838L16.7623 18.2837C16.4237 18.1369 15.7558 17.8472 14.9872 17.1616C14.2723 16.5239 13.7896 15.7364 13.6493 15.4956C13.509 15.2548 13.6344 15.1247 13.7548 15.0048C13.8268 14.933 13.9095 14.8323 13.9923 14.7315C14.0338 14.6809 14.0753 14.6304 14.1155 14.5834C14.2177 14.4641 14.262 14.3737 14.3222 14.2508L14.3222 14.2508C14.3329 14.2291 14.344 14.2063 14.356 14.1823C14.4362 14.0217 14.3961 13.8813 14.336 13.7609C14.2957 13.6804 14.0671 13.1237 13.8601 12.6199L13.86 12.6195C13.7577 12.3705 13.6607 12.1344 13.5945 11.9752C13.4221 11.5612 13.2474 11.5622 13.1072 11.563C13.0886 11.5631 13.0707 11.5632 13.0534 11.5623C12.9132 11.5553 12.7527 11.5538 12.5924 11.5538C12.4321 11.5538 12.1715 11.614 11.9511 11.8548C11.937 11.8702 11.9212 11.8871 11.904 11.9054C11.6536 12.1727 11.1094 12.7533 11.1094 13.8611C11.1094 15.0387 11.9622 16.1766 12.0895 16.3464L12.0914 16.349C12.0993 16.3595 12.1134 16.3797 12.1335 16.4086L12.1335 16.4087C12.4215 16.8217 13.9452 19.0069 16.1998 19.9804C16.7736 20.2282 17.2215 20.3762 17.5708 20.487C18.1469 20.6701 18.6713 20.6443 19.0856 20.5823C19.5477 20.5133 20.5085 20.0006 20.709 19.4388C20.9093 18.8769 20.9093 18.3954 20.8492 18.2951Z"
                                                            fill="#70808C"
                                                        />
                                                    </svg>
                                                    WhatsApp
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="MainInfo-module--info--2dKG7">
                                        <div className="MainInfo-module--content--1jS2m">
                                            <div className="MainInfo-module--copy--Yyfla"></div>
                                            <div className="MainInfo-module--text--jHrNe">
                                                <p data-trans="footer_text_part_1" data-test="footer_text_part_1">
                                                    Chỉ người trưởng thành có đầy đủ năng lực mới được thực hiện các
                                                    Giao dịch được Trang web này cung cấp. Các Giao dịch với các sản
                                                    phẩm tài chính được cung cấp trên Trang web có rủi ro lớn và việc
                                                    giao dịch có thể rất rủi ro. Nếu bạn thực hiện Giao dịch với các
                                                    sản phẩm tài chính được cung cấp trên Trang web này, bạn có thể bị
                                                    thua lỗ lớn hoặc thậm chí còn mất hết tiền trong Tài khoản. Trước
                                                    khi bạn quyết định bắt đầu Giao dịch với các sản phẩm tài chính
                                                    được cung cấp trên Trang web này, bạn phải đọc kỹ thông tin trong
                                                    Thỏa thuận Dịch vụ và Thông báo Rủi ro.
                                                    <span
                                                        data-trans="footer_text_part_2_new"
                                                        data-test="footer_text_part_2_new"
                                                    >
                Các dịch vụ trên Trang web được cung cấp bởi Aollikus Limited,
                một công ty tài chính được cấp phép, mã số công ty: 40131, địa
                chỉ đăng ký: 1276, Govant Building, Kumul Highway, Port Vila,
                Cộng hòa Vanuatu. Saledo Global LLC, địa chỉ đăng ký tại Tầng 1,
                Tòa nhà First St. Vincent Bank Ltd, Hộp thư 1574, James Street,
                Kingstown, St. Vincent &amp; Grenadines cung cấp dịch vụ cho
                khách hàng giao dịch tài sản kỹ thuật số và cho khách hàng có
                tài khoản được chỉ định bằng tài sản kỹ thuật số. Các công ty
                này có đầy đủ giấy phép để thực hiện các hoạt động của mình theo
                luật pháp của quốc gia cấp phép. Các công ty đối tác: VISEPOINT
                LIMITED (đăng ký số: C 94716, đăng ký tại 54, Immakulata, Triq
                il-Mina ta’ Hompesch, ZABBAR ZBR 9016) và MARTIQUE LIMITED (đăng
                ký số: HE 43318, đăng ký tại Loutrakiou, 5 Chara Venezia
                Building, tầng 1, office 101, Strovolos, 2027, Nicosia, Cyprus),
                cung cấp nội dung và thực hiện quản lý hoạt động của doanh
                nghiệp.
              </span>
                                                </p>
                                            </div>
                                            <nav className="MainInfo-module--nav--3HnpF">
                                                <a
                                                    data-trans="user_tpl_regulation"
                                                    className="MainInfo-module--link--1O7LD"
                                                    href="javascript:void(0)"
                                                >
                                                    Quy định
                                                </a>
                                                <a
                                                    data-trans="site_law_info"
                                                    className="MainInfo-module--link--1O7LD"
                                                    href="javascript:void(0)"
                                                >
                                                    Thông tin Pháp lý
                                                </a>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>


                    </div>
                </div>
            </div>

            <div className={show === false ? "custom-offcanvas" : "custom-offcanvas d-block"}>
                <p>
                    <span className="pe-auto" onClick={handleClose}>X</span>
                </p>
                <div className="title_login">
                    <span onClick={() => setIsLoginBtn(false)} className={isLoginBtn === false ? "active_login" : ""}>Đăng Ký</span>
                    <span onClick={() => setIsLoginBtn(true)} className={isLoginBtn === true ? "active_login" : ""}>Đăng Nhập</span>
                </div>

                <div className={isLoginBtn === true ? "content_login d-block" : "content_login"}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input type="text" className="form-control" placeholder="Tên đăng nhập" name="username"
                               onChange={(e) => {
                                   e.preventDefault()
                                   const {name, value} = e.target
                                   setData({
                                       ...data,
                                       [name]: value
                                   })
                               }}
                               value={data.username}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>mật khẩu</label>
                        <input type="password" placeholder="mật khẩu"
                               name="password"
                               onChange={(e) => {
                                   e.preventDefault()
                                   const {name, value} = e.target
                                   setData({
                                       ...data,
                                       [name]: value
                                   })
                               }}
                               value={data.password}
                               required/>
                    </div>
                    <div className="form-group_btn">
                        <button onClick={(e) => handleLogin(e)}>Đăng Nhập</button>
                    </div>
                </div>

                <div className={isLoginBtn === false ? "content_register d-block" : "content_register block"}>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input onChange={(e) => {
                            onChange(e)
                        }} name="firstName" type="text" value={data2.firstName} placeholder="Nhập họ và tên"
                               maxLength={50}/>
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại di động</label>
                        <input onChange={(e) => {
                            onChange(e)
                        }} value={data2.phoneNumber} name="phoneNumber" type="text"
                               placeholder="Nhập số có thể nhận SMS" maxLength={11}/>
                    </div>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input onChange={(e) => {
                            onChange(e)
                        }} name="username" value={data2.username} type="text" placeholder="6 ~ 20 sự kết hợp của các số"
                               required minLength={6} maxLength={20}/>
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input onChange={(e) => {
                            onChange(e)
                        }} name="password" value={data2.password} type="password" placeholder="Nhập mật khẩu"
                               minLength={3}  maxLength={40}/>
                    </div>

                    <div className="form-group">
                        <label>Nhập lại mật khẩu</label>
                        <input onChange={(e) => {
                            onChange(e)
                        }} name="confirm_password" value={data2.confirm_password} type="password"
                               placeholder="Nhập lại mật khẩu" minLength={3} maxLength={40}/>
                    </div>
                    <div className="form-group">
                        <label>Người giới thiệu</label>
                        <input onChange={(e) => {
                            onChange(e)
                        }} name="referUser" value={data2.referUser} type="text" placeholder="Người giới thiệu"
                               maxLength={30}/>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" className="check_rule"
                               onChange={(e) => {
                                   setData({
                                       ...data,
                                       check: e.target.checked
                                   })

                               }} name="check" checked={data.check}/>
                        <span>Xác nhận rằng tôi đủ 18 tuổi trở lên và tất cả các hoạt động trên trang web này không vi phạm pháp luật do quốc gia nơi tôi sinh sống. Tôi cũng chấp nhận tất cả các quy tắc và quy định liên quan và tuyên bố về quyền riêng tư trong ứng dụng này. Cam kết bảo mật</span>
                    </div>
                    <div className="form-group_btn">
                        <button type="button" onClick={(e) => handleLRegister(e)}> Đăng ký</button>
                    </div>

                </div>
            </div>
        </>
    )

}

export default Login;
