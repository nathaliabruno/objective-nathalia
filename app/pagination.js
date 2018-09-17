export default function mountsPaginationHTML(pagination) {
    if(pagination) {
        let nav = document.getElementById('pagination')

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

