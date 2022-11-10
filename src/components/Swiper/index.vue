<template>
  <div class="content swipers" :class="className">
    <slot name="title"></slot>
    <div
      class="left btn"
      tabindex="0"
      data-btn="handleLeft"
      aria-label="left-button"
      @click="handleLeft"
      v-show="index != 0"
      v-if="show"
      role="button"
    >
      <img src="@/assets/img/SlideLeft_btn_MTR@2x.png" alt="left_btn" />
    </div>
    <div class="swiper_body">
      <div class="swiper" ref="swiper">
        <slot name="item"></slot>
      </div>
    </div>
    <div
      class="right btn"
      tabindex="0"
      data-btn="handleRight"
      aria-label="right-button"
      v-show="index !== max - 1"
      v-if="show"
      @click="handleRight"
      role="button"
    >
      <img src="@/assets/img/SlideRight_btn_MTR@2x.png" alt="right_btn" />
    </div>
  </div>
</template>

<script>
import { handleTabEnter } from "@/utils/handle";
export default {
  data() {
    return {
      //   分界线,
      startX: 0,
      moveX: 0,
      index: 0,
      flag: true,
      disable: false,
    };
  },
  props: {
    max: {
      type: Number,
      default: 1,
    },
    className: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    active: {
      handler() {
        this.index = 0;
        this.$refs.swiper.style.transform = `translateX(${0}px)`;
      },
    },
    locale: {
      handler() {
        this.index = 0;
        this.$refs.swiper.style.transform = `translateX(${0}px)`;
      },
    },
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    translateX() {
      // 计算图片ul当前距离
      let el = document.querySelectorAll(".slide-item");
      let clientWidth = 0;
      let marginRight = 0;
      el.forEach((ele) => {
        if (ele.clientWidth) clientWidth = ele.clientWidth;
        marginRight = this.getStyle(ele, "marginRight");
      });
      let offsetWidth = clientWidth + parseFloat(marginRight);
      return offsetWidth * this.index;
    },
    translate() {
      return this.flag ? "translateX" : "translateY";
    },
    client() {
      return this.flag ? "clientY" : "clientX";
    },
  },
  mounted() {
    //判断手机横竖屏状态：
    this.orientationchange();
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.orientationchange,
      false
    );
    this.$nextTick(() => {
      handleTabEnter(".swipers .btn", (e) => {
        let type = e.getAttribute("data-btn");
        if (type == null) return;
        if (type == "handleLeft") this.handleLeft();
        if (type == "handleRight") this.handleRight();
        // this[type]()
      });
    });
  },
  methods: {
    orientationchange() {
      if (window.orientation === 180 || window.orientation === 0) {
        this.flag = true;
      }

      if (window.orientation === 90 || window.orientation === -90) {
        this.flag = false;
      }
    },
    touchstart(event) {
      this.startX = Math.floor(event.targetTouches[0][this.client]); // 获取开始触摸位置
    },
    touchmove(event) {
      //   event.preventDefault();
      this.moveX = Math.floor(
        event.targetTouches[0][this.client] - this.startX
      );
      if (this.flag) {
        if (this.moveX < 0 && this.index == this.max - 1) return;
        if (this.moveX > 0 && this.index == 0) return;
      } else {
        if (this.index == 0 && this.moveX > 0) return;
        if (this.index == this.max - 1 && this.moveX < 0) return;
      }
    },
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    },
    touchend() {
      this.disable = true;
      if (this.flag) {
        if (this.moveX < -80 && this.index == this.max - 1) return;
        if (this.moveX > 80 && this.index == 0) return;
      } else {
        if (this.index == 0 && this.moveX > 0) return;
        if (this.index == this.max - 1 && this.moveX < 0) return;
      }

      if (this.moveX > 80) {
        this.index--;
      } else if (this.moveX < -80) {
        this.index++;
      }
      this.$refs.swiper.style.transition = "all 0.75s"; // 展示当前索引图片
      if (["Arabic", "Hebrew"].includes(this.$i18n.locale)) {
        this.$refs.swiper.style.transform = `translateX(${this.translateX}px)`;
      } else {
        this.$refs.swiper.style.transform = `translateX(${-this.translateX}px)`;
      }
      this.moveX = 0;
      setTimeout(() => {
        this.disable = false;
      }, 750);
    },
    handleLeft() {
      if (this.disable) return;
      if (this.index == 0) return;
      this.index--;
      this.touchend();
    },
    handleRight() {
      if (this.disable) return;
      if (this.index >= this.max - 1) return;
      this.index++;
      this.touchend();
    },
  },
};
</script>

<style lang="scss" scoped>
.page2 {
  .swiper_body {
    width: 10rem;
  }
}
.swiper_body {
  overflow: hidden;
  // width: 5.86rem;
  display: flex;
  margin: 0 auto;
  touch-action: pinch-zoom;
  .swiper {
    position: relative;
    display: flex;
    touch-action: pinch-zoom;
    .slide-item {
      margin-right: 0.64rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }
}
.content {
  position: relative;
  // width: 9.1rem;
  margin: 0 auto;
}
.left,
.right {
  position: absolute;
  width: 0.58rem;
  height: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  margin-top: 0.2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.left {
  left: -0.6rem;
}
.right {
  right: -0.6rem;
}
.slide-title {
  font-size: 0.24rem !important;
  margin: 0.3rem 0 0.2rem 0 !important;
}
@media screen and (orientation: portrait) {
  .swiper_body {
    // .slide-item {
    // 	width: 5.86rem;
    // 	height: 3.8rem;
    // }
  }
}

@media screen and (orientation: landscape) {
  .swiper_body {
    // .slide-item {
    // 	width: 5.86rem;
    // 	height: 3.8rem;
    // }
  }
}
</style>
