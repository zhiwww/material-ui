var React = require('react');
var PhotoViewer = require('epui/lib/js/components/photo-viewer');
var ComponentDoc = require('../../../components/component-doc');


module.exports = React.createClass({
  render: function() {
    var code = "<PhotoViewer urls='./example.jpg' width='100' height='100' />";

    var desc = "A photo viewer supports paging";

    var componentInfo = [{
      name: 'props',
      infoArray: [{
        name: 'urls',
        type: 'string or array<string>',
        header: 'required',
        desc: 'The urls of photos'
      }]
    }];

    var urls = [
      require('./photo01.jpg'),
      require('./photo02.jpg'),
      require('./photo03.jpg'),
      require('./photo04.jpg')
    ];

    var width = 200;
    var height = 200;

    return (
      <ComponentDoc
        name="PhotoViewer"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>
          <PhotoViewer urls={urls} width={width} height={height} />
      </ComponentDoc>
    );
  }
});
