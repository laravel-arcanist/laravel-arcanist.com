---
title: Installation
epigraph:
  author: Gildor Inglorion, The Lord of the Rings
  text: >
    But it is said: Do not meddle in the affairs of wizards, for they are subtle and quick to anger. The choice is yours: to go or wait.

---

## Requirements

<Arcanist></Arcanist> requires PHP 8 and Laravel 8.

## Installing Arcanist

Install via composer

```bash
composer require laravel-arcanist/arcanist
```

## Preparing your application

While <Arcanist></Arcanist> aims to be plug-and-play, there are a few things we need to do in order to get our application ready.

### Publishing the configuration

After the installation, you should publish its config files by running

<tabbed-code-example>

<code-tab>

```bash
php artisan vendor:publish --provider="Arcanist\\ArcanistServiceProvider"
```

</code-tab>

</tabbed-code-example>

This will publish an `arcanist.php` file into your application's `config` directory.

### Running the migrations

<Arcanist></Arcanist> adds a new `wizards` table to keep track of a wizard's state, which is why we need to migrate our database.

```bash
php artisan migrate
```