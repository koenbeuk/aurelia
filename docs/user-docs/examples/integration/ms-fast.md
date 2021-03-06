# Integrating with Microsoft FAST Web Components

If the example doesn't seem obvious, the following prerequisite reads are recommended:
- [extending templating syntax](../../app-basics/extening-templating-syntax.md)

The following is a code example of how to teach Aurelia to work seamlessly with [Microsoft FAST](https://www.fast.design/):

```ts
import { AppTask, IContainer, IAttrSyntaxTransformer, INodeObserverLocator } from 'aurelia';

Aurelia.register(AppTask.with(IContainer).beforeCreate().call(container => {
  const attrSyntaxTransformer = container.get(IAttrSyntaxTransformer);
  const nodeObserverLocator = container.get(INodeObserverLocator);
  attrSyntaxTransformer.useTwoWay((el, property) => {
    switch (el.tagName) {
      case 'FAST-SLIDER':
      case 'FAST-TEXT-FIELD':
      case 'FAST-TEXT-AREA':
        return property === 'value';
      case 'FAST-CHECKBOX':
      case 'FAST-RADIO':
      case 'FAST-RADIO-GROUP':
      case 'FAST-SWITCH':
        return property === 'checked';
      case 'FAST-TABS':
        return property === 'activeid';
      default:
        return false;
    }
  });

  // Teach Aurelia what events to use to observe properties of elements.
  // Because FAST components all use a single change event to notify,
  // we can use a single common object
  const valuePropertyConfig = { events: ['change'] };
  nodeObserverLocator.useConfig({
    'FAST-CHECKBOX': {
      value: valuePropertyConfig
    },
    'FAST-RADIO': {
      value: valuePropertyConfig
    },
    'FAST-RADIO-GROUP': {
      value: valuePropertyConfig
    },
    'FAST-SLIDER': {
      value: valuePropertyConfig
    },
    'FAST-SWITCH': {
      value: valuePropertyConfig
    },
    'FAST-TABS': {
      value: valuePropertyConfig
    },
    'FAST-TEXT-FIELD': {
      value: valuePropertyConfig
    },
    'FAST-TEXT-AREA': {
      value: valuePropertyConfig
    }
  });
}))
```
