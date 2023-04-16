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
        <title> Home | Classification & Suggestion Job Position </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
          Hi, Welcome Back
          </Typography>
          <Typography variant="h4" paragraph>
          Get Classification Resume & Suggestion Job Position
          </Typography>
          <Box
            component="img"
            src="/assets/illustrations/home.jpg" alt="home"
            sx={{ height: 260, mx: 'auto', my: { xs: 1, sm: 5} }}
          />
          <Button to="/dashboard/prediction" size="large" variant="contained" component={RouterLink}>
          Classification Resume
          </Button>
          <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
          <Button to="/dashboard/suggestion" size="large" variant="contained" component={RouterLink}>
          Suggestions Job Position
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
