import React, { PropsWithChildren, ReactElement } from 'react'
import classnames from 'classnames'
import styles from './button.module.scss'

type Props = PropsWithChildren<{
  isActive: boolean
  onClick: () => void
}>

export const Button: React.FC<Props> = ({
  children,
  onClick,
  isActive,
}): ReactElement => (
  <button
    type="button"
    className={classnames(styles.button, { [styles.button_active]: isActive })}
    onClick={onClick}
    onKeyPress={event => event.key === 'Enter' && onClick}
    tabIndex={0}
  >
    {children}
  </button>
)
