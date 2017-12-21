import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin } from 'antd';

const Loader = props => (
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col>
        <Spin />
      </Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col>
        <h5>{props.text}</h5>
      </Col>
    </Row>
  </div>
);

Loader.defaultProps = {
  text: 'Loading'
};

Loader.propTypes = {
  text: PropTypes.string
};

export default Loader;
