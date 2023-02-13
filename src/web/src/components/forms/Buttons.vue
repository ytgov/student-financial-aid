<template>
  <div class="buttons mt-14">
    <div class="text-left">
      <v-btn class="back" color="hollow" @click="$router.go(-1)" v-if="back" x-large>
        <span v-if="atipp">{{ $t("components.buttons.disagree") }}</span>
        <span v-else>{{ $t("components.buttons.back") }}</span>
      </v-btn>
    </div>
    <div class="text-center">
      <a @click="save" v-if="valid && save">
        {{ $t("components.buttons.save") }}
      </a>
      <a @click="cancel" v-if="cancel">
        {{ $t("components.buttons.cancel") }}
      </a>
    </div>
    <div class="text-right">
      <v-btn :to="next" class="continue" color="primary" v-if="valid && next" x-large>
        <span v-if="atipp">{{ $t("components.buttons.agreecontinue") }}</span
        ><span v-else>{{ $t("components.buttons.continue") }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["valid", "next", "back", "save", "cancel", "atipp"]
};
</script>
