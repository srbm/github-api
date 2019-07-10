'use strict'




function getRepos(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            // console.log(responseJson);
            displayResults(responseJson);
        })
        .catch(err => {
            if (err.message === 'responseJson[0] is undefined') {
                $('#results-list, #js-error-message').empty();
                $('#results h2').hide();
                $('#js-error-message').text(`Github could not find that username`);
            } else {
                $('#results-list, #js-error-message').empty();
                $('#results h2').hide();
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            }
            
          });
}

function displayResults(responseJson) {
    $('#results-list, #js-error-message').empty();
    console.log(responseJson);
    $('#results h2').append(`${responseJson[0].owner.login}`).show();
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