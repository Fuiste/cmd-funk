# `cmd-funk` ("command funk")

A map-based composable call and response framework. `cmd-funk` is a great option for building lightweight command lines, as well as within more complicated applications that leverage a similar access pattern (like chat bots). Really, anything that predominantly communicates using nested string commands can leverage `cmd-funk`.

## Why use `cmd-funk`?

- **Composable:** Every command line tool has different requirements. Insofar as it is useful, `cmd-funk` provides the tools to create your tools in whatever way you see fit.
- **Functional:** To the extent that it's reasonable, `cmd-funk` doesn't explocitly track state. There's no classes, minimal initialization, as little overhead as possible.
- **Modern:** `cmd-funk` is written in Typescript and takes advantage of `async/await`, so no outdated access patterns!

## Installation

Use your favorite package manager and install `cmd-funk`, for example:

```bash
npm install cmd-funk
```

## Concepts

There are 3 building blocks to a `cmd-funk` application, **Mappers**, **Marshallers**, and **Outputs**.

- **Mappers** are objects that map commands to their implementations (or other mappers!).
- **Marshallers** take the output of an implementation and convert it to something `cmd-funk` understands.
- **Outputs** are special objects that store information about the result of a command.

### Mappers

Mappers are simply dictionaries that lead to the implementation logic of your commands. Let's say you've got a simple CLI with three commands; `add`, `subtract`, and `multiply`. With this architecture, you'd need just one mapper in the following shape:

```typescript
import { SimpleMapper } from "cmd-funk";

export const MyCommandMap: SimpleMapper = {
  add: async cmd => // ...do an add command
  subtract: async cmd => // ...do a subtract command
  multiply: async cmd => // ...do a multiply command
  help: () =>
    BaseMarshallers.help({
      add: "Does an add",
      subtract: "Does a subtract",
      multiply: "Does a multiply",
    }),
};
```

Let's look at what's going on here...

- **`SimpleMapper`** is a helper mapper implementation. Use this if you don't need [custom contexts](#Custom-Contexts).

### Custom Contexts

UNDER CONSTRUCTION

## Examples

### Hello World

This is still super early, check out the [hello world](https://github.com/Fuiste/cmd-funk-hello) example to see something simple.
