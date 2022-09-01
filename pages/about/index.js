import React from "react";

const AboutUs = () => {
  return <div></div>;
};

export default AboutUs;

export const getServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/about/mission",
    },
  };
};
