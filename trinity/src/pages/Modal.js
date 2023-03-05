import PropTypes from "prop-types";
// @mui
import { Card, Link, Typography, Stack, FormControl, FormGroup, FormControlLabel, Checkbox, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Ballot from "../truffle_abis/Ballot.json";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";


const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  opacity: "0.8",
});

// ----------------------------------------------------------------------
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Modal() {
  const [open, setOpen] = React.useState(false);
  const [buttonOpen, setOpenButton] = React.useState(false);
  const [candidated, setCandidated] = React.useState([]);

  const handleClick = async () => {
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    console.log("networkId: ", networkId);
    const networkData = await Ballot.networks[networkId];
    if (networkData) {
      const ballot = new window.web3.eth.Contract(
        Ballot.abi,
        networkData.address
      );
        const ev = localStorage.getItem("event");
        const canlen = await ballot.methods.getCandidatesLength(parseInt(ev)).call();
        console.log(canlen);
        const temp = [];
        for(let i = 0; i < canlen; i++){
            const res = await ballot.methods.getCandidate(parseInt(ev), i).call();
            // covert res['name'] bytes32 to string
            let name = await window.web3.utils.hexToUtf8(res['name']);
            temp.push({
                name: name,
                voteCount: res['voteCount']
            })
        }
        setCandidated(temp);
    setOpen(false);
      } else {
        window.alert("Ballot contract not deployed to detected network.");
      }
  };

  const handleSubmit = async () => {}

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select the Person to vote for
        </Typography>
        <FormGroup>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Sakshi"
            />
            <FormControlLabel control={<Checkbox />} label="Yash" />
          </Typography>
        </FormGroup>

        <br />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Modal;
