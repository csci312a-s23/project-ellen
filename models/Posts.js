import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Post extends BaseModel {
  static get tableName() {
    return "posts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["posterID", "title", "content", "category"],
      properties: {
        id: { type: "integer" },
        posterID: { type: "integer" },
        title: { type: "string" },
        content: { type: "string" },
        category: { type: "string" },
        created_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const User = require("./Users");
    const Comment = require("./Comments");
    const Vote = require("./Votes");

    return {
      poster: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.posterID",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "posts.id",
          to: "comments.postID",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "posts.id",
          to: "votes.postID",
        },
      },
    };
  }
}
