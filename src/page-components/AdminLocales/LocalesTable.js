import { LANGUAGES } from "@constants/";
import { updateLocaleField, updateLocaleFields } from "@lib/locales";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { translateText } from "@utils/helperFunctions";

const TranslateButton = ({ params, locales }) => {
  const { row } = params;
  const { id, word, en } = row;

  const translateAll = async () => {
    const _results = await Promise.all(
      LANGUAGES.map(async (lang) => ({
        [lang]: row[lang] || (await translateText(en, "en", lang)),
      }))
    );
    const results = Object.assign({}, ..._results);

    await updateLocaleFields(locales.id, word, results);
  };

  return (
    <IconButton onClick={translateAll}>
      <GTranslateIcon fontSize="small" />
    </IconButton>
  );
};

const parseColumns = (languages, locales) => {
  return [
    { field: "id", headerName: "ID", width: 50 },
    { field: "word", headerName: "Word", width: 250 },
    ...languages?.map?.((lang) => ({
      field: lang,
      headerName: lang,
      width: 250,
      editable: true,
    })),
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <TranslateButton params={params} locales={locales} />
      ),
      disableClickEventBubbling: true,
    },
  ];
};

const parseRows = (data, languages) => {
  if (!data.en) return [];

  return [
    ...Object.keys(data.en).map((_key, i) => {
      const _rows = languages.reduce((acc, lang) => {
        acc[lang] = data?.[lang]?.[_key];
        return acc;
      }, {});

      return {
        id: i,
        word: _key,
        ..._rows,
      };
    }),
  ];
};

const LocalesTable = ({ locales }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setColumns(parseColumns(LANGUAGES, locales));
    setRows(parseRows(locales, LANGUAGES));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locales, LANGUAGES]);

  const handleCellChange = (_props = {}) => {
    const { id, field, value } = _props;

    // console.log(_props);

    //if word changed

    //if value changed
    if (id !== null && field !== "word") {
      const word = rows.find((x) => x.id === id)?.word;
      updateLocaleField(locales.id, field, word, value);
    }
  };

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns || []}
        pageSize={100}
        // rowsPerPageOptions={[5]}
        disableSelectionOnClick
        onCellEditCommit={(e) => {
          handleCellChange(e, rows);
        }}
      />
    </Box>
  );
};

export default LocalesTable;
