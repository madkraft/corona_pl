import React from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { ResponsiveLine } from "@nivo/line";

const markerTextStyle = { fontSize: "12px", opacity: 0.5, fill: "#e6ab02" };

const markerLineStyle = { stroke: "#e6ab02", strokeWidth: 1, strokeDasharray: 5, strokeOpacity: 0.4 };

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

export async function getServerSideProps() {
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
            colors={{ scheme: "dark2" }}
            margin={{
              top: 30,
              right: 50,
              bottom: 60,
              left: 30,
            }}
            yScale={{
              type: "linear",
            }}
            xScale={{
              type: "time",
              format: "%Y-%m-%dT%H:%M:%SZ",
              precision: "day",
            }}
            axisBottom={{
              format: "%b %d",
              // tickValues: "every 3 days",
              tickRotation: -60,
              tickSize: 0,
              tickPadding: 10,
            }}
            axisLeft={null}
            axisRight={{
              enable: true,
              tickSize: 10,
              tickPadding: 10,
            }}
            curve={"step"}
            // curve={"stepBefore"}
            // curve={"monotoneX"}
            // enablePointLabel={true}
            // pointSize={3}
            enablePoints={false}
            enableArea={true}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: 14,
                    fill: "#666666",
                    fontFamily: "Lucida Console, Courier, monospace",
                  },
                },
              },
              grid: { line: { stroke: "#666666", strokeWidth: 0.5 } },
            }}
            markers={[
              {
                axis: "y",
                value: 300,
                lineStyle: markerLineStyle,
                // legend: "wakacje",
                // legendOrientation: "vertical",
              },
              {
                axis: "x",
                value: new Date(props.data[0].data[58].x),
                lineStyle: markerLineStyle,
                textStyle: markerTextStyle,
                legend: "majowka",
                legendOrientation: "vertical",
              },
              {
                axis: "x",
                value: new Date(props.data[0].data[61].x),
                lineStyle: markerLineStyle,
                textStyle: markerTextStyle,
                legend: "II etap",
                legendOrientation: "vertical",
              },
              {
                axis: "x",
                value: new Date(props.data[0].data[75].x),
                lineStyle: markerLineStyle,
                textStyle: markerTextStyle,
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
          font-family: Lucida Console, Courier, monospace;
          background: #000;
        }
      `}</style>

      <style jsx>{`
        .hero {
          width: 100%;
        }
        .chart {
          margin: 50px auto 40px;
          height: 400px;
          width: 80vw;
          max-width: 80vw;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .chart:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Home;
