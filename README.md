# `cmd-funk` ("command funk")

A map-based composable call and response framework. `cmd-funk` is a great option for building lightweight command lines, as well as within more complicated applications that leverage a similar access pattern (like chat bots). Really, anything that predominantly communicates using nested string commands can leverage `cmd-funk`.

## Why use `cmd-funk`?

- **Composable:** Every command line tool has different requirements. Insofar as it is useful, `cmd-funk` provides the tools to create your tools in whatever way you see fit.
- **Functional:** To the extent that it's reasonable, `cmd-funk` doesn't explocitly track state. There's no classes, minimal initialization, as little overhead as possible.
- **Modern:** `cmd-funk` is written in Typescript and takes advantage of `async/await`, so no outdated access patterns!

## Contents

- **[Installation](#installation)**
- **[Concepts](#concepts)**
- **[Example Code](#examples)**

## Installation

Use your favorite package manager and install `cmd-funk`, for example:

```bash
npm install cmd-funk
```

## Concepts

There are 3 building blocks to a `cmd-funk` application, **Mappers**, **Marshallers**, and **Outputs**.

- **[Mappers](#mappers)** are objects that map commands to their implementations (or other mappers!).
- **[Marshallers](#marshallers)** take the output of an implementation and convert it to something `cmd-funk` understands.
- **[Outputs](#outputs)** are special objects that store information about the result of a command.

### Mappers

Mappers are simply dictionaries that lead to the implementation logic of your commands, as well as the necessary help text associated with them.

Let's say you've got a simple CLI with three commands; `add`, `subtract`, and `multiply`. With this architecture, you'd need just one mapper in the following shape:

```typescript
import { SimpleMapper } from "cmd-funk";

export const MyCommandMap: SimpleMapper = {
  add: async cmd => // ...do an add command
  subtract: async cmd => // ...do a subtract command
  multiply: async cmd => // ...do a multiply command
  help: () => // ...return a helptext response
};
```

Let's look at what's going on...

- **`async`** functions are used here, but they are not required. `cmd-funk` expects each key of a mapper object to return either an [output](#outputs) or a promise to one.
- **`SimpleMapper`** is a helper mapper implementation. Use this if you don't need [custom contexts](#custom-contexts).
- **The `help` key** is required on all mappers, and it implements the help text returned to your users.

### Marshallers

Since the underlying implementation of a given command likely returns information specific to the applicastion, but each [mapper](#mappers) key expects a return of an [output](#outputs) or a promise to one, there is a need for an intermediary to translate between these two things.

This is where **marshallers** are helpful. Let's look at the example mapper from above, but add in an implementation for the `add` command, which returns a string:

```typescript
import { Marshallers, SimpleMapper } from "cmd-funk";

const add = async (cmd: SimpleCommand): Promise<string> => {
  // ...some async logic
  return "hello world";
}

export const MyCommandMap: SimpleMapper = {
  add: async cmd => Marshallers.str(await add(cmd)),
  subtract: async cmd => // ...do a subtract command
  multiply: async cmd => // ...do a multiply command
  help: () => // ...return a helptext response
};
```

So, what's going on?

- **`Marshallers`** is a provided namespace within `cmd-funk` with implementations for some common marshaller use cases. They take in common return types and translate them to `cmd-funk` [outputs](#outputs).
- **`SimpleCommand`** is a helper implementation of the command type to use if you don't need [custom contexts](#custom-contexts).

### Outputs

### Custom Contexts

UNDER CONSTRUCTION

## Examples

### Hello World

This is still super early, check out the [hello world](https://github.com/Fuiste/cmd-funk-hello) example to see something simple.
