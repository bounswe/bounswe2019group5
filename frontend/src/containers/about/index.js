import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://github.com/bounswe/bounswe2019group5/blob/master/Images/bonibonpasta.PNG?raw=true)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} 
      />
      <Grid item xs={12} sm={8} md={5} backgroundColor={orange[200]} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h2" align='justify'>
            About Bonibon
          </Typography>
          <Typography component="h1" variant="h3" align='left'>
            Hello!
          </Typography>
          <Typography component="h1" variant="h4">
            We are bonibon, the most colorful language learning platform!
            </Typography>
          <Typography component="h1" variant="h4">
            You will find that, whenever you open up new stages, you'll be welcomed with a lot of bonibon!
            </Typography>

        </div>
      </Grid>
    </Grid>

  )
}
