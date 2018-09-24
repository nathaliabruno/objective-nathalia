import { clearPagination, pushUrl, debounce } from './utils'
import getCharacters from './character'

export default function mountsPaginationHTML(pagination) {
    if(pagination) {
        let nav = document.getElementById('pagination')

        clearPagination();

        let ul = document.getElementById('pagination-list')
        pagination.map(page => {

            let li = document.createElement('li')
            li.setAttribute('class', 'content-pagination-list-item')
            li.dataset.offset = page.offset
            li.setAttribute('id', `page_${page.pageNumber}`)
            let link = document.createElement('a')
            link.setAttribute('href', `#${page.pageNumber}`)
            link.innerText = page.pageNumber

            li.appendChild(link)
            ul.appendChild(li)

        })
        setActivePage()

    }
}

/**
* Helper to calc total of pages
*
* @export
* @param {number} totalItems
* @param {number} count
* @returns return total of pages
*/
export function getPaginationSize(totalItems, count) {
    let totalPages = Math.ceil(totalItems / count)
    return totalPages
}

/**
* Function to mounts array of pagination
*
* @export
* @param {number} paginationSize
* @returns Array with page number and offset to request
*/
export function mountsPaginationArray(paginationSize) {
    let pagination = [];
    for (var i = 0; i < paginationSize; i++) {
        pagination.push(
            {
                'pageNumber': i+1,
                'offset': i * 10,
            }
            )
        }
    return pagination;
}



export function listenerPagination() {
    const pagesItems = document.getElementsByClassName('content-pagination-list-item')

    for (var i = 0; i < pagesItems.length; i++) {
        pagesItems[i].firstChild.addEventListener('click', e => {
            e.preventDefault()
            let _this = e.target
            pushUrl(_this.href)
        })
    }

}

export function requestPage() {
    let offset = 0
    let pageNumber = window.location.hash

    if(pageNumber) {

        pageNumber = pageNumber.replace('#', '')

        offset = (pageNumber - 1) * 10

        getCharacters(`https://gateway.marvel.com/v1/public/characters?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1&offset=${offset}`)
    } else {
        getCharacters(`https://gateway.marvel.com/v1/public/characters?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1&offset=${offset}`)
    }

}


function setActivePage() {
    let pageNumber = window.location.hash
    let linkPage = ''

    if(pageNumber) {

        pageNumber = pageNumber.replace('#', '')

        linkPage = document.getElementById(`page_${pageNumber}`)
    } else {
        linkPage = document.getElementById('page_1')
    }

    if (linkPage) {
        linkPage.classList.add('--active')
        getPaginationWidth(linkPage)
    }


}

function getPaginationWidth(element) {
    const itemW = element.offsetWidth + 20
    const totalPages = document.getElementsByClassName('content-pagination-list-item').length
    const ul = document.getElementById('pagination-list')
    const wrapper = document.querySelector('.content-pagination-wrapper')
    let width = (itemW * totalPages) + 'px'
    let wrapperWidth = (itemW * 6) + 'px'

    ul.style.width = width
    wrapper.style.width = wrapperWidth

    listenerPrevNext(ul, width, itemW)

    if (document.body.offsetWidth < 768) {
        wrapper.style.width = (itemW * 3) + 'px'
    }
}

function listenerPrevNext(ul, width, elWidth){

    let next = document.querySelector('.content-pagination-next')
    let prev = document.querySelector('.content-pagination-prev')

    next.addEventListener('click', (e) => {
        e.preventDefault()
        let widthToMove = (elWidth + 26) * 2
        let currentMargin = parseInt(ul.style.marginLeft.replace('px', ''))
        let marginSize = currentMargin * -1
        let maxMargin = parseInt(width.replace('px', '')) - (widthToMove *2)
        if (marginSize < maxMargin) {
            next.classList.remove('--inactive')
            ul.style.marginLeft = `${currentMargin - widthToMove}px`
        } else {
            next.classList.add('--inactive')
        }
        if (document.body.offsetWidth < 768) {
            ul.style.marginLeft = `${currentMargin - (widthToMove / 1.5)}px`
        }
    })

    prev.addEventListener('click', (e) => {
        e.preventDefault()
        let widthToMove = (elWidth + 26) * 2
        let currentMargin = parseInt(ul.style.marginLeft.replace('px', ''))
        if (currentMargin < 0) {
            prev.classList.remove('--inactive')
            ul.style.marginLeft = `${currentMargin + widthToMove}px`
        } else {
            prev.classList.add('--inactive')
        }
        if (document.body.offsetWidth < 768) {
            ul.style.marginLeft = `${currentMargin + (widthToMove / 1.5)}px`
        }
    })


}
