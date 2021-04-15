import React, { useRef, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import Nodes from "./Nodes";
import "./Index.css";

function Index() {
  const typeToEat = useRef("");
  const numToEat = useRef([]);
  const [best, setBest] = useState([]);
  const [dp, setDp] = useState([]);
  const [displayTable, setDisplayTable] = useState([]);
  const [types, setTypes] = useState("")

  const optTree = (foodnums, typeToEat) => {
    typeToEat = typeToEat.split("")
    foodnums = foodnums.split(',').map(item => parseInt(item))
    setTypes(prevState => typeToEat)
  
    let dp = Array(foodnums.length + 2)
      .fill([])
      .map((item) => Array(foodnums.length + 1).fill(0));
    let best = Array(foodnums.length + 2)
      .fill([])
      .map((item) => Array(foodnums.length + 1).fill(0));

    for (let i = 1; i < dp.length; i++) {
      for (let j = i; j < dp[i].length; j++) {
        if (j === i) {
          dp[i][j] = foodnums[i - 1];
          best[i][j] = j;
        } else {
          dp[i][j] = Number.MAX_SAFE_INTEGER;
        }
      }
    }
    for (let j = 1; j < foodnums.length; j++) {
      for (let i = 1; i <= foodnums.length - j; i++) {
        for (let k = i; k <= i + j; k++) {
          let tmp = dp[i][k - 1] + dp[k + 1][i + j];
          if (tmp < dp[i][i + j]) {
            dp[i][i + j] = tmp;
            best[i][i + j] = k;
          }
        }
        let tmp = 0;
        for (let k = i; k <= i + j; k++) {
          tmp += foodnums[k - 1];
        }

        dp[i][i + j] += tmp;
      }
    }
    setDp(dp);

    let tmpDp = dp.slice();
    let tmpType = typeToEat.slice();
    tmpDp.splice(tmpDp.length - 1, 1);
    tmpType.splice(0, 0, "");
    tmpDp[0] = tmpType;

    for (let i = 1; i < tmpDp.length; i++) {
      for (let j = 0; j < tmpDp[i].length; j++) {
        if (j === 0) {
          tmpDp[i][j] = typeToEat[i - 1];
        } else {
          if (j < i) {
            tmpDp[i][j] = "";
          } else {
            tmpDp[i][j] = tmpDp[i][j].toString() + typeToEat[best[i][j] - 1];
          }
        }
      }
    }
    setBest(best);
    setDisplayTable(tmpDp);
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol size="12" md="4">
          <MDBInput label="食物代號" className="my-3" onChange={(e)=>{typeToEat.current = e.target.value}}/>
          <MDBInput label="吃得貫數" className="my-3" onChange={(e)=>{numToEat.current = e.target.value}}/>
          <MDBBtn
            className="my-3"
            onClick={() => {
              // optTree(numToEat.current, typeToEat.current.split());
              optTree(numToEat.current, typeToEat.current);
            }}
          >
            submit
          </MDBBtn>
        </MDBCol>
        <MDBCol size="12" md="4">
          <div className="flex-1">
            {displayTable.map((row) => (
              <div className="row fixed-height flex-nowrap">
                {row.map((col) => (
                  <div className="col text-center flex-item border">{col}</div>
                ))}
              </div>
            ))}
          </div>
        </MDBCol>

        <MDBCol size="12" md="4">
          {!!best[0] && best[0].length && (
            <Nodes
              left={1}
              right={best[0].length - 1}
              comeList={best}
              className="w-100"
              typeToEat={types}
            ></Nodes>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Index;
