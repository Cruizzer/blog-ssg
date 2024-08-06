'use client';

import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Button, CircularProgress, Alert, TextField } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square={false} {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  padding: theme.spacing(2),
  backgroundColor: '#34435E',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  color: 'white',
  '&:hover': {
    backgroundColor: '#0A1128',
  },
  '&.Mui-expanded': {
    minHeight: 48,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#536279',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  color: 'white',
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiCheckbox-root': {
    color: '#F5853F',
    '&.Mui-checked': {
      color: '#F5853F',
    },
  },
  '& .MuiTypography-root': {
    color: 'white',
  },
}));

export default function CustomizedAccordions() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [expanded, setExpanded] = useState<string | false>('');
  const [checkedState, setCheckedState] = useState({
    officeReadings: false,
    lauds: false,
    vespers: false,
    terce: false,
    sext: false,
    none: false,
    compline: false,
  });
  const [rosaryChecked, setRosaryChecked] = useState(false);
  const [gospelChecked, setGospelChecked] = useState(false);
  const [saintChecked, setSaintChecked] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleMasterCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCheckedState({
      officeReadings: isChecked,
      lauds: isChecked,
      vespers: isChecked,
      terce: isChecked,
      sext: isChecked,
      none: isChecked,
      compline: isChecked,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState({
      ...checkedState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMasterCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleRosaryCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRosaryChecked(event.target.checked);
  };

  const handleGospelCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGospelChecked(event.target.checked);
  };

  const handleSaintCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaintChecked(event.target.checked);
  };

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const getMystery = () => {
    const day = new Date().getDay();
    switch (day) {
      case 0: // Sunday
      case 3: // Wednesday
        return 'Glorious Mystery';
      case 2: // Tuesday
      case 5: // Friday
        return 'Sorrowful Mystery';
      case 1: // Monday
      case 6: // Saturday
        return 'Joyful Mystery';
      case 4: // Thursday
        return 'Luminous Mystery';
      default:
        return '';
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Replace with actual user ID from session or context?
      // const userId = '...'; 

      // Validate date range
      if (!startDate || !endDate || endDate < startDate) {
          setError('Please ensure that both dates are selected and end date is after start date.');
          return;
      }

      // Check if at least one prayer is selected
      const isAnyPrayerSelected = Object.values(checkedState).some(value => value) || rosaryChecked || gospelChecked || saintChecked;

      if (!isAnyPrayerSelected) {
          setError('Please select at least one type of prayer.');
          return;
      }

      const formData = {
          // userId,
          // dateCreated: new Date(),
          prayerSelections: [
              {
                  dateStart: startDate,
                  dateEnd: endDate,
                  prayers: {
                      officeReadings: checkedState.officeReadings,
                      lauds: checkedState.lauds,
                      vespers: checkedState.vespers,
                      terce: checkedState.terce,
                      sext: checkedState.sext,
                      none: checkedState.none,
                      compline: checkedState.compline,
                      rosary: rosaryChecked,
                      gospel: gospelChecked,
                      saint: saintChecked,
                  },
              },
          ],
      };

      console.log('Form Data:', formData);

      setLoading(true);

      try {
          const response = await fetch('/api/prayers', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          const result = await response.json();

          if (!response.ok) {
              throw new Error(result.error || 'Failed to submit prayer');
          }

          console.log('Success:', result);
          setError(''); // Clear any previous errors
          
          // Reset state to initial values
          setCheckedState({
              officeReadings: false,
              lauds: false,
              vespers: false,
              terce: false,
              sext: false,
              none: false,
              compline: false,
          });
          setRosaryChecked(false);
          setGospelChecked(false);
          setSaintChecked(false);
          setStartDate(null);
          setEndDate(null);
      } catch (error: any) {
          console.error('Error:', error);
          setError(error.message || 'An unexpected error occurred.');
      } finally {
          setLoading(false); // Ensure loading state is reset
      }
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { variant: 'outlined', InputProps: {style: { color: 'white' }} }, }}
            sx={{ mr: 2 }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { variant: 'outlined', InputProps: {style: { color: 'white' }} }, }}
          />
        </Box>

        <div>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem', textAlign: isSmallScreen ? 'center' : 'left' }}>Divine Office</Typography>
                <CustomFormControlLabel
                  control={
                    <Checkbox
                      checked={Object.values(checkedState).every(Boolean)}
                      onChange={handleMasterCheckboxChange}
                      onClick={handleMasterCheckboxClick}
                    />
                  }
                  label="Select All"
                  labelPlacement="start"
                  sx={{ marginLeft: isSmallScreen ? 0 : 'auto' }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-evenly', alignItems: isSmallScreen ? 'center' : 'flex-start' }}>
                <FormGroup>
                  <Typography variant="h6" sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>Major Hours</Typography>
                  <CustomFormControlLabel
                    control={
                      <Checkbox
                        checked={checkedState.officeReadings}
                        onChange={handleCheckboxChange}
                        name="officeReadings"
                      />
                    }
                    label="Office of Readings"
                  />
                  <CustomFormControlLabel
                    control={
                      <Checkbox
                        checked={checkedState.lauds}
                        onChange={handleCheckboxChange}
                        name="lauds"
                      />
                    }
                    label="Morning Prayer (Lauds)"
                  />
                  <CustomFormControlLabel
                    control={
                      <Checkbox
                        checked={checkedState.vespers}
                        onChange={handleCheckboxChange}
                        name="vespers"
                      />
                    }
                    label="Evening Prayer (Vespers)"
                  />
                </FormGroup>
                <FormGroup>
                  <Typography variant="h6" sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>Minor Hours</Typography>
                  <CustomFormControlLabel
                    control={
                      <Checkbox
                        checked={checkedState.terce}
                        onChange={handleCheckboxChange}
                        name="terce"
                      />
                    }
                    label="Mid-Morning Prayer (Terce)"
                  />
                  <CustomFormControlLabel
                    control={
                      <Checkbox
                        checked={checkedState.sext}
                        onChange={handleCheckboxChange}
                        name="sext"
                      />
                    }
                    label="Midday Prayer (Sext)"
                  />
                  <CustomFormControlLabel
                    control={
                      <Checkbox
                        checked={checkedState.none}
                        onChange={handleCheckboxChange}
                        name="none"
                      />
                    }
                    label="Afternoon Prayer (None)"
                  />
                  <CustomFormControlLabel
                    control={
                      <Checkbox
                        checked={checkedState.compline}
                        onChange={handleCheckboxChange}
                        name="compline"
                      />
                    }
                    label="Night Prayer (Compline)"
                  />
                </FormGroup>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem', textAlign: isSmallScreen ? 'center' : 'left' }}>Rosary</Typography>
                <CustomFormControlLabel
                  control={
                    <Checkbox
                      checked={rosaryChecked}
                      onChange={handleRosaryCheckboxChange}
                      onClick={handleCheckboxClick}
                    />
                  }
                  label="Select"
                  labelPlacement="start"
                  sx={{ marginLeft: isSmallScreen ? 0 : 'auto' }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
                {`Today's mystery is the ${getMystery()}.`}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem', textAlign: isSmallScreen ? 'center' : 'left' }}>Gospel</Typography>
                <CustomFormControlLabel
                  control={
                    <Checkbox
                      checked={gospelChecked}
                      onChange={handleGospelCheckboxChange}
                      onClick={handleCheckboxClick}
                    />
                  }
                  label="Select"
                  labelPlacement="start"
                  sx={{ marginLeft: isSmallScreen ? 0 : 'auto' }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
                {/* Source: {dailyGospel.source} <br />
                Heading: {dailyGospel.heading} */}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem', textAlign: isSmallScreen ? 'center' : 'left' }}>Saint</Typography>
                <CustomFormControlLabel
                  control={
                    <Checkbox
                      checked={saintChecked}
                      onChange={handleSaintCheckboxChange}
                      onClick={handleCheckboxClick}
                    />
                  }
                  label="Select"
                  labelPlacement="start"
                  sx={{ marginLeft: isSmallScreen ? 0 : 'auto' }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        {error && <Alert severity="error">{error}</Alert>}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
}
