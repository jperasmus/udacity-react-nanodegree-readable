import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Voter extends Component {
  render() {
    const { id, type } = this.props;
    return (
      <div id={id} type={type}>
        Voter Component Placeholder
      </div>
    );
  }
}

Voter.propTypes = {
  type: PropTypes.oneOf(['post', 'comment']).isRequired,
  id: PropTypes.string.isRequired
};

export default Voter;
