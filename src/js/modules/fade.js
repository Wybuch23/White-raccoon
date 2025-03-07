export function fadeOut(element, callback) {
    element.style.transition = "opacity 0.2s ease-in";
    element.style.opacity = "0";
    
    setTimeout(() => {
        element.style.display = "none";
        if (callback) callback();
    }, 200);
}

export function fadeIn(element) {
    element.style.display = "flex";
    element.style.opacity = "0"; 
    element.style.transition = "opacity 0.2s ease-in";

    setTimeout(() => {
        element.style.opacity = "1";
    }, 10);
}