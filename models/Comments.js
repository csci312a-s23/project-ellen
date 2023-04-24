import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Comment extends BaseModel {
  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["commenterID", "postID", "content"],

      properties: {
        id: { type: "integer" },
        commenterID: { type: "string" },
        postID: { type: "integer" },
        content: { type: "string" },
        created_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const User = require("./Users");
    const Post = require("./Posts");

    return {
      poster: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.commenterID",
          to: "users.id",
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "comments.postID",
          to: "posts.id",
        },
      },
    };
  }
}
