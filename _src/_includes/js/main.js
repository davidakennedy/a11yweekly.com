/**
 * File: main.js.
 *
 * Main theme JavaScript file with functions meant to run on every page.
 */
( function() {
  (function(html) {
    html.className = html.className.replace(/\bno-js\b/, 'js')
  })(document.documentElement);

  /**
	 * skip-link-focus-fix js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}

	/**
	 * Generate an alert component based on the passed state key
	 * @param  {String} state must be 'error' or 'success'
	 * @return {String} A HTML string of the component output
	 * @see https://piccalil.li/tutorial/solution-001-email-sign-up-form/
	 */
	const renderAlert = (state = 'error') => {
		const iconPaths = {
		error:
			'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
		success:
			'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
		};
	
		const messages = {
		error: '<strong>Please use a valid email.</strong> Like: name@example.com.',
		success: '<strong>Thanks for signing up!</strong> We’ve sent a confirmation link to your inbox.',
		};
	
		return `
		<figure id="alert" class="alert" data-state="${state}">
		<svg class="alert-icon feather" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			${iconPaths[state]}
		</svg>
		<p class="alert-content">${messages[state]}</p>
		</figure>
		`;
	};

	/**
	 * Main app function. Grabs signup elements and validates email
	 * with regex and blocks submission and renders alert if it fails.
	 * If successful, it’ll allow the form to progress.
	 */
	const init = () => {
		const emailElement = document.querySelector('#email');
		const formElement = document.querySelector('#signup-form');
		const alertElement = document.querySelector('[role="alert"]');
		const validationRegex = new RegExp(
		emailElement.getAttribute('pattern') || '[^@]+@[^.]+..+',
		'i'
		);
	
		emailElement.removeAttribute('required');
		emailElement.removeAttribute('pattern');
		emailElement.setAttribute('aria-describedby', 'alert');
		formElement.setAttribute('novalidate', '');
	
		formElement.addEventListener('submit', (evt) => {
		evt.preventDefault();
	
		if (!validationRegex.test(emailElement.value.trim())) {
			alertElement.innerHTML = renderAlert('error');
			emailElement.setAttribute('aria-invalid', 'true');
			return;
		}
	
		// POST YOUR FORM WITH AJAX OR WHATNOT THEN RUN THIS
		formElement.parentElement.removeChild(formElement);
		alertElement.innerHTML = renderAlert('success');
		alertElement.setAttribute('tabindex', '-1');
		alertElement.focus();
		});
	};

	init();
} )();
