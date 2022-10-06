import {  useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, InputAdornment, 
  SvgIcon, TablePagination, TextField, 
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import type { Theme } from '../theme';
import LaunchesTable from './LaunchesTable';
import { makeStyles } from 'tss-react/mui';
import type { Launch } from '../types/Launch';

interface ResultsProps {
  className?: string;
  launches: Launch[];
}

const applyQuery = (launches: Launch[], query: string): any[] => launches?.filter((launch) => {
  let matches = true;

  if (query) {
    let containsQuery = false;

    if (launch.id?.toLowerCase().includes(query.toLowerCase()) ||
        launch.mission_name?.toLowerCase().includes(query.toLowerCase()) ||
        launch.launch_date_local?.toLowerCase().includes(query.toLowerCase()) ||
        launch.launch_site?.site_name?.toLowerCase().includes(query.toLowerCase()) ||
        launch.rocket.rocket_name.toLowerCase().includes(query.toLowerCase())) 
    {
      containsQuery = true;
    }

    if (!containsQuery) {
      matches = false;
    }
  }

  return matches;
});

const applyPagination = (launches: Launch[], page: number,
  limit: number): any[] => launches.slice(page * limit, page * limit + limit);

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {},
    queryField: {
      width: 500,
    },
    bulkOperations: {
      position: 'relative',
    },
    avatar: {
      height: 42,
      width: 42,
      marginRight: theme.spacing(1),
    },
  }
});

const Results: FC<ResultsProps> = ({
  className,
  launches,
  ...rest
}) => {
  const { classes, cx } = useStyles();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 16));
  };

  const filteredLaunches = applyQuery(launches, query);
  const paginatedLaunches = applyPagination(filteredLaunches, page, limit);

  return (
    <Card className={cx(classes.root, className)} {...rest}>
      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Search Launches"
          value={query}
          variant="outlined" />
        <Box flexGrow={1} />
      </Box>
      <LaunchesTable paginatedLaunches={paginatedLaunches}/>
      <TablePagination
        component="div"
        count={filteredLaunches.length}
        onPageChange={(event, newPage) => handlePageChange(newPage)}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  launches: PropTypes.array.isRequired
};

export default Results;
