import React from 'react';
import { fetchListItems, submitListItem, postListItem } from '../reducers/actions';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  NavLink,
  withRouter
} from 'react-router-dom';
import BoardColumn from './BoardColumn';
import BoardForm from './BoardForm'
import './App.css';


class BoardNav extends React.Component {

  constructor(props) {
    super(props);
  }

  //equivalent of onAttached
  componentWillMount() {
    this.props.dispatch(fetchListItems());
  }

  render() {
    return(
      <div className="todoList">
        <h1>miniboard</h1>
        <BoardForm onSubmit={(values) => this.props.dispatch(postListItem(values))} />
        <div className="nav">
          <div>
            <NavLink activeClassName="active" to="/backlog">backlog</NavLink>
          </div>
          <div>
            <NavLink activeClassName="active" to="/started">started</NavLink>
          </div>
          <div>
            <NavLink activeClassName="active" to="/finished">finished</NavLink>
          </div>
        </div>
        <div className="columnContainer">
          {/*
            switch maintains exclusivity between routes, acts as an iron-pages of sorts. However, routes are not exclusive by default. if two routes both match the path, both will render.
          */}
          <Switch>
            <Route path="/backlog" component={BoardColumn}></Route>
            <Route path="/started" component={BoardColumn}></Route>
            <Route path="/finished" component={BoardColumn}></Route>
          </Switch>
        </div>
      </div>
    );
  };
};

export default withRouter(connect()(BoardNav));
