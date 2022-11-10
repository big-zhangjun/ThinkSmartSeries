<template>
  <header class="header" :class="{headBigFont: bigFont, headRtl: rtl}">
    <div class="header-box">
      <img
        class="logo"
        src="@/assets/img/thinksmart_logo.png"
        alt="logo"
        title="thinksmart"
      />
      <nav>
        <ul>
          <li
            tabindex="0"
            :aria-label="item.title"
            v-for="(item, idx) in $t('nav')"
            :key="item.path"
            :data-index="idx"
            class="nav_item"
            @click="handleClick(item, idx)"
            :class="{ active: idx == acitveIndex }"
          >
            {{ item.title }}
          </li>
          <li class="active_bg"></li>
        </ul>
        <div class="langue" @click="show = true">
          <span>{{ $t("language") }}</span>
          <img src="@/assets/img/arrow_down.png" alt="" />
        </div>
      </nav>
    </div>
    <van-popup
      v-model="show"
      :position="position"
      :style="{ height: '100%', width: '3rem' }"
    >
      <!-- <div class="language-list" v-for="item in langunage" :key="item">{{item}}</div> -->
      <ul class="lg">
        <li
          :class="{ acLg: locale == item.path }"
          @click="changeLanguage(item.path)"
          v-for="item in langunage"
          :key="item.path"
        >
          {{ item.title }}
        </li>
      </ul>
    </van-popup>
  </header>
</template>

