import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Tooltip } from 'antd';
import { voteUp, voteDown } from '../actions';
import './Voter.css';

class Voter extends Component {
  render() {
    const { id, type, size, voteLoading, voteScore } = this.props;

    const classes = ['voter'].concat(size);

    return (
      <div className={voteLoading ? classes.concat('disabled-voter').join(' ') : classes.join(' ')}>
        <Tooltip title="Vote Up" placement="top">
          <Icon type="up" onClick={() => this.props.increment(type, id)} />
        </Tooltip>
        <span>{voteScore}</span>
        <Tooltip title="Vote Down" placement="bottom">
          <Icon type="down" onClick={() => this.props.decrement(type, id)} />
        </Tooltip>
      </div>
    );
  }
}

Voter.defaultProps = {
  voteScore: 0,
  size: 'small'
};

Voter.propTypes = {
  voteLoading: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['posts', 'comments']).isRequired,
  size: PropTypes.oneOf(['large', 'small']),
  id: PropTypes.string.isRequired,
  voteScore: PropTypes.number,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
};

const mapStateToProps = ({ meta }) => ({
  voteLoading: meta.voteLoading
});

const mapDispatchToProps = dispatch => ({
  increment: (type, id) => dispatch(voteUp(type, id)),
  decrement: (type, id) => dispatch(voteDown(type, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Voter);
