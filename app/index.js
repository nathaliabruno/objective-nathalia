/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';

// ================================
// START YOUR APP HERE
// ================================

import { mountsPaginationArray, getPaginationSize, clearList, status, json } from './utils'
import mountsCharacter from './character'


function init() {
    const urlBase = 'https://gateway.marvel.com/v1/public/'
    const publicKey = 'f804a6ba72e8f9e0aa1f02098a4d9760'
    const hash = '798cc55b71bd99cdbb17ea46e4d9ecc4'
    const ts = '1'
    const limit = '10'
    const characters = 'characters'
    let pagination = []


fetch(`${urlBase}${characters}?apikey=${publicKey}&limit=${limit}&hash=${hash}&ts=${ts}`)
    .then(status)
    .then(json)
    .then((data) => {

        if(data.data.results) {
            clearList()
            data.data.results.map( character => {
                mountsCharacter(character)
                pagination = mountsPaginationArray(getPaginationSize(data.data.total, data.data.count))
            })
        }
        if(pagination) {
            console.log(pagination)
            let nav = document.getElementById('pagination')

            let ul = document.createElement('ul')
            ul.setAttribute('class', 'content-pagination-list')
            pagination.map(page => {

                let li = document.createElement('li')
                li.setAttribute('class', 'content-pagination-list-item')
                li.dataset.offset = page.offset
                let link = document.createElement('a')
                link.setAttribute('href', `#${page.pageNumber}`)
                link.innerText = page.pageNumber

                li.appendChild(link)
                ul.appendChild(li)

            })

            nav.appendChild(ul)
        }

    })
    .catch((error) => console.log('Request failed', error))

}

init();

