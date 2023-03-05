import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
// @mui
import { Container, Typography } from "@mui/material";
// components
import Loader from "./Loader"
import { ProductList } from "../sections/@dashboard/products";
// mock
import PRODUCTS from "../_mock/products";
import Ballot from "../truffle_abis/Ballot.json";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function VoteEventsPage() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    // create event by the owner
    setLoading(true);
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
        //     fromBlock: 0,
        //     toBlock: 'latest'
        // });
        // console.log(allPastEvents);
        // get specific event
        const len = await ballot.methods.getEventLength().call();
        setData([]);
        let temp = []
       for(let i = 0; i < len; i++){
            const res = await ballot.methods.getEventByIndex(i).call();
            temp.push(res);
        }
        setData(temp);
        setLoading(false);
    }
  };
  useEffect(() => {
    handleSubmit()
//eslint-disable-next-line
  }, []);

  if(loading){
    return <Loader/> 
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t("ongoing_elections")}
        </Typography>
        {data.length !== 0 && <ProductList products={data} />}
      </Container>
    </>
  );
}
