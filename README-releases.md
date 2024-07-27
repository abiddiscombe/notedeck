# NoteDeck - Release Process

> *These steps are a WIP - let me know if you have any ideas for automation / improvement!*

To release a new version of NoteDeck:

1. Changes must be made in branches following a convention of `id--Issue-name-goes-here` where `id` refers to the numeric ID for the issue.

2. Once changes have been made, locally:

    - Format code - `npm run tidy`.

    - Run the linter - `npm run lint`

    - Run a test build - `npm run build`

3. Raise a PR to merge the code into the `dev` branch.

4. Once PRs / branches have been accounted for, bump NoteDeck's version by committing to the `dev` branch:

    - Update - `/package.json`

    - Update - `/src/utilities/constants`

5. Create a new release in GitHub, targeting the latest change in the `dev` branch. The release statement should follow the pattern used for past releases.

6. Raise a PR to merge `dev` into `main`.

7. An automated pipeline for the resource (hosted on [Render](https://render.com)) will kick-off automatically. Monitor this to ensure the process completes without issue.

8. Confirm the release is live and commence smoke testing. All users should see the "upgrade" notification if enabled, otherwise will be "upgraded" when their browser's cache expires.
