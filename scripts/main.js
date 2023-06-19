const letters = {
    A: ['△', '◬', 'Δ', 'Λ', '∆', '∧', '⚠'],
    a: ['α'],
    B: ['β'],
    b: ['ծ', 'δ', '♁'],
    C: ['∁', '☾'],
    c: ['Շ', 'ς', '⊂', '⊏'],
    D: ['◊'],
    d: ['Ժ', 'ժ', '₫'],
    E: ['ع', '₤', '€', 'ε', 'ξ', 'Σ', 'ㅌ', '∈', '∑'],
    e: ['ج'],
    F: ['₣', '⊧'],
    f: ['Բ'],
    G: ['☪'],
    g: ['Ց', 'ق', 'פ'],
    H: ['ㅐ', 'ㅒ'],
    h: ['ի', '♄'],
    I: ['∣'],
    i: ['آ', 'أ'],
    J: ['յ', 'ل'],
    j: ['ز', 'ذ'],
    K: [ '₭'],
    k: ['κ'],
    L: ['Ը', 'լ'],
    l: ['Ն', 'ւ'],
    M: ['⋈'],
    m: ['Պ', '₥'],
    N: ['խ', '₦', 'א'],
    n: ['Ո', 'դ', 'ղ', 'ռ', 'ր', 'Ռ', 'η', 'Π', 'π', 'ת', 'ה', 'ח', 'ת'],
    O: ['Ծ', 'Փ', '◎', '◯', 'θ', 'Θ', '∅'],
    o: ['○', '◦', 'φ', 'σ'],
    P: ['⚲'],
    p: ['թ', 'ք', 'م'],
    Q: ['⚼'],
    q: ['գ', 'ף'],
    R: ['Հ', '☈'],
    r: ['Ի', 'Ր'],
    S: ['ֆ'],
    s: ['Ֆ'],
    T: ['ך', '⊤', '⊺'],
    t: ['Ե', 'ե', 'Է', 'Ւ', 'τ'],
    U: ['Ա', 'Մ', 'մ', '∐', '∪', '⋃', '⋓'],
    u: ['Կ', 'ս', 'ن', 'ب', 'μ', '⊔'],
    V: ['▽', '∀', '∇', '√', '⊽'],
    v: ['▿', 'υ', 'ע'],
    W: ['₩', '⋓'],
    w: ['ա', 'ω', 'ש'],
    X: ['χ', '⋇', '⋈', '⋉', '⋊', '⋋', '⋌'],
    x: ['⋆', '⋇', '⋈', '⋉', '⋊', '⋋', '⋌'],
    Y: ['Ψ'],
    y: ['Վ', 'ψ', 'ץ', '⋎'],
    Z: ['շ', 'ζ', '⋛', '≧'],
    z: ['ջ', 'ㄹ', '≠', '≥'],
};

var deferredPrompt;

document.addEventListener('DOMContentLoaded', function(event){
	
	// Apply generator to the title
	document.getElementById('titleOutput').innerHTML = generator(document.getElementById('title').innerHTML);

	const params = new URLSearchParams(window.location.search)
	if (params.has('name')) {
		document.getElementById('name').value = params.get('name');
		generateFromTextBox();
	}

	document.getElementById('name').focus();

	// Add event listeners
	document.getElementById('name').addEventListener('keyup', function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			generateFromTextBox();
		}
	});
	
	document.getElementById('generate').addEventListener('click', function(event) {
		event.preventDefault();
		generateFromTextBox();
	});
});

// https://developers.google.com/web/ilt/pwa/lab-offline-quickstart#52_activating_the_install_prompt
window.addEventListener('beforeinstallprompt', (event) => {

	// Prevent Chrome 67 and earlier from automatically showing the prompt
	event.preventDefault();

	// Stash the event so it can be triggered later.
	deferredPrompt = event;

	// Attach the install prompt to a user gesture
	document.getElementById('install').addEventListener('click', (event) => {

		// Show the prompt
		deferredPrompt.prompt();

		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			}
			else {
				console.log('User dismissed the A2HS prompt');
			}
			deferredPrompt = null;
		});
	});

	document.getElementById('install').setAttribute('aria-hidden', false);
});

// When the app is installed it should remove the install snackbar
window.addEventListener('appinstalled', (event) => {
	console.log('a2hs installed');
	document.getElementById('install').setAttribute('aria-hidden', true);
});

function generator(s) {
	// Trim the input
	s = s.trim();

	var r = ''
	for (var i = 0; i < s.length; i++) {
		// Character
		var c = s.charAt(i);
		
		if (letters[c]) {
			const b = randomFromArrays(letters[c]);
			r += `<p>${b}</p>`;
		} else if (c === ' ') {
			r += '<p>&nbsp;</p>';
		} else {
			r += c;
		}
	}
	
	return r;
}

function random(n) {
	return n[Math.floor(Math.random() * (n.length))];
}

function randomFromArrays(...names) {
	return random([].concat(...names));
}

function generateFromTextBox() {
	document.getElementById('nameOutput').innerHTML = generator(document.getElementById('name').value);
}