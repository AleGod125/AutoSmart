export async function Iframe(url) {
    parent.postMessage({
        action: "changeView",
        url: url
    }, "*");
} 