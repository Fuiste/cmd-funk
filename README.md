# `cmd-funk`

A map-based composable command line framework.

## Why use `cmd-funk`?

- **Composable:** Every command line tool has different requirements. Insofar as it is useful, `cmd-funk` provides the tools to create your tools in whatever way you see fit.
- **Functional:** To the extent that it's reasonable, `cmd-funk` doesn't explocitly track state. There's no classes, minimal initialization, as little overhead as possible.
- **Modern:** `cmd-funk` is written in Typescript and takes advantage of `async/await`, so no outdated access patterns!

## Installation

Use your favorite package manager and install `cmd-funk`, for example:

```bash
npm install cmd-funk
```

## Hello World Example

This is still super early, check out the [hello world](https://github.com/Fuiste/cmd-funk-hello) example to see something simple.

## Concepts

There are 3 building blocks to a `cmd-funk` application, **Mappers**, **Marshallers**, and **Outputs**.

- **Mappers** are objects that map commands to their implementations (or other mappers!).
- **Marshallers** take the output of an implementation and convert it to something `cmd-funk` understands.
- **Outputs** are special objects that store information about the result of a command.
