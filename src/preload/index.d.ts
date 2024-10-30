// src/@types/electron.d.ts
import { ElectronAPI } from '@electron-toolkit/preload'
import { ConversionOptions } from '../main/utils/extension.util'
import { API } from '../preload/index'
// Extend ElectronAPI to include your IPC methods
interface CustomElectronAPI extends ElectronAPI {
  ipcRenderer: {
    send(channel: 'convert-extensions', data: ConversionOptions): void
    send(channel: 'ping'): void
    send(channel: 'directory-selected', data: any): void
    send(channel: 'print-here', data: any): void
    send(channel: 'select-directory'): void

    on(channel: 'directory-selected', listener: (event: Event, data: any) => void): void
    on(channel: 'conversion-error', listener: (event: Event, errorMessage: string) => void): void
  }
}

// Extend the global Window interface
declare global {
  interface Window {
    electron: CustomElectronAPI
    api: API
  }
}
