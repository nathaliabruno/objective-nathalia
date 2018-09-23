/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';

// ================================
// START YOUR APP HERE
// ================================

import {requestPage, listenerPagination} from './pagination'
import search from './search'
import getCharacterInformation from './details'

function init() {
    const input = document.getElementById('input-search')

    requestPage()

    window.addEventListener('popstate', requestPage);


    listenerPagination()
    input.addEventListener('keyup', (e) => search(e))

}

init();

