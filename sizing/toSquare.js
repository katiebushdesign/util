/*--------------------------------------------------------*\
	Transform div --> square
\*--------------------------------------------------------*/

import _parseInt from 'lodash.parseint'
import debounce from 'lodash.debounce'
import fastdom from 'fastdom'

const toSquare = (elements) => {
	fastdom.measure(() => {
		let width = _parseInt(window.getComputedStyle(elements[0]).width, 10)
		fastdom.mutate(() => {
			for (let el of elements) {
				el.style.height = width + 'px'
			}
		})
	})
}

export default ((elements) => {
	toSquare(elements)
	window.addEventListener('resize', debounce(() => toSquare(elements), 150))
}) 