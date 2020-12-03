// Converts a number from one range to another
export function map(value, srcMin, srcMax, destMin, destMax, clamp = false) {
	let mappedValue = (value - srcMin) * (destMax - destMin) / (srcMax - srcMin) + destMin

	if (clamp) {
		if (mappedValue < destMin) {
			mappedValue = destMin
		} else if (mappedValue > destMax) {
			mappedValue = destMax
		}
	}

	return mappedValue
}
