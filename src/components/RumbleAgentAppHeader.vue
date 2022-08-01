<template>
  <div class="rumble-agent-app-header d-flex align-items-center">
    <img alt="logo" src="@/assets/rumble-logo-h-color.svg" class="logo" />
    <div class="slogan font-weight-bold display-6">Agent Desktop</div>
  </div>
</template>

<script>
export default {
  name: 'RumbleAgentAppHeader'
};
</script>

<style lang="scss" scoped>
@import '@/styles/brand-colors';

.rumble-agent-app-header {
  z-index: 1;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 1rem 3rem;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);

  .logo {
    width: 240px;
  }

  .slogan {
    color: $rumble-brand-navy;
    display: inline-block;
    margin-left: 1rem;
    font-size: 1.25rem;
    margin-top: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: bold;
  }
}
</style>
