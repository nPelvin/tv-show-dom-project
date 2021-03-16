//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
let filtered=allEpisodes;

function searchFunction() {
  var input, caseNeutral;
  //takes input
  input = document.getElementById('myInput');
  //translates to all upper case
  caseNeutral = input.value.toUpperCase();
  console.log(allEpisodes);
  filtered=allEpisodes.filter(x=>x.name.toUpperCase().includes(caseNeutral));
  console.log(filtered);
  result=document.getElementById("result");
  result.textContent = `Displaying ${filtered.length} / ${allEpisodes.length} episode(s)`;
  let row=document.getElementById("row");
  console.log(row);
  //deletes previous search results
  row.parentNode.removeChild(row);
  // creates new boxes for current search results
  makeBoxes(filtered);
}

function setup() {
  makePageForEpisodes(allEpisodes);
  giveCredit();
  makeBoxes(filtered);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.classList.add("container-fluid");
  result=document.createElement("p");
  rootElem.appendChild(result);
  result.setAttribute("id","result");
  result.textContent = `Displaying ${episodeList.length} episode(s)`;
  rootElem.style.border="black solid 10px";
  rootElem.style.backgroundColor="black";
}

function makeBoxes(filtered) {

  // defines root location and creates a new Row of boxes
  const newRow = document.createElement("row");
  const rootElem = document.getElementById("root");
  rootElem.appendChild(newRow);
  newRow.classList.add("row");
  newRow.setAttribute("id", "row");
  // loop for every object in filtered array
  for (i=0;i<filtered.length;i++){
  // creates and appends newContainer for each iteration to the root
    const newContainer = document.createElement("div");
    newRow.appendChild(newContainer);
  //create two digit strings for episodes and seasons
    let episode2d = ("0" + filtered[i].number).slice(-2);
    let season2d = ("0" + filtered[i].season).slice(-2);
  //creates header for each container comprised of Episode name, and season/episode number
    const header = document.createElement("p");
    newContainer.appendChild(header);
    header.textContent = `${filtered[i].name} - S${season2d}E${episode2d}`;
    header.style.fontWeight = "700";
  // creates and appends newImage for each iteration to the container
    const newDiv= document.createElement("div");
    const newImg= document.createElement("img");
    newContainer.appendChild(newDiv);
    newDiv.appendChild(newImg);
    newImg.src=`${filtered[i].image.medium}`;
  // creates and appends newParagraph (summary) for each iteration to the container
    const newP= document.createElement("p");
    newContainer.appendChild(newP);
    newP.innerHTML = `${filtered[i].summary}`;
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
