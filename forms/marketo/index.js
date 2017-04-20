/*--------------------------------------------------------*\
	Loop through marketo forms
\*--------------------------------------------------------*/

import els from 'els'
import _ from 'lodash'
import { loadScript } from 'util'
import { removeDefaultStyling, removeInlineStyles } from './util'
import { placeholder } from '../util'
import fastdom from 'fastdom'
import fastdomPromised from 'fastdom/extensions/fastdom-promised'
const fDOM = fastdom.extend(fastdomPromised)

async function processForm(marketoFormObject) {
	let form = document.getElementById(`mktoForm_${marketoFormObject.getId()}`)
	let removeFormStyling = await removeDefaultStyling(form)
	let resetBaseStyles = removeInlineStyles(form)
	let applyPlaceholders = await placeholder(form)
}

function loadForm() {

	// Get Form ID
	let id = this.getAttribute('id').split('_')[1]

	// Load Form
	MktoForms2.loadForm('//app-lon05.marketo.com', '523-RUV-145', id)
	MktoForms2.whenReady(processForm)
}

function loadForms(forms, callback) {
	_.forEach(forms, form => loadForm.call(form))
}

async function init() {
	let { head } = els
	let { forms, script, isLoaded } = els.marketo
	if (forms.length) {
		if (!isLoaded.script) {
			let marketoScript = await loadScript(script)
				.then(script => isLoaded.script = true)
				.catch(error => console.log(`There was an error loading ${script} // Error: ${error}.`))
		}

		loadForms(forms)
	}
}

export default init
