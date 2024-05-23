import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Service from './../../services/request'
import {number_to_price} from "../../helper/common"
import {convertFileToBase64} from '../../helper/common';
import moment from "moment/moment";

function PanelStore(props) {
    const user = useSelector((state) => state.member)
    const DEFAULT = {
        userId: user.userId,
        pointAmount: "",
        // hinhxacnhan: ""
    }
    const [data, setData] = useState(DEFAULT)
    const [items, setItems] = useState([])
    const [history, setHistory] = useState([])

    const [bank, setBank] = useState({
        userPaymentMethodIdentityNumber: "",
        userPaymentMethodReceiverName: ""
    })

    function handleSubmit() {
        let check = true
        Object.keys(data).forEach(key => {
            if (!data[key] || data[key] === "") {
                check = false
            }
        })
        if (data.pointAmount < 0) {
            check = false
        }

        if (check) {
            Service.send({
                method: 'post', path: '/DepositTransaction/insert', data,
            }).then(result => {
                if (result) {
                    const {statusCode, message} = result
                    if (statusCode === 200) {
                        fetch(`https://notify.miraehktrading.com/api/TelegramBotNotify/DepositXspace?user=${user.username}&mount=${data.pointAmount}`)
                        window.sweetAlert({
                            title: "Nạp tiền thành công",
                            html: true,
                            customClass: "sweetCustorm",
                            text: `
                <p>
                Lệnh nạp tiền đã được gửi đi<br></br>
                Quý khách vui lòng chuyển khoản theo STK như hướng dẫn<br></br>
                Nội dung chuyển khoản: <br></br><span style="color:red;font-weight:bold">Tên đăng nhập</span>
                </p>
                `,
                            icon: "warning",
                            confirmButtonColor: '#835D33',
                            confirmButtonText: 'Xác nhận',
                            closeOnConfirm: true,
                        }, (isOke) => {
                            if (isOke) {
                                setData(DEFAULT)
                            }
                        })
                        setData(DEFAULT)
                    } else {
                        window.sweetAlert(
                            '',
                            message || 'Đã có lỗi xảy ra',
                            'warning'
                        )
                    }
                } else {
                    window.sweetAlert(
                        '',
                        'Xảy ra lỗi. Vui lòng thử lại sau',
                        'warning'
                    )
                    setData(DEFAULT)
                }
            })
        } else {
            if (data.pointAmount < 0) {
                window.sweetAlert(
                    '',
                    'Sốt tiền vượt quá giới hạn',
                    'warning'
                )
            } else {
                window.sweetAlert(
                    '',
                    'Vui lòng điền vào tất cả các vị trí',
                    'warning'
                )
            }
        }


    }

    function handleUpload(imageString, name) {
        Service.send({
            method: 'post', path: 'Upload/uploadMediaFile', data: {
                imageData: imageString,
                imageFormat: "png"
            },
        }).then(result => {
            if (result) {
                const {statusCode, data: imageData} = result
                if (statusCode === 200) {
                    setData({
                        ...data,
                        [name]: imageData
                    })

                }
            }
        })
    }


    function handleFetchList() {
        Service.send({
            method: 'POST', path: '/UserPaymentMethod/findALL', data: {
                filter: {},
                skip: 0,
                limit: 20,
                order: {
                    key: "createdAt",
                    value: "desc"
                }
            }, query: null,
        }).then(res => {
            if (res) {
                const {statusCode, data, message} = res
                if (statusCode === 200) {
                    setItems(data)
                }
            }
        })
    }

    function onChange(e) {
        const {value, name} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function HandleGetDataDeposit(){
        let filter = {
            userId:user.userId,
            status:"New"
        }
        let totalData =[]

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

                if (statusCode == 200) {

                    for (let i = 0; i< data.data.length; i++){
                        totalData.push(data.data[i])
                    }
                    filter.status="Completed"

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

                            if (statusCode == 200) {

                                for (let i = 0; i< data.data.length; i++){
                                    totalData.push(data.data[i])
                                }
                                filter.status="Canceled"

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

                                        if (statusCode == 200) {

                                            for (let i = 0; i< data.data.length; i++){
                                                totalData.push(data.data[i])
                                            }

                                            setHistory(totalData)
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    useEffect(() => {
        handleFetchList()
        HandleGetDataDeposit()
    }, [])


    return (
        <>
            <div className="area " id="store">
                <div className="index-page">
                    <div className="parent-content">
                        <div className="content">
                            <div className="form">
                                <div action="/ajax/store" method="POST" className="store_form">
                                    <div className="input-block">
                                        <label className="title text-white">Giá trị được lưu trữ</label>
                                        <select name="src_id" className="input-content">
                                            <option value={2}>Internet Banking</option>
                                        </select>
                                        {/* bank */}
                                        {/* <span> ATM Giới hạn chuyển, Giới hạn tiền gửi từ: 1000000 </span> */}
                                    </div>
                                    <input type="hidden" name="tar_id" defaultValue={1}/>
                                    <div className="input-block">
                                        <label className="title text-white">Nhập số tiền</label>
                                        <input onChange={(e) => {
                                            onChange(e)
                                        }} name="pointAmount" type="text" className="input-content"
                                               placeholder="Nhập số tiền" id="amount" value={data.pointAmount}/>
                                    </div>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit()
                                    }} type="button" className="btn submit btn-store">Xác nhận
                                    </button>

                                </div>
                                <div>
                                    <div className="title__naptien text-white">Phương thức nạp tiền:</div>
                                    <div className="content__naptien text-white">Sau khi nhập số tiền và xác nhận</div>
                                    <div className="content__naptien text-white">Vui lòng chuyển khoản vào số tài khoản
                                        bên dưới
                                    </div>
                                    <div className="content__naptien text-white">
                                        <span className="content__naptien text-white">Theo nội dung:</span> <span
                                        className="content__naptien-2">Tên đăng nhập</span>
                                    </div>
                                    <div style={{marginBottom: 20}} className="content__naptien text-white">Ví điện tử
                                        hệ thống sẽ tự động cập nhật
                                    </div>
                                </div>

                                <div className="precautions">
                                    <div className="input-block">
                                        <label className="title text-white">Tổng tiền nạp: </label>
                                        <span
                                            className='text-white'>{" " + user.totalDeposit}</span>
                                    </div>
                                </div>
                                {items.map(item => (

                                    <div className="precautions" key={item.userPaymentMethodId}>
                                        <div className="input-block">
                                            <label className="title text-white">Số tài khoản: </label>
                                            <span
                                                className='text-white'>{" " + item.userPaymentMethodIdentityNumber}</span>
                                        </div>
                                        <div className="input-block">
                                            <label className="title text-white ">Tên tài
                                                khoản: </label>
                                            <span
                                                className='text-white'>{" " + item.userPaymentMethodReceiverName}</span>

                                        </div>
                                        <div className="input-block">
                                            <label className="title ">Ngân hàng: </label>
                                            <span className='text-white text_nt'
                                                  style={{fontSize: "12px"}}>{" " + item.userPaymentMethodReferName}</span>
                                        </div>
                                    </div>
                                ))
                                }

                            </div>
                            <div className="precautions">
                                <div className="input-block text-center">
                                    <label className="title text-white" style={{fontSize:"14pt",textAlign:"center", paddingBottom:"4px", paddingTop:"4px"}}>Lịch sử nạp tiền </label>
                                </div>
                            </div>

                            {
                                history.map(item=>(
                                    <div className="precautions" key={item.depositTransactionId}>

                                        <div className="input-block">
                                            <label className="title ">Ngày: </label>
                                            <span className='text-white text_nt'
                                                  style={{fontSize: "12px"}}>{" " + moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
                                        </div>
                                        <div className="input-block">
                                            <label className="title ">Nạp: </label>
                                            <span className='text-white text_nt'
                                                  style={{fontSize: "12px"}}>Ví điện tử</span>
                                        </div>

                                        <div className="input-block">
                                            <label className="title ">Tên tài khoản: </label>
                                            <span className='text-white text_nt'
                                                  style={{fontSize: "12px"}}>{" " + item.tentaikhoan}</span>
                                        </div>

                                        <div className="input-block">
                                            <label className="title ">Số tài khoản: </label>
                                            <span className='text-white text_nt'
                                                  style={{fontSize: "12px"}}>{" " + item.sotaikhoan}</span>
                                        </div>

                                        <div className="input-block">
                                            <label className="title ">Trạng thái: </label>
                                            <span className='text-white text_nt'
                                                  style={{fontSize: "12px"}}>{" "}{item.status === "New" ? "Đang chờ xử lý" : item.status === "Completed" ? "Đã nạp thành công" : "Hủy bỏ"}</span>
                                        </div>

                                        <div className="input-block">
                                            <label className="title ">Số lượng: </label>
                                            <span className='text-white text_nt'
                                                  style={{fontSize: "12px"}}>{" "}{number_to_price(item.pointAmount)}</span>
                                        </div>


                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default PanelStore;
