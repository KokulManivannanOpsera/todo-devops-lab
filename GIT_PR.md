# Step 1 cheat sheet — branch + PR

## Why

`main` should stay **known-good**. Experiments and features happen on a **branch**. A **PR** is the request to merge after looking at the diff.

## Everyday commands

```bash
# start work
git checkout main
git pull
git checkout -b feature/short-name

# save work
git add .
git commit -m "Clear message of why"

# publish branch
git push -u origin HEAD

# open PR on GitHub (or: gh pr create)
```

## Rules of thumb

1. Never develop only on `main` once others (or CI) depend on it
2. One PR ≈ one idea (easier to review)
3. Read your own diff before asking for merge
4. After merge, delete the branch; pull `main` again
