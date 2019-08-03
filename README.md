
# Firewall

<br>

## Usage

Create plugable validation middleware with x-firewall operators and operations.

```ts

const app = express();

app.use((errors, req, res, next) => {
    /*
        any found validation errors will end up here ..
    */
});


const paginationValidator = xfw.buildStack(
    // validate query.page is a string-number and if so parse it
    xfw.isIntegerString('page', (_, {query}) => query.page = parseInt(query.page), undefined, { optional: true }),  
    xfw.isPositive('page', undefined, undefined, { optional: true }),

    // validate query.itemsPerPage is a string-number and if so parse it
    xfw.isIntegerString(
        'itemsPerPage', (_, {query}) => query.itemsPerPage = parseInt(query.itemsPerPage), 
        undefined, { optional: true }
    ),
    xfw.isBetween('itemsPerPage', 1, 100),
).query(); // top target object is req.query.

const dateValidator = xfw.buildStack(
    xfw.isDateString('start', 'mm-dd-yyyy'),
    xfw.isDateString('end', 'mm-dd-yyyy'),
).query(); // top target object is req.query. 

const showListValidator = xfw.buildStack(
    xfw.isArray('shows'), // validate body.shows is an array
    xfw.goTo('shows', // navigate to body.shows 
        xfw.each(     // perform the validations list on each of the items in the 'shows' array
            xfw.isAlpha('name'),
            xfw.isDateString('showDate', 'mm-dd-yyyy'),
            xfw.isBoolean('visible', undefined, undefined, { optional: true })
        )
    )
).body(); // top target object is req.body.


app.get('/', dateValidator, paginationValidator,
    (req, res, next) => {
        /*
            pass all validations !
            continue your flow
        */
    }
);

app.post('/', showListValidator,
    (req, res, next) => {
        /*
            pass all validations !
            continue your flow
        */
    }
);


```

<br><br>


## Api Reference

<br>

### Firewall and Bricks

`Firewall` <br>
    encapsulate a collection of validation operations in a middleware compatible with express API.

* `Firewall.req()` <br>
    generate a middleware where the validation root object is incoming `request` object.

* `Firewall.body()`  <br>
    generate a middleware where the validation root object is incoming `request.body` object.

* `Firewall.query()` <br>
    generate a middleware where the validation root object is incoming `request.query` object.

* `Firewall.params()` <br>
    generate a middleware where the validation root object is incoming `request.params` object.

* `Firewall.headers()` <br>
    generate a middleware where the validation root object is incoming `request.headers` object.

* `Firewall.locals()` <br>
    generate a middleware where the validation root object is incoming `response.locals` object.

<br><br>

### Operators

brick validation operators, customize the brick validation usage.

`buildStack(...bricks: Array<AsyncBrickFn|Firewall>): Firewall` <br>
Use to build a stack of validation operations, function as a logical and.


`goTo()` <br>
Use to navigate inside the target object. 


`each()` <br>
Use to perform validation on each item in an array.


`or(...bricks: (AsyncBrickFn | Firewall)[]): AsyncBrickFn` <br>
Use to perform validation on each item in an array.


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
