<template>
  <div class="rumble-agent-accordion accordion mt-3" role="tablist">
    <!-- License -->
    <b-card noBody class="mb-1">
      <b-card-header headerTag="header" class="p-1" role="tab">
        <b-button v-wave v-b-toggle.accordion-1 block>License</b-button>
      </b-card-header>
      <b-collapse
        id="accordion-1"
        visible
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-card-text><b class="mr-1">Type:</b>{{ rumble.agent.tag.license_type }}</b-card-text>
          <b-card-text><b class="mr-1">Version:</b>{{ rumble.agent.tag.license_version }}</b-card-text>
          <b-card-text><b class="mr-1">Expiration:</b>{{ rumble.agent.tag.license_expiration | moment('LL') }}
          </b-card-text>
          <b-card-text><b class="mr-1">Max Assets:</b>
            <b-badge>
              <h6 class="mb-0">{{ rumble.agent.tag.license_max_assets }}</h6>
            </b-badge>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- Client -->
    <b-card noBody>
      <b-card-header headerTag="header" class="p-1" role="tab">
        <b-button v-wave v-b-toggle.accordion-2 block>Client</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text><b class="mr-1">Name:</b>{{ rumble.agent.tag.client }}</b-card-text>
          <b-card-text><b class="mr-1">Organization:</b>{{ rumble.agent.tag.organization }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- Version -->
    <b-card noBody class="mb-1">
      <b-card-header headerTag="header" class="p-1" role="tab">
        <b-button v-wave v-b-toggle.accordion-3 block>Version</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text><b class="mr-1">Agent Version:</b>{{ rumble.agent.tag.version }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- Raw -->
    <b-card noBody class="mb-1">
      <b-card-header headerTag="header" class="p-1" role="tab">
        <b-button v-wave v-b-toggle.accordion-4 block>Raw</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <pre>{{ rumble.agent.tag }}</pre>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'RumbleAgentAccordion',
  props: {
    rumble: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
