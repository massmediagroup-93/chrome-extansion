import React, { useState, useEffect } from 'react'
import Modal from './components/modal/modal'
import { Button } from './components/button/button'
import { bubbles, Bubble } from './data/bubbles'
import styles from './App.module.scss'

function App() {
  const [activeBubble, setActiveBubble] = useState<Bubble | null>(null)
  const [isUnmountTheApp, setIsUnmountTheApp] = useState<boolean>(false)

  const handleBubbleClick = (bubble: Bubble) => {
    setActiveBubble(bubble)
  }

  function closeModal() {
    setActiveBubble(null)
  }

  useEffect(() => {
    // Set up event listeners from Content script
    window.addEventListener('message', event => {
      if (event.source !== window) return
      if (event.data.type && (event.data.type === 'MOUNT_THE_APP')) {
        setIsUnmountTheApp(false)
      }
      if (event.data.type && (event.data.type === 'UNMOUNT_THE_APP')) {
        closeModal()
        setIsUnmountTheApp(true)
      }
    })
  }, [])

  if (isUnmountTheApp) return <></>

  return (
    <>
      <Modal
        isOpen={!!activeBubble}
        onRequestClose={closeModal}
        contentLabel="Bubble Modal"
      >
        <h2>{activeBubble?.title}</h2>
      </Modal>

      <div className={styles.app__bubblesContainer}>
        {bubbles.map(bubble => (
          <Button
            key={bubble.id}
            isActive={bubble.id === activeBubble?.id}
            onClick={() => handleBubbleClick(bubble)}
          >
            {bubble.title}
          </Button>
        ))}
      </div>
    </>
  )
}

export default App
