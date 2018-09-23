/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';

// ================================
// START YOUR APP HERE
// ================================

import getCharacters from './character'
import {requestPage} from './pagination'
import search from './search'

function init() {

    const pagesItems = document.getElementsByClassName('content-pagination-list-item')

    for (var i = 0; i < pagesItems.length; i++) {

        pagesItems[i].firstChild.addEventListener('click', e => {
            e.preventDefault
            let _this = e.target
            history.pushState('', _this.href)
        })
    }

    window.addEventListener('popstate', requestPage);

    getCharacters(`https://gateway.marvel.com/v1/public/characters?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1`)

    const input = document.getElementById('input-search')

    input.addEventListener('keyup', (e) => search(e))

}

init();

