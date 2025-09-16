// API configuration
const API_CONFIG = {
    baseUrl: "https://cms.jaripmi.info/api",
    // token: "6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"
    token: "7cc004bb6534e119078b56f29c4d7a4506741265b9121cfa9aa5c422782a5d08f636d1cbd53dcb12c9d4afd0607193fb9ec2a861824af2920e392a3313b55ed1203fb4bd808bd84cbedfb03f6ee338d3d46fde0ffeefab4d4f66ec1f6c44ae9fb916bb09593507e6de97e08175ecfcc10a3a3275e1e583dafe09ac19d2457742"
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

const removeHTMLTags = (htmlString) => {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, 'text/html');
    // Extract text content
    const textContent = doc.body.textContent || "";
    // Trim whitespace
    return textContent.trim();
}

// If we're in a test environment, export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        formatedString,
        getQueryParams,
        assignValueToNode,
        formatCurrency,
        isNumeric,
        removeHTMLTags
    };
}
