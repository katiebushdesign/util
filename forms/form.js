/*--------------------------------------------------------*\
	Parse and Style Marketo Forms
\*--------------------------------------------------------*/

import $ from 'jquery'
import placeholder from '../util/placeholder'
import { els } from '../ref/els'
import exists from '../util/exists'
import fastdom from 'fastdom'

// If marketo inserts a style tag directly after the script, remove that element
const removeBareStyles = (element) => {
	let next = element.nextElementSibling
	
	if (next !== null) {
		if (next.nodeName == 'STYLE') {
			fastdom.mutate(() => {
				next.parentNode.removeChild(next)
			})
		} 
		
		// If next element is closing head tag, return, otherwise run it again on the next node
		else {
			if (next.nodeName == 'HEAD') return false
			return removeBareStyles(next)
		}
	}
}

// Remove marketo inserted stylesheets
const removeStyleSheets = (element) => {
	let stylesheets = $('link[id^="mkto"]')
	for (let stylesheet of stylesheets) {
		fastdom.mutate(() => {
			els.head.removeChild(stylesheet)
		})
	}
}

// Remove styles inserted inside marketo form
const removeInnerStyles = (form) => {
	let styles = form.querySelectorAll('style')
	for (style of styles) {
		fastdom.mutate(() => {
			form.removeChild(style)
		})
	}
}

// Do not accept non-corporate email domains.
const emailFilter = (mktoForm) => {

	// Accepted emails and domains
	var invalidDomains = ["ymail.com", "yopmail.com", "gmail.com", "hotmail.com", "yahoo.com", "aol.com", "msn.com", "comcast.net", "sbcglobal.net", "yahoo.co.in", "yahoo.co.fr", "me.com", "yahoo.co.uk", "live.com", "outlook.com", "trbvm.com", "web.de", "mailinator.com", "protonmail.com"]

	function validation() {
		let val = this.value || mktoForm.getFormElem()[0].querySelector('#Email').value
		let domain = val.split('@')[1]
		if (!!domain && invalidDomains.indexOf(domain) > -1) {
			let error = 'Please use a company email address (eg. @gmail.com, @yahoo.com, and @hotmail.com are all invalid domains.)'
			mktoForm.submittable(false)
			let el = mktoForm.getFormElem().find('#Email')
			mktoForm.showErrorMessage(error, el)
		} else {
			mktoForm.submittable(true)
		}
	}

	mktoForm
		.getFormElem()[0].querySelector('#Email')
		.addEventListener('blur', validation)
	
	mktoForm.onValidate(function() {
		let vals = mktoForm.vals()
		let val = vals.Email
		let domain = val.split('@')[1]
		if (!!domain && invalidDomains.indexOf(domain) > -1) {
			let error = 'Please use a company email address (eg. @gmail.com, @yahoo.com, and @hotmail.com are all invalid domains.)'
			mktoForm.submittable(false)
			let el = mktoForm.getFormElem().find('#Email')
			mktoForm.showErrorMessage(error, el)
		} else {
			mktoForm.submittable(true)
		}
	})
}

// Run associated marketo setup scripts
const processForm = (mktoForm) => {
	
	// No emails from ghosts!
	emailFilter(mktoForm)

	// Remove marketo styling
	let formNode = document.getElementById(`mktoForm_${mktoForm.getId()}`)
	removeStyleSheets(els.marketoScript)
	removeInnerStyles(formNode)
	removeBareStyles(els.marketoScript)

	// Run placeholder script
	let labels = formNode.querySelectorAll('.mktoLabel')
	placeholder(labels)

	// conditional marketo stuff
	exists('label[for="Partner_Terms_and_Conditions__c"]', '.mktoHasWidth', (err, el) => {

		// if form does not have element, just return and continue
		if (err) return false

		let p = document.createElement('p')
		let a = document.createElement('a')

		fastdom.mutate(() => {
			a.textContent = 'Platform9 Channel Partner Terms and Conditions'
			a.setAttribute('href', '/platform9-channel-partner-terms-conditions')
			a.setAttribute('target', '_blank')
			p.appendChild(a)
			let parent = el.parentNode
			parent.insertBefore(p, parent.firstChild)
		})
	})

	exists('input[name="Landing_Page_URL__c"]', '.mktoHasWidth', (err, el) => {

		// if form does not have element, just return and continue
		if (err) return false

		el.setAttribute('value', location.href)
	})
}

module.exports = processForm