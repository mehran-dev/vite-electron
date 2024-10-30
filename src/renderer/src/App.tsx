import { useState } from 'react'

/* 
  --- Read the Documentation in here  --- 
   https://electron-vite.org/
*/

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [files, setFiles] = useState<string[]>([])
  // Listen for the directory selection result
  // @ts-ignore
  window.electron.ipcRenderer.on('directory-selected', (fileList: string[]) => {
    setFiles(fileList) // Set the list of files in the state
    console.log(fileList)
  })

  return (
    <>
      <></>

      <div className="actions">
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
              window.electron.ipcRenderer.send('print-here', { kula: 'Foo', Bar: 'Baz' })
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
          <button
            onClick={() => {
              console.log(window.api)

              window.api.do()
            }}
          >
            API
          </button>
        </div>
      </div>
    </>
  )
}

export default App
