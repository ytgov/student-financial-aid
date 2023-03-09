<template>
  <section>
    <section v-if="formatted_address || modify" class="address">
      <div>
        {{ this.address.second ? this.address.second + "-" : ""
        }}<span v-html="formatted_address.replace(', ', '<br />')"></span>
        <div style="margin-top: 1rem" v-if="!modify">
          <v-btn color="secondary" @click="update()">
            {{ $t("components.address_selector.buttons.edit") }}
          </v-btn>
        </div>
      </div>
    </section>
    <section v-if="!formatted_address || modify">
      <section>
        <!-- <ValidationProvider name="address_zip_postal_code" rules="notrequired" tag="span" v-slot="{ errors, valid }"> -->
          <TextField
            v-model="address.zip_postal_code"
            :label="$t('components.address_selector.labels.zip_postal_code')"
            :errors="errors"
            :valid="valid"
            @blur="geocode()"
          />
        <!-- </ValidationProvider> -->
      </section>
      <section>
        <!-- <ValidationProvider name="address_first" rules="notrequired" tag="span" v-slot="{ errors, valid }"> -->
          <TextField
            v-model="address.first"
            :label="$t('components.address_selector.labels.address_first')"
            :errors="errors"
            :valid="valid"
            @blur="geocode()"
          />
       <!--  </ValidationProvider> -->
      </section>
      <section>
        <TextField
          v-model="address.second"
          :label="$t('components.address_selector.labels.address_second')"
          :valid="true"
        />
      </section>
      <section v-if="address.zip_postal_code">
        <div style="padding-bottom: 17px">
          <strong style="font-weight: bolder">{{ city }}, {{ region }}</strong>
        </div>
      </section>
      <section>
        <v-btn color="secondary" @click="save()">
          {{ $t("components.address_selector.buttons.edit") }}
        </v-btn>
        <p>&nbsp;</p>
      </section>
    </section>
  </section>
</template>

<script>
import TextField from "@/components/forms/TextField.vue";

export default {
  props: ["value"],
  components: {
    TextField
  },
  $_veeValidate: {
    // value getter
    value() {
      return this.full_location;
    },
    // name getter
    name() {
      return "address";
    }
  },
  data() {
    return {
      modify: false,
      address: {
        first: "",
        second: "",
        zip_postal_code: ""
      },
      full_location: false,
      formatted_address: false
    };
  },
  computed: {
    city() {
      var city = _.find(this.full_location.address_components, o => {
        return o.types.indexOf("locality") >= 0;
      });
      return city ? city.long_name : "--";
    },
    region() {
      var region = _.find(this.full_location.address_components, o => {
        return o.types.indexOf("administrative_area_level_1") >= 0;
      });
      return region ? region.long_name : "--";
    }
  },
  watch: {
    full_location(to, from) {
      this.$emit("input", this.full_location.formatted_address);
    }
  },
  mounted() {
    var self = this;

    this.$nextTick(() => {
      if (this.value) {
        this.formatted_address = this.value;
      }
    });
  },
  methods: {
    update() {
      this.modify = true;
    },
    save() {
      this.modify = false;
    },
    geocode() {
      var self = this;
      var query = {
        address: `${this.address.first}, ${this.address.zip_postal_code}`
      };

      console.log("Searching Address", query);

      try {
        var geocoder = new this.$google.maps.Geocoder();
        geocoder.geocode(query, function (result, status) {
          if (status != "OK") {
            console.log("Geocode was not successful for the following reason: ", result, status);
          } else {
            var full_location = result[0];
            var latlng = result[0].geometry.location;
            self.full_location = full_location;
            self.formatted_address = full_location.formatted_address;

            console.log(full_location);
          }
        });
      } catch (error) {
        console.error("Can't use geocode", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
  width: 100%;
  background: #efefef;

  border: solid 1px #ccc;
  margin: 1rem 0;
  margin-bottom: 3rem;

  > div {
    padding: 1rem;
    font-size: 1.1em;
  }
}
</style>
