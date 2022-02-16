const app = Vue.createApp({
  el: "#app",
  data() {
    return {
      day: 0,
    };
  },
  watch: {
    day() {
      document.head.getElementsByTagName(
        "link"
      )[0].href = `day-${this.day}/style.css`;

      fetch(`day-${this.day}/index.html`)
        .then(function (response) {
          // When the page is loaded convert it to text
          return response.text();
        })
        .then(function (html) {
          document.getElementById("frame").innerHTML = html;
        })
        .catch(function (err) {
          console.log("Failed to fetch page: ", err);
        });

      document.body.removeChild(document.getElementById("day-script"));
      var newScript = document.createElement("script");
      newScript.id = "day-script";
      newScript.src = `day-${this.day}/index.js`;
      document.body.appendChild(newScript);
    },
  },
});
