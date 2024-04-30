const urlBased64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const determineAppServerKey = () => {
    var vapidPublicKey = "BNAGJgdo3dHlL5yfLKFess0Bl1eO7bY631y1syzmBMj3HGWKBdx0h_cNsnOP9k0TvIYpvX4WqxuJFHqSP7X0PWc";
    return urlBased64ToUint8Array(vapidPublicKey);
}

const swDev = () => {
    useEffect(() => {

    }, [])
    
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl)
    .then((response) => {
        console.log("response", response);
        return response.pushManager.getSubscription()
            .then((subscription) => {
                return response.pushManager.subscribe({ 
                    userVisibleOnly: true,
                    applicationServerKey: determineAppServerKey()
                });
            });
    });
}

export default swDev;