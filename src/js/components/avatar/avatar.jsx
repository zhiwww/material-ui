var React = require('react');
var StylePropable = require('../../mixins/style-propable');
var EnhancedButton = require('../enhanced-button');

require('./avatar.less');

var Avatar = React.createClass({
  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    src: React.PropTypes.string,
    round: React.PropTypes.bool,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    onTouchTap: React.PropTypes.func,
    disabled: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      src: require('./avatar.png'),
      round: true,
      width: 100,
      height: 100
    };
  },

  getStyles: function() {
    var radius = this.props.round ? {
      borderRadius: '50%'
    } : null;

    var theme = this.context.muiTheme.component.avatar;

    return {
      root: this.mergeAndPrefix({
          width: this.props.width,
          height: this.props.height,
          position: 'relative',
          top: 0,
          left: 0,
          padding: 0
        }, radius, theme),
      img: this.mergeAndPrefix({
        maxWidth: this.props.width - theme.borderWidth * 2,
        maxHeight: this.props.height - theme.borderWidth * 2
      })
    };
  },

  render: function() {
    var {
      onTouchTap,
      disabled,
      ...others
    } = this.props;

    var src = this.props.src || require('./avatar.png');

    return (
      <EnhancedButton
        className='mui-avatar'
        style={this.getStyles().root}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={onTouchTap}
        disabled={disabled}
        >
        <img src={src} style={this.getStyles().img} />
      </EnhancedButton>
    );
  }
});

module.exports = Avatar;
