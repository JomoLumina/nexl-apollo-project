import { FC } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Launch } from '../../../types/Launch';
import { makeStyles } from 'tss-react/mui';
import LaunchInfo from './LaunchInfo';

interface DetailsProps {
  latestLaunch: Launch;
  nextLaunch: Launch;
  className?: string;
}

const useStyles = makeStyles()(() => {
  return {
   root: {},
  }
});

const Details: FC<DetailsProps> = ({
  latestLaunch, nextLaunch,className, ...rest
}) => {
  const { classes, cx } = useStyles();

  return (
    <Grid className={cx(classes.root, className)}
      container spacing={3} {...rest}>
      <Grid item xs={12} md={6}>
        <LaunchInfo launch={latestLaunch} title={'PAST LAUNCH'} id={latestLaunch.id} />
      </Grid>
      <Grid item xs={12} md={6}>
        <LaunchInfo launch={nextLaunch} title={'NEXT LAUNCH'} id={nextLaunch.id} />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  latestLaunch: PropTypes.any.isRequired,
  nextLaunch: PropTypes.any.isRequired
};

export default Details;
