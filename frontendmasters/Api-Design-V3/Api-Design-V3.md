# Api Design with Express and Node - v3

When you have routes that are being reused you can use `router.route` instead of `app.***` and pass the relevant controllers and middleware through:

```javascript
const routes = [
    'get /cat',
    'get /cat/:id',
    'post /cat',
    'delete /cat/:id'
]

router.route('/cat')
.get()
.post()

router.route('/cat/:id')
.get()
.put()
.delete()
```

## Mongoose, Schemas, and Models

It starts with the schema.

Then, we create the model with `mongoose` and applying the schema.

Example Schema:

```javascript
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    status: {
        default: 'active',
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue']
    },
    notes: String,
    due: Date,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    },
    list: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'list',
        required: true
    }
}, { timestamps: true })
export const Item = mongoose.model('item', itemSchema)
```

The line:

```javascript
type: mongoose.SchemaTypes.ObjectId,
```

sets up a relationship with Mongo:

- this field is going to use an Id from a user, and it is required
- An `ObjectId` in Mongo is a uniquely generated string to target that object

The `ref: 'user'` tells what table to grab from. Also corresponds to the model created: `export const Item = mongoose.model('item', itemSchema)`

So `ref: 'list'` corresponds to the list model specified in the resources directory.

To have items have unique names:

```javascript
itemSchema.index({ list: 1, name: 1 }, { unique: true })
```

The `1` corresponds to the sorting order. A `-1` corresponds to reverse ordering.

JavaScript does not have Object ordering, but Mongoose does by using `bson`.

## Routes and controllers

- Controllers are just middleware but with the intent on returning some data.
- This would be where you could incorporate microservice architecture.
- No intent to proceed to another middleware after a controller. It is the **final** middleware in the stack for a request.

Set status code with `express`:

In `item.router`:

```javascript
router.
  route('/')
  .get((req, res) => {
    res.status(404).send({ message: 'not found' })
  })
  .post(controllers.createOne)
 
```

- he recommends not serving static assets with express
- **don't add code after `res.status()`, express is not expecting anything after it**
- can also use `json`: `res.status(404).json({ message: 'not found' })`
- Controllers implement the logic that interacts with our DB models
- like we generalized common routes, we can generalize controller logic (getting one item is essentially the same as getting one list, just the models are different)

## Using models

