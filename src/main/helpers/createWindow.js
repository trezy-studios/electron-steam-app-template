// Module imports
import {
	BrowserWindow,
	screen,
} from 'electron'
import path from 'path'





// Local imports
import { configStore } from './configStore.js'
import packageData from '../../../package.json'





/**
 * Creates a new window.
 */
export async function createWindow() {
	// Get the resolution of the current screen.
	const display = screen.getPrimaryDisplay()

	const backgroundColor = await configStore.get('settings::color::mainBackground')

	const mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		backgroundColor: backgroundColor ?? '#000000',
		height: display.workArea.height,
		show: false,
		title: packageData.productName,
		webPreferences: {
			backgroundThrottling: false,
			contextIsolation: true,
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js'),
			sandbox: true,
		},
		width: display.workArea.width,
		x: display.workArea.x,
		y: display.workArea.y,
	})

	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
	} else {
		mainWindow.loadFile(path.join(__dirname, '..', 'renderer', MAIN_WINDOW_VITE_NAME, 'index.html'))
	}

	mainWindow.once('ready-to-show', () => mainWindow.show())
}
