const load = async(index) => {
	const res = await fetch('./frames1/f'+index+'.txt')
	if(res.status===200) {
		txts[index] = await res.text();
		return txts[index];
	}
	throw new Error('Responded with status '+res.status);
}

let lastIndex = 0;
const len = 59;
const txts = [];
let pre;

const renderFrame = (index) => {
	let txt = txts[index];
	pre.innerText = txt;
}

const render = () => {
	const newIndex = Math.min(59, Math.max(1, 1+Math.floor(58 * window.scrollY / window.innerHeight)))
	if(newIndex !== lastIndex) {
		if(txts[newIndex]) {
			lastIndex = newIndex;
			renderFrame(newIndex);
		}
	}
	setTimeout(render, 20);
}


document.addEventListener('DOMContentLoaded', async() => {
	pre = document.querySelector('pre');
	const rat = window.innerWidth / window.innerHeight;
	if(rat > 1.98) {
		pre.style.fontSize = (window.innerWidth * 1440 / 865 / 297) + 'px';
	} else {
		pre.style.fontSize = (window.innerHeight / 80) + 'px';
	}
	pre.style.lineHeight = '1em';
	const txt = await load(1);
	render();
	document.getElementById('toggle').addEventListener('click', () => {
		document.body.classList.toggle('toggle');
	})
	for(let i=2; i<60; i+=5) {
		const promises = [];
		for(let j=i; j<i+5 && j<60; j++) {
			promises.push(load(j));
		}
		await Promise.all(promises);
	}
})
