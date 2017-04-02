/*--------------------------------------------------------*\
	Scroll to a given location
\*--------------------------------------------------------*/

import els from 'els'
import fastdom from 'fastdom'
import getOffset from 'document-offset'

Math.easeInOutQuad = function(t, b, c, d) {
	t /= d / 2
	if (t < 1) {
		return (c / 2 * t * t + b)
	}
	t--
	return - c / 2 * ( t * (t - 2) - 1 ) + b
}

function getCurrentPosition() {
	return document.documentElement.scrollTop || 
		   document.body.parentNode.scrollTop || 
		   document.body.scrollTop
}

function runScroll(amount) {
	document.documentElement.scrollTop = amount
	document.body.parentNode.scrollTop = amount
	document.body.scrollTop = amount
}

function getDeltaY(section) {
	let { top: destination } = getOffset(section)
	let { height: headerHeight } = els.header
	let currentPosition = getCurrentPosition()
	let dy = destination - currentPosition - headerHeight
	return { currentPosition, dy }
}

function scrollTo(section, duration = 1000, cb = null) {
	let { currentPosition, dy } = getDeltaY(section)	
	let currentTime = 0
	duration = !duration ? 500 : duration

	function animateScroll() {
		let incrementY = Math.easeInOutQuad(currentTime, currentPosition, dy, duration)
		currentTime += 20
		runScroll(incrementY)

		if (currentTime < duration) {
			window.requestAnimationFrame(animateScroll)
		} 

		else {
			if (!!cb && typeof(cb) == 'function') {
				return cb()
			}
		}
	}

	return animateScroll(currentTime, currentPosition, dy, duration)
}

export default scrollTo
