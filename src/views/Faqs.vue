<template>
  <section class="faqs" :class="{ flag }">
    <div ref="wrapper" v-if="!flag" class="wrapper">
      <div :class="{ scroll: !flag }">
        <h1>{{ $t("faqs.title") }}</h1>
        <p class="info">
          {{ $t("faqs.content1") }}
          <a href="https://smartsupport.lenovo.com/">{{
            $t("faqs.content2")
          }}</a
          >{{ $t("faqs.content3") }}
          <a href="https://lenovosmartofficeservices.com/support">{{
            $t("faqs.content4")
          }}</a
          >.
        </p>
        <van-collapse v-model="activeNames">
          <van-collapse-item
            :name="item.title"
            v-for="(item, idx) in $t('faqs.faqsList')"
            :key="item.title"
          >
            <template #title>
              <div
                :tabindex="idx == 0 ? 0 : -1"
                :data-message="item"
                class="title"
              >
                <span class="round"></span> {{ item.title }}
              </div>
            </template>
            <template #right-icon>
              <img
                src="@/assets/img/jian.png"
                alt="icon"
                title="open"
                v-if="activeNames.includes(item.title)"
              />
              <img src="@/assets/img/add.png" alt="icon" title="close" v-else />
            </template>
            <div v-for="(_item, _idx) in item.content" :key="_idx">
              <div v-html="_item"></div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <div v-if="flag">
      <h1>{{ $t("faqs.title") }}</h1>
      <p class="info">
        {{ $t("faqs.content1") }}
        <a href="https://smartsupport.lenovo.com/">{{ $t("faqs.content2") }}</a
        >{{ $t("faqs.content3") }}
        <a href="https://lenovosmartofficeservices.com/support">{{
          $t("faqs.content4")
        }}</a
        >.
      </p>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          :name="item.title"
          v-for="(item, idx) in $t('faqs.faqsList')"
          :key="item.title"
        >
          <template #title>
            <div
              :tabindex="idx == 0 ? 0 : -1"
              :data-message="item"
              class="title"
            >
              <span class="round"></span> {{ item.title }}
            </div>
          </template>
          <template #right-icon>
            <img
              src="@/assets/img/jian.png"
              alt="icon"
              title="open"
              v-if="activeNames.includes(item.title)"
            />
            <img src="@/assets/img/add.png" alt="icon" title="close" v-else />
          </template>
          <div v-for="(_item, _idx) in item.content" :key="_idx">
            <div v-html="_item"></div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <Footer></Footer>
  </section>
</template>

