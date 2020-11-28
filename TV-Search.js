let form = document.querySelector('#form');
let shows = document.querySelector('#shows');
let show = document.querySelector('#show');
let none = document.querySelector('#none');
// Functions
const functions = {
    clearShows() {
        shows.innerHTML = '';
        show.innerHTML = '';
        none.innerHTML = '';
    },
    async getShow(url) {
        let oneShowFetched = await axios.get(`${url}`);
        console.log(oneShowFetched)
        shows.style.display = 'none';
        show.style.display = 'grid';
        none.style.display = 'none';
        // Create single show container
        let newOneShow = document.createElement('div');
        newOneShow.classList.add('one-show-container');
        // Single show title
        let oneShowTitle = document.createElement('div');
        oneShowTitle.classList.add('one-show-title');
        oneShowTitle.innerHTML  = oneShowFetched.data.name;
        newOneShow.appendChild(oneShowTitle);
        //Single show cover
        let oneShowCover = document.createElement('img');
        oneShowCover.classList.add('one-show-cover');
        if(oneShowFetched.data.image === null) {
            oneShowCover.setAttribute('src','https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');
        }
        else{
            oneShowCover.setAttribute('src',`${oneShowFetched.data.image.original}`);
        }
        newOneShow.appendChild(oneShowCover);
        //Single show description
        let oneShowDescription = document.createElement('div');
        oneShowDescription.classList.add('one-show-description')
        oneShowDescription.innerHTML = oneShowFetched.data.summary;
        newOneShow.appendChild(oneShowDescription);
        //Single show genres
        let oneShowGenres = document.createElement('div');
        oneShowGenres.classList.add("one-show-genres")
        oneShowGenres.innerText = `Genres: ${oneShowFetched.data.genres.join(',')}`;
        newOneShow.appendChild(oneShowGenres);
        //Single show date premiered
        let oneShowPremiered = document.createElement('div');
        oneShowPremiered.classList.add('one-show-premiered');
        oneShowPremiered.innerText = `Date Premiered: ${oneShowFetched.data.premiered}`;
        newOneShow.appendChild(oneShowPremiered);
        //Single show status
        let oneShowStatus = document.createElement('div');
        oneShowStatus.classList.add('one-show-status');
        oneShowStatus.innerText = `Status: ${oneShowFetched.data.status}`;
        newOneShow.appendChild(oneShowStatus);
        //Single show network
        let oneShowNetwork = document.createElement('div');
        oneShowNetwork.classList.add('one-show-network');
        if(oneShowFetched.data.network === null) {
            oneShowNetwork.innerText = `Network : Unknown`;
        }
        else{
            oneShowNetwork.innerText = `Network: ${oneShowFetched.data.network.name}`;
        }
        newOneShow.appendChild(oneShowNetwork);
        show.appendChild(newOneShow);
    },
    async getShows(showName) {
        let showsFetched = await axios.get(`http://api.tvmaze.com/search/shows?q=${showName}`);
        // Search through multiple shows
        if(showsFetched.data.length>1 ) {
            show.style.display = 'none';
            none.style.display = 'none';
            for(let showFetched of showsFetched.data) {
                //Show Container
                let newShow = document.createElement('div');
                newShow.classList.add('show-container');
                //Show Title
                let showTitile = document.createElement('div');
                showTitile.classList.add('show-title');
                showTitile.innerText = showFetched.show.name;
                //Show Cover
                let showCover = document.createElement('img');
                showCover.classList.add('show-cover');
                if(showFetched.show.image !== null) {
                    showCover.setAttribute('src',`${showFetched.show.image.medium}`)
                }
                else if(showFetched.show.image === null){
                    showCover.setAttribute('src','https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg')
                }
                newShow.appendChild(showTitile);
                newShow.appendChild(showCover);
                // Show selection
                newShow.addEventListener('click',function() {
                    let link = showFetched.show._links.self.href;
                    functions.getShow(link);
                })
                shows.appendChild(newShow)
                shows.style.display = 'grid'
            }
        }
        // If no shows found
        else if(showsFetched.data.length<1) {
            shows.style.display = 'none';
            show.style.display = 'none';
            none.style.display = 'flex';
            none.innerText = "No Shows with provoded Title \n Try Something Different";
        }
        // Display if only single show is found
        else {
            let link = showFetched.show._links.self.href;
            functions.getShow(link)
        }
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