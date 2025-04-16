import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle , Group } from '@mui/icons-material';
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import Admin from '../assets/admin.png';
import Teacher from '../assets/teacher.jpg';
import HOD from '../assets/hod.png';
const ChooseUser = ({ visitor }) => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  // const password = "zxc"
  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin"){ 
        navigate('/Adminlogin');
    }
    else if (user === "HOD") {
        navigate('/HODlogin');
    }
    else if (user === "Teacher") {
        navigate('/Teacherlogin');
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} style = {{position : "relative" , top : "100px"}}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <StyledTypography>
                  Admin
                </StyledTypography>
                Login as an administrator to access the dashboard to manage semesters, teachers and subjects.
                <img src={Admin} alt="Admin" style = {{mixBlendMode : "color-burn" , position : "relative" , top : "20px"}}/>
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} style = {{position : "relative" , top : "100px"}}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("HOD")}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>
                  HOD
                </StyledTypography>
                Login as a HOD(Head of Department) to allocate the teachers to their respective sections , view faculty schedules and finalise their schedules.
                <img src={HOD} alt="HOD" style = {{mixBlendMode : "color-burn" , position : "relative" , width : "340px" , height : "280px"}}/>
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} style = {{position : "relative" , top : "100px"}}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Teacher")}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>
                  Teacher
                </StyledTypography>
                Login as a teacher to view your own schedule, give your preferences and also edit the preferences of semesters, sections and teaching schedules.
                <img src={Teacher} alt="Teachers" style={{mixBlendMode : "color-burn" , position : "relative" , top : "50px"}}/>
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />  
    </StyledContainer>
    
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background : black;
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color:rgba(255, 255, 255, 0.6);
  cursor:pointer;
  height : 430px;
  postion : relative;
  top : 30px;

  &:hover {
    background-color: green;
    color:white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;