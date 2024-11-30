import { initCountryHeader } from "./country-lib.js";

// State management
const state = {
    onloadProgress: false,
};

// Initialize on window load
window.addEventListener('load', () => {
    if (state.onloadProgress) return;
    state.onloadProgress = true;
    
   initCountryHeader();
   state.onloadProgress = false;
});