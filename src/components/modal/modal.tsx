import React, { PropsWithChildren } from 'react'
import ReactModal from 'react-modal'
import styles from './modal.module.scss'

const customStyles = {
  content: {
    minHeight: '50%',
    minWidth: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

ReactModal.setAppElement('body')

type Props = PropsWithChildren<{
    isOpen: boolean
    onRequestClose: ()=> void
    contentLabel: string
}>

const Modal: React.FC<Props> = ({
  children,
  isOpen,
  contentLabel,
  onRequestClose,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
    contentLabel={contentLabel}
  >
    <button
      type="button"
      onClick={onRequestClose}
      className={styles.modal__closeBtn}
    >
      &#10060;
    </button>
    {children}
  </ReactModal>
)

export default Modal
