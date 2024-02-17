This repo is a template for Electron applications that are intended to be published to Steam. It includes...
* An example Electron app with Vite and React
* Complete CI/CD workflow (for Github Actions) to build and publish to Steam

## Getting Started

* Replace the name of your game in `index.html`
* Update the `name`, `description`, `productName`, and `productDescription` in `package.json`
* Update the `ops-email` in `CODE_OF_CONDUCT.md`
* Update the `gitEmail` and `zipPrefix` in `.github/workflows/publish.yml`

### Setting up Steam

To set up automatic publishing to Steam, we'll have to get a handful of things ready on the Steam side.

#### Create your Partner account

Before you can do anything else, you'll need to set up a Steam Partner account through [Steamworks](https://partner.steamgames.com/). This will require signing in with your existing Steam account, putting in a bit of personal and financial information, then waiting a couple days for your account to be approved.

Once you have a partner account, you can create your first application! Note that this will run you (as of this posting) USD$100.

#### Setup your application

The first thing we need to do is create the depots (sort of like repositories for game binaries) for your app. The CI/CD in this repo expects you to have 3 depots: 1 for your Windows build, 1 for your macOS build, and 1 for your Linux build. You can create/update your depots by going to:
`Steamworks Partner Dashboard` -> `Your Application` -> `Edit Steamworks Settings` -> `SteamPipe` -> `Depots`

> [!IMPORTANT]
> You should create your repos in the order listed above, otherwise they won't correlate to the right depot IDs in our CI/CD pipeline. If you have created your depots out-of-order, you'll just need to update the `depotXPath` values in the `Publish Builds to Steam` step of `.github/workflows/publish-to-steam.yml`.

This is what the depot configs look like [_The Inn at Nightfall_](https://store.steampowered.com/app/2728830/The_Inn_at_Nightfall/):
![Depot settings for The Inn at Nightfall](./public/depots-config.png)

#### Create a build account

Steam recommends creating a separate account for automated builds. This way you can give the build account only the necessary permissions, limiting the access an attacker may have if they compromise the account credentials. The alternative is that you _could_ use your own account, but if it's compromised then the attacker has complete control over everything in your partner account **and** your regular Steam account.

Once you've created your build account, you can log back into your partner account and add it to your partner account by going to: `Users & Permissions` -> `Manage Users`. You'll need to invite the build account and go through a few steps of approving access.

Next you'll need to add the build account to a group that has the appropriate permissions. You can create a new group by going to: `Users & Permissions` -> `Manage Groups`. Add your application to the new group, then add the build user to the group. You'll need to give the build user the following permissions:
* Edit App Metadata
* Publish App Changes To Steam

The final step is going to be generating a VDF for the build account.

* Install Valve's official CLI, [`steamcmd`](https://partner.steamgames.com/doc/sdk/uploading#1), on your machine.
* Login with your build account credentials:
	`steamcmd +login <username> <password> +quit`
* Encode the contents of the generated `config.vdf` as a base64 string.
	(on *nix devices, you can usually run `cat config/config.vdf | base64 > config_base64.txt`)

> [!NOTE]
> **Finding `config.vdf`**
> I installed `steamcmd` on macOS with Homebrew, and the generated file was at `~/Library/Application Support/Steam/config/config.vdf`. Depending on your operating system/installation method, the file may be generated elsewhere.

There are [instructions on how to do this](https://github.com/game-ci/steam-deploy/tree/v3/?tab=readme-ov-file#configvdf) on the README for the [`game-ci/steam-deploy`](https://github.com/game-ci/steam-deploy/) repo.

#### Setup Github secrets

With all of the preceding steps complete, it's time to add some secrets (`Settings` -> `Secrets and variables` -> `Actions`) to your Github repo:

* `STEAM_APP_ID` - The ID of your Steam application
* `STEAM_BUILD_USERNAME` - The username of your build account
* `STEAM_BUILD_CONFIG_VDF` - The base64 encoded contents of the `config.vdf` generated from `steamcmd`
* `STEAM_DEMO_APP_ID` - The ID of your Steam demop application (if applicable)

### Setting up Apple

* `APPLE_API_ISSUER_ID` -
* `APPLE_API_KEY_CONTENT` -
* `APPLE_API_KEY_ID` -
* `APPLE_CERT_DATA` -
* `APPLE_CERT_KEYCHAIN_PASSWORD` -
* `APPLE_CERT_PASSWORD` -