<script>
import { lg } from "../../../public/i18n/language";
import { handleTabEnter } from "@/utils/handle";
export default {
  mounted() {
    this.$EventBus.$off("change");
    this.$EventBus.$on("change", (v) => {
      this.animateFun(v);
    });
    this.$EventBus.$off("handleRouteClick");
    this.$EventBus.$on("handleRouteClick", (v, i) => {
      i && this.handleClick(v, i);
    });
    if (this.isMobile()) {
      //   this.acitveIndex = localStorage.getItem("index") || 0;
    }
    this.acitveIndex = localStorage.getItem("index") || 0;
    this.init();
    handleTabEnter(".nav_item", (e) => {
      let idx = e.getAttribute("data-index");
      if (idx == null) return;
      let item = this.navList[idx];
      this.handleClick(item, idx);
    });
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.animateFun(this.acitveIndex);
      }, 1000);
    });
    //判断手机横竖屏状态：
    this.orientationchange();
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.orientationchange,
      false
    );
  },
  data() {
    return {
      langunage: lg,
      show: false,
      acitveIndex: 0,
      navList: [
        {
          title: "Home",
          path: "/home",
        },
        {
          title: "MTR",
          path: "/mtr",
        },
        {
          title: "Zoom Rooms",
          path: "/zoom",
          className: "nav_room",
        },
        {
          title: "FAQs",
          path: "/faqs",
        },
        // {
        //   title: "DG",
        //   path: "/dg",
        // },
        // {
        //   title: "HMM",
        //   path: "/hmm",
        // },
      ],
      flag: false,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    bigFont() {
      return ["Russian"].includes(this.$i18n.locale);
    },
    rtl() {
      return ["Arabic", "Hebrew"].includes(this.$i18n.locale);
    },
    position() {
        return ["Arabic", "Hebrew"].includes(this.$i18n.locale) ? "left" : "right"
    }
    
  },
  watch: {
    $route: {
      handler: function () {
        let idx = this.navList.findIndex(
          (item) => item.path == this.$route.path
        );
        localStorage.setItem("index", idx);
        if (!this.flag) {
          this.init();
        }
        this.flag = false;
      },
      // 深度观察监听
      deep: true,
    },
    locale: {
      handler(newV, oldV) {
        if(newV == "Russian" || oldV == "Russian") {
            setTimeout(() => {
                this.animateFun(this.acitveIndex);
            }, 500);
        } else {
            this.$nextTick(()=>{
                this.animateFun(this.acitveIndex);
            })
        }
            
      },
    },
  },
  methods: {
    changeLanguage(item) {
      sessionStorage.setItem("lg", item);
      if (["Arabic", "Hebrew"].includes(item)) {
        window.document.documentElement.dir = "rtl";
      } else {
        window.document.documentElement.dir = "ltl";
      }
      this.$i18n.locale = item;
      this.show = false;
    },
    orientationchange() {
      setTimeout(() => {
        this.animateFun(this.acitveIndex);
      }, 1000);
    },
    //App.vue
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    init() {
      let pathList = ["/home", "/mtr", "/zoom", "/faqs"];
      let idx = pathList.findIndex((item) => item == this.$route.path);
      // this.acitveIndex = localStorage.getItem("index") || 0;
      this.animateFun(idx);
      this.acitveIndex = idx;
      this.flag = false;
    },
    handleClick(item, idx) {
      if (idx == this.acitveIndex) return;
      if (this.navList[idx].path == "/zoom") {
        this.$EventBus.$emit("handleNavClick", this.navList[idx]);
        return;
      }
      localStorage.setItem("path", this.$route.path);
      this.animateFun(idx);
      localStorage.setItem("index", idx);
      this.$emit("handleClick", this.navList[idx]);
      this.$router.push(this.navList[idx].path);
    },
    animateFun(v) {
      this.flag = true;
      // let flag = v > this.acitveIndex ? true : false;
      this.acitveIndex = v;
      // let lastActive = document.querySelector(".active");

      this.$nextTick(() => {
        let active_bg = document.querySelector(".active_bg");
        let active = document.querySelector(".active");
        let ele = document.querySelectorAll(".nav_item")[v];
        let font = parseFloat(window.document.documentElement.style.fontSize);
        console.log(font, active.offsetLeft);
        active_bg.style.width = (ele.clientWidth + 20) / font + "rem";
        active_bg.style.transform = `translate(${
          (active.offsetLeft - 10) / font
        }rem, -50%)`;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 1rem;
  font-size: 0.26rem;
  background-color: #333f48;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.02rem 0.4rem 0 rgba(0, 0, 0, 0.05);
  //   padding: 0 1.07rem 0 1.02rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1000;
  box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.5);
  .header-box {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 11rem;
    margin: 0 auto;
  }
  .lg {
    background-color: #333f48;
    li {
      color: #fff;
      padding: 0.2rem;
      font-size: 0.2rem;
      cursor: pointer;
      font-family: "Aria";
    }
    .acLg {
      color: #57a2f1;
    }
  }
  .logo {
    width: 1.44rem;
    height: 0.4rem;
    margin-right: 1rem;
  }
  nav {
    display: flex;
    align-items: center;
    ul {
      // width: 6.8rem;
      display: flex;
      position: relative;
      li {
        line-height: 0.72rem;
        text-align: center;
        margin: 0.24rem;
        z-index: 2;
        transition: all 0.75s;
        position: relative;
        cursor: pointer;
        transition: all 0.75s;
        box-sizing: border-box;
        // width: 0.65rem;
        padding: 0.1rem;
      }
      .active {
        // width: 1.44rem;
      }
      .active_bg {
        background-color: #161c22;
        border-radius: 0.16rem;
        // width: 1.44rem;
        height: 0.72rem;
        position: absolute;
        left: 0;
        top: 50%;
        transition: all 0.75s;
        transform: translate(0.24rem, -50%);
        z-index: 1;
        margin: 0;
      }
    }
  }
  .langue {
    line-height: 0.45rem;
    padding-left: 0.45rem;
    margin-left: 0.21rem;
    height: 0.45rem;
    border-left: 2px solid #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 0.32rem;
      height: 0.32rem;
      object-fit: scale-down;
      margin: 0 0.16rem;
    }
    span {
      margin-right: 0.29rem;
    }
  }
}
.headBigFont {
    nav {
        ul {
            li {
                font-size: .2rem;
            }
        }
    }
    
}
.headRtl {
    .langue {
        border-left: none;
        border-right: 2px solid #fff;
        padding-left: 0;
        margin-right: .3rem;
    }
    .logo {
        margin-right: 0;
        margin-left: .5rem;
    }
}
// 竖屏
@media screen and (orientation: portrait) {
  .header {
    width: 100vh;
  }
}
// 横屏
@media screen and (orientation: landscape) {
  .header {
    width: 100vw;
  }
}
</style>
