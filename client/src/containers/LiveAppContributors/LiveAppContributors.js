import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as socketActions from '../../actions/socketActions';
import * as liveActions from '../../actions/liveActions';
import LayoutRow from '../../components/LayoutRow';
import LayoutInnerRow from '../../components/LayoutInnerRow';
import Confirm from '../../components/Confirm';
import User from '../../components/User';
export class LiveAppContributors extends Component {
  render() {
    return (
      <LayoutRow className="LiveAppContributors">

        <LayoutInnerRow>
          <h1>Contributors</h1>
          <div className="alert alert-warning">
            you are a contributor to this live channel. | <Confirm value="leave" btnClass="btn btn-link" />
          </div>

          <div>
            <h2>current contributors</h2>
            <table>
              <tbody>
                <tr>
                  <td><User username="user" /></td>
                  <td><Confirm value="remove" btnClass="btn btn-link" /></td>
                  <td>full permissions</td>
                  <td>(<a href="#">change</a>)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2>invite contributor</h2>
            <table>
              <tbody>
                <tr>
                  <td><input type="text" /></td>
                  <td>full permissions(<a href="#">change</a>)</td>
                  <td>
                    <button>invite</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div>
            <h2>invited contributors</h2>
            <table>
              <tbody>
                <tr>
                  <td>/u/admin</td>
                  <td><Confirm value="remove" btnClass="btn btn-link" /></td>
                  <td>full permissions</td>
                  <td>(<a href="#">change</a>)</td>
                </tr>
              </tbody>
            </table>
          </div>

        </LayoutInnerRow>

      </LayoutRow>
    );
  }
}

LiveAppContributors.propTypes = {};

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = { ...liveActions, ...socketActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveAppContributors);
