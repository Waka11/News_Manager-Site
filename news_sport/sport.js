let NewsArr = [];
let DataCount = null;

fetch(
  "https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=b235b608bf1149f5af92f46975273b78"
)
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }
    response.json().then(function(data) {
      console.log("NEWS", data);
      NewsArr = data;
      console.log("NEWSARR", NewsArr);
    });
  })
  .catch(function(err) {
    console.log("Fetch Error :-S", err);
  });


  
function LoadSportNews() {
  DataCount = NewsArr.articles.length;
  for (let i = 0; i < DataCount; i++) {
    const div = document.createElement("div");
    div.className = "list-group-item sport-item";
    let title = NewsArr.articles[i].title;
    let content = NewsArr.articles[i].content;
    let urlImage = NewsArr.articles[i].urlToImage;
    let sportImage = "<img src="+urlImage+" alt="+title+">";
    const contentContainer =
      '<span class="sport-content-notvisible"><p class="content" id="i`i`">' + content + "</p>" + sportImage +"</span>";
    if (content == null) {
      content = "";
    }
    div.innerHTML = "<p class='title'>" + title + "</p>" + contentContainer;
    div.setAttribute('title','Click, to open/close');
    document.body.appendChild(div);
    console.log("CIRCLE", [i]);
    div.addEventListener("click",function(){
      if (div.querySelector("span").classList.contains("sport-content-notvisible")) 
      {
        div.querySelector("span").classList.remove("sport-content-notvisible");
        div.querySelector("span").classList.add("sport-content-visible");
        console.log(div.querySelector("img").height);
      }
      else {
        div.querySelector("span").classList.remove("sport-content-visible");
        div.querySelector("span").classList.add("sport-content-notvisible");
      }
    }) 
  }
}

if(DataCount == undefined || DataCount == null){
  const spinner = document.createElement('div');
  spinner.setAttribute('class','spinner');
  spinner.innerHTML = '<div class="spinner-grow" style="width: 150px; height: 150px;" role="status">'+
    '<span class="sr-only">Loading...</span>'+
  '</div>';
  document.body.appendChild(spinner);
  function delSpinner(){
    LoadSportNews();
    spinner.remove();
  }
  setTimeout(delSpinner, 1500);
}
else{
  document.body.removeChild(spinner);
}
