---
title: Magical multi-step forms
---

**Acarnist** provides a simple, yet powerful approach for adding multi-step form wizards to you Laravel application. It takes care of all the boring details so you can spend your time writing features, not boilerplate.

Out of the box, **Arcanist** handles:

- Automatically registering all necessary routes for a wizard
- Form validation
- Persisting data between steps
- Resuming wizards

<tabbed-code-example>

<file name="SetUpWizard.php">
class SignUpWizard extends AbstractWizard
{
    protected array $steps = [
        EnterUsernameAndPassword::class,
        SelectSubscription::class,
    ];
}
</file>

<file name="EnterUsernameAndPassword.php">
class EnterUserNameAndPassword extends WizardStep
{
    public string $name = 'Enter username and password';

    public string $slug = 'username';
}
</file>

</tabbed-code-example>
