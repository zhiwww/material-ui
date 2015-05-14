var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
var Master = require("../components/master");
var Home = require("../pages/home");

module.exports = (
  <Route name="root" handler={Master} path="/">
    <Route name="home" handler={Home} />
    <Route name="get-started" handler={require("react-router-proxy!../pages/get-started")} path="/get-started" />
    <DefaultRoute handler={Home} />
  </Route>
);
