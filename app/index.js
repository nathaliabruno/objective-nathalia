/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';

// ================================
// START YOUR APP HERE
// ================================

import { mountsPagination, getPaginationSize } from './utils';

function status (response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  function json (response) {
    return response.json()
  }


fetch('https://gateway.marvel.com/v1/public/characters?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&offset=0&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1')
    .then(status)
    .then(json)
    .then((data) => {
        let results = data.data

    })
    .catch((error) => console.log('Request failed', error))
