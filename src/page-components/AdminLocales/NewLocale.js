import { LANGUAGES } from "@constants/";
import { addNewLocale } from "@lib/locales";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const NewLocale = ({ locales, selectedTab }) => {
  const data = locales[selectedTab];

  const initialState = {
    word: "",
    ...LANGUAGES.reduce((acc, lang) => ((acc[lang] = ""), acc), {}),
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = () => {
    addNewLocale(data.id, state.word, state).then(() => setState(initialState));
  };

  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <TextField
        label="Word"
        size="small"
        fullWidth
        name="word"
        value={state.word}
        onChange={handleChange}
      />

      {LANGUAGES.map((lang, i) => (
        <TextField
          key={i}
          label={lang}
          size="small"
          name={lang}
          value={state[lang]}
          fullWidth
          onChange={handleChange}
        />
      ))}

      <Button variant="outlined" size="small" fullWidth onClick={handleSubmit}>
        Add
      </Button>
    </Stack>
  );
};

export default NewLocale;
