import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "./icon.svg";
function VerifyEvent({ password }) {
  localStorage.setItem("id", "0x5B0936A2Be9a5F73E267279aeeb68445eeFb18b7");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEvent = () => {
    const VerifyEvent = document.querySelectorAll("input");
    let otp = "";
    VerifyEvent.forEach((otp1) => {
      otp += otp1.value;
    });

    if (password === otp) {
      console.log("verified");
      navigate("/login");
    } else {
      navigate("/dashboard/app");
      console.log("failed");
    }
  };
  const inputStyle = {
    width: "56px",
    height: "56px",
    marginLeft: "15px",
    marginRight: "40px",
    padding: "20px",
    borderRadius: "8px",
    fontSize: "20px",
  };
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      if (e.target.value.length === 1) {
        if (e.target.nextElementSibling.disabled) {
          e.target.nextElementSibling.disabled = false;
        }
        e.target.nextElementSibling.focus();
      } else if (e.key === "Backspace") {
        if (e.target.previousElementSibling) {
          if (e.target.previousElementSibling.value.length === 1) {
            e.target.previousElementSibling.focus();
            e.target.disabled = true;
          } else if (e.target.previousElementSibling === null) {
          } else {
            e.target.previousElementSibling.previousElementSibling.focus();
          }
        }
      }
    });
  });

  return (
    <div>
      <Card
        sx={{
          width: "80%",
          height: "550px",
          backgroundColor: "white",
          border: "none",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={Icon}
            style={{
              height: "90px",
              width: "100px",
              display: "block",
            }}
            alt="icon"
          />
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Please enter the event code
          <br />
        </Typography>
        {loading && (
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loading && <CircularProgress />}
            <br />
          </Typography>
        )}
        <br />
        <input
          type="text"
          maxLength="1"
          style={{
            width: "56px",
            height: "56px",
            marginRight: "40px",
            marginLeft: "50px",
            padding: "20px",
            borderRadius: "8px",
            fontSize: "20px",
            marginTop: "25px",
          }}
        />
        <input type="text" maxLength="1" style={inputStyle} />
        <input type="text" maxLength="1" style={inputStyle} />
        <input type="text" maxLength="1" style={inputStyle} />
        <br />
        <br />
        <Button
          type="submit"
          color="inherit"
          variant="contained"
          onClick={handleEvent}
          sx={{
            width: "60%",
            padding: "10px",
            marginLeft: "110px",
            marginBottom: "38px",
            color: "black",
            backgroundColor: "#9D00FF",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Verify
        </Button>
        <br />
      </Card>
    </div>
  );
}
export default VerifyEvent;
