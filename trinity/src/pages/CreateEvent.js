import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Stack, TextField, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Ballot from "../truffle_abis/Ballot.json";
// components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTranslation } from "react-i18next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateEvent() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const[time, setTime] = useState("12/03/2023");
  const [value, setValue] = React.useState("approval");


  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [candidate, setCandidate] = useState([
    {
      name: "",
      key: "",
    },
  ]);
  const handleClick = () => {
    setCount(count + 1);
    setCandidate([
      ...candidate,
      {
        name: "",
        key: "",
      },
    ]);
    candidate.pop();
  };

  const handleSubmit = async () => {
    // create event by the owner
    const account = localStorage.getItem("id");
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    console.log("networkId: ", networkId);
    const networkData = Ballot.networks[networkId];
    if (networkData) {
      const ballot = new window.web3.eth.Contract(
        Ballot.abi,
        networkData.address
      );
      const owner = await ballot.methods.owner().call();
      if (owner.toUpperCase() === account.toUpperCase()) {
        // create array of candidate names in bytes32
        const candidateNames = [];
        for (let i = 0; i < candidate.length; i++) {
          candidateNames.push(window.web3.utils.asciiToHex(candidate[i].name));
        }
        const candidateKeys = [];
        for (let i = 0; i < candidate.length; i++) {
          candidateKeys.push(parseInt(candidate[i].key));
        }
        console.log(candidateNames);
        console.log(candidateKeys);
        console.log(document.getElementsByName("Name")[0].value);
        const res = await ballot.methods.createEvent(document.getElementsByName("Name")[0].value, document.getElementsByName("describe")[0].value,document.getElementsByName("names")[0].value,time, 50, candidateNames, candidateKeys, 2115, value).send({ from: account });
        console.log(res);

      } else {
        alert("You are not the owner");
      }
    }
  };

  const handleDelete = (name, key) => {
    const index = candidate.findIndex((item) => item.name === name);
    console.log(index, name, key);
    const newCandidate = [...candidate];
    newCandidate.splice(index, 1);
    console.log(newCandidate);
    setCandidate(newCandidate);
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t("create_a_voting_event")}
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: 600 }}>
        <TextField
          name="Name"
          label={t("name_of_voting_event")}
          id="outlined-required"
        ></TextField>
        <TextField
          name="names"
          label={t("skateholder_name")}
          id="outlined-required"
        />
        <TextField
          name="describe"
          label={t("description")}
          id="outlined-required"
          multiline
          rows={3}
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {t("type_of_voting")}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="approval"
              control={<Radio />}
              label={t("approval")}
              name="type"
            />
            <FormControlLabel
              value="single_choice"
              control={<Radio />}
              label={t("single_choice")}
              name="type"
            />
          </RadioGroup>
        </FormControl>
        <Typography>
        {t("candidate_name")}
          <Button onClick={handleClick}>
            <AddCircleIcon />
          </Button>
        </Typography>
        
        {candidate.map((item, index) => (
          <Box key={index} sx={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label={t("candidate")}
              variant="outlined"
              onChange={(e) => {
                item.name = e.target.value;
              }}
              sx={{ marginRight: "20px" }}
            />
            <TextField
              id="outlined-basic"
              label={t("unique_key")}
              variant="outlined"
              onChange={(e) => {
                item.key = e.target.value;
              }}
            />
            <Button aria-label="delete" sx={{ color: "red" }}>
              <DeleteIcon
                onClick={() => {
                  handleDelete(item.name, item.key);
                }}
              />
            </Button>
          </Box>
        ))}
      </Stack>
      <br />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <LoadingButton size="large" variant="contained" onClick={handleSubmit}>
          {t("create_event")}
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default CreateEvent;
