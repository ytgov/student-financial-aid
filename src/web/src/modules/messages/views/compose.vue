<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" sm="12" md="6">
        <h2 class="text-h4 mb-7">{{ $t("title") }}</h2>
      </v-col>
      <v-col cols="6" sm="12" md="6" class="text-right">
        <nav>
          <v-btn @click="$router.go(-1)">Back</v-btn>
        </nav>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
       <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
          <v-form @submit.prevent="submit" v-model="valid">
            <fieldset class="group">
              <!-- <ValidationProvider name="First Name" rules="required|max:10" tag="span" v-slot="{ errors, valid }"> -->
                <TextField name="Subject" v-model="subject" label="Subject" :errors="errors" :valid="valid" />
             <!--  </ValidationProvider> -->

              <!-- <ValidationProvider name="Bodye" rules="required|max:256" tag="span" v-slot="{ errors, valid }"> -->
                <TextArea name="First Name" v-model="message" label="Message" :errors="errors" :valid="valid" />
             <!--  </ValidationProvider> -->
            </fieldset>
            <fieldset>
              <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
                {{ $t("buttons.save") }}
              </v-btn>
            </fieldset>
          </v-form>
        <!-- </ValidationObserver> -->
      </v-col>
    </v-row>
    <BlackoutNotice ref="blackout" />
  </v-container>
</template>

<script>
import TextField from "@/components/forms/TextField.vue";
import TextArea from "@/components/forms/TextArea.vue";
import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

export default {
  components: {
    BlackoutNotice,
    TextField,
    TextArea,
  },
  data() {
    return {
      valid: false,
      message: "",
      subject: "",
    };
  },
  methods: {
    async send() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        await this.$refs.blackout.open({
          text: "Saved",
          timeout: true,
        });
        //await this.$store.commit('student/SET', this.profile)
      }
    },
  },
};
</script>
