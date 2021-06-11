import React from 'react';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Header from './Header';
import Home from './Home';
import Search from './Search';
import Ingredients from './Ingredients';
import Favorites from './Favorites';
import Recipe from './Recipe';

const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h4',
        h5: 'h5',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});

function App() {
  
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/ingredients" component={Ingredients} />
            <Route path="/drink/:id" children={<Recipe />}/>
            <Route path="/favorites" component={Favorites} />
          </Switch>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
