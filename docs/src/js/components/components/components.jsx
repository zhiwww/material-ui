var React = require('react');
var _ = require('lodash');
var PageWithNav = require('../page-with-nav');

class Components extends React.Component {

  render() {
    var comps = require('../../pages/components/');
    var names = Object.keys(comps);
    
    var menuItems = names.map(function(name) {
      return {
        route: _.kebabCase(name),
        text: name
      };
    });

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = Components;
