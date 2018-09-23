import mountsPaginationHTML from './pagination'
import {listenerToDetails} from './details'
import {clearList, status, json, mountsPaginationArray, getPaginationSize } from './utils'

function mountsCharacter(character) {


    let li = document.createElement('li')
    li.dataset.id = character.id
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
        }

        thirdColumn.appendChild(events)
    }

    document.getElementById('results').appendChild(li)
}

function noResults() {
    let li = document.createElement('li')
    li.setAttribute('class', 'content-results-list-empty')

    li.innerText = 'Nenhum personagem encontrado. Verifique a digitação e tente realizar uma nova busca'
    document.getElementById('results').appendChild(li)
}

export default function getCharacters (url) {
    let pagination = []
    fetch(url)
        .then(status)
        .then(json)
        .then((data) => {
            let totalPages = getPaginationSize(data.data.total, data.data.limit)
            pagination = mountsPaginationArray(totalPages)
            mountsPaginationHTML(pagination)

            if(data.data.results.length > 0) {

                clearList()
                data.data.results.map( character => {
                    mountsCharacter(character)
                })

                listenerToDetails()

            } else {
                clearList()
                noResults()
            }



        })
        .catch((error) => console.log('Request failed', error))
}
