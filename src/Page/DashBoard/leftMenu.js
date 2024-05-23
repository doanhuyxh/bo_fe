import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Service from './../../services/request'
import PanelStore from  "./panelStore"
import PanelAccount from "./panelAccount"
import PanelTransfer from "./panelTransfer"
import PanelWitdraw from "./panelWitdraw"
import PanelRecord from "./panelRecord"
import PanelRecordAll from "./panelRecordAll"
import "../../styles/custom.scss"

function LeftMenu() {
  const [activeSlug, setActiveSlug] = useState("member")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.member)
  function renderCotent(){
    if(activeSlug ==="store"){
      return <PanelStore/>
    }else if(activeSlug === "transfer"){
      return <PanelTransfer/>
    }else if(activeSlug ==="withdraw"){
      return <PanelWitdraw/>
    }else if ( activeSlug==="record_store"){
      return <PanelRecord/>
    }else if ( activeSlug==="record_store_all"){
      return <PanelRecordAll/>
    }
    return <PanelAccount/>
  }

  useEffect(()=>{
    Service.send({
      method: "post",
      path: "/User/getDetailUserById",
      data: { id: user.userId },
    }).then((result) => {
      if (result) {
        const { statusCode, data } = result;
        if (statusCode === 200) {
          dispatch({ type: "USER_DETAILS_UPDATE", data: data });
        }
      }
    });
  },[])

  return (
    <div className="container">
    <div className="mobile-fixed">
      <div className={`link-btn ${activeSlug === "member" ? "active2": ""}`}>
        <a onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("member")
        }}
        href="/member">
          <img className="mobile-icon" alt="logo" src="/storage/icon/1.png" />
          <br />
          <p className="text-white fs_leftMenu">Thông tin tài khoản</p>
        </a>
      </div>
      <div className={`link-btn ${activeSlug === "transfer" ? "active2": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("transfer")
        }}
        href="/transfer">
          <img className="mobile-icon" alt="logo" src="/storage/icon/2.png" />
          <br />
          <p className="text-white fs_leftMenu">Thông tin cá nhân</p>
        </a>
      </div>

      <div className={`link-btn ${activeSlug === "store" ? "active2": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("store")
        }}
        href="/store">
          <img className="mobile-icon" alt="logo" src="/storage/icon/4.png" />
          <br />
          <p className="text-white fs_leftMenu">Nạp tài sản</p>
        </a>
      </div>

      <div className={`link-btn ${activeSlug === "withdraw" ? "active2": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("withdraw")
        }}
        href="/withdraw">
          <img className="mobile-icon" alt="logo" src="/storage/icon/3.png" />
          <br />
          <p className="text-white fs_leftMenu">Rút tài sản</p>
        </a>
      </div>
      <div className={`link-btn ${activeSlug === "record_store" ? "active2": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("record_store")
        }}
         href="/record_store">
          <img className="mobile-icon" alt="logo" src="/storage/icon/5.png" />
          <br />
          <p className="text-white fs_leftMenu">Lịch sử giao dịch</p>
        </a>
      </div>
      <div className={`link-btn ${activeSlug === "record_store_all" ? "active2": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("record_store_all")
        }}
         href="/record_store_all">
          <img className="mobile-icon" alt="logo" src="/storage/icon/6.png" />
          <br />
          <p className="text-white fs_leftMenu">Lịch sử nạp rút</p>
        </a>
      </div>
    </div>
    {renderCotent()}
   </div>
  )
}
export default LeftMenu;