<script>
import { handleTabEnter } from "../utils/handle";
import Footer from "../components/Footer/index.vue";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      index: 0,
      list: ["About MTR", "About ZOOM", "About System"],
      activeNames: [],
      active: 0,
      domList: [],
      flag: true,
      scroll: null,
    };
  },
  watch: {
    activeNames() {
      let wrapper = document.querySelector(".wrapper");
      this.$nextTick(() => {
        setTimeout(() => {
          let h = wrapper.clientHeight + "px";
          wrapper.style.height = h;
          this.scroll.refresh();
        }, 500);
      });
    },
  },
  mounted() {
    handleTabEnter(".van-cell__title .title", this.handleClick);
    this.domList = document.querySelectorAll(".van-cell__title div");
    this.handleKeyUp();
    //判断手机横竖屏状态：
    this.orientationchange();
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.orientationchange,
      false
    );
  },
  methods: {
    orientationchange() {
      if (window.orientation === 180 || window.orientation === 0) {
        this.flag = true;
      }

      if (window.orientation === 90 || window.orientation === -90) {
        this.flag = false;
        setTimeout(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
          });
        }, 100);
      }
    },
    handleKeyUp() {
      window.addEventListener("keydown", (event) => {
        var ev = event || window.event;
        this.domList = document.querySelectorAll(".van-cell__title div");
        switch (ev.keyCode) {
          case 37:
          case 100:
            console.log("左");
            break;
          case 38:
          case 104:
            console.log(this.index);
            if (this.index == 0) return;
            this.index--;
            this.domList[this.index].focus();
            console.log("上");
            break;
          case 39:
          case 102:
            console.log("右");
            break;
          case 40:
          case 98:
            console.log(this.index);
            if (this.index == this.domList.length - 1) return;
            this.index++;
            this.domList[this.index].focus();
            break;
          default:
            break;
        }
      });
    },
    handleClick(e) {
      let dataMessage = e.getAttribute("data-message");
      if (dataMessage != null) {
        this.activeNames = [dataMessage];
      }
      let idx = e.getAttribute("data-faqtab");
      if (idx == null) return;
      this.handleClickTab(idx);
    },
    handleClickTab(idx) {
      this.domList = document.querySelectorAll(".van-cell__title div");
      this.index = 0;
      this.active = idx;
    },
  },
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.faqs {
  background: url("~@/assets/img/MTR_1.png") no-repeat center;
  background-size: cover;
  padding-bottom: 2rem;
  overflow: hidden;
  .scroll {
    // pointer-events: none;
    min-height: 100vh;
  }
  .wrapper {
    overflow: hidden;
  }

  h1 {
    font-size: 0.3rem;
    color: #1c1c1e;
    text-align: center;
    padding: 0.48rem 0 0.24rem 0;
  }
  p {
    width: 11rem;
    margin: 0 auto;
    margin-bottom: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.2rem;
    white-space: pre-wrap;
  }
  a {
    color: #228eff;
  }
  .tablist {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.32rem;
    li {
      width: 2.8rem;
      line-height: 0.74rem;
      box-sizing: border-box;
      text-align: center;
      border: solid 3px #6388a5;
      margin: 0 0.24rem;
      border-radius: 0.1rem;
      font-size: 0.22rem;
      color: #6388a5;
    }
    .active {
      background-color: #6388a5;
      color: #fff;
    }
  }
}
.flag {
  overflow: scroll;
}
@media screen and (orientation: portrait) {
  .faqs {
    width: 100vh;
    height: calc(100vw - 1.6rem);
    .wrapper {
      width: 100vh;
      height: calc(100vw - 1.6rem);
    }
    .swiper-slide {
      height: calc(100vw - 1rem);
    }
  }
}

@media screen and (orientation: landscape) {
  .faqs {
    width: 100vw;
    height: calc(100vh - 1.6rem);
    .wrapper {
      width: 100vw;
      height: calc(100vh - 1.6rem);
    }
    .swiper-slide {
      height: calc(100vh - 1rem);
    }
  }
}
</style>
<style lang="scss">
.van-collapse-item--border::after {
  display: none;
}
a {
  color: #228eff;
}
p {
  line-height: 0.4rem;
}
.van-collapse {
  width: 11rem;
  margin: 0 auto;
  padding-bottom: 2.4rem;
}
.van-collapse-item {
  border-radius: 0.1rem;
  overflow: hidden;
  margin-bottom: 0.16rem;
  box-shadow: 0.02rem 0.04rem 0.06rem 0.01rem rgba(112, 126, 154, 0.5);
  .van-cell {
    padding: 0 0.24rem;
  }
  .van-cell__title {
    line-height: 0.8rem;
    height: 0.8rem;
    font-size: 0.2rem;
    color: #1c1c1e;
  }
  img {
    width: 0.34rem;
    height: 0.34rem;
    margin-top: 0.23rem;
  }
  .right-img {
    margin-top: 0;
    margin-bottom: -0.1rem;
  }
  .van-collapse-item__content {
    font-size: 0.16rem;
    color: #1c1c1e;
    padding: 0.2rem;
    padding-top: 0;
  }
  .round {
    width: 0.18rem;
    height: 0.18rem;
    background-color: #333f48;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.16rem;
  }
  .van-cell::after {
    border-bottom: none;
  }
}
.flag {
  // height: calc(100vh - 1.66rem);
}
</style>
