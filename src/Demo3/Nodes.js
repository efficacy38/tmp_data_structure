import React, { useRef } from 'react'
import './Nodes.css'

function Nodes({ idx, stores }) {
    return (
        <div className="w-100 position-absolute" style={{ transform: `rotate(${360 / stores.length * idx}deg)`, height: "400px" }}>
            <div className="position-relative">
                <div className="w-100" style={{ transform: `rotate(-${360 / stores.length * idx}deg)`}} >
                    <div className="border mx-auto px-3 py-2" style={{borderRadius:"50%", width: "fit-content"}}>{stores[idx]}</div>
                </div>
            </div>
        </div>
    )
}

export default Nodes