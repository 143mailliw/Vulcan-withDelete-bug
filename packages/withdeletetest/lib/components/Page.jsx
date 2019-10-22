import React from 'react';
import Helmet from 'react-helmet';
import { Components, withMulti, withCurrentUser, registerComponent, withCreate } from 'meteor/vulcan:core';

import '../components/movies/MoviesList.jsx';

class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Components.MoviesList/>
    )
  }
}

registerComponent({ name: 'Page', component: Page });