# Student Direct

Student Direct is web application that allows optionally anonymous users to post and interact with comments regarding issues pertaining to college life. Students, faculty, and administrators can all participate. Student Direct provides students with a direct, effortless, and straightforward line of communciation to the people positioned to make real changes on campus that can genuinely improve student life.

![workflow status](https://github.com/csci312a-s23/project-ellen/actions/workflows/node.js.yml/badge.svg)

[Link to application](https://student-direct.fly.dev/)

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.
