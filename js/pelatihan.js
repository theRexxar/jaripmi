import { API_CONFIG, formatedString, formatCurrency, isNumeric } from "./config.js";
import { initCountryHeader } from "./country-lib.js";

// String format utility function
const formatString = (string, ...args) => string.replace(/{(\d+)}/g, (match, number) => 
    typeof args[number] !== "undefined" ? args[number] : match
);

// State management
const state = {
    onloadProgress: false,
    price: [],
    learning_platform: [],
    sub_category: [],
    isInit: false,
    filter: {},
    filterByTitle: "",
    curPage: 1,
    pageCount: 1,
    sortSetting: {
        by: "createdAt",
        method: "desc"
    },
    dataSubCategory: [],
    dataLearningPlatform: [],
};

// UI Update Functions
const updatePelatihanCount = (total) => {
    const countElement = document.getElementById("count-pelatihan");
    if (countElement) {
        countElement.innerHTML = `Ditemukan <b>${total}</b> pelatihan`;
    }
};

const updatePelatihanList = (courses) => {
    const listElement = document.getElementById("list-pelatihan");
    if (!listElement) return;
    
    const courseHTML = courses.map(course => {
        let price = (course.price) ? course.price : 0;
        let discount = (course.price_final) ? course.price_final : 0;
        const discountPercentage = 100 -Math.floor((discount / price) * 100);
        let final_price;

        if (discount == 0) {
            final_price = "Gratis";
        } else {
            final_price = discount;
        }
        
        return `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card course-card">
                    <a class="text-decoration-none to-detail-course" href="/pelatihan/detail-pelatihan.html?title=${formatedString(course?.name)}-${course?.documentId}" title="${course?.name}">
                        <div class="card-cover">
                            <img class="card-img-top" src="${course?.image[0].url}" alt="${course?.name}">
                            <div class="card-cover-overlay">
                                <div class="d-flex justify-content-between align-middle">
                                    <div class="align-self-center">
                                        <div class="card-company">
                                            <img class="me-1 card-logo" src="${course?.learning_platform?.image[0]?.url}" alt="${course?.learning_platform?.name}">
                                            <span class="course-lp-name">${course?.learning_platform?.name}</span>
                                        </div>
                                    </div>
                                    <div class="align-self-center">
                                        <span class="badge rounded-pill text-capitalize text-bg-warning">Self-Paced Learning</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h6 class="mb-1 course-title text-capitalize" title="${course?.meta_seo[0]?.meta_title}">${course?.name}</h6>
                            <div class="d-flex my-2">
                                <span class="badge text-bg-light text-capitalize badge-ellipsis" title="${course?.course_category?.name}">${course?.course_category?.name}</span>
                            </div>
                            <div>
                                <div class="course-real-price mb-1">
                                    <span class="me-2"><b>${formatCurrency(price)}</b></span>
                                    <span class="badge text-bg-success">${discountPercentage}%</span>
                                </div>
                                <div class="course-price card-price mb-1 color-tertiary"><b>${(isNumeric(final_price)) ? formatCurrency(final_price) : final_price}</b></div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `
    }).join('');

    if (state.curPage === 1) {
        listElement.innerHTML = courseHTML;
    } else {
        listElement.insertAdjacentHTML('beforeend', courseHTML);
    }
};

