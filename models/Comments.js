import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Comment extends BaseModel {
  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["posterID", "postID", "content"],

      properties: {
        id: { type: "integer" },
        posterID: { type: "string" },
        postID: { type: "string" },
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
          from: "comments.posterID",
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
