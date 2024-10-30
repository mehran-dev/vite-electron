import { useEffect, useState } from 'react'
import TreeView from './components/TreeView'

/* 
  --- Read the Documentation in here  --- 
   https://electron-vite.org/
*/

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [directory, setDirectory] = useState<{ path: string; directoryTree: any[] } | null>(null)

  useEffect(() => {
    // Listen for the directory data from the main process
    window.electron.ipcRenderer.on('directory-selected', (event, data) => {
      setDirectory(data)
    })

    /*   return () => {
      window.electron.ipcRenderer.removeAllListeners('directory-selected')
    } */
  }, [])
  return (
    <>
      <></>

      <div className="">
        <div className="mx-auto">
          <button
            className="mx-2 border border-solid rounded-lg  px-2 hover:bg-slate-600"
            onClick={() => {
              window.electron.ipcRenderer.send('ping')
            }}
          >
            Send IPC
          </button>

          <button
            className="mx-2 border border-solid rounded-lg  px-2 hover:bg-slate-600"
            onClick={() => {
              window.electron.ipcRenderer.send('print-here', { kula: 'Foo', Bar: 'Baz' })
            }}
          >
            print current directory
          </button>

          <button
            className="mx-2 border border-solid rounded-lg  px-2 hover:bg-slate-600"
            onClick={() => {
              window.electron.ipcRenderer.send('select-directory')
            }}
          >
            Open Directory
          </button>
          <button
            className="mx-2 border border-solid rounded-lg  px-2 hover:bg-slate-600"
            onClick={() => {
              window.electron.ipcRenderer.send('convert-extensions', {
                path: '',
                extensions: [],
                excludes: []
              })
            }}
          >
            Change Extensions
          </button>
          <button
            className="mx-2 border border-solid rounded-lg  px-2 hover:bg-slate-600"
            onClick={() => {
              console.log(window.api)

              window.api.do()
            }}
          >
            API
          </button>
        </div>
        <div className="mx-12 my-3 h-[50vh] overflow-auto w-full border rounded-md p-3">
          <TreeView data={directory?.directoryTree || []} />
        </div>
      </div>
    </>
  )
}

export default App
