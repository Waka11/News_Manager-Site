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

    // Examine the text in the response
    response.json().then(function(data) {
      console.log("NEWS",data);
    });
  })
  .catch(function(err) {
    console.log("Fetch Error :-S", err);
  });
