import { withProtectedUser } from "@hoc/routes";
import { listenLocales } from "@lib/locales";
import { Box } from "@mui/material";
import LocalesTable from "@page-components/AdminLocales/LocalesTable";
import NewLocale from "@page-components/AdminLocales/NewLocale";
import TabsAppbar from "@page-components/AdminLocales/TabsAppbar";
import React, { useEffect, useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const LocalesPage = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [locales, setLocales] = useState([]);

  useEffect(() => {
    const unsub = listenLocales((res) => setLocales(res || []));

    return () => unsub();
  }, []);

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <TabsAppbar
        locales={locales}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {locales?.length > 0 && (
        <Box sx={{ pt: 3, px: 3 }}>
          <NewLocale locales={locales} selectedTab={selectedTab} />
        </Box>
      )}

      {locales?.length > 0 &&
        locales?.map?.((_, i) => (
          <React.Fragment key={i}>
            {selectedTab === i && (
              <TabPanel value={i} index={i}>
                <LocalesTable locales={locales[selectedTab]} />
              </TabPanel>
            )}
          </React.Fragment>
        ))}
    </Box>
  );
};

export default LocalesPage;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 4 });
