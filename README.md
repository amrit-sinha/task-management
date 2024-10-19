## Task Management

- By Amrit Sinha
- Made using Next.js

Installing and Running:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sorting approach used:

Sorting function is written in `utils.js`

- The function sorts tasks based on their completion status first, and their priority next.
- Among incomplete tasks, they are ordered by priority using the predefined priorityOrder (high, medium, low).
- high = 0
- medium = 1
- low = 2
