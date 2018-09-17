/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';

// ================================
// START YOUR APP HERE
// ================================

import { mountsPaginationArray, getPaginationSize } from './utils'
import getCharacters from './character'
import mountsPaginationHTML from './pagination'


function init() {
    const urlBase = 'https://gateway.marvel.com/v1/public/'
    const publicKey = 'f804a6ba72e8f9e0aa1f02098a4d9760'
    const hash = '798cc55b71bd99cdbb17ea46e4d9ecc4'
    const ts = '1'
    const limit = '10'
    const characters = 'characters'
    let offset = 0
    let pagination = []

    let totalPages = getPaginationSize(1482, 10)
    pagination = mountsPaginationArray(totalPages)
    mountsPaginationHTML(pagination)

    const pagesItems = document.getElementsByClassName('content-pagination-list-item')

    for (var i = 0; i < totalPages; i++) {

        pagesItems[i].firstChild.addEventListener('click', e => {
            e.preventDefault
            let _this = e.target
            history.pushState('', _this.href)
        })
    }

    window.addEventListener('popstate', requestPage);


    function requestPage() {
        let pageNumber = window.location.hash
        pageNumber = pageNumber.replace('#', '')

        let linkPage = document.getElementById(`page_${pageNumber}`)
        offset = linkPage.dataset.offset

        console.log(`${urlBase}${characters}?apikey=${publicKey}&limit=${limit}&hash=${hash}&ts=${ts}&offset=${offset}`)

    }



     getCharacters(`${urlBase}${characters}?apikey=${publicKey}&limit=${limit}&hash=${hash}&ts=${ts}`)

}

init();

