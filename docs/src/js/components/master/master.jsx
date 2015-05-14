var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var AppLeftNav = require("../app-left-nav");

var ThemeManager = require("epui/lib/js/styles/theme-manager");
var AppBar = require("epui/lib/js/components/app-bar");
var AppCanvas = require("epui/lib/js/components/app-canvas");
var Menu = require("epui/lib/js/components/menu");
var IconButton = require("epui/lib/js/components/icon-button");

var Theme = new ThemeManager();

class Master extends React.Component {

  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: Theme.getCurrentTheme()
    };
  }

  render() {
    var title =
      this.context.router.isActive("get-started") ? "Get Started" : "";

    var githubButton = (
      <IconButton
        iconStyle={{color: "#FFF", fill: "#FFF"}}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true} />
    );

    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar
          className="mui-dark-theme"
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}/>

        <AppLeftNav ref="leftNav" />

        <RouteHandler />

        <div className="footer full-width-section mui-dark-theme">
          <p>
            Hand crafted with love by the engineers at <a href="http://call-em-all.com">Call-Em-All</a> and our
            awesome <a href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
          </p>
          {githubButton}
        </div>

      </AppCanvas>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
