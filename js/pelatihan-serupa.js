import { API_CONFIG, formatedString, formatCurrency, isNumeric } from "./config.js";

// State management
const state = {
    sortSetting: {
        by: "createdAt",
        method: "desc"
    },
};

// API Calls
const callApiSimiliar = async (filter, sort, page, excludeId) => {
    const defaultParams = {
        sortBy: sort?.by || state.sortSetting.by,
        sortMethod: sort?.method || state.sortSetting.method,
        pageCurr: page?.curr || 1,
        pageSize: page?.size || 10
    };

    const buildFilterParams = () => {
        const params = [];
        
        filter?.forEach((element, i) => {
            params.push(`filters[$or][${i}][course_tags][name][$eq]=${element}`);
        });
       
        return params.join('&');
    };

    const uri = `${API_CONFIG.baseUrl}/courses?populate[0]=meta_seo&populate[1]=image&populate[2]=learning_platform.image&populate[3]=course_category&filters[documentId][$ne]=${excludeId}populate[4]=meta_seo&sort[0][${defaultParams.sortBy}]=${defaultParams.sortMethod}&pagination[page]=${defaultParams.pageCurr}&pagination[pageSize]=${defaultParams.pageSize}&${buildFilterParams()}`;
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

// Initialize the DOM
const init = async (filter, sort, page, excludeId) => {
    try {
        const result = await callApiSimiliar(filter, sort, page, excludeId);
        
        const listElement = document.getElementById("list-pelatihan-serupa");
       
        if (!listElement) return;
        let courseHTML = '';

        for (let course of result.data) {
            if (course?.documentId == excludeId) {
                continue; 
            }

            let price = course?.price || 0;
            let discount = course?.price_final || 0;
            const discountPercentage = 100 -Math.floor((discount / price) * 100);
            let final_price;

            if (discount == 0) {
                final_price = "Gratis";
            } else {
                final_price = discount;
            }

            courseHTML += `
                <div class="swiper-slide">
                    <div class="card course-card"><a class="text-decoration-none to-detail-course" href="/pelatihan/detail-pelatihan.html?title=${formatedString(course?.name)}-${course?.documentId}" title="${course?.name}" target="_blank">
                        <div class="card-cover"><img class="card-img-top" src="${course?.image[0].url}" alt="${course?.name}">
                        <div class="card-cover-overlay">
                            <div class="d-flex justify-content-between align-middle">
                            <div class="align-self-center">
                                <div class="card-company"><img class="me-1 card-logo" src="${course?.learning_platform?.image[0]?.url}" alt="${course?.learning_platform?.name}"><span class="course-lp-name">${course?.learning_platform?.name}</span></div>
                            </div>
                            <div class="align-self-center"><span class="badge rounded-pill text-capitalize text-bg-warning">Self Paced Learning</span></div>
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                        <h6 class="mb-1 course-title text-capitalize" title="${course?.name}">${course?.name}</h6>
                        <div class="d-flex my-2"><span class="badge text-bg-light text-capitalize badge-ellipsis" title="${course?.course_category?.name}">${course?.course_category?.name}</span></div>
                        <div>
                            <div class="course-real-price mb-1"><span class="me-2">${formatCurrency(course?.price)}</span><span class="badge text-bg-success">${discountPercentage}%</span></div>
                            <div class="course-price card-price mb-1 color-tertiary">${(isNumeric(final_price)) ? formatCurrency(final_price) : final_price}</div>
                        </div>
                        </div></a></div>
                </div>
            `

        }
        
        if (courseHTML == "") {
            const containerElement = document.getElementById("container-pelatihan-serupa");
            if (!containerElement) return;

            containerElement.style.display = "none";

            return;
        }
       
        listElement.innerHTML = courseHTML;

        new Swiper(".similarSwipers", {
            slidesPerView: 1.75,
            spaceBetween: 8,
            navigation: {
				nextEl: ".swiper-course-next",
				prevEl: ".swiper-course-prev",
			},
            pagination: false,
            breakpoints: {
                640: {
                    slidesPerView: 2.5,
                    spaceBetween: 8,
                },
                992: {
                    slidesPerView: 3.5,
                    spaceBetween: 16,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                },
            },
        });

    } catch (error) {
        console.error("Failed to initialize:", error);
    }
};

export { callApiSimiliar, init };