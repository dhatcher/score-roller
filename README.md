# 5e Ability Score Roller

5e Ability Score Roller is an ability score roller for Dungeons and Dragons ( D&D DnD etc. ) 5e. It generates 6 ability scores. By default, each 
ability score is created by rolling four six sided (d6) dice and dropping the lowest value. You may change this to 
roll only 3d6 in settings.

Each time you roll the Point Buy cost will be displayed for each ability score and a total will be displayed towards the
bottom of the screen. Scores of 8 or lower have a zero cost, 9-13 have a 1 point cost and scores of 14 or higher 
have a cost of 2. You can change the cost of low and high scores in settings, making scores below 8 have a negative cost
and/or causing scores above 15 to only cost one point.

### Point Buy Range
If you want sets of scores within a certain Point Buy range you can use the **Point Cost Range** slider to set a given
range. If, for instance, you wanted only scores that cost the standard 27 points, you could set both the minimum and 
maximum to 27 and then all sets generated would be of that cost.


*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

