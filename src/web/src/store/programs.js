export const strict = false

var program_validations = {
  yukon_excellence_award: (eligibility) => {
    return (
        eligibility.citizenship.is_canadian_citizen=='Yes' ||
        eligibility.citizenship.are_you_a_permanent_resident=='Yes' 
      ) 
      && (
        eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
        && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      )
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'
      && eligibility.program.what_type_of_program != 'Upgrade'
  },
  yukon_grant: (eligibility) => {
    return (
        eligibility.citizenship.is_canadian_citizen=='Yes' ||
        eligibility.citizenship.are_you_a_permanent_resident=='Yes' 
      ) && (
        eligibility.enrollment.time != 'Part-time'
      ) && (
        !['Upgrade', 'Certificate', 'Degree'].includes(eligibility.program.what_type_of_program)
        && eligibility.program.at_least_three_weeks == 'Yes'
      ) && (
        eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      ) && (
        eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
        && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      ) && (
        eligibility.yukon_grant.has_completed_two_years == 'Yes' || (
          eligibility.yukon_grant.has_completed_two_years == 'No' && 
          (
            (
              eligibility.yukon_grant.out_of_school_4_years == 'Yes' &&
              eligibility.yukon_grant.has_been_resident_continuously != 'No'
            ) ||
            (
              eligibility.yukon_grant.out_of_school_4_years == 'No' &&
              eligibility.yukon_grant.has_been_resident_continuously_from_14_to_18 != 'No'
            )
          )
        )
      )
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'
  },
  student_training_allowance: (eligibility) => {
    return (
      eligibility.citizenship.is_canadian_citizen=='Yes' ||
      eligibility.citizenship.are_you_a_permanent_resident=='Yes' 
    ) && (
      eligibility.enrollment.time != 'Part-time'
    ) && (
      eligibility.residency.have_you_been_out_of_territory_12_months != 'Yes'
    ) && (
      eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes' &&
      ['Yukon College', 'Alcan Air'].includes(eligibility.program.post_secondary_enrolled_in)
    ) && (
      eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
    )
    && eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'
    && eligibility.program.what_type_of_program != 'Upgrade'
  },
  army_yukon_scholarship: (eligibility) => {
    return (
      eligibility.scholarship.is_high_school_student != 'Yes'
      && !invalid_citizenship(eligibility)
    )
    && eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'
  },
  nicolas_john_hararch_scolarship: (eligibility) => {
    return ( 
        eligibility.scholarship.is_high_school_graduate == 'Yes'
        && eligibility.scholarship.is_pursuing_aviation == 'Yes'    
      ) && (
        eligibility.residency.have_you_been_out_of_territory_12_months != 'Yes'
      ) && !invalid_citizenship(eligibility)
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'
  },
  yukon_art_society_scolarship: (eligibility) => {
    return (
        eligibility.scholarship.is_high_school_graduate == 'Yes'
        && eligibility.scholarship.are_you_entering_visual_arts == 'Yes' 
        && !invalid_citizenship(eligibility)
      ) 
    && eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'
  },
  huskies_cb_radio_club_scolarship: (eligibility) => {
    return (
        eligibility.scholarship.is_high_school_graduate == 'Yes' 
        && eligibility.scholarship.enrolled_vocational == 'Yes' 
        && !invalid_citizenship(eligibility)
      ) 
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'
      
  },
  canada_student_loan_parttime_eligibility: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Part-time'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligibility)
    ) 
  },
  canada_student_grant_parttime: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Part-time'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligibility)
    )
  },
  canada_student_loan_parttime_students_with_dependants: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Part-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligibility)
    )
  },
  canada_student_grant_parttime_students_with_disabilities: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Part-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligibility.disabilities.permanent_disability == 'Yes'
      && !invalid_citizenship(eligibility)
      
    )
  },
  canada_student_grant_parttime_services_and_equipment_for_students_with_disabilities: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Part-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligibility.disabilities.permanent_disability == 'Yes'
      && eligibility.disabilities.service_equipment == 'Yes'
      && !invalid_citizenship(eligibility) 
    )
  },
  canada_student_loan_fulltime: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Full-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligibility)
    )
  },
  canada_student_grant_fulltime: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Full-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligibility)
    )
  },
  canada_student_grant_fulltime_students_with_dependants: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Full-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligibility)
    )
  },
  canada_student_grant_fulltime_students_with_disabilities: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Full-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligibility.disabilities.perminent_disability == 'Yes'
      && !invalid_citizenship(eligibility)
    )
  },
  canada_student_grant_fulltime_services_and_equipment_for_students_with_disabilities: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Full-time'
      && eligibility.program.at_least_three_weeks == 'Yes'
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligibility.disabilities.permanent_disability == 'Yes'
      && eligibility.disabilities.service_equipment == 'Yes'
      && !invalid_citizenship(eligibility) 
    )
  }
  /*
  canada_student_loans_and_grants_skills_boost_top_up: (eligibility) => {
    return (
      eligibility.enrollment.time == 'Full-time'
      && !['Masters', 'Doctorate', 'None of These'].includes(eligibility.program.what_type_of_program)
      && eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligibility.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligibility.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligibility)
    )
  }
  */
}



