---
title: Steps
---

<Epigraph author="Vilgefortz of Roggeveen, Time of Contempt (The Witcher)">
    You mistake stars reflected in a pond for the night sky.
</Epigraph>

## Creating a new step

To create a new step, create a new class and have it extend `Arcanist\WizardStep`.

<tabbed-code-example>

<code-tab name="EmailAndPasswordStep.php">

```php
<?php

namespace App\Wizards\Registration;

use Arcanist\WizardStep;

class EmailAndPasswordStep extends WizardStep
{
}

```

</code-tab>

</tabbed-code-example>

## Frontend

### Where are the views?

- arcanist is front-end agnostic
  - no views
- is extremely app-specific
- instead, uses a `ResponseRenderer` to render views
  - is an interface
  - arcanist ships with `BladeResponseRenderer` by default
  - can install `InertiaResponseRenderer` as standalone package
- response renderer uses convention to figure out template path
  - more information on page about ResponseRenderers

### View data

### Passing additional data to views

