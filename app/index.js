/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';

// ================================
// START YOUR APP HERE
// ================================

import { mountsPagination, getPaginationSize, callApi, status, json } from './utils'
import mountsCharacter from './character'

var urlBase = 'https://gateway.marvel.com/v1/public/'
var publicKey = 'f804a6ba72e8f9e0aa1f02098a4d9760'
var hash = '798cc55b71bd99cdbb17ea46e4d9ecc4'
var ts = '1'
var limit = '10'
var characters = 'characters'



fetch(`${urlBase}${characters}?apikey=${publicKey}&limit=${limit}&hash=${hash}&ts=${ts}`)
    .then(status)
    .then(json)
    .then((data) => {
        if(data.data.results) {
            data.data.results.map( character => {
                mountsCharacter(character)
            })
        }

    })
    .catch((error) => console.log('Request failed', error))
