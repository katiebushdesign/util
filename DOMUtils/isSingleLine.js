/*--------------------------------------------------------*\
	Are the elements on a single line?
\*--------------------------------------------------------*/

import _filter from 'lodash.filter'
import fastdom from 'fastdom'

const isSingleLine = (container) => {
	let children = container.children
	let offsets = []
	
	// If other classes exist that actually have no "real" children, just abandon ship.
	if (children.length <= 1) {
		return false
	}

	// How far is each child from the top?
	for (let child of children) {
		const top = child.getBoundingClientRect().top
		offsets.push(top)
	}

	// Filter each elements comparitively to the first, +/- 12 for some wiggle room
	let filter = _filter(offsets, (el) => {
		if (el <= offsets[0] + 12 && el >= offsets[0] - 12) return el
	})

	// Remove class just in case of responsiveness
	if (filter.length === offsets.length) {
		container.classList.remove('elementsOffset')
		return false
	}

	// Add Class
	container.classList.add('elementsOffset')
}

export default isSingleLine