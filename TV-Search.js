let form = document.querySelector('#form');
let shows = document.querySelector('#shows');
// Functions
const functions = {
    clearShows() {
        shows.innerHTML = ''
    },
    async getShows(showName) {
        let show = await axios.get(`http://api.tvmaze.com/search/shows?q=${showName}`);
        console.log(show.data[0].show.image.original)
    },
    chooseShow() {

    }
}