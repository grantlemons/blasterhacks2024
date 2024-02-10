<script lang="ts">
	export let values: number[]  = [];
	export let max: number[]  = []; 
	export let size: string = "256px";

	function randColor() {
		let r = Math.floor(Math.random() * 255) + 1;
		let g = Math.floor(Math.random() * 255) + 1;
		let b = Math.floor(Math.random() * 255) + 1;
		return `rgb(${r} ${g} ${b})`
	}

	let colors = [{
			fg: 'stroke-primary-300 dark:stroke-primary-500',
			bg: 'stroke-primary-600 dark:stroke-primary-900',
		},{
			fg: 'stroke-secondary-300 dark:stroke-secondary-500',
			bg: 'stroke-secondary-600 dark:stroke-secondary-900',
		},{
			fg: 'stroke-tertiary-300 dark:stroke-tertiary-500',
			bg: 'stroke-tertiary-600 dark:stroke-tertiary-900',
		},{
			fg: 'stroke-quaternary-300 dark:stroke-quaternary-500',
			bg: 'stroke-quaternary-600 dark:stroke-quaternary-900',
		}];
</script>

<svg viewBox={`0 0 37 37`} style={`width: ${size}; height: ${size};`}>
{#each values as value, i}	
	<circle 
		class={["ring", colors[i].bg].join(" ")}
		style={`transform: scale(${1-0.25*(i)});`} 
		cx="50%" 
		cy="50%" 
		r="15.915" 
		stroke-width={3/(1-0.25*(i))}
		stroke={randColor()}
	/>
	<circle 
		class={["ring", colors[i].fg].join(" ")}
		style={`transform: scale(${1-0.25*(i)});`} 
		cx="50%" 
		cy="50%" 
		r="15.915" 
		stroke-width={3/(1-0.25*(i))}
		stroke-dasharray={`${(value/max[i])*100}, 100`}
		stroke={randColor()}
	/>
{/each}
</svg>

<style>
svg {
	transform: rotate(-90deg);
	stroke-linecap: round;
}
.ring {
	transform-origin: 50%;
	fill: none;
}
</style>
