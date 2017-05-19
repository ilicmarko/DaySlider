# DateSlider
Javascript slider for scheduling events in **near** future. The slider is currently a work in progress.

## Usage

DataSlider works with any container element, give it and id or class and call the DataSlider with that identifier.

```html
<div class="dataSlider"></div>
```

```javascript
var ds = new DataSlider('.dataSlider', {<options>});
```

### Options

```javascript
var options = {
  // How many dates you can see, IT HAS TO BEE AN ODD NUMBER
  visibleItems: 7,

  // Enable the title above the dates (Month - Year)?
  showTitle: true,

  // Enable navigation for scrolling the dates
  showNav: true,

  // The navigation text, accepts HTML
  navText: ['left', 'right'],

  // Language in which months will be displayed in the title
  language: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

```
