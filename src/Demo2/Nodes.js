import React, { useEffect, useState } from 'react'
import './Node.css'

function Nodes({ comeList, left, right, typeToEat, dir }) {
    const [cur, setCur] = useState(comeList[left][right]);
    const mapping = {
        "S": "Salmon", "T": "Tuna", "I": "Istiophoridae", "F": "Fenneropenaeus",
        "B": "Borealis", "A": "Adductor", "H": "Haliotis", "G": "Gratilla",
        "K": "Kuroge", "C": "Chionoecetes", "E": "Eriocheir", "P": "Palinuridae"
    }
    return (
        <React.Fragment>
            {
                left <= right && (
                    <div className="w-100 overflow-hidden">
                        <div className="w-100 d-flex justify-content-center">
                            <div className="border d-flex w-100 mx-3 bg-white text-center" style={{zIndex: "1000"}}>
                                <div className={`${dir} tick`} style={{zIndex: "-1"}}></div>
                                <div className="text-center w-100">{mapping[typeToEat[cur - 1]]}</div>
                            </div>
                        </div>
                        <div className="d-flex w-100">
                            <div className="nodes__wrapper left d-flex flex-1 flex-grow-1 bg-white">
                                {!!cur && <Nodes left={left} right={cur - 1} comeList={comeList} typeToEat={typeToEat} dir="left"></Nodes>}
                            </div>
                            <div className={"nodes__wrapper right d-flex flex-1 flex-grow-1 bg-white"}>
                                {!!cur && <Nodes left={cur + 1} right={right} comeList={comeList} typeToEat={typeToEat} dir="right"></Nodes>}
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default Nodes