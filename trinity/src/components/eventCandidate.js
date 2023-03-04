import React, { useState } from "react";
import { TextField } from "@mui/material";

function EventCandidate(props) {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const handleChange = (e) => {
    //set name and key states to the value of input field
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "key") {
      setKey(e.target.value);
    }
  };
  const { cname, ckey } = props;
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Candidate Name"
        variant="outlined"
        sx={{ marginRight: "20px" }}
        name="name"
        value={name}
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Unique Key"
        variant="outlined"
        name="key"
        value={key}
        onChange={handleChange}
      />
    </>
  );
}

export default EventCandidate;
