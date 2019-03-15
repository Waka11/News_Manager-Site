fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=aa72480049dc531be9c1bd6fc4d3d1f5"
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
