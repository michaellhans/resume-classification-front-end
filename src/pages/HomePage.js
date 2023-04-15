import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Divider } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | Prediction & Suggestion Job Position </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
          Hi, Welcome Back
          </Typography>
          <Typography variant="h4" paragraph>
          Get Prediction & Suggestion Job Position
          </Typography>
          <Box
            component="img"
            src="/assets/illustrations/home.jpg" alt="home"
            sx={{ height: 260, mx: 'auto', my: { xs: 1, sm: 5} }}
          />
          <Button to="/prediction" size="large" variant="contained" component={RouterLink}>
          Prediction Position
          </Button>
          <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
          <Button to="/suggestion" size="large" variant="contained" component={RouterLink}>
          Suggestion Position
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
