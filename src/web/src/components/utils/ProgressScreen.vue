<template>
  <div class="overlay" v-if="progress">
    <div class="progress-wrap progress">
      <div class="text">
         UPLOADING {{progress}}% Complete
      </div>
      <div class="progress-bar progress" :style="`width: ${progress}%;`">
         
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

div.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 9999;

  background: rgba(0,0,0,0.9);

  > div.progress-wrap {
    border: solid 1px rgb(64,179,145);
    position: absolute;

    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    width: 50%;
    overflow: hidden;

    
    > div {
      position: relative;
      

      &.text {
        text-align: center;
        font-size: 20px;
        font-weight: 100;
        white-space: nowrap;
        width: 100%;
        padding: 20px;
        z-index: 100;
        color: #fff;

        @media only screen and (max-width:640px)  {
          font-size: 12px;
        }
      }

      &.progress-bar {
        position: absolute;
        top: 0;
        bottom: 0;
        background: rgb(64,179,145);
        background: linear-gradient(90deg, rgba(64,179,145,1) 15%, rgba(7,157,120,1) 85%);
        width: 0%;

        transition: all 1s ease-in-out;
        -webkit-transition: all 1s ease-in-out;
        -moz-transition: all 1s ease-in-out;
        -o-transition: all 1s ease-in-out;

      }
    }
  }
}


</style>

<script>

export default {
  props: ["progress"],
  watch: {
    progress(form, to) {
      if (to===100) {
        this.progress = false;
      }
    }
  }
}
</script>