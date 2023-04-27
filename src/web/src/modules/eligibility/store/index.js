import { defineStore } from "pinia";

export const useEligibilityState = defineStore("eligibility", {
  state: () => ({
    status: false,
    step: 1,
    eligibility: {
      citizenship: {
        is_canadian_citizen: null,
        are_you_a_permanent_resident: null,
        are_you_a_protected_person: null,
        are_you_registered_as_indigenous: null,
      },
      scholarship: {
        is_high_school_student: false,
        is_high_school_graduate: false,
        is_pursuing_aviation: false,
        are_you_entering_visual_arts: false,
        enrolled_vocational: false,
      },
      enrollment: {
        time: false,
      },
      residency: {
        living_in_yukon_for_2_years: false,
        did_you_move_during_2_years: false,

        have_you_been_out_of_territory_4_months: false,
        have_you_been_out_of_territory_12_months: false,
        will_you_be_resident_before_classes_start: false,
        do_you_file_with_cra_as_yukon_citizen: false,
        valid_yukon_health_insurance: false,
        drivers_lisence_another_jurisdiction: false,
      },
      designated_institution: {
        are_you_enrolled_in_post_secondary: false,
        post_secondary_enrolled_in: null,
        details: {
          campus: "",
          student_id: "",
          program_name: "",
          duration_of_program: "",
          year_entering: "",
          start_date_of_classes: "",
          end_date_of_classes: "",
        },
      },
      program: {
        at_least_twelve_weeks: false,
        at_least_three_weeks: false,
        what_type_of_program: false,
      },
      marital: {
        are_you_in_a_relationship: false,
        have_you_ever_been_in_a_relationship: false,
      },
      parent: {
        responsible_for_child: false,
        ever_been_a_single_parent: false,
      },
      independentstudent: {
        out_of_school: false,
        in_labour_force: false,
        supporting_parent: false,
      },
      dependant_student_jurisdiction: {
        has_family_maintained_home: false,
      },
      singleparentjurisdiction: {
        most_recently_in_yukon: false,
      },
      parttimeeligibility: {
        family_size: false,
        previous_year_gross_family_income: 0,
        enrolled: false,
        lived_in_yukon: false,
        dependants_under_twelve: false,
      },
      fulltimeeligibility: {
        program_at_least_2_years: false,
        family_size: 0,
        previous_year_gross_family_income: 0,
        dependants_under_twelve: false,
        dependants_with_disability: false,
      },
      disabilities: {
        permanent_disability: false,
        service_equipment: false,
      },
      yukon_excellence_award: {
        apply: 0.00,
      },
      yukon_grant: {
        has_completed_two_years: false,
        out_of_school_4_years: false,
        is_over_20: false,
        has_been_resident_continuously: false,
        has_been_resident_continuously_from_14_to_18: false,
      },
    },

    isLoading: false,
  }),
  getters: {
    pageValid() {
      if (this.step == 1) return true;
      else if (this.step == 2) {
        if (this.eligibility.citizenship.is_canadian_citizen == true) return true;
        if (this.eligibility.citizenship.are_you_a_permanent_resident == true) return true;
        if (this.eligibility.citizenship.are_you_a_protected_person == true) return true;
        if (
          this.eligibility.citizenship.are_you_registered_as_indigenous == true ||
          this.eligibility.citizenship.are_you_registered_as_indigenous == false
        )
          return true;
      }

      return true;
    },

    nextStep() {
      return 1;
    },
    percent() {
      if (this.step == 1) return 1;
      else if (this.step == 2) {
        return 10;
      } else if (this.step == 3) {
        return 20;
      }
      return 50;
    },
  },
  actions: {
    save() {
      this.student = this.editStudent || this.student;
      console.log("TRYING TO SVAE STUDENT", this.student);
      this.doneEdit();
    },
    edit() {
      this.editStudent = clone(this.student);
    },
    doneEdit() {
      this.editStudent = undefined;
    },
  },
});
