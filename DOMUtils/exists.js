/*--------------------------------------------------------*\
	Does the element exist yet?
\*--------------------------------------------------------*/

const exists = (element, checkpoint = false, callback) => {
	
	let count = 0
	var interval = setInterval(() => {
		
		let el = document.querySelector(element)
		let check = document.querySelector(checkpoint)

		if (!!el) {
			clearInterval(interval)
			return callback(false, el)
		} else if (!el && !!check) {
			clearInterval(interval)
			return callback(true)
		} else if (count >= 40) {
			clearInterval(interval)
		}
	}, 25)
}

export default exists