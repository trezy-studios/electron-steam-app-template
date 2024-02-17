// Module imports
import { app } from 'electron'





/**
 * Executes when all windows are closed.
 */
export function handleAllWindowsClosed() {
	if (process.platform !== 'darwin') {
		app.quit()
	}
}
