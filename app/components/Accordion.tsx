'use client'

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { getDailyGospel } from '@/lib/readings';

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
  const [expanded, setExpanded] = React.useState<string | false>('');
  const [checkedState, setCheckedState] = React.useState({
    officeReadings: false,
    lauds: false,
    vespers: false,
    terce: false,
    sext: false,
    none: false,
    compline: false,
  });
  const [rosaryChecked, setRosaryChecked] = React.useState(false);
  const [gospelChecked, setGospelChecked] = React.useState(false);
  const [saintChecked, setSaintChecked] = React.useState(false);

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

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem'}}>Divine Office</Typography>
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
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex justify-evenly'>
            <FormGroup>
              <Typography variant="h6">Major Hours</Typography>
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
              <Typography variant="h6">Minor Hours</Typography>
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
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem' }}>Rosary</Typography>
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
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {`Today's mystery is the ${getMystery()}.`}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem' }}>Gospel</Typography>
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
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: '500' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
            {/* Source: {dailyGospel.source} <br />
            Heading: {dailyGospel.heading} */}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ flexGrow: 1, fontSize: '1.2rem', fontWeight: 'semi-bold', letterSpacing: '0.05rem' }}>Saint</Typography>
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
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
