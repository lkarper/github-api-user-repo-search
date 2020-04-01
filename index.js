function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        fetchRepos();
    })
}

function fetchRepos() {
    const user = $('#user-name').val();
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response);
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => displayRepos(responseJson))
        .catch(error => {
            const errorMessage = error.message;
            $('#js-error-message').empty();
            $('#js-list').empty();
            $('#js-error-message').append(`<h2>Something went wrong: ${errorMessage}</h2>`);
        });
}

function displayRepos(responseJson) {
    $('#js-list').empty();
    $('#js-error-message').empty();
    console.log(responseJson);
    const repos = responseJson;
    if (repos.length === 0) {
        $('#js-error-message').append(`<h2>There are no repos linked with the user "${$('#user-name').val()}".</h2>`);
    }
    for (let repo of repos) {
        const repoName = repo.name;
        const repoURL = repo.html_url;
        $('#js-list').append(
            `
            <li>
                <p>Repository name: ${repoName}</p>
                <a href="${repoURL}">Link to Repo</a>
            </li>
            `
        );
    }
}

$(watchForm);