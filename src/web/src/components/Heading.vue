<template>
  <section class="heading">
    <section class="limit-width">
      <div class="title">
        <slot></slot>
      </div>
    </section>
  </section>
</template>

<script>
export default {

}
</script>


<style lang="scss" scoped>
section.heading {
  position: relative;
  background: #F1F1F1;
  overflow: hidden;
  > section.limit-width {
    padding: 2rem 0;
    > div.title {
      font-family: 'Montserrat';
      font-size: 32px;
      color: #323232;
      letter-spacing: -0.5px;
      text-align: left;
      line-height: 37px;
      letter-spacing: -0.5px;
    }
  }
  &:after {
    background-image: url('https://yukon.ca/sites/yukon.ca/themes/yukon_wxt/images/Aurora-main.svg');
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



@media only screen and (max-width: 1024px) {
  section.heading {
    padding: 1rem 2rem;
    &:after {
      right: -475px;
    }
  }
}

@media only screen and (max-width: 768px) {
 section.heading {
    display: none;
    padding: 1rem;
  }
}
</style>