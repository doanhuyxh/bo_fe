import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Service from './../../services/request'
import { convertFileToBase64 } from '../../helper/common';
import { useDispatch } from 'react-redux'
function PanelStore(props) {
  const user = useSelector((state) => state.member)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    sotaikhoan: user.sotaikhoan,
    cmndnguoi: user.cmndnguoi || "Hình cầm cmnd",
    tentaikhoan: user.tentaikhoan,
    tennganhang: user.tennganhang || "Vietcom Bank",
    socmnd: user.socmnd,
    cmndtruoc: user.cmndtruoc,
    cmndsau: user.cmndsau,
    phoneNumber: user.phoneNumber
  })

  function onChange(e) {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  function handleSubmit() {
    let check = true
    Object.keys(data).forEach(key => {
      if (!data[key] || data[key] === "") {
        check = false
      }
    })
    if (check) {
      Service.send({
        method: 'post', path: '/User/updateUserById', data: { id: user.userId, data },
      }).then(result => {
        if (result) {
          const { statusCode, message } = result
          if (statusCode === 200) {
            dispatch(({ type: 'USER_DETAILS_UPDATE', data: data }))
            window.sweetAlert(
              '',
              'Cập nhật thành công',
              'success'
            )
          } else {
            window.sweetAlert(
              '',
              'Đã có lỗi xảy ra vui lòng nhập đầy đủ thông tin',
              'warning'
            )
          }
        }
      })
    } else {
      window.sweetAlert(
        '',
        'Vui lòng điền vào tất cả các vị trí',
        'warning'
      )
    }
  }

  function handleUpload(imageString, name) {
    Service.send({
      method: 'post', path: '/Upload/uploadMediaFile', data: {
        imageData: imageString,
        imageFormat: "png"
      },
    }).then(result => {
      if (result) {
        const { statusCode, data: imageData } = result
        if (statusCode === 200) {
          setData({
            ...data,
            [name]: imageData
          })

        }
      }
    })
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
    <>
      <div className="area" id="store">
        <div className="index-page">
          <div className="parent-content">
            <div className="content">
              <div className="form">

                  <div className="member_form" action="/ajax/edit" method="POST">
                    <div className="input-block">
                      <label className="title">Tên ngân hàng</label>
                      <select disabled={user.tennganhang && user.tennganhang !== "null"}  onChange={(e) => { onChange(e) }} name="tennganhang" value={data.tennganhang} className="input-content">
                        <option value="null">Chọn ngân hàng</option>
                        <option value="AB Bank">AB Bank</option>
                        <option value="ACB Bank">ACB Bank</option>
                        <option value="Agri Bank">Agri Bank</option>
                        <option value="Bac A Bank">Bac A Bank</option>
                        <option value="BIDV Bank">BIDV Bank</option>
                        <option value="BaoViet Bank">BaoViet Bank</option>
                        <option value="DONGA Bank">DONGA Bank</option>
                        <option value="Exim Bank">Exim Bank</option>
                        <option value="MB Bank">MB Bank</option>
                        <option value="HD Bank">HD Bank</option>
                        <option value="KienLong Bank">KienLong Bank</option>
                        <option value="LienViet Post Bank">LienViet Post Bank</option>
                        <option value="GP Bank">GP Bank</option>
                        <option value="Maritime">Maritime</option>
                        <option value="NCB">NCB</option>
                        <option value="Nam A Bank">Nam A Bank</option>
                        <option value="Navi Bank">Navi Bank</option>
                        <option value="OCB (PHUONG DONG)">OCB (PHUONG DONG)</option>
                        <option value="Techcom">Techcom</option>
                        <option value="SaA Bank">SaA Bank</option>
                        <option value="SacomBank">SacomBank</option>
                        <option value="SaiGon Bank">SaiGon Bank</option>
                        <option value="SHB Bank">SHB Bank</option>
                        <option value="SCB Bank">SCB Bank</option>
                        <option value="ShinHan Bank">ShinHan Bank</option>
                        <option value="INDOVINA Bank">INDOVINA Bank</option>
                        <option value="PG Bank">PG Bank</option>
                        <option value="PVCOM Bank">PVCOM Bank</option>
                        <option value="Tien Phong Bank">Tien Phong Bank</option>
                        <option value="United Overseas Bank">United Overseas Bank</option>
                        <option value="VIB Bank">VIB Bank</option>
                        <option value="Vietcom Bank">Vietcom Bank</option>
                        <option value="Vietin Bank">Vietin Bank</option>
                        <option value="VietABank">VietABank</option>
                        <option value="Vietnam Prosperity Joint-Stock Commercial Bank">Vietnam Prosperity Joint-Stock Commercial Bank</option>
                        <option value="VPBANK">VPBANK</option>
                      </select>
                    </div>
                    <div className="input-block">
                      <label className="title text-white">Số tài khoản</label>
                      <input disabled={user.sotaikhoan && user.sotaikhoan !== ""}  onChange={(e) => { onChange(e) }} value={data.sotaikhoan} name="sotaikhoan" type="text" className="input-content" />
                    </div>
                    <div className="input-block">
                      <label className="title text-white">Tên tài khoản</label>
                      <input disabled={user.tentaikhoan && user.tentaikhoan !== ""} onChange={(e) => { onChange(e) }} value={data.tentaikhoan} name="tentaikhoan" type="text" className="input-content" />
                    </div>
                    <div className="input-block">
                      <label  className="title text-white">Số cmnd</label>
                      <input disabled={user.socmnd && user.socmnd !== ""} onChange={(e) => { onChange(e) }} value={data.socmnd} name="socmnd" type="text" required className="input-content" />
                    </div>

                    <div className={(user.cmndtruoc == "" || user.cmndtruoc == null )? '' : 'd-none'}>
                      <div style={{ display: "flex", alignItems: "center" }} className="input-block">
                        <div>
                          <label for="ip1" className="title2 text-white">Hình mặt trước CMND</label>
                          <input id="ip1" placeholder="Chọn ảnh" disabled={user.cmndtruoc && user.cmndtruoc !== ""} accept="image/*" onChange={e => {
                            const file = e.target.files[0]
                            convertFileToBase64(file).then(dataUrl => {
                              const newData = dataUrl.replace(/,/gi, '').split('base64')
                              if (newData[1]) {
                                handleUpload(newData[1], "cmndtruoc")
                              }
                            })
                          }} type="file" />
                        </div>
                        {
                          data.cmndtruoc ? <input name="check" checked={true} type="checkbox" className="checkbox" style={{marginLeft:"10px"}}/> : <input disabled checked={false} type="checkbox" className="checkbox" style={{marginLeft:"10px"}}/>
                        }

                      </div>
                    </div>

                    <div className={(user.cmndsau == "" || user.cmndsau == null)? '' : 'd-none'}>
                      <div style={{ display: "flex", alignItems: "center" }} className="input-block">
                        <div>

                          <label className="title2" for="ip2">Hình mặt sau CMND</label>
                          <input id='ip2' onChange={e => {
                            const file = e.target.files[0]
                            convertFileToBase64(file).then(dataUrl => {
                              const newData = dataUrl.replace(/,/gi, '').split('base64')
                              if (newData[1]) {
                                handleUpload(newData[1], "cmndsau")
                              }
                            })
                          }} disabled={user.cmndsau && user.cmndsau !== ""} accept="image/*" type="file" />
                        </div>
                        {
                          data.cmndsau ? <input name="check" checked={true} type="checkbox" className="checkbox" style={{marginLeft:"10px"}}/> :  <input disabled checked={false} type="checkbox" className="checkbox" style={{marginLeft:"10px"}} />
                        }

                      </div>
                    </div>

                    <button onClick={(e) => {
                      e.preventDefault()
                      handleSubmit()
                    }} className="submit btn btn-store">Cập nhật</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
export default PanelStore;
