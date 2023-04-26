import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Vote extends BaseModel {
  static get tableName() {
    return "votes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["voterID", "postID", "value"],

      properties: {
        id: { type: "integer" },
        voterID: { type: "string" },
        postID: { type: "integer" },
        value: { type: "integer" },
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
          from: "votes.voterID",
          to: "users.id",
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "votes.postID",
          to: "posts.id",
        },
      },
    };
  }
}

module.exports = Vote;
