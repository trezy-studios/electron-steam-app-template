/**
 * Executes when a window's web content has been created.
 *
 * @param {import('electron').BrowserWindow} window The window that owns the web contents.
 */
export function handleWebContentsCreated(_, window) {
	window.on('new-window', event => event.preventDefault())
	window.webContents.on('will-navigate', event => event.preventDefault())
}
