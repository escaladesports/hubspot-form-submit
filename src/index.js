import fetch from 'isomorphic-fetch'
import {stringify as queryString} from 'querystring'
import cookies from 'js-cookie'

async function hubspotFormSubmit (hubspotId, formId, data) {
  // Get hubspot cookie. Without it, form submission fails
  let hutk = cookies.get('hubspotutk')
  if (!hutk) {
    console.log('hubspotutk cookie not found')
    return false
  }

  //  If the data is an Element object, convert it to FormData
  if (data instanceof Element) {
    data = new FormData(data)
  }

  // If the the data is a FormData object, convert it to a plain Object
  if (data instanceof FormData) {
    let result = {}
    for (let entry of data.entries()) {
      result[entry[0]] = entry[1]
    }
    data = result
  }

  // If the the data is not a plain Object - fail
  if (typeof data !== 'object') {
    console.log('Input data must be an Element, FormData, or Object')
    return false
  }

  // Create querystring
  let pageName = document.querySelector('title')
  pageName = pageName ? pageName.textContent : ''
  data = {
    ...data,
    hs_context: JSON.stringify({
      hutk: hutk,
      pageUrl: window.location.href,
      pageName: pageName
    })
  }
  let formQueryString = queryString(data)

  // Send form
  let url = `https://forms.hubspot.com/uploads/form/v2/${hubspotId}/${formId}`
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': formQueryString.length
    },
    body: formQueryString
  }
  try {
    let res = await fetch(url, options)
    console.debug('Hubspot form submitted', res)
  } catch (err) {
    console.log(err)
  }

  return true
}

export default hubspotFormSubmit