var invalid_citizenship = (eligibility) => {
  return (
    eligibility.citizenship.is_canadian_citizen=='No' &&
    eligibility.citizenship.are_you_a_permanent_resident=='No' &&
    eligibility.citizenship.are_you_a_protected_person=='No' &&
    eligibility.citizenship.are_you_registered_as_indigenous=='No'
  ) 
}


export const state = () => ({
  list: [
     {
      group: {
        en: 'Yukon Territory Programs',
        fr: 'Programmes du territoire du Yukon'
      },
      type: 'scholarship',
      name: {
        en: 'Yukon Excellence Award',
        fr: 'Prix d’excellence du Yukon'
      },
      qualified: "yukon_excellence_award"
    },
    {
      group: {
        en: 'Yukon Territory Programs',
        fr: 'Programmes du territoire du Yukon'
      },
      type: 'scholarship',
      name: {
        en: 'Yukon Scolarship',
        fr: 'Bourse du Yukon'
      },
      qualified: "yukon_grant"
    },
    {
      group: {
        en: 'Yukon Territory Programs',
        fr: 'Programmes du territoire du Yukon'
      },
      type: 'scholarship',
      name: {
        en: 'Student Training Allowance',
        fr: 'Allocation de formation des étudiants'
      },
      qualified: "student_training_allowance"
    },
    {
      group: {
        en: 'Scholarships',
        fr: 'Bourses d’études'
      },
      type: 'scholarship',
      name: {
        en: 'Canadian Army Yukon Scolarships',
        fr: 'Bourse des Forces canadiennes à l’intention des étudiants yukonnais'
      },
      qualified: "army_yukon_scholarship"
    },
    {
      group: {
        en: 'Scholarships',
        fr: 'Bourses d’études'
      },
      type: 'scholarship',
      name: {
        en: 'Nicolas John Hararch Scolarship',
        fr: 'Bourse d’études Nicolas-John Hararch'
      },
      qualified: "nicolas_john_hararch_scolarship"
    },
    {
      group: {
        en: 'Scholarships',
        fr: 'Bourses d’études'
      },
      type: 'scholarship',
      name: {
        en: 'Yukon Art Society Scolarship',
        fr: 'Bourse d’études de la Yukon Art Society'
      },
      qualified: "yukon_art_society_scolarship"
    },
    {
      group: {
        en: 'Scholarships',
        fr: 'Bourses d’études'
      },
      type: 'scholarship',
      name: {
        en: 'Huskies CB Radio Club Scolarship',
        fr: 'Bourse d’études du Huskies CB Radio Club'
      },
      qualified: 'huskies_cb_radio_club_scolarship'
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: ''
      },
      type: 'loan',
      name: {
        en: 'Canada Student Loan - Part-time',
        fr: 'Canada Student Loan - Part-time'
      },
      qualified: 'canada_student_loan_parttime',
      enrollment: 'part-time'
    },
    {
      group: 'Canada Student Financial Assistance Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Part-time',
        fr: 'Canada Student Grant - Part-time'
      },
      qualified: 'canada_student_grant_parttime',
      enrollment: 'part-time'
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'loan',
      name: {
        en: 'Canada Student Loan - Part-time Students with Dependants',
        fr: 'Canada Student Loan - Part-time Students with Dependants'
      },
      qualified: 'canada_student_loan_parttime_students_with_dependants',
      enrollment: 'part-time'
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Part-time Students with Disabilities',
        fr: 'Canada Student Grant - Part-time Students with Disabilities'
      },
      qualified: 'canada_student_grant_parttime_students_with_disabilities',
      enrollment: 'part-time',
      disabilities: true
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Part-time Services and Equipment for Students with Disabilities',
        fr: 'Canada Student Grant - Part-time Services and Equipment for Students with Disabilities'
      },
      qualified: 'canada_student_grant_parttime_services_and_equipment_for_students_with_disabilities',
      enrollment: 'part-time',
      disabilities: true
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'loan',
      name: {
        en: 'Canada Student Loan - Full-time',
        fr: 'Canada Student Loan - Full-time'
      },
      qualified: 'canada_student_loan_fulltime',
      enrollment: 'full-time'
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Full-time',
        fr: 'Canada Student Grant - Full-time'
      },
      qualified: 'canada_student_grant_fulltime',
      enrollment: 'full-time'
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'loan',
      name: {
        en: 'Canada Student Grant - Full-time Students with Dependants',
        fr: 'Canada Student Grant - Full-time Students with Dependants'
      },
      qualified: 'canada_student_grant_fulltime_students_with_dependants',
      enrollment: 'full-time'
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Full-time Students with Disabilities',
        fr: 'Canada Student Grant - Full-time Students with Disabilities'
      },
      qualified: 'canada_student_grant_fulltime_students_with_disabilities',
      enrollment: 'full-time',
      disabilities: true
    },
    {
      group: {
        en: 'Canada Student Financial Assistance Programs',
        fr: 'Canada Student Financial Assistance Programs'
      },
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Full-time Services and Equipment for Students with Disabilities',
        fr: 'Canada Student Grant - Full-time Services and Equipment for Students with Disabilities'
      },
      qualified: 'canada_student_grant_fulltime_services_and_equipment_for_students_with_disabilities',
      enrollment: 'full-time',
      disabilities: true
    }
    /*
    {
      group: 'Canada Student Financial Assistance Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Loans and Grants - Skills Boost Top Up',
        fr: 'Canada Student Loans and Grants - Skills Boost Top Up'
      },
      qualified: 'canada_student_loans_and_grants_skills_boost_top_up'
    }
    */
  ]
})

