/*--------------------------------------------------------*\
	Async/Promised Script Loader/Injection

	TODO: I don't think I need the second optional empty
	object for defautl settings in the _.forEach paramater
\*--------------------------------------------------------*/

import els from 'els'
import _ from 'lodash'

function loadScript(scripts) {
	scripts = (typeof scripts === 'array') ? scripts : Array.from(arguments)
	let { head } = els
	let promises = []
	_.forEach(scripts, ({ src, type = 'text/javascript' } = {}) => {
		promises.push(
			new Promise((resolve, reject) => {
				let script = document.createElement('script')
				script.type = type
				script.src = src
				script.addEventListener('load', () => resolve(script))
				script.addEventListener('error', () => reject(script))
				head.appendChild(script)
			})
		)
	})

	return Promise.all(promises)
}

export default loadScript
