import Title from "@components/Title";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ReactEcharts from "echarts-for-react";

const AboutBudget = () => {
  const options = {
    color: ["#80FFA5", "#00DDFF"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    legend: {
      left: "right",
      data: ["Total Income", "Total Expenses"],
    },
    xAxis: [
      {
        show: false,
        type: "category",
        boundaryGap: false,
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
    ],
    yAxis: [{ show: false, type: "value" }],
    series: [
      {
        name: "Total Income",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        areaStyle: {},
      },
      {
        name: "Total Expenses",
        data: [600, 541, 688, 1011, 700, 745, 623],
        type: "line",
        smooth: true,
        areaStyle: {},
      },
    ],
  };

  return (
    <Box>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: { xs: 3, md: 5 } }}>
        Budget
      </Title>

      <Title variant="h5" sx={{ mb: { xs: 2, md: 3 } }}>
        Maker Academy Budget
      </Title>

      <Typography sx={{ mb: 7, whiteSpace: "pre-line" }}>
        {
          "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral. "
        }
      </Typography>

      <Paper
        elevation={1}
        sx={{ p: { xs: 3, md: 5 }, borderRadius: "16px", height: 400 }}
      >
        <ReactEcharts
          style={{ height: "100%", width: "100%" }}
          option={options}
        />
      </Paper>
    </Box>
  );
};

export default AboutBudget;
