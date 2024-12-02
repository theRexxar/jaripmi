/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_dist__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config_dist__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _country_lib_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* module decorator */ module = __webpack_require__.hmd(module);



// State management
const state = {
    onloadProgress: false,
    dataCountry: {},
    dataCountryCategory: [],
};

const callApiCountryDetail = async (id) => {
    try {
        const response = await fetch(
            `${_config_dist__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.baseUrl}/countries/${id}?populate[0]=image&populate[1]=flag`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${_config_dist__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.token}`
                }
            }
        );
        const result = await response.json();
        state.dataCountry = result.data;

        // set country data
        (0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.assignValueToNode)("coutry-name-breadcrumb", result.data?.name, "txt");
        (0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.assignValueToNode)("country-name-h1", result.data?.name, "txt-h1"); 
        (0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.assignValueToNode)("country-flag", result.data?.flag?.url, "image");
        (0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.assignValueToNode)("country-desc", result.data?.description, "html");
        (0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.assignValueToNode)("country-img", result.data?.image?.url, "image");

        callApiCountryCategory(result.data.id, result.data.name);
        (0,_country_lib_js__WEBPACK_IMPORTED_MODULE_1__.initCountryHeader)();

    } catch (error) {
        console.error("Failed to fetch data from api:", error);
    }
};


const callApiCountryCategory = async (id, name) => {
    try {
        const response = await fetch(
            `${_config_dist__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.baseUrl}/country-categories?populate[0]=image&filters[country][id][$eq]=${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${_config_dist__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.token}`
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
                <a class="row border px-2 py-3 rounded card-link-box" id="country-category-link" href="../category?country-name=${name}&category-name=${(0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.formatedString)(category.name)}&id=${category.documentId}">\
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
    
    let queryParams = (0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.getQueryParams)();
    if (queryParams && queryParams.id) {
        let val = queryParams.id;
        callApiCountryDetail(val);
    }
});

// If we're in a test environment, export the functions
if ( true && module.exports) {
    module.exports = {
        callApiDetail,
        getQueryParams: _config_dist__WEBPACK_IMPORTED_MODULE_0__.getQueryParams,
        assignValueToNode: _config_dist__WEBPACK_IMPORTED_MODULE_0__.assignValueToNode,
    };
}



/***/ }),
/* 1 */
/***/ (function() {

/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module) {

// API configuration
const API_CONFIG = {
    baseUrl: "https://cms.jaripmi.info/api",
    token: "6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"
};

// Format title to SEO format
const formatedString = (str) => {
    let newStr = str.replace(/[^a-zA-Z0-9]+/g, '-');
    newStr = newStr.replace(/-+/g, '-');
    newStr = newStr.replace(/^[-]+|[-]+$/g, '');

    return newStr
}

const getQueryParams = () => {
    var queryStr = window.location.search; // will give you ?sndReq=234

    var paramPairs = queryStr.substr(1).split('&');
    var params = {};
    for (var i = 0; i < paramPairs.length; i++) {
        var parts = paramPairs[i].split('=');
        params[parts[0]] = parts[1];
    }

    return params;
}

// Assign event listener to value
const assignValueToNode = (id, value, type) => {
    const node = document.getElementById(id);

    if (type == "image" && node) {
        node.src = value;
        return;
    }
    if (type == "txt-h1" && node) {
        node.textContent = value;
        return;
    }
    if (type == "html" && node) {
        node.innerHTML = value;
        return;
    }

    if (type == "link" && node) {
        node.href = value;
        return;
    }

    node.innerText = value
}

// Format Currency
const formatCurrency = (value) => String(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value));

const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

// If we're in a test environment, export the functions
if (  true && module.exports) {
    module.exports = {
        API_CONFIG,
        formatedString,
        getQueryParams,
        assignValueToNode,
        formatCurrency,
        isNumeric,
    };
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_2305__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2305__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nested_webpack_require_2305__(0);
/******/ 	
/******/ })()
;


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callApiCountry: function() { return /* binding */ callApiCountry; },
/* harmony export */   initCountryHeader: function() { return /* binding */ initCountryHeader; },
/* harmony export */   updateCountryList: function() { return /* binding */ updateCountryList; }
/* harmony export */ });
/* harmony import */ var _config_dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_dist__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config_dist__WEBPACK_IMPORTED_MODULE_0__);


// API Calls
const callApiCountry = async (sort, page) => {
    // check local storage
    const countries = localStorage.getItem("countries");
    if (countries) {
        return JSON.parse(countries);
    }

    const defaultParams = {
        sortBy: sort?.by || state.sortSetting.by,
        sortMethod: sort?.method || state.sortSetting.method,
        pageCurr: page?.curr || 1,
        pageSize: page?.size || 10
    };

    const uri = `${_config_dist__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.baseUrl}/countries?populate[0]=flag&populate[1]=image&sort[0][${defaultParams.sortBy}]=${defaultParams.sortMethod}&pagination[page]=${defaultParams.pageCurr}&pagination[pageSize]=${defaultParams.pageSize}`;
    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${_config_dist__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.token}`
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

const initCountryHeader = () => {
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
    countryList.innerHTML = `<li class="see-all"><a class="anchor arrow-move" href="/negara/">Selengkapnya<i class="icon-angle-right"></i></a></li>`;
	
    data.forEach((country) => {
        const countryItem = document.createElement("li");
        countryItem.innerHTML = `
            <a class="site-nav-item" href="/negara/detail?name=${(0,_config_dist__WEBPACK_IMPORTED_MODULE_0__.formatedString)(country.name)}&id=${country.documentId}">${country.name}</a>
        `;
        countryList.appendChild(countryItem);
		
    });
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.hmd = function(module) {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: function() {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=country-detail-dist.js.map