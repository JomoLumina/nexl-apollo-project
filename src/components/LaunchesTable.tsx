import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box,  Button,  Link, Table,
  TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import type { Launch } from '../types/Launch';
import moment from "moment";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


interface LaunchesTableProps {
  paginatedLaunches: Launch[];
}

const LaunchesTable: FC<LaunchesTableProps> = ({
  paginatedLaunches
}) => (
  <Box>
    <Box minWidth={400}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Id
            </TableCell>
            <TableCell>
              Launch date
            </TableCell>
            <TableCell>
              Mission/s
            </TableCell>
            <TableCell>
              Mission name
            </TableCell>
            <TableCell>
              Rocket
            </TableCell>
            <TableCell>
              Site
            </TableCell>
            <TableCell align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedLaunches.map((launch, index) => (
            <TableRow hover key={index}>
              <TableCell>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/launch/${launch.id}`}
                    variant="h6">
                    {launch.id}
                  </Link>
                </Box>
              </TableCell>
              <TableCell>
                {moment(launch.launch_date_local).format("LLL")}
              </TableCell>
              <TableCell>
                {launch.mission_id.join(", ")}
              </TableCell>
              <TableCell>
                {launch.mission_name}
              </TableCell>
              <TableCell>
                {launch.rocket.rocket_name}
              </TableCell>
              <TableCell>
                {launch.launch_site.site_name}
              </TableCell>
              <TableCell align="center">
              <Button 
                component={RouterLink}
                to={`/launch/${launch.id}`}
                variant="outlined"
                style={{textTransform: 'none'}}
                endIcon={<ChevronRightIcon />}>
                View
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Box>
);

LaunchesTable.propTypes = {
  paginatedLaunches: PropTypes.array.isRequired,
};
export default LaunchesTable;
