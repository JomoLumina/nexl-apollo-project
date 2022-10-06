import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '../theme';
import TopBar from './TopBar';
import NavBar from './NavBar';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      width: '100%',
      padding: "0px !important"
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: theme.spacing(8),
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(32)
      }
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingBottom: theme.spacing(2)
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto'
    }
  }
});

const Layout: FC = () => {
  const { classes } = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  return (
    <div>
      <Container className={classes.root} maxWidth={false}>
        <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen}/>
        <Box className={classes.wrapper}>
          <Box className={classes.contentContainer}>
            <Box className={classes.content}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Layout;
