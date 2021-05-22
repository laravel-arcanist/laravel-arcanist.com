---
title: Wizards
epigraph:
    author: Getafix, Asterix and the Vikings
    text: >
        Fear is what makes us brave. Real courage is when you overcome your fear.
---

The `Wizard` is the top-level component of your form. It takes care of navigating between steps, handling form submissions and providing shared data that should be available to all steps.

## Creating new wizards

All wizards extend from `Arcanist\AbstractWizard`. This base class provides almost all the functionality you need out of the box.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;

class RegistrationWizard extends AbstractWizard
{
}
```

</code-tab>

</tabbed-code-example>

<note title="Generating Wizards">

You can use the `php artisan make:wizard` command to have <Arcanist></Arcanist> ~conjure~ generate a new wizard skeleton for you.

</note>

## Registering wizards

Before our wizard can do anything, it needs to be registered so <Arcanist></Arcanist> knows about it. We can do so by adding it to the `wizards` array in our `arcanist.php` config file.

<tabbed-code-example>

<code-tab name="config/arcanist.php">

```php{6}
return [

    // ...

    'wizards' => [
        App\Wizards\Registration\RegistrationWizard::class,
    ],

    // ...
];
```

</code-tab>

</tabbed-code-example>

If we check our application routes now using `php artisan route:list`, we would indeed see a bunch of new routes that were registered. Here are the routes you should see:


<tabbed-code-example>

<code-tab name="console">

```
+--------------------------------------+--------------------------+
| URI                                  | Name                     |
+--------------------------------------+--------------------------+
| wizard/new-wizard                    | wizard.new-wizard.create |
| wizard/new-wizard                    | wizard.new-wizard.store  |
| wizard/new-wizard/{wizardId}         | wizard.new-wizard.delete |
| wizard/new-wizard/{wizardId}/{slug?} | wizard.new-wizard.show   |
| wizard/new-wizard/{wizardId}/{slug}  | wizard.new-wizard.update |
+--------------------------------------+--------------------------+
```

</code-tab>

</tabbed-code-example>

Since we haven’t really configured our wizard yet, <Arcanist></Arcanist> falls back to the defaults defined in the `AbstractWizard` base class. This why currently all routes are called `new-wizard`.

## Filling in the details

Our wizard is still pretty bare bones, so let's start filling in some of the details.

### Naming wizards

Every good wizard needs a name. To give your wizard a name, you can overwrite the static `$title` property that comes with the base class.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{9}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';
}
```

</code-tab>

</tabbed-code-example>

If you need more control, for example because you want to localize your wizard’s title, you can override the `title()` method instead.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{9-14}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;

class RegistrationWizard extends AbstractWizard
{
    protected function title(): string
    {
        // Localize the wizard by using Laravel's
        // translation helpers.
        return __('Join the fun');
    }
}
```

</code-tab>

</tabbed-code-example>

<note title="Note">

<Arcanist></Arcanist> doesn’t actually display the `title` anywhere. Instead, it will be passed to each view as part of the `wizard` key. Check the [section on view data](/steps#view-data) for more information about this.

</note>

### Slugs

Now that our wizard is no longer nameless, let's configure the `slug` next. The `slug` is used to generate both the names as well as the actual URLs for all routes of this wizard.

When we looked at the routes that were registered above, we saw that they all contained `new-wizard`. This is because that’s the default `slug` provided by the `AbstractWizard` base class.

To make your wizard cool and unique, you can (and should) overwrite the static `$slug` property.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{11}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';

    public static string $slug = 'register';
}
```

</code-tab>

</tabbed-code-example>

If we look at our application routes again, we can see that they now sound much cooler:

<tabbed-code-example>

<code-tab name="console">

```
+------------------------------------+------------------------+
| URI                                | Name                   |
+------------------------------------+------------------------+
| wizard/register                    | wizard.register.create |
| wizard/register                    | wizard.register.store  |
| wizard/register/{wizardId}         | wizard.register.delete |
| wizard/register/{wizardId}/{slug?} | wizard.register.show   |
| wizard/register/{wizardId}/{slug}  | wizard.register.update |
+------------------------------------+------------------------+
```

</code-tab>

</tabbed-code-example>

