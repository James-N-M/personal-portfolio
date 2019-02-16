const client_id = "883269537f076b60a4d7";
const client_secret = "9eaf5161c66693134e46d4b822615d86a9b84fe9";
const repository = '/repos/James-N-M/personal-portfolio/commits';
const commitMessageElement = document.getElementById('commit-message');
let commit = {};

const fetchLatestRepositoryCommit = async (repo) => {
    const api_call = await fetch(`https://api.github.com${repo}?client_id=${client_id}&client_secret=${client_secret}`);

    const data = await api_call.json();

    return data;
}

const formatCommitMessage = (commitObject) => {
    let message = `${commitObject.commit.message}
        <a class="bg-black text-white no-underline" href="${commitObject.html_url}">
            #${trimString(commitObject.sha)}
        </a>`;
    return message;
}

const trimString = (string) => {
    return string.substr(0,4);
}

window.onload = function () {
    fetchLatestRepositoryCommit(repository).then((res) => {
        commit = res[0];
        console.log(commit);
        commitMessageElement.innerHTML = formatCommitMessage(commit);
    });
}
