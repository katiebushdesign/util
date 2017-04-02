/*--------------------------------------------------------*\
	Conditionally Load Polyfills
\*--------------------------------------------------------*/

import browser from 'detect-browser'

const { name, version } = browser
const support = [
	{ 
		name: 'chrome', 
		version: 51, 
	},
	{ 
		name: 'opera', 
		version: 38,
	},
	{ 
		name: 'edge', 
		version: 14,
	},
	{ 
		name: 'safari', 
		version: 10,
	},
	{ 
		name: 'ios', 
		version: 10,
	},
	{ 
		name: 'firefox', 
		version: 52,
	},
]

function loadPolyfills() {

	if (!window.Promise) {
		window.Promise = require('es6-promise')
	}
	
	// Supported Browsers
	let supportedBrowsers = support.filter(function(browser) {
		let browserVersion = parseInt(version, 10)
		return browser.name === name && browser.version <= browserVersion
	})
	
	const classListPolyfill = () => new Promise((resolve) => {
		if ('classList' in document.createElement('_')) return resolve()

		require.ensure([], () => {
			require('classlist-polyfill')
			resolve()
		})
	})

	const babelPolyfill = () => new Promise((resolve) => {
		if (supportedBrowsers.length) return resolve()
		require.ensure([], () => {
			require('babel-polyfill')
			resolve()
		})
	})

	return Promise.all([classListPolyfill(), babelPolyfill()])
}

export default loadPolyfills
