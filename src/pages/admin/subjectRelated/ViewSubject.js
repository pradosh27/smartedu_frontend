import React, { useEffect, useState } from 'react'
import { getClassHOD, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewSubject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassHOD, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassHOD(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const HODColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ]

  const HODRows = sclassHOD.map((HOD) => {
    return {
      rollNum: HOD.rollNum,
      name: HOD.name,
      id: HOD._id,
    };
  })

  const HODAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/HOD/HOD/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subject/HOD/attendance/${row.id}/${subjectID}`)
          }
        >
          Take Attendance
        </PurpleButton>
      </>
    );
  };

  const HODMarksButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/HOD/HOD/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton variant="contained"
          onClick={() => navigate(`/Admin/subject/HOD/marks/${row.id}/${subjectID}`)}>
          Provide Marks
        </PurpleButton>
      </>
    );
  };

  const SubjectHODSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/class/addHOD/" + classID)}
              >
                Add HOD
              </GreenButton>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              HOD List:
            </Typography>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={HODAttendanceButtonHaver} columns={HODColumns} rows={HODRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={HODMarksButtonHaver} columns={HODColumns} rows={HODRows} />
            }

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                <BottomNavigationAction
                  label="Attendance"
                  value="attendance"
                  icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                />
                <BottomNavigationAction
                  label="Marks"
                  value="marks"
                  icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                />
              </BottomNavigation>
            </Paper>

          </>
        )}
      </>
    )
  }

  const SubjectDetailsSection = () => {
    const numberOfHOD = sclassHOD.length;

    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Name : {subjectDetails && subjectDetails.subName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Code : {subjectDetails && subjectDetails.subCode}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Sessions : {subjectDetails && subjectDetails.sessions}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Number of HOD: {numberOfHOD}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Class Name : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
        </Typography>
        {subjectDetails && subjectDetails.teacher ?
          <Typography variant="h6" gutterBottom>
            Teacher Name : {subjectDetails.teacher.name}
          </Typography>
          :
          <GreenButton variant="contained"
            onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}>
            Add Subject Teacher
          </GreenButton>
        }
      </>
    );
  }

  return (
    <>
      {subloading ?
        < div > Loading...</div >
        :
        <>
          <Box sx={{ width: '100%', typography: 'body1', }} >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                  <Tab label="Details" value="1" />
                  <Tab label="HOD" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <SubjectDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <SubjectHODSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      }
    </>
  )
}

export default ViewSubject