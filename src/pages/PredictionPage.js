import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
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

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function PredictionPage() {
  const [users, setUsers] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const mdUp = useResponsive('up', 'md');

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file, i) => {
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
      {/* <div>
      <div>
        <input type="file" multiple accept='application/pdf' onChange={handleFileChange} />
        <button onClick={handleUploadFile}>Upload</button>
      </div>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              ID: {user.id}, Role: {user.role}
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div> */}

      <Helmet>
        <title> Home | Classification Resume </title>
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
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/cv3.jpg" alt="home" />
          </StyledSection>
        )}

        <Container maxWidth="md">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
            Get Classification Resume with Magic Tool
            </Typography>
            <Typography variant="body2" sx={{ mb: 6 }}>
              Click "Telusuri" to choose a files and click "Submit" for Get Classification Resume {''}
              {/* <Link variant="subtitle2">   Get started</Link> */}
            </Typography>
            {/* <Button onClick={handleUploadFile} variant="contained" size="large" component="label"> */}
            {/* Upload */}
            {/* <input hidden accept="file/*" multiple type="file"/> */}
            <input type="file" multiple accept='application/pdf' onChange={handleFileChange} />
          {/* </Button> */}
          {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
            <Stack direction="row" spacing={2}>
              
              <Button to="https://drive.google.com" fullWidth size="large" color="inherit" variant="outlined" component={RouterLink}>
                <Iconify icon="logos:google-drive" color="#1FA463" width={22} height={22} />
              </Button>
              

              <Button to="https://www.dropbox.com" fullWidth size="large" color="inherit" variant="outlined" component={RouterLink}>
                <Iconify icon="logos:dropbox" color="#0060ff" width={22} height={22} />
              </Button>

              <Button Button to="https://onedrive.live.com" fullWidth size="large" color="inherit" variant="outlined" component={RouterLink}>
                <Iconify icon="logos:microsoft-onedrive" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack> */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                SUBMIT
              </Typography>
            </Divider>
            <div>
            <Button onClick={handleUploadFile} variant="contained" size="sm" component="label" color="primary">
            Submit
          </Button>
          {users.length > 0 ? (
                <TableContainer sx={{ marginTop: 4 }}>
                     <Typography align="center" variant="h6" sx={{ mb: 5 }}>
                     Classification Resume Result {''}
                    </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.role}</TableCell>
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
             {/* {users.length > 0 ? (
                <ul>
                  {users.map(user => (
                    <li key={user.id}>
                      ID: {user.id}, Role: {user.role}
                    </li>
                  ))}
                </ul>
              ) : (
                <div> </div>
              )}           */}
            </div>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
