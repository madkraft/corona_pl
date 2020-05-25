import React from "react";

import { ResponsiveLine } from "@nivo/line";

const markerTextStyle = { fontSize: "12px", opacity: 0.5, fill: "#e6ab02" };

const markerLineStyle = { stroke: "#e6ab02", strokeWidth: 1, strokeDasharray: 5, strokeOpacity: 0.4 };

export function LineChart(props) {
  return (
    <ResponsiveLine
      data={props.data}
      colors={{ scheme: "dark2" }}
      margin={{
        top: 30,
        right: 50,
        bottom: 60,
        left: 20,
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
      curve={props.curve}
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
        grid: { line: { stroke: "#282828", strokeWidth: 0.5 } },
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
          value: new Date("2020-05-01T00:00:00Z"),
          lineStyle: markerLineStyle,
          textStyle: markerTextStyle,
          legend: "majowka",
          legendOrientation: "vertical",
        },
        {
          axis: "x",
          value: new Date("2020-05-04T00:00:00Z"),
          lineStyle: markerLineStyle,
          textStyle: markerTextStyle,
          legend: "II etap",
          legendOrientation: "vertical",
        },
        {
          axis: "x",
          value: new Date("2020-05-18T00:00:00Z"),
          lineStyle: markerLineStyle,
          textStyle: markerTextStyle,
          legend: "III etap",
          legendOrientation: "vertical",
        },
      ]}
    />
  );
}
