/*--------------------------------------------------------*\
	Module Loader
\*--------------------------------------------------------*/

import els from 'els'
import _ from 'lodash'

async function loader(module, name) {
	let { id, isLoaded } = module
	if (!!id && !isLoaded) {
		const moduleToLoad = await import(`modules/${name}/index`)
			.then(fx => {
				fx.default()
				els.modulesToLoad[name].isLoaded = true
			})
	}
}

export default async function modulesLoader() {
	let { modulesToLoad } = els
	_.forIn(modulesToLoad, loader)
}
