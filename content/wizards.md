---
title: Wizards
---

<Epigraph author="Getafix, Asterix and the Vikings">
    Fear is what makes us brave. Real courage is when you overcome your fear.
</Epigraph>

The `Wizard` is the top-level component of your form.

## Creating new wizards

All wizards extend from `Sassnowski\Arcanist\AbstractWizard`. This base class provides almost all the functionality you need out of the box. It takes care of navigating between steps, handling form submissions and providing shared data that should be available to all steps.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php
<?php

namespace App\Wizards\Registration;

use Sassnowski\Arcanist\AbstractWizard;

class RegistrationWizard extends AbstractWizard
{
}
```

</code-tab>

</tabbed-code-example>

<note title="Generating Wizards">

You can use the `php artisan make:wizard` command to have <Arcanist></Arcanist> ~conjure~ generate a new wizard skeleton for you.

</note>

## Registering Wizards

Wizards don't get registered automatically, so right now, this wizard isn't doing anything. Let's change that by adding it to the `wizards` array in our `arcanist.php` config file.

<tabbed-code-example>

<code-tab name="arcanist.php">

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

These look like fairly straight-forward CRUD routes, but why are they all called `new-wizard`? This is because we haven't really configured our wizard yet, so <Arcanist></Arcanist> falls back to the defaults defined in the `AbstractWizard` base class.

## Filling in the details

Our wizard is still pretty bare bones, so let's start filling in some of the details.

### Naming wizards

Every good wizard needs a name. To give your wizard a name, you can overwrite the static `$title` property that comes with the base class.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{9}
<?php

namespace App\Wizards\Registration;

use Sassnowski\Arcanist\AbstractWizard;

class RegistrationWizard extends AbstractWizard
{
    public static string $title = 'Join the fun';
}
```

</code-tab>

</tabbed-code-example>

If you need more control, for example because you want to localize your wizard’s title, you can alternatively override the `title()` method instead.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{9-14}
<?php

namespace App\Wizards\Registration;

use Sassnowski\Arcanist\AbstractWizard;

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

To make your wizard cool and unique, you can provide a static `$slug` property yourself.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{11}
<?php

namespace App\Wizards\Registration;

use Sassnowski\Arcanist\AbstractWizard;

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

By default, <Arcanist></Arcanist> uses the `wizard` prefix for all routes. This can be configured via the `route_prefix` option in the `arcanist.php` config file. Check out the [configuration](/configuration) page for reference.

</note>

## Adding steps

Our wizard now has a name and slick URLs, but it’s not actually _doing_ anything yet. To change that, we specify the list of steps that make up this wizard in the `steps` property.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{6-8,16-20}
<?php

namespace App\Wizards\Registration;

use Sassnowski\Arcanist\AbstractWizard;
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

### Configuring the action

True to their literary counterparts, wizards in <Arcanist></Arcanist> don’t actually do anything themselves. They instead delegate the actual work to a separate `Action` class once the last step of the wizard was submitted. Which class gets called is configured via the `onCompleteAction` property of the wizard.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php{7,23}
<?php

namespace App\Wizards\Registration;

use Sassnowski\Arcanist\AbstractWizard;
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

