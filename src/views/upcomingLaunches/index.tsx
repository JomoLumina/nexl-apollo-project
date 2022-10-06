import { FC, useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '../../theme';
import Page from '../../components/Page';
import Results from '../../components/Results';
import Header from './Header';
import type { Launch } from '../../types/Launch';
import { useQuery } from '@apollo/client';
import GET_UPCOMING_LAUNCES from '../../queries/GET_UPCOMING_LAUNCHES';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      padding: 0
    },
    container: {
      paddingTop: theme.spacing(4)
    }
  }
});

const UpcomingLaunchesView: FC = () => {
  const { classes } = useStyles();
  const [upcomingLaunches, setUpcomingLaunches] = useState<Launch[]>([]);
  const {loading, data, error} = useQuery(GET_UPCOMING_LAUNCES);

  useEffect(() =>{
    if(!loading && data){
      setUpcomingLaunches(data.launchesUpcoming);
    }else if(error){
      console.log(error);
    }
  }, [loading, data,error,setUpcomingLaunches]);
  

  return (
    <Page className={classes.root} title="Nexl Apollo: Upcoming launches">
      <Container className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results launches={upcomingLaunches} />
        </Box>
      </Container>
    </Page>
  );
};

export default UpcomingLaunchesView;
