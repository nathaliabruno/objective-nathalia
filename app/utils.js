export function getPaginationSize(totalItems, count) {
    let totalPages = Math.ceil(totalItems / count)
    return totalPages
}

export function mountsPagination(paginationSize) {
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

// mountsPagination(getPaginationSize(results.total, results.count))

//https://gateway.marvel.com/v1/public/characters?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&offset=0&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1

export function status (response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

export function json (response) {
    return response.json()
}

