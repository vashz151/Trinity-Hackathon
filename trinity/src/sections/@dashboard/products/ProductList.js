import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  console.log(products,"aisduhubcs")
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product,index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <h1>qerfef</h1>
          <ShopProductCard productts={product} />
        </Grid>
      ))}
    </Grid>
  );
}
