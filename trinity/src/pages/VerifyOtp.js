import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CircularProgress } from "@mui/material";
import { getDetail } from "../api/FetchDetail";
import { sendOtp } from "../api/SendOtp";
import Icon from "./icon.svg";
function VerifyOtp() {
  localStorage.setItem("id", "0x5B0936A2Be9a5F73E267279aeeb68445eeFb18b7");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState();
  const [password, setPwd] = useState();
  const [mobileNo, setMobileNo] = useState();
  useEffect(() => {
    const details = async () => {
      const data = await getDetail();
      setMobileNo(data.mobile);
      const regex = /(?<=\d{2})\d(?=\d{3})/g;
      const mobileno = "+" + data.mobile.replace(regex, "*");
      setMobile(mobileno);
      const { otp } = await sendOtp(data.mobile);
      console.log("pwd", otp);
      setPwd(otp);
    };
    details();
  }, []);

  const handleOtp = async () => {
    setLoading(true);
    console.log("mobile", mobile);
    const { otp } = await sendOtp(mobileNo);
    setLoading(false);
    setPwd(otp);
  };
  const verifyOtp = () => {
    const verifyOtp = document.querySelectorAll("input");
    let otp = "";
    verifyOtp.forEach((otp1) => {
      otp += otp1.value;
    });
    console.log(typeof otp);

    if (password.toString() === otp) {
      console.log("success");
      // showAlert("success", "OTP verified successfully!");
    } else {
      console.log("failed");
    }
  };
  const inputStyle = {
    width: "56px",
    height: "56px",
    marginLeft: "15px",
    marginRight: "10px",
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

  const [time, setTime] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((time) => time - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
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
          Please Check Your Mobile!
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
        <Typography
          variant="p"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
            padding: "15px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          We have message a 6-digit confirmation code to {mobile}, please enter
          the code in below box to verify your mobile.{" "}
        </Typography>
        <input
          type="text"
          maxLength="1"
          style={{
            width: "56px",
            height: "56px",
            marginRight: "10px",
            marginLeft: "40px",
            padding: "20px",
            borderRadius: "8px",
            fontSize: "20px",
          }}
        />
        <input type="text" disabled maxLength="1" style={inputStyle} />
        <input type="text" disabled maxLength="1" style={inputStyle} />
        <input type="text" disabled maxLength="1" style={inputStyle} />
        <input type="text" disabled maxLength="1" style={inputStyle} />
        <input type="text" disabled maxLength="1" style={inputStyle} />
        <br />
        <br />
        <Button
          type="submit"
          color="inherit"
          variant="contained"
          onClick={verifyOtp}
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
        {time > 0 && (
          <Typography sx={{ marginLeft: "70px", marginBottom: "20px" }}>
            Didn't receive the code?{" "}
            <span
              color="inherit"
              variant="contained"
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#9D00FF",
              }}
              tabIndex="-1"
            >
              Resend
            </span>
            &nbsp;Code in <span>{time} seconds</span>{" "}
          </Typography>
        )}
        {time === 0 && (
          <Typography sx={{ marginLeft: "120px", marginBottom: "20px" }}>
            Didn't receive the code?{" "}
            <span
              onClick={handleOtp}
              color="inherit"
              variant="contained"
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#9D00FF",
              }}
            >
              Resend
            </span>
            &nbsp;Code
          </Typography>
        )}
      </Card>
    </div>
  );
}
export default VerifyOtp;
