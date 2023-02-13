<template>
	<v-container fluid v-if="eligibility">
		<h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
		<p>
			{{ $t('excerpt') }}
		</p>

		<v-card>
			<section class="header">
				<h3>Funding Sources</h3>
			</section>
			<section class="content">
				<br />
				<ul>
					<li v-for="program in programs">
						{{program.name[locale]}} 
					</li>
				</ul>

				<p class="buttons">
		  		<v-btn to="/eligibility/review?revise=true" color="primary"  class="mr-5" x-large>
		  			{{ $t("buttons.edit") }}
		  		</v-btn>
			  </p>
			</section>
		</v-card>
		<v-card>
			<section class="header">
				<small>Section 1</small>
				<h3>Program Information</h3>
			</section>
			<section class="content" >

				<table>
					<tbody>
						<tr>
							<td>Institution</td>
							<td>{{eligibility.designated_institution.post_secondary_enrolled_in||'None'}}</td>
						</tr>
						<tr>
							<td>Campus</td>
							<td>{{eligibility.designated_institution.details.campus||'None'}}</td>
						</tr>
						<tr>
							<td>Name of Program</td>
							<td>{{eligibility.designated_institution.details.program_name||'None'}}</td>
						</tr>
						<tr>
							<td>Program Type</td>
							<td>{{eligibility.program.what_type_of_program||'None'}}</td>
						</tr>
						<tr>
							<td>Program Duration</td>
							<td>{{eligibility.designated_institution.details.duration_of_program||'None'}}</td>
						</tr>
						<tr>
							<td>Year of program you are entering</td>
							<td>{{eligibility.designated_institution.details.year_entering}}</td>
						</tr>
						<tr>
							<td>Is this a correspondence or distance learning program?</td>
							<td></td>
						</tr>
						<tr>
							<td>Start date of your classes</td>
							<td>{{eligibility.designated_institution.details.start_date_of_classes|formatNiceDate}}</td>
						</tr>
						<tr>
							<td>End date of your classes (including exams)</td>
							<td>{{eligibility.designated_institution.details.end_date_of_classes|formatNiceDate}}</td>
						</tr>
					</tbody>
				</table>


				<p class="buttons">
		  		<v-btn to="/application/program-details?revise=true" color="primary"  class="mr-5" x-large>
		  			{{ $t("buttons.edit") }}
		  		</v-btn>
			  </p>
			</section>
		</v-card>


		<v-card>
			<section class="header">
				<small>Section 2</small>
				<h3>Residency Information</h3>
			</section>
			<section class="content">
				<br />

				<h4>Perminent Address:</h4>
        <AddressSelector v-model="profile.HOME_ADDRESS1" :value="profile.HOME_ADDRESS1" style="width:  70%" />

        <h4>Address While at School:</h4>
        <AddressSelector v-model="profile.HOME_ADDRESS2" :value="profile.HOME_ADDRESS2" style="width:  70%"/>

				<p class="buttons" v-if="false">
		  		<v-btn :to="`/application/personal-information/address/perminent?revise=true`" color="primary"  class="mr-5" x-large>
		  			{{ $t("buttons.edit") }}
		  		</v-btn>
			  </p>
			</section>
		</v-card>

		<v-card>
			<section class="header">
				<small>Section 3</small>
				<h3>Documents</h3>
			</section>
			<section class="content">
				<br />

		    <section class="documents">
					<div v-for="doc in documents" v-if="doc.DESCRIPTION!=null">
						<div style="width: 5%;">
	            <i class="far fa-2x fa-check-square" v-if="doc.status=='VERIFIED'"></i>
	            <i class="fas fa-2x fa-cloud-upload-alt" v-else-if="doc.status=='UPLOADING'"></i>
	            <i class="far fa-2x fa-clock" v-else></i>
	          </div>
						<div>
							<strong>{{doc.DESCRIPTION}}</strong><br />
							<small>{{doc.status||'PENDING'}}</small>
						</div>
						<div>

						</div>
					</div>
				</section>

			</section>
		</v-card>

		 <Buttons :valid="valid" :next="next" back="true" />


	</v-container>
