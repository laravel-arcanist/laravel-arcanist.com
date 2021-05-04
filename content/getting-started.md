---
title: Getting started
epigraph:
    author: Reverend Mother Mohiam, Dune
    text: >
        The willow submits to the wind and prospers until one day it is many willows—a wall against the wind. This is the willow’s purpose.
---

This page is meant as an example to get you started with <Arcanist></Arcanist> as quickly as possible ~~as long as the rest of the documentation is still in shambles~~.

## Creating the wizard

To get started, let’s create a new folder called `Wizards` in our `app` directory. Inside this folder, let’s create another folder called `Registration`. In here, we add a new class called `RegistrationWizard` which will be the starting point of our wizard.


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

</tabbed-code-example>

The folder structure doesn’t actually matter. But since each wizard will consist of multiple classes it makes sense to group them like this.

Let’s quickly go through the different fields that are included in the wizard scaffolding and what they’re used for:

- `$title` - This should be a human-readable title for your wizard. While this will not be displayed anywhere by default, it gets passed to your templates so you can display it the frontend.
- `$slug` - The slug gets used for the URLs and route names that get registered for a wizard, as well as resolving the path to the wizard’s templates (more on that later).
- `$onCompleteAction` - The action that gets called after the last step of the wizard was successfully completed. The action is where the actual business logic of your form should happen. I’ve already prefilled a class called `RegistrationAction` which we will create [later](/getting-started#actions) in this tutorial.
- `$steps` - The list of steps that make up the wizard. Note that the order in which steps are listed here is important since <Arcanist></Arcanist> uses that to determine which step comes next and when the wizard is complete.
- `middleware()` - If you want to register custom middleware for a specific wizard, you can implement this method. It should return an array of _additional_ middleware which will get merged with the global middleware configured in the `arcanist.php` config file.
- `sharedData()` - If you have data that should be shared with each step, you can configure this here. This will get merged with the `viewData` of the step itself.

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

To keep this example simple, our wizard will only consist of two steps:

- `UsernameAndPasswordStep` which gathers the user’s username and password (shocker!)
- `AnnoyingNewsletterStep` where we will try to trick the user into signing up for our wizard-related newsletter

<note title="Note">

Since a wizard with only a single step is just a form, every wizard needs **at least two steps** to work properly.

</note>

Let’s create a new folder `Steps` and add the following two classes:

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

With this information, <Arcanist></Arcanist> will use Laravel’s request validation to check the incoming request for the step. This means that in your blade templates you can use Laravel’s built-in `@error` directive to conditionally display validation errors.

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


<note title="Important">

The user’s password would currently get saved as plaintext in the wizard’s data. There are ways to hook into the step’s lifecycle to make sure that we encrypt the password before saving it. To keep this example simple, we will not do this here.

</note>


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


## Views

<Arcanist></Arcanist> is completely frontend agnostic. As such, it does not come with any templates. Views are highly application-specific and there is really no sensible defaults this package could provide.

Instead, you’re supposed to create your own views for each step of the wizard. Out of the box, <Arcanist></Arcanist> ships only with a Blade based template renderer. The way it tries to resolve the path of a step’s template is by using the following convention:

```
/resources/views/wizards/{wizardSlug}/{stepSlug}.blade.php
```

So in our example, <Arcanist></Arcanist> expects the template for our `UsernameAndPasswordStep` to exist at

```
/resources/views/wizards/registration/username-and-password.blade.php
```

Once we create this file, we can now navigate to `/wizard/registration` and view the first step in our wizard.

### Accessing data in a view

Every step template gets passed two pieces of data by <Arcanist></Arcanist>.

- Metadata about the current wizard and its steps, accessible via the `$wizard` variable in our template
- The step-specific data defined in the `viewData` method of the step, accessible via the `$step` variable

In our example, the `$wizard` variable would contain the following data:


<tabbed-code-example>

<code-tab name="$wizard">

```php
[
    'id' => null,
    'title' => 'Registration',
    'slug' => 'registration',
    'steps' => [
        [
            'slug' => 'username-and-password',
            'isComplete' => false,
            'title' => 'Username and Password',
            'active' => true,
            'url' => null,
        ],
        [
            'slug' => 'annoying-newsletter',
            'isComplete' => false,
            'title' => 'Annoying Newsletter',
            'active' => false,
            'url' => null,
        ]
    ]
]
```

</code-tab>

</tabbed-code-example>

The wizard’s id is current `null` since we’re viewing the wizard for the first time. Only after the user has successfully submitted the first step will <Arcanist></Arcanist> start keeping track of the wizard.

The `steps` key contains the list of all steps that have been registered for the wizard, together with metadata about each of them.

- `slug` - The step’s slug
- `isComplete` - If the step has already been completed. <Arcanist></Arcanist> keeps track of this behind the scenes. You can use this value to style completed steps differently in your templates, for example.
- `title` - The step’s title.
- `active` - If the step is the currently active one (i.e. we’re viewing its template). Again, this can be used to highlight the current step in your UI.
- `url` - The url to the step. This is currently empty, because the wizard has not been saved yet.

Using this data, you can build up the UI of your wizard. Since the data inside `$wizard` stays the same across all steps of a wizard, it is a good candidate to be extracted into a layout or Blade component that can then be reused for all wizards. Only the step templates have to be created individually.


## Actions

After the last step in a wizard was successfully completed, <Arcanist></Arcanist> will call then call the wizard’s configured `$onCompleteAction`.

A big design idea of <Arcanist></Arcanist> is that the steps don’t perform any business logic. All they do is collect data that will then be handed of to the action at the end of the wizard. Actions are the place where your actual business logic happens.

Let’s create a simple `RegistrationAction` for our wizard:

<tabbed-code-example>

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

An action is simply a class which extends from `WizardAction`. This class needs to implement a single method `execute` which gets passed the wizard’s data and needs to return an `ActionResult`.

### Action results

To no one’s surprise, an `ActionResult` represents the result of calling a wizard’s action. Since it’s possible that an exception might occur inside the action, an `ActionResult` can represent both a successful and a failed state. <Arcanist></Arcanist> handles this state internally to either complete the wizard (and delete it) or redirect back to the last step with an error.


<tabbed-code-example>

<code-tab name="RegistrationAction.php">

```php
class RegistrationAction extends WizardAction
{
    // You can type-hint dependencies in the action’s
    // constructor.
    public function __construct(
        private NaughtyWizardsNewsletter $newsletter
    ) {}

    public function execute($payload): ActionResult
    {
        $user = User::create([
            'username' => $payload['username'],
            'password' => bcrypt($payload['password'])
        ]);

        if ($payload['newsletter']) {
            try {
                $this->newsletter->subscribe($user);
            } catch (NewsletterSubscriptionException $e) {
                return $this->error(
                    'Sorry but we were unable to subscribe you to ' .
                    'our "Wizards Gone Wild" newsletter'
                );
            }
        }

        return $this->success(['user' => $user]);
    }
}
```

</code-tab>

</tabbed-code-example>

If the action returns a failed result (by using `$this->error(...)`), we can access the error message in our templates via the `wizard` key in the error bag.

<tabbed-code-example>

<code-tab name="annoying-newsletter.blade.php">

```html
@error('wizard')
    <div class="bg-red-300 text-red-700 px-6 py-4">
        <span class="font-semibold">Whoops!</span>
        {{ $message }}
    </div>
@enderror
```

</code-tab>

</tabbed-code-example>

In case you need to pass data back to the wizard from the action, you can provide an associative array to the `success` method of the action.