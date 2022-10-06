import type { FC } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { LogoImg } from '../assets';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
        display: 'flex',
    },
    logo:{
      width: theme.spacing(16)
    }
  }
});

const Logo: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
        <img src={LogoImg} alt="logo" className={classes.logo}/>
    </div>
  );
};

export default Logo;