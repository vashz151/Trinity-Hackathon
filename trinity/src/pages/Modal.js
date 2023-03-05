import React from "react";

function Modal() {
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
          <Button variant="outlined" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Modal;