</template>


<style lang="scss" scoped>

section.accordian {
	> section {
		padding-bottom: 2rem;
	}
}

table {
	margin: 1rem 0;
	> tbody {
		> tr {
			> td {
				padding: 0.25rem 0;
				padding-right: 2rem;
				font-size: 0.8rem;

				&:nth-of-type(1) {
					font-weight: bold;
				}
			}
		}
	}
}

</style>

<i18n>
{
  "en": {
  	"title": "Review Application",
  	"excerpt": "Please review your application to ensure it is correct. If changes are required, click the “edit” button. Once corrected, continue to next section.",
  	"buttons": {
  		"edit": "Edit",
  		"continue": "Continue"
  	}
  },
  "fr": {
  	"title": "Vérification de votre demande",
  	"excerpt": "Veuillez passer en revue votre demande pour vous assurer de l’exactitude des renseignements fournis. Pour faire des changements, cliquez sur le bouton « Edit ». Une fois les corrections entrées, continuez vers la prochaine section.",
  	"buttons": {
  		"edit": "Edit",
  		"continue": "Continue"
  	}
  }
}
</i18n>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AddressSelector from "~/components/forms/AddressSelector.vue";
import Buttons from '~/components/forms/Buttons.vue';

export default {
	components: {
		AddressSelector,
		Buttons
	},
  computed: {
    ...mapGetters({
    	eligibility: 'eligibility/GET',
    	programs: 'applications/programs',
    	documents: 'documents/list'
      //ap: 'applications/programs'
    }),
    locale() {
      return this.$i18n.locale
    },
    profile: {
      get() {
        return this.$store.getters['student/GET']
      },
      set(values) {
        this.$store.commit('student/SET')(values)
      }
    },
    perminent_addresses_updated() {
    	return this.profile.HOME_ADDRESS1
    },
    at_school_address_updated() {
    	return this.profile.HOME_ADDRESS2
    }
  },
  mounted() {
  	/*
  	this.$nexttick(()=>{
  		if (!this.eligibility) {
	  		this.$router.push(`/eligibility`)
	  	}
  	})
  	*/
  },
  methods: {
  	valid() {
      var is_valid = true
      return is_valid
    },
    next() {
      return this.localePath('/application/thanks')
    }
  },
  watch: {
  	perminent_addresses_updated(to, from) {
  		this.$store.commit('student/SET', this.profile)
  	},
  	at_school_address_updated(to, from) {
  		this.$store.commit('student/SET', this.profile)
  	}
  }
}
</script>


<style lang="scss" scoped>



section.documents{
	> div {
		display: flex;
		margin-top: 1rem;
		margin-bottom: 1rem;

		border-top: solid 1px #eee;
		&:last-of-type {
			border-bottom: solid 1px #eee;
		}

		> div {
			width: 100%;
			padding: 2rem 0;
			&:nth-of-type(1) {
				min-width: 20%;
			}
			&:nth-of-type(2) {
				width: auto;
				white-space: nowrap;
				text-align: left;
				padding: 2rem;
			}
			&:last-of-type {
				text-align: right;
				min-width: 20%;
			}
		}
	}
}

@media only screen and (max-width: 1024px) {

  section.documents {
  	> div {
  		display: grid;
  		grid-template-columns: 6fr 6fr;
  		padding: 1rem 0;
  		> div {
  			min-width: 100%;
  			padding: 0.25rem 0 !important;

  			&:nth-of-type(1) {
					grid-row: 1;
					grid-column: 1;
					
				}
				&:nth-of-type(2) {
					grid-row: 2;
					grid-column: 1;
					text-align: left;
				}
				&:last-of-type {
					grid-row: 2;
					grid-column: 2;
					
					text-align: right;
				}
  		}
  	}
  }
}


</style>