import React, { useState } from 'react'
import NavBar from './NavBar'
import { HashRouter, Switch, Route } from "react-router-dom";
import Demo1 from './Demo1'
import Demo2 from './Demo2'
import Demo3 from './Demo3'
import Graph from "react-graph-vis";
const loading = <div className="pt-3 text-center">i am loading</div>;


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const App1 = () => {
  const createNode = (x, y) => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `Node ${id}`, color, x, y }
          ],
          edges: [
            ...edges,
            { from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  }
  const [state, setState] = useState({
    counter: 100,
    graph: {
      nodes: [
        { id: 1, label: "Node 1", color: "#e04141" },
        { id: 2, label: "Node 2", color: "#e09c41" },
        { id: 3, label: "Node 3", color: "#e0df41" },
        { id: 4, label: "Node 4", color: "#7be041" },
        { id: 5, label: "Node 5", color: "#41e0c9" }
      ],
      edges: [
        { from: 1, to: 2 ,color: "#e04141"},
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        alert("Selected node: " + nodes);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      }
    }
  })
  const { graph, events } = state;
  return (
    <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
  );

}



function App() {
  return (
    <div>
      <HashRouter>
        <NavBar />
        <App1 />
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/demo1"
              name="demo1"
              render={(props) => <Demo1 {...props} />}
            />
            <Route
              exact
              path="/demo2"
              name="demo2"
              render={(props) => <Demo2 {...props} />}
            />
            <Route
              exact
              path="/demo3"
              name="demo3"
              render={(props) => <Demo3 {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </div>
  )
}

export default App