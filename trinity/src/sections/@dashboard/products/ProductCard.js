import PropTypes from "prop-types";
// @mui
import { Card, Link, Typography, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import account from "../../../_mock/account";
import DeleteIcon from "@mui/icons-material/Delete";
import Ballot from "../../../truffle_abis/Ballot.json";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

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

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShopProductCard({ productts, status }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [buttonOpen, setOpenButton] = React.useState(false);
  const [eventId, setEventId] = React.useState("");

  const handleVote = async () => {
    console.log("dfdf");
    const account = localStorage.getItem("id");
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
      // const allPastEvents = await ballot.getPastEvents('allEvents', {

      const isAllowed = await ballot.methods
        .isAllowedToVote(account, parseInt(productts["7"]))
        .call();
      console.log(isAllowed);
    }
  };

  const seeList = async () => {
    const account = localStorage.getItem("id");
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
      const canlen = await ballot.methods
        .getCandidatesLength(productts["7"])
        .call();
      console.log(canlen);
      for (let i = 0; i < canlen; i++) {
        const res = await ballot.methods.getCandidate(productts["7"], i).call();
        let name = await window.web3.utils.hexToUtf8(res["name"]);
        console.log(name);
        console.log(res);
      }
    }
  };

  const handleClick = () => {
    handleVote();
    setEventId(productts["7"]);
    navigate("/eventconfirm", { state: { eventId: productts["7"] } });
  };

  useEffect(() => {
    if (status === true) {
      setOpen(true);
    }
  }, [status]);

  const { t } = useTranslation();
  return (
    <Card sx={{ minWidth: "300px" }} elevation={5}>
      <CardHeader
        avatar={<Avatar aria-label="avatar" src={account.photoURL}></Avatar>}
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={productts["0"]}
      />
      <br />
      <Divider></Divider>
      {/* <br/> */}
      {/* <Typography sx={{display:'flex', justifyContent:'center',}}> Stakeholder Name: {productts['4']}</Typography> */}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: "bold" }}> Type </Typography>
          {productts["typ"]}
        </Stack>
        <Typography>Description: {productts["desc"]}</Typography>
        <Typography variant="subtitle1">
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: "text.disabled",
            }}
          >
            <Button
              size="large"
              sx={{ boxShadow: 24, backgroundColor: "#b0b8ce" }}
              variant="contained"
              onClick={handleClick}
            >
              {t("vote")}
            </Button>
          </Typography>
        </Typography>
        {/* <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        > */}
        {/* <Box sx={style}>
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
            </FormGroup> */}

        <br />
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleClick}>
                Submit
              </Button>
            </Box> */}
        {/* </Box> */}
        {/* </Modal> */}
      </Stack>
    </Card>
  );
}
