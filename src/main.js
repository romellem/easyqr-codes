import './polyfills/nodelist.foreach.js';
import './polyfills/object.assign.js';

import qrcodegen from './qrcodegen.js';
const { QrCode, QrSegment } = qrcodegen;

const $ = (selector, ele) => (ele ? ele.querySelector(selector) : document.querySelector(selector));

// Elements
const svg = $('#qrcode-svg');
const textarea_input = $('#textarea-input');

textarea_input.oninput = function onTextAreaChange(e) {
	redrawQrCode(textarea_input.value);
};

function redrawQrCode(text) {
	// Reset output images in case of early termination
	svg.style.display = 'none';

	// Get form inputs and compute QR Code
	const ecl = QrCode.Ecc.LOW;
	const segs = QrSegment.makeSegments(text);
	const minVer = 1;
	const maxVer = 40;
	const mask = -1;
	const boostEcc = true;
	const qr = QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
	const border = 0;

	const code = qr.toSvgString(border);

	const viewBox = / viewBox="([^"]*)"/.exec(code)[1];
	const pathD = / d="([^"]*)"/.exec(code)[1];
	svg.setAttribute('viewBox', viewBox);
	svg.querySelector('path').setAttribute('d', pathD);
	svg.style.display = '';
}

redrawQrCode('https://easyqr.codes/');
