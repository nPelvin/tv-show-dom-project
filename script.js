//You can edit ALL of the code here
//brings in list of episodes
const allEpisodes = getAllEpisodes();
//sets blank search to default to all Episodes
let filtered=allEpisodes;

function searchFunction() {
  var input, caseNeutral;
  //takes input
  input = document.getElementById('myInput');
  //translates to all upper case
  caseNeutral = input.value.toUpperCase();
  filtered=allEpisodes.filter(x=>x.name.toUpperCase().includes(caseNeutral) || x.summary.toUpperCase().includes(caseNeutral));
  result=document.getElementById("result");
  result.textContent = `Displaying ${filtered.length} / ${allEpisodes.length} episode(s)`;
  let row=document.getElementById("row");
  //deletes previous search results
  row.parentNode.removeChild(row);
  // creates new boxes for current search results
  makeBoxes(filtered);
}



function selectFunction(){
for (i=0;i<allEpisodes.length;i++)
{
  let selectorParent=document.getElementById("episodeSelector");
  let newOption=document.createElement("option");
  selectorParent.appendChild(newOption);
  let episode2d = ("0" + allEpisodes[i].number).slice(-2);
  let season2d = ("0" + allEpisodes[i].season).slice(-2);
  newOption.textContent=`S${season2d}E${episode2d} - ${allEpisodes[i].name}`;
  // set value property of option
  newOption.value = `S${season2d}E${episode2d}`; 
}
}


//select functionality
const selectElement = document.getElementById("episodeSelector");
selectElement.addEventListener('change', (event) => {
let selected;
selected = allEpisodes.filter( x => `S${("0" + x.season).slice(-2)}E${("0" + x.number).slice(-2)}` === event.target.value );
if (event.target.value==="all"){selected=allEpisodes};
//deletes previous search results
let row=document.getElementById("row");
row.parentNode.removeChild(row);
// creates new boxes for current search results
result=document.getElementById("result");
result.textContent = `Displaying ${selected.length} / ${allEpisodes.length} episode(s)`;
makeBoxes(selected);
});
//end of select functionality

// functions to call on page load
function setup() {
  makePageForEpisodes(allEpisodes);
  makeBoxes(filtered);
  selectFunction();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.classList.add("container-fluid");
  result=document.createElement("p");
  rootElem.appendChild(result);
  result.setAttribute("id","result");
  result.textContent = `Displaying ${episodeList.length} / ${episodeList.length} episode(s)`;
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

window.onload = setup;