// Event Handlers
const setupEventListeners = () => {
    // display button loadmore none if pagecount >= currpage
    const loadMore = document.getElementById("load-more-pelatihan");

    if (state.curPage >= state.pageCount) {
        loadMore.style.display = "none";
    }
    // Search input handler with debouncing
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener('input',function() {
            state.filterByTitle = searchInput.value;
        });
    }

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            callFilter(undefined, undefined);
        }
    });


    // Load more button handler
    if (loadMore) {
        loadMore.addEventListener('click', () => {
            if (state.curPage >= state.pageCount) {
                loadMore.style.display = "none";
                return;
            }
            state.curPage += 1;
            callFilter(undefined, { size: 9, curr: state.curPage });
        });
    }

    // Sort select handler
    const sortSelect = document.getElementById("sort-pelatihan");
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortOptions = {
                "0": { by: "createdAt", method: "desc" },
                "1": { by: "createdAt", method: "asc" },
                "2": { by: "price_final", method: "desc" },
                "3": { by: "price_final", method: "asc" }
            };
            state.sortSetting = sortOptions[sortSelect.value] || sortOptions["0"];
            callFilter(state.sortSetting, undefined);
        });
    }

    // Modal show event handler
    // const filterModal = document.getElementById("filterPelatihan");
    // if (filterModal) {
    //     filterModal.addEventListener('show.bs.modal', (event) => {
    //         callApiSubCategory();
    //         callApiLearningPlatform();
    //         // Add your modal show logic here
    //         console.log('Filter modal is being shown');
    //     });
    // }

    // Button Filter handler
    const filterButton = document.getElementById("show-filter-pelatihan");
    if (filterButton) {
        filterButton.addEventListener('click', () => {
            const sub_category = document.querySelectorAll(`div[name=sub-category-by-name]`);
            sub_category.forEach(element => {
               if (!element.hasChildNodes()) {
                callApiSubCategory(element);
               }
            });

            const learning_platform = document.querySelectorAll(`div[name=learning-platform-by-name]`);
            learning_platform.forEach(element => {
               if (!element.hasChildNodes()) {
                callApiLearningPlatform(element);
               }
            });
        });
    }
};

// Checkbox event listener setup helper
const setupCheckboxListeners = (name, stateKey) => {
    const checkboxes = document.querySelectorAll(`input[type=checkbox][name=${name}]`);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            state[stateKey] = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.value);
            callFilter(undefined, undefined);
        });
    });
};

