import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
// import Service from './../../services/request'
// import { toast } from 'react-toastify';
import PanelAccount from '../DashBoard/panelAccount.js'
import PanelTransfer from '../DashBoard/panelTransfer.js'
import PanelStore from '../DashBoard/panelStore.js'
import PanelWitdraw from '../DashBoard/panelWitdraw.js'
import PanelRecordAll from '../DashBoard/panelRecordAll.js'
import PanelRecord from '../DashBoard/panelRecord.js'
import './index.scss'

function LayoutPage(props) {
    const {Component, className = "", classNameChart = ""} = props
    const dispatch = useDispatch()

    const [showModel, setShowModel] = useState(false)
    const [showMenu, setShowMenu] = useState(true)
    const [showAccount, setShowAccount] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showNapTien, setShowNapTien] = useState(false)
    const [showRutTien, setShowRutTien] = useState(false)
    const [showLichSuBet, setShowLichSuBet] = useState(false)
    const [text, setText] = useState("")
    function HandleShowAccount(){
        setShowMenu(false)
        setText("Thông tin tài khoản")
        setShowAccount(true)
    }
    function HandleShowInfo(){
        setText("Thông tin cá nhân")
        setShowMenu(false)
        setShowInfo(true)
    }
    function HandleShowNapTien(){
        setText("Nạp tiền")
        setShowMenu(false)
        setShowNapTien(true)
    }
    function HandleShowRutTien(){
        setText("Rút tiền")
        setShowMenu(false)
        setShowRutTien(true)
    }

    function HandleShowBet(){
        setText("Lịch sử chơi")
        setShowMenu(false)
        setShowLichSuBet(true)
    }

    function HandleBack(){
        setShowMenu(true)
        setText("")
        if(showRutTien){
        setShowRutTien(false)
        }
        if(showNapTien){
        setShowNapTien(false)
        }
        if(showAccount){
        setShowAccount(false)
        }
        if(showInfo){
        setShowInfo(false)
        }
        if(showLichSuBet){
            setShowLichSuBet(false)
        }
    }

    useEffect(() => {
        const bodyId = document.getElementById("body-root")
        bodyId.classList.remove("loginPage");

        if (className !== '') {
            bodyId.classList.add(className)
        } else {
            bodyId.classList.toggle('id');
        }
    }, [className])

    useEffect(() => {
        let mobileHeader = document.getElementById("headMobile");
        let webHeader = document.getElementById("headWeb");
        window.onscroll = function () {
            scrollFunction(mobileHeader, webHeader)
        };

    }, [])

    useEffect(()=>{
        if(showModel == false){
            setText("")
        }
    }, [showModel])

    function scrollFunction(mobileHeader, webHeader) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            //mobileHeader.style.background = "#292c2e";
            //webHeader.style.background = "#19191A";
        } else {
            //mobileHeader.style.background = "transparent";
            //webHeader.style.background = "#19191A";
        }
    }

    const {pathname} = props.location


    function handleLogout(e) {
        e.preventDefault()
        dispatch(({type: 'USER_RESET'}))
        setTimeout(() => {
            props.history.push('/')
        }, 200)
    }

    return (
        <>
            {/* mobile */}
            <div id="mobile">
                <header id="headMobile">
                    <div className={`nav container `} style={{backgroundColor: "#000"}}>
                        <a href="/" className="nav-logo"> <img src="/storage/meta.png"/> </a>
                        <button className="hamburger" style={{outline: "none"}} type="button"
                                onClick={() => setShowModel(true)}> <span className="hamburger-box">
                      <span className="hamburger-inner"/>
              </span>
                        </button>
                    </div>
                </header>
            </div>

            {/* desktop */}
            <div id="web">
                <header id="headWeb">
                    <div className={`nav container ${pathname === "/member_center" ? "dashboardContainer" : ""}`}>
                        <Link to="/" className="nav-logo"> <img src="/storage/meta.png"/> </Link>
                        <div className="right-index-link-block">
                            <Link id="trangchu" className="right-index-link-block-highlight headerText" to="/">Trang
                                Chủ</Link>
                            <a id="thanhvien" className="right-index-link-block-highlight headerText"
                               href="javascript:void(0)" onClick={() => setShowModel(true)}>Trung tâm thành viên</a>
                            <a onClick={(e) => {
                                handleLogout(e)
                            }} href="logout" className="btn1 headerText">Đăng xuất</a></div>
                    </div>
                </header>
            </div>
            <Component  {...props} className={classNameChart}/>
            <footer className="newsletter_right_w3_agileits bg-dark pymd-5 py-4">
                <div className="container d-none">
                    <div className="copyright text-center">
                        <p className="copy-right-w3ls"></p>
                    </div>
                </div>
            </footer>

            <div className={showModel ? "userData d-block" : "userData"}>
                <div className="icon_close">
                    <span onClick={HandleBack}>
                        {!showMenu && <img src="/img/nunu/icons8-arrow-24.png"/>}
                    </span>
                    <span style={{fontSize:"14pt", marginTop:"4px", fontWeight:"bold"}}>{text}</span>
                    <span onClick={() => {
                        HandleBack()
                        setShowModel(false)
                    }}>X</span>
                </div>
                <div className={showMenu ? "menu_user d-block": "menu_user"}>
                    <div className="group_icon" onClick={HandleShowAccount}>
                        <img src="storage/icon/icons8bank50.png"/>
                        <p>Tài khoản</p>
                    </div>
                    <div className="group_icon" onClick={HandleShowInfo}>
                        <img src="storage/icon/icons8user30.png"/>
                        <p>Cá nhân</p>
                    </div>
                    <div className="group_icon" onClick={HandleShowNapTien}>
                        <img src="storage/icon/icons8money50.png"/>
                        <p>Nạp tiền</p>
                    </div>
                    <div className="group_icon" onClick={HandleShowRutTien}>
                        <img src="storage/icon/icons8money30.png"/>
                        <p>Rút tiền</p>
                    </div>
                    <div className="group_icon" onClick={HandleShowBet}>
                        <img src="storage/icon/icons8history30.png"/>
                        <p>Lịch sử chơi</p>
                    </div>
                    <div className="group_icon" onClick={(e) => {
                        handleLogout(e)
                    }}>
                        <img src="storage/icon/icons8logout48.png"/>
                        <p>Đăng xuất</p>
                    </div>
                </div>

                <div className="contentDataUser">
                    {showAccount && <PanelAccount/>}
                    {showInfo && <PanelTransfer/>}
                    {showNapTien && <PanelStore/>}
                    {showRutTien && <PanelWitdraw/>}
                    {showLichSuBet && <PanelRecord/>}

                </div>

            </div>
        </>
    );

}

const mapStateToProps = state => ({
    // member: state.member || {},
});

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPage)
