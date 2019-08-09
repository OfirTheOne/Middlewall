
# Middlewall


[![Build Status](https://travis-ci.com/OfirTheOne/Middlewall.svg?branch=production)](https://travis-ci.org/OfirTheOne/Middlewall)
[![npm](https://img.shields.io/npm/v/middlewall.svg)](https://www.npmjs.com/package/middlewall)

With Middlewall you can build plugable validation middlewares, 
Separate all validation functionality to different layer than your business logic, 
making a leaner, reusable, more readable code.


## Key Features :

* Growing collection of common validation methods, referred as operations. 
* parse and transform incoming request while validating (support success callback use as a window for parsing).
* descriptive error massages.
* Custom async validations




## Quick Overview

Working with Middlewall involve using 
- operations - validations methods  
- operators - activate and manipulate the validation methods

In a nutshell, with the given operators you're composing a single block of validation from multiple individual validation operations then you can reuse that single block validation or transforming it to a middleware.




<br>

## Usage


Let say you're building an API that support reading shows, artists and venues all with pagination,
each of the readable item type implemented on an individual controller. 

Pagination in your API implemented with a single protocol, using 'page' and 'pageSize' provided as a query parameters,

in the following code piece we're creating a middleware to validate and parse 'page' and 'pageSize' parameters,
it will be plugged before each API call used for reading. 

```ts

import { compose, goTo, each } from 'middlewall/core';
import * as ops from 'middlewall/operations';

const app = express();

app.use((err, req, res, next) => {
    /*  any found validation errors will end up here ..
        for example: for the call '/show?page=-3&pageSize=100', err will look like :
        {
            "pass": false,
            "errors": [
                {
                    "pass": false,
                    "error": "value is not pass as a positive number",
                    "value": -3,
                    "path": "query.page",
                    "validation": "isPositive"
                }
            ]
        } 
    */
});


const paginationValidator = compose(
    // validate query.page is a string-number and if so parse it
    ops.isIntegerString('page',                     // <-- point to the target field            
        (page, req) => parseInt(page) || 1,         // <-- provide an if-pass cb
        undefined,                                  // <-- a costume error massage can be provided 
        { overwriteValue: true, optional: true, default: 1 }    // <-- setting field as optional and overwrite it with if-pass cb return value
    ),  
    ops.isPositive('page', undefined, undefined, { optional: true }),

    // validate query.pageSize is a string-number and if so parse it
    ops.isIntegerString('pageSize', 
        (pageSize, req) => parseInt(pageSize), 
        undefined, 
        { overwriteValue: true, optional: true, default: 20 }),
    ops.isBetween('pageSize', 1, 100),
).query(); // top target object is req.query.


app.get('/show', paginationValidator, (req, res, next) => {
        /*  pass all validations! continue your flow */
    }
);

// and so on for '/artist' and '/venue' calls ..

    
```

<br>

Continue building your API validation layer, your API provides a filtering functionality base on dates, 
the parameters 'start' and 'end' provided with the range dates.

in the following code piece we're creating a middleware to validate the dates range could be something like :

```ts
static dateValidator = compose(
    ops.isDateString('start', 'mm-dd-yyyy',    
        (start, req) => moment(start, 'mm-dd-yyyy'),        
        undefined, 
        { overwriteValue: true, optional: true, default: moment().year(1970) }),
    ops.isDateString('end', 'mm-dd-yyyy',
        (end, req) => moment(end, 'mm-dd-yyyy'),        
        undefined, 
        { overwriteValue: true, optional: true, default: moment().year(2100) }),
).query(); // top target object is req.query. 


app.get('/show', paginationValidator, dateValidator, (req, res, next) => {
        /*  pass all validations! continue your flow 
            for example: for the call '/show?page=1&start=04-20-2015, req.query will look like :
            {
                "page": 1,
                "start": "2019-08-08T21:04:00.000Z",
                "end": "2100-08-09T11:10:43.251Z",
                "pageSize": 20
            }
        */

    }
);


```

<br>

Now your incoming request storing some more complex object you must validate,

```ts
const showListValidator = buildStack(
    ops.isArray('shows'), // validate body.shows is an array
    goTo('shows', // navigate to body.shows 
        each(     // perform the validations list on each of the items in the 'shows' array
            ops.isAlpha('name'),
            ops.isDateString('showDate', 'mm-dd-yyyy'),
            ops.isBoolean('visible', undefined, undefined, { optional: true, default: true })
        )
    )
).body(); // top target object is req.body.


app.post('/show', showListValidator, (req, res, next) => {
        /*  pass all validations! continue your flow */
    }
);

```

<br><br>


## Api Reference

<br>

### Middlewall and Bricks

`Middlewall` <br>
    encapsulate a collection of validation operations in a middleware compatible with express API.

* `Middlewall.prototype.req()` <br>
    generate a middleware where the validation root object is the incoming `request` object.

* `Middlewall.prototype.body()`  <br>
    generate a middleware where the validation root object is the incoming `request.body` object.

* `Middlewall.prototype.query()` <br>
    generate a middleware where the validation root object is the incoming `request.query` object.

* `Middlewall.prototype.params()` <br>
    generate a middleware where the validation root object is the incoming `request.params` object.

* `Middlewall.prototype.headers()` <br>
    generate a middleware where the validation root object is the incoming `request.headers` object.

* `Middlewall.prototype.locals()` <br>
    generate a middleware where the validation root object is the incoming `response.locals` object.

<br><br>

### Operators

brick validation operators, customize the brick validation usage.

`buildStack(...bricks: Array<AsyncBrickFn | Middlewall>): Middlewall` <br>
Use to build a stack of validation operations, function as a logical and.

`and(...bricks: Array<AsyncBrickFn | Middlewall>): AsyncBrickFn` <br>
Use to perform validation on each item in an array.

`or(...bricks: Array<AsyncBrickFn | Middlewall>): AsyncBrickFn` <br>
Use to perform validation on each item in an array.

`goTo(path: string, ...bricks: Array<AsyncBrickFn | Middlewall>): AsyncBrickFn` <br>
Use to navigate inside the target object. 

`each(...bricks: Array<AsyncBrickFn | Middlewall>): AsyncBrickFn` <br>
Use to perform validation on each item in an array, where only all the items must pass the validation.

`some(...bricks: Array<AsyncBrickFn | Middlewall>): AsyncBrickFn` <br>
Use to perform validation on each item in an array, where only one item must pass the validation.





<br><br>

### Operations

Operations follow the same API structure *in general*, <br>
different operations can receive different amount of parameters with different types.  <br>
The general structure: 
* `path: string` 
    - path to the target field from the current context location.
    - required
* `...args: Array<any>`
    - extra arguments for the validation operation.
    - some operations required the argument by logic, some aren't.
* `ifPass?: IfPassFn`
    - callback function that execute if the validation passes.
    - optional 
* `error?: string`
    - custom error massage.
    - optional 
* `options?: ValidationOptions`
    - option for the validation operation.
    - optional 
