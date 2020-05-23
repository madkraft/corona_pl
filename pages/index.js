import React from "react";
import Head from "next/head";
import fetch from "node-fetch";
// import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

import Nav from "../components/nav";

const formatDate = (d) => {
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(d));
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(d));

  return `${da}-${mo}`;
};

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

export async function getServerSideProps(context) {
  const res = await fetch(`https://api.covid19api.com/total/dayone/country/poland/status/confirmed`);
  const data = await res.json();

  const increase = getDailyIncrease(data);

  return {
    props: {
      data: [
        {
          id: "polandDailyIncrease",
          data: increase,
        },
      ],
    },
  };
}

const Home = (props) => {
  console.log(props.data);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero">
        <div className="chart">
          <ResponsiveLine
            data={props.data}
            colors={{ scheme: "category10" }}
            margin={{
              top: 30,
              right: 50,
              bottom: 60,
              left: 30,
            }}
            yScale={{
              type: "linear",
            }}
            // curve={"step"}
            curve={"stepBefore"}
            // curve={"monotoneX"}
            // enablePointLabel={true}
            // pointSize={3}
            enablePoints={false}
            axisBottom={{
              tickSize: 0,
              tickPadding: 10,
              tickRotation: -60,
              format: formatDate,
            }}
            axisLeft={null}
            axisRight={{
              enable: true,
              tickSize: 10,
              tickPadding: 10,
              // tickRotation: -60,
              // format: formatDate,
            }}
            enableArea={true}
            markers={[
              {
                axis: "y",
                value: 300,
                lineStyle: { stroke: "#b0413e", strokeWidth: 1, strokeDasharray: 5 },
                // legend: "wakacje",
                // legendOrientation: "vertical",
              },
              {
                axis: "x",
                value: props.data[0].data[58].x,
                lineStyle: { stroke: "#b0413e", strokeWidth: 1, strokeDasharray: 5 },
                textStyle: { fontSize: "12px", opacity: 0.5 },
                legend: "majowka",
                legendOrientation: "vertical",
              },
              {
                axis: "x",
                value: props.data[0].data[61].x,
                lineStyle: { stroke: "#b0413e", strokeWidth: 1, strokeDasharray: 5 },
                textStyle: { fontSize: "12px", opacity: 0.5 },
                legend: "II etap",
                legendOrientation: "vertical",
              },
              {
                axis: "x",
                value: props.data[0].data[75].x,
                lineStyle: { stroke: "#b0413e", strokeWidth: 1, strokeDasharray: 5 },
                textStyle: { fontSize: "12px", opacity: 0.5 },
                legend: "III etap",
                legendOrientation: "vertical",
              },
            ]}
          />
        </div>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
        }
      `}</style>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .chart {
          margin: 50px auto 40px;
          height: 400px;
          width: 80vw;
          max-width: 80vw;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .chart:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Home;
