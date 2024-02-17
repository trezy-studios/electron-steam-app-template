// Module imports
import { app } from 'electron'
import fs from 'node:fs/promises'
import path from 'node:path'





// Local imports
import packageData from '../../../package.json'





// Constants
const STORE_FILE_PATH = path.join(app.getPath('userData'), 'config.json')





/**
 * Updates the contents of the config file.
 *
 * @param {object} data Updated store data.
 */
export async function setStore(data) {
	let fileHandle = null

	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		fileHandle = await fs.open(STORE_FILE_PATH, 'w')
		await fileHandle.truncate()
		await fileHandle.write(Buffer.from(JSON.stringify(data), 'utf8'))
		await fileHandle.close()
	} catch (error) {
		if (fileHandle) {
			await fileHandle.close()
		}
	}
}

/**
 * Retrieves the value of the store file.
 *
 * @returns {Promise<object>} The full, parsed store object.
 */
export async function getStore() {
	let store = { version: packageData.version }
	let fileHandle = null

	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		fileHandle = await fs.open(STORE_FILE_PATH, 'r')
		const { buffer } = await fileHandle.read()

		const storeString = buffer
			.toString('utf8')
			// eslint-disable-next-line no-control-regex
			.replace(/\u0000/gu, '')

		store = JSON.parse(storeString)

		await fileHandle.close()
	} catch (error) {
		if (fileHandle) {
			await fileHandle.close()
		}

		await setStore(store)
	}

	try {
		return store
	} catch (error) {
		throw new Error('Store file has been corrupted.')
	}
}





/**
 * Manages a data store on disk.
 */
export class DiskStore {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#defaults = {}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new Store.
	 *
	 * @param {object} [options] All options.
	 * @param {{
	 * 	[key: string]: *,
	 * }} [options.defaults] Default values.
	 */
	constructor(options = {}) {
		const {
			defaults = {},
		} = options

		this.#defaults = defaults
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Deletes a value from the store.
	 *
	 * @param {string} key The config key the value will be set at.
	 */
	async delete(key) {
		const data = await getStore()

		delete data[key]

		await setStore(data)
	}

	/**
	 * Retrieves a value from the store.
	 *
	 * @param {string} [key] The key of the value to be retrieved.
	 * @returns {Promise<*>} The value at the requested key.
	 */
	async get(key) {
		const config = {
			...this.#defaults,
			...await getStore(),
		}

		if (key) {
			return config[key]
		}

		return config
	}

	/**
	 * Sets a value in the store.
	 *
	 * @param {string | object} keyOrPatch The config key the value will be set at.
	 * @param {*} [value] The value to be set.
	 */
	async set(keyOrPatch, value) {
		const data = await getStore()

		if (typeof keyOrPatch === 'string') {
			data[keyOrPatch] = value
		} else {
			Object.entries(keyOrPatch).forEach(([entryKey, entryValue]) => {
				data[entryKey] = entryValue
			})
		}

		await setStore(data)
	}
}
