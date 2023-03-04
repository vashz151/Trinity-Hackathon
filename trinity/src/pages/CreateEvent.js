import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify/Iconify';
import Box from '@mui/material/Box';


function CreateEvent() {
  return (
    <>
    <Stack spacing={3}>
      <TextField name="email" label="Email address" />

      <TextField
        name="password"
        label="Password"
      
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <Iconify />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>

    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      
    </Stack>
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <LoadingButton size="large" type="submit" variant="contained">
      Create event
    </LoadingButton>
    </Box>
  </>
  )
}

export default CreateEvent