import ScrollToTop from "@components/buttons/ScrollToTop";
import useScrollPosition from "@hooks/useScrollPosition";
import Section1 from "@page-components/Home/Section1";
import Section2 from "@page-components/Home/Section2";
import Section3 from "@page-components/Home/Section3";
import Section4 from "@page-components/Home/Section4";
import Section5 from "@page-components/Home/Section5";
import Head from "next/head";

const Home = () => {
  const scrollPosition = useScrollPosition();

  return (
    <>
      <Head>
        <title>Maker Academy Homepage</title>
        {/* <meta name="description" content={_document?.description} /> */}
      </Head>

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />

      {scrollPosition > 150 && <ScrollToTop />}
    </>
  );
};

export default Home;
