var React = require("react");
var Router = require("react-router");
var _ = require("lodash");
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
var Master = require("../components/master");
var Home = require("../pages/home");
var Components = require("../components/components");

var comps = require("../pages/components/");
var names = _.keys(comps);
var routes = names.map(function(name) {
  return (
    <Route key={name} name={_.kebabCase(name)} handler={comps[name]} />
  );
});

module.exports = (
  <Route name="root" handler={Master} path="/">
    <Route name="home" handler={Home} />
    <Route name="get-started" handler={require("react-router-proxy!../pages/get-started")} path="/get-started" />
    <Route name="components" handler={Components}>
      {routes}
      <Redirect from="/components" to="avatar" />
    </Route>
    <DefaultRoute handler={Home} />
  </Route>
);
