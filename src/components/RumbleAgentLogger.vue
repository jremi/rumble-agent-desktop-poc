<template>
  <div class="rumble-agent-logger mb-4">
    <pre>{{ stdOut }}</pre>
  </div>
</template>

<script>
export default {
  name: 'RumbleAgentLogger',
  props: {
    stdOut: {
      type: String,
      default: '',
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.rumble-agent-logger {
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 0.5rem;
  font-size: 0.55rem;
}
</style>
