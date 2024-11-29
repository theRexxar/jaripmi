import { API_CONFIG, getQueryParams, assignValueToNode } from "./config-dist.js";
import { init } from "./pelatihan-serupa-dist.js";

// State management
const state = {
    onloadProgress: false,
}

const callApiDetail = async (id) => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/courses/${id}?populate[0]=learning_platform.image&populate[1]=course_category&populate[2]=image&populate[3]=course_tags`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`
                }
            }
        );
        const result = await response.json();
        // assign value to params
        assignValueToNode("course-name-breadcrumb", result?.data?.name);
        assignValueToNode("detail-course-image", result?.data?.image[0]?.url, "image");
        assignValueToNode("detail-course-price", result?.data?.price, "txt");
        let price = result?.data?.price;
        let discount = result?.data?.price_final;
        const discountPercentage = 100 - Math.floor((discount / price) * 100);
        let final_price;

        if (discount == 0) {
            final_price = "Gratis";
        } else {
            final_price = discount;
        }

        assignValueToNode("detail-course-discount", discountPercentage+"%", "txt");
        assignValueToNode("detail-course-final-price", final_price, "txt");
        assignValueToNode("detail-course-title", result?.data?.name, "txt-h1");
        assignValueToNode("detail-course-logo", result?.data?.learning_platform?.image[0]?.url, "image");
        assignValueToNode("detail-course-logo-name", result?.data?.learning_platform?.name, "txt");
        assignValueToNode("detail-course-subcategory", result?.data?.sub_category?.name, "txt");
        assignValueToNode("detail-course-link", result?.data?.link, "txt");
        assignValueToNode("detail-course-description", result?.data?.description, "html");
        assignValueToNode("detail-course-link-src", result?.data?.link, "link");
        let dataTag = [];
        result?.data?.course_tags?.forEach(data => {
            dataTag.push(data.name);
        });

        init(dataTag, undefined, undefined, result.data.documentId);
    } catch (error) {
        console.error("Failed to fetch data from api:", error);
    }
};

// Initialize on window load
window.addEventListener('load', () => {
    if (state.onloadProgress) return;
    state.onloadProgress = true;
    
    let queryParams = getQueryParams();
    if (queryParams) {
        let paramPairs = queryParams.title.split('-');

        let val = paramPairs[paramPairs.length-1]
        callApiDetail(val);

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