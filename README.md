# Breaking Bad API Client
This is a React.js web app client for the [Breaking Bad API](https://breakingbadapi.com/).

## How to install it
1. Clone this repository.
2. Inside this project's directory run ``npm install``. This will install all required dependencies.
3. Run ``npm start`` to start the development environment.

## Project files structure
- All reusable components (navigation bar, buttons...) are placed into *components* directory.
- All components that works as a page, are placed into *pages* directory.
- This project uses SASS for styling. All scss files are placed into *scss* directory. There is one file for each component or page.
- Static files, such are fonts or media content, has to be placed inside *assets* directory.
- HTTP requests files or any other file related with data input/output is placed inside *services* directory. Place HTTP requests inside *api-requests.js* and create other files for local storage, session storage or any other needs.
- In *store* is placed all code related with global state management.
- All code related with languages and translations is placed inside *i18n* directory. It contains a subdirectory called *languages* which contains all translations equivalences.

## Third party libraries
- [Axios](https://github.com/axios/axios): simplifies the process of creating and handling HTTP requests.
- [Bootstrap icons](https://icons.getbootstrap.com/): a nice and modern icon pack, with lots of icons.
- [i18n](https://react.i18next.com/): enables app internacionalization by adding the option to handle multiple languages.
- [React spinner animated](https://www.npmjs.com/package/react-spinner-animated): beautiful and modern spinners to display when data is being loaded.
- [SASS](https://www.npmjs.com/package/sass): allows you to use SCSS stylesheets with React. SCSS is much more powerful than normal CSS.
- [Zustand](https://github.com/pmndrs/zustand): handles the global state management in a simple and effective way.

## State management
For the global state management, this app uses Zustand. In comparison with Redux, Zustand requires much less code, the code is easier to understand and also it's easier to work with it.
If you need to add a new global state variable, just add it to the slice that is refers to. Make sure to add the variable and the function to update it. If the variable doesn't refer to any existing slice, just create a new one by creating a new file, or just by cloning an existing slice and modifying it. Then, add that slice to the global store (useStore file).
To read or update it's value, go to the React component where you want to do it and do the following import (with the corresponding path to the file): ``import useStore from './store/useStore.js'``. Then, just add the following code inside the component: ``const { myVariable, setMyVariable } = useStore(state => state)``. With this code you can access all the global state, and make sure to take your variable, and the function to update it.