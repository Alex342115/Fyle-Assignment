const ApiURl = "https://api.github.com/users/";
const main = document.querySelector("main");
const navBar = document.querySelector(".page-nav");
const navBarBtn = document.querySelector(".pagination-bar");

const userName = "getlost01";

const getUserData = async (username) => {
  fetch(ApiURl + username)
    .then((response) => response.json())
    .then((data) => {
      const pageNumber = Math.ceil(data.public_repos / 10);
      // console.log(pageNumber );
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
    <a class="user-link" href="${data.html_url}"><h3>${data.html_url}</h3></a>
    <div class="user-repos"></div>
    `;

      main.innerHTML = card;
      getRepos(userName, 2);
      getPageNav(userName, 1, pageNumber);
    });
};

const getRepos = async (username, pageNumber) => {
  const userRepos = document.querySelector(".user-repos");
  console.log(pageNumber);

  fetch(ApiURl + username + "/repos?per_page=10&page=" + pageNumber)
    .then((response) => response.json())
    .then((data) => {
      {
        let tempRepo="";
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

          const repo = `<div class="cards">
          <a class="repo-name" href="${element.html_url}">${element.name}</a>
          <h4 class="repo-desc">${element.description || ""}</h4>
          <ul class="repo-tags">${repoTag.join(" ")}</ul>
          </div>`;
          // getTags(element.topics);
          tempRepo += repo;
          // console.log(tempRepo)
        });
        userRepos.innerHTML = tempRepo;
      }
    });
};

const getPageNav = (username, pageNumber, maxPageNumber) => {
  for (let i = 1; i <= maxPageNumber; i++) {
    const navLink = `<li onclick='getRepos_util(event)'>${i}</li>`;
    navBar.innerHTML += navLink;
  }
};

function getRepos_util(event) {
  const btnValue = event.target.innerHTML;
  getRepos(userName, btnValue);
}

getUserData(userName);

//  <li onclick='getRepos_util'>1</li>
//         <li onclick='getRepos_util'>2</li>
//         <li onclick='getRepos_util'>3</li>
//         <li onclick='getRepos_util'>4</li>
//         <li onclick='getRepos_util'>5</li>

// const getTags = (topics) => {
//   const repoTags = document.querySelector(".repo-tags");
//   console.log(repoTags);
//   topics.map((topic) => {
//     const tag = `<li class="repo-tag">${topic}</li>`;
//     repoTags.innerHTML += tag;
//   });
//   console.log(repoTags);
// };
