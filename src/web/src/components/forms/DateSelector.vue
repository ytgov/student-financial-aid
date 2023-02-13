<template>
  <div class="control">
    <div class="slot">
      <label>{{label}}</label>
      <span class="selector">
        <span class="year">
          <input type="number" v-model="year" maxlength="4" />
          <small>{{ $t('labels.year') }}</small>
        </span>
        <span class="month">
          <select v-model="month">
            <option :value="(index+1)" v-for="month, index in months">{{month.name}}</option>
          </select> 
          <small>{{ $t('labels.month') }}</small>
        </span>
        <span class="day">
          <input type="number" v-model="day" maxlength="2" />
          <small>{{ $t('labels.day') }}</small>
        </span>
      </span>
    </div>
  </div>
</template>


<script>
export default {
  props: ["value", "label"],
  computed: {
    is_leapyear() {
      return (this.year % 100 === 0) ? (this.year % 400 === 0) : (this.year % 4 === 0);
    },
    output() {
      return new Date(`${this.month} ${this.day} ${this.year}`)
    },
    timestamp() {
      return this.$options.filters.formatTimestamp(this.value)
    }
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      months: [
        {
          name: "January",
          days: 31
        },
        {
          name: "February",
          days: (this.is_leapyear) ? 29 : 28
        },
        {
          name: "March",
          days: 31
        },
        {
          name: "April",
          days: 30
        },
        {
          name: "May",
          days: 31
        },
        {
          name: "June",
          days: 30
        },
        {
          name: "July",
          days: 31
        },
        {
          name: "August",
          days: 31
        },
        {
          name: "September",
          days: 30
        },
        {
          name: "October",
          days: 31
        },
        {
          name: "November",
          days: 30
        },
        {
          name: "December",
          days: 31
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(()=>{  
      if (this.value) {
        
        if (this.timestamp) {
          this.year = new Date(this.timestamp).getFullYear()
          this.month = new Date(this.timestamp).getMonth()+1
          this.day = new Date(this.timestamp).getDate()
        } else {
          this.year = new Date(this.value).getFullYear()
          this.month = new Date(this.value).getMonth()+1
          this.day = new Date(this.value).getDate()
        }
      }
      this.$emit('input', this.output)
    })
  },
  watch: {
    output(to, from) {
      this.$emit('input', this.output)
    },
    day(to, from) {
      if (this.day>this.months[this.month].days) {
        this.day = this.months[this.month].days 
      }
    }
  }
}
</script>


<i18n>
{
  "en": {
    "labels": {
      "year": "Year",
      "month": "Month",
      "day": "Day"
    }
  },
  "fr": {
    "labels": {
      "year": "Année",
      "month": "Mois",
      "day": "Jour"
    }
  }
}
</i18n>



<style lang="scss" scoped>
span.selector {
  margin: 0.25rem 0;
  max-width: 400px;
  width: 100%;
  display: grid;
  grid-template-coulmns: 2fr 2fr 2fr 2fr 2fr 2fr;
  grid-template-rows: auto auto;
  grid-gap: 0.25rem 1rem;
  > span {
    input[type=text],
    input[type=number],
     select {
      width: 100%;
      background: #FFFFFF;
      border-radius: 3px;
      border: 1px solid #D4C7CF !important;
      padding: 0.5rem !important;
    }
    &.year {
      grid-column: 1;
    }
    &.month {
      grid-column: 2/6;
    }
    &.day {
      grid-column: 6;
    }
  }

  .error, .valid {
    margin-top: 1rem;
    padding: 1rem;
  }
  .valid {
    background: #00cc00;
  }
}
</style>

