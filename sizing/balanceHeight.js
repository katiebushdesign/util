/*--------------------------------------------------------*\
	Set all elements to mirror the tallest element. 
	Loops through children to mitigate compunding 
	resizing height issues.
\*--------------------------------------------------------*/

import _parseInt from 'lodash.parseint'
import _reduce from 'lodash/reduce.js'

const balanceHeight = (items, callback) => {
	
	// Which one is the tallest?
	let height = 0

	for (let item of items) {

		// Set element height to 0
		let itemHeight = {
			full: 0,
			padding: 0,
			childrenHeight: 0,
		}

		// Add padding from the main element
		itemHeight.padding =
			_parseInt( window.getComputedStyle(item).paddingTop, 10 ) +
			_parseInt( window.getComputedStyle(item).paddingBottom, 10 )

		// Add Height of children
		for (let child of item.children) {
			if ( window.getComputedStyle(child).position != 'absolute' ) {

				// Main Height
				itemHeight.childrenHeight += child.clientHeight

				// Child Margin
				itemHeight.childrenHeight += _parseInt( window.getComputedStyle(child).marginTop, 10 )
				itemHeight.childrenHeight += _parseInt( window.getComputedStyle(child).marginBottom, 10 )
			}
		}
		
		itemHeight.full = itemHeight.padding + itemHeight.childrenHeight
		if (itemHeight.full > height) height = itemHeight.full
		// console.log(itemHeight)
	}
	
	for (let item of items) {
		item.style.height = height + 'px'
	}
	

	if (!!callback && typeof(callback) === 'function') {
		callback()
	}
}

export default balanceHeight