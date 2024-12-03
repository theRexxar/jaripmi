import { API_CONFIG, assignValueToNode, formatedString, getQueryParams } from "./config";
import { initCountryHeader } from "./country-lib.js";

// State management
const state = {
    onloadProgress: false,
    dataCountryCategory: {},
    dataCountryCategoryContent: [],
};

// function jquery datatable
const dataRemitance = (target) => {
	if ($(target)) {
		var country = $(target).data('country');
		
		$(target).DataTable({
			ajax: '/js/data/remittance/' + country + '.json',
			responsive: true,
			columns: [
				{ 
					className: 'w-20',
					data: 'remittance_institutions',
				},
				{ 
					className: 'w-20 text-wrap',
					data: 'website', 
					"render": function ( data, type, row, meta ) {
						return data !== "" &&  data.includes('http') ? '<a href="'+ data +'" target="_blank" class="text-wrap w-20">'+ data +'</a>' : data;
					}
				  },
				{ 
					data: 'tutorial', 
					className: 'w-20 text-wrap',
					"render": function ( data, type, row, meta ) {
						return data !== "" &&  data.includes('http') ? '<a href="'+ data +'" target="_blank" class="text-wrap w-20">'+ data +'</a>' : data;
					}
				},
				{ 
					data: 'remittance_cost',
					className: 'w-20'
				 },
				{ 
					data: 'platform',
					className: 'w-20'
				}
			]
		})
	}
}

const callApiCountryCategoryDetail = async (id) => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/country-categories/${id}?populate[0]=country`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`
                }
            }
        );
        const result = await response.json();
        state.dataCountryCategory = result.data;

        // set country data
        assignValueToNode("country-category-name", result.data?.name, "txt");
        const nodeLink = document.getElementById("country-name-link");	
        if (nodeLink) {
            nodeLink.href = `../detail?name=${state.dataCountryCategory.country?.name}&id=${state.dataCountryCategory.country.documentId}`;	
            nodeLink.innerText = state.dataCountryCategory.country?.name;
        }

        assignValueToNode("country-category-name-title", result.data?.name, "txt-h1"); 
        assignValueToNode("country-category-name-subtitle", result.data?.country?.name, "txt-h1"); 
        assignValueToNode("link-back", `../detail?name=${state.dataCountryCategory.country?.name}&id=${state.dataCountryCategory.country.documentId}`, "link"); 
        await callApiCountryCategoryContentDetail(result.data.id);
        initCountryHeader();

    } catch (error) {
        console.error("Failed to fetch data from api:", error);
    }
};

const callApiCountryCategoryContentDetail = async (id) => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/country-contents?populate[0]=image&filters[country_category][id][$eq]=${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`
                }
            }
        );
        const result = await response.json();
        state.dataCountryCategoryContent = result.data;

        const country_category_list_name = document.getElementById("country-category-list-name");
        if (!country_category_list_name) {
            return;
        }
        country_category_list_name.innerHTML = ``;

        const country_category_content = document.getElementById("country-category-content");
        if (!country_category_content) {
            return;
        }
        country_category_content.innerHTML = ``;

        state.dataCountryCategoryContent.forEach((content) => {
            const listContent = document.createElement("li");
            listContent.innerHTML = `
                <a class="site-nav-item" href="#${formatedString(content.name)}">${content.name}</a>
            `;
            country_category_list_name.appendChild(listContent);

            const contentDetail = document.createElement("section");
            contentDetail.className = "pmi-scrollspy-content adjust-anchor";
            contentDetail.id = formatedString(content.name);
            contentDetail.innerHTML = `
                <h4>${content.name}</h4><img class="mw-100 my-3" src="${content.image?.url}" alt=""/>
                <div class="row"> 
                    <div class="col-lg-12 col-md-12 col-sm-12 content-article">${content.description}</div>
                </div>
                <hr/>
            `;
            country_category_content.appendChild(contentDetail);
        });

        dataRemitance('#remitansi-list');

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
        callApiCountryCategoryDetail(val);
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
