---
title: Magical multi-step forms
epigraph:
    author: Elminster Aumar, The Making of a Mage
    text: >
        There are only two precious things on earth: the first is love; the second, a long way behind it, is intelligence.
---

<Arcanist></Arcanist> provides a simple, yet powerful approach for adding multi-step form wizards to you Laravel application. It takes care of all the boring details so you can spend your time writing features, not boilerplate.

Out of the box, <Arcanist></Arcanist> handles:

- Automatically registering all necessary routes for a wizard
- Form validation
- Persisting data between steps
- Keeping track of which steps have already been completed
- Resuming wizards at the last unfinished step

Not only that, <Arcanist></Arcanist> is completely front-end agnostic. You can use it together with Blade, Inertia.js, or anything else to render your templates.

<tabbed-code-example>

<code-tab name="RegistrationWizard.php">

```php
class RegistrationWizard extends AbstractWizard
{
    public static string $name = 'Register';
    public static string $slug = 'register';

    protected string $onCompleteAction = RegisterUser::class;

    protected array $steps = [
        EmailAndPassword::class,
        SelectSubscription::class,
    ];

    public static function middleware(): array
    {
        return ['guest'];
    }
}
```

</code-tab>

<code-tab name="EmailAndPassword.php">

```php
class EmailAndPassword extends WizardStep
{
    public string $name = 'Enter username and password';
    public string $slug = 'username';

    protected function handle(
        Request $request,
        array $payload
    ): StepResult {
        $payload['password'] = bcrypt($payload['password']);

        return $this->success($payload)
    }

    protected function fields(): array
    {
        return [
            Field::make('email')
                ->rules(['required', 'email', 'unique:users,email']),

            Field::make('password')
                ->rules(['required', 'confirmed', 'min:10']),
        ];
    }
}
```

</code-tab>

<code-tab name="SelectSubscription.php">

```php
class SelectSubscription extends WizardStep
{
    public string $name = 'Select subscription';
    public string $slug = 'select-subscription';

    public function viewData(Request $request): array
    {
        return $this->withFormData([
            'subscriptions' => Subscription::all(),
        ]);
    }

    protected function fields(): array
    {
        return [
            Field::make('subscriptions')
                ->rules(['required', 'valid-subscription']),
        ];
    }
}
```

</code-tab>

</tabbed-code-example>
