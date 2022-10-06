import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Divider } from '@mui/material';
import type { Theme } from '../../theme';
import { makeStyles} from 'tss-react/mui';
import Page from '../../components/Page';
import type { Launch } from '../../types/Launch';
import Header from './Header';
import Details from './details';
import { useQuery } from '@apollo/client';
import GET_LAUNCH from '../../queries/GET_LAUNCH';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  }
});

const LaunchDetailsView: FC = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const params: Readonly<Params<string>> = useParams();
  const launchId: string | undefined = params.launchId;
  const [launch, setLaunch] = useState<Launch | null>(null);
  
  if(!launchId){
    navigate("/404");
  }
  const {loading, data, error} = useQuery(GET_LAUNCH,{ variables: { launchId }});

  useEffect(() =>{
    if(!loading && data){
      setLaunch(data.launch);
    }else if(error){
      console.log(error);
    }
  }, [loading, data, error, setLaunch]);

  return (
    <Page className={classes.root} title="Launch details">
      <Container maxWidth={false}>
        {launch && <Header />}
        <Divider />
        <Box mt={3}>
          {launch && <Details launch={launch} />}
        </Box>
      </Container>
    </Page>
  );
};

export default LaunchDetailsView;
