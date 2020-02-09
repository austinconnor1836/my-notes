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

  - 