/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CellStyled from './styled/CellStyled';
import { noop } from '../../utils/misc';

const propTypes = {
  num: PropTypes.number,
  row: PropTypes.number,
  mode: PropTypes.number,
  onClick: PropTypes.func,
};

const defaultProps = {
  num: 0,
  row: 0,
  mode: 0,
  onClick: noop,
};

export class Cell extends PureComponent {
  _handleClick = () => {
    const { num, row } = this.props;
    this.props.onClick(row, num);
  }

  _renderContent() {
    const { mode } = this.props;

    if (mode === 1)
      return 'o';

    if (mode === -1)
      return 'x';

    return null;
  }

  render() {
    const content = this._renderContent();

    return (
      <CellStyled onClick={this._handleClick}>
        {content}
      </CellStyled>
    );
  }
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;
Cell.displayName = 'Cell';
