import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
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
        ]),
        exteriorColor: a.string(),
      })
      .authorization(allow => [
        allow.guest().to(["read"]),
        allow.authenticated('identityPool').to(["read"]),
      allow.owner()
    ]),
  });

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
});