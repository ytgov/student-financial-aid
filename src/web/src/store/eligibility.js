export const strict = false

export const state = () => ({
	status: false,
  eligibility: {
    citizenship: {
      is_canadian_citizen: false,
      are_you_a_permanent_resident: false,
      are_you_a_protected_person: false,
      are_you_registered_as_indian: false
    },
    scholarship: {
      is_high_school_student: false,
      is_high_school_graduate: false,
      is_pursuing_aviation: false,
      are_you_entering_visual_arts: false,
      enrolled_vocational: false
    },
    enrollment: {
      time: false
    },
    residency: {
      living_in_yukon_for_2_years: false,
      did_you_move_during_2_years: false,

      have_you_been_out_of_territory_4_months: false,
      have_you_been_out_of_territory_12_months: false,
      will_you_be_resident_before_classes_start: false,
      do_you_file_with_cra_as_yukon_citizen: false,
      valid_yukon_health_insurance: false,
      drivers_lisence_another_juristiction: false
    },
    designated_institution: {
      are_you_enrolled_in_post_secondary: false,
      post_secondary_enrolled_in: false,
      details: {
        campus: '',
        student_id: '',
        program_name: '',
        duration_of_program: '',
        year_entering: '',
        start_date_of_classes: '',
        end_date_of_classes: ''
      }
    },
    program: {
      at_least_twelve_weeks: false,
    	at_least_three_weeks: false,
    	what_type_of_program: false
    },
    marital: {
    	are_you_in_a_relationship: false,
    	have_you_ever_been_in_a_relationship: false
    },
    parent: {
    	responsible_for_child: false,
    	ever_been_a_single_parent: false
    },
    independentstudent: {
    	out_of_school: false,
    	in_labour_force: false,
    	supporting_parent: false
    },
    dependant_student_juristiction: {
    	has_family_maintained_home: false
    },
    singleparentjuristiction: {
    	most_recently_in_yukon: false
    },
    parttimeeligibility: {
    	family_size: false,
      previous_year_gross_family_income: 0,
      enrolled : false,
      lived_in_yukon: false,
      dependants_under_twelve: false
    },
    fulltimeeligibility: {
    	program_at_least_2_years: false,
    	family_size: false,
      previous_year_gross_family_income: 0,
      dependants_under_twelve: false,
      dependants_with_disability: false
    },
    disabilities:{
    	permanent_disability: false,
    	service_equipment: false
    },
    yukon_excellence_award: {
      apply: 0
    },
    yukon_grant: {
      has_completed_two_years: false,
      out_of_school_4_years: false,
      is_over_20: false,
      has_been_resident_continuously: false,
      has_been_resident_continuously_from_14_to_18: false
    }
  }
})

export const getters = {
  GET(state) {
    return state.eligibility
  },
  status(state) {
    return state.status
  }
}

export const mutations = {
  SET(state, eligibility) {
    state.eligibility = eligibility
  },
  CLEAR(state) {
    state.eligibility = Object.assign({}, defaultData)
  }
}

export const actions = {
  async fetch({ commit }) {
    await axios.get('').then(response => {
      commit("SET", response.data);
    }).catch(() => {
      commit("CLEAR");
    });
  },
}
