import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Attributes, SetupMenuComp } from 'components/Setup';
import PropTypes from 'prop-types';
import * as setupActions from 'modules/setup/setupModule';

class SetupLayoutContainer extends Component {
  static defaultProps = {
    SetupActions: null,
    attributeData: '',
  }

  componentDidMount() {

  }

  RequestAttributeData = () => {
    console.log('Request Get Attributes Action');
    const { SetupActions } = this.props;
    SetupActions.getAttributes();
  }

  render() {
    const { attributeData } = this.props;
    return (
      <div>
        Setup Page
        <Attributes
          onRequestAttributes={this.RequestAttributeData}
          attributesData={attributeData}
        />
        <SetupMenuComp
          attributesData={attributeData}
        />
      </div>
    );
  }
}

SetupLayoutContainer.propTypes = {
  SetupActions: PropTypes.shape({
    getAttributes: PropTypes.func.isRequired,
  }),
  attributeData: PropTypes.string,
};

export default connect(
  state => ({
    attributeData: state.setupModule.get('attributeData'),
  }),
  dispatch => ({
    SetupActions: bindActionCreators(setupActions, dispatch),
  }),
)(SetupLayoutContainer);
