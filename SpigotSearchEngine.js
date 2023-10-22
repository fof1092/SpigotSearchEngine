/*
  The SpigotSearchEngine.js is used to setup The SSE GUI, it will use the SSEGuiManager.js to set up the Gui Checkboxes
*/

let firstClick = true;

let divActionFilterRow = document.getElementsByClassName("actionFilterRow")[0];


/* SSEStatusLoadStatus */

SSEStatus.loadStatus();


/* InputSearchResources */

let inpSearchResources = document.createElement("input");
inpSearchResources.classList.add('InputSearchResources');
inpSearchResources.setAttribute("type", "text");
inpSearchResources.setAttribute("name", "SpigotSearchEngine");
inpSearchResources.setAttribute("placeholder", "Search...");
inpSearchResources.setAttribute("title", "Enter your search and hit enter");
inpSearchResources.setAttribute("value", "");

inpSearchResources.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    bntSearchResources.click();
  }
});

divActionFilterRow.appendChild(inpSearchResources);



/* ButtonSearchResources */

let bntSearchResources = document.createElement("button");
bntSearchResources.classList.add('ButtonSearchResources');

bntSearchResources.onclick = function() {

  /* Check if the String is not empty */
  if (inpSearchResources.value.replace(/\s/g, '').length != 0) {

    if (!bntSearchResources.disabled) {
      bntSearchResources.disabled = true;
      inpSearchResources.readOnly = true;

      /* On FirstClick */

      if (firstClick) {
        ResourceListener.loadRandomResources();

        /* Cosmetic remove */
        document.getElementsByClassName("PageNav")[0].remove();
        document.getElementsByClassName("extraLinks")[0].remove();

        firstClick = false;
      }


      /* Read the imput from the created Search_Resources_Input. */

      let inpSearchResourcesText = inpSearchResources.value;

      bntSearchResources.style.backgroundColor = '#ed8106';
      inpSearchResources.style.backgroundColor = '#f0f0f0';
      inpSearchResources.style.borderColor = '#ed8106';

      ResourceListener.loadResources(inpSearchResourcesText);
    }
  }
};

let tnSearchResources = document.createTextNode("Search Resources");

bntSearchResources.appendChild(tnSearchResources);
divActionFilterRow.appendChild(bntSearchResources);



/* ResourcesFround */

let divResourcesFround = document.createElement("div");
divResourcesFround.classList.add('divResourcesFround');
divResourcesFround.id = 'divResourcesFround';
let tnResourcesFround = document.createTextNode("Resources Found: 0");

divResourcesFround.appendChild(tnResourcesFround);
divActionFilterRow.appendChild(divResourcesFround);



/* Gui Checkboxes */

let divSortBox = document.createElement("div");
divSortBox.id = 'divSortBox';
divActionFilterRow.appendChild(divSortBox);

SSEGuiManager.showSearchOn();
SSEGuiManager.showCategories();
SSEGuiManager.showVersions();
SSEGuiManager.showSearchType();
//SSEGuiManager.showExtras();
SSEGuiManager.showSortByBox();


/* Cosmetic remove */

//document.getElementsByClassName("extraLinks")[0].remove();
