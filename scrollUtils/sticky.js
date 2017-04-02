/*--------------------------------------------------------*\
	Make Item Sticky
\*--------------------------------------------------------*/

import { els } from '../ref/els'
import _parseInt from 'lodash.parseint'
import fastdom from 'fastdom'

const fixSidebar = (element, elementLeft, headerHeight) => {
	fastdom.mutate(() => {
		element.style.position = 'fixed'
		element.style.top = headerHeight + 'px'
		element.style.left = elementLeft + 'px'
		element.style.bottom = ''
		element.style.zIndex = '500'
	})
}

const fixSidebarFooter = (element, footerHeight) => {
	fastdom.mutate(() => {
		element.style.top = ''
		element.style.bottom = footerHeight + 'px'
	})
}

const resetSidebar = (element) => {
	fastdom.mutate(() => {
		element.style.position = ''
		element.style.top = ''
		element.style.left = ''
		element.style.bottom = ''
	})
}

const sticky = (element) => {

	fastdom.measure(() => {

		let headerHeight = els.header.getBoundingClientRect().height
		let footerHeight = els.footer.getBoundingClientRect().height
		let footerTop = els.footer.getBoundingClientRect().top
		let elementRef = element.getBoundingClientRect()
		let dy = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
		let dyScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
		let dyElement = elementRef.top + dyScroll
		let elementLeft = elementRef.left
		let elementHeight = elementRef.height
		let wHeight = window.innerHeight

		// If sidebar is taller than the page, return false
		if ( elementHeight + headerHeight > wHeight ) {
			return false
		}

		// If loaded in middle of page, set sidebar coordinates
		if (dy >= dyElement) {
			fixSidebar(element, elementLeft, headerHeight)
		}
		
		// Set scroll listener
		window.addEventListener('scroll', () => {
			
			// Reset vars on scroll
			footerTop = els.footer.getBoundingClientRect().top
			dy = window.scrollY || window.pageYOffset || document.documentElement.scrollTop

			// Initial --> fix to header
			if (dy >= dyElement && (footerTop > headerHeight + elementHeight)) {
				fixSidebar(element, elementLeft, headerHeight)
			} 
		
			// Don't let it run into the footer
			else if (dy >= dyElement && (footerTop <= headerHeight + elementHeight)) {
				fixSidebarFooter(element, footerHeight)
			}
			
			// Reset on re-scroll up
			else {
				resetSidebar(element)
			}
		})
	})
}

export default sticky