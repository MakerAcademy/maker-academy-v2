import ProfileCard from "@components/cards/ProfileCard";
import { Box } from "@mui/material";

export default {
  title: "Cards/Profile Card",
  component: ProfileCard,
};

const Template = (args) => (
  <Box sx={{ maxWidth: 300 }}>
    <ProfileCard {...args} />
  </Box>
);

export const Main = Template.bind({});
Main.args = {
  id: "123",
  firstName: "Salman",
  lastName: "Testing",
  title: "Developer",
  email: "salmanfazal01@gmail.com",
  socials: { instagram: "test", linkedin: "salmanfazal" },
};
