<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.csfa_income.legends.income") }}</h3>
      <p>
        {{ $t("application.onboarding.csfa_income.excerpt") }}
      </p>
      <v-divider class="my-3" />
      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form>
        <v-radio-group v-model="application.draft.csfa_income.has_income">
          <v-radio label="I do not anticipate any income" :value="false"></v-radio>
          <v-radio label="I will have the following income:" :value="true"></v-radio>
        </v-radio-group>

        <div v-if="application.draft.csfa_income.has_income">
          <v-row v-for="(item, key) in application.draft.csfa_income.incomes">
            <v-col cols="12" md="4">
              <v-select
                v-model="item.type"
                item-value="id"
                item-title="description"
                variant="outlined"
                bg-color="white"
                density="comfortable"
                label="Type"
                :items="incomeTypes" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                type="number"
                variant="outlined"
                bg-color="white"
                density="comfortable"
                hide-details
                v-model="item.amount"
                label="Amount" />
            </v-col>
            <v-col cols="12" md="4">
              <v-btn icon="mdi-delete" size="small" color="warning" @click="remove(key)" class="float-right"></v-btn>
              <TextField v-model="item.comments" label="Comments" style="margin-right: 55px" />
            </v-col>
            <v-divider />
          </v-row>

          <v-btn class="mt-6" color="info" @click="add()">Add income</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>

  <div>
    <v-btn color="info" @click="backClick" class="float-left pl-3">
      <v-icon class="mr-2">mdi-arrow-left</v-icon> Previous
    </v-btn>
    <div class="text-right mt-5">
      <v-btn color="primary" class="mr-3" @click="saveClick">Save</v-btn>
      <v-btn color="primary" @click="nextClick" class="pr-3">
        Save and Next <v-icon class="ml-2">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { useReferenceStore } from "@/store/ReferenceStore";
import TextField from "@/components/forms/TextField.vue";

export default {
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useReferenceStore, ["incomeTypes"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.csfa_income.incomes = this.application.draft.csfa_income.incomes || [];
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    add() {
      this.application.draft.csfa_income.incomes.push({
        type: "",
        amount: "",
        comments: "",
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.csfa_income.incomes.splice(key, 1); // 2nd parameter means remove one item only
      }
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("CSFA Income"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("CSFA Income"));
      });
    },
  },
  components: { TextField },
};
</script>
