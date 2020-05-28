import { darken } from "polished"
import React from "react"
import styled, { css } from "styled-components"

import { theme } from "theme"
import type { Color } from "types"
import { color } from "utils"

import { ButtonProps, buttonDefaultProps, getButtonSize } from "../Button"

const defaultProps = {
  ...buttonDefaultProps,
  direction: "bottom",
  selected: false,
}

type Props = ButtonProps &
  Readonly<{
    direction: "top" | "right" | "bottom" | "left"
    selected: boolean
  }>

type ThemeShape = {
  background: Color
  color: Color
}

const baseCss = css<Props>`
  display: flex;
  height: ${getButtonSize};
  padding: 0 1rem;
  align-items: center;
  background: transparent;
  border: none;
  font-weight: 400;
  outline: 0;
  line-height: 1.15;
  transition: all 70ms cubic-bezier(0, 0, 0.38, 0.9);
  opacity: ${({ selected }) => (selected ? "1" : "0.5")};
`

const getTheme = (normal: ThemeShape, hover: ThemeShape) =>
  css<Props>`
    background: ${color(normal.background)};
    color: ${color(normal.color)};
    ${({ direction, selected }) =>
      selected && `border-${direction}: 2px solid ${theme.color.draculaPink};`};

    &:focus {
      box-shadow: inset 0 0 0 1px ${color("draculaForeground")};
    }

    &:hover:not([disabled]) {
      background: ${color(hover.background)};
      color: ${color(hover.color)};
      opacity: 1;
    }

    &:active:not([disabled]) {
      background: ${darken(0.1, theme.color[hover.background])};
    }
  `

const Primary = styled.button<Props>`
  ${baseCss};
  ${getTheme(
    {
      background: "draculaBackgroundDarker",
      color: "draculaForeground",
    },
    {
      background: "draculaComment",
      color: "draculaForeground",
    },
  )};
`

export const PrimaryToggleButton = (props: Props) => <Primary {...props} />

PrimaryToggleButton.defaultProps = defaultProps