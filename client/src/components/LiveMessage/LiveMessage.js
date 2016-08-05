import './LiveMessage.scss';
import React, { PropTypes, Component } from 'react';
import Moment from '../Moment';
import Confirm from '../Confirm';
import LayoutInnerRow from '../LayoutInnerRow';
import User from '../User';
import classnames from 'classnames';

export default class LiveMessage extends Component {
  constructor(props) {
    super(props);

    const { actions, id } = this.props;
    this.strikeMessage = actions.strikeMessage.bind(this, { id });
    this.deleteMessage = actions.deleteMessage.bind(this, { id });
  }

  renderStrikeButton() {
    const { status } = this.props;
    return status === 'stricken'
      ? <span>stricken</span>
      : <Confirm onClick={this.strikeMessage} btnClass="btn btn-secondary btn-sm Confirm" value="strike" />;
  }

  renderDeleteButton() {
    return <Confirm onClick={this.deleteMessage} btnClass="btn btn-secondary btn-sm Confirm" value="delete" />;
  }

  render() {
    const { created, body_html, author, status } = this.props;
    const moment = <Moment date={created} />;
    const spanClass = classnames('body-text', status);

    return (
      <LayoutInnerRow sidebar={moment} className="LiveMessage">
        <div className="body">
          <span className={spanClass} dangerouslySetInnerHTML={{ __html: body_html }} />

          <User {...author} />
        </div>
        <div className="buttonrow">
          {this.renderStrikeButton()} {this.renderDeleteButton()}
        </div>
      </LayoutInnerRow>
    );
  }
}
LiveMessage.propTypes = {
  id: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  body_html: PropTypes.string.isRequired,
  author: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  status: PropTypes.oneOf(['visible', 'stricken']).isRequired,
  actions: PropTypes.shape({
    strikeMessage: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
  }).isRequired,
};
