import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { useTranslation } from 'react-i18next';


export default function ResultPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("election_result")}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
