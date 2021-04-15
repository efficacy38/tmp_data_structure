import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useRef, useState } from 'react'
import Nodes from './Nodes';

function Index() {
    const [route, setRoute] = useState([])
    const [stores, setStores] = useState("ABCDE")
    const [inputString, setInputString] = useState("(B,A,1) (B,C,2) (C,D,3) (D,B,6) (D,E,6)")
    const [curIdx, setCurIdx] = useState(0)

    const prepData = (datas) => {
        let tmp = Array(17).fill([]).map(item => Array(17).fill(-1))
        datas.split(' ').forEach(item => {
            let data = item.substring(1, item.length - 1).split(',');
            let src = data[0].charCodeAt(0) - 'A'.charCodeAt(0);
            let dst = data[1].charCodeAt(0) - 'A'.charCodeAt(0);
            tmp[src][dst] = tmp[dst][src] = parseInt(data[2]);
        })

        for (let i = 0; i < 16; i++) {
            tmp[i][i] = 0;
        }
        return tmp;
    }

    const solve = (testData, numN) => {
        let visited = Array(numN).fill(false);
        let comefrom = Array(numN).fill(-1);
        let lenght = Array(numN).fill(-1);
        lenght[0] = 0;

        const dijestra = (start, data) => {
            if (!visited[start]) {
                for (let i = 0; i < numN; i++) {
                    if (data[start][i] !== -1) {
                        if ((lenght[i] === -1 ? Number.MAX_SAFE_INTEGER : lenght[i]) > data[start][i] + lenght[start]) {
                            lenght[i] = data[start][i] + lenght[start];
                            comefrom[i] = start;
                        }
                    }
                }
                visited[start] = true;
                data[start].forEach((value, idx) => {
                    if (value !== -1) {
                        dijestra(idx, data);
                    }
                })
            }
        }
        dijestra(0, testData)
        return comefrom
    }


    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol size="12" md="4">
                    <MDBInput label="店代號" value={stores} onChange={(e) => { setStores(e.target.value) }} className="m-3" />
                    <MDBInput label="店相對位置" value={inputString} onChange={(e) => { setInputString(e.target.value) }} className="m-3" />
                    <MDBBtn onClick={() => { setRoute(solve(prepData(inputString), stores.split('').length)); }}>submit</MDBBtn>
                </MDBCol>
                <MDBCol size="12" md="8">
                    <div className="nodes__container position-relative">
                        {route.map((item, idx) => <Nodes key={item} idx={idx} stores={stores} />)}
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Index
