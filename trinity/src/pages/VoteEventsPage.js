import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
// @mui
import { Container, Typography } from "@mui/material";
// components
import { ProductList } from "../sections/@dashboard/products";
// mock
import PRODUCTS from "../_mock/products";
import Ballot from "../truffle_abis/Ballot.json";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function VoteEventsPage() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

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
        // const allPastEvents = await ballot.getPastEvents('allEvents', {
        //     fromBlock: 0,
        //     toBlock: 'latest'
        // });
        // console.log(allPastEvents);
        // get specific event
        const len = await ballot.methods.getEventLength().call();
        setData([]);
        for(let i = 0; i < len; i++){
            const res = await ballot.methods.getEventByIndex(i).call();
            data.push(res);
        }
        console.log("data: ", data);
        console.log("data: ", data[0][7]);

    }
  };
  useEffect(() => {
    handleSubmit();
//eslint-disable-next-line
  }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t("ongoing_elections")}
          <div>
          {data.length!==0 && data.json()}
        </div>
        </Typography>
       
        {data.length !== 0 && <ProductList products={data} />}
      </Container>
    </>
  );
}