Ah, much better.

<note title="Configuring the route prefix">

By default, <Arcanist></Arcanist> uses the `wizard` prefix for all routes. This can be configured via the `route_prefix` option in the `arcanist.php` config file. Check out the [configuration](/configuration#configuring-the-route-prefix) page for reference.

</note>

## Adding steps

Our wizard now has a name and slick URLs, but it’s not actually _doing_ anything yet. To change that, we specify the list of steps that make up this wizard in the `steps` property.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{6-8,16-20}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use App\Wizards\Registration\SelectPlanStep;
use App\Wizards\Registration\UploadUserAvatarStep;
use App\Wizards\Registration\EmailAndPasswordStep;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';

    public static string $slug = 'register';

    protected array $steps = [
        EmailAndPasswordStep::class,
        SelectPlanStep::class,
        UploadUserAvatarStep::class,
    ];
}
```

</code-tab>

</tabbed-code-example>

For more information on how exactly steps work, check the [next section](/steps) of the docs.

Note that the **order of the steps is important**. The way we’ve set up our wizard now, the user needs to:

1. Provide their email and password
1. Select a subscription plan
1. Upload a user avatar

<note title="Optional steps">

Does that mean users are forced to upload an avatar? Maybe! It depends on the configuration of the `UploadUserAvatarStep` step.

</note>

After a step was submitted, <Arcanist></Arcanist> will automatically redirect to the next step in the wizard. If the submitted step happens to be the last one in the wizard, <Arcanist></Arcanist> will then call the wizard’s configured **action**.

_“What action?”_ you might say. I’m glad you asked.

## Configuring the action

True to their literary counterparts, wizards in <Arcanist></Arcanist> don’t actually do anything themselves. They instead delegate the actual work to a separate `Action` class once the last step of the wizard was submitted. Which class gets called is configured via the `onCompleteAction` property of the wizard.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{7,23}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use App\Wizards\Registration\SelectPlanStep;
use App\Wizards\Registration\CreateUserAction;
use App\Wizards\Registration\UploadUserAvatarStep;
use App\Wizards\Registration\EmailAndPasswordStep;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';

    public static string $slug = 'register';

    protected array $steps = [
        EmailAndPasswordStep::class,
        SelectPlanStep::class,
        UploadUserAvatarStep::class,
    ];

    protected string $onCompleteAction = CreateUserAction::class;
}
```

</code-tab>

</tabbed-code-example>

<note title="More on actions">

Check out the page on [actions](/actions) for more information on how actions work.

</note>

### Passing data to actions

By default, the action gets passed an array containing all data that has been collected by the wizard’s steps. This data can be accessed using the `$this->data(?string $key, mixed $default = null)` method of the wizard.

Sometimes you might want to transform the data before it gets passed to the action, however. You might want to transform the data array into a data transfer object (DTO), for example. You can do this by overwriting the `transformWizardData()` method.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{9,26-38}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use App\Wizards\Registration\SelectPlanStep;
use App\Wizards\Registration\CreateUserAction;
use App\Wizards\Registration\UploadUserAvatarStep;
use App\Wizards\Registration\DTO\RegistrationData;
use App\Wizards\Registration\EmailAndPasswordStep;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';

    public static string $slug = 'register';

    protected array $steps = [
        EmailAndPasswordStep::class,
        SelectPlanStep::class,
        UploadUserAvatarStep::class,
    ];

    protected string $onCompleteAction = CreateUserAction::class;

    protected function transformWizardData(): mixed
    {
        $subscription = Subscription::find(
            $this->data('subscription')
        );

        return new RegistrationData([
            'email' => $this->data('email'),
            'password' => $this->data('password'),
            'subscription' => $subscription,
            'avatarPath' => $this->data('avatarPath'),
        ]);
    }
}
```

</code-tab>

<code-tab name="RegistrationData.php">

```php
<?php

namespace App\Wizards\Registration\DTO;

