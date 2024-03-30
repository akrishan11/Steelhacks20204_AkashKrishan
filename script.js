const urlBreakfastPrefix =
  "https://api.dineoncampus.com/v1/location/610b1f78e82971147c9f8ba5/periods/659daa4d351d53068df67835?platform=0&date=";

const urlLunchPrefix =
  "https://api.dineoncampus.com/v1/location/610b1f78e82971147c9f8ba5/periods/659daa4d351d53068df6783e?platform=0&date=";

const urlDinnerPrefix =
  "https://api.dineoncampus.com/v1/location/610b1f78e82971147c9f8ba5/periods/659daa4d351d53068df67847?platform=0&date=";

async function update() {
  var date = document.getElementById("date").value;

  for (let i = 0; i < 7; i++) {
    const breakfastUrl = urlBreakfastPrefix + date;
    const lunchUrl = urlLunchPrefix + date;
    const dinnerUrl = urlDinnerPrefix + date;

    let breakfast = 0;
    let lunch = 0;
    let dinner = 0;
    console.log(breakfastUrl);

    await fetch(breakfastUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) =>
        data["menu"]["periods"]["categories"].forEach((station) => {
          station["items"].forEach((item) => {
            let isVegan = false;
            let isProtein = false;

            item["filters"].forEach((filter) => {
              if (filter["name"] === "Vegan") {
                isVegan = true;
              }
              if (filter["name"] === "Good Source of Protein") {
                isProtein = true;
              }
            });
            if (isVegan && isProtein) {
              const calories = item["nutrients"][0]["value"];
              const protein = item["nutrients"][1]["value"];

              console.log(protein);
              console.log(calories);

              const ratio = calories / protein;
              if (ratio <= 16) {
                breakfast++;
              }
            }
          });
        })
      );

    await fetch(lunchUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) =>
        data["menu"]["periods"]["categories"].forEach((station) => {
          station["items"].forEach((item) => {
            let isVegan = false;
            let isProtein = false;

            item["filters"].forEach((filter) => {
              if (filter["name"] === "Vegan") {
                isVegan = true;
              }
              if (filter["name"] === "Good Source of Protein") {
                isProtein = true;
              }
            });
            if (isVegan && isProtein) {
              const calories = item["nutrients"][0]["value"];
              const protein = item["nutrients"][1]["value"];

              console.log(protein);
              console.log(calories);

              const ratio = calories / protein;
              if (ratio <= 16) {
                lunch++;
              }
            }
          });
        })
      );

    await fetch(dinnerUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) =>
        data["menu"]["periods"]["categories"].forEach((station) => {
          station["items"].forEach((item) => {
            let isVegan = false;
            let isProtein = false;

            item["filters"].forEach((filter) => {
              if (filter["name"] === "Vegan") {
                isVegan = true;
              }
              if (filter["name"] === "Good Source of Protein") {
                isProtein = true;
              }
            });
            if (isVegan && isProtein) {
              const calories = item["nutrients"][0]["value"];
              const protein = item["nutrients"][1]["value"];

              console.log(protein);
              console.log(calories);

              const ratio = calories / protein;
              if (ratio <= 16) {
                dinner++;
              }
            }
          });
        })
      );

    var canvasElement = document.getElementById("chart" + (i + 1));

    var config = {
      type: "bar",
      data: {
        labels: ["Breakfast", "Lunch", "Dinner"],
        datasets: [
          {
            label: date,
            data: [breakfast, lunch, dinner],
            backgroundColor: ["rgba(75, 220, 192, 0.5)"],
          },
        ],
      },
    };

    var chart = new Chart(canvasElement, config);

    date = incr_date(date);
  }

  console.log(breakfast);
  console.log(lunch);
  console.log(dinner);
}

function incr_date(date_str) {
  var parts = date_str.split("-");
  var dt = new Date(
    parseInt(parts[0], 10), // year
    parseInt(parts[1], 10) - 1, // month (starts with 0)
    parseInt(parts[2], 10) // date
  );
  dt.setDate(dt.getDate() + 1);
  parts[0] = "" + dt.getFullYear();
  parts[1] = "" + (dt.getMonth() + 1);
  if (parts[1].length < 2) {
    parts[1] = "0" + parts[1];
  }
  parts[2] = "" + dt.getDate();
  if (parts[2].length < 2) {
    parts[2] = "0" + parts[2];
  }
  return parts.join("-");
}
