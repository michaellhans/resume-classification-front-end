import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | Minimal UI </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
          Hi, Welcome Back
          </Typography>
          <Box
            component="img"
            src="/assets/illustrations/cv3.jpg" alt="home"
            sx={{ height: 260, mx: 'auto', my: { xs: 1, sm: 5} }}
          />
          <Typography variant="h4" paragraph>
          Get Prediction Job Position with Magic Tool
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
          Click "Telusuri" for Get Job Prediction
          </Typography>

          <Button to="/" size="large" variant="contained" component={RouterLink}>
           Telusuri
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
