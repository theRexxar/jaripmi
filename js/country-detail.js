import { API_CONFIG, assignValueToNode, formatedString, getQueryParams } from "./config-dist";
import { initCountryHeader } from "./country-lib.js";

// State management
const state = {
    onloadProgress: false,
    dataCountry: {},
    dataCountryCategory: [],
};

const callApiCountryDetail = async (id) => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/countries/${id}?populate[0]=image&populate[1]=flag`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`
                }
            }
        );
        const result = await response.json();
        state.dataCountry = result.data;

        // set country data
        assignValueToNode("coutry-name-breadcrumb", result.data?.name, "txt");
        assignValueToNode("country-name-h1", result.data?.name, "txt-h1"); 
        assignValueToNode("country-flag", result.data?.flag?.url, "image");
        assignValueToNode("country-desc", result.data?.description, "html");
        assignValueToNode("country-img", result.data?.image?.url, "image");

        callApiCountryCategory(result.data.id, result.data.name);
        initCountryHeader();

    } catch (error) {
        console.error("Failed to fetch data from api:", error);
    }
};


const callApiCountryCategory = async (id, name) => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/country-categories?populate[0]=image&filters[country][id][$eq]=${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`
                }
            }
        );
        const result = await response.json();

        const countryCategoryList = document.getElementById("country-category-list");
        if (!countryCategoryList) return;
        countryCategoryList.innerHTML = ``;

        result.data.forEach((category) => {
            const countryCategory = document.createElement("div");
            countryCategory.className = "col-12 col-lg-6 mb-3 mb-lg-4 px-4";
            countryCategory.innerHTML = `
                <a class="row border px-2 py-3 rounded card-link-box" id="country-category-link" href="../category?country-name=${name}&category-name=${formatedString(category.name)}&id=${category.documentId}">\
                    <div class="col-12 col-lg-4 text-center bg-techno techno-2"><img class="pmi-image-thumbnail mb-3 mb-lg-0" src="${category.image?.url}" alt=""></div>\
                    <div class="col-12 col-lg-8">\
                      <h5 id="country-category">${category.name}</h5>\
                      <p class="fs-7 text-secondary" id="country-category-description">${category.description}</p>\
                      <div class="d-flex fs-7 text-primary">Selengkapnya <i class="bi bi-chevron-right"></i></div>\
                    </div>\
                </a>
            `;
            countryCategoryList.appendChild(countryCategory);
        });


    } catch (error) {
        console.error("Failed to fetch data from api:", error);
    }
};

// Initialize on window load
window.addEventListener('load', () => {
    if (state.onloadProgress) return;
    state.onloadProgress = true;
    
    let queryParams = getQueryParams();
    if (queryParams && queryParams.id) {
        let val = queryParams.id;
        callApiCountryDetail(val);
    }
});

// If we're in a test environment, export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        callApiDetail,
        getQueryParams,
        assignValueToNode,
    };
}
