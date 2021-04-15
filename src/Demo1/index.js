import React, { useState, useRef } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function Index() {
    const [outMsg, setoutMsg] = useState([])
    const stomachSize = useRef(0)
    const typeToEat = useRef([])

    const knap = (n, foods) => {
        let sizes = {
            "Salmon": 153, "Tuna": 260, "Istiophoridae": 67, "Fenneropenaeus": 93,
            "Borealis": 152, "Adductor": 50, "Haliotis": 58, "Gratilla": 13,
            "Kuroge": 166, "Chionoecetes": 77, "Eriocheir": 151, "Palinuridae": 60
        }
        let values = {
            "Salmon": 253, "Tuna": 530, "Istiophoridae": 153, "Fenneropenaeus": 196,
            "Borealis": 250, "Adductor": 87, "Haliotis": 191, "Gratilla": 33,
            "Kuroge": 431, "Chionoecetes": 90, "Eriocheir": 180, "Palinuridae": 100
        }

        const trace = (n) => {
            if (n > 0) {
                if (comefrom[n] !== '') {
                    let tmp = trace(n - sizes[comefrom[n]]);
                    tmp.push(comefrom[n])
                    return tmp
                } else {
                    return trace(n - 1)
                }
            } else {
                return []
            }
        }

        let dp = Array(2001).fill(0);
        let comefrom = Array(2001).fill('');
        let tmpOutput = [];
        let foodTmp = [];
        for (let food of foods) {
            for (let i = 1; i < dp.length; i++) {
                if (i > sizes[food]) {
                    if (dp[i] < dp[i - sizes[food]] + values[food]) {
                        dp[i] = dp[i - sizes[food]] + values[food]
                        comefrom[i] = food
                    } else if (dp[i] < dp[i - 1]) dp[i] = dp[i - 1]
                } else if (dp[i] < dp[i - 1]) dp[i] = dp[i - 1]
            }

            foodTmp.push(food);
            tmpOutput.push({ "considerate": foodTmp.slice(), "combinations": trace(n), "sum": dp[n] })
        }
        console.log(tmpOutput)
        setoutMsg(tmpOutput);
    }

    return (
        <MDBContainer className="mt-5">
            <MDBRow>
                <MDBCol size="12" md="4">
                    <MDBInput label="stomach container" className="my-3" onChange={(e) => { stomachSize.current = parseInt(e.target.value) }} />
                    <MDBInput label="type to eat" className="my-3" onChange={(e) => { typeToEat.current = e.target.value.split(',') }} />
                    <MDBBtn className="my-3" onClick={() => { knap(stomachSize.current, typeToEat.current) }} >submit</MDBBtn>
                </MDBCol>
                <MDBCol size="12" md="8">
                    {outMsg.map((item, idx) => (
                        <div key={idx} className="my-3">
                            <div>
                                只考慮 {item.considerate.map(item => <span className="text-success px-1">{item}</span>)}
                            </div>
                            <div className="d-flex flex-wrap">
                                {item.combinations.map(item => <div className="d-flex border px-1">{item}</div>)}
                            </div>
                        </div>
                    ))}
                    {outMsg.length &&<div>
                        Resault:
                        當背包大小為: {stomachSize.current}，拿 {
                            typeToEat.current.map(
                                item => {
                                    let len = outMsg[outMsg.length - 1].combinations.filter(item1 => (item1 === item)).length
                                    return len === 0 ? '' : ` ${item} ${len} 個,`
                                }
                            )
                        }
                        得總價值 {outMsg[outMsg.length - 1].sum}
                    </div>}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Index
