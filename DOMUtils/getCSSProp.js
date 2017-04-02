/*--------------------------------------------------------*\
	Get CSS Properties
\*--------------------------------------------------------*/

import fastdom from 'fastdom' // 'fastdom/fastdom-strict.js'
import Promise from 'bluebird'
import _parseInt from 'lodash.parseint'


// dot notation? ==> prop.split('.').reduce((o, i) => o[i], obj) or _.get()

function getCSSProp(element, ...props) {

	// define global object for vars
	let global = {}
		
	// main
	init()

	function init() {

		// get node type
		global.type = element.nodeName
		global.style = window.getComputedStyle(element)

		// if node type is of type image, wait until image is loaded into the dom
		if (global.type === 'IMG') {
			element.onload = () => {
				global.rect = element.getBoundingClientRect()
				global.props = props
					.map((prop) => getProp(prop))
					.reduce((obj, prop) => {
						let key = Object.keys(prop)
						obj[key] = prop[key]
						return obj
					}, {})
			}
		}

		else {
			global.rect = element.getBoundingClientRect()
			global.props = props
				.map((prop) => getProp(prop))
				.reduce((obj, prop) => {
					let key = Object.keys(prop)
					obj[key] = prop[key]
					return obj
				}, {})
		}
	}
	
	function getProp(prop) {
		if (prop === 'width') {
			return { width: getWidth(prop) }
		}

		else if (prop === 'height') {
			return { height: getHeight(prop) }
		}

		else if (typeof prop === 'object') {
			let [p, descriptor, root] = prop

			if (p === 'offset') {
				// change this object key to be more descriptive
				return { [p]: getOffset(p, descriptor, root) }
			}

			else {
				return { [p]: getValue(p, descriptor) }
			}
		}

		else {
			return { [prop]: getValue(prop) }
		}
	}

	function getWidth(prop) {
		if (global.type === 'IMG') {
			if (prop === 'naturalWidth') {
				return element.naturalWidth
			}

			else {
				return element.clientWidth
			}
		}

		else {
			return global.rect.width
		}
	}

	function getHeight(prop) {
		if (global.type === 'IMG') {
			if (prop === 'naturalWidth') {
				return element.naturalHeight
			}

			else {
				return element.clientHeight
			}
		}

		else {
			return global.rect.height
		}
	}

	function getValue(prop, descriptor) {
		if (descriptor !== undefined) {
			if (descriptor === 'vertical') {
				return _parseInt(global.style[`${prop}-top`], 10) + _parseInt(global.style[`${prop}-bottom`], 10)
			}

			else if (descriptor === 'horizontal') {
				return _parseInt(global.style[`${prop}-left`], 10) + _parseInt(global.style[`${prop}-right`], 10)
			}
		}
		
		else {
			let returnedStyle = global.style[prop]

			// if the style is a number, parse it
			if (returnedStyle.indexOf('px') > -1) {
				return _parseInt(returnedStyle, 10)
			}

			else {
				return returnedStyle
			}
		}
	}

	function getOffset(prop, descriptor, root) {
		if (root !== undefined) {
			
			// i need to change these because top return 'top' (from viewport)
			if (descriptor === 'top') {
				return global.rect.top
			}

			else if (descriptor === 'left') {
				return global.rect.left
			}

			else if (descriptor === 'right') {
				let windowWidth = window.innerWidth
				let elementWidth = getWidth()
				let elementLeft = global.rect.left
				return windowWidth - elementWidth - elementLeft
			}

			else if (descriptor === 'bottom') {
				let windowHeight = window.innerHeight
				let elementHeight = getHeight()
				let elementTop = global.rect.top
				return windowHeight - elementHeight - elementTop
			}

			else {
				throw new Error(`${descriptor} is not a valid argument.`)
			}
		}

		else {
			if (descriptor === 'top') {
				return element.offsetTop
			}

			else if (descriptor === 'left') {
				return element.offsetLeft
			}

			else {
				throw new Error(`'${descriptor}' is not an allowable offset value.`)
			}
		}
	}
	
	// TODO: debug
	// if (debug) {
	// 	// if (element.toString() === '[object HTMLCollection]') {}
	// 	console.log(element + '\n' + element.nodeName)
	// }

	// let obj = global.props.reduce((obj, item) => {
	// 	let key = Object.keys(item)
	// 	obj[key] = item[key]
	// 	return obj
	// }, {})
	
	// if only one prop is passed, do not return an object
	if (Object.keys(global.props).length === 1) {
		return global.props[Object.keys(global.props)]
	}	
	return global.props
}


export default getCSSProp

