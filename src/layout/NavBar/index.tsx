/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Hidden, List } from '@mui/material';
import { 
  Home as HomeIcon, 
  RocketLaunch as LaunchIcon  
} from '@mui/icons-material';
import Logo from '../../components/Logo';
import NavItem from './NavItem';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '../../theme';

interface NavBarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

interface Item {
  href?: string;
  icon?: any;
  info?: ReactNode;
  items?: Item[];
  title: string;
}

interface Section {
  items: Item[];
}

const sections: Section[] = [
  {
    items: [
      {
        title: 'Home',
        icon: HomeIcon,
        href: '/'
      },
      {
        title: 'Launches',
        icon: LaunchIcon,
        href: '/launches',
        items: [
          {
            title: 'Upcoming launches',
            href: '/launches/upcoming'
          },
          {
            title: 'Past launches',
            href: '/launches/past'
          }
        ]
      }
    ]
  }
];

function renderNavItems({ items, pathname, depth = 0 }: 
  { items: Item[]; pathname: string; depth?: number;}
  ) {
    return (
      <List disablePadding>
        {items.reduce(
          (acc: any[], item) => reduceChildRoutes({ acc, item, pathname, depth }),
          []
        )}
      </List>
    );
}

function reduceChildRoutes({ acc, pathname, item, depth}: 
  { acc: any[]; pathname: string; item: Item; depth: number;}) {

  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, item.href ?? "");

    acc.push(
      <NavItem 
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}>
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}/>
    );
  }

  return acc;
}

const useStyles = makeStyles()((theme: Theme) => {
  return {
    mobileDrawer: {
      width: theme.spacing(32)
    },
    desktopDrawer: {
      width: theme.spacing(32),
      top: theme.spacing(8),
      height: 'calc(100% - 64px)'
    },
    avatar: {
      cursor: 'pointer',
      width: theme.spacing(8),
      height: theme.spacing(8)
    }
  }
});

const NavBar: FC<NavBarProps> = ({ onMobileClose, openMobile }) => {
  const { classes } = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Hidden mdUp>
        <Box p={2} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
      </Hidden>
      <Divider />
      <Box p={2}>
        {sections.map((section, i) => (
          <List key={i}>
            {renderNavItems({
              items: section.items,
              pathname: location.pathname
            })}
          </List>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func.isRequired,
  openMobile: PropTypes.bool.isRequired
};

export default NavBar;
