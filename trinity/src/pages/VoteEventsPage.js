import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
import { Container, Typography } from "@mui/material";
// components
import { ProductList } from "../sections/@dashboard/products";
// mock
import PRODUCTS from "../_mock/products";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function VoteEventsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t("ongoing_elections")}
        </Typography>
        <ProductList products={PRODUCTS} />
      </Container>
    </>
  );
}
