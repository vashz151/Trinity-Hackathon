import React from 'react'
import Box from '@mui/material/Box';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
function EventCandidate() {
  return (
    <>
    <TextField id="outlined-basic" label="Candidate Name" variant="outlined" /> 
    <TextField id="outlined-basic" label="Unique Key" variant="outlined" />
    </>
  
  )
};

export default EventCandidate;