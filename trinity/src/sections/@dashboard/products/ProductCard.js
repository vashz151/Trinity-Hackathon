import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Label from "../../../components/label";
import { ColorPreview } from "../../../components/color-utils";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
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

export default function ShopProductCard({ product }) {
  const { name, cover, status } = product;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buttonOpen, setOpenButton] = React.useState(false);

  const handleClick = () => {
    setOpenButton(true);
  };
  const handleCloseButton = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenButton(false);
  };
  const { t } = useTranslation();
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          Ranked-Choice
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
              }}
            >
              <Button sx={{boxShadow:24, backgroundColor:'#b0b8ce'}} variant="contained" onClick={handleOpen}>
                {t('vote')}
              </Button>
            </Typography>
          </Typography>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Select the Person to vote for
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Sakshi"
                  />
                  <FormControlLabel control={<Checkbox />} label="Yash" />
                </FormGroup>
              </Typography>
              <br />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined" onClick={handleClick}>
                  submit
                </Button>
              </Box>
            </Box>
          </Modal>
        </Stack>
      </Stack>
    </Card>
  );
}
