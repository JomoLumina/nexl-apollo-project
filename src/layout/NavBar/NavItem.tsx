import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Collapse, ListItem } from '@mui/material';
import {
  ExpandMoreOutlined as ExpandMoreIcon, 
  ExpandLessOutlined as ExpandLessIcon
} from "@mui/icons-material";
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '../../theme';
import { useTheme } from '../../theme';


interface NavItemProps {
  children?: ReactNode;
  className?: string;
  depth: number;
  href?: string;
  icon: any;
  info: any;
  open?: boolean;
  title: string;
}

const useStyles = makeStyles()((theme: Theme) => {
  return {
    item: {
      display: 'block',
      paddingTop: 0,
      paddingBottom: 0
    },
    itemLeaf: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    button: {
      color: theme.palette.text.secondary,
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%'
    },
    buttonLeaf: {
      color: theme.palette.text.secondary,
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightRegular,
      '&.depth-0': {
        '& $title': {
          fontWeight: theme.typography.fontWeightMedium
        }
      }
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
    title: {
      marginRight: 'auto'
    },
    active: {
      color: theme.palette.secondary.main,
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      },
      '& $icon': {
        color: theme.palette.secondary.main
      }
    }
  }
});

const NavItem: FC<NavItemProps> = ({
  children, className, depth, href, icon: Icon,
  info: Info, open: openProp, title, ...rest
}) => {

  const theme = useTheme();
  const {classes, cx} = useStyles();
  const [open, setOpen] = useState<boolean | undefined>(openProp);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={cx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}>
        <Button className={classes.button} onClick={handleToggle} style={style}>
          {Icon && (<Icon className={classes.icon} size="20"/>)}
          <span className={classes.title}>
            {title}
          </span>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        <Collapse in={open}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  if(!href){
    return null;
  }

  return (
    <ListItem
      className={cx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}>
      <Button
        className={cx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        to={href}
        style={style}
        sx={{
          '&.active': {
            color: theme.palette.secondary.main,
            '& $title': {
              fontWeight: theme.typography.fontWeightMedium
            },
            '& $icon': {
              color: theme.palette.secondary.main
            }
          }
        }}>
        {Icon && (<Icon className={classes.icon} size="20"/>)}
        <span className={classes.title}>
          {title}
        </span>
        {Info && <Info />}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

NavItem.defaultProps = {
  open: false
};

export default NavItem;
