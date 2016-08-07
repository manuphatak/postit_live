import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as liveActions from '../../modules/live';
import * as socketActions from '../../modules/socket';
import LayoutRow from '../../components/LayoutRow';
import LayoutInnerRow from '../../components/LayoutInnerRow';
import Confirm from '../../components/Confirm';
import User from '../../components/User';
import { currentUserSelector, contributorsSelector } from '../../selectors';
import { reduxForm } from 'redux-form';
import autobind from 'autobind-decorator';
const debug = require('debug')('app:containers:LiveAppContributors');  // eslint-disable-line no-unused-vars
export class LiveAppContributors extends Component {
  @autobind
  handleAddContributor(data) {
    debug('data', data);
    const { actions } = this.props;
    actions.addContributor(data);
  }

  renderContributorMessage({ show }) {
    if (!show) return null;

    return (
      <div className="alert alert-warning">
        you are a contributor to this live channel. | <Confirm value="leave" btnClass="btn btn-link" />
      </div>
    );
  }

  renderContributorRow({ contributor }) {
    return (
      <tr key={contributor.id}>
        <td><User {...contributor} /></td>
        <td><Confirm value="remove" btnClass="btn btn-link" /></td>
        <td className="text-xs-right">full permissions (<a href="#">change</a>)</td>
      </tr>
    );
  }

  render() {
    const { currentUser, contributors } = this.props;
    return (
      <LayoutRow className="LiveAppContributors">

        <LayoutInnerRow>
          <h1>Contributors</h1>

          {this.renderContributorMessage({ show: currentUser.can.contribute })}

          <div>
            <h2>current contributors</h2>
            <table className="table table-sm table-hover">
              <tbody>
                {contributors.map(contributor => this.renderContributorRow({ contributor }))}
              </tbody>
            </table>
          </div>

          <div>
            <h2>add contributor</h2>
            <AddContributorForm onSubmit={this.handleAddContributor} form="add-contributor" />
          </div>
        </LayoutInnerRow>

      </LayoutRow>
    );
  }
}

LiveAppContributors.propTypes = {
  contributors: PropTypes.array.isRequired,

  currentUser: PropTypes.shape({
    can: PropTypes.shape({
      contribute: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

class AddContributorForm extends Component {
  @autobind
  handleSubmit(...args) {
    const { resetForm, handleSubmit } = this.props;
    resetForm();
    return handleSubmit(...args);
  }

  render() {
    const { fields:{ username } } = this.props;
    return (
      <form className="AddContributorForm" onSubmit={this.handleSubmit}>
        <table className="table  table-sm">
          <tbody>
            <tr>
              <td><input type="text" {...username} /></td>
              <td className="text-xs-right">full permissions (<a href="#">change</a>)</td>

              <td className="text-xs-center">

                <Confirm value="add" btnClass="btn btn-secondary" onClick={this.handleSubmit} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
AddContributorForm = reduxForm({ form: 'AddContributorForm', fields: ['username'] })(AddContributorForm);

function mapStateToProps(state) {
  return {
    contributors: contributorsSelector(state),
    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      live: bindActionCreators(liveActions, dispatch),
      socket: bindActionCreators(socketActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveAppContributors);
