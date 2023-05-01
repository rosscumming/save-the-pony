# Save the Pony

Welcome to the Save the Pony. The goal of the game is to help the pony escape the maze and reach the rainbow before the enemy Domokun catches you.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Installation](#installation)
3. [Game Instructions](#game-instructions)
4. [Testing](#testing)
5. [Code Organisation](#code-organisation)
6. [Main Components and Architectural Decisions](#main-components-and-architectural-decisions)
7. [Future Improvements](#future-improvements)
8. [Points of Interest](#points-of-interest)
9. [Key Learnings](#key-learnings)

## Tech Stack

The project utilizes the following technologies:

- React
- Vite
- Styled Components
- MSW (Mock Service Worker)
- Axios
- React-Query
- TypeScript
- React Testing Library
- Vitest

## Installation

To get started with the project, follow these installation instructions:

1. Clone the repository:

   ```
   git clone https://github.com/rosscumming/save-the-pony.git
   ```

2. Install the dependencies:

   ```
   cd save-the-pony
   npm install
   ```

3. Run the project locally:

   ```
   npm run dev

   The app should now be running on http://localhost:5173/.
   ```

4. Run tests:
   ```
   npm run test
   ```

## Game Instructions

In Save the Pony, you play as a pony trying to escape a maze filled with challenges. To win, you must reach the rainbow while avoiding the enemy, Domokun. Domokun is always on the move and trying to catch you!

## Testing

When it comes to testing, the project utilises React Testing Library and Vitest. Most of the tests are unit tests, with the exception of App.test.tsx, which is an integration test. My testing strategy focused on ensuring that each component's behavior was thoroughly tested. For instance, when testing custom hooks, I only examined their behavior to confirm that they functioned correctly and returned the expected output.

## Code Organisation

I have organized the code into several directories and files, each with a specific purpose:

- `src`: Home to the main source code of the application, organized into several subdirectories and files for better organization and separation of concerns:
  - `tests`: Contains the test files and utility functions for testing (msw handlers, custom render functions).
  - `api`: Stores the API-related code for making requests and handling responses from the API provided.
  - `assets`: Holds any additional assets used within the project, such as images.
  - `components`: Contains the main React components for the application, further divided into:
    - `ui`: UI-specific components, such as buttons and sliders.
    - Various functional components related to the game, like `Maze.tsx`, `MoveControls.tsx`, and `EndOfGame.tsx` etc.
  - `modals`: Includes the modal component used within the application.
  - `theme`: Contains styling-related files and global styles.
  - `utils`: A collection of utility functions, hooks, and types for the application.

## Main Components and Architectural Decisions

Some of the main components and important architectural decisions in the project include:

1. **React Hooks**: Custom hooks like `useCreateMaze`, `useGetMazeById`, and `useMovePony` are used to abstract away the logic for fetching and updating data from the API. This makes the code more modular and easier to maintain and keeps to using React constructs.

2. **React Query**: The project makes use of the React Query library for handling server state and caching, making it easy to fetch, cache, and synchronize data in the project.

3. **Styled Components**: Styling is done using styled-components, which allows for a more modular approach to styling, making it easy to apply styles directly to components while keeping them scoped and manageable utilising CSS-in-JS

4. **Responsive Design**: The application makes use of custom hooks like `useWindowSize` to ensure responsiveness across different devices and screen sizes.

5. **Maze and MazeCell Components**: The `Maze` component is responsible for rendering the game board itself, and the `MazeCell` component is used for rendering individual cells within the maze. This separation of concerns makes it easier to manage the rendering and state of the game board.

6. **MoveControls Component**: This component handles user input for controlling the pony's movement within the maze. It listens for both keyboard events and button clicks to provide a seamless experience for the user.

7. **SettingsOptions and SettingsModal Components**: The `SettingsOptions` component allows users to configure game settings, while the `SettingsModal` component provides a modal interface for accessing and updating these game settings.

With how I chose to organise my code and utilising best practices, it helps keep the project maintainable and realiable. If needed in the future, it will also make it easy to add new features or make updates.

## Future improvements

I would reorganize the code slightly, for example, by creating a parent SaveThePony folder and organizing components under it. I think this would allow for easier expansion of the project with other potential games and services while maintaining separation between them.

Currently, the implementation lacks any end-to-end (E2E) tests. I plan to utilize Cypress in the future to address this.

Setting up a CI/CD pipeline would be beneficial as it would automate the process of building, testing, and deploying the application. Having this set up would help ensure faster delivery of new features and bug fixes.

There is potential for further refactoring, particularly in the UI components and buttons, which could likely be consolidated into a single component.

Id also consider separating my styles from my components to make my code and files cleaners and easier to read.

In terms of naming components, I acknowledge that more descriptive names could be used. This aspect is still a work in progress though and can be easily changed.

## Points of Interest

This project offered a really great opportunity to learn and experiment with new technologies, including:

- Vite: Significantly improved build times and provided a smooth/faster development experience.
- MSW (Mock Service Worker): MSW allowed for easy API mocking during development and testing, enabling faster iteration without relying on a live backend. This can be seen in the handlers for the project, such as the ones for creating and retrieving the maze.
- React-Query: Used for data-fetching and state management. Provides optimized server state management within the project such as automated caching, background fetching, and retries. For example, the hooks useCreateMaze and useGetMazeById utilize React-Query to manage the data.

Working with these technologies has been a rewarding learning experience and has significantly improved the quality and maintainability of the code whilst also giving me exposure to new ways of working - I found them really fun to work with.

## Key Learnings

During the limited time I had to build this project due to work commitments, I was pushed to think outside the box. Having never developed a game before, it was an exciting challenge tryng something new.

While mocking within my tests, I mainly have experience with Jest mocks so using MSW (Mock Service Worker) provided a refreshing change, as it allows intercepting network requests and was easy to set up. It allowed me to create separation of concerns, improve test readability, and enhance the overall development experience for testing.

Utilising React Query proved to be advantageous as well as It reduced complexity and lines of code, thanks to its hooks that provided functions for easily refetching and mutating data.

Although im still trying to learn TypeScript, I find it enjoyable to work with, and the type safety it offers encourages me to be more thoughtful about my code and its purpose.
