'use strict';

let userData = {};


function filter(str, rules = ['MATH', 'yahoo']) {

	rules = rules.map(rule => {
		return {
			regexp: new RegExp(`\\b${rule}\\b`, 'g'),
			length: rule.length
		};
	});

	rules.forEach((rule) => {
		str = str.replace(rule.regexp, (new Array(rule.length + 1)).join('*'))
	});

	return str;
}


function onLogin (form, block) {
	userData = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	jsLogin.hidden = true;
	jsChat.hidden = false;

	if (userData.user) {
		userData.user = filter(userData.user);
		jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
	}

	subscribe();
}

function createMessage (opts, isMy = false) {
	let message = document.createElement('div');
	let email = document.createElement('div');

	message.classList.add('chat__message');
	email.classList.add('chat__email');

	if (isMy) {
		message.classList.add('chat__message_my');
	} else {
		message.style.backgroundColor = `#${technolibs.colorHash(opts.email || '')}`;
	}
	message.innerHTML = opts.message;
	email.innerHTML = opts.email;
	message.appendChild(email);


	return message;
}

function onChat (form) {
	let data = {
		message: form.elements['message'].value,
		email: userData.email
	};

	let result = technolibs.request('/api/messages', data);
	form.reset();
}

function renderChat (items) {
	jsMessages.innerHTML = '';
	items.forEach(item => {
		let message = createMessage(item, item.email === userData.email);
		jsMessages.appendChild(message);
	});
	jsMessages.scrollTop = jsMessages.scrollHeight;
}

function subscribe () {
	technolibs.onMessage(data => {
		renderChat(Object.keys(data).map(key => data[key]));
	});
}

function hello(text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.filter = filter;
}