---
title: Commands
epigraph:
    author: Cicero, probably
    text: >
        Lorem Ipsum
---

<Arcanist></Arcanist> provides a few handy console command to quickly generate the necessary classes for creating wizards.

## Generating wizards

To generate a wizard, you can use the `make:wizard` command.

<tabbed-code-example>

<code-tab>

```
php artisan make:wizard RegistrationWizard
```

</code-tab>

</tabbed-code-example>

This would create a new wizard called `RegistrationWizard` inside the `app/Wizards/RegistrationWizard` directory of your application.

### Generating steps for a new wizard

If you already know which steps your wizard will have, you can pass a comma-separated list of steps to the `make:wizard` command using the `--steps` option.

<tabbed-code-example>

<code-tab>

```
php artisan make:wizard RegistrationWizard \
   --steps=EmailAndPasswordStep,ChooseSubscriptionStep,ConfirmStep
```

</code-tab>

</tabbed-code-example>

This would create three classes called `EmailPasswordStep`, `ChooseSubscriptionStep` and `ConfirmStep` inside the `app/Wizards/RegistrationWizard/Steps` folder. It also automatically registers the steps in the wizard’s `$steps` array.

## Generating steps

To create a new step for an existing wizard, you can use the `make:wizard-step` command. This command takes two parameters, the name of the step as well as the name as name of the wizard the step belongs to. The wizard name is used to determine the correct folder for creating the step.

<tabbed-code-example>

<code-tab>

```
php artisan make:wizard ChooseSubscriptionStep RegistrationWizard
```

</code-tab>

</tabbed-code-example>

This would create a new step called `ChooseSubscriptionStep` inside the `app/Wizards/RegistrationWizard/Steps` folder of your application.