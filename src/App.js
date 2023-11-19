import "./App.css";
import TopSideLabel from "./components/TopSideLabel";
import TopSideMenuAndLogos from "./components/TopSideMenuAndLogo";
import ChartTitle from "./components/ChartTitle";
import BubleChart from "./components/BubleChart";
import ScatterChart from "./components/ScatterChart";
import ChordDiagram from "./components/ChordDiagram";
import Transfert from "./components/Transfert";
import Amortissement from "./components/Amortissement";
import { useState, useEffect } from "react";

function App() {
  const [dataBuble, setDataBuble] = useState([{}]);
  const [dataScatter, setDataScatter] = useState([
    {
      date: new Date("2018-01-01"),
      data: [85, 75, 72, 67, 50],
    },
    {
      date: new Date("2018-07-01"),
      data: [80, 75, 70, 66, 42],
    },
    {
      date: new Date("2019-01-01"),
      data: [60, 55, 50, 46, 30],
    },
    {
      date: new Date("2019-06-01"),
      data: [80, 72, 75, 67, 40],
    },
    {
      date: new Date("2020-01-01"),
      data: [60, 55, 50, 46, 25],
    },
  ]);
  const [dataChord, setDataChord] = useState([
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907],
  ]);

  const [dataTransfert, setDataTransfert] = useState([
    { value: 45, label: "virus" },
    { value: 55, label: "dos" },
  ]);

  const [dataAmortissement, setDataAmortissement] = useState([
    { date: 2009, value1: 1.8, value2: 1, value3: 18 },
    { date: 2010, value1: 2, value2: 3, value3: 30 },
    { date: 2011, value1: 2.2, value2: 3, value3: 37 },
    { date: 2012, value1: 1.8, value2: 4, value3: 37 },
    { date: 2013, value1: 2.2, value2: 4, value3: 45 },
  ]);

  useEffect(() => {
    let min = Math.ceil(0);
    let max = Math.floor(100);
    let minRadius = Math.ceil(1);
    let maxRadius = Math.ceil(10);

    let myTransitionTab = [];
    myTransitionTab.push(
      { x: 0, y: 0, r: 5, color: "green" },
      { x: 50, y: 50, r: 5, color: "blue" },
      { x: 100, y: 100, r: 5, color: "blue" }
    );
    for (let index = 0; index < 29; index++) {
      let boolRandom = Math.round(Math.random());
      let myColor;
      if (boolRandom === 0) myColor = "green";
      else myColor = "blue";
      myTransitionTab.push({
        x: Math.floor(Math.random() * (max - min + 1)) + min,
        y: Math.floor(Math.random() * (max - min + 1)) + min,
        r: Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius,
        color: myColor,
      });
    }

    setDataBuble(myTransitionTab);
  }, []);

  return (
    <div style={{ width: "99%" }}>
      <TopSideLabel iteration={1} />
      <div className="App">
        <TopSideMenuAndLogos />
        <br></br>
        <ChartTitle
          title={"Repartition des risques en fonction des decisions"}
        />
        <BubleChart data={dataBuble} />
        <br></br>
        <ChartTitle title={"Amortissement des risques"} />
        <Amortissement data={dataAmortissement} />
        <br></br>
        <ChartTitle title={"Cout de correction"} />
        <ScatterChart data={dataScatter} />
        <br></br>
        <ChartTitle title={"Chord diagram"} />
        <ChordDiagram data={dataChord} />
        <br></br>
        <ChartTitle title={"Transfert"} />
        <Transfert data={dataTransfert} />
      </div>
    </div>
  );
}

export default App;
