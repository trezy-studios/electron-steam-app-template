// Local imports
import { configStore } from './configStore.js'





/**
 * Updates user settings on disk.
 *
 * @param {*} _
 * @param {string} key The config key to be updated.
 * @param {string} value The new value.
 */
export function handleSetConfig(_, key, value) {
	configStore.set(key, value)
}
