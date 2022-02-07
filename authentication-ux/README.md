# Authentication UX

Given an application which has many API calls which require authentication and therefore may at any point return Unauthorized (401), 
it is best to wrap the app in a higher order component that would reroute the user to the login page. The structure can be as follows.

### Sketch

```html
<Routes>
<Login/>
<ErrorBoundary>
<App/>
</ErrorBoundary>
</Routes>
```

### Where:
- **App** is class based component that makes the API calls and throws an error (LoginError) when an API request returns with unathororised (401) status.
- **ErrorBoundary** is higher order component handles error. When it gets a LoginError from the App, it reroutes the user to the Login component.
- **Login** is the component the user should be rerouted to.
- **Routes** is the routing component

An implementation of [ErrorBoundary can be found here](../photo-album/src/ErrorBoundary.tsx)