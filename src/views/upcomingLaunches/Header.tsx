import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '../../theme';

interface HeaderProps {
  className?: string;
}

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {},
    action: {
      marginBottom: theme.spacing(1),
      '& + &': {
        marginLeft: theme.spacing(1),
      },
    },
  }
});

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const {classes, cx} = useStyles();

  return (
    <Grid
      className={cx(classes.root, className)}
      container
      spacing={3}
      {...rest}>
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/" component={RouterLink}>
            Home
          </Link>
          <Typography variant="body1" color="textPrimary">
            Launches
          </Typography>
        </Breadcrumbs>
        <Typography mt={1} variant="h4" color="textPrimary">
          Upcoming launches
        </Typography>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
