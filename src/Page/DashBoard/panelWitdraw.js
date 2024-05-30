// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Service from "./../../services/request";
import { number_to_price } from "../../helper/common";
import { convertFileToBase64 } from "../../helper/common";
import moment from "moment";
import { useDispatch } from "react-redux";

function PanelTransfer(props) {
  const user = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const DEFAULT = {
    userId: user.userId,
    pointAmount: "",
    sotaikhoan: user.sotaikhoan,
    tennganhang: user.tennganhang,
    tentaikhoan: user.tentaikhoan,
    // hinhxacnhan: ""
  };
  const [data, setData] = useState(DEFAULT);
  const [history, setHistory] = useState([]);

  function handleSubmit() {
    let check = true;
    Object.keys(data).forEach((key) => {
      if (!data[key] || data[key] === "") {
        check = false;
      }
    });
    if (data.pointAmount < 100000 || data.pointAmount > 99000000000) {
      check = false;
    }
    if (
      !user.tentaikhoan ||
      !user.sotaikhoan ||
      !user.tennganhang ||
      user.tentaikhoan === "" ||
      user.sotaikhoan === "" ||
      user.tennganhang === ""
    ) {
      window.sweetAlert("", "Vui lòng cập nhật thông tin tài khoản", "warning");
    } else {
      if (check) {
        Service.send({
          method: "post",
          path: "/WithdrawTransaction/insert",
          data,
        }).then((result) => {
          if (result) {
            const { statusCode, message } = result;
            if (statusCode === 200) {
              fetch(
                `https://notify.miraehktrading.com/api/TelegramBotNotify/WithdrawXspace?user=${user.username}&mount=${data.pointAmount}`
              );
              window.sweetAlert("", "Rút thành công", "success");
              setData(DEFAULT);
            } else {
              window.sweetAlert("", message || "Đã có lỗi xảy ra", "warning");
            }
          } else {
            window.sweetAlert("", "Đã có lỗi xảy ra", "warning");
            setData(DEFAULT);
          }
        });
      } else {
        if (data.pointAmount > 1000000) {
          window.sweetAlert("", "Sốt tiền vượt quá giới hạn", "warning");
        }
      }
    }
  }

  function onChange(e) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleUpload(imageString, name) {
    Service.send({
      method: "post",
      path: "/Upload/uploadMediaFile",
      data: {
        imageData: imageString,
        imageFormat: "png",
      },
    }).then((result) => {
      if (result) {
        const { statusCode, data: imageData } = result;
        if (statusCode === 200) {
          setData({
            ...data,
            [name]: imageData,
          });
        }
      }
    });
  }

  function GetDataWi() {
    let filter = { userId: user.userId };
    Service.send({
      method: "POST",
      path: "/WithdrawTransaction/findByUser",
      data: {
        filter,
        skip: 0,
        limit: 100,
        order: {
          key: "createdAt",
          value: "desc",
        },
      },
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;

        if (statusCode === 200) {
          setHistory(data.data);
          data.data.forEach((item) => {
            if(item.status === "Completed"){
              setTotalWithdraw(pre=>(pre+parseInt(item.pointAmount)));
            }
          });
        }
      }
    });
  }

  useEffect(() => {
    GetDataWi();
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
  }, []);

  return (
    <>
      <div className="area " id="store">
        <div className="index-page">
          <div className="parent-content">
            <div className="content">
              <div className="form">
                <div action="/ajax/store" method="POST" className="store_form">
                  <div className="input-block">
                    <label className="title text-white">
                      Giá trị được lưu trữ
                    </label>
                    <select name="src_id" className="input-content">
                      <option value={2}>Internet Banking</option>
                    </select>
                  </div>
                  <input type="hidden" name="tar_id" defaultValue={1} />
                  <div className="input-block">
                    <label className="title text-white">Nhập số tiền</label>
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      name="pointAmount"
                      type="text"
                      className="input-content"
                      placeholder="Nhập số tiền"
                      id="amount"
                      value={data.pointAmount}
                    />
                  </div>

                  <div className="precautions">
                    <div className="input-block">
                      <label className="title text-white">
                        Tổng tiền tài khoản đã rút:{" "}
                      </label>
                      <span className="text-white">{" " + number_to_price(totalWithdraw)}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    type="button"
                    className="btn submit btn-store"
                  >
                    Rút tiền
                  </button>
                </div>
              </div>
            </div>

            <div className="precautions">
              <div className="input-block text-center">
                <label
                  className="title text-white"
                  style={{
                    fontSize: "14pt",
                    textAlign: "center",
                    paddingBottom: "4px",
                    paddingTop: "4px",
                  }}
                >
                  Lịch sử rút tiền{" "}
                </label>
              </div>

              {history.map((item) => (
                <div className="precautions" key={item.withdrawTransactionId}>
                  <div className="input-block">
                    <label className="title ">Ngày: </label>
                    <span
                      className="text-white text_nt"
                      style={{ fontSize: "12px" }}
                    >
                      {" " +
                        moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                  </div>
                  <div className="input-block">
                    <label className="title ">Nạp: </label>
                    <span
                      className="text-white text_nt"
                      style={{ fontSize: "12px" }}
                    >
                      Ví điện tử
                    </span>
                  </div>

                  <div className="input-block">
                    <label className="title ">Tên tài khoản: </label>
                    <span
                      className="text-white text_nt"
                      style={{ fontSize: "12px" }}
                    >
                      {" " + item.tentaikhoan}
                    </span>
                  </div>

                  <div className="input-block">
                    <label className="title ">Số tài khoản: </label>
                    <span
                      className="text-white text_nt"
                      style={{ fontSize: "12px" }}
                    >
                      {" " + item.status === "Completed" ? "Đang chờ xử lý" : item.sotaikhoan}
                    </span>
                  </div>

                  <div className="input-block">
                    <label className="title ">Trạng thái: </label>
                    <span
                      className="text-white text_nt"
                      style={{ fontSize: "12px" }}
                    >
                      {" "}
                      {item.status === "New"
                        ? "Đang chờ xử lý"
                        : item.status === "Completed"
                        ? "Đã rút thành công"
                        : "Hủy bỏ"}
                    </span>
                  </div>

                  <div className="input-block">
                    <label className="title ">Số lượng: </label>
                    <span
                      className="text-white text_nt"
                      style={{ fontSize: "12px" }}
                    >
                      {" "}
                      {number_to_price(item.pointAmount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PanelTransfer;