export const getters = {
  list(state) {
    return state.list
  },
  validation: (state) => (slug, eligibility) => {
    return program_validations[slug](eligibility)
  },
  eligible: (state, getters, rootGetters) => (eligibility) => {
    return _.filter(state.list, (o) =>  {
      try { 
        let disability_check = (typeof o.disabilities == 'undefined' || (!!o.disabilities && eligibility.disabilities.permanent_disability == 'Yes'))
        return getters['validation'](o.qualified, eligibility) == true && typeof o.enrollment == 'undefined' && disability_check
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  ineligible: (state, getters, rootGetters) => (eligibility) => {
    return _.filter(state.list, (o) =>  {
      try { 
        let disability_check = (typeof o.disabilities == 'undefined' || (!!o.disabilities && eligibility.disabilities.permanent_disability == 'Yes'))
        return getters['validation'](o.qualified, eligibility) == false && typeof o.enrollment == 'undefined' && disability_check
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  fulltime_eligible: (state, getters, rootGetters) => (eligibility) => {
    return _.filter(state.list, (o) =>  {
      try { 
        let disability_check = (typeof o.disabilities == 'undefined' || (!!o.disabilities && eligibility.disabilities.permanent_disability == 'Yes'))
        
        return getters['validation'](o.qualified, eligibility) == true && o.enrollment === 'full-time' && disability_check
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  fulltime_ineligible: (state, getters, rootGetters) => (eligibility) => {
    return _.filter(state.list, (o) =>  {
      try { 
        let disability_check = (typeof o.disabilities == 'undefined' || (!!o.disabilities && eligibility.disabilities.permanent_disability == 'Yes'))
        
        return getters['validation'](o.qualified, eligibility) == false && o.enrollment === 'full-time' && disability_check
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  parttime_eligible: (state, getters, rootGetters) => (eligibility) => {
    return _.filter(state.list, (o) =>  {
      try { 
        let disability_check = (typeof o.disabilities == 'undefined' || (!!o.disabilities && eligibility.disabilities.permanent_disability == 'Yes'))
        
        return getters['validation'](o.qualified, eligibility) == true && o.enrollment === 'part-time' && disability_check
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  parttime_ineligible: (state, getters, rootGetters) => (eligibility) => {
    return _.filter(state.list, (o) =>  {
      try { 
        let disability_check = (typeof o.disabilities == 'undefined' || (!!o.disabilities && eligibility.disabilities.permanent_disability == 'Yes'))
        
        return getters['validation'](o.qualified, eligibility) == false && o.enrollment === 'part-time' && disability_check
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  count(state) {
    return state.list.length
  }
}

export const mutations = {

}

export const actions = {

}



