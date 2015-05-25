var React = require('react');
var Avatar = require('epui/lib/js/components/avatar');
var ComponentDoc = require('../../../components/component-doc');


module.exports = React.createClass({
  render: function() {
    var code = '<Avatar src="./avatar.jpg" width="100" height="100" />';

    var desc = 'A avatar component';

    var componentInfo = [{
      name: 'props',
      infoArray: [{
        name: 'src',
        type: 'string',
        header: 'required',
        desc: 'The image url of the avatar'
      }]
    }];
    var urls = [
      require('./face1.png'),
      require('./face2.png'),
      require('./face3.png'),
      require('./face4.png'),
      require('./face5.png'),
      require('./face6.png'),
    ];

    var onTouchTap = function() {
      alert('Tapped');
    };

    return (
      <ComponentDoc
        name='Avatar'
        code={code}
        desc={desc}
        componentInfo={componentInfo}>
          <Avatar src={urls[0]} round={false} width={40} height={40} onTouchTap={onTouchTap} />
          <Avatar src={urls[1]} width={50} height={50} onTouchTap={onTouchTap} />
          <Avatar src={urls[2]} round={false} width={60} height={60} onTouchTap={onTouchTap} />
          <Avatar src={urls[3]} width={80} height={80} onTouchTap={onTouchTap} />
          <Avatar src={urls[4]} round={false} width={100} height={100} onTouchTap={onTouchTap} />
          <Avatar src={urls[5]} width={200} height={200} onTouchTap={onTouchTap} />
          <Avatar disabled={true} width={160} height={160} onTouchTap={onTouchTap} />
      </ComponentDoc>
    );
  }
});
