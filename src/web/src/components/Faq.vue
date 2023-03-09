<template>
  <section data-section="faq">
    <header>
      <h2>{{ $t("components.faq.title") }}</h2>
      <nuxt-link to="/faq">More FAQ</nuxt-link>
    </header>
    <section>
      <div v-for="(faq, index) in faqs" :class="selected == index ? 'open' : ''">
        <div class="question" @click="toggle(index)">
          {{ faq.question }}
        </div>
        <div class="answer" v-html="faq.answer"></div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: ["faqs"],
  data() {
    return {
      selected: false
    };
  },
  methods: {
    toggle(selected) {
      this.selected = selected;
    }
  }
};
</script>

<style lang="scss" scoped>
section[data-section="faq"] {
  > header {
    display: flex;
    padding: 1rem 0;
    > h2 {
      font-family: "Montserrat";
      font-size: 22px;
      color: #323232;
      letter-spacing: -0.3px;
      text-align: left;
      line-height: 24px;
    }
    > a {
      text-align: right;
      font-family: "Montserrat";
      font-weight: bold;
      font-size: 16px;
      color: #00818f;
      letter-spacing: -0.4px;
    }
    > * {
      width: 100%;
    }
  }
  > section {
    > div {
      border-top: solid 1px #ccc;
      padding: 1rem 0;
      &:last-of-type {
        border-bottom: solid 1px #ccc;
      }
      > div {
        &.question {
          position: relative;
          font-weight: bold;
          font-size: 18px;
          line-height: 1.8;

          font-family: "Montserrat";
          color: #323232;
          letter-spacing: -0.5px;
          line-height: 26px;

          &:hover {
            cursor: pointer;
          }
          &::before {
            position: absolute;
            top: 0.4em;
            right: 0.15em;

            border-style: solid;
            border-width: 0.25em 0.25em 0 0;
            content: "";
            display: inline-block;
            height: 0.6em;

            transform: rotate(45deg);
            vertical-align: top;
            width: 0.6em;

            color: #00818f;
          }
        }
        &.answer {
          height: 0;
          opacity: 0;

          font-family: "Montserrat";
          font-weight: normal;
          font-size: 16px;
          color: #323232;
          letter-spacing: -0.3px;
          text-align: left;
          line-height: 26px;
          width: 96%;
        }
      }

      &.open {
        > div.question {
          &::before {
            transform: rotate(135deg);
          }
        }
        > div.answer {
          opacity: 1;
          height: auto;
          margin-top: 1rem;
        }
      }
    }
  }
}
</style>
