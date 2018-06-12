# hubspot-form-submit

A promise-based function for submitting data to Hubspot.

## Installation

With Yarn:

```bash
yarn add hubspot-form-submit
```

With npm:

```bash
npm install --save hubspot-form-submit
```

## Usage

Send along your HubSpot ID, the HubSpot form ID, and the form data. The form data can either be the form element, a FormData object, or just a regular object.

With ES6:

```javascript
import hubspotSubmit from 'hubspot-form-submit'

...

const submitted = await hubspotSubmit('your-hubspot-id', 'hubspot-form-id', {
	email: 'user-email@gmail.com',
	message: 'User information...',
})
if(submitted){
	console.log('Done!')
}
```

With ES5:

```javascript
var hubspotSubmit = require('hubspot-form-submit')

hubspotSubmit('your-hubspot-id', 'hubspot-form-id', {
		email: 'user-email@gmail.com',
		message: 'User information...',
	})
	.then(function(sent){
		if(sent){
			console.log('Done!')
		}
	})
	.catch(function(err){
		console.error(err)
	})
```

With browser:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
<script src='https://hubspot-form-submit-v1.netlify.com/index.js'></script>
<script>
	var form = document.querySelector('form')
	form.addEventListener('submit', function(e){
		e.preventDefault()
		hubspotSubmit('your-hubspot-id', 'hubspot-form-id', form)
			.then(function(sent){
				if(sent){
					console.log('Done!')
				}
			})
			.catch(function(err){
				console.error(err)
			})
	})
</script>
```

Contributors:

Alon Diamant (https://www.github.com/advance512) for Selectom (https://www.github.com/selectom)