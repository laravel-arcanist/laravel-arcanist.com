---
title: Core concepts
epigraph:
  author: Prospero, The Tempest
  text: |
    I'll break my staff,
    Bury it certain fathoms in the earth,
    And deeper than did ever plummet sound
    I'll drown my book.

---

This page explains the core concepts and design decisions behind <Arcanist></Arcanist>.

## Steps don't act, they configure

On of the main concepts in <Arcanist></Arcanist> is that nothing actually happens until the last step of the wizard was completed. Entering your username and password on step one of a registration wizard doesn’t create the user account yet. Picking which plan you want to subscribe to doesn’t subscribe you to that plan yet. Instead, the point of the wizard is to **configure the payload** that then gets handed to a separate class at the very end.

Doing things this way has a couple of nice benefits:

- By decoupling the part that will be different for all wizards (the “business logic”), the form handling can be completely generalized. This means that all the nitty-gritty details like handling form requests, validation, persisting data between steps, redirecting between steps, checking if a step can be accessed yet and invalidating fields can be taken care off behind the scenes.
- Since all of the business logic happens in a separate class, this logic can be tested _independently_ of the wizard and <Arcanist></Arcanist> itself. You would test like you would test any other class in your application. No need for fancy package-specific testing helpers.

<note title="Sidenote">

There is still an escape hatch if you actually need to do more complicated things in a step (like saving an uploaded image, for example). But this should absolutely be the exception rather than the rule.

</note>


## Components of a wizard

Every wizard in <Arcanist></Arcanist> is made up of three different components: the **wizard** itself, two or more steps **steps** and an **action**. Let’s look at each of these components one at a time.

### The wizard

The wizard class is the top-level component of a multi-step form. It defines which steps make up the form as well as what action should be called when the wizard was completed.

Behind the scenes, this class is what’s doing most of the heavy lifting. It takes care of routing a request to the correct step as well as navigating and redirecting between the individual steps. It also controls where the user should be redirected after completing the wizard. All of this behavior is is taken care of inside <Arcanist></Arcanist> and is not something you as a consumer should ever really have to worry about.

### Steps

The main goal of a step is collect a specific subset of the wizard’s overall data. Say that you’re writing a wizard for your application’s sign-up process. To create a new user, you want to have collected the following data at the end of this process:

- the user’s email
- the user’s password
- the user’s payment information
- which subscription plan to subscribe the user to
- (optionally) an image to use as the user’s avatar

You could split this across multiple steps like so:

- Step 1: Email and password
- Step 2: Payment information and subscription plan
- Step 3: Upload a user avatar (can be skipped)
- Step 4: Confirm information

Each step would define a list of `fields` that describe the information which should be collected on this step alongside any validation rules. <Arcanist></Arcanist> will use this information to validate an incoming request against the step’s field definitions. If the request was successful, <Arcanist></Arcanist> will then keep track of this data and mark the step as completed.

Each step gets rendered as a standalone view in the browser. All this view has to do is to eventually submit a `POST` request with the required data. Everything else is up to you.

### Actions

Each wizard defines an action that gets called after the last step of the wizard was successfully completed.

The action is the thing that actually does the work. If your wizard is supposed to create a new user, subscribe them to a plan and (optionally) upload an avatar, it’s the action that does all these things.

The action gets passed all data that was gathered throughout your wizard and is then free to do whatever it wants. In this way, the business logic of your wizard is completely decoupled from <Arcanist></Arcanist> itself.

## Frontend agnostic

<Arcanist></Arcanist> does not ship with any frontend scaffolding. Not only will the UI be highly application-specific, different applications might use different approaches for even displaying their frontend. While some applications might use Blade and Blade components, others might use Inertia.js, Livewire or even Twig. Since there is no sensible default that <Arcanist></Arcanist> could provide to satisfy all these unknowns, it doesn’t even try.

Instead, the specifics of rendering and redirecting between steps is abstracted behind an interface so that <Arcanist></Arcanist> can support multiple implementations.

<note title="Response renderers">

Out of the box, <Arcanist></Arcanist> only ships with a Blade-based response renderer. There is a [first-party implementation](https://github.com/laravel-arcanist/inertia-response-renderer) of an Inertia response renderer available as well, however.

</note>

Each response contains all the information about the wizard and its current state, alongside the step-specific view data. With this information you can then build up your frontend using whatever technology and conventions you want.