/*--------------------------------------------------------*\

	* placeholder *
	---------------

	removes the labels from each input, select,
	and textarea, then inserts them as placeholders,
	or, in the case of <select>, the first option in
	the list.

	**TODO**: I need to check for all different types of form elements:
	that is, checkboxes, radio, button, text, email, select...
	and then perform different actions depending on the element.

\*--------------------------------------------------------*/

import _ from 'lodash'
import fastdom from 'fastdom'
import fastdomPromised from 'fastdom/extensions/fastdom-promised'
const fDOM = fastdom.extend(fastdomPromised)

function placeholder(form) {
	let mutations = []
	let labels = form.querySelectorAll('label')

	_.forEach(labels, label => {
		let parent = label.parentNode
		let input = parent.getElementsByTagName('input')[0] ||
					parent.getElementsByTagName('checkbox')[0] ||
					parent.getElementsByTagName('select')[0]
		let labelText = label.textContent

		mutations.push(fDOM.mutate(() => {

			if (input.nodeName === 'select') {
				select.firstChild.textContent = labelText
			}

			else {
				input.placeholder = labelText
			}
		}))
	})

	return Promise.all(mutations)
}

export default placeholder
