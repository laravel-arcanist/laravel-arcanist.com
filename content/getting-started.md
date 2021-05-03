---
title: Getting started
epigraph:
    author: Reverend Mother Mohiam, Dune
    text: >
        The willow submits to the wind and prospers until one day it is many willows—a wall against the wind. This is the willow’s purpose.
---

This page is meant as an example to get you started with <Arcanist></Arcanist> as quickly as possible. For more information about how to customize your wizard to fit your application’s needs, check the [next section](/wizards) of the documentation.

## Creating the wizard

The easiest way to create a wizard is to use the `make:wizard` command that comes with <Arcanist></Arcanist>. We can also generate an action as well by providing the `--create-action` (`-a` for short).

```
php artisan make:wizard RegistrationWizard --create-action
```

This will create a new `RegistrationWizard.php` and `RegistrationAction.php` file inside the `app/Wizards/Registration` folder of your application.

As a convention, <Arcanist></Arcanist> uses the first part of your wizard’s name to prefill some of the wizards information, like the name of the folder, the wizards slug and name, and (if provided) the name of the action.

Here’s what our generated wizard and action look like out of the box:

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use Illuminate\Http\Request;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Registration';

    public static string $slug = 'registration';

    public string $onCompleteAction = RegistrationAction::class;

    protected array $steps = [
        //
    ];

    public static function middleware(): array
    {
        return [];
    }

    public function sharedData(Request $request): array
    {
        return [];
    }
}
```

</code-tab>

<code-tab name="RegistrationAction.php">

```php
<?php

namespace App\Wizards\Registration;

use Arcanist\Action\WizardAction;
use Arcanist\Action\ActionResult;

class RegistrationAction extends WizardAction
{
    public function execute($payload): ActionResult
    {
        return $this->success();
    }
}
```

</code-tab>

</tabbed-code-example>

Let’s quickly go through the different fields that are included in the wizard scaffolding and what they’re used for:

- `$title` - This should be a human-readable title for your wizard. While this will not be displayed anywhere by default, it gets passed to your templates so you can display it the frontend.
- `$slug` - The slug gets used for the URLs and route names that get registered for a wizard, as well as resolving the path to the wizard’s templates (more on that later).
- `$onCompleteAction` - The action that gets called after the last step of the wizard was successfully completed. The action is where the actual business logic of your form should happen. See [Core concepts](/concepts) for more information on this.
- `$steps` - The list of steps that make up the wizard. Note that the order in which steps are listed here is important since <Arcanist></Arcanist> uses that to determine which step comes next and when the wizard is complete.
- `middleware()` - If you want to register custom middleware for a specific wizard, you can implement this method. It should return an array of _additional_ middleware which will get merged with the global middleware configured in the `arcanist.php` config file.
- `sharedData()` - If you have data that should be shared with each step, you can configure this here. This will get merged with the `viewData` of the step itself.


<note title="Deleting unneeded scaffolding">

The `make` command creates quite a bit of scaffolding you might not necessarily need. For instance, if you don't plan to change the `middleware` or `sharedData` methods, you can safely delete them from your wizard class.

</note>


### Registering the wizard

In order for <Arcanist></Arcanist> to know about our new wizard, we have to register it in the `wizards` array of our `arcanist.php` config file.

<tabbed-code-example>

<code-tab name="config/arcanist.php">

```php
return [
    // ...

    'wizards' => [
        \App\Wizards\Registration\RegistrationWizard::class,
    ]

    // ...
]
```

</code-tab>

</tabbed-code-example>

Doing so will register all required routes for our new wizard so we’re ready to start using it. Let’s take a quick look at our application routes:

<tabbed-code-example>

<code-tab name="console">

```
+----------------------------------------+----------------------------+
| URI                                    | Name                       |
+----------------------------------------+----------------------------+
| wizard/registration                    | wizard.registration.create |
| wizard/registration                    | wizard.registration.store  |
| wizard/registration/{wizardId}         | wizard.registration.delete |
| wizard/registration/{wizardId}/{slug?} | wizard.registration.show   |
| wizard/registration/{wizardId}/{slug}  | wizard.registration.update |
+----------------------------------------+----------------------------+
```

</code-tab>

</tabbed-code-example>

If you try to visit any of these routes right now, however, you will get an exception. That’s because our wizard currently doesn’t have any steps. So let’s do that next.


## Defining Steps

To create a new step for our `RegistrationWizard`, we can use the `make:wizard-step` command that ships with <Arcanist></Arcanist>. To keep this example simple, our wizard will only consist of two steps:

- `UsernameAndPasswordStep` which gathers the user’s username and password (shocker!)
- `AnnoyingNewsletterStep` where we will try to trick the user into signing up for our wizard-related newsletter

```
php artisan make:wizard-step RegistrationWizard UsernameAndPasswordStep
php artisan make:wizard-step RegistrationWizard AnnyoingNewsletterStep
```

The first parameter is the name of the wizard for which you want to generate a step. This will make sure that the step gets created in the correct folder. The second parameter is the name of the step itself.

<note title="Note">

Since a wizard with only a single step is just a form, every wizard needs **at least two steps** to work properly.

</note>

Here’s what our newly generated steps look like.

<tabbed-code-example>

<code-tab name="UsernameAndPaswordStep.php">

```php
<?php

namespace App\Wizards\Registration\Steps;

use Arcanist\Field;
use Arcanist\WizardStep;
use Illuminate\Http\Request;

class UsernameAndPasswordStep extends WizardStep
{
    public string $title = 'Username And Password';

    public string $slug = 'username-and-password';

    public function viewData(Request $request): array
    {
        return $this->withFormData();
    }

