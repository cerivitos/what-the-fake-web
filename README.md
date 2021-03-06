<p align="center">
  <img style="text-align: center" src="https://github.com/cerivitos/what-the-fake-web/blob/master/src/assets/android-chrome-192x192.png?raw=true" height="240"/>
  <h1 align="center">

[What The Fake](https://wtf.notmydayjob.fyi)

  </h>
</p>

###

🤔 Choose which headline is REAL

🔥 5 rounds

🎖️ Challenge your friends

This is the web version of an Android game I made some time back. You can try out the app [here](https://play.google.com/store/apps/details?id=com.chanwaikit.fakenews).

## Stack

- Angular 13
- Tailwind CSS v3
- Firebase (Firestore and App Check)
- Hosted on Vercel

## Try it

Ensure you have installed the Angular CLI and clone the repo.

Install required dependencies

```
npm install
```

As this project uses Vercel serverless functions (located in the `/api` folder), we need to use a Vercel dev server to call the endpoints. Install the Vercel CLI and run

```
vercel dev
```

to start a dev server on `http://localhost:3000`.

## Notes

### Vercel

The setup of this app is specific to hosting on Vercel.

- As mentioned above, `/api/posts` and `api/query-env` endpoints will only work when hosted on Vercel, as Vercel will automatically create the serverless function end points.
- In addition, `api/query-env` reads a Vercel system env variable to get the latest commit hash to display as a version number.

### Firebase

Players can send a game link to challenge friends using the same set of news headlines.

- News headlines are stored in Firestore and dynamic routing using the Firestore document ID is used to retrieve the news headlines.
- Firebase App Check is used for authentication.

To try for yourself, you need to create your own Firebase project and replace the config object in `/src/environment.ts` and `/src/environment.prod.ts` with your own.

```
firebase: {
    apiKey: 'xxx',
    authDomain: 'xxx.firebaseapp.com',
    projectId: 'xxx',
    storageBucket: 'xxx.appspot.com',
    messagingSenderId: 'xxx',
    appId: 'xxx',
    measurementId: 'xxx',
  },
appCheck: {
    key: 'xxx',
  },
```

You also need to [configure App Check](https://firebase.google.com/docs/app-check) to whitelist your hosting domain.

Note: In my experience, some VPN and DNS settings block the App Check authentication flow. If you encounter 403 or 400 http errors, check if that is the issue.

### Services

The following services are used in this app:

- `get-posts.service.ts`: Retrieves the news headlines from the Reddit API.
- `game-controller.service.ts`: Handles the game loop, sets number of rounds and checks answers.
- `results.service.ts`: Writes to Firestore when the player creates a Challenge game, or updates the latest score to an existing Challenge game.

## Licence

MIT

## Appreciation 😀

If you like the game and want to support the developer, please consider [buying me a coffee](https://www.buymeacoffee.com/cerivitos).

<a href="https://www.buymeacoffee.com/cerivitos" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
