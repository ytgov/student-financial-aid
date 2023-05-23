<template>
  <v-row>
    <v-col>
      <v-card class="mb-5" elevation="5">
        <v-card-text>
          <h4 class="text-h5 mb-5">Account Information</h4>

          <v-row v-if="editStudent">
            <v-col cols="12" md="6">
              <TextField :label="$t('student.first_name')" v-model="editStudent.first_name"></TextField>
            </v-col>
            <v-col cols="12" md="6">
              <TextField :label="$t('student.last_name')" v-model="editStudent.last_name"></TextField>
            </v-col>
            <v-col cols="12" md="6">
              <TextField :label="$t('student.email_address')" v-model="editStudent.email"></TextField>
            </v-col>
            <v-col cols="12" md="6">
              <DateSelector
                :label="$t('student.date_of_birth')"
                v-model="editStudent.birth_date"
                :readonly="true"></DateSelector>
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-btn @click="saveClick" color="primary">{{ $t("components.buttons.save") }}</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="cancelClick" color="warning">{{ $t("components.buttons.cancel") }}</v-btn>
            </v-col>
          </v-row>

          -Home Address
          <br />
          -Home Email
          <br />
          -Home Phone
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import TextField from "@/components/forms/TextField.vue";
import { mapActions, mapWritableState } from "pinia";
import { useStudentStore } from "../store";
import DateSelector from "@/components/forms/DateSelector.vue";

export default {
  name: "Default",
  components: { TextField, DateSelector },
  data: () => ({}),
  computed: {
    ...mapWritableState(useStudentStore, ["editStudent"]),
  },
  mounted() {
    this.edit();
  },
  methods: {
    ...mapActions(useStudentStore, ["save", "edit", "doneEdit"]),

    async saveClick() {
      await this.save();
      this.$router.push("/student");
    },
    cancelClick() {
      this.doneEdit();
      this.$router.push("/student");
    },
  },
};
</script>
