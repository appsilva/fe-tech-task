This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- Node.js v18
- Yarn

## Setup

- Clone the repo
- `yarn` for package install

## Commands

- `yarn dev` - Run the app in development mode, open [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.
- `yarn build` - Builds the app for production
- `yarn start` - Serve the production build
- `yarn lint` - Run eslint
- `yarn format` - Run prettier
- `yarn test` - Run all unit tests
- `yarn test:watch` - Run tests in watch mode

#
#
#

# Decision Report
I had a great time developing this app, it's really interesting, and I hope you find it fitting of your expectations. Below I will describe some of the reasonings behind my decisions.

### Why use Create Next App?
`create-next-app` allows us to create a new Next.js app within seconds and it's officially maintained by the creators of Next.js.

### Documentation
I left some comments throughout the app, to facilitate the understading of some of the logic. Also, documented some of the components and functions in JSDoc notation.

### Tech Stack
For the decision of the tech stack, I followed the recommended technologies from the task script and the [careers page](https://eslfaceitgroup.com/blog/jobs/talent-pool-role-senior-software-engineer-frontend-remote/). These also match the stack I'm familiar with, except for Redux, which I haven't worked with for a while.

## Disclaimers
Due to some time constraints, there are some things that could use some improvements, like:
- **Test coverage**: Only wrote tests for the utils and the main components, but it should be enough to prove I am familiar with it.
- **Poor design of pages**: The design of the feed and detail pages are as basic as it gets. This would be one of the improvements needed.
- **Other possible approaches**: All the solutions presented here, both of development and architectural, are one possibility out of many, like regarding the folder structure, file naming, and so on. I've worked with different approaches, and this is one option.

## Possible Improvements

- **Internationalization (i18n)**: Adding support for multiple languages would enhance accessibility and reach.
- **Accessibility (a11y)**: Enhancing accessibility features would improve usability for all users.
- **Loading animation**: Standardize loading animation throughout the app, on all components.
- **Design improvements**: Enhancing the design elements on the feed and detail pages would improve aesthetics and user engagement.
- **Enhanced test cases and coverage**: Expanding and improving test cases to all components, as well as increasing test coverage, would ensure better code quality and reduce the likelihood of regressions.
