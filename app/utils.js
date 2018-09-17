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