- Mongoose models work very nicely with CRUD

  - C (Create)- `model.create(), new model()`

    - Ex: *In `item.controller.js`*

      ```javascript
      import { Item } from './item.model'
      
      Item.create({})
      
      export default {}
      ```

    - can also do an array of items: `Item.create([{}, {}])`

  - R (Read)- `model.find(), model.findOne(), model.findById()`

    - Ex: In `item.controller.js`:

      ```javascript
      import { Item } from './item.model'
      import mongoose from 'mongoose'
      
      const run = async () => {
          const item = await Item.create({
              name: 'Clean up',
              // creates fake since we don't have one yet
              createdBy: mongoose.Types.ObjectId(),
              list: mongoose.Types.ObjectId()
          })
      }
      ```

    - then, we need to connect to the database:

      - from `utils/db.js`, in `item.controller.js`:

        ```javascript
        import { Item } from './item.model'
        import mongoose from 'mongoose'
        import { connect } from '../../utils/db'
        
        const run = async () => {
            await connect('mongodb://localhost:27017/api-test')
            
            const item = await Item.create({
                name: 'Clean up',
                // creates fake since we don't have one yet
                createdBy: mongoose.Types.ObjectId(),
                list: mongoose.Types.ObjectId()
            })
        }
        ```

      - running `yarn build` then `node dist/resources/item/item.controller.js` should output:

        - ```
          { status: 'active',
            _id: 5e40232989deee6d4f74c203,
            name: 'Clean up',
            createdBy: 5e40232989deee6d4f74c201,
            list: 5e40232989deee6d4f74c202,
            createdAt: 2020-02-09T15:20:09.491Z,
            updatedAt: 2020-02-09T15:20:09.491Z,
            __v: 0 }
          ```

    - `model.findById()`:

      - In *`item.controller.js`* replacing `console.log()`:

        ```javascript
        console.log(await Item.findById(item._id).exec())
        ```

      - running `yarn build` then `node dist/resources/item/item.controller.js` should output:

        ```
        { status: 'active',
          _id: 5e4024203591516dc7f134c4,
          name: 'Clean up',
          createdBy: 5e4024203591516dc7f134c2,
          list: 5e4024203591516dc7f134c3,
          createdAt: 2020-02-09T15:24:16.945Z,
          updatedAt: 2020-02-09T15:24:16.945Z,
          __v: 0 }
        ```

    - `model.find()` returns an array

  - U (Update) - `model.update()`, `model.findByIdAndUpdate()`, `model.findOneAndUpdate()`

    - ```javascript
      const updated = await Item.findByIdAndUpdate(
      item._id,
      { name: 'eat' },
      { new: true }
      ).exec()
      ```
  
  - D (Delete) - `model.remove()`, `model.findByIdAndUpdate()`, `model.findOneAndRemove()`
  
    - ```javascript
      const removed = await Item.findByIdAndUpdate(item._id).exec()
      ```
  
  ### CRUD Controllers
  
  So far we have routes and models. Now we need to hook our routes up to our models so we can perform CRUD on the models based on the routes + verbs.
  
  **Controllers**: resolvers that connect routes to models based on the routes + verbs.
  
  `utils/crud.js` hosts our controllers:
  
  ```javascript
  export const getOne = model => async (req, res) => {}
  
  export const getMany = model => async (req, res) => {}
  
  export const createOne = model => async (req, res) => {}
  
  export const updateOne = model => async (req, res) => {}
  
  export const removeOne = model => async (req, res) => {}
  
  export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model)
  })
  ```
  
  If the route is `/:id` for an `item`, the parameters in the controllers would be `req.params.id`
  
  ### Controllers Exercise Solution
  
  ```javascript
  export const getOne = model => async (req, res) => {
    try {
      const doc = await model
        .findOne({ createdBy: req.user._id, _id: req.params.id })
        .lean()
        .exec()
  
      if (!doc) {
        return res.status(400).end()
      }
  
      res.status(200).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  export const getMany = model => async (req, res) => {
    try {
      const docs = await model
        .find({ createdBy: req.user._id })
        .lean()
        .exec()
  
      res.status(200).json({ data: docs })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  export const createOne = model => async (req, res) => {
    const createdBy = req.user._id
    try {
      const doc = await model.create({ ...req.body, createdBy })
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  export const updateOne = model => async (req, res) => {
    try {
      const updatedDoc = await model
        .findOneAndUpdate(
          {
            createdBy: req.user._id,
            _id: req.params.id
          },
          req.body,
          { new: true }
        )
        .lean()
        .exec()
  
      if (!updatedDoc) {
        return res.status(400).end()
      }
  
      res.status(200).json({ data: updatedDoc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  export const removeOne = model => async (req, res) => {
    try {
      const removed = await model.findOneAndRemove({
        createdBy: req.user._id,
        _id: req.params.id
      })
  
      if (!removed) {
        return res.status(400).end()
      }
  
      return res.status(200).json({ data: removed })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model)
  })
  ```
  
  - had to use `findOne()` instead of `findById` since we had two parameters: `req.params.id` and `req.user._id`

### Wiring Up Controllers

```javascript
import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

export default crudControllers(Item)
```

## Authentication

### Authentication in APIs with JWT (JSON Web Tokens)

- you can never truly protect an API, but requiring authentication makes it a bit safer
- Authentication is controlling if an incoming request can proceed or not
- Authorization is controlling if an authenticated request has the correct permissions to access a resource
- Identification is determining who the requester is

### JSON Web Token Authentication

tldrd; tokens passed every request to check auth on the server

- a bearer token strategy that allows the API to be stateless with user auth.
- Created by a combination of secrets on the API and a payload like a user object.
- Must be sent with every request where the API will then try to verify the token was created with the expected secrets.
- After successful verification, JWT payload is accessible to the server. Can be used for authorization and identification.

### JSON Web Token Module

