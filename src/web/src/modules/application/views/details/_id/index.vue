<template>
  <v-container fluid>
    <h2 class="text-h3 mb-7">2018/2019 - Yukon College</h2>
    <p class="text-body-1">Submitted - 2018/06/30</p>

    <v-card>
      <h3>Funding Sources</h3>

      <div class="funding_sources" v-if="funding_sources.length">
        <div v-for="(source, index) in funding_sources" :key="index" onclick="this.classList.toggle('open')">
          <div>
            <strong>{{ source.name[locale] }}</strong
            ><br />
            <small>{{ $t(`application.details.funding_sources.statuses.${source.status}`) }}</small>
            <div class="details">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </div>
          </div>
          <div style="width: 5%"></div>
        </div>
      </div>
      <div v-else>
        <p>{{ $t("application.details.funding_sources.none") }}</p>
      </div>
    </v-card>

    <v-card>
      <h3>Supporting Documents</h3>

      <div class="supporting_documents" v-if="supporting_documents.length">
        <div v-for="(sd, index) in supporting_documents" onclick="this.classList.toggle('open')" :key="index">
          <div style="width: 5%">
            <i class="far fa-2x fa-check-square" v-if="sd.status == 'VERIFIED'"></i>
            <i class="far fa-2x fa-clock" v-else-if="sd.status == 'PENDING'"></i>
            <i class="fas fa-2x fa-cloud-upload-alt" v-else-if="sd.status == 'UPLOADING'"></i>
          </div>
          <div>
            <strong>{{ sd.name[locale] }}</strong
            ><br />
            <small>{{ sd.status }}</small>
            <div class="details">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </div>
          </div>
          <div style="width: 5%"></div>
        </div>
      </div>
      <div v-else>
        <p>{{ $t("sd.none") }}</p>
        <p>
          <nuxt-link to="/application" class="btn">
            <v-btn color="primary" class="mr-5">
              {{ $t("sd.buttons.apply") }}
            </v-btn>
          </nuxt-link>
        </p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      open: false,
      active: false
    };
  },
  computed: {
    ...mapGetters({
      funding_sources: "funding_sources/list",
      supporting_documents: "documents/list"
    }),
    locale() {
      return this.$i18n.locale;
    }
  }
};
</script>

<style lang="scss" scoped>
div.funding_sources,
div.supporting_documents {
  margin-top: 1rem;
  pointer-events: all;
  > div {
    display: flex;
    align-items: center;

    padding: 0.5rem 0;

    &:hover {
      cursor: pointer;
    }

    border-top: solid 1px #eee;
    &:last-of-type {
      border-bottom: solid 1px #eee;
    }

    > div {
      position: relative;
      width: auto;
      padding: 1rem 2rem;

      > div.details {
        height: 0;
        opacity: 0;
      }

      align-self: self-start;

      &:last-of-type {
        text-align: right;
        &::before {
          position: absolute;
          top: 1rem;
          right: 2rem;

          border-style: solid;
          border-width: 0.25em 0.25em 0 0;
          content: "";
          display: inline-block;
          height: 0.6em;

          transform: rotate(45deg);
          vertical-align: top;
          width: 0.6em;

          color: #00818f;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    &.open {
      > div {
        &:last-of-type {
          &::before {
            transform: rotate(135deg);
          }
        }
        > div.details {
          height: auto;
          opacity: 1;
        }
      }
    }
  }
}
</style>
