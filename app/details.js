import { status, json } from './utils'


export function listenerToDetails() {
    const items = document.getElementsByClassName('content-results-list-item')

    for (var i = 0; i < items.length; i++) {
        let id = items[i].dataset.id
        items[i].addEventListener('click', () => {
            getCharacterInformation(id)
            getSeries(id)
            getEvents(id)
            document.getElementById('details-modal').classList.add('--active')
        })
    }

}

export function modalClose(e) {
    e.preventDefault()
    document.getElementById('details-modal').classList.remove('--active')
}


function getCharacterInformation(id) {

    const outputName = document.getElementById('character-name')
    const outputImg = document.getElementById('character-image')
    const outputDesc = document.getElementById('character-description')
    fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1`)
        .then(status)
        .then(json)
        .then((data) => {
            if(data.data.results.length > 0) {

                data.data.results.map( character => {
                    outputName.innerText = character.name
                    outputImg.setAttribute('src', `${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`)
                    outputDesc.innerText = character.description

                })

            }



        })
        .catch((error) => console.log('Request failed', error))
}

function getSeries(id) {
    clearSeries()
    fetch(`https://gateway.marvel.com/v1/public/characters/${id}/series?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1`)
        .then(status)
        .then(json)
        .then((data) => {
            if(data.data.results.length > 0) {

                data.data.results.map( serie => {
                   mountSerieEvent(serie.title, serie.urls[0].url, `${serie.thumbnail.path}/portrait_small.${serie.thumbnail.extension}`, 'serie')

                })

            }



        })
        .catch((error) => console.log('Request failed', error))
}

function getEvents(id) {
    clearEvents()
    fetch(`https://gateway.marvel.com/v1/public/characters/${id}/events?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1`)
        .then(status)
        .then(json)
        .then((data) => {
            if(data.data.results.length > 0) {
                data.data.results.map( event => {
                    mountSerieEvent(event.title, event.urls[0].url, `${event.thumbnail.path}/portrait_small.${event.thumbnail.extension}`, 'event')

                })

            }



        })
        .catch((error) => console.log('Request failed', error))
}

function mountSerieEvent(name, url, image, type) {
    let seriesList = document.getElementById('character-series')
    let eventsList = document.getElementById('character-events')
    let li = document.createElement('li')
    let link = document.createElement('a')
    let title = document.createElement('h5')
    let img = document.createElement('img')
    li.setAttribute('class', 'details-content-section-list-item')
    link.setAttribute('class', 'details-content-section-list-item-external-link')
    link.setAttribute('href', url)
    link.setAttribute('target', '_blank')
    title.setAttribute('class', 'details-content-section-list-item-title')
    title.innerText = name
    img.setAttribute('class', 'details-content-section-list-item-image')
    img.setAttribute('src', image)

    link.appendChild(img)
    link.appendChild(title)

    li.appendChild(link)

    if ( type === 'serie') {
        seriesList.appendChild(li)
    } else {
        if (type === 'event') {
            eventsList.appendChild(li)
        }
    }

}

function clearSeries() {
    document.getElementById('character-series').innerHTML = ''
}

function clearEvents() {
    document.getElementById('character-events').innerHTML = ''
}
