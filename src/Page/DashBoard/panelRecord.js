import React, {useEffect, useState} from 'react';
import Service from './../../services/request'
import {useSelector} from 'react-redux'
import moment from "moment"
import {number_to_price} from "../../helper/common"

const BET_TYPE = {
    BIG: "BetBig",
    SMALL: "BetSmall",
    ODD: "BetOdd",
    EVEN: "BetEven",
    UP: "BetUp",
    DOWN: "BetDown",
}

function PanelRecord(props) {
    const [betRecordsList, setBetRecordsList] = useState([]);
    const user = useSelector(state => state.member)
    const userId = user.userId

    const handleCallListBetLive = () => {
        Service.send({
            method: 'post', path: '/BetRecords/getList', data: {
                filter: {
                    userId: userId,
                },
                limit: 100,
            },
        }).then(result => {
            if (result) {
                const {statusCode, data} = result
                if (statusCode === 200) {
                    setBetRecordsList(data.data)
                }
            }
        })
    }


    useEffect(() => {
        handleCallListBetLive()
    }, [])

    const handleRenderTextType = (type) => {
        if (type === BET_TYPE.UP) {
            return {text: "Mua", type: "result_up"}
        } else if (type === BET_TYPE.DOWN) {
            return {text: "Bán", type: "result_down"}
        } else if (type === BET_TYPE.EVEN) {
            return {text: "chẳn", type: "result_even"}
        }
        return {text: "lẻ", type: "result_odd"}
    }

    return (
        <>
            <div className="area " id="store">
                <div className="index-page">
                    <div className="h_item">
                        <p>Tổng giao dịch thắng</p>
                        <p>{user.totalWin}</p>
                    </div>
                    <div className="h_item">
                        <p>Tổng giao dịch thua</p>
                        <p>{user.totalLose}</p>
                    </div>
                    <div className="h_item">
                        <p>Tổng giao dịch</p>
                        <p>{user.totalBet}</p>
                    </div>


                    <div className="parent-content record" id="list-content">
                        <div className="content">
                            <div className="form chart">
                                <div className="link-btn-block">
                                    {
                                        betRecordsList && betRecordsList.map(item => (
                                            <div className="side-log-item">
                                                <div className="list-bet">
                                                    <div className="list-bet-time">
                                                            <span
                                                                className="bet-time">{moment(item.createdAt).format("HH:mm:ss")}</span>
                                                    </div>
                                                    <div className="list-bet-stat" style={{display: "flex"}}>
                                                        <div className="list-bet-type">
                                                            <div
                                                                className="bet-type text-white">{item.betRecordUnit}</div>
                                                        </div>
                                                        <div className="list-bet-updown">
                                                            <div style={{marginRight: '5px'}}
                                                                 className={`bet-number ${handleRenderTextType(item.betRecordType).type}`}>{handleRenderTextType(item.betRecordType).text}</div>
                                                        </div>
                                                        <div className="list-bet-price">
                                                            <div className="bet-price"
                                                                 style={{width: "unset"}}>{number_to_price(item.betRecordAmountIn)}</div>

                                                        </div>
                                                        <div style={{marginLeft: "5px"}}
                                                             className={item.betRecordResult !== 'win' ? "result_down" : "result_up"}>{item.betRecordResult !== 'win' ? "Thua" : "Thắng"}</div>
                                                    </div>
                                                </div>
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

export default PanelRecord;
