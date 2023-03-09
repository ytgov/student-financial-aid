<template>
  <footer>
    <section data-section="brand">
      <section class="limit-width">
        <section>
          <img src="/images/footer-logo.svg" />
        </section>
      </section>
    </section>
    <section data-section="menu">
      <section class="limit-width">
        <section>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Documents</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Forms</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Places</a></li>
            </ul>
            <ul>
              <li><a href="#">Government of Yukon</a></li>
              <li><a href="#">Copyright</a></li>
              <li><a href="#">Disclaimer</a></li>
              <li><a href="#">Privacy statement</a></li>
            </ul>
          </nav>
        </section>
        <section>&copy; {{ year }} <a href="https://yukon.ca/" target="_blank">Government of Yukon</a></section>
      </section>
    </section>
  </footer>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  background-color: #0b3442;
  color: #fff;
  padding: 0;
  margin: 0;

  a {
    &:link,
    &:visited,
    &:active {
      color: #fff;
      text-decoration: underline;
    }
  }
  > section {
    > section.limit-width {
      display: flex;
      align-items: center;
      padding: 3rem 0;
    }
    &[data-section="brand"] {
      overflow: hidden;
      background-color: #0d3e4f;
      &:after {
        background-image: url("https://yukon.ca/sites/yukon.ca/themes/yukon_wxt/images/Aurora-main.svg");
        background-repeat: no-repeat;
        background-size: 100%;
        box-sizing: border-box;
        content: "";
        display: block;
        height: 200px;
        position: absolute;
        right: -190.594px;
        top: 0px;
        width: 667.094px;
      }
    }
    &[data-section="menu"] {
      > section.limit-width {
        > section {
          width: 100%;
          &:nth-of-type(1) {
            line-height: 1.7;

            nav {
              display: flex;
              > ul {
                width: 100%;
                list-style: none;
                margin: 0;
                padding: 0;
              }
            }
            a {
              &:link,
              &:visited,
              &:active {
                font-size: 16px;
                font-weight: 500;
              }
            }
          }
          &:nth-of-type(2) {
            text-align: right;
            align-self: end;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  footer {
    > section {
      > section.limit-width {
        padding: 3rem 2rem;
      }
      &[data-section="brand"] {
        position: relative;
        &:after {
          right: -325px;
        }
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  footer {
    > section {
      > section.limit-width {
        display: block;
        padding: 2rem 1rem;
      }
      &[data-section="menu"] {
        > section.limit-width {
          > section {
            &:nth-of-type(1) {
              nav {
                display: block;
              }
            }
            &:nth-of-type(2) {
              text-align: left;
              align-self: end;
              padding-top: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>
