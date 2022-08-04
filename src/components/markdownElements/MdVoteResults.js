import React from "react";
import ReactEcharts from "echarts-for-react";
import { Box, Typography, useTheme } from "@mui/material";
import Title from "@components/Title";

const MdVoteResults = (props) => {
  const theme = useTheme();
  const { title, direction, labels = [], data = [] } = props.data;

  const yAxis =
    direction === "horizontal"
      ? {
          type: "category",
          data: labels,
        }
      : { type: "value" };

  const xAxis =
    direction === "horizontal"
      ? { type: "value" }
      : {
          type: "category",
          data: labels,
        };

  return (
    <Box>
      {title && <Title sx={{ mb: -4, ml: 2 }}>{title}</Title>}

      <ReactEcharts
        style={{ height: data?.length * 110 }}
        option={{
          yAxis,
          xAxis,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          series: [
            {
              data: data,
              type: "bar",
              showBackground: true,

              barCategoryGap: 20,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
              itemStyle: {
                color: theme.palette.primary.main,
              },
              label: {
                show: true,
                position: "right",
                color: theme.palette.text.primary,
              },
            },
          ],
        }}
      />
    </Box>
  );
};

export default MdVoteResults;
