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
      document.querySelector("#frame-container .box").style.width = "100%";
      document.querySelector("#frame-container .box").style.left = "0";
      document.querySelector("#frame-container .box").style.right = "auto";
      console.log({ doc: document.querySelector("#frame-container .box") });

      setTimeout(() => {
        fetch(`day-${this.day}/index.html`)
          .then((response) => {
            if (!response.ok) throw Error;
            else this.isDayNull = false;
            return response.text();
          })
          .then((html) => {
            document.getElementById("frame").innerHTML = html;
            document.head.getElementsByTagName(
              "link"
            )[0].href = `day-${this.day}/style.css`;
            document.body.removeChild(document.getElementById("day-script"));
            var newScript = document.createElement("script");
            newScript.id = "day-script";
            newScript.src = `day-${this.day}/index.js`;
            document.body.appendChild(newScript);

            document.querySelector("#frame-container .box").style.width = "0%";
            document.querySelector("#frame-container .box").style.right = "0";
            document.querySelector("#frame-container .box").style.left = "auto";
          })
          .catch((err) => {
            console.log("Failed to fetch page: ", err);
            document.querySelector("#frame-container .box").style.width = "0%";
            document.querySelector("#frame-container .box").style.right = "0";
            document.querySelector("#frame-container .box").style.left = "auto";
            this.isDayNull = true;
            console.log(this.isDayNull);
          });
      }, 300);
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
