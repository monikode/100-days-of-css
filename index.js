const app = Vue.createApp({
  el: "#app",
  data() {
    return {
      day: 1,
      isDayNull: false,
    };
  },
  methods: {
    changeDay() {
      fetch(`day-${this.day}/index.html`)
        .then(async function (response) {
          if (!response.ok) throw Error;
          return response.text();
        })
        .then((html) => {
          this.isDayNull = false;
          document.getElementById("frame").innerHTML = html;
          document.head.getElementsByTagName(
            "link"
          )[0].href = `day-${this.day}/style.css`;
          document.body.removeChild(document.getElementById("day-script"));
          var newScript = document.createElement("script");
          newScript.id = "day-script";
          newScript.src = `day-${this.day}/index.js`;
          document.body.appendChild(newScript);
        })
        .catch((err) => {
          console.log("Failed to fetch page: ", err);
          this.isDayNull = true;
          console.log(this.isDayNull);
        });
    },
    nextDay() {
      if (this.day < 100) this.day += 1;
    },
    previousDay() {
      if (this.day > 1) {
        this.day -= 1;
      }
    },
  },
  watch: {
    day() {
      this.changeDay();
    },
  },
  mounted() {
    this.changeDay();
  },
});
