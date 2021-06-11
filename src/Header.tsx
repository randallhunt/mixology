import React, {SyntheticEvent} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Menu, MenuItem, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SyntheticEventData } from 'react-dom/test-utils';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null as Element | null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goHome = () => {  
    history.push('/');
    setAnchorEl(null);
  }

  const goSearch = () => {
    history.push('/search');
    setAnchorEl(null);
  }

  const goIngredients = () => {
    history.push('/ingredients');
    setAnchorEl(null);
  }

  const goFavorites = () => {
    history.push('/favorites');
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={goHome}>Most popular drinks</MenuItem>
                <MenuItem onClick={goSearch}>Search for drink</MenuItem>
                <MenuItem onClick={goIngredients}>Search by ingredients</MenuItem>
                <MenuItem onClick={goFavorites}>Favorites</MenuItem>
              </Menu>
          <Typography variant="h6" className={classes.title}>
            <em>Mixology!</em>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}