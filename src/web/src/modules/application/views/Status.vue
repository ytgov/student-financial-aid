<template>
  <h2 class="text-h2 mb-6">Funding Status</h2>

  <v-row>
    <v-col v-for="(item, idx) of application.fundingRequests" cols="12" md="12">
      <v-card color="#eee5d1" elevation="0">
        <v-card-text>
          <h3 class="text-h3 mb-1">{{ item.requestType.description }}</h3>
          <p>
            <strong>{{ item.statusDescription }}</strong>
            <span v-if="item.statusDate"> as of {{ formatDate(item.statusDate) }}</span>

            <span v-if="item.reasonDescription" class="ml-0 text-bold text-primary">
              - {{ item.reasonDescription }}</span
            >
          </p>
          <div v-if="item.assessments?.length > 0">
            <v-divider class="my-3" />
            <div v-for="(a, ix) of item.assessments">
              <v-table
                density="compact"
                style="border: 1px #ccc solid; border-radius: 4px"
                v-if="a.disbursements?.length > 0">
                <thead>
                  <tr>
                    <th style="border-bottom: 1px #ccc solid; width: 200px">Amount</th>
                    <th style="border-bottom: 1px #ccc solid">Release Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(d, id) of a.disbursements">
                    <td>{{ formatMoney(d.disbursedAmount) }}</td>
                    <td>
                      {{ formatMonth(d.dueDate) }}
                      <span v-if="d.changeReasonDescription">&nbsp; - {{ d.changeReasonDescription }}</span>
                    </td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th style="border-top: 1px #ccc solid">Total: {{ formatMoney(getAmount(a)) }}</th>
                    <th style="border-top: 1px #ccc solid"></th>
                  </tr>
                </thead>
              </v-table>
            </div>

            <div v-if="getLettersFor(item.id).length > 0">
              <v-divider class="my-3" />
              <v-label>Letters: </v-label>

              <v-chip
                v-for="letter of getLettersFor(item.id)"
                size="small"
                @click="downloadLetterClick(letter)"
                color="primary"
                class="ml-3"
                variant="flat">
                <v-icon class="mr-2" color="white">mdi-download</v-icon>
                <span style="color: white">{{ letter.file_name }}</span>
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/store/UserStore";
import { useApplicationStore } from "../store";
import moment from "moment";
import { isNumber, sortBy } from "lodash";

export default {
  data: () => ({}),
  mounted() {},
  computed: {
    ...mapState(useUserStore, ["student", "studentAddress"]),
    ...mapState(useApplicationStore, ["application", "letters"]),
  },
  methods: {
    ...mapActions(useApplicationStore, ["downloadLetter"]),
    getLettersFor(fundingRequestId: number) {
      if (this.letters) return this.letters.filter((l) => l.funding_request_id == fundingRequestId);
      return [];
    },
    getAmount(a: any) {
      if (a.disbursements && a.disbursements.length > 0) {
        let total = a.disbursements.reduce((a: number, b: any) => a + b.disbursedAmount, 0);

        return total;
      }

      return 0;
    },
    sortDisbursements(disbursements: any[]) {
      return sortBy(disbursements, "dueDate");
    },
    async downloadLetterClick(letter: any) {
      let file = await this.downloadLetter(this.application.id, letter);

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file);
      link.download = letter.file_name;
      link.click();
    },

    formatMoney(input: any) {
      if (isNumber(input)) {
        return Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
        }).format(input);
      }
      return "";
    },
    formatDate(input: Date | undefined): string {
      if (input) return moment.utc(input).format("YYYY-MM-DD");
      return "";
    },
    formatMonth(input: Date | undefined): string {
      if (input) return moment.utc(input).format("MMM YYYY");
      return "";
    },
  },
};
</script>
