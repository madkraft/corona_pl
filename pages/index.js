import React from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { LineChart } from "../components/LineChart";

const getDailyIncrease = (data) => {
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

const getMovingAverage = (data) => {
  let res = [];

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

export async function getServerSideProps() {
  const res = await fetch(`https://api.covid19api.com/total/dayone/country/poland/status/confirmed`);
  const data = await res.json();

  const increase = getDailyIncrease(data);
  const movingAverage = getMovingAverage(increase);

  return {
    props: {
      dailyNewCases: [
        {
          id: "polandDailyIncrease",
          data: increase,
        },
      ],
      movingAverage: [
        {
          id: "polandThreeDayMovingAverage",
          data: movingAverage,
        },
      ],
    },
  };
}

const Home = (props) => {
  const lastDay = props.dailyNewCases[0].data[props.dailyNewCases[0].data.length - 1].y;

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero">
        <h1 className="last-number">Last day: {lastDay}</h1>

        <h3 className="chart-subtitle">Daily increase</h3>
        <div className="chart">
          <LineChart data={props.dailyNewCases} curve="step" />
        </div>

        <h3 className="chart-subtitle">Three day moving average</h3>
        <div className="chart">
          <LineChart data={props.movingAverage} curve="monotoneX" />
        </div>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: Lucida Console, Courier, monospace;
          background: #000;
          color: #1b9e77;
        }
      `}</style>

      <style jsx>{`
        .hero {
          width: 100%;
        }
        .chart {
          margin: 50px auto 40px;
          height: 400px;
          max-width: 95vw;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .chart:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }

        .last-number {
          text-align: center;
        }

        .chart-subtitle {
          padding: 0 40px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
