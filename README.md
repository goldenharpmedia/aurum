# The Aurum Framework

The lightest, most necessary CSS Framework known to ~~man~~ humans. No pre-determined styles, no components - just flex layouts, grids, and necessary styles everyone needs (or could sure use). Perfect for those who are new to CSS Flexbox and learning the ropes, CSS veterans that are tired of constantly writing `display: flex`, and even those that just want a vanilla foundation to build their CSS on.

Aurum is from the latin word for gold (you may be familiar with the symbol 'Au' on the periodic table?). Sure, it's a nod to us at Golden Harp Media, but also respective to what the framework is.

<br>

## Setting Up

Simply fork this repo to include your own version in your project (and to make changes if you wish), or reference one of the following URLs to access it as a hosted resource:

```
<head>

  <!-- just the CSS Reset -->
  <link rel="stylesheet" type="text/css" href="https://au.goldenharpmedia.com/framework/packages/v1.0/au.reset.css">

  <!-- just the Flex Styles -->
  <link rel="stylesheet" type="text/css" href="https://au.goldenharpmedia.com/framework/packages/v1.0/au.flex.css">

  <!-- both the CSS Reset & Flex Styles (one file is one less request!) -->
  <link rel="stylesheet" type="text/css" href="https://au.goldenharpmedia.com/framework/packages/v1.0/au.css">

  <!-- other links -->

</head>
```

If you are using both, we recommend using the combination file (for minimal requests and faster loads). We also recommend including these links at the top of your `<head>` section (or at least, before other CSS).

<br>

## How it Works

The *Reset* works automatically on page load, but *Flex* styles need to be referenced for each element.

### Flex Styles

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

For a full list of selectors that can be used, please see the `au.flex.css` [file](./packages/1.0/au.flex.css).

#### Grid Styles coming soon.

<br>

## Resources

Have a question? Something not working? Short of providing IT Support on your implementation, we're here to help! Reach out through our [website](https://goldenharpmedia.com), or by opening an issue through GitHub.

