const ApiURl = "https://api.github.com/users/";
const main = document.querySelector("main");

const getUserData = async (username) => {
  fetch(ApiURl + username)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const card = `<div class="user-info">
      <img
        class="user-img"
        src="${data.avatar_url}"
        alt="user-image"
      />

      <div class="user-info-left">
        <h1 class="user-name">${data.name}</h1>
        <h3 class="user-bio">${data.Bio || ""}</h3>
        <h3 class="user-location">${data.location || ""}</h3>
        <ul class="social-handles">
          <li>Twitter: </li>
        </ul>
      </div>
    </div>
    <a href="${data.html_url}">${data.html_url}</a>
    <div class="user-repos"></div>
    `;
      main.innerHTML = card;
      getRepos(username);
    });
};

// console.log(main);
const getRepos = async (username) => {
  const userRepos = document.querySelector(".user-repos");
  // console.log(userRepos);
  fetch(ApiURl + username + "/repos")
    .then((response) => response.json())
    .then((data) => {
      {
        data.map((element) => {
          const repoTags = element.topics;
          const repoTag = repoTags.map((tag) => {
            return `<li>${tag}</li>`;
          });

          if (repoTag.length > 4) {
            const n = repoTag.length;
            const m = n - 4;
            repoTag.splice(4, m);
            repoTag.push(`<li>+${m}</li>`);
          }
         
          // console.log(repoTag);
          const repo = `<div class="cards">
          <a class="repo-name" href="${element.html_url}">${element.name}</a>
          <h4 class="repo-desc">${element.description || ""}</h4>
          <ul class="repo-tags">${ repoTag.join(" ")}</ul>
          </div>`;
          userRepos.innerHTML += repo;
          // getTags(element.topics);
        });
      }
    });
};

getUserData("0mar-helal");

// const getTags = (topics) => {
//   const repoTags = document.querySelector(".repo-tags");
//   console.log(repoTags);
//   topics.map((topic) => {
//     const tag = `<li class="repo-tag">${topic}</li>`;
//     repoTags.innerHTML += tag;
//   });
//   console.log(repoTags);
// };
