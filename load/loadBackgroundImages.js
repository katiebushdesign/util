/*--------------------------------------------------------*\
	Lazy Load Background Images
\*--------------------------------------------------------*/

import els from 'els'
import _ from 'lodash'
import fastdom from 'fastdom'
import fastdomPromised from 'fastdom/extensions/fastdom-promised'
const fDOM = fastdom.extend(fastdomPromised)


// use object fit as an image if it's supported
// then i can also download by size!!

function animationCallback(block) {
	let { id, parentNode } = block
	if (!browser.name === 'ie' || !browser.version.indexOf('11') > -1) {
		if (id === 'block--content__1' && parentNode.classList.contains('wrapper--home')) {
			let speed = document.getElementById('path--speed')
			let matters = document.getElementById('path--matters')
			speed.classList.add('path--active')
			speed.addEventListener('transitionend', () => matters.classList.add('path--active'))
		}
	}
}

export default function loadBackgrounds(callback) {
	let blocksWithBG = els.lazyload.backgroundImages

	_.forEach(blocksWithBG, block => {
		let { src } = block.dataset
		let imageElement = document.createElement('img')
		imageElement.classList.add('container--bgImage')
		let image = new Image()

		image.addEventListener('error', () => console.error('ERROR'))
		image.addEventListener('load', function() {
			imageElement.src = src
			block.appendChild(imageElement)
			imageElement.classList.add('fadeIn')

			if (window.matchMedia('(min-width: 40em)')) {
				animationCallback(block)
			}
		})

		image.src = src
	})
}