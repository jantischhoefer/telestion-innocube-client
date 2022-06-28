# telestion-innocube-client

[![Created using the @wuespace/telestion-client-cli](https://img.shields.io/badge/created%20using-%40wuespace%2Ftelestion--client--cli-%23452897)](https://github.com/wuespace/telestion-client/tree/main/packages/telestion-client-cli)

This is the currently working version of the [Telestion Client](https://github.com/wuespace/telestion-client)
for the InnoCube project.

This repository is part of the bachelor thesis of Jan Tischhöfer and shows a proof of concept
how you can automatically generate a Telecommand User Interface from given .yaml configuration files.
It includes enhancements of the Telestion Client which make it usable on all device sizes.

## Preparations

The following tools are needed to build the Telestion Innocube Client:

- [NodeJS](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)

Also make sure you have [Verdaccio](https://verdaccio.org/) installed and running:

```
pnpm install -g verdaccio
verdaccio
```

Next, set up pnpm to use the current Verdaccio instance as the main npm registry:

```
pnpm set registry http://localhost:4873/
pnpm adduser --registry http://localhost:4873/
```
Additionally, you have to create a `.npmrc` file in your home directory and paste/append the following content into it:
```
registry=http://localhost:4873
```

Now, you have to clone the parcel-resolver-corfu-config repository, which is the package
that is responsible for reading and parsing the configuration files.
Clone it into your desired root folder for this project setup.

```
git clone git@github.com:jantischhoefer/parcel-resolver-corfu-config.git
cd parcel-resolver-corfu-config
```

Make sure that in `src/resolver.ts` your `pathToConfig` is pointing to the directory where
your configuration files are located.
By default, it searches for the `on-board-software-master` directory outside this project.
If you have access to the repository, simply clone the current InnoCube OnBoard Software master
[Gitlab Uni Würzburg](https://gitlab2.informatik.uni-wuerzburg.de/innocube/on-board-software/-/tree/master/)
next to the parcel-resolver-corfu-config and your Telestion Client.
If you're configuration directory is located somewhere else and is named differently
you have to change the `path.resolve(...)` command to point to your directory.
Here you can take a look at how [path.resolve()](https://nodejs.org/api/path.html#pathresolvepaths) works.
Now that this is set up, you can build the project and publish it to your local registry:

```
pnpm install
pnpm build
pnpm publish --no-git-checks
```
If you get an error like:
```
npm ERR! code EPUBLISHCONFLICT
npm ERR! publish fail Cannot publish over existing version.
npm ERR! publish fail Update the 'version' field in package.json and try again.
npm ERR! publish fail 
npm ERR! publish fail To automatically increment version numbers, see:
npm ERR! publish fail     npm help version

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/jan/.npm/_logs/2022-06-28T21_41_19_971Z-debug-0.log
```
Just increment the version in the package.json of the parcel-resolver-corfu-config and run pnpm publish again.


Now let's clone the extended version of the Telestion Client into to the project root folder
next to the parcel-resolver-corfu-config:
```
git clone git@github.com:jantischhoefer/telestion-client.git
cd telestion-client
git checkout feat/responsiveness
```
We also have to build that project and push it to the local registry:
```
pnpm install
pnpm build
pnpm publish --no-git-checks --recursive --filter './packages/**/*'
```

After all these steps we have all needed dependencies in our local npm registry.

This is the time when we are able to clone the Project-specific client to our project root folder.
If you already cloned the Project-specific client just move into the folder and run `pnpm install`.
Otherwise, clone it first:
```
git clone git@github.com:jantischhoefer/telestion-innocube-client.git
cd telestion-innocube-client
pnpm install
```
After all the dependencies have been installed, we can run the client application.
```
pnpm start
```

To be able to see if our telecommands are sent on a button press we can run a simple mock server that
listens to the outgoing address for the telecommand messages, logs them to the console and responds to them:

```
git clone git@github.com:jantischhoefer/mock-server.git
cd mock-server

pnpm install
pnpm test
```

Everything should be set up and running now.
Feel free to play around in the Telecommand Client, switch the dashboards and send out some Telecommands.

If you find any bugs or can think of additions or improvements open an issue or contact me on GitHub.

