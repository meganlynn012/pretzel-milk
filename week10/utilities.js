export const getLocation = (opt) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, opt);
    });
};

export function getJSON(url) {
    return fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        }).catch((error) => {
            alert(`There was an error: ${error}`);
            console.log(error);
        });
}