    protected function fields(): array
    {
        return [
            // Field::make('field-name')
            //   ->rules(['required']),
        ];
    }
}
```

</code-tab>

<code-tab name="AnnoyingNewsletterStep.php">

```php
<?php

namespace App\Wizards\Registration\Steps;

use Arcanist\Field;
use Arcanist\WizardStep;
use Illuminate\Http\Request;

class AnnoyingNewsletterStep extends WizardStep
{
    public string $title = 'Annoying Newsletter';

    public string $slug = 'annoying-newsletter';

    public function viewData(Request $request): array
    {
        return $this->withFormData();
    }

    protected function fields(): array
    {
        return [
            // Field::make('field-name')
            //   ->rules(['required']),
        ];
    }
}
```

</code-tab>

</tabbed-code-example>

<note title="Business logic in steps">

If you need to perform additional business logic in a step—like uploading a user’s profile picture—check out [this page](/business-logic-in-steps).

</note>

Before we forget, let’s make sure to add these steps to our wizard’s `$step` array.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{7-8,19-20}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use Illuminate\Http\Request;
use App\Wizards\Registration\Steps\AnnoyingNewsletterStep;
use App\Wizards\Registration\Steps\UsernameAndPasswordStep;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Registration';

    public static string $slug = 'registration';

    public string $onCompleteAction = RegistrationAction::class;

    protected array $steps = [
        UsernameAndPasswordStep::class,
        AnnoyingNewsletterStep::class,
    ];

    // snip...
}
```

</code-tab>

</tabbed-code-example>


### How steps are structured

Let’s take a look at the `UsernameAndPasswordStep` scaffolding and see what we’re working with:

- `$title` - Similar to the title of our wizard, this should be a human-readable title for the step. The title will get passed to the template so that you may display it in the frontend. Or don’t. I’m not your dad.
- `$slug` - The slug is used for the URL of the step as well as for determining the name of the step’s template.
- `viewData()` - The return value of this function is what gets passed to the step’s template, together with any shared data defined in the wizard. More about this [later](#views).
- `fields()` - In this method you should define the fields that exist on this step of the form as well as any validation rules that go along with them. In other words, this is how <Arcanist></Arcanist> knows what data it should save when the step gets submitted.

### Defining fields

In order for <Arcanist></Arcanist> to understand how it should deal with incoming requests, we need to tell it which fields exist on a step. We can use the `Field` class to fluently build up our field definitions.

<tabbed-code-example>

<code-tab name="UsernameAndPasswordStep.php">

```php{16-18}
<?php

namespace App\Wizards\Registration\Steps;

use Arcanist\Field;
use Arcanist\WizardStep;
use Illuminate\Http\Request;

class UsernameAndPasswordStep extends WizardStep
{
    // snip...

    protected function fields(): array
    {
        return [
            Field::make('username'),

            Field::make('password'),
        ];
    }
}
```

</code-tab>

</tabbed-code-example>

To define validation rules, we can define validation rules for our fields using Laravel’s validation rules.

```php
Field::make('username')
    ->rules(['required', 'unique:users,username'])
```

Here’s what our steps look like after filling in the field definitions.

<tabbed-code-example>

<code-tab name="UsernameAndPasswordStep.php">

```php{16-20}
<?php

namespace App\Wizards\Registration\Steps;

use Arcanist\Field;
use Arcanist\WizardStep;
use Illuminate\Http\Request;

class UsernameAndPasswordStep extends WizardStep
{
    // snip...

    protected function fields(): array
    {
         return [
            Field::make('username')
                ->rules(['required', 'unique:users,username']),

            Field::make('password')
                ->rules(['required', 'confirmed', 'string', 'min:12']),
        ];
    }
}
```

</code-tab>

<code-tab name="AnnoyingNewsletterStep.php">

```php{17-18}
<?php

namespace App\Wizards\Registration\Steps;

use Arcanist\Field;
use Arcanist\WizardStep;
use Illuminate\Http\Request;

class AnnoyingNewsletterStep extends WizardStep
{
    // snip...

    protected function fields(): array
    {
        return [
            Field::make('newsletter')
                ->rules(['boolean']),
        ];
    }
}
```

</code-tab>

</tabbed-code-example>


### Passing data to view

In order to pass data to our step templates, we can use the `viewData()` method on the step class.

<tabbed-code-example>

<code-tab>

```php
public function viewData(Request $request): array
{
    return [
        'plans' => $this->subscriptionService->getPlans(),
    ];
}
```

</code-tab>

</tabbed-code-example>

<Arcanist></Arcanist> also provides a `withFormData()` convenience method. This method ensures that data that has already been collected for any of the step’s fields is included in the view data.

Assuming we have a step that defines a `selectedPlan` and `billingCycle` field, these two ways would be equivalent.

<tabbed-code-example>

<code-tab name="Passing fields explicitly">

```php
public function viewData(Request $request): array
{
    return [
        // Pass any data that has previously collected
        // back to the view, so we can pre-fill the form.
        'selectedPlan' => $this->data('selectedPlan'),
        'billingCycle' => $this->data('billingCycle'),

        // Fetch available plans so the user can pick
        // between them.
        'plans' => $this->planRepository()->getPlans(),
    ];
}
```

</code-tab>


<code-tab name="using `withFormData()`">

```php
public function viewData(Request $request): array
{
    // `selectedPlan` and `billingCycle` will be included
    // as well since they are fields on our step
    return $this->withFormData([
        'plans' => $this->planRepository()->getPlans(),
    ]);
}
```

</code-tab>

</tabbed-code-example>


<note title="Accessing wizard data">

You can access any data—from any step—that has previously been collected by using the `$this->data(string $key, mixed $default = null)` method on the step.

</note>


## Where are the views?