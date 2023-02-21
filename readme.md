# Usefull Stencil Components

It is a set of usefull components. Developer following a Stencil JS training. Don't look at the size of the package, it's a practice, stencil doesn't seem to be a good solution to be used outside of a stencil project. For the moment I have developed two components:
- sticky-header
- modal

## Installation

```
npm i usf-stencil-components
```

## Usage

### Import all

```javascript
import { StickyHeader, Modal } from 'usf-stencil-components/dist/components';
customElements.define('usf-sticky-header', StickyHeader);
customElements.define('usf-modal', Modal);
```

### Sticky-Header

#### Javascript
How to import it into his vanilla js project:

```javascript
import { StickyHeader } from 'usf-stencil-components/dist/components';
customElements.define('usf-sticky-header', StickyHeader);

// or

import { defineCustomElement as UsfStickyHeader} from 'usf-stencil-components/dist/components/usf-sticky-header';
UsfStickyHeader();
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
import { Modal } from 'usf-stencil-components/dist/components';
customElements.define('usf-sticky-header', Modal);

// or

import { defineCustomElement as UsfModal} from 'usf-stencil-components/dist/components/usf-modal';
UsfModal();
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

