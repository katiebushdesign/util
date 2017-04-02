/*--------------------------------------------------------*\
	* listener *
	------------

	if node collection is passed will return an event
	listener for each node, otherwise it will just return
	a singular event listener
\*--------------------------------------------------------*/

const listener = (items, type, callback) => {
	if (typeof items === 'object') {
		return (() => {
			for (let item of items) {
				item.addEventListener(type, callback)
			}
		})()
	}
	return item.addEventListener(type, callback)
}

export default listener