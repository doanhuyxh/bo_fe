
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Service from './../../services/request'
import { number_to_price } from "../../helper/common"
import { convertFileToBase64 } from '../../helper/common';
import moment from "moment"

function PanelRecordAll(props) {
  const [typeActive, setTypeActive ] = useState(0)
  const user = useSelector((state)=> state.member)
  const DEFAULT ={
    userId: user.userId,
    pointAmount: "",
    // hinhxacnhan: ""
  }
  const [data, setData] = useState(DEFAULT)
  const [items, setItems] = useState([])


  useEffect(()=>{
    handleFetchList({
      status: "New"
    })
  },[])

  function handleFetchList(filter) {
    const dataString = window.localStorage.getItem('data')
    filter.userId = JSON.parse(dataString).userId
    Service.send({
      method: 'POST', path: '/DepositTransaction/findByUser', data: {
        skip: 0,
        limit: 100,
        filter,
        order: {
          key: "createdAt",
          value: "desc"
        }
      }, query: null,
    }).then(res => {
      if (res) {
        const { statusCode, data, message } = res

        if (statusCode === 200) {

          setItems(data.data)
        }
      }
    })
  }

  function handleFetchListWithdraw() {
    let filter = {}
    const dataString = window.localStorage.getItem('data')
    filter.userId = JSON.parse(dataString).userId
    Service.send({
      method: 'POST', path: '/WithdrawTransaction/findByUser', data: {
        filter,
        skip: 0,
        limit: 100,
        order: {
          key: "createdAt",
          value: "desc"
        }
      }, query: null,
    }).then(res => {
      if (res) {
        const { statusCode, data, message } = res

        if (statusCode === 200) {

          setItems(data.data)
        }
      }
    })
  }
  return (
   <>
  <div className="area " id="store">

     <div className="index-page"> <div className="mobile-title mobile-show">
       <h2 className="text-dark">Lịch sử nạp rút</h2>
     </div>
     <div className="parent-content" id="list-content">
      <div className="content">
       <div className="form">

         <div className="left">
           <div style={{marginTop: "30px"}} className="link-btn-block">
             <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(0)
              handleFetchList({
                status: "New"
              })
            }} href="/record_store" className={`link-btn btn-primary ${!typeActive? "active2": ""}`}>
              <p>
                Nạp tiền chờ duyệt
              </p>
            </a>
            <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(1)
              handleFetchList({
                status: "Completed"
              })
            }} href="/record_transfer" className={`link-btn btn-primary ${typeActive ===1? "active2": ""}`}>
              <p className="fs_leftMenu">
              NỘI DUNG CHUYỂN KHOẢN : <span style={{color: "red"}}>TÊN ĐĂNG NHẬP</span>
              </p>
            </a>
            <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(3)
              handleFetchList({
                status: "Canceled"
              })
            }} href="/record_transfer" className={`link-btn btn-primary ${typeActive ===3? "active2": ""}`}>
              <p>
               Nạp tiền thất bại
              </p>
            </a>
            <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(2)
              handleFetchListWithdraw()
            }} href="/record_withdraw" className={`link-btn btn-primary ${typeActive ===2? "active2": ""}`}>
              <p>
                Rút tiền
              </p>
            </a>
          </div>
          {
            items.map(item=>(
              <div className="precautions">

                  <span className='text-white mx-1'>Ngày</span>
                   <span className='text-white'>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
                   <br/><span className='text-white'>Chi tiết</span>
                  <p>
                  <span className='text-white'>Rút:</span>
                  <span className='text-white' style={{ fontWeight: "bold", marginLeft: "2px"}}>Ví điện tử</span>
                  </p>

                  <p>
                  <span className='text-white'>Tài khoản:</span>
                  <span className='text-white' style={{ marginLeft: "2px"}}>{item.tentaikhoan}</span>
                  </p>
                  <p>
                  <span className='text-white'>Số TK:</span>
                  <span className='text-white' style={{ marginLeft: "2px"}}>{item.sotaikhoan}</span>
                  </p>
                  <p>
                  <span className='text-white'>Trạng thái:</span>
                  <span className='text-white' style={{  marginLeft: "2px"}}>{item.status ==="New" ? "Đang chờ xử lý" : item.status ==="Completed" ? "Đã hoàn thành nhận tiền" : "Hủy bỏ"}</span>
                  </p>
                  <p>
                  <span className='text-white'>Số lượng:</span>
                  <span className='text-white' style={{ marginLeft: "2px"}}>{number_to_price(item.pointAmount)}</span>
                  </p>


              </div>
            ))
          }



         </div>

       </div>
     </div>
     </div>
     </div>

  </div>
   </>
  )
}
export default PanelRecordAll;
