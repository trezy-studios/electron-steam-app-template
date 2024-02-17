// Module imports
import {
	app,
	ipcMain,
} from 'electron'





// Local imports
import { handleActivate } from './helpers/handleActivate.js'
import { handleAllWindowsClosed } from './helpers/handleAllWindowsClosed.js'
import { handleGetConfig } from './helpers/handleGetConfig.js'
import { handleSetConfig } from './helpers/handleSetConfig.js'
import { handleWindowReady } from './helpers/handleWindowReady.js'





// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit()
}





app.on('ready', handleWindowReady)
app.on('window-all-closed', handleAllWindowsClosed)
app.on('activate', handleActivate)

ipcMain.handle('getConfig', handleGetConfig)
ipcMain.handle('setConfig', handleSetConfig)
