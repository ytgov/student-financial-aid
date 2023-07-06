<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <div class="px-4 py-4">
      <div class="d-flex justify-space-between">
        <div>
          <h3 class="text-h3 mb-1 ml-1">Student Information</h3>
          <v-breadcrumbs
            :items="[{ title: 'Student Home', to: '/student' }, { title: 'Student Information' }]"
            class="py-0 px-0">
            <template v-slot:divider>
              <v-icon icon="mdi-square-small"></v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </div>
    </div>
  </v-card>

  <v-row>
    <v-col cols="12" md="6">
      <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
        <v-card-text>
          <h3 class="text-h3 mb-6">Basic Details</h3>
          <p>
            This information is editable only by a Student Financial Aid Officer. When you request a change, you must
            submit along with it additional details to verify the validity of the change.
          </p>
          <v-divider class="my-3" />
          <v-row v-if="student">
            <v-col cols="12" md="6">
              <TextField
                :label="$t('student.first_name')"
                v-model="student.first_name"
                readonly
                append-inner-icon="mdi-lock"></TextField>
            </v-col>
            <v-col cols="12" md="6">
              <TextField
                :label="$t('student.last_name')"
                v-model="student.last_name"
                readonly
                append-inner-icon="mdi-lock"></TextField>
            </v-col>
            <v-col cols="12" md="6">
              <TextField
                :label="$t('student.date_of_birth')"
                readonly
                :value="formatDate(student.birth_date)"
                append-inner-icon="mdi-lock"></TextField>
            </v-col>

            <v-col cols="12" md="6">
              <TextField label="SIN" :model-value="student.sin" append-inner-icon="mdi-lock" readonly />
            </v-col>
          </v-row>
          <v-btn color="primary" class="mt-5" href="mailto:sfa@yukon.ca">Request a Change</v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
        <v-card-text>
          <h3 class="text-h3 mb-6">Contact Information</h3>
          <p>This information is tied to your student record and applies to any current and future applications.</p>
          <v-divider class="my-3" />

          <v-row v-if="contactInfo">
            <v-col cols="12">
              <TextField :label="$t('student.email_address')" v-model="contactInfo.email"></TextField>
            </v-col>
            <v-col cols="12">
              <TextField :label="$t('Phone number')" v-model="contactInfo.telephone"></TextField>
            </v-col>

            <v-col cols="12" class="pb-0" v-if="contactInfo && contactInfo.address">
              <AddressSelector v-model="contactInfo.address"></AddressSelector>
            </v-col>
            <v-col cols="12" class="d-flex pt-5">
              <v-btn @click="saveClick" color="primary">{{ $t("components.buttons.save") }}</v-btn>
              <!-- <v-spacer></v-spacer>
              <v-btn @click="cancelClick" color="warning">{{ $t("components.buttons.cancel") }}</v-btn> -->
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import TextField from "@/components/forms/TextField.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import DateSelector from "@/components/forms/DateSelector.vue";
import AddressSelector from "@/components/forms/AddressSelector.vue";
import moment from "moment";
import { useUserStore } from "@/store/UserStore";
import { useReferenceStore } from "@/store/ReferenceStore";
import { useStudentStore } from "../store";

export default {
  name: "Default",
  components: { TextField, DateSelector, AddressSelector },
  data: () => ({}),
  computed: {
    ...mapWritableState(useUserStore, ["contactInfo"]),
    ...mapState(useUserStore, ["student"]),
    ...mapState(useStudentStore, ["addresses"]),
  },
  async mounted() {
    await this.loadAddresses();
    await this.initialize();
    this.editStudentContactInfo();

    if (this.contactInfo && this.addresses && this.addresses.length > 0) {
      let primary = this.addresses[0];
      this.contactInfo.address = {
        id: primary.id,
        address_type_id: primary.address_type_id,
        first: primary.address1,
        second: primary.address2,
        city: primary.city_id,
        region: primary.province_id,
        postal: primary.postal_code,
      };
    }
  },
  methods: {
    ...mapActions(useUserStore, ["editStudentContactInfo", "saveStudentContactInfo"]),
    ...mapActions(useReferenceStore, ["initialize"]),
    ...mapActions(useStudentStore, ["loadAddresses"]),

    async saveClick() {
      await this.saveStudentContactInfo();
      this.$router.push("/student");
    },
    cancelClick() {
      //this.doneEdit();
      this.$router.push("/student");
    },
    formatDate(input: any) {
      if (input) return moment.utc(input).format("YYYY-MM-DD");
      return "";
    },
  },
};
</script>
