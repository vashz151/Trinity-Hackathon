import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Ballot from "../truffle_abis/Ballot.json";

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const[balance, setBalance] = useState("")
  const[numeve, setNumeve] = useState(0)
  const theme = useTheme();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    // create event by the owner
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
        const len = await ballot.methods.getEventLength().call();
       setNumeve(len)
    }
  };

  useEffect(() => {
    let bl = localStorage.getItem("balance");
    setBalance(bl.slice(0,8))
    handleSubmit()
  }, [])
  return (
    <>
      <Helmet>
        <title> Dashboard | MyVote </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t("hi_welcome_back")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={t("number_of_elections")}
              total={numeve}
              icon={"ant-design:dollar-circle-twotone"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={t("total_users")}
              total={3}
              color="info"
              icon={"ant-design:user-outlined"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={t("wallet_balance")}
              total={balance}
              color="warning"
              icon={"ant-design:gitlab-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={234}
              color="error"
              icon={"ant-design:gold-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Elections taken Place"
              subheader="(+43%) than last year"
              chartLabels={[
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
                "05/01/2003",
                "06/01/2003",
                "07/01/2003",
                "08/01/2003",
                "09/01/2003",
                "10/01/2003",
                "11/01/2003",
              ]}
              chartData={[
                {
                  name: "Single choice voting",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Approval choice voting",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "No votes",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Winning Candidates"
              chartData={[
                { label: "Sakshi", value: 4344 },
                { label: "Yash", value: 5435 },
                { label: "Vashisth", value: 1443 },
                { label: "Keyur", value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Elections update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Election Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  "Office Election Started",
                  "Yash and Sakshi are candidates",
                  "People voted in favor of Sakshi",
                  "Sakshi becomes manager",
                  "Wallet price drops by 10 eths",
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
