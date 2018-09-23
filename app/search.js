import getCharacters from './character'

/**
 * Search function
 *
 * @export
 * @param {object} event Keyup
 */
export default function search(event) {
    let value = event.target.value
    let legend = document.getElementById('input-legend')
    if (value.length >= 3) {
        legend.style.display = 'none'
        getCharacters(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1`)
    } else {
        legend.style.display = 'inline-block'
        if (value.length === 0) {
            getCharacters(`https://gateway.marvel.com/v1/public/characters?apikey=f804a6ba72e8f9e0aa1f02098a4d9760&limit=10&hash=798cc55b71bd99cdbb17ea46e4d9ecc4&ts=1`)
        }
    }
}
