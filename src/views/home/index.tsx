import { FC, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '../../theme';
import Page from '../../components/Page';
import Header from './Header';
import type { Launch } from '../../types/Launch';
import { useQuery } from '@apollo/client';
import GET_LAUNCH_LATEST from '../../queries/GET_LAUNCH_LATEST';
import GET_LAUNCH_NEXT from '../../queries/GET_LAUNCH_NEXT';
import Details from './details';

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

const HomeView: FC = () => {
  const { classes } = useStyles();
  const [latestLaunch, setLatestLaunch] = useState<Launch | null>(null);
  const [nextLaunch, setNextLaunch] = useState<Launch | null>(null);
  const latestLaunchResponse = useQuery(GET_LAUNCH_LATEST);
  const nextLaunchResponse = useQuery(GET_LAUNCH_NEXT);

  useEffect(() =>{
    if(latestLaunchResponse.data && !latestLaunchResponse.loading){
      setLatestLaunch(latestLaunchResponse.data.launchLatest);
    }else if(latestLaunchResponse && latestLaunchResponse.error){
      console.log(latestLaunchResponse.error);
    }
    if(nextLaunchResponse.data && !nextLaunchResponse.loading){
      setNextLaunch(nextLaunchResponse.data.launchNext);
    }else if(nextLaunchResponse && nextLaunchResponse.error){
      console.log(nextLaunchResponse.error);
    }
  }, [latestLaunchResponse,nextLaunchResponse,setLatestLaunch, setNextLaunch]);

  return (
    <Page className={classes.root} title="Nexl Apollo: Home">
      <Container className={classes.container}>
        <Header />
        <Box mt={3}>
        {latestLaunch && nextLaunch && 
          <Details 
            latestLaunch={latestLaunch} 
            nextLaunch={nextLaunch} />}
        </Box>
      </Container>
    </Page>
  );
};

export default HomeView;
