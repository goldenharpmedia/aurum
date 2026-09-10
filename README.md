# The Aurum Framework
Bloat-less Tailwind for `flex` veterans.

The lightest, most necessary CSS Framework known to ~~man~~ humans. No pre-determined styles, no components - just flex layouts, grids, and necessary styles everyone needs (or could sure use). Perfect for those who are new to CSS Flexbox and learning the ropes, CSS veterans that are tired of constantly writing `display: flex`, and even those that just want a vanilla foundation to build their CSS on.

Aurum is from the latin word for gold (you may be familiar with the symbol 'Au' on the periodic table?). Sure, it's a nod to us at Golden Harp Media, but also respective to what the framework is.

<br>

## Contributing

If you would like to contribute to Aurum, please fork the `main` branch, make your changes, and then create a pull request to merge the new branch into `main`. All changes will be reviewed by our team, so be sure to review before submitting.

Source lives in `lib/` (`au.reset.css`, `au.normalize.css`, `au.flex.css`). Commit your edits, then run `pnpm run release <patch|minor|major>` — it bumps the version, builds two things from `lib/`, updates this changelog, commits, tags, and pushes:

- **`dist/`** — always the latest release. This is what `npm` / `github:` installs consume, and what the promo page links.
- **`packages/vX.X.X/`** — a permanent, per-version archive, served over the CDN.

Both are generated — never edit `dist/` or `packages/` by hand.

NOTE: This repository is for the framework itself. This framework is hosted as part of the Aurum website (`root` of this repo correlates to [au.goldenharpmedia.com/framework](https://au.goldenharpmedia.com/framework)). To make contributions to the Aurum website, please visit the [Aurum Website repository](https://github.com/goldenharpmedia/aurum-website).

## Using the framework

### As a package (npm / pnpm / yarn)

```
npm install github:goldenharpmedia/aurum
```

This installs as `@goldenharpmedia/aurum`. Point your build at `node_modules/@goldenharpmedia/aurum/dist/au.css` — or the individual `dist/au.reset.css` / `dist/au.normalize.css` / `dist/au.flex.css`. `dist/` always tracks the latest release; pin a specific one with `github:goldenharpmedia/aurum#v1.3.0`.

### As a hosted resource (CDN)

Reference a versioned URL directly (replace `v1.2.0` with the latest — see [Releases](https://github.com/goldenharpmedia/aurum/releases)):

```
<head>

  <!-- just the CSS Reset -->
  <link rel="stylesheet" type="text/css" href="https://au.goldenharpmedia.com/framework/packages/v1.2.0/au.reset.css">

  <!-- just the CSS Normalize Styles -->
  <link rel="stylesheet" type="text/css" href="https://au.goldenharpmedia.com/framework/packages/v1.2.0/au.normalize.css">

  <!-- just the Flex Styles -->
  <link rel="stylesheet" type="text/css" href="https://au.goldenharpmedia.com/framework/packages/v1.2.0/au.flex.css">

  <!-- all files above (one file limits request!) -->
  <link rel="stylesheet" type="text/css" href="https://au.goldenharpmedia.com/framework/packages/v1.2.0/au.css">

  <!-- other links -->

</head>
```

We recommend the combined file for minimal requests, and putting these links at the top of your `<head>` (or at least before your own CSS) so nothing gets overwritten.

<br>

### How it Works

The *Reset* works automatically on page load, but *Flex* styles need to be referenced for each element.

#### Flex Styles

Flex styles can be used within your project in two ways. One is by referencing a flex class, while another is by using a custom HTML attribute (in case you are already dealing with plenty of CSS classes).

```
<!-- Example: Using a custom HTML attribute (PREFERRED) -->
<div data-au="container" class="myParentClass">
  <div data-au="flex-width" class="myFirstChildClass myChildClass"></div>
  <div data-au="set-width" class="mySecondChildClass myChildClass"></div>
</div>

<!-- Example: Using a class -->
<div class="myParentClass au container">
  <div class="myFirstChildClass myChildClass au flex-width"></div>
  <div class="mySecondChildClass myChildClass au set-width"></div>
</div>
```

For a full list of selectors that can be used, please see the `au.flex.css` [source file](./lib/au.flex.css).

#### Grid Styles are planned, TBA.

<br>

## Resources

Have a question? Something not working? Short of providing IT Support on your implementation, we're here to help! Reach out through our [website](https://goldenharpmedia.com), or by opening an issue through GitHub.

