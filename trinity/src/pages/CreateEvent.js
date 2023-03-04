import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify/Iconify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useTranslation } from 'react-i18next';
import EventCandidate from '../components/eventCandidate';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function CreateEvent() {

  const { t } = useTranslation();
  const [click,setClick] = useState(false);

  const handleClick = () => {
      setClick(true);
  }
  return (
     <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
        {t("create_a_voting_event")}
        </Typography>
    <Stack spacing={3} sx={{maxWidth:600}}>
      <TextField name="Name" label={t("name_of_voting_event")}  id="outlined-required"></TextField>
      <TextField
        name="name"
        label={t("skateholder_name")}
        id="outlined-required"
      />
       <TextField
        name="describe"
        label={t("description")}
        id="outlined-required"
        multiline
          rows={3}
      />
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{t("type_of_voting")}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label={t("approval")} />
        <FormControlLabel value="male" control={<Radio />} label={t("single_choice")} />
      </RadioGroup>
    </FormControl>
    <Typography>Enter Candidate Name and Key</Typography>
    <Box sx={{display:'flex',  }}>
      <EventCandidate />
      <Button onClick={handleClick}><AddCircleIcon /></Button>
    </Box>
    </Stack>
    <br/>
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <LoadingButton size="large"  variant="contained">
    {t("create_event")}
    </LoadingButton>
    </Box>
    </Container>

  )
}

export default CreateEvent