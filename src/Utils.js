// Converts a number from one range to another
export function map(value, srcMin, srcMax, destMin, destMax, clamped = false) {
	let mappedValue = (value - srcMin) * (destMax - destMin) / (srcMax - srcMin) + destMin

	if (clamped) {
		return clamp(mappedValue, destMin, destMax)
	}

	return mappedValue
}

export function clamp(value, min, max) {
	if (value < min) {
		return min
	} else if (value > max) {
		return max
	}
	return value
}