// API Calls
const callApiCourse = async (filter, sort, page) => {
    const defaultParams = {
        sortBy: sort?.by || state.sortSetting.by,
        sortMethod: sort?.method || state.sortSetting.method,
        pageCurr: page?.curr || 1,
        pageSize: page?.size || 9
    };

    const buildFilterParams = () => {
        const params = [];
        
        if (filter?.byTitle) {
            params.push(`filters[name][$containsi]=${encodeURIComponent(filter.byTitle)}`);
        }

        if (filter?.byPrice?.length) {
            filter.byPrice.forEach((price, i) => {
                const numPrice = parseInt(price);
                if (!isNaN(numPrice)) {
                    params.push(`filters[$or][${i}][price_final][$eq]=${numPrice}`);
                }
            });
        }

        if (filter?.learning_platform?.length) {
            filter.learning_platform.forEach((platform, i) => {
                params.push(`filters[$or][${i}][learning_platform][name][$eq]=${encodeURIComponent(platform)}`);
            });
        }

        if (filter?.sub_category?.length) {
            filter.sub_category.forEach((category, i) => {
                params.push(`filters[$or][${i}][course_category][name][$eq]=${encodeURIComponent(category)}`);
            });
        }

        return params.join('&');
    };

    const uri = `${API_CONFIG.baseUrl}/courses?populate[0]=meta_seo&populate[1]=image&populate[2]=learning_platform.image&populate[3]=course_category&populate[4]=course_tags&sort[0][${defaultParams.sortBy}]=${defaultParams.sortMethod}&pagination[page]=${defaultParams.pageCurr}&pagination[pageSize]=${defaultParams.pageSize}&${buildFilterParams()}`;

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

        return await response.json();
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

const callApiSubCategory = async (node) => {
    try {

        if (state.dataSubCategory.length === 0) {
            const response = await fetch(
                `${API_CONFIG.baseUrl}/sub-categories`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${API_CONFIG.token}`
                    }
                }
            );
            const result = await response.json();
            state.dataSubCategory = result.data;
        }

        if (!node) { 
            const subCategory = document.getElementById("sub-category");
            if (subCategory) {
                node = subCategory
            }
        } 
        
        if (node) {
            state.dataSubCategory.forEach(data => {
                const newSubCategory = document.createElement("div");
                newSubCategory.className = "form-check";
                newSubCategory.id = formatedString(data.name);
                newSubCategory.innerHTML = `
                    <input class="form-check-input filter-sub-category" id="filter-sub-category-${formatedString(data.name)}" type="checkbox" value="${data.name}" name="sub_category">
                    <label class="form-check-label text-capitalize" for="filter-sub-category-${formatedString(data.name)}">${data.name}</label>
                `;
                newSubCategory.style.display = "block"; // Ensure visibility, if needed
                node.appendChild(newSubCategory);
            });
            setupCheckboxListeners('sub_category', 'sub_category');
        }
    } catch (error) {
        console.error("Failed to fetch sub categories:", error);
    }
};
// call api learning platform
const callApiLearningPlatform = async (node) => {
    try {
        if (state.dataLearningPlatform.length === 0) { 
            const response = await fetch(
                `${API_CONFIG.baseUrl}/learning-platforms`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${API_CONFIG.token}`
                    }
                }
            );
            const result = await response.json();
            state.dataLearningPlatform = result.data;
        }
       
        if (!node) { 
            const learningPlatform = document.getElementById("course-trending");
            if (learningPlatform) {
                node = learningPlatform
            }
        }
        

        if (node) {
            state.dataLearningPlatform.forEach(data => {
                const newLearningPlatform = document.createElement("div");
                newLearningPlatform.className = "form-check";
                newLearningPlatform.id = formatedString(data.name);
                newLearningPlatform.innerHTML = `
                    <input class="form-check-input filter-learning-platform" id="filter-learning-platform-${formatedString(data.name)}" type="checkbox" value="${data.name}" name="learning_platform">
                    <label class="form-check-label text-capitalize" for="filter-learning-platform-${formatedString(data.name)}">${data.name}</label>
                `;
                node.appendChild(newLearningPlatform);
            });
            setupCheckboxListeners('learning_platform', 'learning_platform');
        }
    } catch (error) {
        console.error("Failed to fetch learning platforms:", error);
    }
};

// Initialize the application
const init = async (filter, sort, page) => {
    try {
        const result = await callApiCourse(filter, sort, page);
        updatePelatihanCount(result.meta.pagination.total);
        updatePelatihanList(result.data);
        state.pageCount = result.meta.pagination.pageCount;
        
        if (!state.isInit) {
            state.isInit = true;
            await Promise.all([
                callApiSubCategory(),
                callApiLearningPlatform(),
                initCountryHeader(),
            ]);
            setupEventListeners();
            setupCheckboxListeners('price', 'price');
        }
    } catch (error) {
        console.error("Failed to initialize:", error);
    }
};

// Filter handling
const callFilter = (sort, page) => {
    state.filter = {
        byTitle: state.filterByTitle,
        byPrice: state.price,
        learning_platform: state.learning_platform,
        sub_category: state.sub_category
    };

    if (!page) {
        const listElement = document.getElementById("list-pelatihan");
        if (listElement) {
            listElement.innerHTML = '';
        }
        state.curPage = 1;
    }

    init(state.filter, sort || state.sortSetting, page);
};

// Initialize on window load
window.addEventListener('load', () => {
    if (state.onloadProgress) return;
    state.onloadProgress = true;
    init(state.filter, state.sortSetting, { size: 9, curr: 1 });
});

// If we're in a test environment, export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        API_CONFIG,
        formatString,
        updatePelatihanCount,
        updatePelatihanList,
        setupEventListeners,
        callApiCourse,
        callApiSubCategory,
        callApiLearningPlatform,
        init,
        callFilter,
    };
}