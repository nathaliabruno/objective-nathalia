/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';

// ================================
// START YOUR APP HERE
// ================================

import { mountsPagination, getPaginationSize, callApi, status, json } from './utils';

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
            data.data.results.map( (character, index) => {
                let li = document.createElement('li')
                li.setAttribute('id', `id_${character.id}`)
                li.setAttribute('class', 'content-results-list-item')

                let firstColumn = document.createElement('div')
                firstColumn.setAttribute('class', 'first-column')
                let secondColumn = document.createElement('div')
                secondColumn.setAttribute('class', 'second-column')
                let thirdColumn = document.createElement('div')
                thirdColumn.setAttribute('class', 'third-column')

                let image = document.createElement('img')
                image.setAttribute('src', `${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`)
                image.setAttribute('class', 'content-results-list-item-image')

                let name = document.createElement('h4')
                name.setAttribute('class', 'content-results-list-item-name')
                name.innerText = character.name

                firstColumn.appendChild(image)
                firstColumn.appendChild(name)

                li.appendChild(firstColumn)
                li.appendChild(secondColumn)
                li.appendChild(thirdColumn)


                if (character.series.items) {
                    let series = document.createElement('ul')
                    series.setAttribute('class', 'content-results-list-item-series')
                    for(var i = 0; i < 3 && i < character.series.available; i++) {
                        let serie = document.createElement('li')
                        serie.setAttribute('class', 'content-results-list-item-description')
                        serie.innerText = character.series.items[i].name

                        series.appendChild(serie)
                        // console.log(character.id, character.series.items[i].name)
                    }

                    secondColumn.appendChild(series)
                }

                if (character.events.items) {
                    let events = document.createElement('ul')
                    events.setAttribute('class', 'content-results-list-item-events')
                    for(var i = 0; i < 3 && i < character.events.available; i++) {
                        let event = document.createElement('li')
                        event.setAttribute('class', 'content-results-list-item-description')
                        event.innerText = character.events.items[i].name

                        events.appendChild(event)
                        // console.log(character.id, character.events.items[i].name)
                    }

                    thirdColumn.appendChild(events)
                }


                document.getElementById('results').appendChild(li)
            })
        }

    })
    .catch((error) => console.log('Request failed', error))
