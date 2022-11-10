<template>
  <main id="app" :class="{noFont}">
    <img
      class="loading"
      :src="imgSrc"
      alt="loading"
      title="loading"
      v-if="loading && isWX"
    />
    <span v-if="loading" :class="{ fadeIn: fadeIn }" class="loading-text">{{
      $t("loading")
    }}</span>
    <video
      v-if="loading && !isWX"
      muted
      id="audios"
      class="video"
      autoplay="autoplay"
      x-webkit-airplay="allow"
      webkit-playsinline="true"
      playsinline="true"
      x5-video-player-type="h5-page"
      preload="auto"
      height="100%"
    >
      <track kind="captions" />
      <source src="@/assets/video/loading2.mp4" type="video/mp4" />
    </video>
    <headers @handleClick="handleClick" v-if="!loading"></headers>
    <section class="aniMtr" :class="{ fadeMove: animate, fadeOut: animateEnd }">
      <img :src="ani.src" :alt="ani.title" title="ani.title" />
      <span>{{ ani.title }}</span>
    </section>
    <router-view :class="{ isLoading: loading }"></router-view>
  </main>
</template>

<script>
import headers from "./components/Header";
export default {
  name: "App",
  data() {
    return {
      transitionName: "",
      animate: false,
      loading: true,
      imgSrc: require(`@/assets/img/loading2.gif`),
      list: [
        {
          title: "Microsoft Teams Rooms",
          path: "/mtr",
          src: require("./assets/img/MTR.png"),
        },
        {
          title: "ZOOM",
          path: "/zoom",
          src: require("./assets/img/ZOOM.png"),
        },
      ],
      ani: {
        src: "",
        title: "",
      },
      animateEnd: false,
      orientation: false,
      isWX: false,
      fadeIn: false,
    };
  },
  components: {
    headers,
  },
  created() {
    if (sessionStorage.getItem("lg")) {
      this.$i18n.locale = sessionStorage.getItem("lg");
    }
    if (["Arabic", "Hebrew"].includes(this.$i18n.locale)) {
      window.document.documentElement.dir = "rtl";
    } else {
      window.document.documentElement.dir = "ltl";
    }
    this.$EventBus.$on("handleRouteChange", (v) => {
      let idx = this.list.findIndex((ele) => ele.path == v);
      this.ani = this.list[idx];
      this.ani.title = this.$t("home.nav")[idx];
      this.animate = true;
      setTimeout(() => {
        this.animateEnd = true;
      }, 750);
      setTimeout(() => {
        this.animateEnd = false;
        this.animate = false;
      }, 1000);
    });
    this.init();
  },
  mounted() {
    this.isWeixin();
    document.addEventListener("WeixinJSBridgeReady", function () {
      document.getElementById("audios").play();
    });
    //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
    document.addEventListener("touchstart", function () {
      if (document.getElementById("audios")) {
        document.getElementById("audios").play();
      }
    });
    var elevideo = document.getElementById("audios");
    if (!this.isWX) {
      elevideo.addEventListener("play", () => {
        setTimeout(() => {
          this.fadeIn = true;
        }, 3000);
      });
      elevideo.addEventListener("ended", () => {
        // this.fadeIn = false
      });
    } else {
      setTimeout(() => {
        this.fadeIn = true;
      }, 3000);
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    }
    setTimeout(() => {
      this.loading = false;
    }, 6000);
  },
  computed: {
    noFont() {
      return ["Slovenian", "Czech", "Greek", "Croatian", "Slovak", "Turkish", "SRLATN", "Russian", "Slovak", "TChinese", "SChinese"].includes(this.$i18n.locale);
    },
  },
  methods: {
    isWeixin() {
      let user = navigator.userAgent.toLowerCase();
      if (user.match(/MicroMessenger/i) == "micromessenger") {
        this.isWX = true;
      } else {
        this.isWX = false;
      }
    },
    handleClick() {},
    init() {
      this.forceLandscapeScreenHandle();
      // 这里监控
      this.onWindowSizeChanged();
    },
    forceLandscapeScreenHandle() {
      const body = document.getElementsByTagName("body")[0];
      const html = document.getElementsByTagName("html")[0];
      const width = html.clientWidth;
      const height = html.clientHeight;
      const max = width > height ? width : height;
      const min = width > height ? height : width;
      body.style.width = max + "px";
      body.style.height = min + "px";
    },

    onWindowSizeChanged() {
      window.addEventListener("resize", this.forceLandscapeScreenHandle);
    },
  },
  // beforeDestroy 废弃，使用 beforeUnmount
  beforeUnmount() {},
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
//   unicode-bidi: bidi-override; 
}
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // direction:rtl;
}
.noFont {
  font-family: "Aria";
}
@supports (padding-bottom: env(safe-area-inset-bottom)) {
    .bottom-bar {
      padding-bottom: constant( safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
body {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1001;
  }
  .video {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1001;
  }
}
.isLoading {
  opacity: 0;
}
@media screen and (orientation: portrait) {
  body {
    transform-origin: 0 0;
    transform: rotateZ(90deg) translateY(-100%);
  }
  .aniMtr {
    width: 100vh;
    height: calc(100vw - 1rem);
  }
}

@media screen and (orientation: landscape) {
  .aniMtr {
    width: 100vw;
    height: calc(100vh - 1rem);
  }
}
.aniMtr {
  background-color: #6388a5;
  position: absolute;
  left: 0;
  color: #fff;
  font-size: 0.26rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 100vh;
  img {
    width: 1.06rem;
    height: 1.06rem;
    object-fit: cover;
    margin-bottom: 0.24rem;
  }
}
.fadeMove {
  animation: fadeMove 0.75s ease-in-out;
  animation-fill-mode: forwards;
  z-index: 10 !important;
}
.fadeOut {
  animation: fadeOut 0.25s ease-in-out;
  z-index: 10 !important;
}
.fadeIn {
  animation: fadeIn 0.5s ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes fadeMove {
  0% {
    top: 100vh;
  }
  100% {
    top: 1rem;
  }
}
@keyframes fadeOut {
  0% {
    top: 1rem;
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 1rem;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.loading-text {
  z-index: 99999;
  position: fixed;
  text-align: center;
  font-size: 0.26rem;
  bottom: 2.6rem;
  left: 50%;
  letter-spacing: -0.01rem;
  opacity: 0;
  transform: translateX(-50%);
}
</style>
