const app = Vue.createApp({
  el: "#app",
  data() {
    return {
      day: 1,
      isDayNull: false,
      toInteract: false,
      contentLoaded: false,
      daysList: new Array(100).fill(false),
    };
  },

  methods: {
    async findStyleSheet() {
      document.head.getElementsByTagName("link")[0].href = ``;

      await fetch(`day-${this.day}/style.css`)
        .then(async (response) => {
          if (!response.ok) throw new Error("Stylesheet not found");
          else this.isDayNull = false;

          document.head.getElementsByTagName(
            "link"
          )[0].href = `day-${this.day}/style.css`;
          return response.text();
        })
        .then((css) => {
          this.toInteract = css.includes("pointer");
        })
        .catch((err) => {
          document.head.getElementsByTagName("link")[0].href = ``;
          this.toInteract = false;
          console.log("Failed to fetch page: ", err);
          this.isDayNull = true;
        });
    },
    async findHTML() {
      document.getElementById("frame").innerHTML = "";
      await fetch(`day-${this.day}/index.html`)
        .then((response) => {
          if (!response.ok) throw new Error("HTML not found");
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
    async findScript() {
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
    async changeDay() {
      document.querySelector("#frame-container .box").style.width = "100%";
      document.querySelector("#frame-container .box").style.left = "0";
      document.querySelector("#frame-container .box").style.right = "auto";

      [...document.querySelectorAll(".summary button")].forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".day-active").style.display = "none";
      });
      document.querySelector(`.summary button:nth-child(${this.day}) .day-active`).style.display = "";

      this.contentLoaded = false;
      setTimeout(async () => {
        
        document.querySelector(`.summary button:nth-child(${this.day})`).classList.add("active")

        await this.findStyleSheet();
        this.contentLoaded = true;
        this.findHTML();
      }, 300);
    },
    nextDay() {
      document.getElementById("next-day").classList.add("active");
      if (this.day < 100) this.day += 1;
      setTimeout(() => {
        document.getElementById("next-day").classList.remove("active");
      }, 1000);
    },
    previousDay() {
      document.getElementById("previous-day").classList.add("active");
      if (this.day > 1) {
        this.day -= 1;
      }
      setTimeout(() => {
        document.getElementById("previous-day").classList.remove("active");
      }, 1000);
    },
    loadDaysList() {
      for (let i = 1; i <= 100; i++) {
        fetch(`day-${i}/style.css`)
          .then((res) => {
            if (!res.ok) throw Error;
            this.daysList[i - 1] = true;
          })
          .catch((e) => {
            this.daysList[i - 1] = false;
          });
      }
    },
  },
  watch: {
    day() {
      this.changeDay();
    },
    contentLoaded() {
      if (this.contentLoaded) {
        document.querySelector("#frame-container .box").style.width = "0%";
        document.querySelector("#frame-container .box").style.right = "0";
        document.querySelector("#frame-container .box").style.left = "auto";
      }
    },
  },
  mounted() {
    document.getElementById("app").classList.remove("unmounted");

    this.changeDay();
    console.log(this.$g);
    this.loadDaysList();
  },
});
