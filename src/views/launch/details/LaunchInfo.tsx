import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Divider, Table, 
  TableBody, TableCell, TableRow, Typography
} from '@mui/material';
import type { Launch } from '../../../types/Launch';
import { makeStyles } from 'tss-react/mui';
import moment from 'moment';

interface LaunchInfoProps {
  launch: Launch
  className?: string;
}

const useStyles = makeStyles()(() => {
  return {
    root: {},
    fontWeightMedium: {
      whiteSpace: 'nowrap',
      fontWeight: 700,
    }
  }
});

const LaunchInfo: FC<LaunchInfoProps> = ({
  launch,
  className,
  ...rest
}) => {

  const { classes, cx } = useStyles();

  return (
    <Card
      className={cx(classes.root, className)}
      {...rest}>
      <CardHeader title="Launch details" />
      <Divider />
      <Table>
        <TableBody>
          {launch && <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Id
            </TableCell>
            <TableCell>
              <Typography variant="body2"color="textSecondary">
                {launch.id}
              </Typography>
            </TableCell>
          </TableRow>}
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Launch date
            </TableCell>
            <TableCell>
              <Typography variant="body2"color="textSecondary">
                {moment(launch.launch_date_local).format("LLLL")}
              </Typography>
            </TableCell>
          </TableRow>
          {launch.mission_id && <>
            <TableRow>
              <TableCell className={classes.fontWeightMedium}>
                Mission id/s
              </TableCell>
              <TableCell>
                <Typography variant="body2"color="textSecondary">
                  {launch.mission_id.join(', ')}
                </Typography>
              </TableCell>
            </TableRow>
          </>}
          {launch.mission_name && <>
            <TableRow>
              <TableCell className={classes.fontWeightMedium}>
                Mission
              </TableCell>
              <TableCell>
                <Typography variant="body2"color="textSecondary">
                  {launch.mission_name}
                </Typography>
              </TableCell>
            </TableRow>
          </>}
          {launch.launch_site && <>
            <TableRow>
              <TableCell className={classes.fontWeightMedium}>
                Launch site
              </TableCell>
              <TableCell>
                <Typography variant="body2"color="textSecondary">
                  {launch.launch_site.site_name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.fontWeightMedium}>
                Site name
              </TableCell>
              <TableCell>
                <Typography variant="body2"color="textSecondary">
                  {launch.launch_site.site_name_long}
                </Typography>
              </TableCell>
            </TableRow>
          </>}
          {launch.rocket && <>
            <TableRow>
              <TableCell className={classes.fontWeightMedium}>
                Rocket name
              </TableCell>
              <TableCell>
                <Typography variant="body2"color="textSecondary">
                  {launch.rocket.rocket_name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.fontWeightMedium}>
                Rocket type
              </TableCell>
              <TableCell>
                <Typography variant="body2"color="textSecondary">
                  {launch.rocket.rocket_type}
                </Typography>
              </TableCell>
            </TableRow>
          </>}
          {launch.details && <>
            <TableRow>
              <TableCell className={classes.fontWeightMedium}>
                Details
              </TableCell>
              <TableCell>
                <Typography variant="body2"color="textSecondary">
                  {launch.details}
                </Typography>
              </TableCell>
            </TableRow>
          </>}
        </TableBody>
      </Table>
    </Card>
  );
};

LaunchInfo.propTypes = {
  className: PropTypes.string,
  launch: PropTypes.any.isRequired
};

export default LaunchInfo;
