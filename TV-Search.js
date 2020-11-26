let form = document.querySelector('#form');
let shows = document.querySelector('#shows');
let show = document.querySelector('#show');
// Functions
const functions = {
    clearShows() {
        shows.innerHTML = '';
        show.innerHTML = '';
    },
    async getShows(showName) {
        let showsFetched = await axios.get(`http://api.tvmaze.com/search/shows?q=${showName}`);
        // Search through multiple shows
        if(showsFetched.data.length>1 ) {
            show.style.display = 'none';
            for(let showFetched of showsFetched.data) {
                let newShow = document.createElement('div');
                newShow.classList.add('show-container');
                let showTitile = document.createElement('div');
                showTitile.classList.add('show-title');
                showTitile.innerText = showFetched.show.name;
                let showCover = document.createElement('img');
                showCover.classList.add('show-cover');
                showCover.setAttribute('src',`${showFetched.show.image.medium}`)
                newShow.appendChild(showTitile);
                newShow.appendChild(showCover);
                // Show selection
                newShow.addEventListener('click',function() {
                    
                })
                shows.appendChild(newShow)
                shows.style.display = 'grid'
            }
        }
        // If no shows found
        else if(showsFetched.data.length<1) {
            shows.style.display = 'none';
            show.style.display = 'flex'
            show.innerText = "No Shows with provoded Title";
        }
        // Display if only single show is found
        else {

        }
    },
    chooseShow() {

    }
}
//Search
form.addEventListener('submit',function(e) {
    e.preventDefault();
    let searchText = form.elements.search;
    functions.clearShows();
    functions.getShows(searchText.value);
    searchText.value = ''
})