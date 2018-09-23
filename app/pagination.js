import { clearPagination } from './utils'
import getCharacters from './character'

export default function mountsPaginationHTML(pagination) {
    if(pagination) {
        let nav = document.getElementById('pagination')

        clearPagination();

        let ul = document.createElement('ul')
        ul.setAttribute('class', 'content-pagination-list')
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
        nav.appendChild(ul)
        setActivePage()
    }
}

export function listenerPagination() {
    const pagesItems = document.getElementsByClassName('content-pagination-list-item')

    for (var i = 0; i < pagesItems.length; i++) {
        pagesItems[i].firstChild.addEventListener('click', e => {
            e.preventDefault
            let _this = e.target
            history.pushState('', _this.href)
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
    const itemW = element.offsetWidth
    const totalPages = document.getElementsByClassName('content-pagination-list-item').length
    const ul = document.getElementById('pagination').firstChild
    console.log(ul)
    let width = ((itemW + 20) * totalPages) + 'px'

     ul.style.width = width
}

