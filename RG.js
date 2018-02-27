function getAjaxData(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = () => resolve(JSON.parse(request.responseText));
        request.onerror = () => reject(request.status);
        request.send();
    });
}



function fetchGithubUserDetails(username) {
    let url = "https://gist.githubusercontent.com/evanc/17f1ade674aa0d8066e0a33be923fe17/raw/b3b6cd9c96e5ca59bf7610c4c17da420bcaea0ae/movies.json"
    //"https://api.github.com/users/" + username;


    return getAjaxData(url);
}


const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', () => {

    const usernameInput = document.querySelector('#username_input');
    const username = usernameInput.value;


    fetchGithubUserDetails(username).then(userDetails => {
        const avatarElement = document.querySelector('#user_avatar');
        avatarElement.src = userDetails.avatar_url;

        console.log(userDetails);

        const reposListElement = document.querySelector('#reposList');
        reposList.innerHTML = "";

        getAjaxData(`${userDetails.repos_url}?per_page=100`).then(reposList => {

            for (const repo of reposList) {
                const li = document.createElement('li');
                reposListElement.appendChild(li);
                li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`

                li.addEventListener('click', event => {
                    event.preventDefault();
                    // console.log(event);
                    // console.log(repo.name);
                    const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`
                    getAjaxData(url).then(commits => {

                        const commitsListElement = document.querySelector('#commitsList');
                        commitsListElement.innerHTML = "";

                        for (const commit of commits) {
                            const li = document.createElement('li');
                            commitsListElement.appendChild(li);
                            li.innerHTML = `<a href="${commit.html_url}" target="_blank">${commit.commit.message}</a>`
                        }
                    });
                });
            }
        });

    });
});


function showRepositoryDetails(repo) {
    console.log(repo.name);
}


fontSize = 10;
const btn = document.querySelector('#hello');
btn.style.fontSize = 10;
btn.addEventListener('click', ()=>{

  console.log(btn.style.fontSize);
  fontSize += 10;
  btn.style.fontSize = fontSize;
})


// Anonymous functions in jcript using Arrow
