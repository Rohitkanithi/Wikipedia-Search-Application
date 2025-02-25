let searchInput = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAppendData(item) {
    let {
        title,
        link,
        description
    } = item;

    let divEl = document.createElement("div");
    divEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    titleEl.textContent = title;
    divEl.appendChild(titleEl);

    let breakEl = document.createElement("br");
    divEl.appendChild(breakEl);

    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.classList.add("result-url");
    linkEl.target = "_blank";
    linkEl.textContent = link;
    divEl.appendChild(linkEl);

    let linkbreak = document.createElement("br");
    divEl.appendChild(linkbreak);

    let paraEl = document.createElement("p");
    paraEl.textContent = description;
    paraEl.classList.add("link-description");
    divEl.appendChild(paraEl);

    searchResultsEl.appendChild(divEl);
}


function displayResult(result) {
    spinnerEl.classList.toggle("d-none");
    for (let item of result) {
        createAppendData(item);
    }
}



function searchWiki(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInputValue = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}

searchInput.addEventListener("keydown", searchWiki);