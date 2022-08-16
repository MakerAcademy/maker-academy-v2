import FormDropzone from "@components/formFields/FormDropzone";
import React from "react";

const File = ({ control, ...other }) => {
  return <FormDropzone control={control} {...other} />;
};

export default File;
