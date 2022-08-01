<template>
  <div id="app">
    <RumbleAgentAppHeader />
    <div class="container">
      <template v-if="isRumbleAgentReady">
        <RumbleAgentUtilsActions :rumble="rumble" @onStdOut="onStdOut" />
        <RumbleAgentAccordion :rumble="rumble" />
        <!-- <RumbleAgentLogger v-if="stdOut" :stdOut="stdOut" /> -->
      </template>
    </div>
    <vue-snotify />
  </div>
</template>

<script>
import RumbleAgentAccordion from '@/components/RumbleAgentAccordion.vue';
import RumbleAgentAppHeader from '@/components/RumbleAgentAppHeader.vue';
import RumbleAgentUtilsActions from '@/components/RumbleAgentUtilsActions.vue';
// import RumbleAgentLogger from '@/components/RumbleAgentLogger.vue';

export default {
  name: 'App',
  components: {
    RumbleAgentAccordion,
    RumbleAgentAppHeader,
    RumbleAgentUtilsActions
    // RumbleAgentLogger,
  },
  data: function () {
    return {
      rumble: { agent: {} },
      stdOut: null,
      taskTrayMenu: null,
      pidAlive: false,
      checkRumbleAgentPidIsAliveInterval: null
    };
  },
  methods: {
    onStdOut: function (data) {
      this.stdOut = data;
    },
    getRumbleAgentWrapper: function () {
      const waitForRumble = setInterval(() => {
        if (window.rumble) {
          clearInterval(waitForRumble);
          this.rumble = window.rumble;
        }
      }, 0);
    },
    createTray: function () {
      const tray = new nw.Tray({ icon: 'public/rumble-logo.png' });
      const menu = new nw.Menu();
      const menuItems = [
        {
          label: '🟡 Agent Status Unknown',
          enabled: false
        },
        { type: 'separator' },
        {
          label: 'Control Panel',
          click: () => this.nw.Window.getAll((appWindows) => appWindows[0].restore())
        },
        {
          label: 'Quit Rumble Agent Desktop',
          click: () => process.exit(1)
        }
      ];
      menuItems.forEach((item) => menu.append(new nw.MenuItem(item)));
      tray.menu = menu;
      this.taskTrayMenu = menu;
    }
  },
  computed: {
    isRumbleAgentReady: function () {
      return this.rumble.agent.tag;
    }
  },
  mounted: function () {
    this.nw.Window.getAll((appWindows) => {
      if (appWindows[0]) {
        appWindows[0].on('close', () => appWindows[0].minimize());
      }
    });
    this.checkRumbleAgentPidIsAliveInterval = setInterval(() => {
      this.rumble.agent.utils.findPid((err, pid) => {
        this.pidAlive = !!pid;
        this.taskTrayMenu.items[0].label = this.pidAlive ? '🟢 Agent Online' : '🔴 Agent Offline';
      });
    }, 3500);
    this.getRumbleAgentWrapper();
    this.createTray();
  },
  beforeDestroy: function () {
    this.clearInterval(this.checkRumbleAgentPidIsAliveInterval);
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/brand-colors';

#app {
  margin-top: 40px;
  background-color: $rumble-brand-body-bg;

  .container {
    margin-top: 6rem;
  }
}
</style>
