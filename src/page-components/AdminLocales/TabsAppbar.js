import { LANGUAGES } from "@constants/";
import { addLocaleFile } from "@lib/locales";
import AddIcon from "@mui/icons-material/Add";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useState } from "react";

const TabsAppbar = ({ locales, selectedTab, setSelectedTab }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleAddFile = () => {
    const _languages = LANGUAGES.reduce((acc, lang) => {
      acc[lang] = { maker: "Maker" };
      return acc;
    }, {});

    if (fileName) {
      addLocaleFile(fileName, _languages).then(() => {
        setDialogOpen(false);
        setFileName("");
      });
    }
  };

  const handleTabChange = (e, v) => {
    setSelectedTab(v);
  };

  return (
    <>
      <AppBar position="static">
        <Stack direction="row" alignItems="center">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            sx={{ flex: 1 }}
          >
            {locales?.map?.((locale, i) => (
              <Tab label={locale._filename} key={i} value={i} />
            ))}
          </Tabs>

          <IconButton color="inherit" onClick={() => setDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        </Stack>
      </AppBar>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add a new file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input a lower-cased file name. This is a page specific file like
            common.json or home.json
          </DialogContentText>
          <TextField
            autoFocus
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            margin="dense"
            label="File Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddFile}>Add File</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TabsAppbar;