final class RegistrationData
{
    public function __construct(
        public string $email,
        public string $password,
        public Subscription $subscription,
        public string $avatarPath
    ) {
    }
}
```

</code-tab>

</tabbed-code-example>

## Redirecting after completing the wizard

After the action was run successfully, <Arcanist></Arcanist> will redirect the user to a different page. The target of the redirect can be configured in multiple ways, both globally, as well as on a per-wizard basis.

### Default redirect target

If no explicit redirect target is defined in the wizard, <Arcanist></Arcanist> will fall back to using the route defined in the `redirect_url` key in the `arcanist.php` config file.

<note title="Package configuration">

Check out the [configuration](/configuration#default-redirection-target) section of the documentation for a complete list of all available configuration options.

</note>

### Wizard-specific redirects

You probably want to redirect the user to a specific page based on the wizard most of the time. You can configure this in one of the following ways.

For simple cases, you can implement the `redirectTo` method of the wizard and return the intended target URL.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{28-31}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use App\Wizards\Registration\SelectPlanStep;
use App\Wizards\Registration\CreateUserAction;
use App\Wizards\Registration\UploadUserAvatarStep;
use App\Wizards\Registration\DTO\RegistrationData;
use App\Wizards\Registration\EmailAndPasswordStep;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';

    public static string $slug = 'register';

    protected array $steps = [
        EmailAndPasswordStep::class,
        SelectPlanStep::class,
        UploadUserAvatarStep::class,
    ];

    protected string $onCompleteAction = CreateUserAction::class;

    protected function transformWizardData(): mixed { /* ... */ }

    protected function redirectTo(): string
    {
        return route('pages.dashboard');
    }
}
```

</code-tab>

</tabbed-code-example>

If you need full control over the redirect response, you can use the `onAfterComplete` method instead. This method is passed an `ActionResult` instance—which contains the result of calling the wizard’s action—and needs to return a `RedirectResponse`. This allows you to redirect to the detail page of a model that was created inside the action, for example.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{5-6,30-36}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use Arcanist\Action\ActionResult;
use Illuminate\Http\RedirectResponse;
use App\Wizards\Registration\SelectPlanStep;
use App\Wizards\Registration\CreateUserAction;
use App\Wizards\Registration\UploadUserAvatarStep;
use App\Wizards\Registration\DTO\RegistrationData;
use App\Wizards\Registration\EmailAndPasswordStep;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';

    public static string $slug = 'register';

    protected array $steps = [
        EmailAndPasswordStep::class,
        SelectPlanStep::class,
        UploadUserAvatarStep::class,
    ];

    protected string $onCompleteAction = CreateUserAction::class;

    protected function transformWizardData(): mixed { /* ... */ }

    protected function onAfterComplete(ActionResult $result): RedirectResponse
    {
        return redirect()->route(
            'users.profile',
            $result->get('user')
        );
    }
}
```

</code-tab>

<code-tab name="CreateUserAction.php">

```php
<?php

namespace App\Wizards\Registration;

use Arcanist\Action\WizardAction;
use Arcanist\Action\ActionResult;
use App\Wizards\Registration\DTO\RegistrationData;

class CreateUserAction extends WizardAction
{
    /**
     * @param RegistrationData $data
     */
    public function execute($data): ActionResult
    {
        $user = /* ... */;

        // Lengthy process to create user, upload their avatar
        // and subscribe them to their chosen plan.

        return $this->success([
            'user' => $user
        ]);
    }
}
```

</code-tab>

</tabbed-code-example>


## Configuring middleware

If you want to apply a specific set of middleware to a particular wizard, you can implement the static `middleware` method in your wizard class.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{25-28}
<?php

namespace App\Wizards\Registration;

use Arcanist\AbstractWizard;
use App\Wizards\Registration\SelectPlanStep;
use App\Wizards\Registration\CreateUserAction;
use App\Wizards\Registration\UploadUserAvatarStep;
use App\Wizards\Registration\EmailAndPasswordStep;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';

    public static string $slug = 'register';

    protected array $steps = [
        EmailAndPasswordStep::class,
        SelectPlanStep::class,
        UploadUserAvatarStep::class,
    ];

    protected string $onCompleteAction = CreateUserAction::class;

    public static function middleware(): array
    {
        return ['guest'];
    }
}
```

</code-tab>

</tabbed-code-example>

This middleware gets _merged_ with the [global wizard middleware](/configuration#global-wizard-middleware) defined in the configuration.
