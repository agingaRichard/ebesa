const { connectToDatabase } = require("../../lib/mongodb");
//const ObjectId = require("mongodb").ObjectId;

export default async function handler(req: any, res: any) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    case "POST": {
      return addPost(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
    }
  }
}

async function getPosts(req: any, res: any) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let posts = await db
      .collection("articles")
      .find({})
      .sort({ published: -1 })
      .toArray();
    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error: any) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addPost(req: any, res: any) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection("posts").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Post added successfully",
      success: true,
    });
  } catch (error: any) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updatePost(req: any, res: any) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    // await db.collection("posts").updateOne(
    //   {
    //     _id: new ObjectId(req.body),
    //   },
    //   { $set: { published: true } }
    // );

    // return a message
    return res.json({
      message: "Post updated successfully",
      success: true,
    });
  } catch (error: any) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deletePost(req: any, res: any) {
  try {
    // Connecting to the database
    let { db } = await connectToDatabase();

    // Deleting the post
    // await db.collection("posts").deleteOne({
    //   _id: new ObjectId(req.body),
    // });

    // returning a message
    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error: any) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
