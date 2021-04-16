---
title: Magical multi-step forms
---

**Acarnist** provides a simple, yet powerful approach for adding multi-step form wizards to you Laravel application. It takes care of all the boring details so you can spend your time writing features, not boilerplate.

Out of the box, **Arcanist** handles:

- Automatically registering all necessary routes for a wizard
- Form validation
- Persisting data between steps
- Resuming wizards

```php
class SignupWizard extends AbstractWizard
{
    public static string $slug = 'signup';

    public static string $title = 'Sign-up for a new account';

    protected array $steps = [
        EnterUsernameAndPassword::class,
        SelectSubscription::class,
    ];
}
```

Test
