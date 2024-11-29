import { API_CONFIG, formatedString } from "./config-dist";

// State management
const state = {
    onloadProgress: false,
    sortSetting: {
        by: "name",
        method: "asc"
    },
};

// API Calls
const callApiCountry = async (sort, page) => {
    // check local storage
    const countries = localStorage.getItem("countries");
    if (countries) {
        console.log("using local storage");
        return JSON.parse(countries);
    }

    const defaultParams = {
        sortBy: sort?.by || state.sortSetting.by,
        sortMethod: sort?.method || state.sortSetting.method,
        pageCurr: page?.curr || 1,
        pageSize: page?.size || 10
    };

    const uri = `${API_CONFIG.baseUrl}/countries?populate[0]=flag&populate[1]=image&sort[0][${defaultParams.sortBy}]=${defaultParams.sortMethod}&pagination[page]=${defaultParams.pageCurr}&pagination[pageSize]=${defaultParams.pageSize}`;
    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_CONFIG.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API call success store to local storage");
       // save to local storage
        localStorage.setItem("countries", JSON.stringify(result.data));

        return result;
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

const init = () => {
    console.log("init");
    if (state.onloadProgress) return;
    state.onloadProgress = true;
    const data = callApiCountry();

    data.then((result) => {
        updateCountryList(result);
        state.onloadProgress = false;
    }).catch((error) => {
        console.error("Failed to initialize:", error);
    });
}

const updateCountryList = (data) => {
    const countryList = document.getElementById("list-country-page");
    if (!countryList) return;
    countryList.innerHTML = ``;
    
    data.forEach((country) => {
        const countryItem = document.createElement("div");
        countryItem.className = "col-md-6 col-lg-4 mt-4";
        countryItem.innerHTML = `
              <div class="card full-card rounded-3"><a class="text-decoration-none" href="detail?name=${formatedString(country.name)}&id=${country.documentId}">
                  <div class="full-card-cover"><img class="card-img-top" loading="lazy" src="${country.image?.url}" alt="${country.name}"></div>
                  <div class="full-card-body d-flex p-3 align-items-center justify-content-center">
                    <h3 class="title-country">${country.name}</h3>
                  </div></a></div>
        `;
        countryList.appendChild(countryItem);
    });
}

// Initialize on window load
window.addEventListener('load', () => {
    if (state.onloadProgress) return;
    init();
});

// If we're in a test environment, export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        updateCountryList,
        init,
        callApiCountry,
    };
}