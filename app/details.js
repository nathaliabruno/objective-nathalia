import { status, json } from './utils'

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
    fetch(`https://gateway.marvel.com/v1/public/characters/${id}/series?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1`)
        .then(status)
        .then(json)
        .then((data) => {
            if(data.data.results.length > 0) {

                data.data.results.map( serie => {
                   console.log(serie)

                })

            }



        })
        .catch((error) => console.log('Request failed', error))
}

export function listenerToDetails() {
    const items = document.getElementsByClassName('content-results-list-item')

    for (var i = 0; i < items.length; i++) {
        let id = items[i].dataset.id
        items[i].addEventListener('click', () => {
            getCharacterInformation(id)
            getSeries(id)
        })
    }

}
