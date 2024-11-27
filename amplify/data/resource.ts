import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
      
  chat: a.conversation({
    aiModel: a.ai.model('Claude 3.5 Haiku'),
    systemPrompt: 'You are a helpful assistant',
  })
  .authorization((allow) => allow.owner()),
  
    CarListing: a
      .model({
        make: a.string().required(),
        model: a.string().required(),
        year: a.integer().required(),
        price: a.float().required(), // Using float for price as it may include decimals
        mileage: a.float().required(), // Using float for mileage to handle decimal values
        location: a.string().required(),
        description: a.string(), // Added description field
        image: a.string(), // Optional image URL
        photos: a.string().array(), // Array of photo URLs 
        fuelType: a.enum([
          "GASOLINE",
          "DIESEL",
          "ELECTRIC",
          "HYBRID",
          "PLUGIN_HYBRID",
          "OTHER"
        ]), // Using enum without .required() as per rules
        transmission: a.enum([
          "AUTOMATIC",
          "MANUAL",
          "CVT",
          "SEMI_AUTOMATIC"
        ]), // Using enum without .required() as per rules
        bodyType: a.enum([
          "SEDAN",
          "SUV",
          "COUPE",
          "TRUCK",
          "VAN",
          "WAGON",
          "CONVERTIBLE",
          "OTHER"
        ]), // Using enum without .required() as per rules
        exteriorColor: a.string().required(),
        vin: a.string().required()
      })
      .authorization(allow => [allow.guest()]),
  });

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
});
