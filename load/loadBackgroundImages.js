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


export default function loadBackgrounds() {
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
		})

		image.src = src
	})
}