const RUMBLE_AGENT_BIN_PATH = '/opt/rumble/bin';
const RUMBLE_AGENT_BIN_PREFIX = 'rumble-agent';
const { execSync, spawn } = require('child_process');
const { readdirSync } = require('fs');

const findProcess = require('find-process');

const rumbleBinDir = readdirSync(RUMBLE_AGENT_BIN_PATH);
const rumbleAgentBin = rumbleBinDir.find((filename) =>
  filename.includes(RUMBLE_AGENT_BIN_PREFIX)
);

const rumble = `${RUMBLE_AGENT_BIN_PATH}/${rumbleAgentBin}`;

function getRumbleAgentLicense (callback) {
  const rumbleAgentLicense = spawn(rumble, ['--license']);
  rumbleAgentLicense.stderr.on('data', (cliOutput) =>
    callback(JSON.parse(cliOutput.toString().split('Tag: ')[1]))
  );
}

function executeRumbleAgentCli (cliArgs = '', sudoPwd) {
  let stdout;
  let stderr;
  try {
    stdout = execSync(
      `sudo -S <<< ${sudoPwd} ${RUMBLE_AGENT_BIN_PATH}/${rumbleAgentBin} ${cliArgs}`
    ).toString();
  } catch (err) {
    stderr = err.toString();
    if (cliArgs.includes('--license')) {
      stderr = JSON.parse(stderr.split('Tag: ')[1]);
    }
  }
  return {
    stdout,
    stderr
  };
}

function findRumbleAgentSystemPid (callback) {
  findProcess('name', RUMBLE_AGENT_BIN_PREFIX)
    .then(function (pids) {
      const rumbleAgentPid = pids.find(
        (pid) => pid.name === rumbleAgentBin
      );
      callback(null, rumbleAgentPid);
    })
    .catch((err) => callback(err));
}

getRumbleAgentLicense((license) => {
  window.rumble = {
    agent: {
      tag: license,
      utils: {
        restart: function (sudoPwd) {
          return executeRumbleAgentCli('restart', sudoPwd);
        },
        uninstall: function (sudoPwd) {
          return executeRumbleAgentCli('uninstall', sudoPwd);
        },
        findPid: function (callback) {
          findRumbleAgentSystemPid(callback);
        }
      }
    }
  };
});
