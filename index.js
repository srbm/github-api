'use strict'




function getRepos(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            // console.log(responseJson);
            displayResults(responseJson);
        })
        .catch();
}

function displayResults(responseJson) {
    $('#results-list').empty();
    console.log(responseJson);
    $('#results h2').append(`${responseJson[0].owner.login}`);
    responseJson.forEach(repo => {
        
        $('#results-list').append(
            `<div class="result">
                <h3>${repo.name}</h3>
                <a href="${repo.html_url}">${repo.html_url}</a>
            </div>`
        );
    });
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('#js-form').submit(e => {
        e.preventDefault();
        const userName = $('#js-username').val();
        $('#js-username').val('');
        // console.log(userName);
        getRepos(userName);
    })
}

$(watchForm);