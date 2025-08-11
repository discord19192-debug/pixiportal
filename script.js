// SFW Media List
const sfwMediaList = [
    // GitHub-hosted media (relative path)
    "media/bridge.png",
    "blank",

    // External media
    "https://www.w3schools.com/w3images/fjords.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    "https://www.w3schools.com/html/mov_bbb.mp4"
];

// NSFW Media List (replace with your own)
const nsfwMediaList = [
    // GitHub-hosted example (relative path)
    "media/nsfw_sample.jpg",

    // External
    "https://e.pcloud.link/publink/show?code=XZQgqEZXrwvj5gMVA4vofa1sBgtaHOptm0k"
];

// Function to load media
function loadRandomMedia(list) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (list.length === 0) {
        output.innerHTML = "<p>No media available in this category.</p>";
        return;
    }

    const randomUrl = list[Math.floor(Math.random() * list.length)];
    const isImage = randomUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    const isVideo = randomUrl.match(/\.(mp4|webm|ogg)$/i);

    if (isImage) {
        output.innerHTML = `<img src="${randomUrl}" alt="Random Media">`;
    } else if (isVideo) {
        output.innerHTML = `<video src="${randomUrl}" controls></video>`;
    } else {
        fetch(randomUrl, { method: "HEAD" })
            .then(res => {
                const type = res.headers.get("Content-Type");
                if (type?.startsWith("image")) {
                    output.innerHTML = `<img src="${randomUrl}" alt="Random Media">`;
                } else if (type?.startsWith("video")) {
                    output.innerHTML = `<video src="${randomUrl}" controls></video>`;
                } else {
                    output.innerHTML = `<p>Cannot display this media type.</p>`;
                }
            })
            .catch(() => {
                output.innerHTML = `<p>Error loading media.</p>`;
            });
    }
}

// Event listener
document.getElementById("loadBtn").addEventListener("click", () => {
    const category = document.getElementById("category").value;
    if (category === "sfw") {
        loadRandomMedia(sfwMediaList);
    } else if (category === "nsfw") {
        loadRandomMedia(nsfwMediaList);
    }
});
