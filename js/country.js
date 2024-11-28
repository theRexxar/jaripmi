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
    const countryList = document.getElementById("list-country-header");
    if (!countryList) return;
    countryList.innerHTML = `<li class="see-all"><a class="anchor arrow-move" href="negara/">Selengkapnya<i class="icon-angle-right"></i></a></li>`;
    
    data.forEach((country) => {
        const countryItem = document.createElement("li");
        countryItem.innerHTML = `
            <a class="site-nav-item" href="negara/${formatedString(country.name)}">${country.name}</a>
        `;
        countryList.appendChild(countryItem);
    });
}

module.exports = {
    state,
    updateCountryList,
    init,
    callApiCountry,
};