var React = require('react'),
  Paper = require('epui/lib/js/components/paper'),
  CodeBlock = require('./code-block.jsx');

class CodeExample extends React.Component {

  render() {
    var borderColor = this.context.muiTheme.palette.borderColor;
    var style = {
      label: {
        color: borderColor
      },
      block: {
        borderRadius: '0 0 2px 0'
      }
    };

    return (
      <Paper className="code-example">
        <div className="example-label" style={style.label}>example</div>
        <div className="example-block" style={style.block}>
          {this.props.children}
        </div>
        <CodeBlock>{this.props.code}</CodeBlock>
      </Paper>
    );
  }
}

CodeExample.propTypes = {
  code: React.PropTypes.string.isRequired
};

CodeExample.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = CodeExample;
