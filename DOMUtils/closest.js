/*--------------------------------------------------------*\
	Find closest element with classname
\*--------------------------------------------------------*/

const closest = (el, parent) => {
	let element = el
	while (element.nodeName !== 'HTML') {

		// Check if element has designated class
		if (element.classList.contains(parent)) return element

		// Set element equal to parent element
		element = element.parentNode
	}
}

export default closest