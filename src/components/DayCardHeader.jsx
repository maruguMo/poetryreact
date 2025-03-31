import React from 'react';
import { IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function DayCardHeader(props) {
  return (
    <Grid container justifyContent="space-around" alignItems="center" sx={{backgroundColor:props.compColor, color:'white'}}>
      <Grid item>
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
        <Typography variant="button">Poem of the week</Typography>
      </Grid>
      <Grid item>
        <IconButton color="secondary">
          <DeleteIcon />
        </IconButton>
        <Typography variant="button">Poem of the day</Typography>
      </Grid>
      <Grid item>
        <IconButton color="default">
          <EditIcon />
        </IconButton>
        <Typography variant="button">Featured</Typography>
      </Grid>
    </Grid>
  );
}

export default DayCardHeader;