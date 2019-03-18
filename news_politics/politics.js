let NewsArr = [];
let DataCount = null;

fetch(
  "https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=b235b608bf1149f5af92f46975273b78"
)
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }

    response.json().then(function(data) {
      console.log("NEWS",data);
      NewsArr = data;
      console.log("NEWSARR", NewsArr);
    });
  })
  .catch(function(err) {
    console.log("Fetch Error :-S", err);
  });

function LoadNews() {
  DataCount = NewsArr.articles.length;
  for (let i = 0; i < DataCount; i++) {
    const div = document.createElement("div");
    div.className = "list-group-item news-item";

    let title = NewsArr.articles[i].title;
    let content = NewsArr.articles[i].description;
    let urlImage = NewsArr.articles[i].urlToImage;
    let newsDate = NewsArr.articles[i].publishedAt;

    let year = newsDate.slice(0,4);
    let month = newsDate.slice(5,7);
    let day = newsDate.slice(8,10);
    let time = newsDate.slice(11,19);

    let newsImage = "<img src=" + urlImage + " alt=" + title + " class='img'>";
    const contentContainer =
      '<span class="news-content-notvisible"><span class="content-date"><p class="content" id="i`i`">' + content + "</p><span class='date'><div>"+ "Date: " + day + "."+month+"."+year+"</div>"+"<div>"+"Time: "+time+"</div></span></span>" + newsImage + "</span>";

    if (content == null) {
      content = "";
    }
    div.innerHTML = "<p class='title'>" + title + "</p>" + contentContainer;
    div.setAttribute('title', 'Click, to open/close');
    document.body.appendChild(div);
    console.log("CIRCLE", [i]);
    
    div.addEventListener("click", function () {
      if (div.querySelector("span").classList.contains("news-content-notvisible")) {
        div.querySelector("span").classList.remove("news-content-notvisible");
        div.querySelector("span").classList.add("news-content-visible");
        console.log(day,month,year," ",time);
      }
      else {
        div.querySelector("span").classList.remove("news-content-visible");
        div.querySelector("span").classList.add("news-content-notvisible");
      }
    })
  }
}

if (DataCount == undefined || DataCount == null) {
  const spinner = document.createElement('div');
  spinner.setAttribute('class', 'spinner');
  spinner.innerHTML = '<div class="spinner-grow" style="width: 150px; height: 150px;" role="status">' +
    '<span class="sr-only">Loading...</span>' +
    '</div>';
  document.body.appendChild(spinner);
  function delSpinner() {
    LoadNews();
    spinner.remove();
  }
  setTimeout(delSpinner, 1500);
}
else {
  document.body.removeChild(spinner);
}