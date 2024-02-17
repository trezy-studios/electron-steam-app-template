// Module imports
import installExtension, {
	REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'
import { session } from 'electron'





// Local imports
import { createWindow } from './createWindow.js'
import { handleHeadersReceived } from './handleHeadersReceived.js'





/**
 * Executes when the window is ready.
 */
export async function handleWindowReady() {
	session.defaultSession.webRequest.onHeadersReceived(handleHeadersReceived)

	await createWindow()

	// React Dev Tools
	installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => console.log('Added Extension:', name))
		.catch(error => console.log('An error occurred: ', error))

	// Pixi.js Dev Tools
	installExtension('aamddddknhcagpehecnhphigffljadon')
		.then(name => console.log('Added Extension:', name))
		.catch(error => console.log('An error occurred: ', error))
}
