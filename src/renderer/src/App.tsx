import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { useState } from 'react'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [files, setFiles] = useState<string[]>([])
  // Listen for the directory selection result
  // @ts-ignore
  window.electron.ipcRenderer.on('directory-selected', (fileList: string[]) => {
    setFiles(fileList) // Set the list of files in the state
  })
  console.log(files)

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <button
            onClick={() => {
              window.electron.ipcRenderer.send('ping')
            }}
          >
            Send IPC
          </button>

          <button
            onClick={() => {
              window.electron.ipcRenderer.send('print-here')
            }}
          >
            print current directory
          </button>

          <button
            onClick={() => {
              window.electron.ipcRenderer.send('select-directory')
            }}
          >
            Open Directory
          </button>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
