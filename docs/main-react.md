# Learn React

## React Patterns

- Higher-Order Components (HOCs) pattern | (Auth, Mobx)

- Slot Props pattern | `child`

- Function as a Child (FAC) pattern | [React Context: The second way is by using a render function supplied as a child to Context.Consumer special component available on the context instance:](https://dmitripavlutin.com/react-context-and-usecontext/#:~:text=The%20second%20way%20is%20by%20using%20a%20render%20function%20supplied%20as%20a%20child%20to%20Context.Consumer%20special%20component%20available%20on%20the%20context%20instance%3A)

## Components are Functions

[A Component Is A Function That Returns JSX (JavaScript XML)](https://obedparla.com/code/a-visual-guide-to-react-mental-models/#a-component-is-a-function-that-returns-jsx)

- A React component is just a function
- Components containing other components are functions calling other functions
- Props are the function’s arguments

React function components are an essential concept to understand when working with React. To build a mental model of function components, let's explore their key characteristics and how they work:

1. **Function Signature**: A function component is a JavaScript function that accepts an object called `props` as its first parameter. The `props` object contains the properties passed to the component when it is used. Function components return a React element, which describes what should be rendered on the screen.

2. **Stateless**: Function components are stateless, meaning they don't have their own internal state. If you need state management, you can use React Hooks (e.g., `useState`) to introduce state to a function component.

3. **No Lifecycle Methods**: Prior to React Hooks, class components had lifecycle methods (e.g., `componentDidMount`, `componentWillUnmount`, etc.) to manage side effects and component updates. Function components don't have direct equivalents to these methods, but you can use the `useEffect` hook to achieve similar functionality.

4. **Concise and Readable**: Function components are typically more concise and easier to read than class components, as they involve writing simple JavaScript functions.

5. **Better Performance**: Function components are generally faster than class components because they have less overhead. This is especially true when using React's `memo` and `useMemo` to optimize rendering.

6. **React Hooks**: With the introduction of React Hooks in React 16.8, function components gained the ability to manage state, handle side effects, and more. Hooks like `useState`, `useEffect`, `useContext`, etc., allow you to manage state and lifecycle behavior in a function component without the need for class components.

Here's an example of a simple React function component:

```jsx
import React from 'react';

function MyComponent(props) {
  // No internal state, relying on props for data
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>{props.message}</p>
    </div>
  );
}
```

Using this function component is straightforward:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div>
      <MyComponent name="John" message="Welcome to React!" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

In the above example, we define a function component `MyComponent`, which takes `props` as its argument and renders a simple greeting message. We then use `MyComponent` within another function component `App`, passing in the desired `props`.

Overall, function components provide a more modern and straightforward way to build React components and are preferred in most cases over class components due to their simplicity, readability, and better performance.

## Hooks

[React Hooks Docs](https://react.dev/reference/react)

### useState()

When to pass a function to setState when using the useState Hook - <https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates#dispatch-function-updates>

### useEffect()

- **READ** - [A Complete Guide to useEffect by Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)

- [All useEffect Mistakes Every Junior React Developer Makes](https://youtu.be/QQYeipc_cik)

on return provides a cleanup function - called every time the hook is re-run

dependency array

    - empty dependency array signifies to run only once

### useMemo()

- useMemo() vs useEffect()

In React useMemo() when you want to check for referential equality

- [useEffect and useMemo() are not the same](https://www.reddit.com/r/react/comments/w56gyb/comment/ih6h9cv/?utm_source=share&utm_medium=web2x&context=3)

      useMemo is a React Hook that lets you cache the result of a calculation between re-renders. The function you pass to useMemo runs during rendering to recalculate a value when a dependency changes. The results of a useMemo calculation can be used in the current render. The useMemo function should not have side effects.
      
      The function you pass to useEffect runs after every render in which a dependency changes. The results of a useEffect function can do things like manipulate the DOM independent of React, interact with other browser APIs (e.g. fetch), or trigger future renders of the component by setting state, but it can not impact the current render since it is happening after the render is already done. The useEffect function is intended specifically for side effects (hence the name).

### useCallback()

- useCallback() & useMemo()

- useMemo: Returns and stores the calculated value of a function in a variable

- useCallBack: Returns and stores the actual function itself in a variable

Hint: **[useMemo can be used inside return JSX](https://stackoverflow.com/a/61423476/7031530) and [example here](../playground/src/components/ContextComponent.tsx)**


[useMemo() & useCallback()](https://www.youtube.com/watch?v=_AyFP5s69N4&lc=UgwbDBBuKs5T6RO8OYB4AaABAg)

### useRef()

- **References to DOM elements**: If you need to interact with a DOM element directly, such as setting focus, triggering animations, or measuring its dimensions, you'd use `useRef` to create a reference to the DOM element.

- **Storing mutable values without triggering re-renders**: Unlike state (`useState`), changing the value of a `ref` using its `.current` property doesn't trigger a re-render of your component. This makes it suitable for storing values that you want to persist across renders without causing re-renders.


### useContext()

Consume the context after it's been created & provided in the virtual DOM

## Context

React Context are some what eerily similar to the concept of [Vue's Provide/Inject](https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity:~:text=There%20may%20be%20times%20when%20we%20need%20to%20update%20the%20data%20from%20an%20injector%20component.%20In%20such%20cases%2C%20we%20recommend%20providing%20a%20function%20that%20is%20responsible%20for%20mutating%20the%20state%3A)

[A Guide to React Context and useContext() Hook](https://dmitripavlutin.com/react-context-and-usecontext/) **[Playground](https://codesandbox.io/s/update-context-value-l39t0?file=/src/App.js)**

- Create Context

- Provide Context (On the Component Tree)

- Consume Context: the context can be performed in 2 ways.

  1. use the useContext(Context) React hook:

  2. using a render function supplied as a child to Context.Consumer special component available on the context instance: [Src](https://dmitripavlutin.com/react-context-and-usecontext/#:~:text=The%20second%20way%20is%20by%20using%20a%20render%20function%20supplied%20as%20a%20child%20to%20Context.Consumer%20special%20component%20available%20on%20the%20context%20instance%3A)

## React Router

[React Router v6 Guide](https://blog.webdevsimplified.com/2022-07/react-router/)

[he router works just like a context in React and provides all the necessary information to your application so you can do routing and use all the custom hooks from React Router.](https://blog.webdevsimplified.com/2022-07/react-router/#:~:text=Generally%20you%20will%20import%20your%20router%20in%20the%20index.js%20page%20of%20your%20application%20and%20it%20will%20wrap%20your%20App%20component.%20The%20router%20works%20just%20like%20a%20context%20in%20React%20and%20provides%20all%20the%20necessary%20information%20to%20your%20application%20so%20you%20can%20do%20routing%20and%20use%20all%20the%20custom%20hooks%20from%20React%20Router.)

### Guards

Higher Order Functions -> Higher Order Components

In React, higher-order components (HOCs) are a pattern that allows you to enhance or modify the behavior of a component by wrapping it with another component. HOCs are functions that take a component as an argument and return a new component.

To create a navigation guard-like functionality using HOCs in React Router, you can follow these steps:

1. **Define a higher-order component:** Create a function that accepts a component as an argument and returns a new component with the desired behavior. This higher-order component will act as your navigation guard.

2. **Add necessary logic:** Within the higher-order component, you can add the required logic for your navigation guard. This could include authentication checks, permission validations, or any other logic that needs to be executed before entering a route.

3. **Wrap the component:** Inside the HOC, render the wrapped component and pass any necessary props. You can also conditionally render the component based on the outcomes of your logic. For example, if the user is not authenticated, you could redirect them to a login page.

4. **Use the HOC:** In your route configuration, instead of directly using the component as the route's `component` property, pass it through your navigation guard HOC. This will apply the desired behavior to the component when it is rendered in the corresponding route.

Here's an example implementation of a navigation guard-like HOC in React Router:

```jsx
import React from 'react';
import { Redirect } from 'react-router-dom';

const withNavigationGuardHOC = (WrappedComponent) => {
  const NavigationGuardHOC = (props) => {
    // Add your navigation guard logic here
    const isAuthenticated = checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return NavigationGuardHOC;
};
```

You can then use this HOC to wrap your route components in your route configuration:

```jsx
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withNavigationGuardHOC from './withNavigationGuardHOC';
import Dashboard from './Dashboard'; // Import the Dashboard component

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/dashboard"
        component={withNavigationGuardHOC(Dashboard)}
      />
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  );
};
```

In this example, the `Dashboard` component will only be rendered if the user is authenticated; otherwise, they will be redirected to the `/login` route.

By using higher-order components in this manner, you can create custom navigation guards to control the behavior of your React Router route components.

## Mobx

[My Mobx Minimal Observer](https://codesandbox.io/s/minimal-observer-forked-d3mr9f)

[Mobx React - State Management Alternative to Redux](https://youtu.be/AgcaGGkYy_8 "")

[MobX Tanjil Example Implementation](https://codesandbox.io/s/mobx-implementation-with-multiple-stores-in-react-typescript-7zv25n)

Remember In Vuex you create a store, which consists of states, getters, mutations and actions.

& now in Mobx React you create a store, which consists of actions, state and computed. (Memory Hook - AOC)

Three Core concepts

- action (changing state)
- observable (your state)
- computed (derived state)

### Creating a Store

Create Store in JS via a Class

```js
import { makeObservable, action, observable, computed } from "mobx";
```

Create a class & in constructor makeObservable

```js
class UsersStore {
  users = [];

  constructor() {
    makeObservable(this, {
      users: observable,
      addUser: action,
      total: computed,
    });
  }

  addUser = (name) => {
    setTimeout(
      action(() => {
        const newUser = {
          id: +Math.random().toFixed(4),
          name,
        };
        this.users.push(newUser);
      }),
      2000
    );
  };

  get total() {
    return this.users.length;
  }
}

export const usersStore = new UsersStore();
```

### Making use of a Store in JSX

```js
import { observer } from "mobx";

const Users = observer((storeProp) => {
  return(
    <>
      {/* Pass userStore as prop */}
      {/* Make component observable via Higher-Order Components (HOCs) pattern */}
      {/* Use store action, observable & computed */}
      { storeProp.total }
    </>
  )
})
```

## React Children Props

<https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children>

React's children props work similar to Vue slot props & is a widely used and accepted pattern in React, known as the "render props" or "slot props" pattern

Here's the implementation using the `children` prop:

ParentComponent.js

```jsx
import React from 'react';

const ParentComponent = ({ children }) => {
  return (
    <div>
      {/* Any content before the passed components */}
      <p>This is some content before the passed components</p>

      {/* The passed components will be rendered here */}
      {children}

      {/* Any content after the passed components */}
      <p>This is some content after the passed components</p>
    </div>
  );
};

export default ParentComponent;
```

App.js (Usage)

```jsx
import React from 'react';
import ParentComponent from './ParentComponent';

const App = () => {
  return (
    <ParentComponent>
      {/* Components passed as children */}
      <h2>This is the first component</h2>
      <p>This is some content inside the first component</p>

      <h2>This is the second component</h2>
      <p>This is some content inside the second component</p>
    </ParentComponent>
  );
};

export default App;
```

In the above code, the `ParentComponent` uses the `children` prop to render whatever is passed between its opening and closing tags.
