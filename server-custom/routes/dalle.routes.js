import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'; // Use fetch for direct API calls

dotenv.config();

const router = express.Router();

// Test route to check if API is running
router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALLE Routes" });
});

// POST route to handle image generation
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Ensure prompt is provided
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ message: "Invalid or missing prompt." });
    }

    // Make a POST request to the OpenAI API
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, //  OpenAI API key from environment
      },
      body: JSON.stringify({
        prompt,
        n: 1, // Number of images to generate
        size: "256x256", // Image dimensions
        response_format: "b64_json", // Request Base64 format
      }),
    });

    // Checking if the response is okay
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return res.status(response.status).json({
        message: errorData.error?.message || "Error generating image from OpenAI API.",
      });
    }

    // Parse the response from OpenAI API
    const data = await response.json();

    // Ensure the response contains image data
    if (!data || !data.data || !data.data[0]?.b64_json) {
      throw new Error("Invalid response structure from OpenAI API.");
    }

    // Send the image data back to the client
    res.status(200).json({ photo: data.data[0].b64_json });
  } catch (error) {
    console.error("Error generating image:", error.message);

    // Return a detailed error message for development or a generic one for production
    res.status(500).json({
      message: "Something went wrong while generating the image.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;


// import express from 'express'
// import * as dotenv from 'dotenv';
// // // import OpenAI from 'openai/index.mjs';
// // import {Configuration, OpenAIApi} from 'openai'
// import OpenAI from 'openai';



// dotenv.config();

// const router = express.Router();

// // const config = new Configuration({
// //     apikey: process.env.OPEN_AI_KEY,
// // });

// // const openai = new OpenAIApi(config);
// const openai = new OpenAI( {
//   apiKey: process.env.OPENAI_AI_KEY // This is also the default, can be omitted
// });

// router.route('/').get((req,res) => {
//     res.status(200).json({message: "Hello from DALLE Routes"})
// })


//  router.route('/').post(async (req, res) => {
// //   try{
// //     const {prompt} = req.body;
// //     const response = await openai.images.generate({
// //       // const response = await openai.createImage({
// //       model: "dall-e-2",
// //       prompt,
// //       n:1,
// //       size: '256x256' ,
// //       response_format: 'b64_json'
// //   })

// //   const  image = response.data.data[0].b64_json;
// //   // const image = response.data;

// //   res.status(200).json({photo: image});

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({message: "Something went wrong"})
// //   }
// // })router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Ensure prompt is provided
//     if (!prompt || typeof prompt !== "string") {
//       return res.status(400).json({ message: "Invalid or missing prompt." });
//     }

//     // Generate image using OpenAI
//     const response = await openai.images.generate({
//       model: "dall-e-2", // Use the correct model name
//       prompt,
//       n: 1, // Generate one image
//       size: '256x256', // Specify size
//       response_format: 'b64_json', // Request base64 format
//     });

//     // Validate the response structure
//     if (!response || !response.data || !response.data.data || response.data.data.length === 0) {
//       throw new Error("Unexpected API response structure.");
//     }

//     const image = response.data.data[0].b64_json;

//     // Check if the image data exists
//     if (!image) {
//       throw new Error("No image data received from OpenAI.");
//     }

//     // Respond with the image data
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error("Error generating image:", error.message);

//     // Respond with a detailed error message for debugging (only for development)
//     res.status(500).json({
//       message: "Something went wrong while generating the image.",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// });



// export default router;
