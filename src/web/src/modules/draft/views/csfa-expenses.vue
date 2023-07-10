<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.csfa_expenses.legends.expenses") }}</h3>
      <p>
        {{ $t("application.onboarding.csfa_expenses.excerpt") }}
      </p>
      <v-divider class="my-3" />
      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form>
        <v-row v-for="(item, key) in application.draft.csfa_expenses.expenses">
          <v-col cols="12" md="6">
            <v-text-field
              v-if="item.required"
              readonly
              density="comfortable"
              variant="outlined"
              bg-color="white"
              :value="item.description"
              :hint="item.notes || note(item.type)"
              append-inner-icon="mdi-lock"
              persistent-hint>
            </v-text-field>

            <v-select
              v-else
              v-model="item.type"
              :items="unusedItems(item)"
              item-title="description"
              item-value="id"
              label="Type"
              :hint="item.notes || note(item.type)"
              persistent-hint
              variant="outlined"
              bg-color="white"
              :readonly="item.required"
              density="comfortable">
            </v-select>
          </v-col>
          <v-col cols="12" md="2">
            <Currency v-model="item.amount" label="Amount" />
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              v-if="!item.required == true"
              icon="mdi-delete"
              size="small"
              color="warning"
              @click="remove(key)"
              class="float-right"></v-btn>
            <TextField v-model="item.comments" label="Comments (optional)" style="margin-right: 55px" />
          </v-col>
          <v-divider />
        </v-row>



        <p class="mt-7">Additional expenses, such as medical, dental, and day care, can be added here. Do not include payments such as rent, vehicle, insurance, groceries, cellphone, visa, etc. These costs are either pre-calculated or are ineligible.</p>
        <v-btn class="mt-3" color="info" @click="add()">Add expense</v-btn>
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
import _ from "lodash";

import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import TextField from "@/components/forms/TextField.vue";
import Select from "@/components/forms/Select.vue";
import Currency from "@/components/forms/Currency.vue";
import { useReferenceStore } from "@/store/ReferenceStore";

export default {
  components: { TextField, Select, Currency },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useReferenceStore, ["expenseCategories"]),
  },
  data() {
    return {};
  },
  beforeMount() {
    this.application.draft.csfa_expenses.expenses = this.application.draft.csfa_expenses.expenses || [];

    if (this.application.draft.csfa_expenses.expenses.length == 0) {
      if (this.expenseCategories) {
        let required = this.expenseCategories.filter((c) => c.is_required == true);

        for (let req of required) {
          this.application.draft.csfa_expenses.expenses.push({
            description: req.description,
            type: req.id,
            amount: null,
            notes: req.notes,
            required: true,
          });
        }
      }
    }
  },
  watch: {
    expenseCategories(n, o) {
      if (this.application.draft.csfa_expenses.expenses.length == 0) {
        if (this.expenseCategories) {
          let required = this.expenseCategories.filter((c) => c.is_required == true);

          for (let req of required) {
            this.application.draft.csfa_expenses.expenses.push({
              description: req.description,
              type: req.id,
              amount: 0.0,
              notes: req.notes,
              required: true,
            });
          }
        }
      }
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    add() {
      this.application.draft.csfa_expenses.expenses.push({
        type: null,
        amount: "",
        comments: "",
        required: false,
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.csfa_expenses.expenses.splice(key, 1); // 2nd parameter means remove one item only
      }
    },

    unusedItems(item) {
      let existing = this.application.draft.csfa_expenses.expenses.map((e) => e.type);
      let items = this.expenseCategories.filter((e) => !existing.includes(e.id) || e.id == item.type);
      return items;
    },

    note(item) {
      return this.expenseCategories.filter((e) => e.id == item).map((i) => i.notes)[0] || "";
    },
    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("CSFA Expenses"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("CSFA Expenses"));
      });
    },
  },
};
</script>
