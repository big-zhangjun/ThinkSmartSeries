<template>
  <div class="tablist" :class="{ bigFont }">
    <ul class="tabcontent" role="tablist">
      <li
        role="tab"
        :tabindex="idx == 0 ? 0 : -1"
        :data-tab="idx"
        v-for="(item, idx) in list"
        :key="item"
        class="tabs"
        :aria-selected="tabIndex == idx"
        @click="handleClick(item, idx)"
        :class="{ tabactive: tabIndex == idx }"
      >
        {{ item }}
      </li>
    </ul>
    <div class="tabbsLine"></div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      offsetX: 0,
      tabIndex: 0,
    };
  },
  watch: {
    locale: {
      handler() {
        this.handleClick(null, 0);
      },
    },
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    bigFont() {
      return [
        "Bulgarian",
        "Dutch",
        "Greek",
        "Italian",
        "Polish",
        "Romanian",
        "Russian",
        "Slovenian",
        "Spanish",
        "Turkish",
        "Ukrainian",
        "French",
        "HU",
        "PT",
        "PTBR",
        "SRLATN",
        "German",
      ].includes(this.$i18n.locale);
    },
  },
  mounted() {
    setTimeout(() => {
      this.handleClick(null, 0);
    }, 60);
    let tabs = document.querySelectorAll(".tabcontent .tabs");
    let index = 0;
    window.addEventListener("keydown", (event) => {
      var ev = event || window.event;
      switch (ev.keyCode) {
        case 37:
        case 100:
          if (index == 0) return;
          index--;
          tabs[index].focus();
          break;
        case 38:
        case 104:
          break;
        case 39:
        case 102:
          if (index == tabs.length - 1) index = 0;
          index++;
          tabs[index].focus();
          break;
        case 40:
        case 98:
          break;
        default:
          break;
      }
    });
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
      setTimeout(() => {
        this.handleClick(null, this.tabIndex);
      }, 60);
    },
    handleClick(item, idx) {
      this.tabIndex = idx;
      this.$nextTick(() => {
        let tabLine = document.querySelector(".tabbsLine");
        let tabactive = document.querySelector(".tabactive");
        let tabcontent = document.querySelector(".tabcontent");
        console.log(this.$i18n.locale);
        let offsetX = 0;
        if (["Arabic", "Hebrew"].includes(this.$i18n.locale)) {
          offsetX = -(
            tabcontent.clientWidth -
            tabactive.offsetLeft -
            tabactive.clientWidth / 2 -
            tabLine.clientWidth / 2
          );
        } else {
          offsetX =
            tabactive.offsetLeft +
            tabactive.clientWidth / 2 -
            tabLine.clientWidth / 2;
        }
        tabLine.style.transform = `translate(${offsetX}px, 0)`;
        console.log(offsetX, "offsetX");
      });
      this.$emit("handleTab", idx);
    },
  },
};
</script>

<style lang="scss" scoped>
.tablist {
  font-size: 0.26rem;
  margin: 0 auto;
  color: #999;
  margin-top: 0.5rem;
  max-width: 11rem;
  position: relative;
  .tabcontent {
    display: flex;
    align-items: center;
    max-width: 11rem;
    padding-bottom: 0.14rem;
    border-bottom: 0.02rem solid #999;
    position: relative;
    justify-content: space-around;
  }
  .tabs {
    // margin: 0 0.3rem;
    cursor: pointer;
    text-align: center;
  }
  .tabactive {
    color: #6388a5;
    font-weight: 500;
  }
  .tabbsLine {
    width: 1rem;
    height: 0.14rem;
    background-color: #6388a5;
    position: absolute;
    bottom: -0.08rem;
    transition: all 0.5s;
  }
}
.zoom {
  .tabcontent {
    padding: 0 0.5rem 0.14rem 0.5rem;
  }
  .tablist {
    margin-top: 0.4rem;
  }
  .tabbsLine {
    width: 1.8rem;
  }
}
.bigFont {
  max-width: 14rem;
  font-size: 0.22rem;
  .tabcontent {
    max-width: 14rem;
  }
}
</style>
