/* eslint-disable camelcase */
import { knex } from "../knex/knex";
import { Model, AjvValidator } from "objection";
import addFormats from "ajv-formats";

class BaseModel extends Model {
  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        addFormats(ajv);
      },
    });
  }
}

Model.knex(knex);

export default BaseModel;
