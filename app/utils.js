
/**
 * Helper to calc total of pages
 *
 * @export
 * @param {number} totalItems
 * @param {number} count
 * @returns return total off pages
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

