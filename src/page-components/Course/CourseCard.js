import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GreenButton from "@components/buttons/GreenButton";

const Item = ({ Icon, title, value, bold }) => (
  <Box>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {Icon && <Icon sx={{ fontSize: 18 }} />}
        <Typography variant="body2" sx={{ fontWeight: bold ? 500 : 400 }}>
          {title}
        </Typography>
      </Stack>

      <Typography variant="body2" sx={{ fontWeight: bold ? 500 : 400 }}>
        {value}
      </Typography>
    </Stack>

    <Divider sx={{ my: 1.8 }} />
  </Box>
);

const CourseCard = ({
  thumbnail = "https://s32659.pcdn.co/wp-content/uploads/2021/01/BIC_DeFi_Deep_Dive_MakerDAO.jpg.optimal.jpg",
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        zIndex: 99999999,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 300,
          width: "100%",
          mb: 3,
        }}
      >
        <Image
          src={thumbnail}
          loader={() => thumbnail}
          alt="Course thumbnail"
          layout="fill"
          objectFit="cover"
          style={{
            borderRadius: "12px",
          }}
        />
      </Box>

      <Box sx={{ px: 2 }}>
        <Item title="You started on" value="Not enrolled" bold />

        <Item Icon={DescriptionOutlinedIcon} title="Lessons" value="6" />

        <Item Icon={AccessTimeOutlinedIcon} title="Duration" value="30 mins" />

        <Item
          Icon={AssessmentOutlinedIcon}
          title="Skill Level"
          value="Beginner"
        />

        <Box sx={{ px: 2, pt: 3, pb: 1 }}>
          <GreenButton variant="outlined" size="small" fullWidth>
            Enroll
          </GreenButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default CourseCard;
