class SSEStatus {

  /*
    The status display is used to report problems with the search.
  */

  static loadStatus() {
    fetch('https://fof1092.de/Plugins/SSE/status.php')
     .then(
       function(response) {
         if (response.status !== 200) {
           console.log('[SpigotMCSearchEngine] loadStatus - Error, Status Code: ' + response.status);
           SSEStatus.displayStatus('Something unexpected has happened, please send me a message! @F_o_F_1092', '#ef1c1c');
           return;
         }

         response.json().then(function(data) {
           if (data['text'] != "null") {
             SSEStatus.displayStatus(data['text'], data['color']);
           }
         });

       }
     )
     .catch(function(err) {
       console.log('[SpigotMCSearchEngine] loadStatus - Fetching Error: ', err);
       SSEStatus.displayStatus('Something unexpected has happened, please send me a message! @F_o_F_1092', '#ef1c1c');
     });
  }


  /* displayStatus */

  static displayStatus(text, color) {
    let divActionFilterRow = document.getElementsByClassName("actionFilterRow")[0];

    let divInfoBox = document.createElement("div");
    divInfoBox.classList.add('infoBox')

    divInfoBox.style.background = color;
    let infoBoxText = document.createTextNode(text);
    divInfoBox.appendChild(infoBoxText);

    divActionFilterRow.insertBefore(divInfoBox, divActionFilterRow.firstChild);
  }


}
