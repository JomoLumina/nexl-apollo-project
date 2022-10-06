import { FC, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '../../theme';
import Page from '../../components/Page';
import Results from '../../components/Results';
import Header from './Header';
import type { Launch } from '../../types/Launch';
import { useQuery } from '@apollo/client';
import GET_PAST_LAUNCES from '../../queries/GET_PAST_LAUNCHES';

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

const PastLaunchesView: FC = () => {
  const { classes } = useStyles();
  const [pastLaunches, setPastLaunches] = useState<Launch[]>([]);
  const {loading, data, error} = useQuery(GET_PAST_LAUNCES);

  useEffect(() =>{
    if(!loading && data){
      setPastLaunches(data.launchesPast);
    }else if(error){
      console.log(error);
    }
  }, [loading, data,error,setPastLaunches]);
  
  return (
    <Page className={classes.root} title="Nexl Apollo: Past launches">
      <Container className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results launches={pastLaunches} />
        </Box>
      </Container>
    </Page>
  );
};

export default PastLaunchesView;
