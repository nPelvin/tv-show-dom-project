//You can edit ALL of the code here

let allEpisodes = [];
let showID;
let allShows = getAllShows();
let filteredShows = allShows;


function switchToShowView(){
  document.getElementById("row").classList.add("d-none");
  document.getElementById("result").classList.add("d-none");
  document.getElementById("episodeSelector").classList.add("d-none");
  document.getElementById("episodeText").classList.add("d-none");
  document.getElementById("myInput").classList.add("d-none");
  document.getElementById("myShowInput").classList.remove("d-none");
}



function switchToEpisodeView(){
  
  document.getElementById("showRow").classList.add("d-none");
  document.getElementById("result").classList.remove("d-none");
  document.getElementById("episodeSelector").classList.remove("d-none");
  document.getElementById("episodeText").classList.remove("d-none");
  document.getElementById("myInput").classList.remove("d-none");
  document.getElementById("myShowInput").classList.add("d-none");
}

function compare(a, b) {
  // Ignores case
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

allShows.sort(compare);
showID = allShows[0].id;

let selectedShow = allShows[0];

function selectShows(){
 let selectorParent = document.getElementById("showSelector"); //gets show selector from HTML
  selectorParent.innerHTML = ''; //clears shows from show selector
  // creates the top line of select box for viewing all episodes
  let firstOption=document.createElement("option");
  selectorParent.appendChild(firstOption);
  firstOption.textContent=`--- Choose a show ---`;
  firstOption.value = `all`;  
  let secondOption=document.createElement("option");
  selectorParent.appendChild(secondOption);
  secondOption.textContent=`View all shows`;
  secondOption.value = `all`;

for ( i=0; i < filteredShows.length; i++ )
{
 
  let newOption=document.createElement("option");
  selectorParent.appendChild(newOption);
  newOption.textContent=`${filteredShows[i].name}`;
  // set value property of option
  newOption.value = `${filteredShows[i].id}`; 
}
}

//select functionality
const selectShowsEl = document.getElementById("showSelector");
selectShowsEl.addEventListener('change', (event) => {
  if (event.target.value==="all"){location.reload()};
  switchToEpisodeView();
  selectedShow = allShows.filter( x => x.id == event.target.value );
  showID = selectedShow[0].id;

  //deletes previous search results
  let row=document.getElementById("row");
  row.parentNode.removeChild(row);
  // creates new boxes for current search results
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
  .then(response => {return response.json()})
  .then((jsonResponse) => {
    allEpisodes = jsonResponse;
    console.log(allEpisodes);
    filtered = allEpisodes;
    makeBoxes(allEpisodes);
    selectEpisodeFunction();
  }
  )
 .catch((error) => console.log(error));
});


fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
.then(response => {return response.json()})
.then((jsonResponse) => {
  allEpisodes = jsonResponse;
}
)
 .catch((error) => console.log(error));



//sets blank search to default to all Episodes
let filtered=allEpisodes;

function searchFunction() {
  var input, caseNeutral;
  //takes input
  input = document.getElementById('myInput');
  //translates to all upper case
  caseNeutral = input.value.toUpperCase();
  filtered=allEpisodes.filter(x=>x.name.toUpperCase().includes(caseNeutral) || x.summary !== null && x.summary.toUpperCase().includes(caseNeutral));

  //#endregion
  let row=document.getElementById("row");
  //deletes previous search results
  row.parentNode.removeChild(row);

result=document.getElementById("result");
result.textContent = `Displaying ${filtered.length} / ${allEpisodes.length} episode(s)`;

  // creates new boxes for current search results
  makeBoxes(filtered);
}



function searchShowsFunction() {
  var input, caseNeutral;
  //takes input
  input = document.getElementById('myShowInput');
  //translates to all upper case
  caseNeutral = input.value.toUpperCase();
  filteredShows=allShows.filter(x=>x.name.toUpperCase().includes(caseNeutral) || x.summary !== null && x.summary.toUpperCase().includes(caseNeutral) || x.genre !== undefined && x.genre.toUpperCase().includes(caseNeutral));

   //deletes previous search results
  let oldShowRow=document.getElementById("showRow");
  oldShowRow.parentNode.removeChild(oldShowRow);
  selectShows();
//   // creates new boxes for current search results
  makeShowBoxes(filteredShows);
}



function selectEpisodeFunction(){
  
  let selectorParent=document.getElementById("episodeSelector"); //gets episode selector
  selectorParent.innerHTML = ''; //clears old episodes from episode selector
  // creates the top line of select box for viewing all episodes
  let firstOption=document.createElement("option");
  selectorParent.appendChild(firstOption);
  firstOption.textContent=`View all episodes`;
  firstOption.value = `all`; 
    result=document.getElementById("result");
  result.textContent = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episode(s)`;

for (i=0; i<allEpisodes.length; i++)
{
  let newOption=document.createElement("option");
  selectorParent.appendChild(newOption);
  let episode2d = ("0" + allEpisodes[i].number).slice(-2);
  let season2d = ("0" + allEpisodes[i].season).slice(-2);
  newOption.textContent=`S${season2d}E${episode2d} - ${allEpisodes[i].name}`;
  // set value property of option
  newOption.value = `S${season2d}E${episode2d}`; 
}
}


//select episode functionality
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
  makeBoxes(allEpisodes);
  selectEpisodeFunction();
  selectShows();
  switchToShowView();
  makeShowBoxes(allShows);
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

function makeBoxes(array) {
  // defines root location and creates a new Row of boxes
  const newRow = document.createElement("row");
  const rootElem = document.getElementById("root");
  rootElem.appendChild(newRow);
  newRow.classList.add("row");
  newRow.setAttribute("id", "row");
  // loop for every object in array array
  for ( i=0; i<array.length; i++ ){
  // creates and appends newContainer for each iteration to the root
    const newContainer = document.createElement("div");
    newRow.appendChild(newContainer);
  //create two digit strings for episodes and seasons
    let episode2d = ("0" + array[i].number).slice(-2);
    let season2d = ("0" + array[i].season).slice(-2);
  //creates header for each container comprised of Episode name, and season/episode number
    const header = document.createElement("p");
    newContainer.appendChild(header);
    header.textContent = `${array[i].name} - S${season2d}E${episode2d}`;
    header.style.fontWeight = "700";
  // creates and appends newImage for each iteration to the container
    const newDiv= document.createElement("div");
    const newImg= document.createElement("img");
    newContainer.appendChild(newDiv);
    newDiv.appendChild(newImg);
    if (array[i].image !== null){
    newImg.src=`${array[i].image.medium}`};
  // creates and appends newParagraph (summary) for each iteration to the container
    const newP= document.createElement("p");
    newContainer.appendChild(newP);
    
    if (array[i].summary === "" || array[i].summary === null){newP.innerHTML = `No summary available`;}
    else {newP.innerHTML = `${array[i].summary}`;}
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


// show box code

function makeShowBoxes(filtered) {

  // defines root location and creates a new Row of boxes
  var newRow = document.createElement("row");
  const rootElem = document.getElementById("root");
  rootElem.appendChild(newRow);
  newRow.classList.add("row");
  newRow.setAttribute("id", "showRow");

  // loop for every object in filtered array
  for ( i=0; i<filtered.length; i++ ){
    if (filtered[i].id !== 1127){
      // creates and appends newContainer for each iteration to the root
      const newContainer = document.createElement("div");  
      newContainer.setAttribute("id", filtered[i].id);
      newRow.appendChild(newContainer);
      //creates header for each container comprised of Episode name, and season/episode number
      const header = document.createElement("p");
      newContainer.appendChild(header);
      header.textContent = `${filtered[i].name}`;
      header.style.fontWeight = "700";
      // creates and appends newImage for each iteration to the container
      const newDiv= document.createElement("div");
      const newImg= document.createElement("img");
      newContainer.appendChild(newDiv);
      homeShowID=filtered[i].id;
      newContainer.addEventListener("click", function() {
        fetch(`https://api.tvmaze.com/shows/${this.id}/episodes`)
        .then(response => {return response.json()})
        .then((jsonResponse) => {
          allEpisodes = jsonResponse;
          console.log(allEpisodes);
          let showRow=document.getElementById("showRow");
          showRow.parentNode.removeChild(row);
          //hide show list
          document.getElementById("showRow").classList.add("d-none");
          filtered = allEpisodes;
          makeBoxes(allEpisodes);
          selectEpisodeFunction();
          switchToEpisodeView();
          })
      })






    newDiv.appendChild(newImg);
    newImg.src=`${filtered[i].image.medium}`;








  // creates the text
 
    const genres= document.createElement("p");
    newContainer.appendChild(genres);
    genres.innerHTML = `Genres: ${filtered[i].genres}`;
  
    const rating= document.createElement("p");
    newContainer.appendChild(rating);
    rating.innerHTML = `Average rating: ${filtered[i].rating.average}`;
    
    const summary= document.createElement("p");
    newContainer.appendChild(summary);
    if (filtered[i].summary === "" || filtered[i].summary === null){summary.innerHTML = `No summary available`;}
    else {summary.innerHTML = `Summary: ${filtered[i].summary}`;}
    
    const status= document.createElement("p");
    newContainer.appendChild(status);
    status.innerHTML = `Status: ${filtered[i].status}`;

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
}



window.onload = setup;
