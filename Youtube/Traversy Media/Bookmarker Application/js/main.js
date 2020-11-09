// Lisren for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Local Storage Test
    // Test 
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        console.log(bookmarks);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from LocalStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to LocalStorage
        bookmarks.push(bookmark);
        // Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }



    // Clear form
    document.getElementById("myForm").reset();
    // Re-fetch bookmarks
    fetchBookmarks();
    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmark
function deleteBookmarks(url) {
    // Get bookmark from LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmark from LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    let bookmarksResults = document.getElementById("bookmarksResults");

    // Build output
    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += `<div class="well">
                                        <h3>
                                        ${name} 
                                        <a class="btn btn-default" target="_blank" href="${addhttp(url)}">Visit</a>
                                        <a onclick="deleteBookmarks('${url}')" class="btn btn-danger">Delete</a>
                                        </h3>
                                        </div>`

    }

    console.log(bookmarks)
}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("Please fill in the form");
        return false;
    }

    let urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(urlExpression);

    if (!siteUrl.match(urlExpression)) {
        alert("Please use a valid URL");
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}