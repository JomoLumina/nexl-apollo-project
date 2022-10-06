import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumbs, Button,
  Grid, Link, Typography,
} from '@mui/material';
import { 
  ChevronLeftOutlined as ChevronLeftOutlinedIcon, 
  NavigateNext as NavigateNextIcon } from '@mui/icons-material';
interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent={'space-between'} spacing={3} {...rest}>
      <Grid item>
        <Breadcrumbs aria-label="breadcrumb" 
          separator={<NavigateNextIcon fontSize="small" />}>
          <Link variant="body1" color="inherit" to="/" component={RouterLink}>
            Home
          </Link>
          <Typography variant="body1" color="textPrimary">
            Launch
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" color="textPrimary">
          Launch Details
        </Typography>
      </Grid>
      <Grid item>
        {<Button color="secondary" variant="contained" 
          onClick={() => {
            navigate(-1);
          }}
          startIcon={<ChevronLeftOutlinedIcon />}>
            Back
          </Button>}
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
