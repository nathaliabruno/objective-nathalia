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
import {modalClose} from './details'

/**
 * Main function to starts application
 *
 */
function init() {
    const input = document.getElementById('input-search')
    const closeButton = document.getElementById('close-modal')
    const overlay = document.getElementById('overlay-close')


    requestPage()

    window.addEventListener('popstate', requestPage);

    listenerPagination()

    input.addEventListener('keyup', (e) => search(e))

    closeButton.addEventListener('click', (e) => modalClose(e))

    overlay.addEventListener('click', (e) => modalClose(e))
}

init();

