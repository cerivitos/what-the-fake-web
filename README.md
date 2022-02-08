<p align="center">
  <img style="text-align: center" src="https://github.com/cerivitos/what-the-fake-web/blob/master/src/assets/wtf-header.png?raw=true" height="240"/>
  <h1 align="center">What The Fake</h>
</p>

###
🤔 Choose which headline is REAL

🔥 10 rounds

🎖️ Challenge your friends

This is the web version of an Android game I made some time back. You can try out the app [here](https://play.google.com/store/apps/details?id=com.chanwaikit.fakenews).

## Stack
* Angular 13
* Tailwind CSS v3
* Firebase (Firestore and App Check)
* Hosted on Vercel

## Try it
Ensure you have installed the Angular CLI and fork the repo. Run `npm install` to install required packages.

As this project uses Vercel serverless functions (located in the `/api` folder), we need to use a Vercel dev server to call the endpoints. Install the Vercel CLI and run `vercel dev` to start a dev server on `http://localhost:3000`.

## Notes
### Vercel
The setup of this app is specific to hosting on Vercel. 
* As mentioned above, `/api/posts` and `api/query-env` endpoints will only work when hosted on Vercel, as Vercel will automatically create the serverless function end points.
* In addition, `api/query-env` reads a Vercel system env variable to get the latest commit hash to display as a version number.

### Firebase
Players can send a game link to challenge friends using the same set of news headlines.
* News headlines are stored in Firestore and dynamic routing using the Firestore document ID is used to retrieve the news headlines.
* Firebase App Check is used for authentication.

To try for yourself, you need to create your own Firebase project and replace the config object in [/src/environment.ts](https://github.com/cerivitos/what-the-fake-web/blob/05e0bff1cffa5fc8f3fc2c74acf2d0d3bb1de6f7/src/environments/environment.ts) and [/src/environment.prod.ts](https://github.com/cerivitos/what-the-fake-web/blob/05e0bff1cffa5fc8f3fc2c74acf2d0d3bb1de6f7/src/environments/environment.prod.ts) with your own.

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
  
  ## Licence
  MIT
  
