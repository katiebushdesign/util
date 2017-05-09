/*--------------------------------------------------------*\
	Permutations
\*--------------------------------------------------------*/

// Concat all values of filters to string
const permute = (arrays) => {
	let result = []
	let max = arrays.length - 1

	// Iterate through arrays until last array is reached
	function iterate(arr, i) {
		arrays[i].forEach((el, j) => {

			// Clone the incoming array
			let clone = arr.slice(0)

			// Push each element onto the clone
			clone.push(arrays[i][j])

			// Recusively call the iteration until all arrays have been iterated
			if (i == max) {
				result.push( clone ) 
			} else {
				iterate(clone, i + 1)
			}
		})
	}

	iterate([], 0)
	return result
}

export default permute