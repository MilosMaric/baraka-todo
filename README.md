# TODO App for Baraka
## Requirements

### Functional Requirements

1. **Basic Features**:
    - Users should be able to add new tasks.
    - Users should be able to mark tasks as complete.
    - Users should be able to delete tasks.
    - Users should be able to filter tasks by status (All, Active, Completed).

2. **Persistent Storage**:
    - Use local storage or any other method of your choice to persist tasks across page refreshes.

### Technical Requirements

1. **Framework**: Use React (version 16.8 or higher).
2. **State Management**: You can use React's built-in state management or any state management library you prefer (e.g., Redux, Zustand).
3. **Styling**: Use Tailwind CSS for styling. Ensure the design is clean and user-friendly.
4. **Testing**: Write unit tests for key components using a testing library of your choice (e.g., Jest, React Testing Library).

### Bonus Features (Optional)

1. Implement drag-and-drop functionality for task ordering.
2. Add user authentication (you can simulate this with mock data).
3. Allow users to set due dates for tasks and sort by due date.
4. **Integrate with a public API**: Fetch and display additional data related to tasks (e.g., a random motivational quote API, or a task-related API).

## Project Structure

- `src/` - Source code for the application.
    - `components/` - Reusable components.
    - `hooks/` - Custom hooks.
    - `utils/` - Utility functions.
- `public/` - Static files (like index.html).
- `package.json` - Dependencies and scripts.

## Instructions

1. **Implement the To-Do List application** following the requirements outlined above.
2. **Commit your changes** regularly with clear messages.
3. **Deploy your application** using a service like Vercel or Netlify.
4. **Submit a link** to your deployed application along with your repository link.

## Evaluation Criteria

- **Code Quality**: Cleanliness, readability, and organization of code.
- **Functionality**: Fulfillment of the functional requirements.
- **Testing**: Coverage and effectiveness of tests.
- **UI/UX**: Overall user experience and design of the application, including effective use of Tailwind CSS.