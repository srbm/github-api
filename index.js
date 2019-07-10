'use strict'


function getRepos(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            $('#results').html(responseJson[0]).show();
        });
}



function watchForm() {
    $('#js-form').submit(e => {
        e.preventDefault();
        const userName = $('#js-username').val();
        $('#js-username').val('');
        console.log(userName);
        getRepos(userName);
    })
}

$(watchForm);