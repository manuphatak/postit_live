import './ContributorForm.scss';
import React, { Component, PropTypes } from 'react';
import Confirm from '../../components/Confirm';
import User from '../../components/User';
import FormGroupText from '../../components/FormGroupText';
import FormGroupPermissions from '../../components/FormGroupPermissions';
import { reduxForm, propTypes } from 'redux-form';
import autobind from 'autobind-decorator';
const debug = require('debug')('app:components:ContributorForm');  // eslint-disable-line no-unused-vars

const styles = {
  wrapper: 'ContributorForm',
  removeCol: 'ContributorForm__remove-col',
  removeButton: 'ContributorForm__button ContributorForm__button--remove',
  permissionsCol: 'ContributorForm__permissions-col',
  addCol: 'ContributorForm__add-col',
  addButton: 'ContributorForm__button ContributorForm__button--add',
};

class ContributorForm extends Component {
  @autobind
  focusConfirm(event) {
    event.preventDefault();

    const { onUpdate, handleSubmit } = this.props;
    if (onUpdate) {
      handleSubmit(onUpdate)(event);
      return;
    }
    this.submit.focus();
  }

  @autobind
  handleSubmit(...args) {
    const { resetForm, handleSubmit } = this.props;
    handleSubmit(...args);
    resetForm();
  }

  @autobind
  handleDelete() {
    const { onDelete, values } = this.props;

    onDelete(values);
  }

  renderUser({ showInput }) {
    const { values } = this.props;
    return (
      <div className={styles.userCol}>
        {this.renderUserInput({ show: showInput })}

        <User user={values.user} />
      </div>
    );
  }

  renderUserInput({ show }) {
    const { fields: { user: { username } } } = this.props;

    if (!show) return null;

    return (
      <FormGroupText id="ContributorForm-user" {...username} />
    );
  }

  renderRemoveButton({ show }) {
    const { onDelete } = this.props;

    if (!show) return null;

    return (
      <div className={styles.removeCol}>
        <Confirm value="remove" btnClass={styles.removeButton} onClick={this.handleDelete} />
      </div>
    );
  }

  renderPermissions() {
    const { fields: { user: { channel_permissions } }, onUpdate } = this.props;

    return (
      <div className={styles.permissionsCol}>
        <FormGroupPermissions{...channel_permissions} onUpdate={onUpdate ? this.focusConfirm : null} />
      </div>
    );
  }

  renderAddButton({ show }) {
    if (!show) return null;
    const ref = submit => (this.submit = submit);

    return (
      <div className={styles.addCol}>
        <Confirm value="add" btnClass={styles.addButton} align="right" ref={ref} onClick={this.handleSubmit} />
      </div>
    );
  }

  render() {
    const { action } = this.props;

    return (
      <form className={styles.wrapper} onSubmit={this.focusConfirm}>

        {this.renderUser({ showInput: action === 'create' })}

        {this.renderRemoveButton({ show: action === 'update' })}

        {this.renderPermissions()}

        {this.renderAddButton({ show: action === 'create' })}

      </form>
    );
  }
}

ContributorForm.propTypes = {

  resetForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  fields: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.object,
      can: PropTypes.object,
    }),
  }),
  values: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      permissions: PropTypes.string,
    }),
  }),
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  action: PropTypes.oneOf(['create', 'update']),
};

export default reduxForm({
  form: 'ContributorForm',
  fields: [
    'user.username',
    'user.channel_permissions',
  ],
})(ContributorForm);
