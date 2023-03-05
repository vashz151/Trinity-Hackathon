import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
// sections
import Lottie from "react-lottie";
import animationData from "../lottie/38435-register.json";
import VerifyOtp from "./VerifyOtp";
// ----------------------------------------------------------------------
import { useLocation } from "react-router-dom";
import VerifyEvent from "./VerifyEvent";
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
  maxWidth: 650,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function EventId() {
  const mdUp = useResponsive("up", "md");
  const { state } = useLocation();

  return (
    <>
      <Helmet>
        <title> Event Confirmation </title>
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
              Event Confirmation
            </Typography>
            <Lottie options={defaultOptions} height={400} width={400} />
          </StyledSection>
        )}

        <Container maxWidth="sm3">
          <StyledContent>
            <VerifyEvent password={state.eventId} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
