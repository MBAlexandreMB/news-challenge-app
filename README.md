## Coding Challenge

> ### ⚠️ Read it first!
> The purpose of this challenge is to give us an idea about your coding skills.
> At New Work we value well structured and tested code. Semantic HTML, modern and responsive CSS, a consistent coding style and a structured code base are important to us.
> I know... you probably love to code (we also love it!). But please, read this file until the end and make sure you understand the requirements before you start coding! If you have any questions, just let us know!

### Challenge
Build a Javascript application that contains a list and a detail view of news articles.
The application should be built with two columns and behave like this:

- The left side with the list of news articles.
   * When you click on one of the articles in the list, the content is shown in the other section and that article is marked as read.
- The right side with a detailed view of the current active article, or an empty view if none is selected.

The final app should look somewhat similar to the mockup below, but as long as you meet the criteria described above, you can build it in whichever way you find appropriate.

<p align="center">
  <img src="fe_hiring_challenge.png">
</p>

## Tech Requirements

- Use React to build this application.
  * If you think it makes it easier for you, start with create-react-app(https://github.com/facebook/create-react-app).
- Please do the layout and styling with your own CSS (pre-processors are allowed). Don't use any component libraries like bootstrap or material-ui.
- Testing your code is important, we'd like to see some tests (full coverage not required).
- Use this README to document what you've built. Make sure that the person that reviews this code understands your choices and challenges:
  * Outline your reasoning behind technical choices (architecture, third party libs, etc.)
  * Explain technical trade-offs
  * Anything you skipped due to time constraint?
  * What would you add if you had additional time for this project?

## Basic Tooling & API

To get you started in the right direction, we give you a couple of yarn scripts. But feel free to improve and extend it as you go through the assignment.

```sh
> cd api
> yarn install
> yarn api       # run API on 0.0.0.0:8000
```

The API serves the endpoint you'll need:

```sh
/v1/news?q=      # get the list of articles
```

Or if you want to use GraphQL

```sh
query GetNewsArticles($title: String){
  articles(title: $title) {
    author
    title
    description
    url
    urlToImage
    publishedAt
    content
  }
}
```

It is not mandatory to run with this server or to use this API, but we highly recommend it. If you really want to use another API, please give a good reason in the [Development Journal](#development-journal) section. If you feel the need to change the API or add something, feel free to do so.

> The data was obtained through newsapi.org

### Not challenging enough?

- Add a search functionality for the list view so we can reach certain articles easier.
- We're showing too many articles on a single page. Implement pagination using client-side routing, so we only see 10 articles at a time.
- We like tidy code! Configure linting for your JavaScript and CSS files (you can use style guides like [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)).
- Let's say we need our application to support IE11. To a reasonable extent, ensure we can support modern Javascript in not-so-modern browsers.
- We all know designers love animations, so try adding some CSS animations.
- Anything else you'd like to show us? :)

### Notes

- The total working time should be around 6 hours. Focus on completing the [Tech Requirements](#tech-requirements) first and only then move to the [Not challenging enough?](#not-challenging-enough) section. This last section is not mandatory, but with that done we can get more information on your coding skills.
- We'd like to see how familiar you're with React and React features, but if you think you'll need another framework please explain shortly in the documentation section.
- In general, we'd rather see something simple you understand than something fancy you can't explain.
- Please don't use something you already developed.

Happy coding & good luck! 🚀

---
## Development Journal
### How to run this project
To run this app you'll need npm installed (https://www.npmjs.com/get-npm)

Install npm dependencies:
  - npm i

#### This project uses dotenv
Create a .env file on the outer most folder of this project and set this variable:
  REACT_APP_NEWS_API_KEY: 'newsapi key' (something like a5f2d12238944d2c86d8a4117570a998) from https://newsapi.org/register
Variable must not be quoted!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### Available Scripts

In the project directory, you can run:

#### `npm start`
#### `npm test`
#### `npm run build`

### Challenges and choices
- I've chosen to implement a infinite scroll in the news listing. That posed me some challenges:
    - I didn't want to use an event handler for scrolling, as it is terrible for performance (even though it wouldn't be a real problem for this app).
    - Due to that, I used a feature from modern browsers ([intersection-observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)), which does not allow me to support not-so-modern browsers (without a polyfill - which I didn't had the time to apply in this project).
- To avoid reloading the entire app each time, I've chosen to keep the data fetching from api inside the NewsListing. Because of that, I needed a new state just to control if anything was loaded, so the right column wouldn't update every time the infinite scroll fetched new data. Something I would refactor in a future code review.
- I've chosen to do this project entirely with React Hooks, instead of using any state managers (like redux), as it was too simple and would add too much unnecessary complexity.
- I used ES6 generators to fetch new data from the API, so the function could keep it's own current page "as a state".
- I've added a "search scheduler" so the user doesn't see a flashing loader (and the API doesn't get too much requests).

### What should be added in the future?
- Add total coverage of unit and integrated tests
- Add filter options (countries, sources, domains, languages) and sorting options
- Add full acessibility support
- Add code linting