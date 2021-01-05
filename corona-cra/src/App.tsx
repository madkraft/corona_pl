import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ChartDataPoint, LineChart } from "./components/LineChart";

interface APIDataPoint {
  Cases: number;
  City: string;
  CityCode: string;
  Country: string;
  CountryCode: string;
  Date: string;
  Lat: string;
  Lon: string;
  Province: string;
  Status: string;
}

const getDailyIncrease = (data: APIDataPoint[]): ChartDataPoint[] => {
  return data.map((day, i) => {
    if (i - 1 >= 0) {
      return {
        x: day.Date,
        y: day.Cases - data[i - 1].Cases,
      };
    } else {
      return {
        x: day.Date,
        y: day.Cases,
      };
    }
  });
};

const getMovingAverage = (data: ChartDataPoint[]): ChartDataPoint[] => {
  let res: ChartDataPoint[] = [];

  data.forEach((day, i) => {
    if (i - 3 >= 0) {
      res = [
        ...res,
        {
          x: day.x,
          y: Math.round((day.y + data[i - 1].y + data[i - 2].y) / 3),
        },
      ];
    }
  });

  return res;
};

const getData = async (): Promise<APIDataPoint[]> => {
  const { data } = await axios.get(
    `https://api.covid19api.com/total/dayone/country/poland/status/confirmed`
  );
  return data;
};

function App() {
  const [dailyNewCases, setDailyNewCases] = useState<ChartDataPoint[]>([]);
  const [movingAverage, setMovingAverage] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const getCoronaData = async () => {
      const data = await getData();
      // const data = [
      //   {
      //     Cases: 1294878,
      //     City: "",
      //     CityCode: "",
      //     Country: "Poland",
      //     CountryCode: "",
      //     Date: "2020-12-31T00:00:00Z",
      //     Lat: "0",
      //     Lon: "0",
      //     Province: "",
      //     Status: "confirmed",
      //   },
      //   {
      //     Cases: 1305774,
      //     City: "",
      //     CityCode: "",
      //     Country: "Poland",
      //     CountryCode: "",
      //     Date: "2021-01-01T00:00:00Z",
      //     Lat: "0",
      //     Lon: "0",
      //     Province: "",
      //     Status: "confirmed",
      //   },
      // ];
      const newCases = getDailyIncrease(data);
      const average = getMovingAverage(newCases);

      setDailyNewCases(newCases);
      setMovingAverage(average);
    };

    getCoronaData();
  }, []);

  const lastDay = dailyNewCases[dailyNewCases.length - 1];

  return (
    <div className="hero">
      <h1 className="last-number">
        Last record {new Date(lastDay?.x).toLocaleDateString()}: {lastDay?.y}
      </h1>

      <h3 className="chart-subtitle">Daily increase</h3>
      <div className="chart">
        <LineChart data={dailyNewCases} curve="step" />
      </div>

      <h3 className="chart-subtitle">Three day moving average</h3>
      <div className="chart">
        <LineChart data={movingAverage} curve="monotoneX" />
      </div>
    </div>
  );
}

export default App;
