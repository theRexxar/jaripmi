/**
 * @jest-environment jsdom
 */

// Mock fetch globally
global.fetch = jest.fn();

// Mock the DOM elements that our code interacts with
document.body.innerHTML = `
    <div id="count-pelatihan"></div>
    <div id="list-pelatihan"></div>
    <input id="search-input" type="text" />
    <button id="load-more-pelatihan">Load More</button>
    <select id="sort-pelatihan">
        <option value="0">Terbaru</option>
        <option value="1">Terlama</option>
        <option value="2">Harga Tertinggi</option>
        <option value="3">Harga Terendah</option>
    </select>
    <div id="sub-category"></div>
    <div id="course-trending"></div>
`;

// Import the functions to test
const {
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
    callFilter
} = require('./pelatihan');

// Mock timer for debounce testing
jest.useFakeTimers();

describe('Pelatihan.js Unit Tests', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Reset fetch mock
        fetch.mockClear();
        // Reset state
        Object.assign(state, {
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
            }
        });
    });

    describe('formatString', () => {
        it('should format string with provided arguments', () => {
            const result = formatString('Hello {0}, how are {1}?', 'World', 'you');
            expect(result).toBe('Hello World, how are you?');
        });

        it('should keep placeholder if no argument provided', () => {
            const result = formatString('Hello {0}, how are {1}?', 'World');
            expect(result).toBe('Hello World, how are {1}?');
        });
    });

    describe('updatePelatihanCount', () => {
        it('should update pelatihan count in DOM', () => {
            updatePelatihanCount(10);
            const countElement = document.getElementById('count-pelatihan');
            expect(countElement.innerHTML).toBe('Ditemukan <b>10</b> pelatihan');
        });
    });

    describe('updatePelatihanList', () => {
        const mockCourses = [{
            id: '1',
            name: 'Test Course',
            image: [{ url: 'test-image.jpg' }],
            learning_platform: {
                name: 'Test Platform',
                image: [{ url: 'platform-image.jpg' }]
            },
            sub_category: { name: 'Test Category' },
            price: '100000',
            price_final: '80000'
        }];

        it('should render courses to the list', () => {
            updatePelatihanList(mockCourses);
            const listElement = document.getElementById('list-pelatihan');
            expect(listElement.innerHTML).toContain('Test Course');
            expect(listElement.innerHTML).toContain('Test Platform');
            expect(listElement.innerHTML).toContain('Test Category');
        });
    });

    describe('API Calls', () => {
        beforeEach(() => {
            fetch.mockImplementation(() => 
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        data: [],
                        meta: { pagination: { total: 0, pageCount: 1 } }
                    })
                })
            );
        });

        it('should call API with correct parameters in callApiCourse', async () => {
            const filter = { byTitle: 'test' };
            const sort = { by: 'createdAt', method: 'desc' };
            const page = { curr: 1, size: 10 };

            await callApiCourse(filter, sort, page);

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining(API_CONFIG.baseUrl),
                expect.objectContaining({
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${API_CONFIG.token}`
                    }
                })
            );
        });

        it('should handle API errors gracefully', async () => {
            fetch.mockImplementationOnce(() => 
                Promise.reject(new Error('API Error'))
            );

            await expect(callApiCourse({}, {}, {})).rejects.toThrow('API Error');
        });
    });

    describe('Event Listeners', () => {
        it('should handle search input with debounce', () => {
            setupEventListeners();
            const searchInput = document.getElementById('search-input');
            
            searchInput.value = 'test';
            searchInput.dispatchEvent(new Event('input'));
            
            expect(state.filterByTitle).toBe('');
            
            jest.runAllTimers();
            
            expect(state.filterByTitle).toBe('test');
        });

        it('should handle load more button click', () => {
            state.curPage = 1;
            state.pageCount = 2;
            
            setupEventListeners();
            const loadMore = document.getElementById('load-more-pelatihan');
            
            loadMore.click();
            
            expect(state.curPage).toBe(2);
        });

        it('should hide load more button when no more pages', () => {
            state.curPage = 2;
            state.pageCount = 2;
            
            setupEventListeners();
            const loadMore = document.getElementById('load-more-pelatihan');
            
            expect(loadMore.style.display).toBe('none');
        });
    });

    describe('Filter Handling', () => {
        it('should update filter state and reset page on filter call', () => {
            state.filterByTitle = 'test';
            state.price = ['100000'];
            state.curPage = 2;

            callFilter();

            expect(state.filter).toEqual({
                byTitle: 'test',
                byPrice: ['100000'],
                learning_platform: [],
                sub_category: []
            });
            expect(state.curPage).toBe(1);
        });
    });
});
