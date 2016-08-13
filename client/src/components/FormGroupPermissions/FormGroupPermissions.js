import './FormGroupPermissions.scss';
import React, { PropTypes, Component } from 'react';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import _ from 'lodash';
const debug = require('debug')('app:components:FormGroupPermissions');  // eslint-disable-line no-unused-vars
const PERMISSIONS = [
  { value: 'change_channel_close', label: 'close channel' },
  { value: 'change_channel_contributors', label: 'edit contributors' },
  { value: 'change_channel_settings', label: 'edit settings' },
  { value: 'change_channel_messages', label: 'edit messages' },
  { value: 'add_channel_messages', label: 'add messages' },
];
export default class FormGroupPermissions extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  @autobind
  expand() {
    this.setState({ expanded: true });
  }

  @autobind
  collapse() {
    this.setState({ expanded: false });
  }

  @autobind
  handleBlur(event) {
    const { currentTarget } = event;

    this.interval = setTimeout(() => {
      if (currentTarget.contains(document.activeElement)) return;
      const { onBlur, value } = this.props;

      this.collapse();
      onBlur(value);
    }, 0);
  }

  @autobind
  handleChange(event) {
    const { onChange, value } = this.props;
    const { target } = event;

    if (value.includes(target.value)) return onChange(_.uniq(_.without(value, target.value)));

    return onChange(_.uniq(_.concat(value, target.value)));
  }

  renderSummary() {
    const { value } = this.props;
    return (
      <small>
        {PERMISSIONS
          .filter((permission) => value.includes(permission.value))
          .map(({ label }) => label)
          .join(', ')}
      </small>
    );
  }

  renderDropdown() {
    const { expanded } = this.state;
    if (!expanded) return null;
    const { onSubmit, name, value } = this.props;

    return (
      <div className="form-group dropdown-menu dropdown-menu-right">

        {PERMISSIONS.map((permission, index) => (
          <div key={index} className="form-check">
            <label className="form-check-label" tabIndex={index}>
              <input
                className="form-check-input"
                name={`${name}[]`}
                type="checkbox"
                checked={value.includes(permission.value)}
                value={permission.value}
                onChange={this.handleChange}
              />

              {permission.label}
            </label>
          </div>
        ))}

        {onSubmit ? <button onClick={onSubmit}>save</button> : null}
      </div>
    );
  }

  render() {
    const { expanded } = this.state;
    const { onFocus } = this.props;
    const divClass = classnames('dropdown', { open: expanded }, 'FormGroupPermissions');
    const handleClick = expanded ? this.collapse : this.expand;
    return (
      <div className={divClass} onBlur={this.handleBlur} onFocus={onFocus}>
        <div>
          {this.renderSummary()}&nbsp;

          (
          <button className="btn btn-link" type="button" onClick={handleClick}>change</button>
          )
        </div>

        {this.renderDropdown()}
      </div>
    );
  }
}

FormGroupPermissions.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
};

