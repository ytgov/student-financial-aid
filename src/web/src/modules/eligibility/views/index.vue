<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <div class="px-4 py-4">
      <div class="d-flex justify-space-between">
        <div>
          <h3 class="text-h3 mb-1 ml-1">{{ $t("eligibility.index.title") }}</h3>
          <v-breadcrumbs
            :items="[{ title: 'Student Home', to: '/student' }, { title: 'Eligibility Checker' }]"
            class="py-0 px-0">
            <template v-slot:divider>
              <v-icon icon="mdi-square-small"></v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </div>
    </div>
  </v-card>
  <v-card variant="outlined" color="yg_sun">
    <v-progress-linear color="yg_moss" height="15" :model-value="percent"></v-progress-linear>

    <v-window v-model="step">
      <WindowStart :value="1" />
      <WindowCitizenship :value="2" />
      <WindowEnrollment :value="3" />
      <WindowYukonExcellence :value="4" />

      <WindowDependentJurisdiction :value="5" />
      <WindowDesignatedInstitution :value="6" />
      <WindowDisabilities :value="7" />
      <WindowFullTimeEligibility :value="8" />
      <WindowIndependentStudent :value="9" />
      <WindowMarital :value="10" />
      <WindowParent :value="11" />
      <WindowPartTimeEligibility :value="12" />
      <WindowProgram :value="13" />
      <WindowResidency :value="14" />

      <WindowScholarship :value="15" />
      <WindowSingleParentJurisdiction :value="16" />
      <WindowYukonGrant :value="17" />

      <WindowReview :value="18" />
    </v-window>

    <v-divider></v-divider>
    <v-card-actions class="pa-4">
      <v-btn v-if="step > 1" variant="text" @click="backClick"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="flat" @click="nextClick" :disabled="!pageValid"> Next </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import WindowStart from "../components/window-start.vue";
import WindowCitizenship from "../components/window-citizenship.vue";
import WindowEnrollment from "../components/window-enrollment.vue";
import WindowYukonExcellence from "../components/window-yukonexcellence.vue";
import WindowDependentJurisdiction from "../components/window-dependent-jurisdiction.vue";
import WindowDesignatedInstitution from "../components/window-designated-institution.vue";
import WindowDisabilities from "../components/window-disabilities.vue";
import WindowFullTimeEligibility from "../components/window-full-time-eligibility.vue";
import WindowIndependentStudent from "../components/window-independent-student.vue";
import WindowMarital from "../components/window-marital.vue";
import WindowParent from "../components/window-parent.vue";
import WindowPartTimeEligibility from "../components/window-part-time-eligibility.vue";
import WindowProgram from "../components/window-program.vue";
import WindowResidency from "../components/window-residency.vue";
import WindowReview from "../components/window-review.vue";
import WindowScholarship from "../components/window-scholarship.vue";
import WindowSingleParentJurisdiction from "../components/window-single-parent-jurisdiction.vue";
import WindowYukonGrant from "../components/window-yukon-grant.vue";

import { mapState, mapWritableState } from "pinia";
import { useEligibilityState } from "../store";

export default {
  components: {
    WindowStart,
    WindowCitizenship,
    WindowEnrollment,
    WindowYukonExcellence,
    WindowDependentJurisdiction,
    WindowDesignatedInstitution,
    WindowDisabilities,
    WindowFullTimeEligibility,
    WindowIndependentStudent,
    WindowMarital,
    WindowParent,
    WindowPartTimeEligibility,
    WindowProgram,
    WindowResidency,
    WindowReview,
    WindowScholarship,
    WindowSingleParentJurisdiction,
    WindowYukonGrant,
  },
  data: () => ({}),
  computed: {
    ...mapWritableState(useEligibilityState, ["step"]),
    ...mapState(useEligibilityState, ["percent", "pageValid"]),
    next() {
      return { path: "/eligibility/citizenship" };
    },
  },
  methods: {
    nextClick() {
      this.step++;
    },
    backClick() {
      this.step--;
    },
  },
};
</script>

<style>
.v-breadcrumbs-divider {
  padding: 0 !important;
}
</style>
