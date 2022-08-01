<template>
  <div class="rumble-agent-utils-actions mt-3 mb-3">
    <b-button v-wave variant="warning" @click="openRumbleConsole">
      <b-icon icon="globe" class="mr-2" />Console
    </b-button>
    <b-button
      v-wave
      variant="warning"
      class="ml-2"
      @click="restartRumbleAgent"
    >
      <b-icon icon="arrow-repeat" class="mr-2" />Restart
    </b-button>
    <b-button
      v-wave
      variant="warning"
      class="ml-2"
      @click="uninstallRumbleAgent"
    >
      <b-icon icon="trash" class="mr-2" />Uninstall
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'RumbleAgentUtilsActions',
  props: {
    rumble: {
      type: Object,
      required: true
    }
  },
  methods: {
    openRumbleConsole: function () {
      this.nw.Shell.openExternal(this.rumble.agent.tag.console);
    },
    restartRumbleAgent: function () {
      this.promptSystemPassword((password) => {
        if (password) {
          const { stdout, stderr } = this.rumble.agent.utils.restart(password);
          if (!this.hasStdErr(stderr)) {
            this.$snotify.success('Agent restarted successfully', 'Restarted!');
            this.$emit('onStdOut', stdout);
          }
        }
      });
    },
    uninstallRumbleAgent: function () {
      this.promptSystemPassword((password) => {
        if (password) {
          const { stdout, stderr } = this.rumble.agent.utils.uninstall();
          if (!this.hasStdErr(stderr)) {
            this.$snotify.success('Agent uninstalled successfully', 'Uninstalled!');
            this.$emit('onStdOut', stdout);
          }
        }
      });
    },
    promptSystemPassword: function (callback) {
      this.$snotify.prompt('Requires system password', 'Sudo Password', {
        buttons: [
          {
            text: 'Cancel',
            action: ({ id }) => {
              this.$snotify.remove(id);
              callback();
            }
          },
          {
            text: 'Confirm',
            bold: true,
            action: ({ id, value: password }) => {
              if (!password) {
                this.$snotify.error('Password required.');
                return;
              }
              this.$snotify.remove(id);
              callback(password);
            }
          }
        ],
        placeholder: 'Password'
      });
      this.$nextTick(() => document.querySelector('.snotifyToast__input input').type = 'password');
    },
    hasStdErr: function (stderr) {
      if (!stderr) {
        return false;
      } else if (stderr.includes('incorrect password attempt')) {
        this.$snotify.error('The password you entered was not correct. Please try again', 'Invalid Password');
        return true;
      } else {
        this.$snotify.error('Problem occured!', 'Whoops!');
        return true;
      }
    }
  }
};
</script>
