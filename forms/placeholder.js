/*--------------------------------------------------------*\

	* placeholder *
	---------------

	removes the labels from each input, select, 
	and textarea, then inserts them as placeholders,
	or, in the case of <select>, the first option in
	the list.

\*--------------------------------------------------------*/

import fastdom from 'fastdom'

function placeholder(labels) {

	for (let label of labels) {
		let input = label.parentNode.querySelector('input') || label.parentNode.querySelector('textarea')
		let select = label.parentNode.querySelector('select')
		let checkbox = label.parentNode.querySelector('.mktoCheckboxList')

		fastdom.measure(() => {
			let labelText = label.textContent
			fastdom.mutate(() => {

				// if is input or textarea
				if (input !== null && checkbox == null) {
					label.style.display = 'none'
					input.setAttribute('placeholder', labelText)
				}
				
				// if is select box
				else if (select !== null) {
					label.style.display = 'none'
					select.firstChild.textContent = labelText
				}
			})
		})
	}
}

module.exports = placeholder