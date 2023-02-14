# Usefull Stencil Components

It is a set of usefull components. Developer following a Stencil JS training. Don't look at the size of the package, it's a practice, stencil doesn't seem to be a good solution to be used outside of a stencil project. For the moment I have developed two components:
- sticky-header
- modal

## Installation

```
$ npm install sticky
```

## Usage

### Sticky-Header

#### Javascript
How to import it into his vanilla js project:

```javascript
import { defineCustomElement, StickyHeader } from 'usf-stencil-components';
defineCustomElement('usf-sticky-header', StickyHeader);
```

#### HTML
How to use it in html:

```HTML
<usf-sticky-header threshold="600">
  put what you want here
</usf-sticky-header>
```

#### Porps available:
- threshold: number
- gluedStart: boolean
- gluedActive: boolean

### Modal

#### Javascript
How to import it into his vanilla js project:

```javascript
import { defineCustomElement, modal } from 'usf-stencil-components';
defineCustomElement('usf-modal', modal);
```

#### HTML
How to use it in html:

```HTML
<usf-modal>
  put what you want here
</usf-modal>
```

#### Methods disponible:
- open(): pour ouvrir la modal
- close(): pour fermer la modal

Example of using the methods:
```javascript
const openModalBtn = document.querySelector('#open-modal-btn');
const modal = document.querySelector('usf-modal');
openModalBtn.addEventListener('click', () => {
  if (!modal.opened) {
    modal.open();
  }
});

```

