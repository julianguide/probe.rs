import type { Signal } from '@preact/signals';

type Props = {
	targets: Object[],
	manufacturers: string[],
};

export default function TargetsView({targets, manufacturers}: Props) {
	const clicked = () => {
		console.log('heyyy', targets)
	};
	
	function getJep106Manufacturer(cc: number, id: number) {
		return manufacturers[cc * 256 + id];
	};

	const uniqueMans = [...new Set(manufacturers)].sort();

	return (
		<div class="prose">
			<h1>hi!</h1>
			<button onClick={clicked}>click meee</button>
			<p>Loaded {targets.length} targets and {uniqueMans.length} unique manufacturers.</p>
			<div>
				<h2>Manufacturer</h2>
				<ul>
					{uniqueMans.map(m => <li>{m}</li>)}
				</ul>
			</div>
		</div>
	);
}