---
title: Installation
---

## Requirements

Arcanist requires PHP 8 and Laravel 8.

## Installing Arcanist

You can install Arcanist via composer

```bash
composer require sassnowski/arcanist
```

## Preparing your application

While Arcanist is very much plug-and-play, there are a few things we need to do in order to get our application ready.

### Publishing the configuration

After installing Arcanist, you should publish its config files by running

```bash
php artisan vendor:publish \
  --provider="Sassnowski\\Arcanist\\ArcanistServiceProvider" \
  --tag="arcanist-config"
```

This will publish an `arcanist.php` file into your application's `config` directory. Check out the [configuration](/configuration) page for a detailed overview of this file.

### Running the migrations

Arcanist adds a new `wizards` table to keep track of a wizard's state, which is why we need to migrate our database.

```bash
php artisan migrate
```
