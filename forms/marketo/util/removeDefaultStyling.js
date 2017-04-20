/*--------------------------------------------------------*\
	Remove all default styling from Marketo forms.
\*--------------------------------------------------------*/

import els from 'els'
import _ from 'lodash'
import fastdom from 'fastdom'
import fastdomPromised from 'fastdom/extensions/fastdom-promised'
const fDOM = fastdom.extend(fastdomPromised)

function removeDefaultStyling(form) {
	const head = els.head
	const mutations = []

	let stylesheets = _.flatten([
		[...head.querySelectorAll('link[id^="mkto"]')],
		[...form.querySelectorAll('style')],
	])

	_.forEach(stylesheets, stylesheet => {
		mutations.push(
			fDOM.mutate(() => {
				if (stylesheet.parentNode.nodeName === 'HEAD') {
					head.removeChild(stylesheet)
				}

				else {
					form.removeChild(stylesheet)
				}
			})
		)
	})

	return Promise.all(mutations)
}

function removeInlineStyles(form) {
	let children = form.querySelectorAll('*')
	let allElements = [form, children]
	_.forEach(allElements, element => {
		element.style = ''
	})
}

export { removeDefaultStyling, removeInlineStyles }
