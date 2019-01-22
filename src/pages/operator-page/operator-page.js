/* eslint-disable react/no-did-update-set-state */
import * as React from 'react';
import * as _ from 'lodash-es';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Alert, Breadcrumb, EmptyState, Modal } from 'patternfly-react';

import Footer from '../../components/footer';
import Header from '../../components/header';
import { normalizeOperators } from '../../utils/operatorUtils';
import { helpers } from '../../common/helpers';
import { fetchOperators } from '../../services/operatorsService';
import { MarkdownView } from '../../components/markdownView';

class OperatorPage extends React.Component {
  state = {
    operator: {}
  };

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    if (_.size(this.props.operators) && !_.isEqual(this.props.operators, prevProps.operators)) {
      const newOperators = normalizeOperators(this.props.operators);
      this.setState({ operator: newOperators[0] });
    }
  }

  refresh() {
    const { match } = this.props;
    this.props.fetchOperators(_.get(match, 'params.operatorId'));
  }

  onHome(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

  renderPendingMessage = () => {
    const { pending } = this.props;
    if (pending) {
      return (
        <Modal bsSize="lg" backdrop={false} show animation={false}>
          <Modal.Body>
            <div className="spinner spinner-xl" />
            <div className="text-center">Loading available operators...</div>
          </Modal.Body>
        </Modal>
      );
    }

    return null;
  };

  renderError = () => {
    const { errorMessage } = this.props;

    return (
      <EmptyState>
        <Alert type="error">
          <span>Error retrieving operators: {errorMessage}</span>
        </Alert>
        {this.renderPendingMessage()}
      </EmptyState>
    );
  };

  render() {
    const { error, pending } = this.props;
    const { operator } = this.state;

    if (error) {
      return this.renderError();
    }

    if (pending || !operator) {
      return this.renderPendingMessage();
    }

    return (
      <React.Fragment>
        <Header />
        <Breadcrumb>
          <Breadcrumb.Item onClick={e => this.onHome(e)} href="#">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{operator.name}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{operator.name}</h1>
        {operator.longDescription && <MarkdownView content={operator.longDescription} outerScroll />}
        <Footer />
      </React.Fragment>
    );
  }
}

OperatorPage.propTypes = {
  operators: PropTypes.array,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  pending: PropTypes.bool,
  match: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  fetchOperators: PropTypes.func
};

OperatorPage.defaultProps = {
  operators: [],
  error: false,
  errorMessage: '',
  pending: false,
  match: {},
  fetchOperators: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  fetchOperators: name => dispatch(fetchOperators(name))
});

const mapStateToProps = state => ({
  ...state.operators.operators
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorPage);
