import { Box } from "@mui/material";
import Section1 from "@page-components/Home/Section1";
import Section2 from "@page-components/Home/Section2";
import Section3 from "@page-components/Home/Section3";
import Section4 from "@page-components/Home/Section4";
import Section5 from "@page-components/Home/Section5";

const Home = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      {/* <Box sx={{ height: "200vh" }}></Box> */}
    </>
  );
};

export default Home;
