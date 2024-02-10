const year = 31556952;
const month = 2628288;
const week = 604800;
const day = 86400;
const hour = 3600;
const minute = 60;

function roundTime(value: number): [number, boolean] {
	return [Math.floor(value), Math.floor(value) >= 2];
}

function decide(seconds: number): [string, number, boolean] {
	if (seconds > year) {
		return ['year', ...roundTime(seconds / year)];
	} else if (seconds > month) {
		return ['month', ...roundTime(seconds / month)];
	} else if (seconds > week) {
		return ['week', ...roundTime(seconds / week)];
	} else if (seconds > day) {
		return ['day', ...roundTime(seconds / day)];
	} else if (seconds > hour) {
		return ['hour', ...roundTime(seconds / hour)];
	} else if (seconds > minute) {
		return ['minute', ...roundTime(seconds / minute)];
	} else {
		return ['second', ...roundTime(seconds)];
	}
}

/** Given a number of milliseconds since the Unix Epoch, returns a human-readable string that reads as a relative time.
 * For example: "x seconds ago" or "4 days from now".
 * */
export default function humanizeTime(milliseconds: number, future?: boolean): string {
	const delta = Date.now() - milliseconds;

	const [decision, count, isPlural] = decide(delta / 1000);

	return `${isPlural ? count : 'a'} ${decision}${isPlural ? 's' : ''}${
		future ? ' from now' : ' ago'
	}`;
}
