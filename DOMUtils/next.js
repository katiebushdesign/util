/*--------------------------------------------------------*\
	* next *
	--------

	Traverses nextElementSibling until target element 
	is found.
\*--------------------------------------------------------*/

const next = (element, name) => {

	// get the next element
	let nextElement = element.nextElementSibling

	// if it is a block, return that block,
	// else run function again
	return nextElement.classList.contains(name)
		? nextElement
		: next(nextElement, name)
}

export default next