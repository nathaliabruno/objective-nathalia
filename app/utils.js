
/**
* Promise to confirm status ok from request
*
* @export
* @param {object} response
* @returns promise status
*/
export function status (response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

/**
* Helper to verify and returns the JSON from request
*
* @export
* @param {object} response
* @returns JSON from request
*/
export function json (response) {
    return response.json()
}


/**
* Helper to clear list of characters
*
* @export
*/
export function clearList() {
    let list = document.getElementById('results')

    let header = document.createElement('li')
    header.setAttribute('class', 'content-results-list-header')
    header.innerHTML = '<div>Personagem</div> <div>Séries</div> <div>Eventos</div>'

    list.innerHTML = ''
    list.prepend(header)
}

/**
* Helper to clear pagination
*
* @export
*/
export function clearPagination() {
    let nav = document.getElementById('pagination-list')
    nav.innerHTML = ''
}


export function pushUrl(href) {
    history.pushState('', '', href)
    throttle( () => {
        window.dispatchEvent(new Event('popstate'));
    }, 100)
}

