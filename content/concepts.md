---
title: Core concepts
---

<Epigraph author="Gandalf, probably">
    Getting really sick of your shit, Frodo.
</Epigraph>

Arcanist is an _opinionated_ package. This means that there are certain assumptions it makes in order to provide its functionality. While there are sometimes ways to stray from these assumptions, it is generally recommended to follow them as much as possible.

## Components of a wizard

- multi-step wizard consists of multiple components

### The wizard itself

- wizard is top-level component that groups everything together
- defines behavior of entire form wizard
  - what steps?
  - where to redirect after completion
- under the hood, is what provides endpoints for controllers
  - is not something you should ever have to worry about
  - if need to customize behavior, use hooks or events

### Steps

- defines an individual step in wizard
- corresponds roughly to a view
- defines things like
  - view data
  - validation rules
- also define method if step was completed or not
  - custom to every step
  - can use in view to style step differently

### Actions

- the thing that actually does the work
- every wizard has one action which gets called after last step is finished
- gets passed data from the wizard
- decoupling this from wizard itself makes it easier to test

## Steps don't act, they configure

- main assumption of arcanist
- steps themselves are not actually performing any action
  - e.g. "select subscription step" does not create subscription yet
- they configure payload for action
- action is what gets called after last step was completed

- arcanist assumes that all steps simply save their data
- means you dont have to write any logic for steps 95% of the time
- side note:
  - sometimes have to perform some business logic like reserving resources or upload file.
  - can overwrite default behavior of steps in that case
  - for most cases, you only need to configure steps and implement action
