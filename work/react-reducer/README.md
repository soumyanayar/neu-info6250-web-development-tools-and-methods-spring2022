# React Reducer

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-reducer' (`git checkout -b react-reducer`)
* Create a react application in this directory using create-react-app
* Modify and add files in `src/` to fulfill the requirements below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  
* Due by Sun Apr 17 11:59pm (PT)

## Goals

- Copy and modify the React application from react-services
- Demonstrate an understanding of `useReducer` and `useContext` hooks

## Assignment Goals and Requirements
- Create a new react application in this directory
- Copy the server and client-side files from the react-services assignment
  - Hint: make sure to `npm install` any needed packages so they are listed as dependencies in package.json
  - Hint: if you have any issues when running after installing all the packages, try removing the `node_modules/` directory and rerunning `npm install`
- Modify/Replace/Add files as necessary to achieve the below:
- Keep all the todo list functionality (login/logout/add/delete/toggle)
- Convert the top-level state in App.jsx to use `useReducer`
  - define the reducer function and initial state in a separate JS file and import them
- Create a series of action functions (wrappers around dispatch) in App.jsx
  - Place these in a Context Provider in App.jsx
  - Have your components pull these functions out of the context using useContext as needed
- Your application can be tested by running `npm install` and
  - running `npm start` to start the services server 
  - running (in a separate terminal) `npm run dev` to start the dev server
    - Note: this shows you should change the `scripts` section of package.json
  - visiting http://localhost:3000 in the browser
- Your application can ALSO work by:
  - running `npm run build` to create the static files in `build/`
  - running `npm start` to start the server
  - visiting http://localhost:4000 in the browser

## Defining the reducer and context
- the reducer function should accept a state and an action object
- the reducer function should return a new state object
- the reducer function should use `action.type` to decide what changes to make in the new state
- the reducer actions should use other properties in `action` as needed, depending on the 
- the context should be defined in a separate file so it can be imported into multiple components
- While normally you only use useContext when descendants have layers of components between themselves and App.jsx that don't use everything, for learning purposes you can useContext in direct and close descendants
- For this assignment, you MUST define action functions (wrappers around dispatch) that are put in the Provider value
- For this assignment, you MUST NOT put the dispatch function in the Provider value
- For this assignment, you MAY put other values (such as state or parts of state) in the Provider value

## Restrictions
- All components must be .jsx files named in MixedCase
- Components should have good separation of concerns
  - not too large
  - not doing too much
  - same logic as splitting up functions
- Components should have good, accurate, meaningful names
- state values should have good, accurate, meaningful names
- Component files should match the component name
- Components must each be in a single file with no other exported values
- Logic that is not about JSX should be imported from .js files
- .js files and functions should have good, accurate, meaningful names

## Additional Requirements
- You may not use `document.querySelector()` or otherwise query the DOM directly
- You may not use `useRef`, or `ref` props from React (If you do not know what I mean, that is fine)
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Follow any suggestions previously given to you in code reviews
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
  - Note: create-react-app installs many files.  For now, those are fine to include in your PR, except for `node_modules/`
- Do not use external CSS libraries
- Do not use external JS libraries that aren't part of react-services
- You may not use floats to do more than manage flowing text with images
- You may not use HTML tables or CSS table layouts
- You may not use Set() or Map() 
- You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  - I and the TA(s) must be able to read it easily
