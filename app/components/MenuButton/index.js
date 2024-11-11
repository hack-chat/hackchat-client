/**
 * MenuButton exports the ui rendering functions to display a child element
 * of the MainMenu
 */

import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';
import { Tooltip } from 'reactstrap';
import MainButton from './MainButton';
import StyledButton from './StyledButton';

export default function MenuButton({
  href,
  isMain,
  toolTip,
  tipPlacement,
  onClick,
  children,
  className,
}) {
  const [tooltipOpen, setTooltipOpen] = useStateIfMounted(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [id] = useStateIfMounted(_uniqueId('mm-'));

  let toolTipText = toolTip;
  if (!toolTipText) toolTipText = '';

  const btnTooltip = (
    <Tooltip
      placement={tipPlacement || 'left'}
      isOpen={tooltipOpen}
      target={id}
      toggle={toggle}
      timeout={100}
      autohide
    >
      {toolTipText}
    </Tooltip>
  );

  if (isMain) {
    return (
      <MainButton href={href} onClick={onClick} id={id} className={className}>
        {React.Children.toArray(children)}
        {btnTooltip}
      </MainButton>
    );
  }

  return (
    <StyledButton href={href} onClick={onClick} id={id} className={className}>
      {React.Children.toArray(children)}
      {btnTooltip}
    </StyledButton>
  );
}

MenuButton.propTypes = {
  href: PropTypes.string,
  isMain: PropTypes.bool,
  toolTip: PropTypes.string,
  tipPlacement: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
