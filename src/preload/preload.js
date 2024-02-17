// Module imports
import {
	contextBridge,
	ipcRenderer,
} from 'electron'





contextBridge.exposeInMainWorld('IPCBridge', {
	/**
	 * Gets a config value from disk.
	 *
	 * @param {string} key The config key to be retrieved.
	 * @returns {Promise<*>} The value of the config.
	 */
	getConfig: key => ipcRenderer.invoke('getConfig', key),

	/**
	 * Persists a config value to disk.
	 *
	 * @param {string} key The config key to be set.
	 * @param {*} value The new config value.
	 */
	setConfig: (key, value) => {
		ipcRenderer.invoke('setConfig', key, value)
	},
})
