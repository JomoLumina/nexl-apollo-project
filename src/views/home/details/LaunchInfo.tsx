import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, Divider, Grid, Table, 
  TableBody, TableCell, TableRow, Typography
} from '@mui/material';
import type { Launch } from '../../../types/Launch';
import { makeStyles } from 'tss-react/mui';
import moment from 'moment';

interface LaunchInfoProps {
  launch: Launch;
  title: string;
  id: string;
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
  launch, title, id, className,...rest
}) => {
  
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  return (
    <Card
      className={cx(classes.root, className)}
      {...rest}>
      <CardHeader title={title} style={{ textAlign: 'center' }}/>
      <Divider style={{border: "1px solid #e0c816"}} />
      <Table>
        <TableBody>
          {launch.mission_name && <>
            <TableRow>
              <TableCell align='center' style={{borderBottomColor: "#999"}}>
                Launch mission
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' style={{borderBottomColor: "#999"}}>
                <Typography variant="body2"color="textSecondary" className={classes.fontWeightMedium}>
                  {launch.mission_name}
                </Typography>
              </TableCell>
            </TableRow>
          </>}
          <TableRow>
            <TableCell align='center' style={{borderBottomColor: "#999"}}>
              Launch date
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' style={{borderBottomColor: "#999"}}>
              <Typography variant="body2"color="textSecondary" className={classes.fontWeightMedium}>
                {moment(launch.launch_date_local).format("LLLL")}
              </Typography>
            </TableCell>
          </TableRow>
          {launch.rocket && <>
            <TableRow>
              <TableCell align='center' style={{borderBottomColor: "#999"}}>
                Rocket name
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' style={{borderBottomColor: "#999"}}>
                <Typography variant="body2" color="textSecondary" className={classes.fontWeightMedium}>
                  {launch.rocket.rocket_name}
                </Typography>
              </TableCell>
            </TableRow>
          </>}
        </TableBody>
      </Table>
      <Grid item xs={12} padding={3}>
        <Button color="secondary" variant="contained" fullWidth style={{textTransform: 'none'}}
          onClick={() => { navigate(`/launch/${id}`)} }>
            View more details
          </Button>
      </Grid>
    </Card>
  );
};

LaunchInfo.propTypes = {
  className: PropTypes.string,
  launch: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default LaunchInfo;
