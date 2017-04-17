/*--------------------------------------------------------*\
	Find closest element with classname
\*--------------------------------------------------------*/

export default function closest(el, parent) {
	let element = el
	while (element.nodeName !== 'HTML') {

		// Check if element has designated class
		if (element.classList.contains(parent)) return element
		
		// Once the loop reaches body, just return false
		if (element.nodeName === 'BODY') return false

		// Set element equal to parent element
		element = element.parentNode
	}
}
