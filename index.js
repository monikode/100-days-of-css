const app = Vue.createApp({
  el: "#app",
  data() {
    return {
      day: 1,
      isDayNull: false,
    };
  },
  methods: {
    async findStyleSheet() {
      await fetch(`day-${this.day}/style.css`)
        .then((response) => {
          if (!response.ok) throw Error;
          else this.isDayNull = false;

          document.head.getElementsByTagName(
            "link"
          )[0].href = `day-${this.day}/style.css`;
          this.findHTML();
        })
        .catch((err) => {
          document.head.getElementsByTagName("link")[0].href = ``;

          console.log("Failed to fetch page: ", err);
          this.isDayNull = true;
        });
    },
    async findHTML() {
      await fetch(`day-${this.day}/index.html`)
        .then((response) => {
          if (!response.ok) throw Error;
          else this.isDayNull = false;
          return response.text();
        })
        .then((html) => {
          document.getElementById("frame").innerHTML = html;
          this.findScript();
        })
        .catch((err) => {
          this.isDayNull = true;
        });
    },
    findScript() {
      fetch(`day-${this.day}/index.js`)
        .then((response) => {
          if (!response.ok) throw Error;
          if (document.getElementById("day-script"))
            document.body.removeChild(document.getElementById("day-script"));
          var newScript = document.createElement("script");
          newScript.id = "day-script";
          newScript.src = `day-${this.day}/index.js`;
          document.body.appendChild(newScript);
        })
        .catch((err) => {
          if (document.getElementById("day-script"))
            document.body.removeChild(document.getElementById("day-script"));
        });
    },
    changeDay() {
      document.querySelector("#frame-container .box").style.width = "100%";
      document.querySelector("#frame-container .box").style.left = "0";
      document.querySelector("#frame-container .box").style.right = "auto";

      setTimeout(async () => {
        await this.findStyleSheet();
        document.querySelector("#frame-container .box").style.width = "0%";
        document.querySelector("#frame-container .box").style.right = "0";
        document.querySelector("#frame-container .box").style.left = "auto";
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
