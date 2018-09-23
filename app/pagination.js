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
    }
}

export function requestPage() {
    let offset = 0
    let pageNumber = window.location.hash
    pageNumber = pageNumber.replace('#', '')

    let linkPage = document.getElementById(`page_${pageNumber}`)
    offset = linkPage.dataset.offset

    getCharacters(`https://gateway.marvel.com/v1/public/characters?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1&offset=${offset}`)

}
