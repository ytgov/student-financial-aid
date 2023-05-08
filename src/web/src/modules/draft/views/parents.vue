<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.parents.legends.address") }}</h3>
      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit">
        <AddressSelector v-model="application.draft.parents.mailing_address" />

        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.parents.legends.information") }}</h3>
        <v-divider class="my-3" />

        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody v-for="(item, key) in application.draft.parents.parents">
            <tr>
              <td colspan="4">
                <h3>{{ item.heading }}</h3>
              </td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>
                <input type="text" v-model="item.first_name" placeholder="" />
              </td>
              <td>Last Name</td>
              <td>
                <input type="text" v-model="item.last_name" placeholder="" />
              </td>
            </tr>
            <tr>
              <td>Relationship</td>
              <td>
                <input type="text" v-model="item.relationship" placeholder="" />
              </td>
              <td>SIN</td>
              <td>
                <input type="text" v-model="item.sin" placeholder="" />
              </td>
            </tr>
          </tbody>
        </table>
      </v-form>
      <!--  </ValidationObserver> -->
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import AddressSelector from "@/components/forms/AddressSelector.vue";

export default {
  components: {AddressSelector },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.parents.parents = this.application.draft.parents.parents || [
      {
        heading: "Parent 1",
      },
      { heading: "Parent 2" },
    ];
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Parents"));
      });
    },
  },
};
</script>
