import { useEffect, useState } from 'react'
import TreeView from './components/TreeView'

/* 
  --- Read the Documentation in here  --- 
   https://electron-vite.org/
*/

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [directoryTree, setDirectoryTree] = useState([])

  useEffect(() => {
    // Listen for the directory data from the main process
    window.electron.ipcRenderer.on('directory-selected', (event, data) => {
      setDirectoryTree(data)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('directory-selected')
    }
  }, [])
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
        <div className="mx-12  h-[50vh] overflow-auto w-full">
          <TreeView data={directoryTree} />
        </div>
      </div>
    </>
  )
}

export default App
