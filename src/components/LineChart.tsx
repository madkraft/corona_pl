import { FC } from "react";

import { ResponsiveLine } from "@nivo/line";

export interface ChartDataPoint {
  x: string;
  y: number;
}

export const LineChart: FC<{
  data: ChartDataPoint[];
  curve: "step" | "monotoneX";
}> = ({ curve, data }) => {
  return (
    <ResponsiveLine
      data={[
        {
          id: "dailyNewCases",
          data,
        },
      ]}
      curve={curve}
      colors={{ scheme: "dark2" }}
      margin={{
        top: 30,
        right: 50,
        bottom: 60,
        left: 20,
      }}
      yScale={{
        type: "linear",
        // max: 10000
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
        tickSize: 4,
        // tickPadding: 1,
      }}
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
    />
  );
};
