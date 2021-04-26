# Iconic Multiselect

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Version](https://img.shields.io/github/package-json/v/sidneywm/iconic-multiselect)](https://github.com/sidneywm/iconic-multiselect)

<p align="center">A multiselect component written in pure JavaScript - Also compatible with IE11</p>

<p align="center">
  <img src="./assets/iconic-multiselect.png">
</p>

## Getting Started

### 1. Link the required files

Firstly, the script needs to be included in your HTML file. If you would like to personalize the Iconic Multiselect component, you can additionally include a CSS stylesheet with your custom CSS properties which target the Iconic Multiselect component classes. Also, do not forget to set `customCss` to `true`. (see below)

```html
<head>

  // Optional 
  <link rel="stylesheet" href="multi-select.css" type="text/css" />

</head>

<script src="multi-select.js" type="text/javascript"></script>
```

If you intend to use the Iconic Multiselect component with Internet Explorer 11, it is the recommended to use the script with the polyfills included.

```html
<script src="multi-select-ie11-polyfills.js" type="text/javascript"></script>
```

### 2. Create a select tag

Secondly, within your HTML file, create a `select` tag which you want to turn into a multiselect. Do not forget to set an `id` on your `select` tag.

```html
<select id="foods">
    <option value="bread">Bread</option>
    <option value="cereal">Cereal</option>
    <option value="pasta">Pasta</option>
    <option value="rice">Rice</option>
    <option value="meat">Meat</option>
    <option value="fish">Fish</option>
</select>
```

### 3. Initialize the Iconic Multiselect component

Finally, target the `id` of your `select` tag in the options and initialize the component with the `.init()` method. You may also specify further options. (see below)

```html
<script type="text/javascript">

    const multiSelect = new IconicMultiSelect({
      select: "#foods",
    });

    multiSelect.init();
</script>
```
## Configuration

### Overview

| Option       | Default              | Type          |
| :---         |     :---:            |     :---:     |
| customCss    | `false`              | `boolean`     |
| data         | `undefined`          | `Object[]`    |
| noData       | `No data found.`     | `string`      |
| noResults    | `No results found.`  | `string`      |
| placeholder  | `Select...`          | `string`      |
| select*      | `none`               | `string`      |
| textField    | `null`               | `string`      |
| valueField   | `null`               | `string`      |

\* This option is compulsory

## Author

- [Sidney Wimart](https://github.com/sidneywm)

## License

This project is open source and available under the [MIT License](LICENSE).
