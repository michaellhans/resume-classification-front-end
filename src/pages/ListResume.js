import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Container, Typography, Divider, Stack, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';

const url = "https://resume-classification.herokuapp.com/show-all";

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 270,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 1000,
  margin: 'auto',
  // minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function ListResume() {
  const [users, setUsers] = useState([]);
  const mdUp = useResponsive('up', 'md');
  const avatarUrl = '/assets/images/avatars/';

  const getAllResumes = async () => {
    try {  
      /* eslint-disable */
      const response = await fetch(url);
      const { data } = await response.json();
      setUsers(data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllResumes();
  }, [])

  return (
    <>
      <Helmet>
        <title>List Resume </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <img src="/assets/illustrations/cv3.jpg" alt="home" />
          </StyledSection>
        )}

        <Container maxWidth="md">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
              List Resume
              </Typography>
            <div>
          {users.length > 0 ? (
                <TableContainer sx={{ marginTop: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Predicted Role</TableCell>
                        <TableCell>Time uploaded</TableCell>
                        <TableCell>Resume</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id+1}>
                          <TableCell>{user.id+1}</TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={user.name} src={avatarUrl + `avatar_${user.id % 24 + 1}.jpg`} />
                              <Typography variant="subtitle2" noWrap>
                                {user.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{user.predicted_role}</TableCell>
                          <TableCell>{user.timestamp}</TableCell>
                          <TableCell>
                            <Button to={"https://resume-classification.herokuapp.com/show/" + user.path} variant="contained" size="sm" color="primary"  component={RouterLink}>
                              <Iconify icon={'eva:file-text-outline'} sx={{ width: 16, height: 16, mr: 0.5 }} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" align="center" color="textSecondary" mt={4}>
                  No data available
                </Typography>
              )}
            </div>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
