//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  makeBoxForEpisode1(allEpisodes);
  giveCredit();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.classList.add("container-fluid");
  rootElem.textContent = `Displaying ${episodeList.length} episode(s)`;
  rootElem.style.border="black solid 10px";
  rootElem.style.backgroundColor="black";
}

function makeBoxForEpisode1(episodeList) {
  // defines root location and creates a new Row of boxes
  const newRow = document.createElement("row");
  const rootElem = document.getElementById("root");
  rootElem.appendChild(newRow);
  newRow.classList.add("row");
  // loop for every object in episodeList array
for (i=0;i<episodeList.length;i++){
  // creates and appends newContainer for each iteration to the root
  const newContainer = document.createElement("div");
  newRow.appendChild(newContainer);
  //create two digit strings for episodes and seasons
  let episode2d = ("0" + episodeList[i].number).slice(-2);
  let season2d = ("0" + episodeList[i].season).slice(-2);
  //creates header for each container comprised of Episode name, and season/episode number
  const header = document.createElement("p");
  newContainer.appendChild(header);
  header.textContent = `${episodeList[i].name} - S${season2d}E${episode2d}`;
  header.style.fontWeight = "700";
 
  // creates and appends newImage for each iteration to the container
  const newDiv= document.createElement("div");
  const newImg= document.createElement("img");
  newContainer.appendChild(newDiv);
  newDiv.appendChild(newImg);
  newImg.src=`${episodeList[i].image.medium}`;
  // creates and appends newParagraph (summary) for each iteration to the container
  const newP= document.createElement("p");
  newContainer.appendChild(newP);
  newP.innerHTML = `${episodeList[i].summary}`;
  // create the CSS for newContainer
  newContainer.classList.add("col-xs-12", "col-sm-6", "col-md-4", "col-lg-3");
  newContainer.style.backgroundColor="grey";
  newContainer.style.color="white";
  newContainer.style.border="black solid 10px";
  newContainer.style.borderRadius="25px";
  newContainer.style.textAlign="center";
  newContainer.style.overflow="hidden";
}
}


function giveCredit() {
  const rootElem = document.getElementById("root");
  let newP=document.createElement("p");
  rootElem.appendChild(newP);
  newP.innerHTML="Data has (originally) come from TVMaze.com";
}

window.onload = setup;
