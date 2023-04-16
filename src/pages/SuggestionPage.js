import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Avatar, Typography, Stack, TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';

const url = "https://resume-classification.herokuapp.com";

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(() => ({
  width: '100%',
  marginTop: '5%',
  maxWidth: 270,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 1000,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
}));

export default function SuggestionPage() {
  const [users, setUsers] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const mdUp = useResponsive('up', 'md');
  const avatarUrl = '/assets/images/avatars/';

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  }

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append(`job_description`, jobDescription);
  
      /* eslint-disable */
      const response = await fetch(url + "/suggestions", {
        method: "POST",
        body: formData
      });

      if (response.status == 200){
        // Process response from server if needed
        const { data } = await response.json();
        setUsers(data);
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <Helmet>
        <title>Suggestion Job Position </title>
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
            <img src="/assets/illustrations/suggestion.jpg" alt="home" />
          </StyledSection>
        )}

        <Container maxWidth="md">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
            Get Suggestion Job Position with Magic Tool
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
               Write a job description that you want to match with existing candidates, the system will do it for you
            </Typography>
            <TextField
              placeholder="Write your job description here..."
              multiline
              onChange={handleJobDescriptionChange}
              minRows={5}
              maxRows={10}
              sx={{mb: 3}}
            />
          
            <Button onClick={handleUploadFile} variant="contained" size="large" component="label" color="primary">
              Submit
            </Button>
            <div>
              {users.length > 0 ? (
                  <TableContainer sx={{ marginTop: 4 }}>
                      <Typography align="center" variant="h6" sx={{ mb: 5 }}>
                      Top 5 Suggestions Job Position Result {''}
                      </Typography>
                    <Table>
                      <TableHead>
                      <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Predicted Role</TableCell>
                          <TableCell>Score</TableCell>
                          <TableCell>Time uploaded</TableCell>
                          <TableCell>Resume</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={user.name} src={avatarUrl + `avatar_${user.id % 24 + 1}.jpg`} />
                                <Typography variant="subtitle2" noWrap>
                                  {user.name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>{user.predicted_role}</TableCell>
                            <TableCell>{user.scores.toFixed(2)} %</TableCell>
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
