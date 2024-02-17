// Module imports
import { BrowserWindow } from 'electron'





// Local imports
import { createWindow } from './createWindow.js'





/**
 * Executes when the application is activated.
 */
export function handleActivate() {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
}
