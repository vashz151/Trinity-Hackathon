import { Helmet } from "react-helmet-async";
import axios from "axios";
import * as React from "react";
// @mui
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Lottie from "react-lottie";
import animationData from "../lottie/138527-face-recognition.json";
import faceData from "../lottie/60915-facial-recognition.json";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: faceData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 650,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const navigate = useNavigate();
  const mdUp = useResponsive("up", "md");
  const [state, setState] = React.useState({
    name: null,
    logged_in: false,
  });
  const [loading, setLoading] = React.useState(false);
  const login = async () => {
    setLoading(true);
    const url = "/login";
    const response = await axios.get(url);
    setLoading(false);
    console.log(response);
    if (response.data == "You are unknown first register your self") {
      alert("You are unknown first register your self");
      navigate("/dashboard/app");
    } else if (response.data) {
      navigate("/modal");
      setState({ name: response.data, logged_in: true });
    }
  };
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Image Verification
            </Typography>
            <Lottie options={defaultOptions} height={400} width={700} />
          </StyledSection>
        )}

        <Container maxWidth="sm" sx={{ marginBottom: "-200px" }}>
          {loading && (
            <Lottie options={defaultOptions1} height={300} width={300} />
          )}
          <StyledContent>
            {state.logged_in ? (
              <Typography variant="h4" gutterBottom sx={{ marginTop: "50px" }}>
                Hello {state.name} !
                <br />
                You are successfully logged in to the system.
              </Typography>
            ) : (
              <div style={{ marginTop: "-200px" }}>
                <Typography variant="h4" gutterBottom>
                  Stay Steady and in a well lit area
                </Typography>
                <Divider sx={{ my: 3 }}></Divider>
                <Button sx={{ backgroundColor: "lightgrey" }} onClick={login}>
                  <Typography variant="h4">Capture Image</Typography>
                </Button>
              </div>
            )}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
