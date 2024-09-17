
# Prerequisites

This workshop is a hands-on workshop for software developers. To participate, you need to have some [Software and Tools](#software-and-tools) installed.

On average, it takes about 60 to 90 minutes to install everything, so please plan accordingly.

If you encounter any issues or have any questions, please reach out on Let there be Lightning's [Discord community](https://discord.gg/Q7utrQ5Sz7).

> [!IMPORTANT]
> If you attend an instructor-led session, there will not be any time to do this during the workshop, so please make sure to have everything installed and ready to go **before** the start of the workshop.

## Software and Tools

### Git

Since we will be using git to clone the workshop repository to have the same starting point, make sure you have git installed on your system.

It is very probable that you already have it installed, but if you don't, you can check by running `git --version` in a terminal. If it is installed, a version number will be returned, if not, you will see an error message.

If you don't get a version returned, you can follow the instructions from [git-scm](https://git-scm.com/downloads) or [github](https://github.com/git-guides/install-git) to install it.

### React Native

The mobile development framework used will be **React Native**, as it allows building applications for both Android and iOS using JavaScript and React.

1. Install **Node.js** (version 14 or newer) from [here](https://nodejs.org/).
2. Install **Watchman** for macOS from [Homebrew](https://formulae.brew.sh/formula/watchman) or skip this step if you're on Linux/Windows.
3. Install the **React Native CLI** by running the following command in your terminal:
    ```bash
    npm install -g react-native-cli
    ```

Follow the official [React Native setup instructions](https://reactnative.dev/docs/environment-setup) to set up either an Android or iOS environment. Ensure that `react-native doctor` returns no errors after installation.

> [!CAUTION]  
> Make sure to select **React Native CLI Quickstart** and configure your environment for either iOS or Android depending on your development needs.

You only need to configure one platform (iOS or Android) for this workshop, but setting up both is recommended if you plan to develop for both platforms.

### IDE or code editor

The instructor of the workshops will be using [VSCodium](https://vscodium.com/), a free and open-source distribution of [Visual Studio Code](https://code.visualstudio.com/) without Microsoft's telemetry/tracking. However, any IDE or code editor can work.

If you install VSCodium, make sure to also install the **React Native Tools** extension from [Open VSX](https://open-vsx.org/extension/msjsdiag/vscode-react-native).
