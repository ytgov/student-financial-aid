<template>
  <article v-if="is_open">
    <section>
      <div class="title" v-if="text">{{text}}</div>
      <div class="message" v-if="message">{{message}}</div>
      <section class="buttons">
        <v-btn @click="option.callback(); close()" v-for="option, index in options" :key="index">
          {{option.text}}
        </v-btn>
      </section>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      is_open: false,
      timeout: false,
      text: false,
      message: false,
      error_message: false,
      options: false
    }
  },
  methods: {
    close() {
      this.is_open = false
    },
    open(values) {
      var self = this
      
      this.is_open = true
      if (values.text) {
        this.text = values.text
      }
      if (values.message) {
        this.message = values.message
      }

      if (values.timeout) {
        setTimeout(()=>{
          self.close()
        }, (self.timeout) ? 2000 : 0) 
        this.timeout = values.timeout
      }

      if (values.options) {
        this.options = values.options
      }
    },
    error(values) {
      this.open({
        ...values,
        options: [
          {
            text: 'close',
            callback: () => {
              this.close()
            }
          }
        ]
      })
    }
  }
}
</script>


<style lang="scss" scoped>
article {
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0,0,0,0.9);

  > section {
    color: #fff;
    > div.title {
      font-size: 2em !important;
      font-weight: 500;
      max-width: 550px;
    }

    > div.message {
      font-size: 1.5em !important;
      font-weight: 100;
      max-width: 550px;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }

 
    > section.buttons {
      margin-top: 1rem;
      > a, > button {

        &:hover {
          cursor: pointer;
          background: #fff;
          color: #000;
        }
        margin-right: 1rem;
      }
    }
  }

}
</style>

