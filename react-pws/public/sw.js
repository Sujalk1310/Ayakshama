let cacheData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/bundle.js",
                "/manifest.json",
                "/index.html",
                "/",
                "/doctors",
                "/patients",
                "/cardiac-form",
                "/ortho-form",
                "/gen-form",
                "/heart",
                "/ortho",
                "/gastro",
                "/general"
            ])
        })
    )
}) 

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
            event.waitUntil(
                this.registration.showNotification("Ayakshma Notification", {
                    body: "You are in Offline Mode,\nSome functionalities will be limited!",
                    icon: "https://static-00.iconduck.com/assets.00/openai-icon-1011x1024-uztb7qme.png"
                })
            );
        }
        event.respondWith(
            caches.match(event.request)
            .then((result) => {
                if (result) {
                    return result;
                }
                let requestUrl = event.request.clone();
                return fetch(requestUrl);
            })
        )
    }
})