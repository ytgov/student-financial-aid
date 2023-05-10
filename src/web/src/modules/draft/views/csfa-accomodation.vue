<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.csfa_accommodation.legends.csfa-accomodation") }}</h3>
      <p>
        {{ $t("application.onboarding.csfa_accommodation.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody v-for="(item, key) in this.application.draft.csfa_accomodation.accomodations">
            <tr>
              <td colspan="4">
                <h3>{{ item.heading }}</h3>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                {{ item.note }}
              </td>
            </tr>
            <tr>
              <td colspan="6" class="checkboxes">
                <div>
                  <label
                    ><input type="radio" value="Living at Parents" v-model="item.values.living" /> Living at
                    Parents</label
                  >
                  <label><input type="radio" value="Living on Own" v-model="item.values.living" /> Living on Own</label>
                  <label><input type="radio" value="Both" v-model="item.values.living" /> Both</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <input type="text" placeholder="" />
              </td>
              <td>Province</td>
              <td>
                <input type="text" placeholder="" />
              </td>
            </tr>
            <tr class="checkbox" v-if="['Living at Parents', 'Both'].includes(item.values.living)">
              <td colspan="3">Amount of Rent paid to parents</td>
              <td>
                <input type="text" v-model="item.values.rent_to_parents" placeholder="0.00" />
              </td>
            </tr>
            <tr class="checkbox" v-if="['Living on Own', 'Both'].includes(item.values.living)">
              <td colspan="3">I own my own home</td>
              <td>
                <input type="checkbox" v-model="item.values.own_home" value="true" />
              </td>
            </tr>
            <tr class="checkbox">
              <td colspan="3">Bus Service Available?</td>
              <td>
                <input type="checkbox" v-model="item.values.bus_service" value="true" />
              </td>
            </tr>
            <tr class="checkbox" v-if="!item.values.bus_service">
              <td colspan="3">Distance form school/work (km)</td>
              <td>
                <input type="text" v-model="item.values.rent_to_parents" placeholder="0" />
              </td>
            </tr>
          </tbody>
        </table>
      </v-form>
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {},
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.csfa_accomodation.accomodations = this.application.draft.csfa_accomodation.accomodations || [
      {
        heading: "Pre-study Accomodation",
        note: "Your pre-study accommodations is the 4-month period just before your classes start in this academic year. ",
        values: {
          living: "",
          comments: "",
        },
      },
      {
        heading: "Study Accomodation",
        note: "Your study accommodations includes all months from your start to end date of classes for this application period.",
        values: {
          living: "",
          comments: "",
        },
      },
    ];

    this.$emit("input", this.valid);
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("CSFA Accomodation"));
      });
    },
  },
};
</script>
