<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.dependants.legends.dependants") }}</h3>
      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <p>
          {{ $t("excerpt") }}
        </p>
        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody v-for="(item, key) in this.application.draft.student_dependants.dependants">
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
              <td>Date of birth</td>
              <td>
                <input type="text" v-model="item.dob" placeholder="" />
              </td>
              <td>Relationship</td>
              <td>
                <input type="text" v-model="item.age" placeholder="" />
              </td>
            </tr>
            <tr>
              <td colspan="6" class="checkboxes">
                <div>
                  <label
                    ><input type="checkbox" value="Resides with" v-model="item.other" /> Resides with</label
                  >
                  <label
                    ><input type="checkbox" value="Shared Custody" v-model="item.other" /> Shared
                    Custody</label
                  >
                  <label
                    ><input type="checkbox" value="In post secondary" v-model="item.other" /> In post
                    secondary</label
                  >
                  <label v-if="false"
                    ><input type="checkbox" value="STA eligible" v-model="item.other" /> STA eligible</label
                  >
                  <label v-if="false"
                    ><input type="checkbox" value="CSL eligible" v-model="item.other" /> CSL eligible</label
                  >
                  <label v-if="false"
                    ><input type="checkbox" value="CSG eligible" v-model="item.other" /> CSG eligable</label
                  >
                </div>
              </td>
            </tr>
            <tr v-if="item.other.includes('Shared Custody')">
              <td colspan="4">
                <textarea v-model="item.custody_details" placeholder="Shared custody details" />
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <textarea v-model="item.comments" placeholder="Comments" />
              </td>
            </tr>
            <tr v-if="key > 0">
              <td colspan="3"><a @click="remove(key)">Remove dependant</a></td>
            </tr>
          </tbody>
        </table>

        <p class="buttons">
          <v-btn class="blue small" @click="add()">Add dependant</v-btn>
        </p>
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

export default {
  components: {},
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {
      dependants: [],
    };
  },
  mounted() {
    this.application.draft.student_dependants.dependants = this.application.draft.student_dependants.dependants || [];

    this.$emit("input", this.valid);
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),
    add() {
      this.application.draft.student_dependants.dependants.push({
        first_name: "",
        last_name: "",
        dob: "",
        age: "",
        comments: "",
        custody_details: "",
        other: [],
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.student_dependants.dependants.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Student Dependants"));
      });
    },
  },
};
</script>
