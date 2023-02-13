import { createI18n } from "vue-i18n";

const messages = {
  en: {
    nav: {
      home: "Home",
      about: "About"
    },
    menu: {
      heading: "Government services and information",
      close: "Close"
    },
    faq: {
      title: "FAQs"
    },
    components: {
      buttons: {
        disagree: "Disagree",
        back: "Back",
        save: "Save",
        cancel: "Cancel",
        agreecontinue: "Agree & Continue",
        continue: "Continue"
      },
      more_details: {
        more: "More Details"
      },
      address_selector: {
        labels: {
          zip_postal_code: "Postal code or zip code",
          address_first: "Street Address",
          address_second: "Second Line / Unit"
        },
        buttons: {
          edit: "Edit"
        }
      },
      date_selector: {
        labels: {
          year: "Year",
          month: "Month",
          day: "Day"
        }
      }
    },
    eligibility: {
      index: {
        title: "Eligibility checker – Before you start",
        body: "Thank you for registering. Before you begin your application, make sure to check your eligibility for more funding programs. To check, select the button below to see available funding opportunities, as you may be eligible for more than one funding program. ",
        buttons: {
          check: "Check Eligibility",
          cancel: "Cancel"
        }
      },
      citizenship: {
        title: "Eligibility",
        body: "To be eligible for potential funding programs, you must be a Canadian citizen or a permanent resident.",
        are_you_a_canadian_citizen: "Are you a Canadian citizen?",
        are_you_a_permanent_resident: "Are you a permanent resident?",
        are_you_a_protected_person: "Are you a protected person?",
        are_you_registered_as_indigenous: "Are you registered as indigenous?"
      },
      dependant_student_jurisdiction: {
        title: "Dependant student",
        has_family_maintained_home:
          "Has your family been living in the Yukon for the 12 months prior to you starting post-secondary classes?"
      },
      designated_institution: {
        title: "Designated institution",
        are_you_enrolled_in_post_secondary: "Are you enrolled in a post-secondary institution?",
        post_secondary_enrolled_in: "Select the school you plan to attend.",
        notes:
          'If your school is not listed, contact our office by email at <a href="mailto:sfa@yukon.ca">sfa@yukon.ca</a> and provide the name of your school, schools website, and your school’s email address.',
        institutions: [
          "Yukon College",
          "Alcan Air",
          "McMaster University",
          "University of British Columbia",
          "University of Windsor"
        ]
      },
      disabilities: {
        title: "Disability information",
        permanent_disability: "Do you have a permanent disability?",
        service_equipment:
          "Do you have a persistent or prolonged disability that is expected to last 12 months or more?"
      },
      enrollement: {
        title: "Enrollment",
        are_you_full_or_part_time: "Will you be enrolled in full-time or part-time studies?",
        labels: {
          full_time: "Full-time",
          part_time: "Part-time"
        },
        notes: {
          full_time: "is a minimum of 60% of a full course load.",
          part_time: "is 59% or less of a full course load.",
          contact:
            'If you are unsure of your status, please contact your educational institution to confirm. If you are a registered Apprentice, please contact <a href="mailto:apprenticeship@yukon.ca">apprenticeship@yukon.ca</a> for training and funding support.'
        }
      },
      yukon_excellence_award: {
        title: "Yukon excellence award",
        how_much_would_like_to_apply_for: "How much funding would you like to apply for?",
        note: "You can earn Yukon Excellence Award in grades 10–12 when attending a Yukon high school.  This funding can be used towards tuition, compulsory fees and/or book costs to attend post-secondary education and training to a maximum of $3000. You can apply for the entire amount of the Yukon Excellence Awards earned or use a part each year. ",
        labels: {
          balance: "Balance:"
        }
      },
      scholarship: {
        title: "Scholarship",
        are_you_a_high_school_student:
          "Are you a grade 12 student attending a Yukon High School and entering the first year of post secondary?",
        are_you_a_high_school_graduate: "Are you or will you be a high school graduate from a yukon high school?",
        are_you_pursuing_aviation: "Are you pursuing aviation oriented technical training?",
        are_you_entering_visual_arts:
          "Are you entering the first year of a visual arts program in the academic year immediately following graduation?",
        enrolled_vocational:
          "Are you enrolled in the first or second year of a one or two year vocational/technical program?"
      },
      residency: {
        title: "Residency",
        living_in_yukon_for_2_years:
          "Have you physically been living in Yukon for the two years immediately prior to starting your program?",
        did_you_move_during_2_years_more_4_months:
          "During this 2-year period, were you away from Yukon for more than 4 months and less than 12 months? ",
        did_you_move_during_2_years_more_12_months:
          "During this 2-year period, were you away from Yukon for more than 12 months?",

        do_you_file_with_cra_as_yukon_citizen: "Do you file with the CRA as a Yukon Citizen?",
        valid_yukon_health_insurance: "Do you have valid Yukon health care insurance",
        drivers_lisence_another_jurisdiction: "Do you have a drivers lisence form another jurisdiction?"
      },
      program: {
        title: "Program",
        at_least_twelve_weeks: "Is your program a minimum of 12 consecutive weeks?",
        at_least_three_weeks: "Is your program a minimum of 3 consecutive weeks?",
        what_type_of_program: "What type of program?",
        options: ["Upgrade", "Certificate", "Diploma", "Under Graduate", "Masters", "Doctorate", "None of These"]
      },
      review: {
        title: "Eligible programs",
        excerpt: "Based on the information you provided:",
        paragraph: {
          are_eligable: "You <strong>are eligible</strong> to apply for the following sources of funding:",
          not_eligable: "You are not eligible to apply for:"
        },
        none: "There are currently no eligibile programs.",
        types: {
          grant: "Grant",
          scholarship: "Scholarship",
          loan: "Loan"
        },
        notes:
          "If you would like to be assessed for one of the programs that indicate ‘you are not eligible to apply for’, please check the box next to the funding type and we will assess your application.",
        cfsa_programs_fulltime: "Canada Student Financial Assistance Programs - Full Time",
        cfsa_programs_parttime: "Canada Student Financial Assistance Programs - Part Time",
        cfsa_fulltime: "Canada Student Financial Assistance - Full Time",
        cfsa_parttime: "Canada Student Financial Assistance - Part Time",
        buttons: {
          continue: "Continue",
          start_application: "Start Application"
        }
      },
      full_time_eligibility: {
        title: "Full-time Canada Student Financial assistance eligibility",
        program_at_least_2_years: "Is your program 2 years (60 weeks) or longer in duration? ",
        family_size: "How big is your family? ",
        previous_year_gross_family_income: "What is your gross family income from the last year? ",
        dependants_under_twelve: "How many dependants do you have under the age of 12?",
        dependants_with_disability: "How many dependants older than 12 with a disability?"
      },
      independant_student: {
        title: "Independent student",
        out_of_school: "Have you been out of school for 4 years or more?",
        in_labour_force: "Have you been in the workforce for at least two years, while not in full-time studies? "
      },
      marital: {
        title: "Marital status",
        are_you_in_a_relationship:
          "Are you legally married or have you been in a common law relationship for at least one year?",
        have_you_ever_been_in_a_relationship: "Have you ever been married or in a common law relationship?"
      },
      parent: {
        title: "Single parent student",
        responsible_for_child: "Do you currently have physical custody and are responsible for supporting a child?",
        ever_been_a_single_parent:
          "Have you ever been a single parent and your children are currently not in your care?"
      },
      part_time_eligibility: {
        title: "Part-time student loan eligability",
        family_size: "What is your family size?",
        previous_year_gross_family_income: "What is your gross family income for the previous year?",
        enrolled:
          "Have you been enrolled in a degree, diploma, or technical program of at least 12 weeks of study within a 15 week period?",
        lived_in_yukon:
          "While you were not in full-time post secondary studies did you live in the Yukon for 12 months in a row?",
        dependants_under_twelve: "How many dependants do you have under the age of 12?"
      },
      single_parent_student_jurisdiction: {
        title: "Single parent student",
        most_recently_in_yukon:
          "Have you lived most recently in the yukon for 12 months not counting the time spent in full-time studies?"
      },
      yukon_grant: {
        title: "Yukon Grant eligibility",
        has_completed_two_years:
          "Have you completed at least (2) two years of secondary school in the Yukon school system?",
        out_of_school_4_years: "Have you been out of high school for 4 years or more?"
      }
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos"
    },
    menu: {
      heading: "Services gouvernementaux et informations",
      close: "Fermer"
    },
    faq: {
      title: "Foire aux questions"
    },
    components: {
      buttons: {
        disagree: "Disagree",
        back: "Back",
        save: "Save",
        cancel: "Cancel",
        agreecontinue: "Agree & Continue",
        continue: "Continuer"
      },
      more_detials: {
        more: "En savoir plus"
      },
      address_selector: {
        labels: {
          zip_postal_code: "Code postal",
          address_first: "Adresse municipale (ligne 1)",
          address_second: "Ligne 2 / Unité ou appartement"
        },
        buttons: {
          edit: "Éditer"
        }
      },
      date_selector: {
        labels: {
          year: "Année",
          month: "Mois",
          day: "Jour"
        }
      }
    },
    eligibility: {
      index: {
        title: "Vérification de l’admissibilité – Avant de commencer",
        body: "Merci de votre inscription. Avant de commencer à remplir votre demande, vérifiez votre admissibilité à d’autres programmes d’aide financière. Pour ce faire, cliquez sur le bouton ci-dessous pour voir les possibilités d’aide financière, puisque vous pourriez être admissible à plus d’un programme d’aide financière.",
        buttons: {
          check: "Vérifier mon admissibilité",
          cancel: "Cancel"
        }
      },
      citizenship: {
        title: "Éligibilité",
        body: [
          "Pour être admissible aux programmes d’aide financière, vous devez avoir la citoyenneté canadienne ou la résidence permanente."
        ],
        are_you_a_canadian_citizen: "Avez-vous la citoyenneté canadienne?",
        are_you_a_permanent_resident: "Avez-vous la résidence permanente au Canada?",
        are_you_a_protected_person: "Êtes-vous une personne protégée?",
        are_you_registered_as_indigenous: "Êtes-vous inscrit comme autochtone?"
      },

      dependant_student_jurisdiction: {
        title: "Étudiant à charge",
        has_family_maintained_home:
          "Votre famille a-t-elle habité au Yukon pendant 12 mois avant le début de vos études postsecondaires?"
      },
      designated_institution: {
        title: "Établissement agréé",
        are_you_enrolled_in_post_secondary: "Êtes-vous inscrit dans un établissement d’enseignement postsecondaire?",
        post_secondary_enrolled_in: "Sélectionnez l’école que vous comptez fréquenter.",
        notes:
          'Si votre école ne figure pas dans la liste, contactez notre bureau par courriel à <a href="mailto:sfa@yukon.ca">sfa@yukon.ca</a> pour nous fournir le nom et l’adresse courriel de votre école.',
        institutions: [
          "Collège du Yukon",
          "Alcan Air",
          "Université McMaster",
          "Université de la Colombie-Britannique",
          "Université de Windsor"
        ]
      },
      disabilities: {
        title: "Information sur les incapacités",
        permanent_disability: "Avez-vous une incapacité permanente?",
        service_equipment: "Avez-vous une incapacité persistante ou chronique qui devrait durer 12 mois ou plus?"
      },
      enrollment: {
        title: "Inscription",
        are_you_full_or_part_time: "Vous inscrivez-vous à des études à temps partiel ou à temps plein?",
        labels: {
          full_time: "Temps plein",
          part_time: "Temps partiel"
        },
        notes: {
          full_time: "is a minimum of 60% of a full course load.",
          part_time: "is 59% or less of a full course load.",
          contact:
            'If you are unsure of your status, please contact your educational institution to confirm. If you are a registered Apprentice, please contact <a href="mailto:apprenticeship@yukon.ca">apprenticeship@yukon.ca</a> for training and funding support.'
        }
      },
      yukon_excellence_award: {
        title: "Prix d’excellence du Yukon",
        how_much_would_like_to_apply_for: "Quelle somme aimeriez-vous demander?",
        note: "Vous pourriez recevoir le Prix d’excellence du Yukon si vous fréquentez une école secondaire du Yukon dans une classe de 10e à 12e année. Cette aide financière peut servir à payer les droits de scolarité, les frais obligatoires ou l’achat de livres pour suivre un programme ou une formation postsecondaire, jusqu’à concurrence de 3 000 $. Vous pouvez demander le montant total du Prix d’excellence du Yukon reçu ou en utiliser une partie chaque année.",
        labels: {
          balance: "Solde :"
        }
      },
      scholarship: {
        title: "Bourse d’études",
        are_you_a_high_school_student:
          "Êtes-vous en 12e année dans une école secondaire du Yukon et entrez-vous en première année d’un programme d’études postsecondaires?",
        are_you_a_high_school_graduate:
          "Avez-vous obtenu ou êtes-vous en voie d’obtenir un diplôme d’études secondaires au Yukon?",
        are_you_pursuing_aviation: "Suivez-vous une formation technique dans le domaine de l’aviation?",
        are_you_entering_visual_arts:
          "Entrez-vous en première année d’un programme en arts visuels dans l’année scolaire suivant immédiatement l’obtention de votre diplôme d’études secondaires?",
        enrolled_vocational:
          "Êtes-vous inscrit à la première ou la deuxième année d’un programme de formation professionnelle/technique d’un ou de deux ans?"
      },
      residency: {
        title: "Lieu de résidence",
        living_in_yukon_for_2_years:
          "Avez-vous habité à l’extérieur du Yukon pendant plus de quatre mois tout en n’étant pas aux études à temps plein?",
        did_you_move_during_2_years_more_4_months:
          "Aurez-vous résidé au Yukon pendant au moins deux ans avant le début de vos cours?",
        did_you_move_during_2_years_more_12_months:
          "Avez-vous habité à l’extérieur du territoire du Yukon pendant plus de 12 mois au cours des deux dernières années?",

        do_you_file_with_cra_as_yukon_citizen:
          "Produisez-vous votre déclaration de revenus à titre de résident du Yukon auprès de l’ARC?",
        valid_yukon_health_insurance: "Avez-vous une carte d’assurance-santé du Yukon valide?",
        drivers_lisence_another_jurisdiction:
          "Êtes-vous titulaire d’un permis de conduire délivré ailleurs qu’au Yukon?"
      },
      program: {
        title: "Programme",
        at_least_twelve_weeks: "Votre programme dure-t-il au moins 12 semaines consécutives?",
        at_least_three_weeks: "Is your program a minimum of 3 consecutive weeks?",
        what_type_of_program: "De quel type de programme s’agit-il?",
        options: [
          "Mise à niveau",
          "Certificat",
          "Diplôme",
          "Premier cycle universitaire",
          "Maîtrise",
          "Doctorat",
          "Aucune de ces réponses"
        ]
      },
      review: {
        title: "Programmes admissibles",
        excerpt: "Compte tenu des renseignements que vous avez fournis :",
        paragraph: {
          are_eligable: "Vous êtes admissible aux sources d’aide financière suivantes&nbsp;:",
          not_eligable: "Vous ne pouvez pas présenter une demande pour&nbsp;:"
        },
        none: "There are currently no eligibile programs.",
        types: {
          grant: "Grant",
          scholarship: "Scholarship",
          loan: "Loan"
        },
        notes:
          "Si vous voulez que l’on évalue votre demande pour l’un des programmes qui indiquent «&nbsp;Vous ne pouvez pas présenter une demande pour&nbsp;», veuillez cocher la case à côté du type d’aide financière et nous procéderons à l’évaluation.",
        cfsa_programs_fulltime: "Aide financière du gouvernement du Canada aux étudiants à temps plein",
        cfsa_programs_parttime: "Canada Student Financial Assistance Programs - Part Time",
        cfsa_fulltime: "Canada Student Financial Assistance - Full Time",
        cfsa_parttime: "Canada Student Financial Assistance - Part Time",
        buttons: {
          continue: "Continue",
          start_application: "Start Application"
        }
      },
      full_time_eligibility: {
        title: "Admissibilité à une aide financière aux étudiants du Canada à temps plein",
        program_at_least_2_years: "La durée de votre programme est-elle de deux ans (60 semaines) ou plus?",
        family_size: "Combien de personnes y a-t-il dans votre famille?",
        previous_year_gross_family_income: "Quel était votre revenu familial brut l’année dernière?",
        dependants_under_twelve: "Combien avez-vous de personnes à charge de moins de 12 ans?",
        dependants_with_disability: "Combien avez-vous de personnes à charge de plus de 12 ans et ayant une incapacité?"
      },
      independant_student: {
        title: "Étudiant indépendant",
        out_of_school: "Avez-vous cessé de fréquenter l’école pendant quatre ans ou plus?",
        in_labour_force: "Avez-vous travaillé pendant au moins deux ans tout en n’étant pas aux études à temps plein?"
      },
      marital: {
        title: "État civil",
        are_you_in_a_relationship: "Êtes-vous légalement marié ou en union de fait depuis au moins un an?",
        have_you_ever_been_in_a_relationship: "Avez-vous déjà été légalement marié ou en union de fait?"
      },
      parent: {
        title: "Étudiant chef de famille monoparentale",
        responsible_for_child:
          "Avez-vous actuellement la garde physique d’un enfant et la responsabilité de subvenir à ses besoins?",
        ever_been_a_single_parent:
          "Avez-vous déjà été chef de famille monoparentale et votre ou vos enfants ne sont plus actuellement à votre charge?"
      },
      part_time_eligibility: {
        title: "Part-time student loan eligability",
        family_size: "What is your family size?",
        previous_year_gross_family_income: "What is your gross family income for the previous year?",
        enrolled:
          "Have you been enrolled in a degree, diploma, or technical program of at least 12 weeks of study within a 15 week period?",
        lived_in_yukon:
          "While you were not in full-time post secondary studies did you live in the Yukon for 12 months in a row?",
        dependants_under_twelve: "How many dependants do you have under the age of 12?"
      },
      single_parent_student_jurisdiction: {
        title: "Étudiant chef de famille monoparentale",
        most_recently_in_yukon:
          "Avez-vous récemment vécu au Yukon pendant 12 mois, sans compter le temps passé aux études à temps plein?"
      },
      yukon_grant: {
        title: "Admissibilité à la Bourse du Yukon",
        has_completed_two_years: "Avez-vous fait au moins deux années d’études secondaires au Yukon?",
        out_of_school_4_years: "Avez-vous cessé de fréquenter l’école secondaire pendant quatre ans ou plus?"
      }
    }
  }
};
export default createI18n({
  locale: "en", // <--- 1
  fallbackLocale: "fr", // <--- 2
  legacy: false,
  messages
});
