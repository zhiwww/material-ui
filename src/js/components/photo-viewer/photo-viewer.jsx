var React = require('react');
var StylePropable = require('../../mixins/style-propable');
var assign = require('react/lib/Object.assign');
var Velocity = require('velocity-animate');

require('./photo-viewer.less');

var PhotoViewer = React.createClass({
  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    urls: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    initialIndex: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      width: 100,
      height: 100,
      initialIndex: 0
    };
  },

  getInitialState: function() {
    return {
      current: 0,
      offsetX: 0,
      left: 0,
      dragging: null
    };
  },

  componentDidMount: function() {

  },

  getStyles: function() {
    return {
      root: {
        backgroundColor: this.context.muiTheme.component.paper.backgroundColor,
        width: this.props.width,
        height: this.props.height
      },
      page: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: this.props.width,
        height: this.props.height
      },
      image: {
        maxHeight: this.props.width,
        maxWidth: this.props.height
      }
    };
  },

  getCount: function() {
    var urls = this.props.urls;
    if(typeof urls === 'string') {
      urls = [urls];
    }
    return urls.length;
  },

  makePhotoPage: function(url) {
    if(!url) { return null }

    return (
      <div className='mui-photo-viewer-page' key={url} style={this.mergeAndPrefix(this.getStyles().page)}>
        <img className='mui-photo-viewer-image' src={url} style={this.mergeAndPrefix(this.getStyles().image)}/>
      </div>
    );
  },

  getPages: function() {
    return this.props.urls.map(function(url) {
      return this.makePhotoPage(url);
    }, this);
  },

  selectIndex: function(idx) {
    var count = this.getCount();
    if(idx < 0) { idx = Math.abs(count - Math.abs(idx)); }
    idx = idx % count;
    this.setState({
      current: idx
    });
  },

  onMouseEvent: function(e) {
    if(this.state.dragging === false) {
      return;
    }

    var count = this.getCount();
    var width = this.props.width;
    var current = this.state.current;
    var left = -1 * current * width;
    var clientX = e.clientX || (e.touches[0] && e.touches[0].clientX);
    var state = {};

    var starts = ['dragstart', 'touchstart'];
    var ends = ['touchend', 'mouseup', 'touchcancel', 'mouseleave'];

    //A. check start events, turn on dragging flag and set coordinate
    var starting = false;
    if(starts.indexOf(e.type) >= 0) {
      state = assign(state, {
        dragging: true,
        startX: clientX
      });
      starting = true;
    }
    if(!(this.state.dragging || starting)) { return; }


    //B. calculate offsets
    var startX = this.state.startX || clientX;
    var offsetX = clientX ? clientX - startX : this.state.offsetX; //total offset on X axis
    var offset = Math.abs(offsetX);
    var dir = offsetX / offset; //direction (-1=left, 1=right)

    //C. check end events
    if(ends.indexOf(e.type) >= 0) {
      var switchTo = current - dir;
      //new current and distance for translating back on X axis
      if(offset > width / 3 && switchTo >= 0 && switchTo < count) {
        current = switchTo;
        left = -1 * current * width;
      }
      //turn down dragging flags
      state = assign(state, {
        dragging: false,
        startX: false
      });
    }

    //D. record coordinates
    state = assign(state, {
      current: current,
      offsetX: offsetX,
      left: left
    });
    console.log('set offset to', offsetX);
    //E. set state
    this.setState(state);

    if(e.type === 'dragstart') e.preventDefault();
  },

  componentDidUpdate: function() {
    if(this.state.dragging !== false) return;
    var self = this;
    var container = this.refs.container.getDOMNode();
    Velocity(container, {
      translateX: 0
    }, {
      duration: 500,
      complete: function(elements) {
        self.setState({
          dragging: null,
          offsetX: 0
        });
      }
    });
  },

  render: function() {
    var pages = this.getPages();
    var width = this.props.width;
    var totalWidth = width * pages.length;

    var styles = this.mergeAndPrefix({
      width: totalWidth,
      left: this.state.left,
      transform: 'translateX(' + this.state.offsetX + 'px)'
    });

    console.log(styles);
    return (
      <div className='mui-photo-viewer'
        ref='viewer'
        onDragStart={this.onMouseEvent}
        onMouseMove={this.onMouseEvent}
        onMouseLeave={this.onMouseEvent}
        onMouseUp={this.onMouseEvent}
        onTouchStart={this.onMouseEvent}
        onTouchMove={this.onMouseEvent}
        onTouchEnd={this.onMouseEvent}
        onTouchCancel={this.onMouseEvent}
        style={this.mergeAndPrefix(this.getStyles().root)} >
        <div ref='container' className='mui-photo-viewer-container' style={styles} >
          {pages}
        </div>
      </div>
    );
  }
});

module.exports = PhotoViewer;
