
# Middlewall


With Middlewall you can build plugable validation middlewares, 
Separate all validation functionality to different layer than your business logic, 
making leaner, more readable code.

* Custom async validations
* parse incoming request while validating (support success callback use as a window for parsing)  
<br>

## Usage


```ts

import { buildStack, goTo, each, or } from 'middlewall/core';
import * as ops from 'middlewall/operations';

const app = express();

app.use((errors, req, res, next) => {
    /*
        any found validation errors will end up here ..
    */
});


const paginationValidator = buildStack(
    // validate query.page is a string-number and if so parse it
    ops.isIntegerString('page', (_, {query}) => query.page = parseInt(query.page), undefined, { optional: true }),  
    ops.isPositive('page', undefined, undefined, { optional: true }),

    // validate query.pageSize is a string-number and if so parse it
    ops.isIntegerString(
        'pageSize', (_, {query}) => query.pageSize = parseInt(query.pageSize), 
        undefined, { optional: true }
    ),
    ops.isBetween('pageSize', 1, 100),
).query(); // top target object is req.query.

const dateValidator = buildStack(
    ops.isDateString('start', 'mm-dd-yyyy'),
    ops.isDateString('end', 'mm-dd-yyyy'),
).query(); // top target object is req.query. 

const showListValidator = buildStack(
    ops.isArray('shows'), // validate body.shows is an array
    goTo('shows', // navigate to body.shows 
        each(     // perform the validations list on each of the items in the 'shows' array
            ops.isAlpha('name'),
            ops.isDateString('showDate', 'mm-dd-yyyy'),
            ops.isBoolean('visible', undefined, undefined, { optional: true })
        )
    )
).body(); // top target object is req.body.


app.get('/', dateValidator, paginationValidator,
    (req, res, next) => {
        /*
            pass all validations! continue your flow
        */
    }
);

app.post('/', showListValidator,
    (req, res, next) => {
        /*
            pass all validations! continue your flow
        */
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
