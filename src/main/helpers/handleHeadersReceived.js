// Module imports
import { app } from 'electron'





// Local imports
import { cspConfig } from './cspConfig.js'





/**
 * Executes when a web request receives headers.
 *
 * @param {*} details The details of the request.
 * @param {*} callback The callback to fired when we're finished fiddling with the response.
 */
export function handleHeadersReceived(details, callback) {
	const cspString = Object.entries(cspConfig).reduce((accumulator, [key, value], index) => {
		if (index !== 0) {
			accumulator += '; '
		}

		const compiledValue = value
			.map(item => {
				if (typeof item === 'string') {
					return item
				}

				if (app.isPackaged) {
					return item.production
				}

				return item.development
			})
			.filter(Boolean)
			.flat()
			.join(' ')

		if (compiledValue) {
			accumulator += `${key} ${compiledValue}`
		}

		return accumulator
	}, '')

	callback({
		responseHeaders: {
			...details.responseHeaders,
			'Content-Security-Policy': cspString,
		},
	})
}
