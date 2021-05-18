---
title: Configuration
epigraph:
    author: Elric, Elric of Melniboné
    text: >
        Why should their pain produce such marvelous beauty? Or is all beauty created through pain? Is that the secret of great art, both human and Melnibonen?
---

This page describes the different configuration options in <Arcanist></Arcanist>.

## Default redirection target

After a wizard was completed, <Arcanist></Arcanist> will redirect the user to a different page. By default, the user gets redirected to the URL configured inside the `redirect_url` key.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php
return [
    // ...

    'redirect_url' => '/dashboard'

    // ...
];
```

</code-tab>

</tabbed-code-example>

Check out [this section](/wizards#wizard-specific-redirects) to see how you can configure a redirect target for a specific wizard.

## Configuring the storage driver

<Arcanist></Arcanist> supports different storage drivers to persist the wizard’s state between steps. You can configure the driver via the `storage.driver` option.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php{4}
return [

    'storage' => [
        'driver' => DatabaseWizardRepository::class,
        'ttl' => 24 * 60 * 60,
    ],

];
```

</code-tab>

</tabbed-code-example>

<Arcanist></Arcanist> ships with two different storage drivers out of the box:

- `DatabaseWizardRepository` — This driver saves the wizard state inside a database table. Note that you will have to publish and run the migrations that ship with <Arcanist></Arcanist> in order to use this driver.
- `CacheWizardRepository` — This driver uses your application’s cache to keep track of the wizard state. This driver uses the normal cache configuration that ships with Laravel.

### Wizard expiration time

You can configure the expiration time of a wizard with the `storage.ttl` option. The TTL specifies the number of seconds that a wizard can go without updates before it will be deleted.

When using the database storage driver, <Arcanist></Arcanist> will compare the `updated_at` column of the wizard against the TTL to determine if the wizard should be deleted.

<note title="Database cleanup">

When using the database driver, you need to register an additional Artisan command to periodically clean up expired wizards.

</note>

When using the cache driver, this happens automatically since <Arcanist></Arcanist> uses the configured TTL as the TTL of the cache key.

## Action resolvers

You can override the default resolver that gets used to instantiate a wizard’s action with the `action_resolver` option.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php
return [

    'action_resolver' => ContainerWizardActionResolver::class,

];
```

</code-tab>

</tabbed-code-example>

By default, actions get resolved out of the Laravel container so it’s unlikely that you will have to override this setting.

## Configuring the response renderer

You can configure the response renderer <Arcanist></Arcanist> will use to render your views with the `renderers.renderer` option.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php{4}
return [

    'renderers' => [
        'renderer' => BladeResponseRenderer::class,

        'blade' => [
            'view_base_path' => 'wizards',
        ],

        'inertia' => [
            'component_base_path' => 'Wizards',
        ],
    ],

];
```

</code-tab>

</tabbed-code-example>

### Blade

The `BladeResponseRenderer` renders your templates by attempting to resolve a Blade template for each step in a wizard. <Arcanist></Arcanist> uses the following convention to determine the file path of a step’s template.

<tabbed-code-example>

<code-tab>

```
resources/views/{view_base_path}/{wizard_slug}/{step_slug}.blade.php
```

</code-tab>

</tabbed-code-example>

You can configure the base folder that <Arcanist></Arcanist> will start looking in when resolving templates with the `renderers.blade.view_base_path` option.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php{6-8}
return [

    'renderers' => [
        'renderer' => BladeResponseRenderer::class,

        'blade' => [
            'view_base_path' => 'wizards',
        ],

        'inertia' => [
            'component_base_path' => 'Wizards',
        ],
    ],

];
```

</code-tab>

</tabbed-code-example>

For instance, changing this option to `foobar` means that <Arcanist></Arcanist> will try to resolve a step’s template like so:

<tabbed-code-example>

<code-tab>

```
resources/views/foobar/{wizard_slug}/{step_slug}.blade.php
```

</code-tab>

</tabbed-code-example>


### Inertia.js

The Inertia.js driver does not ship with <Arcanist></Arcanist> out of the box. In order to use it, you first need to install it via composer.

<tabbed-code-example>

<code-tab name="console">

```
composer require laravel-arcanist/inertia-response-renderer
```

</code-tab>

</tabbed-code-example>

You can then use the `InertiaResponseRenderer` in your config.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php{4}
return [

    'renderers' => [
        'renderer' => InertiaResponseRenderer::class,

        'blade' => [
            'view_base_path' => 'wizards',
        ],

        'inertia' => [
            'component_base_path' => 'Wizards',
        ],
    ],

];
```

</code-tab>

</tabbed-code-example>

The Inertia driver will render your step’s as a `Inertia::response`. <Arcanist></Arcanist> will attempt to resolve a step’s Vue component using the following convention:

<tabbed-code-example>

<code-tab>

```
resources/js/Pages/{component_base_path}/{wizard_slug}/{step_slug}.vue
```

</code-tab>

</tabbed-code-example>

You can configure the base folder that <Arcanist></Arcanist> will start looking in when resolving templates with the `renderers.inertia.component_base_path` option.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php{11}
return [

    'renderers' => [
        'renderer' => InertiaResponseRenderer::class,

        'blade' => [
            'view_base_path' => 'wizards',
        ],

        'inertia' => [
            'component_base_path' => 'Wizards',
        ],
    ],

];
```

</code-tab>

</tabbed-code-example>

For instance, changing this value to `Forms` means <Arcanist></Arcanist> will try to resolve a step’s template like so:

<tabbed-code-example>

<code-tab>

```
resources/js/Pages/Forms/{wizard_slug}/{step_slug}.vue
```

</code-tab>

</tabbed-code-example>

## Configuring the route prefix

<Arcanist></Arcanist> registers a set of routes for each wizard. As to not conflict with any of your application’s existing routes, the URLs for these routes get prefixed. You can configure this prefix with the `route_prefix` option.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php
return [

    'route_prefix' => 'wizard',

];
```

</code-tab>

</tabbed-code-example>

For instance, changing this prefix to `forms` means the generated routes would look like this:

<tabbed-code-example>

<code-tab>

```
GET    /forms/{wizardSlug}
POST   /forms/{wizardSlug}
GET    /forms/{wizardSlug}/{wizardId}/{stepSlug?}
POST   /forms/{wizardSlug}/{wizardId}/{stepSlug?}
DELETE /forms/{wizardSlug}/{wizardId}
```

</code-tab>

</tabbed-code-example>

## Global wizard middleware

You can configure the middleware that gets applied to all wizard routes with the `middleware` option.

<tabbed-code-example>

<code-tab name="arcanist.php">

```php
return [

    'middleware' => ['web'],

];
```

</code-tab>

</tabbed-code-example>

Note that any additional middleware you [specify on the wizard](/wizards#route-middleware) gets _merged_ with the global middleware instead of replacing it.