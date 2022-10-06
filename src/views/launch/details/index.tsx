import { FC } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Launch } from '../../../types/Launch';
import { makeStyles } from 'tss-react/mui';
import LaunchInfo from './LaunchInfo';

interface DetailsProps {
  launch: Launch;
  className?: string;
}

const useStyles = makeStyles()(() => {
  return {
   root: {},
  }
});

const Details: FC<DetailsProps> = ({
  launch,
  className,
  ...rest
}) => {
  const { classes, cx } = useStyles();

  return (
    <Grid className={cx(classes.root, className)}
      container spacing={3} {...rest}>
      <Grid item xs={12}>
        <LaunchInfo launch={launch} />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  launch: PropTypes.any.isRequired
};

export default Details;
