# **Rumble Agent Desktop (PoC)**

<img src="https://img.shields.io/badge/Status-Proof%20of%20Concept-orange" />

> **NOTICE:** This is only a proof of concept (PoC) designed to experiment with the [Rumble](https://rumble.run) agent background service process.

<img src="https://i.imgur.com/5XjEVvf.gif" />

# Proof of Concept (PoC)
For fun, I hacked together a desktop user-interface utility for interacting with the Rumble agent CLI application service. The utility is able to connect to the `rumble-agent` background process and extract the agent license details "tag". In addition, provides graphical buttons triggering service level actions (e.g: `restart`, `uninstall`). The utility runs in the operating systems task tray with a small Rumble icon. When the icon is tapped the user is provided with a small Rumble agent status indicator (e.g: Online, Offline), and Control Panel option.

**NOTE:** This tool is most likely unnecessary for actual real-world use-case since the `rumble-agent` works already with zero user interaction. However, for the pure intellectual curiousity of playing with `NW.js` crossed with `Vue.js` within a "JavaScript Desktop" environment, this PoC was created. The core concept of the application is the ability to interact with the `rumble-agent` cli service `stdin/stdout/stderr` using a graphical user interface (GUI) powered by a modern single page application library like `Vue.js`.

# Overview
[Rumble](https://rumble.run) provides a very cool network discovery and asset inventory solution.

When you configure the Rumble software "agent" on your local computer, Rumble installs to your system the Rumble binary application which dervies context based on the Rumble user / organization that installed the service. For example on a MacOS system the binary is located in `/opt/rumble/bin/rumble-agent-*`

The `*` in the filename denotes the specific agent identifier also known as the `organization_id`.

The binary provides several command-line interface (CLI) based arguments that can be passed to invoke service actions (e.g: `restart`, `uninstall`). In addition, calling argument flags such as `--license` will dump to stdout a JSON representation of the Rumble agent context. Thru this process, the end-user is able to manage/view various forms of collected discovery data via the Rumble web [console](https://console.rumble.run).

<img src="https://i.imgur.com/QI1YpNU.png"  width="600" />

# Core Stack
- `NW.js`
- `Vue.js`
- `BootstrapVue/Bootstrap`

# Video Demo
I created a quick unlisted YouTube video demo outlining how this PoC works. Click the video image thumbnail below to watch on YouTube 👇

<a href="http://www.youtube.com/watch?feature=player_embedded&v=rXbLS7jQ5Ok" target="_blank">
 <img src="https://img.youtube.com/vi/rXbLS7jQ5Ok/hqdefault.jpg" alt="Watch the video" width="426" height="240" border="0" />
</a>

# How does it work?
It utilizes [NW.js](https://nwjs.io) (previously known as node-webkit). NW.js website says, *"lets you call all Node.js modules directly from DOM and enables a new way of writing applications with all Web technologies."*

The NW.js is configured to work with [Vue.js](https://vuejs.org). To save time attempting to configure tooling, the following boilerplate was used to get the hot-reload and bundling setup [nwutils/nw-vue-cli-example](https://github.com/nwutils/nw-vue-cli-example).

I wrote a small Node.js wrapper to the `rumble-agent` binary servic which utilizes the Node.js `child_process` library notably `execSync` and `spawn`. In addition I also included a third-party package called `find-process` which enables for quickly scanning the system running process ids (PIDs) for locating a running `rumble-agent`. This is used as a process monitor indicator within the user-interface task tray menu. This is what is able to indicate if the agent is online or offline or status unknown. Every few seconds the Vue.js app calls the wrapper method to check system process for `rumble-agent` pid.

One of the stumbling blocks was the ability to trigger the `rumble-agent` service to perform (e.g: `restart`) from a graphical user-interface. This is because of `sudo` user level permission requirement.

To remedy this I was able to use `sudo -S <<< sudoPwd` (where `sudoPwd` is the provided argument passed to the `executeRumbleAgentCli(cliArgs, sudoPwd)` method. This enables the ability to provide the password to sudo via stdin and not get stuck on the standard shell sudo password prompt.

# Notable files of interest

- `public/libs/rumbleAgentWrapper.js`
> Provivdes the front-end Vue.js app the ability to obtain `rumble-agent` details and trigger cli-level actions against the agent from the UI. This is possible due to the NW.js enabling the ability to call Node.js modules directly from the DOM.

- `src/App.vue`
> Main entry to Vue app. This is where I get the `rumble-agent` wrapper object and configure the application system tray menu. In addition, establishing the background process to check the `rumble-agent` PID is active or inactive.

- `src/components/RumbleAgentUtilsActions.vue`
> Provides some different buttons for triggering actions against the `rumble-agent` (e.g: restart, uninstall). Each elevated permission level action that requires sudo triggers a prompt for system password. The provided password is what is passed into the node.js wrapper and sent to the actual cli level arguments to trigger the `rumble-agent`. The result of the executed cli action returns to the frontend the `stdout, stderr`. This is then parsed to determine if the the resulting action was successful or unsuccessful (e.g: Invalid `sudo` password provided.)

# Setup
Follow the [BOILERPLATE.md](BOILERPLATE.md) for additional details on how to develop using this codebase.
