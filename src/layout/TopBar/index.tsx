import type { FC } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AppBar, Box, Hidden, 
  IconButton, Toolbar
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import Logo from '../../components/Logo';
import type { Theme } from '../../theme';

interface TopBarProps {
  className?: string;
  onMobileNavOpen?: () => void;
}

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      zIndex: theme.zIndex.drawer + 100,
      backgroundColor: theme.palette.background.default
    },
    toolbar: {
      minHeight: theme.spacing(8)
    },
    header:{
      fontFamily: theme.typography.fontFamily
    },
    divider: {
      color: theme.palette.text.secondary,
      fontSize: theme.spacing(4),
      marginTop: theme.spacing(-1)
    }
  }
});

const TopBar: FC<TopBarProps> = ({
  className,
  onMobileNavOpen,
  ...rest }) => {

  const { classes } = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
          </IconButton>
          <Box ml={2} flexGrow={1} className={classes.header}>
              {`Nexl | Apollo Programme`}
          </Box>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Box className={classes.divider}>|</Box>
          <Box ml={2} flexGrow={1} className={classes.header}>
              {`Apollo Programme`}
          </Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => { }
};

export default TopBar;
