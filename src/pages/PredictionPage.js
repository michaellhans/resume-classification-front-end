import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Container, Typography, Divider, Button, Stack, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import { fDateTime } from "../utils/formatTime";

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

export default function PredictionPage() {
  const [users, setUsers] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const mdUp = useResponsive('up', 'md');
  const avatarUrl = '/assets/images/avatars/';

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append(`file`, file, file.name);
      });
  
      /* eslint-disable */
      const response = await fetch(url + "/predict", {
        method: "POST",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
        body: formData
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      else {
        // Process response from server if needed
        const { data } = await response.json();
        setUsers(data);
        console.log(`File uploaded successfully!`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (event) => {
    const newFiles = []
    for(let i = 0; i < event.target.files.length; i++){
       newFiles.push(event.target.files[i])
    }
    setSelectedFiles(newFiles);
  }

  return (
    <>
      <Helmet>
        <title>Classification Resume </title>
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
            {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography> */}
            <img src="/assets/illustrations/cv3.jpg" alt="home" />
          </StyledSection>
        )}

        <Container maxWidth="md">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
            Get Classification Resume with Magic Tool
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Click "Upload" to choose a files and click "Submit" for Get Classification Resume {''}
            </Typography>
            <Button variant="contained" size="large" component="label" color="warning">
              Upload
              <input hidden accept='application/pdf' type="file" multiple  onChange={handleFileChange} />
            </Button>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                SUBMIT
              </Typography>
            </Divider>
            <Button onClick={handleUploadFile} variant="contained" size="large" component="label" color="primary">
              Submit
            </Button>
            <div>
          {users.length > 0 ? (
                <TableContainer sx={{ marginTop: 4 }}>
                     <Typography align="center" variant="h6" sx={{ mb: 5 }}>
                     Classification Resume Result {''}
                    </Typography>
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
                          <TableCell>{fDateTime(new Date(user.timestamp))}</TableCell>
                          <TableCell>
                            <Button to={"https://resume-classification.herokuapp.com/show/" + user.path} variant="contained" size="sm" color="primary"  component={RouterLink}>
                              <Iconify icon={'eva:file-text-outline'} sx={{ width: 16, height: 16 }} />
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
