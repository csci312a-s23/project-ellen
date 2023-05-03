import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "googleID"],

      properties: {
        id: { type: "string" },
        googleID: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        type: { type: "string" },
        created_at: { type: "string" },
        classYear: { type: "integer" },
        major: { type: "string" },
        department: { type: "string" },
        title: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Post = require("./Posts");
    const Comment = require("./Comments");

    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.id",
          to: "posts.posterID",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.id",
          to: "comments.posterID",
        },
      },
    };
  }
  // Override this method to exclude googleId
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.googleID;
    return json;
  }
}
